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
//     const generateRandomOrderItem = (product) => {
//         if (!product) return null;
//
//         const id = generateRandomMongoId(); // Tạo ID ngẫu nhiên cho order item
//         const quantity = faker.number.int({min: 1, max: 5}); // Số lượng ngẫu nhiên
//         const price = product.selectedOption ? product.selectedOption.price * quantity : product.price * quantity; // Tính giá
//
//         // Chọn trạng thái ngẫu nhiên cho order item
//         const statusOptions = ['Pending', 'Shipped', 'Delivered']; // Các trạng thái có thể có
//         const status = statusOptions[faker.number.int({min: 0, max: statusOptions.length - 1})]; // Chọn ngẫu nhiên trạng thái
//
//         return {
//             _id: {$oid: id},
//             product_id: {$oid: product._id},  // Dùng product._id gốc
//             quantity: quantity,
//             total_price: price,
//             option: product.selectedOption ? product.selectedOption : undefined, // Thêm option_id nếu có
//             status: status, // Thêm trạng thái cho order item
//         };
//     };
//
// // Hàm tạo nhiều order items ngẫu nhiên với trạng thái
//     const generateRandomOrderItems = (products) => {
//         const orderItems = [];
//         products.forEach((product) => {
//             // Nếu sản phẩm có options, chọn ngẫu nhiên một option
//             const selectedOption = product.options && product.options.length > 0
//                 ? product.options[faker.number.int({min: 0, max: product.options.length - 1})]
//                 : null;
//
//             // Thêm thông tin option vào product (nếu có)
//             const productWithOption = selectedOption
//                 ? {...product, selectedOption} // Thêm selectedOption vào product
//                 : product;
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

    // const [suppliers, setSuppliers] = useState([]); // State lưu suppliers
    // const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading
    //
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await sendRequest<IBackendRes<any>>({
    //                 url: "http://localhost:8080/api/product",
    //                 method: "GET",
    //             });
    //
    //             // Lấy danh sách sản phẩm từ response
    //             const products = response.data.products;
    //
    //             // Gọi hàm để tạo suppliers từ danh sách sản phẩm
    //             const suppliersData = await createSuppliersFromProducts(products);
    //
    //             // Cập nhật state suppliers
    //             setSuppliers(suppliersData);
    //             setLoading(false); // Đổi trạng thái loading khi xong
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //             setLoading(false); // Đảm bảo loading = false nếu có lỗi
    //         }
    //     };
    //
    //     fetchProducts();
    // }, []);
    //
    // // Hàm tạo suppliers từ danh sách sản phẩm
    // async function createSuppliersFromProducts(products) {
    //     // Mảng sẽ lưu các supplier
    //     const suppliers = [];
    //
    //     // Tạo một đối tượng để nhóm các sản phẩm theo category
    //     const categories = {};
    //
    //     // Duyệt qua tất cả sản phẩm để nhóm theo category
    //     products.forEach((product) => {
    //         if (!categories[product.category]) {
    //             categories[product.category] = [];
    //         }
    //         categories[product.category].push(product);
    //     });
    //
    //     // Duyệt qua các category và tạo supplier cho mỗi category
    //     for (const category in categories) {
    //         // Lấy người dùng ngẫu nhiên cho supplier
    //         const user = await fetchRandomUser();
    //
    //         // Kiểm tra xem user có tồn tại và có trường _id không
    //         if (!user || !user._id) {
    //             console.warn(`User for category ${category} not found or missing _id`);
    //             continue; // Bỏ qua nếu không tìm được người dùng hợp lệ
    //         }
    //
    //         const supplier = {
    //             name: category,
    //             address: faker.location.streetAddress({useFullAddress: true}),
    //             _id: {$oid: generateObjectId()},
    //             user_id: {$oid: user._id}, // Gắn user vào supplier
    //             email: faker.internet.email({firstName: category}),
    //             phone: faker.phone.number(),
    //             story: faker.lorem.words(25),
    //             mission: faker.lorem.words(30),
    //             isActive: true,
    //             products: categories[category].map((item) => ({$oid: item._id})), // Chỉ lấy ID sản phẩm
    //         };
    //         console.log(supplier)
    //         suppliers.push(supplier);
    //     }
    //     console.log(suppliers)
    //     return suppliers;
    // }
    //
    // // Hàm lấy người dùng ngẫu nhiên (giả lập hoặc có thể gọi API để lấy)
    // async function fetchRandomUser() {
    //     try {
    //         const response = await sendRequest<IBackendRes<any>>({
    //             url: "http://localhost:8080/api/users/random", // API lấy người dùng ngẫu nhiên
    //             method: "GET",
    //         });
    //         return response.data[0]; // Giả sử API trả về một người dùng
    //     } catch (error) {
    //         console.error("Error fetching user:", error);
    //         return null; // Trả về null nếu có lỗi
    //     }
    // }
    //
    // // Hàm tạo ID ngẫu nhiên (giả lập việc tạo ObjectId)
    // function generateObjectId() {
    //     const hexDigits = "0123456789abcdef";
    //     let objectId = "";
    //     for (let i = 0; i < 24; i++) {
    //         const randomIndex = Math.floor(Math.random() * hexDigits.length);
    //         objectId += hexDigits[randomIndex];
    //     }
    //     return objectId;
    // }
    //
    // console.log(suppliers)
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