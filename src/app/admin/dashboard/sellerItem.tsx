import {Avatar} from "@mui/material";

export default function SellerItem() {
    return (
        <div className="grid grid-cols-4 mt-2 p-4 border-b border-gray-300 last:border-b-0">
            <div className="flex items-center space-x-2">
                <Avatar sx={{ width: 24, height: 24 }}>A</Avatar>
                <p>Adam</p>
            </div>
            <p className="text-green-500 text-center">$5,768</p>
            <p className="text-center">125</p>
            <p className="text-blue-400 text-center">4.5%</p>
        </div>
    );
}
