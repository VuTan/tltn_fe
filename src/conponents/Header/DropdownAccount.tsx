'use client'
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {signOut} from "next-auth/react";
import {UserIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useEffect, useState} from "react";
import {sendRequest} from "@/utils/apis";
import {faker} from "@faker-js/faker";

export default function DropdownAccount(props: any) {

    const {session} = props;
    const [user, setUser] = useState(null);  // State lưu người dùng ngẫu nhiên


    //user
    // useEffect(() => {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./';
    //
    //     const now = new Date(); // Lấy thời điểm hiện tại
    //     const startOfYear = new Date(now.getFullYear(), 0, 1); // Đầu năm hiện tại
    //
    //     const createdAt = faker.date.between({
    //         from: startOfYear,
    //         to: now,
    //     });
    //
    //     const updatedAt = faker.date.between({
    //         from: createdAt,
    //         to: now,
    //     });
    //
    //     const generateRandomPassword = () => {
    //         const part1 = '$2b$10$';
    //         let part2 = '';
    //         for (let i = 0; i < 53; i++) {
    //             part2 += characters[Math.floor(Math.random() * characters.length)];
    //         }
    //         return part1 + part2;
    //     };
    //
    //     const generateUsers = (count) => {
    //         const userList = [];
    //         for (let i = 0; i < count; i++) {
    //             const firstName = faker.person.firstName();
    //             const lastName = faker.person.lastName();
    //
    //             userList.push({
    //                 name: faker.person.fullName({ firstName, lastName }),
    //                 phone: faker.phone.number(),
    //                 email: faker.internet.email({ firstName, lastName, provider: '@gmail.com' }),
    //                 password: generateRandomPassword(),
    //                 address: faker.location.streetAddress({ useFullAddress: true }),
    //                 role: 'USERS',
    //                 accountType: 'LOCAL',
    //                 isActive: true,
    //                 codeId: faker.string.uuid(),
    //                 codeExpired: { $date: { $numberLong: String(createdAt.getTime() + 600000) } }, // +10 phút
    //                 createdAt: { $date: { $numberLong: String(createdAt.getTime()) } },
    //                 updatedAt: { $date: { $numberLong: String(updatedAt.getTime()) } },
    //             });
    //         }
    //         return userList;
    //     };
    //
    //     setUser(generateUsers(329)); // Tạo 10 user
    // }, []);
    // console.log(user)

    // order
//     const [orders, setOrders] = useState([]);  // State lưu danh sách đơn hàng
//     const [orderItemBefore, setOrderItemBefore] = useState([]);  // State lưu tất cả các order item ngẫu nhiên
//
// // Hàm lấy người dùng ngẫu nhiên
//     const fetchRandomUser = async () => {
//         try {
//             const response = await sendRequest<IBackendRes<any>>({
//                 url: "http://localhost:8080/api/users/random",
//                 method: "GET",
//             });
//
//             // Lấy người dùng ngẫu nhiên từ response
//             const userRandom = response.data[0];
//
//             // Cập nhật state với người dùng ngẫu nhiên
//             setUser(userRandom);
//         } catch (error) {
//             console.error("Error fetching user:", error);
//         }
//     };
//
// // Hàm tạo một ID Mongo ngẫu nhiên
//     const generateRandomMongoId = () => {
//         const timestamp = Math.floor(Date.now() / 1000).toString(16); // Lấy timestamp 4 byte
//         const randomValue = Math.floor(Math.random() * 0xFFFFFF).toString(16); // 3 byte ngẫu nhiên
//         const increment = Math.floor(Math.random() * 0xFFFFFF).toString(16); // 3 byte incremental
//
//         const characters = 'abcdef0123456789';
//         var incre = "";
//         for (let i = 0; i < 4; i++) {
//             incre += characters.charAt(Math.floor(Math.random() * characters.length));
//         }
//
//         // Đảm bảo độ dài của các phần là chính xác
//         const fullId = timestamp.padStart(8, '0') +
//             randomValue.padStart(6, '0') +
//             increment.padStart(6, '0') + incre;
//
//         return fullId; // Đảm bảo chuỗi có đúng 24 ký tự
//     };
//
//
// // Hàm tạo một order item ngẫu nhiên với trạng thái
//     const generateRandomOrderItem = (product.ts) => {
//         if (!product.ts) return null;
//
//         const id = generateRandomMongoId(); // Tạo ID ngẫu nhiên cho order item
//         const quantity = faker.number.int({min: 1, max: 5}); // Số lượng ngẫu nhiên
//         const price = product.ts.selectedOption ? product.ts.selectedOption.price * quantity : product.ts.price * quantity; // Tính giá
//
//         // Chọn trạng thái ngẫu nhiên cho order item
//         const statusOptions = ['Pending', 'Shipped', 'Delivered']; // Các trạng thái có thể có
//         const status = statusOptions[faker.number.int({min: 0, max: statusOptions.length - 1})]; // Chọn ngẫu nhiên trạng thái
//
//         return {
//             _id: {$oid: id},
//             product_id: {$oid: product.ts._id},  // Dùng product.ts._id gốc
//             quantity: quantity,
//             total_price: price,
//             option: product.ts.selectedOption ? product.ts.selectedOption : undefined, // Thêm option_id nếu có
//             status: status, // Thêm trạng thái cho order item
//         };
//     };
//
// // Hàm tạo nhiều order items ngẫu nhiên với trạng thái
//     const generateRandomOrderItems = (products) => {
//         const orderItems = [];
//         products.forEach((product.ts) => {
//             // Nếu sản phẩm có options, chọn ngẫu nhiên một option
//             const selectedOption = product.ts.options && product.ts.options.length > 0
//                 ? product.ts.options[faker.number.int({min: 0, max: product.ts.options.length - 1})]
//                 : null;
//
//             // Thêm thông tin option vào product.ts (nếu có)
//             const productWithOption = selectedOption
//                 ? {...product.ts, selectedOption} // Thêm selectedOption vào product.ts
//                 : product.ts;
//
//             // Tạo order item từ sản phẩm đã thêm option và thêm trạng thái
//             const orderItem = generateRandomOrderItem(productWithOption);
//             if (orderItem) orderItems.push(orderItem);
//         });
//         return orderItems;
//     };
//
// // Hàm lấy nhiều sản phẩm ngẫu nhiên (gọi API nhiều lần)
//     const fetchRandomProducts = async () => {
//         try {
//             const lop = faker.number.int({min: 1, max: 5});
//             const requests = Array.from({length: lop}, () =>
//                 sendRequest<IBackendRes<any>>({
//                     url: `http://localhost:8080/api/product/random`,
//                     method: "GET",
//                 })
//             );
//
//             // Chờ tất cả các yêu cầu API hoàn thành
//             const responses = await Promise.all(requests);
//
//             // Lấy dữ liệu từ mỗi API response
//             const products = responses.map((response) => response.data[0]);
//
//             // Tạo order items từ các sản phẩm ngẫu nhiên
//             const orderItemsList = generateRandomOrderItems(products);
//
//             // Lưu tất cả các order items vào orderItemBefore
//             setOrderItemBefore((prevItems) => [...prevItems, ...orderItemsList]);
//
//             return orderItemsList;
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };
//
// // Hàm kiểm tra đơn hàng đã tồn tại trong ngày hôm nay
//     const isOrderExists = (newOrder) => {
//         const today = new Date();
//         return orders.some((order) => {
//             const orderDate = new Date(order.createdAt.$date.$numberLong);
//             return orderDate.toDateString() === today.toDateString();
//         });
//     };
//
// // Hàm tạo một đơn hàng ngẫu nhiên cho mỗi người dùng
//     const createOrderForUser = (orderItemsList) => {
//         if (!user || orderItemsList.length === 0) {
//             console.error("Không thể tạo đơn hàng vì thiếu dữ liệu người dùng hoặc order items");
//             return;
//         }
//
//         try {
//             // Tính toán tổng giá trị đơn hàng từ các order items
//             const totalPrice = orderItemsList.reduce((acc, item) => acc + item.total_price, 0);
//             const deliveryFee = faker.number.int({min: 5, max: 20}); // Phí vận chuyển mặc định
//
//             const now = new Date(); // Lấy thời điểm hiện tại
//             const startOfYear = new Date(now.getFullYear(), 0, 1); // Đầu năm hiện tại
//             const createdAt = faker.date.between({from: startOfYear, to: now});
//             const updatedAt = faker.date.between({from: createdAt, to: now});
//
//             const newOrder = {
//                 user: {$oid: user._id}, // Thêm user ID vào
//                 total_price: totalPrice, // Tổng giá trị đơn hàng (bao gồm phí vận chuyển)
//                 delivery_fee: deliveryFee,
//                 orderItems: orderItemsList.map((item) => (item._id)), // Lưu id của các order item
//                 createdAt: {$date: {$numberLong: createdAt.getTime().toString()}}, // Ngày tạo
//                 updatedAt: {$date: {$numberLong: updatedAt.getTime().toString()}}, // Ngày cập nhật
//             };
//
//             // Kiểm tra xem đơn hàng đã tồn tại hay chưa
//             if (!isOrderExists(newOrder)) {
//                 // Cập nhật danh sách đơn hàng nếu chưa tồn tại đơn hàng trùng ngày
//                 setOrders((prevOrders) => [...prevOrders, newOrder]);
//             } else {
//                 console.log("Đơn hàng đã tồn tại trong ngày hôm nay.");
//             }
//         } catch (error) {
//             console.error("Error creating order:", error);
//         }
//     };
//
//
//     useEffect(() => {
//
//         for (let i = 0; i < 1; i++) {
//             if (!user) {
//                 fetchRandomUser(); // Chỉ gọi fetchRandomUser nếu chưa có user
//             } else {
//                 fetchRandomProducts().then((orderItemsList) => {
//                     createOrderForUser(orderItemsList); // Tạo đơn hàng cho user với các orderItems
//                 });
//             }
//         }
//     }, [user]);  // Khi user thay đổi, gọi lại hàm fetchRandomProducts và tạo các đơn hàng
//
//     console.log(orders)
//     console.log(orderItemBefore)

    return (
        <>

            {session ?
                (<div className="flex items-center gap-4">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <UserIcon className="size-8"></UserIcon>
                        </DropdownTrigger>
                        <DropdownMenu className="bg-white rounded-lg space-y-2"
                                      aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="my-2">
                                <p className="font-semibold">Welcome</p>
                                <p className="font-semibold">{session.user?.name}</p>
                            </DropdownItem>
                            <DropdownItem key="profile" className="hover:bg-gray-100">
                                <Link href="/profile"> Profile</Link>
                            </DropdownItem>
                            <DropdownItem key="logout" className="hover:bg-gray-100" onClick={() => signOut()}>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>)
                :
                (<div className="flex items-center gap-4 hover:bg-gray-100 rounded-full py-1 px-1 mx-1">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <UserIcon className="size-8"></UserIcon>
                        </DropdownTrigger>
                        <DropdownMenu className="bg-white rounded-lg space-y-3"
                                      aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="my-2 ">
                                <p className="font-semibold">Welcome</p>
                            </DropdownItem>
                            <DropdownItem key="login" className="hover:bg-gray-100">
                                <Link href="/login"> Login</Link>
                            </DropdownItem>
                            <DropdownItem key="register" className="hover:bg-gray-100">
                                <Link href="/register"> Register</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>)}
        </>
    );
}