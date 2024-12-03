'use client'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import Popup from "@/conponents/Popup";
import {useState} from "react";
import Image from 'next/image'

const EyeButton = ({src}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleEyeButton = (e) => {
        e.preventDefault();
        setIsPopupOpen(!isPopupOpen)
    }
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    return (
        <div className="flex items-center justify-center rounded-full bg-white size-8"
             onClick={handleEyeButton}>
            <FontAwesomeIcon icon={faEye} className="text-black size-5 "/>
            <Popup
                isOpen={isPopupOpen}
                closeModal={closePopup}
                title="Zoom Image"
                onCancel={closePopup}
            >
                {/* Nội dung tùy chỉnh trong Popup */}
                <div className='flex justify-center p-2 w-[50vw] h-[50vh] p-2 border-1'>
                    <Image src={src} width='500' height='500' alt='' quality={100}></Image>
                </div>
            </Popup>
        </div>
    );
};

export default EyeButton;