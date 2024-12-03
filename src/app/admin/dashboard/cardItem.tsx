import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";

export default function DashboardCardItem() {
    return (
        <div className="p-4 w-full rounded border-[1px] bg-white shadow-xl">
            <FontAwesomeIcon icon={faEye} className="size-12"/>
            <p className="text-black font-bold text-2xl">3.124k</p>
            <div className="flex justify-between">
                <p className="text-black">Total Views</p>
                <p className="text-green-600 text-center">12% ↑</p>
            </div>

        </div>
    );
}
