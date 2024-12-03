import Buyer from "./buyer";
import DashboardCardItem from "@/app/admin/dashboard/cardItem";

export default function UserPage() {

    return (
        <>
            <div className="flex space-x-8">
                <DashboardCardItem></DashboardCardItem>
                <DashboardCardItem></DashboardCardItem>
                <DashboardCardItem></DashboardCardItem>
            </div>
            <div className="mt-8 bg-gray-200 p-6 bg-white">
                <h3 className="text-left text-xl font-semibold">Customer</h3>
                <div className="grid grid-cols-4 mt-2 px-4 py-2 bg-gray-50">
                    <p>Customer Name</p>
                    <p className="text-center">Total Amount</p>
                    <p className="text-center">Date created</p>
                    <p className="text-center">Action</p>
                </div>
                <Buyer/>
                <Buyer/>
                <Buyer/>
                <Buyer/>
                <Buyer/>
                <div className="text-center text-blue-500 mt-4">
                    <a href="#">More...</a>
                </div>
            </div>

        </>
    );
}
