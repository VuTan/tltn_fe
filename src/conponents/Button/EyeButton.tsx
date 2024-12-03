import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";

const EyeButton = () => {
    return (
        <div className="flex items-center justify-center rounded-full bg-white size-8">
            <FontAwesomeIcon icon={faEye} className="text-black size-5 "/>
        </div>
    );
};

export default EyeButton;