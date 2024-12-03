'use client'
import React from 'react';
import toast, {Toaster} from "react-hot-toast";
import {Button} from "@headlessui/react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {ToastError, ToastSuccess} from "@/conponents/toast/toast.custom";
import {sendRequest} from "@/utils/apis";


function ResetPassword(props: any) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {id} = props;
    const router = useRouter();

    const onSubmit = async (data: any) => {
        const {code} = data;
        console.log(data)
        const res = await sendRequest<IBackendRes<any>>({
            url: `http://localhost:8080/api/auth/check-code`,
            method: "POST",
            body: {
                _id: id,
                newPassword: data.newPass,
                confirmPassword: data.confirmPass,
            }
        })
        if (res?.data) {
            toast.custom((t) => <ToastSuccess t={t} type={"Active"}/>);
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
            toast.custom((t) => <ToastError t={t} type="Active" error={res.message}/>);
        }
    };
    return (
        <>
            <Toaster
                position="bot-center"
                reverseOrder={true}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 p-2">
                <p className="text-lg font-light">The code has been sent to your registered email, please check your
                    email.</p>
                <div className="mt-6">
                    <label className="text-black" aria-required={true}>
                        New Password
                        <input
                            className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                            type="text"
                            {...register("newPass", {required: "New Password is required"})}
                        />
                        {errors.newPass && <p className="text-red-500 text-sm">{errors.newPass.message}</p>}
                    </label>
                </div>
                <div className="mt-6">
                    <label className="text-black" aria-required={true}>
                        Confirm Password
                        <input
                            className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                            type="text"
                            {...register("confirmPass", {required: "Confirm Password is required"})}
                        />
                        {errors.confirmPass && <p className="text-red-500 text-sm">{errors.confirmPass.message}</p>}
                    </label>
                </div>
                <Button
                    className="rounded bg-white mt-8 mx-24 py-2 px-4 text-black border-2 data-[hover]:bg-black data-[active]:bg-black data-[hover]:text-white "
                    type="submit">
                    Active
                </Button>
            </form>
        </>
    )
        ;
}

export default ResetPassword;