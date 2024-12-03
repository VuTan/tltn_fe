import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapLocationDot} from "@fortawesome/free-solid-svg-icons/faMapLocationDot";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {LineChart} from "@mui/x-charts/LineChart";
import {Button} from "@headlessui/react";
import Rate from "@/conponents/Rate";
import CardSeller from "@/app/admin/(user)/seller/detail/card";
import ProductListItem from "@/app/admin/(user)/seller/detail/productListItem";
import OrderListItem from "@/app/admin/(user)/seller/detail/OrderListItem";


export default function SellerDetailPage() {
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
            <div className="bg-white w-full">
                <div className="flex">
                    <div className="flex w-3/8 p-8 border-r-2">
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
                    <div className="w-4/8 p-4">
                        <LineChart
                            className="w-full"
                            height={275}
                            series={[{data: data1, color: "#00e3fc", label: "Total"}
                                , {data: data2, color: "#0055fc", label: "Seller"}]}
                            xAxis={[{scaleType: 'point', data: xLabels}]}
                        ></LineChart>
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
                    <Button className="bg-orange-400 rounded-lg px-2 py-1">Add Product</Button>
                </div>
                <div className="mt-4 grid grid-cols-6 py-2 px-4 bg-gray-100 font-semibold text-center">
                    <p className="text-left">Name</p>
                    <p>Price</p>
                    <p>Stock</p>
                    <p>Category</p>
                    <p>Rating</p>
                    <p>Action</p>
                </div>
                <div className="py-2">
                    <ProductListItem></ProductListItem>
                    <ProductListItem></ProductListItem>
                    <ProductListItem></ProductListItem>
                    <ProductListItem></ProductListItem>
                    <ProductListItem></ProductListItem>
                    <ProductListItem></ProductListItem>
                    <div className="text-center text-blue-500 mt-4">
                        <a href="#">More...</a>
                    </div>
                </div>
            </div>

            {/*List Order*/}
            <div className="mt-8 bg-white p-8">
                <h1 className="text-xl text-left font-semibold">All Order List</h1>
                <div className="mt-4 grid grid-cols-8 py-2 px-4 bg-gray-100 font-semibold text-center">
                    <p className="text-left">Id</p>
                    <p>Created At</p>
                    <p>Customer</p>
                    <p>Total</p>
                    <p>Payment Status</p>
                    <p>Item</p>
                    <p>Order Status</p>
                    <p>Action</p>
                </div>
                <div className="py-2 px-4">
                    <OrderListItem></OrderListItem>
                    <OrderListItem></OrderListItem>
                    <OrderListItem></OrderListItem>
                    <OrderListItem></OrderListItem>
                    <OrderListItem></OrderListItem>
                    <OrderListItem></OrderListItem>
                    <div className="text-center text-blue-500 mt-4">
                        <a href="#">More...</a>
                    </div>
                </div>
            </div>
        </>
    );
}
