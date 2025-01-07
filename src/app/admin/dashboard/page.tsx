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
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import {Select, SelectItem} from "@nextui-org/select";

const DashboardPage = () => {
    dayjs.extend(utc)
    const [day, setDay] = useState(dayjs().format('DD').toString())
    const [month, setMonth] = useState(dayjs().format('MM').toString())
    const [year, setYear] = useState(dayjs().format('YYYY').toString())
    const months = [
        {key: "01", label: "January"},
        {key: "02", label: "February"},
        {key: "03", label: "March"},
        {key: "04", label: "April"},
        {key: "05", label: "May"},
        {key: "06", label: "June"},
        {key: "07", label: "July"},
        {key: "08", label: "August"},
        {key: "09", label: "September"},
        {key: "10", label: "October"},
        {key: "11", label: "November"},
        {key: "12", label: "December"}
    ]

    const getDaysInMonth = (month: string, year: string) => {
        const daysInMonth = dayjs(`${year}-${month}`).daysInMonth(); // Lấy số ngày trong tháng
        return Array.from({length: daysInMonth}, (_, index) => ({
            key: String(index + 1).padStart(2, "0"), // Đảm bảo định dạng 2 chữ số
            label: String(index + 1),
        }));
    };

    const years = Array.from({length: 50}, (_, index) => ({
        key: String(2024 - index),
        label: String(2024 - index),
    }));

    const [dataChart, setDataChart] = useState()
    const [fetchChart, setFetchChart] = useState(false)
    const [typeChart, setTypeChart] = useState('Day')
    const [countOrder, setCountOrder] = new useState()
    const [countItems, setCountItems] = new useState()

    const {data: session} = useSession()

    const handleSelectChart = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
        setTypeChart(newValue)
    }

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
        if (day && month && year) {
            setFetchChart(true);
        }
    }, [day, month, year, typeChart]);

    useEffect(() => {
        const fetchData = async () => {
            if (session && fetchChart) {
                try {
                    const response = await sendRequest<IBackendRes<any>>({
                        url: `http://localhost:8080/api/order/${typeChart}`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${session?.user?.access_token}`,
                        },
                        queryParams: {
                            day: day,
                            month: month,
                            year: year,
                        },
                    });

                    setDataChart(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setFetchChart(false);
                }
            }
        };

        if (fetchChart) {
            fetchData();
        }

    }, [session, typeChart, fetchChart, day, month, year]);

    const revenue = Array.isArray(dataChart) ? dataChart.map(item => item.totalRevenue) : [];
    const productSell = Array.isArray(dataChart) ? dataChart.map(item => item.totalProductsSell) : [];
    const totalDelivery = Array.isArray(dataChart) ? dataChart.map(item => item.totalDeliveryFee) : [];
    const xLabels = Array.isArray(dataChart) ? dataChart.map(item => item.title.split("-").pop()) : [];


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
                    <div className="flex space-x-4">
                        {typeChart === "Hour" && (
                            <>
                                <Select label="Year" placeholder="Select year" defaultSelectedKeys={[year]}
                                        className="mb-4 min-w-36"
                                        onSelectionChange={(value) => setYear(value.currentKey)}>
                                    {years.map((year) => (
                                        <SelectItem key={year.key}>{year.label}</SelectItem>
                                    ))}
                                </Select>
                                <Select label="Month" placeholder="Select month" defaultSelectedKeys={[month]}
                                        className="mb-4 min-w-36"
                                        onSelectionChange={(value) => setMonth(value.currentKey)}>
                                    {months.map((month) => (
                                        <SelectItem key={month.key}>{month.label}</SelectItem>
                                    ))}
                                </Select>
                                <Select label="Day" placeholder="Select day" defaultSelectedKeys={[day]}
                                        className="mb-4 min-w-36"
                                        onSelectionChange={(value) => setDay(value.currentKey)}>
                                    {getDaysInMonth(month).map((day) => (
                                        <SelectItem key={day.key}>{day.label}</SelectItem>
                                    ))}
                                </Select>
                            </>
                        )}
                        {typeChart === "Day" && (
                            <>
                                <Select label="Year" placeholder="Select year" defaultSelectedKeys={[year]}
                                        className="mb-4 min-w-36"
                                        onSelectionChange={(value) => setYear(value.currentKey)}>
                                    {years.map((year) => (
                                        <SelectItem key={year.key}>{year.label}</SelectItem>
                                    ))}
                                </Select>
                                <Select label="Month" placeholder="Select month" defaultSelectedKeys={[month]}
                                        className="mb-4 min-w-36"
                                        onSelectionChange={(value) => setMonth(value.currentKey)}>
                                    {months.map((month) => (
                                        <SelectItem key={month.key}>{month.label}</SelectItem>
                                    ))}
                                </Select>
                            </>
                        )}

                        {typeChart === "Month" && (
                            <Select label="Year" placeholder="Select year" defaultSelectedKeys={[year]}
                                    className="mb-4 min-w-36"
                                    onSelectionChange={(value) => setYear(value.currentKey)}>
                                {years.map((year) => (
                                    <SelectItem key={year.key}>{year.label}</SelectItem>
                                ))}
                            </Select>
                        )}

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
                                <ToggleButton value="Hour">Day</ToggleButton>
                                <ToggleButton value="Day">Month</ToggleButton>
                                <ToggleButton value="Month">Year</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                </div>
                {dataChart && (
                    <> <LineChart
                        height={275}
                        series={[{data: revenue, color: "#00e3fc", label: "Revenue"}]}
                        xAxis={[{scaleType: 'point', label: typeChart, data: xLabels}]}

                    ></LineChart>
                        <LineChart
                            height={275}
                            series={[{data: productSell, color: "#0055fc", label: "Product Sell"},
                                {data: totalDelivery, color: "#000000", label: "Delivery Fee"}]}
                            xAxis={[{scaleType: 'point', label: typeChart, data: xLabels}]}
                        ></LineChart>
                    </>
                )}
            </div>

            {/*<div className="mt-8 flex space-x-8">*/}
            {/*    <div className="w-3/5 bg-gray-200 p-6 bg-white">*/}
            {/*        <h3 className="text-left text-xl font-semibold">Top Seller</h3>*/}
            {/*        <div className="grid grid-cols-4 mt-2 px-4 py-2 bg-gray-50">*/}
            {/*            <p>Name</p>*/}
            {/*            <p className="text-center">Revenues</p>*/}
            {/*            <p className="text-center">Sales</p>*/}
            {/*            <p className="text-center">Conversion</p>*/}
            {/*        </div>*/}
            {/*        <SellerItem></SellerItem>*/}
            {/*        <SellerItem></SellerItem>*/}
            {/*        <SellerItem></SellerItem>*/}
            {/*        <SellerItem></SellerItem>*/}
            {/*        <SellerItem></SellerItem>*/}
            {/*        <div className="text-center text-blue-500 mt-4">*/}
            {/*            <a href="#">More...</a>*/}
            {/*        </div>*/}
            {/*    </div>*/}


            {/*    <div className="w-2/5 bg-gray-200 p-6 bg-white">*/}
            {/*        <h3 className="text-left text-xl font-semibold">Feedback</h3>*/}
            {/*        <div className="flex flex-col space-y-6">*/}
            {/*            <FeedbackItem></FeedbackItem>*/}
            {/*            <FeedbackItem></FeedbackItem>*/}
            {/*            <FeedbackItem></FeedbackItem>*/}
            {/*            <FeedbackItem></FeedbackItem>*/}
            {/*            <FeedbackItem></FeedbackItem>*/}
            {/*        </div>*/}
            {/*        <div className="text-center text-blue-500 mt-4">*/}
            {/*            <a href="">More...</a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default DashboardPage;