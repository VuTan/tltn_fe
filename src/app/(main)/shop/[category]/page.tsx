import React from "react";
import Filter from "@/app/(main)/shop/Filter";
import ContentShop from "@/app/(main)/shop/Content";

const ShopPage = async () => {
    
    return (
        <div className="flex space-x-4 mb-2">
            <Filter/>
            <ContentShop/>
        </div>
    );
}
export default ShopPage;
