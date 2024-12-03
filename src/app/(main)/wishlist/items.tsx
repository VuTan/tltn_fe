import React from "react";
import Image from "next/image";

export default function WishListItem() {

    return (
        <tr>
            <td><Image src="/img/item.png" width={100} height={100}></Image></td>
            <td>
                <p>Apple Watch</p>
            </td>
            <td>
                In Stock
            </td>
            <td>
                <a href="#"
                   className="font-medium text-red-600 dark:text-red-500 hover:underline">Add to cart</a>
            </td>
        </tr>
    )
}
