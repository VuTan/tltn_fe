import {Avatar} from "@mui/material";
import ActionMethod from "@/conponents/actionMethod";
import dayjs from "dayjs";

export default function Buyer({data}) {
    return (
        <div className="grid grid-cols-5 py-3 px-4 border-b border-gray-300 last:border-b-0 items-center">
            <div className="flex items-center space-x-2">
                <Avatar sx={{width: 24, height: 24}}>A</Avatar>
                <p>{data?.name}</p>
            </div>
            <p className="text-green-500">{data?.email}</p>
            <p className="text-center">{dayjs(data?.createdAt).format('YYYY/MM/DD HH:MM')}</p>
            <div className='flex justify-center space-x-2'>
                <div className='bg-blue-200 px-2 rounded-large'>{data?.accountType}</div>
                {data?.isActive ? (
                    <div className='bg-green-200 px-2 rounded-large'>Active</div>
                ):(
                    <div className='bg-red-200 px-2 rounded-large'>Inactive</div>
                )
                }
            </div>
            <ActionMethod type={'users'} data={data?._id}/>
        </div>
    );
}
