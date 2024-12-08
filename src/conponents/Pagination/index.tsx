'use client'


import {Pagination} from "@mui/material";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function PaginationComponent({totalPage, current, limit}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        params.set('limit', limit.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Pagination count={totalPage} shape="rounded" variant="outlined" color="primary"
                    onChange={handleChangePage}/>
    );
}