import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";


const TrashButton = () => {
    return (
        <FontAwesomeIcon icon={faTrash} className="size-5 text-red-500"/>
    );
};

export default TrashButton;