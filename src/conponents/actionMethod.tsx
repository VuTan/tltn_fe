'use client'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {handleDeleteAction, handleUpdateProduct} from "@/utils/actions";
import toast, {Toaster} from "react-hot-toast";
import Modal from "@/conponents/Popup";
import {useState} from "react";

export default function ActionMethod({type, data, children}) {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);

    const handleDelete = async () => {
        const res = await handleDeleteAction(type, data);
        if (res?.data) {
            toast.success('Delete succeeded!');
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <Modal open={isModalOpen} onClose={toggleModal} title={"Product"}>
                {children}
            </Modal>
            <Toaster position={"bottom-center"}/>
            <div className="flex justify-center space-x-4">
                <div onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPenToSquare} className="bg-orange-100 text-orange-400 p-1 rounded-md"/>
                </div>
                <div onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} className="bg-red-100 text-red-400 p-1 rounded-md"/>
                </div>
            </div>
        </>
    );
}

