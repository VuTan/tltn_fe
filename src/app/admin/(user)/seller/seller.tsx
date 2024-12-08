import Image from "next/image";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapLocationDot} from "@fortawesome/free-solid-svg-icons/faMapLocationDot";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {Progress} from "@nextui-org/progress";
import {faArrowTrendUp} from "@fortawesome/free-solid-svg-icons/faArrowTrendUp";
import Link from "next/link";

export default function Seller() {
    const value = 7800;
    return (
        <div className="bg-white mt-8">
            <div className=" p-8">
                <div className="bg-gray-200 justify-items-center">
                    <Image src="/img/samsung.png" width={200} height={200}></Image>
                </div>
                <h3 className="py-2 text-xl text-left font-bold">Samsung</h3>
                <div className="flex items-center space-x-1">
                    <div className="flex px-2 py-1  rounded-lg bg-gray-100">
                        <FontAwesomeIcon icon={faStar} fill className="text-yellow-300 size-4"/>
                        <p className="text-sm">4.5</p>
                    </div>
                    <p className="font-extralight text-sm">8k</p>
                </div>
                <div className="mt-3">
                    <div className="flex space-x-2">
                        <FontAwesomeIcon icon={faMapLocationDot}/>
                        <p>100, Seul, Korea</p>
                    </div>
                    <div className="flex space-x-2">
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <p>samsung@gmail.com</p>
                    </div>
                    <div className="flex space-x-2">
                        <FontAwesomeIcon icon={faPhone}/>
                        <p>+243 812-801-9335</p>
                    </div>
                </div>

                <div className="mt-4">
                    <Progress
                        label={" "}
                        value={value}
                        maxValue={10000}
                        color="warning"
                        formatOptions={{style: "currency", currency: "ARS"}}
                        showValueLabel={true}
                        classNames={{
                            base: "max-w-md",
                            track: "drop-shadow-md border border-default",
                            indicator: "bg-stripe-gradient",
                            label: "tracking-wider font-medium text-default-600",
                            value: "text-foreground/60",
                        }}
                        valueLabel={
                            <span className="flex items-center justify-end  ">
                                ${value / 1000}k
                                <FontAwesomeIcon icon={faArrowTrendUp} className="ml-1 text-green-500"/>
                            </span>
                        }
                    />
                </      div>

                <div className="flex mt-6 justify-between">
                    <div className="justify-items-center">
                        <p>865</p>
                        <p className="font-light">Item Stock</p>
                    </div>
                    <div className="justify-items-center">
                        <p>865</p>
                        <p className="font-light">Sells</p>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="p-4">
                <div className="flex p-2 rounded-lg text-lg text-white font-semibold bg-orange-600 justify-center">
                    <Link href={'/admin/seller/detail'}>View Profile</Link>
                </div>
            </div>
        </div>
    );
}
