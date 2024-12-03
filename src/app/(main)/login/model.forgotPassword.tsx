import {Modal, ModalBody, ModalContent} from "@nextui-org/react";
import {sendRequest} from "@/utils/apis";
import toast, {Toaster} from "react-hot-toast";
import {ToastError, ToastSuccess} from "@/conponents/toast/toast.custom";
import React from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";

export default function ModelForgotPassword(props: any) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {isOpen, onOpenChange} = props;
    const router = useRouter();

    const onSubmit = async (values: any) => {
        const res = await sendRequest<IBackendRes<any>>({
            url: `http://localhost:8080/api/auth/forgot-password`,
            method: "POST",
            body: {
                email: values.email
            }
        });

        if (res?.error) {
            toast.custom((t) => <ToastError t={t} type="Send Mail" error={res.message}/>);
        } else {
            toast.custom((t) => <ToastSuccess t={t} type="Send Mail" error={res.message}/>);
            onOpenChange(false);
        }
    };

    return (
        <>
            <Toaster position="bot-center" reverseOrder={true}/>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody className="gap-6 my-4">
                        <h1 className="text-xl font-bold">Forgot your password?</h1>
                        <p className="text-center">
                            To get instructions to reset your password, please enter your email address.
                        </p>
                        <form
                            onSubmit={handleSubmit(onSubmit)} // Sử dụng handleSubmit từ react-hook-form
                            className="flex flex-col items-center space-y-4"
                        >
                            <label className="w-full">
                                Email
                                <input
                                    className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/40"
                                    {...register("email", {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format."
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </label>
                            <button
                                className="rounded bg-white py-2 px-4 text-black border-2 data-[hover]:bg-black data-[active]:bg-black data-[hover]:text-white"
                                type="submit"
                            >
                                Reset Password
                            </button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
