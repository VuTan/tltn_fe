'use client'
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapLocationDot} from "@fortawesome/free-solid-svg-icons/faMapLocationDot";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {LineChart} from "@mui/x-charts/LineChart";
import {Button} from "@headlessui/react";
import Rate from "@/conponents/Rate";
import CardSeller from "@/app/admin/(user)/seller/detail/card";
import OrderListItem from "@/app/admin/(user)/seller/detail/OrderListItem";
import {Select, SelectItem} from "@nextui-org/select";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {sendRequest} from "@/utils/apis";
import TableHeader from "@/app/admin/(user)/buyer/TableHeader";
import PaginationComponent from "@/conponents/Pagination";
import ProductListItem from "@/app/admin/(user)/seller/detail/productListItem";
import SearchBar from "@/app/admin/(user)/buyer/SearchBar";
import Modal from "@/conponents/Popup";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const headerProduct = [
    {name: "Name", key: "name", align: "left", sort: true},
    {name: "Price", key: 'price', align: "center", sort: true},
    {name: "Stock", key: 'stock', align: "center", sort: true},
    {name: "Category", align: 'center', sort: false},
    {name: "Rate", key: 'rate', align: "center", sort: true},
    {name: "Action", align: "center", sort: false},
]

export default function StorePage(props: IProps) {
    dayjs.extend(utc)
    const [day, setDay] = useState(dayjs().format('DD').toString())
    const [month, setMonth] = useState(dayjs().format('MM').toString())
    const [year, setYear] = useState(dayjs().format('YYYY').toString())
    const [dataChart, setDataChart] = useState()
    const [fetchChart, setFetchChart] = useState(false)
    const [typeChart, setTypeChart] = useState('Day')
    const [product, setProduct] = useState(null)
    const [order, setOrder] = useState(null)

    const current = props?.searchParams?.page ?? 1;
    const limit = props?.searchParams?.limit ?? 10;
    const sort = props?.searchParams?.sort ?? '';
    const search = props?.searchParams?.search ?? '';


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
        key: String(2025 - index),
        label: String(2025 - index),
    }));

    const {data: session} = useSession()

    const handleSelectChart = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
        setTypeChart(newValue)
    }

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

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                try {
                    const response = await sendRequest<IBackendRes<any>>({
                        url: `http://localhost:8080/api/supplier/${session?.user._id}/products`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${session?.user?.access_token}`
                        },
                        queryParams: {
                            page: current,
                            limit: limit,
                            sort: sort,
                            search: search,
                        },
                        nextOption: {
                            next: {tags: ['list-product']}
                        }
                    });

                    setProduct(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [props.searchParams, session]);

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                try {
                    const response = await sendRequest<IBackendRes<any>>({
                        url: `http://localhost:8080/api/supplier/${session?.user._id}/order-items`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${session?.user?.access_token}`
                        },
                        queryParams: {
                            page: current,
                            limit: limit,
                            sort: sort,
                            search: search,
                        },
                        nextOption: {
                            next: {tags: ['list-order']}
                        }
                    });

                    setOrder(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();

    }, [props.searchParams, session]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (session) {
    //             try {
    //                 const response = sendRequest<IBackendRes<any>>({
    //                     url: `http://localhost:8080/api/supplier/${session?.user._id}/products`,
    //                     method: "GET",
    //                     headers: {
    //                         Authorization: `Bearer ${session?.user?.access_token}`
    //                     },
    //                     nextOption: {
    //                         next: {tags: ['list-product']}
    //                     }
    //                 });
    //
    //                 setDataChart(response.data);
    //             } catch (error) {
    //                 console.error("Error fetching data:", error);
    //             } finally {
    //                 setFetchChart(false);
    //             }
    //         }
    //     };
    //
    //     if (fetchChart) {
    //         fetchData();
    //     }
    //
    // }, [session, typeChart, fetchChart, day, month, year]);

    const revenue = Array.isArray(dataChart) ? dataChart.map(item => item.totalRevenue) : [];
    const productSell = Array.isArray(dataChart) ? dataChart.map(item => item.totalProductsSell) : [];
    const totalDelivery = Array.isArray(dataChart) ? dataChart.map(item => item.totalDeliveryFee) : [];
    const xLabels = Array.isArray(dataChart) ? dataChart.map(item => item.title.split("-").pop()) : [];

    const [isModalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <div className='px-32 py-8 bg-gray-100'>
            <Modal type={'product'} open={isModalOpen} onClose={toggleModal} title={"Product"}/>
            <div className="bg-white w-full">
                <div className="flex">
                    <div className="flex flex-col w-2/8 p-8 border-r-2">
                        <div className="bg-gray-200 p-4 justify-items-center">
                            <Image src="/img/samsung.png" width={200} height={175}></Image>
                        </div>
                        <div className="flex flex-col justify-between px-4">
                            <div>
                                <h3 className="text-xl text-left font-bold">Samsung</h3>
                                <p className="text-sm font-light">(Most Selling Fashion Brand)</p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="flex px-2 py-1 rounded-lg">
                                    <Rate></Rate>
                                </div>
                                <p>4.5/5</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="flex space-x-2 ">
                                    <FontAwesomeIcon icon={faMapLocationDot} className="bg-gray-100 p-2 rounded-lg"/>
                                    <p>100, Seul, Korea</p>
                                </div>
                                <div className="flex space-x-2">
                                    <FontAwesomeIcon icon={faEnvelope} className="bg-gray-100 p-2 rounded-lg"/>
                                    <p>samsung@gmail.com</p>
                                </div>
                                <div className="flex space-x-2">
                                    <FontAwesomeIcon icon={faPhone} className="bg-gray-100 p-2 rounded-lg"/>
                                    <p>+243 812-801-9335</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4">
                        <div className="bg-white mt-8 border-[1px] rounded">
                            <div className=" p-2 flex justify-between items-center">
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
                                            <Select label="Month" placeholder="Select month"
                                                    defaultSelectedKeys={[month]}
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
                                            <Select label="Month" placeholder="Select month"
                                                    defaultSelectedKeys={[month]}
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
                                    height={175}
                                    series={[{data: revenue, color: "#00e3fc", label: "Revenue"}]}
                                    xAxis={[{scaleType: 'point', label: typeChart, data: xLabels}]}

                                ></LineChart>
                                    <LineChart
                                        height={175}
                                        series={[{data: productSell, color: "#0055fc", label: "Product Sell"},
                                            {data: totalDelivery, color: "#000000", label: "Delivery Fee"}]}
                                        xAxis={[{scaleType: 'point', label: typeChart, data: xLabels}]}
                                    ></LineChart>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <hr className="mt-4 mx-8"/>
                <div className="p-8">
                    <h3 className="text-xl font-bold text-left">Our Story: </h3>
                    <p className="tetx-sm font-light">At ZARA, we believe that fashion is more than just clothing it' s
                        an
                        expression of individuality and a
                        celebration of diversity. Founded in 2003, our journey began with a simple yet powerful vision:
                        to
                        create high-quality, stylish, and comfortable apparel that resonates with people from all walks
                        of
                        life.</p>
                    <h3 className="text-xl font-bold text-left mt-4">Our Mission: </h3>
                    <p className="tetx-sm font-light">Our mission is to redefine fashion by merging timeless elegance
                        with
                        contemporary design. We strive
                        to offer clothing that not only looks good but also feels good, making everyday wear an
                        enjoyable
                        experience. At the heart of our brand is a commitment to quality, sustainability, and customer
                        satisfaction.</p>
                </div>
                <div className="grid grid-cols-4 gap-6 p-8">
                    <CardSeller/>
                    <CardSeller/>
                    <CardSeller/>
                    <CardSeller/>
                </div>
            </div>

            {/*List Product*/}
            <div className="mt-8 bg-white p-8">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">All Product List</h1>
                    <div className='flex items-center space-x-5 text-nowrap'>
                        <SearchBar placeholder={"Search product..."}/>
                        <Button onClick={toggleModal} className="bg-orange-400 rounded-lg px-2 py-1">Add
                            Product</Button>
                    </div>
                </div>
                <TableHeader header={headerProduct}/>
                <div className="py-2">
                    {product && product?.products.map((item) => (
                        <ProductListItem data={item}></ProductListItem>
                    ))}
                </div>
                <div className="flex w-full justify-end mt-4">
                    <PaginationComponent current={current} limit={limit} totalPage={product?.totalPages}/>
                </div>
            </div>

            {/*List Order*/}
            <div className="mt-8 bg-white p-8">
                <h1 className="text-xl text-left font-semibold">All Order List</h1>
                <div className="mt-4 grid grid-cols-8 py-2 px-4 bg-gray-100 font-semibold text-center">
                    <p>Id</p>
                    <p>Created At</p>
                    <p>Customer</p>
                    <p>Total</p>
                    <p>Payment Status</p>
                    <p>Quantity</p>
                    <p>Order Status</p>
                    <p>Action</p>
                </div>
                <div className="py-2 px-4">
                    {order && order?.slice(0, 10).map((item) => (
                        <OrderListItem data={item}></OrderListItem>
                    ))}
                </div>
                <div className="flex w-full justify-end mt-4">
                    <PaginationComponent current={1} limit={10} totalPage={10}/>
                </div>
            </div>
        </div>
    );
}
