"use client";

import {useEffect, useState} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TableHeader({header}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [hydrated, setHydrated] = useState(false);
    const [sortColumns, setSortColumns] = useState<{ [key: string]: 'asc' | 'desc' }>({}); // Lưu trạng thái sắp xếp cho từng cột

    useEffect(() => {
        setHydrated(true); // Đảm bảo chỉ render sau khi client đã được hydrate
    }, []);

    if (!hydrated) {
        return null; // Không render gì trên server
    }

    const handleArrowClick = (columnName: string, direction: 'asc' | 'desc') => {
        setSortColumns((prev) => {
            const newSortColumns = { ...prev };

            if (newSortColumns[columnName] === direction) {
                // Nếu cột đang được sắp xếp theo hướng đó, bỏ chọn cột
                delete newSortColumns[columnName];
            } else {
                // Cập nhật cột và hướng mới
                newSortColumns[columnName] = direction;
            }

            // Cập nhật URLSearchParams khi thay đổi sắp xếp
            const params = new URLSearchParams(searchParams);
            // Tạo chuỗi sắp xếp từ đối tượng sortColumns
            const sortParams = Object.entries(newSortColumns)
                .map(([key, value]) => `${key},${value}`) // Định dạng 'columnName,direction'
                .join('&');

            if (sortParams) {
                params.set('sort', sortParams); // Cập nhật tham số sort
            } else {
                params.delete('sort'); // Xóa tham số sort nếu không còn sắp xếp
            }

            // Thực hiện thay đổi URL
            replace(`${pathname}?${params.toString()}`);

            return newSortColumns;
        });
    };

    return (
        <div className={`grid grid-cols-${header.length} mt-2 px-4 py-2 bg-gray-50`}>
            {header.map((column, index) => (
                <p
                    key={index}
                    className={`flex items-center ${
                        column.align === "center" ? "justify-center" : "space-x-4"
                    } group`}
                >
                    <span className={`${column.align === "center" ? "text-center" : ""}`}>
                        {column.name}
                    </span>
                    {column.sort && (
                        <div
                            className={`flex flex-col items-center -space-y-1.5 ${
                                column.align === "center" ? "ml-2" : ""
                            }`}
                        >
                            {/* Mũi tên lên */}
                            <span
                                className={`text-sm cursor-pointer transition-opacity ${
                                    sortColumns[column.key] === "asc"
                                        ? "text-black opacity-100"
                                        : "text-gray-200 opacity-100 group-hover:opacity-100"
                                }`}
                                onClick={() => handleArrowClick(column.key, "asc")}
                            >
                                ▲
                            </span>
                            {/* Mũi tên xuống */}
                            <span
                                className={`text-sm cursor-pointer transition-opacity ${
                                    sortColumns[column.key] === "desc"
                                        ? "text-black opacity-100"
                                        : "text-gray-200 opacity-100 group-hover:opacity-100"
                                }`}
                                onClick={() => handleArrowClick(column.key, "desc")}
                            >
                                ▼
                            </span>
                        </div>
                    )}
                </p>
            ))}
        </div>
    );
}
