import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function DashboardCardItem(props: any) {
    const {title, value, icon, stoke} = props
    return (
        <div className="p-4 w-full rounded border-[1px] bg-white shadow-xl">
            <FontAwesomeIcon icon={icon} className="size-12"/>
            <p className="text-black font-bold text-2xl">{value ? value : "0"}</p>
            <div className="flex justify-between">
                <p className="text-black">{title ? title : "Total Views"}</p>
                {!stoke ? (<p></p>) : (
                    <p className="text-green-600 text-center">12% ↑</p>
                )}
            </div>

        </div>
    );
}
