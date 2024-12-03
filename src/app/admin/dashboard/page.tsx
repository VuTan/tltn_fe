'use client'
import {LineChart} from '@mui/x-charts/LineChart';
import DashboardCardItem from "@/app/admin/dashboard/cardItem";
import SellerItem from "@/app/admin/dashboard/sellerItem";
import FeedbackItem from "@/app/admin/dashboard/feedbackItem";
import {useEffect, useState} from "react";
import {sendRequest} from "@/utils/apis";
import {useSession} from "next-auth/react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {faBox} from "@fortawesome/free-solid-svg-icons/faBox";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons/faDollarSign";
import {DateRangePicker} from "@nextui-org/date-picker";
import {parseDate} from "@internationalized/date";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';


const DashboardPage = () => {
    dayjs.extend(utc)
    const [dataChart, setDataChart] = useState()
    const [selectedRange, setSelectedRange] = useState({
        start: parseDate("2024-01-01"),
        end: parseDate("2024-12-31"),
    });
    const [typeChart, setTypeChart] = useState('monthly')

    const [countOrder, setCountOrder] = new useState()
    const [countItems, setCountItems] = new useState()

    const {data: session} = useSession()

    const handleSelectChart = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
            setTypeChart(newValue)
            if (newValue === "daily") {
                setSelectedRange({
                    start: parseDate(dayjs().startOf('month').format("YYYY-MM-DD")),
                    end: parseDate(dayjs().endOf('month').format("YYYY-MM-DD")),
                })
            } else if (newValue === "monthly") {
                setSelectedRange({
                    start: parseDate(dayjs().startOf('year').format("YYYY-MM-DD")),
                    end: parseDate(dayjs().endOf('year').format("YYYY-MM-DD")),
                })
            } else {
                setSelectedRange({
                    start: parseDate(dayjs().startOf('year').subtract(3, 'year').format("YYYY-MM-DD")),
                    end: parseDate(dayjs().startOf('year').format("YYYY-MM-DD")),
                })
            }
        }
    ;

    useEffect(() => {
        if (session) {
            sendRequest<IBackendRes<any>>({
                url: `http://localhost:8080/api/order/count`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                }
            }).then((response) => {
                setCountOrder(response.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });

            const items = sendRequest<IBackendRes<any>>({
                url: `http://localhost:8080/api/order-item/count`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                }
            }).then((response) => {
                setCountItems(response.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        }
    }, [session]);

    useEffect(() => {
        if (session) {
            sendRequest<IBackendRes<any>>({
                url: `http://localhost:8080/api/order/revenue`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                },
                queryParams: {
                    start: selectedRange.start,
                    end: selectedRange.end,
                    groupBy: typeChart
                }
            }).then((response) => {
                setDataChart(response.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        }
    }, [typeChart, session, selectedRange]);


    console.log(dataChart)
    const revenue = dataChart?.map(item => item.totalRevenue);
    const productSell = dataChart?.map(item => item.totalProductsSell);
    const totalDelivery = dataChart?.map(item => item.totalDeliveryFee);
    const xLabels = dataChart?.map(item => item.title);

    return (
        <>
            <div className="flex space-x-8">
                <DashboardCardItem title={"Orders"} value={countOrder?.toLocaleString("en-US")}
                                   icon={faCartShopping}></DashboardCardItem>
                <DashboardCardItem title={"Product Sold"} value={countItems?.totalQuantity.toLocaleString("en-US")}
                                   icon={faBox}></DashboardCardItem>
                <DashboardCardItem title={"Total Money Spent"}
                                   value={"$" + (countItems ? countItems?.totalPrice.toLocaleString("en-US") : "0")}
                                   icon={faDollarSign}></DashboardCardItem>
            </div>
            <div className=" p-4 bg-white mt-8 border-[1px] rounded">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <DateRangePicker
                            label="Stay duration"
                            className="max-w-xs"
                            onChange={(range) => {
                                setSelectedRange(range);
                            }}
                            value={{
                                start: selectedRange.start,
                                end: selectedRange.end,
                            }}
                            defaultValue={{
                                start: parseDate("2024-01-01"),
                                end: parseDate("2024-12-31"),
                            }}

                        />
                    </div>
                    <div className="flex">
                        <div className="flex flex-wrap gap-4">
                            <ToggleButtonGroup
                                color="primary"
                                exclusive
                                value={typeChart}
                                onChange={handleSelectChart}
                                aria-label="Platform"
                                className="rounded-full"
                            >
                                <ToggleButton value="daily">Day</ToggleButton>
                                <ToggleButton value="monthly">Month</ToggleButton>
                                <ToggleButton value="yearly">Year</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                </div>
                {dataChart && (
                    <> <LineChart
                        height={275}
                        series={[{data: revenue, color: "#00e3fc", label: "Revenue"}]}
                        xAxis={[{scaleType: 'point', data: xLabels}]}

                    ></LineChart>
                        <LineChart
                            height={275}
                            series={[{data: productSell, color: "#0055fc", label: "Product Sell"},
                                {data: totalDelivery, color: "#000000", label: "Delivery Fee"}]}
                            xAxis={[{scaleType: 'point', data: xLabels}]}
                        ></LineChart>
                    </>
                )}
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
                        <a href="">More...</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;
