'use client'
import {LineChart} from '@mui/x-charts/LineChart';
import DashboardCardItem from "@/app/admin/dashboard/cardItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleDot} from "@fortawesome/free-regular-svg-icons/faCircleDot";
import {Tab, Tabs} from "@nextui-org/react";
import SellerItem from "@/app/admin/dashboard/sellerItem";
import FeedbackItem from "@/app/admin/dashboard/feedbackItem";

export default function DashboardPage() {
    const data1 = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 1250, 7285, 2255, 6789];
    const data2 = [5400, 6398, 7800, 5908, 3800, 1800, 6300, 9250, 6285, 3255, 5789];
    const xLabels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Jun',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    return (
        <>
            <div className="flex space-x-8">
                <DashboardCardItem></DashboardCardItem>
                <DashboardCardItem></DashboardCardItem>
                <DashboardCardItem></DashboardCardItem>
                <DashboardCardItem></DashboardCardItem>
            </div>
            <div className=" p-4 bg-white mt-8 border-[1px] rounded">
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <FontAwesomeIcon icon={faCircleDot} className="text-[#00e3fc] size-6"/>
                        <p className="text-[#00e3fc] ml-2">Total sale</p>

                        <FontAwesomeIcon icon={faCircleDot} className="text-[#0055fc] size-6 ml-6"/>
                        <p className="text-[#0055fc] ml-2">Total Revenue</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-wrap gap-4">
                            <Tabs defaultSelectedKey="month" key="bordered" variant="bordered" radius="full"
                                  className="border rounded-full p-1">
                                <Tab key="week" title="Week"
                                     className="data-[focus]:bg-gray-200 outline-none"/>
                                <Tab key="month" title="Month"
                                     className="data-[focus]:bg-gray-200 outline-none"/>
                                <Tab key="year" title="Year"
                                     className="data-[focus]:bg-gray-200 outline-none"/>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <LineChart
                    width={1150}
                    height={300}
                    series={[{data: data1, color: "#00e3fc"}
                        , {data: data2, color: "#0055fc"}]}
                    xAxis={[{scaleType: 'point', data: xLabels}]}
                ></LineChart>
            </div>

            <div className="mt-8 flex space-x-8">
                <div className="w-3/5 bg-gray-200 p-6 bg-white">
                    <h3 className="text-left text-xl font-semibold">Top Seller</h3>
                    <div className="grid grid-cols-4 mt-2 px-4 py-2 bg-gray-50">
                        <p>Name</p>
                        <p className="text-center">Revenues</p>
                        <p className="text-center">Sales</p>
                        <p className="text-center">Conversion</p>
                    </div>
                    <SellerItem></SellerItem>
                    <SellerItem></SellerItem>
                    <SellerItem></SellerItem>
                    <SellerItem></SellerItem>
                    <SellerItem></SellerItem>
                    <div className="text-center text-blue-500 mt-4">
                        <a href="#">More...</a>
                    </div>
                </div>


                <div className="w-2/5 bg-gray-200 p-6 bg-white">
                    <h3 className="text-left text-xl font-semibold">Feedback</h3>
                    <div className="flex flex-col space-y-6">
                        <FeedbackItem></FeedbackItem>
                        <FeedbackItem></FeedbackItem>
                        <FeedbackItem></FeedbackItem>
                        <FeedbackItem></FeedbackItem>
                        <FeedbackItem></FeedbackItem>
                    </div>
                    <div className="text-center text-blue-500 mt-4">
                        <a href="#">More...</a>
                    </div>
                </div>
            </div>
        </>
    );
}
