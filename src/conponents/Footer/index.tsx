'use client';
import React from 'react';
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faInstagram, faLinkedinIn, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";

const Footer = () => {
    return (
        <div className="bottom-0 flex flex-row justify-around bg-black  ">
            <div className="max-w-48">
                <p className="text-xl font-bold my-6 text-white">Exclusive</p>
                <p className="mb-2 text-white">Subscribe</p>
                <p className="mb-2 text-white">Get 10% off your first order</p>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className="block w-full pl-2 py-1 bg-black border rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center ">
                        <FontAwesomeIcon icon={faPaperPlane} rotation="15" className="text-white"/>
                    </div>
                </div>
            </div>
            <div className="max-w-48 ">
                <p className="text-xl font-bold my-6 text-white">Support</p>
                <p className="mb-2 text-white">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                <p className="mb-2 text-white">exclusive@gmail.com</p>
                <p className="mb-2 text-white">+88015-88888-9999</p>
            </div>
            <div className="max-w-48">
                <p className="text-xl font-bold my-6 text-white">Account</p>
                <p className="mb-2 text-white">My Account</p>
                <p className="mb-2 text-white">Login / Register</p>
                <p className="mb-2 text-white">Cart</p>
                <p className="mb-2 text-white">Wishlist</p>
                <p className="mb-2 text-white">Shop</p>
            </div>
            <div className="max-w-48">
                <p className="text-xl font-bold my-6 text-white">Quick Link</p>
                <p className="mb-2 text-white">Privacy Policy</p>
                <p className="mb-2 text-white">Terms Of Use</p>
                <p className="mb-2 text-white">FAQ</p>
                <p className="mb-2 text-white">Contact</p>
            </div>
            <div className="max-w-80">
                <p className="text-xl font-bold my-6 text-white">Download App</p>
                <p className="text-sm text-white">Save $3 with App New User Only</p>
                <div className="grid w-48 h-24 items-center grid-rows-2 grid-cols-[1fr_1.5fr] mt-4 ">
                    <div className="col-start-1 col-end-2 row-start-1 row-end-3">
                        <Image src="/img/qr.png" alt="QR code" width={100} height={100}/>
                    </div>
                    <div className="col-start-2 col-end-3 row-start-1 row-end-2 p-2">
                        <Image src="/img/CHplay.png" alt="QR code" width={300} height={300}/>
                    </div>
                    <div className="col-start-2 col-end-3 row-start-2 row-end-3 p-2">
                        <Image src="/img/AppStore.png" alt="QR code" width={300} height={300}/>
                    </div>
                </div>
                <div className="flex my-4 justify-between">
                    <FontAwesomeIcon icon={faFacebookF} className="text-white size-8"/>
                    <FontAwesomeIcon icon={faTwitter} className="text-white size-8"/>
                    <FontAwesomeIcon icon={faInstagram} className="text-white size-8"/>
                    <FontAwesomeIcon icon={faLinkedinIn} className="text-white size-8"/>
                </div>
            </div>
        </div>
    );
}

export default Footer;