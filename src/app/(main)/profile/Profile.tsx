'use client';

import DashboardCardItem from "@/app/admin/dashboard/cardItem";
import {Avatar} from "@nextui-org/avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import Image from "next/image";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useCallback} from "react";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {faBox} from "@fortawesome/free-solid-svg-icons/faBox";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons/faDollarSign";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const columns = [
    {name: "ID", uid: "id"},
    {name: "CreatedAT", uid: "createdAt"},
    {name: "Total", uid: "total"},
    {name: "Items", uid: "items"},
    {name: "Actions", uid: "actions"},
];

const ContentProfile = (props: any) => {
    const {user, order} = props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleString('en-US', {
            weekday: 'long',  // "Monday"
            year: 'numeric',  // "2024"
            month: 'long',    // "November"
            day: 'numeric',   // "12"
            hour: '2-digit',  // "3"
            minute: '2-digit',// "25"
            second: '2-digit',// "58"
            hour12: true      // "AM/PM"
        });
    };

    const renderCell = useCallback((order, columnKey) => {
        const cellValue = order[columnKey];

        switch (columnKey) {
            case "id":
                return (
                    <div>
                        <p className="text-center">{order._id}</p>
                    </div>
                );
            case "createdAt":
                return (
                    <p className="text-bold text-sm capitalize text-default-400 text-center">
                        {order.createdAt && formatDate(order.createdAt)}
                    </p>
                );
            case "total":
                return (
                    <div><p className="text-center">${order.total_price}</p></div>
                );
            case "items":
                return (
                    <div><p className="text-center">{order.orderItems.length}</p></div> // Center-align items
                );
            case "actions":
                return (
                    <div className="flex justify-center space-x-4">
                        <FontAwesomeIcon icon={faEye} className="bg-gray-100 p-1 rounded-md"/>
                        <FontAwesomeIcon icon={faCircleXmark} className="bg-red-100 text-red-400 p-1 rounded-md"/>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    // Check if the order object exists and calculate totalMoneySpent
    let totalMoneySpent = 0;
    if (order && order.data) {
        totalMoneySpent = Math.round(order.data.totalMoneySpent * 100) / 100; // Ensure rounding correctly
    }

    return (
        <>
            <div className="flex gap-8">
                <DashboardCardItem title={"Orders"} value={order?.data?.totalOrders}
                                   icon={faCartShopping}></DashboardCardItem>
                <DashboardCardItem title={"Product Bought"} value={order?.data?.totalQuantity} icon={faBox}></DashboardCardItem>
                <DashboardCardItem title={"Total Money Spent"} value={"$" + totalMoneySpent} icon={faDollarSign}></DashboardCardItem>
            </div>
            <div className="mt-8 flex justify-between w-full rounded-lg bg-white border">
                <div className="w-full p-8">
                    <div className="flex items-center">
                        <div>
                            <Avatar src={user.avatar || "https://i.pravatar.cc/150?u=a04258114e29026708c"}
                                    className="w-20 h-20"/>
                        </div>
                        <div className="ml-4">
                            <p className="text-2xl font-bold">{user.name}</p>
                            <p className="text-lg">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-lg font-semibold">Home Address</p>
                            <p>
                                <span className="mr-1">
                                    <FontAwesomeIcon icon={faHouse} className="size-5"/>
                                </span>{user.home_address}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Delivery Address</p>
                            <p>
                                <span className="mr-1">
                                    <FontAwesomeIcon icon={faHouse} className="size-5"/>
                                </span>{user.delivery_address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-between p-8 mt-4">
                    <div className="space-y-4">
                        <div>
                            <p className="text-lg font-semibold">Phone Number</p>
                            <p>
                                <span className="mr-1">
                                    <FontAwesomeIcon icon={faHouse} className="size-5"/>
                                </span>{user.phonenumber}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Payment Methods</p>
                            <div className="flex space-x-4 items-center">
                                <Image src="/img/visa.png" alt="Visa" width={75} height={75} className="rounded"/>
                                <div>
                                    <p>Visa ending in 7658</p>
                                    <p>Expiry 10/2024</p>
                                </div>
                            </div>
                            <button className="justify-self-end bg-blue-500 text-white px-2 py-1 rounded"> Manage card
                            </button>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faPencil} className="size-4 m-2 hover:bg-gray-200 rounded-full p-2"/>
                </div>
            </div>
            <div className="mt-8 w-full rounded-lg bg-white border p-8">
                <p className="text-2xl font-bold">Latest Orders</p>
                <div className="mt-4">
                    <Table>
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "id" ? "start" : "center"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={order?.data?.orders || []}>
                            {(item) => (
                                <TableRow key={item._id}>
                                    {(columnKey) => <TableCell
                                        className="[horver]:bg-red-100">{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default ContentProfile;
