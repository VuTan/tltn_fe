// components/CustomToast.js
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";

const ToastLogin = ({t}) => (
    <div
        className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
        } flex items-center space-x-2 rounded-lg py-2 px-4 bg-white border drop-shadow-md`}
    >
        <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 size-4" />
        <p className="text-xl">
            Login success
        </p>
    </div>
);

export default ToastLogin;
