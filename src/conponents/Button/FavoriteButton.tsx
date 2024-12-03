'use client';
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {faHeart as faHeatFill} from "@fortawesome/free-solid-svg-icons/faHeart";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";

interface ChildProp {
    favorite: boolean
}

const FavoriteButton: React.FC<ChildProp> = (props) => {
    const [favorite, setFavorite] = useState(props.favorite);
    const handleFavoriteButton = (e) => {
        e.preventDefault();
        setFavorite(!favorite)
    }

    return (
        <div
            className={`flex items-center justify-center rounded-full bg-white size-8 transition-colors duration-500 
                ${favorite ? 'bg-red-200' : 'bg-white'} cursor-pointer`}
            onClick={handleFavoriteButton}
        >
            {favorite ? (
                <FontAwesomeIcon icon={faHeatFill} className="text-red-500 size-5"/>
            ) : (
                <FontAwesomeIcon icon={faHeart} className="text-black size-5"/>
            )}
        </div>
    );
};

export default FavoriteButton;