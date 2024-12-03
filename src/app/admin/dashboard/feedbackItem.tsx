import {Avatar} from "@mui/material";

export default function FeedbackItem() {
    return (
        <div className="flex space-x-2 mt-2 items-center">
            <Avatar>A</Avatar>
            <div className="w-full">
                <p className="font-bold text-xl">Adam</p>
                <p>Add more sale product...</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                    <span className="text-sm font-medium text-white">2</span>
                </div>
                <span className="text-xs font-extralight">5:23PM</span>
            </div>

        </div>
    );
}
