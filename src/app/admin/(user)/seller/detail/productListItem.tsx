'use client'
import {useState} from "react";
import Image from "next/image";
import Rate from "@/conponents/Rate";
import ActionMethod from "@/conponents/actionMethod";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {handleUpdateProduct} from "@/utils/actions";

export default function ProductListItem({data}) {
    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.des?.join("\n\n") || "");
    const [price, setPrice] = useState(data.price);
    const session = useSession()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            _id: data._id,
            name: name,
            base_price: +price,
            describe: description,
        }
        console.log(updatedData)
        const res = await handleUpdateProduct('product', updatedData)
        console.log(res)
        if (res?.data) {
            toast.success('Update succeeded!');
        } else {
            toast.error(res.message);
        }
    };


    return (
        <div className="grid grid-cols-6 text-center items-center border-b-2 py-4 last:boder-b-0">
            <div className="flex space-x-2 items-center">
                <Image src={data.imgs[0]} alt={""} width={75} height={75}/>
                <h3 className="text-left overflow-hidden text-ellipsis line-clamp-2">{data.name}</h3>
            </div>
            <p>${data.price}</p>
            <div>
                <p className="text-sm">{data.stock} item left</p>
                <p className="font-light text-sm">1256 sold</p>
            </div>
            <p>{data.category}</p>
            <div className='flex justify-center'>
                <Rate rate={data.rate}/>
                <p className='font-light'>({data.ratings})</p>
            </div>
            <ActionMethod type="product" data={data}/>
        </div>
    );
}
