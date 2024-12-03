import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarFill} from "@fortawesome/free-solid-svg-icons/faStar";
import {faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons/faStar";


function ImgItem(props: any) {
    const {rate} = props;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rate)) {
            stars.push(<FontAwesomeIcon key={i} icon={faStarFill} className="text-yellow-500 size-4 mr-2"/>);
        } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
            stars.push(<FontAwesomeIcon key={i} icon={faStarHalfStroke} className="text-yellow-500 size-4 mr-2"/>);
        } else {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-gray-300 size-4 mr-2"/>);
        }
    }

    return (
        <div className="">
            {stars}
        </div>
    );
}

export default ImgItem;