import DashboardCardItem from "@/app/admin/dashboard/cardItem";
import Seller from "@/app/admin/(user)/seller/seller";

export default function UserPage() {

    return (
        <>
            <div className="flex space-x-8">
                <DashboardCardItem></DashboardCardItem>
                <DashboardCardItem></DashboardCardItem>
                <DashboardCardItem></DashboardCardItem>
            </div>
            <div className="grid grid-cols-4 gap-6">
                <Seller/>
                <Seller/>
                <Seller/>
                <Seller/>
                <Seller/>
                <Seller/>
                <Seller/>
                <Seller/>
            </div>
            <div className="text-center text-blue-500 mt-4">
                <a href="#">More...</a>
            </div>

        </>
    );
}
