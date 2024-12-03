import {Avatar} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

export default function ActionMethod() {
    return (
            <div className="flex justify-center space-x-4">
                <FontAwesomeIcon icon={faEye} className="bg-gray-100 p-1 rounded-md" />
                <FontAwesomeIcon icon={faPenToSquare} className="bg-orange-100 text-orange-400 p-1 rounded-md"/>
                <FontAwesomeIcon icon={faTrash} className="bg-red-100 text-red-400 p-1 rounded-md"/>
            </div>
    );
}
