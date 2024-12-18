import Link from "next/link";
import ActionMethod from "@/conponents/actionMethod";
import OrderStatus from "@/app/admin/(user)/seller/detail/OrderStatus";
import dayjs from "dayjs";

export default function OrderListItem({data}) {
    return (
        <div className="grid grid-cols-8 text-center items-center border-b-2 py-4 last:boder-b-0">
            <p className="text-left text-xs font-light text-gray-400">#{data._id}</p>
            <p>{dayjs(data?.createdAt).format('DD/MM/YYYY, HH:mm:ss')}</p>
            <Link href="#" className="text-left text-blue-400 line-clamp-2">{data.product_id.name}</Link>
            <p>${Math.round(+data.total_price * 100) / 100}</p>
            <p>Payment</p>
            <p>{data.quantity}</p>
            <div className="flex justify-center"><OrderStatus status={data.status[data.status.length-1].title}/></div>
            <ActionMethod type={'order-item'} data={data._id}/>
        </div>
    );
}
