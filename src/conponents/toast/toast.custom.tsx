// components/CustomToast.js
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

export const ToastSuccess = ({t, type}) => (
    <div
        className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
        } flex items-center space-x-2 rounded-lg py-2 px-4 bg-white border drop-shadow-md`}
    >
        <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 size-4"/>
        <p className="text-xl">
            {type} success
        </p>
    </div>
);

export const ToastError = ({t, type, error}) => (
    <div
        className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
        } flex items-center space-x-2 rounded-lg py-2 px-4 bg-red-500 drop-shadow-md`}
    >
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-white size-4"/>
        <p className="text-xl text-white">
            {type} Error: {error}
        </p>
    </div>
);

