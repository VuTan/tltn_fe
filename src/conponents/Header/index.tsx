import React from 'react';
import Dropdown, {DropdownLanguage} from "@/conponents/Header/DropdownLanguage";
import {HeartIcon, ShoppingCartIcon} from "@heroicons/react/24/outline";
import SearchBar from "@/conponents/Header/SearchBar";
import Link from "next/link";
import DropdownAccount from "@/conponents/Header/DropdownAccount";
import {auth} from "@/auth";

async function Header() {
    const langDropDown: DropdownLanguage[] = [
        {
            content: "English",
            href: "#",
            select: true
        },
        {
            content: "VietNam",
            href: "#",
            select: false
        }
    ]

    const session = await auth();
    return (
        <div className="">
            <div className="relative h-12 px-32 flex justify-center items-center bg-surface-100 ">
                <p className="text-nowrap text-white">Summer Sale For All Swim Suits And Free Express Delivery - OFF
                    50%!</p>
                <a href="#" className="text-white p-3 font-bold underline"> ShopNow</a>

                <div className="absolute right-0 mr-32">
                    <Dropdown items={langDropDown}/>
                </div>
            </div>
            <div className="h-20 px-32 flex justify-between items-center bg-white text-black">
                <div>
                    <p className="text-3xl text-black font-bold">Exclusive</p>
                </div>
                <div className="flex mx-2">
                    <Link href="/" className="mx-12 text-xl text-black">Home</Link>
                    <a className="mx-12 text-xl text-black">Contact</a>
                    <a className="mx-12 text-xl text-black">About</a>
                    {session?.user.role === "ADMIN" && (
                        <Link href="/admin/dashboard" className="mx-12 text-xl text-black">Admin</Link>
                    )}
                    {session?.user.role === "SELLER" && (
                        <Link href={"/store"} className="mx-12 text-xl text-black">My Store</Link>
                    )}
                </div>
                <div className="flex items-center">
                    <SearchBar></SearchBar>
                    <div className="flex px-6">
                        <Link href="/cart" className="hover:bg-gray-100 rounded-full py-1 px-1 mx-1">
                            <ShoppingCartIcon className="size-8"></ShoppingCartIcon>
                        </Link>
                        <Link href={'/wishlist'} className="hover:bg-gray-100 rounded-full py-1 px-1 mx-1">
                            <HeartIcon className="size-8"></HeartIcon>
                        </Link>

                        <DropdownAccount session={session}></DropdownAccount>
                    </div>
                </div>
            </div>
            <hr className="w-full"/>
            <div></div>
        </div>
    );
}

export default Header;