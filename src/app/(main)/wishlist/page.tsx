import React from "react";
import WishListItem from "@/app/(main)/wishlist/items";

const WishListPage = () => {
    return (
        <div className="h-screen p-24">
            <div className="flex flex-col bg-gray-100 border-2 rounded-lg p-12">
                <h2 className="text-left text-2xl">My Wishlist</h2>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <span className="sr-only">Image</span>
                        </th>
                        <th>
                            Product
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <WishListItem></WishListItem>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
export default WishListPage;
