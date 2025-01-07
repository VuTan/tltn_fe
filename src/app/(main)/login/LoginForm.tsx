'use client'
import {useForm} from "react-hook-form";
import {Button, Checkbox} from "@headlessui/react";
import {useState} from "react";
import {CheckIcon} from "@heroicons/react/24/solid";
import {authenticate} from "@/utils/actions";
import {useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import {ToastSuccess} from "@/conponents/toast/toast.custom";
import ModelReactive from "@/app/(main)/login/model.reactive";
import {useDisclosure} from "@nextui-org/react";
import ModelForgotPassword from "@/app/(main)/login/model.forgotPassword";

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState();
    const router = useRouter();
    const {isOpen: isOpenReactive, onOpenChange: onOpenChangeReactive} = useDisclosure();
    const {isOpen: isOpenForgot, onOpenChange: onOpenChangeForgot} = useDisclosure();
    const [userEmail, setUserEmail] = useState("");

    const handleForgotPassword = () => {
        onOpenChangeForgot(true);
    }

    const onSubmit = async (data) => {
        try {
            const res = await authenticate(data.email, data.password);
            if (res?.error) {
                if (res.code === 2) {
                    setUserEmail(data.email)
                    onOpenChangeReactive(true);
                }
                setError(res.error)
            } else {
                toast.custom((t) => <ToastSuccess t={t} type={"Login"}/>);
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };


    const [enabled, setEnabled] = useState(false)
    return (
        <>
            <Toaster
                position="bot-center"
                reverseOrder={true}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 p-2">
                <div>
                    <label className="text-black"> Email
                        <input className="w-full rounded-md border-2 py-1 px-3 text-black
                        focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/40"
                               type="text"  {...register("email", {
                            required: "Email is required.",
                            pattern: /^\S+@\S+$/i
                        })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </label>
                </div>
                <div className="mt-4">
                    <label className="text-black"> Password
                        <input className="w-full rounded-md border-2 py-1 px-3 text-black
                        focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/40"
                               type="password"
                               {...register("password", {
                                   required: "Password is required.",
                               })}/>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </label>
                </div>
                <div className="flex mt-4 justify-between">
                    <div className="flex">
                        <Checkbox
                            checked={enabled}
                            onChange={setEnabled}
                            className="group size-5 rounded-md p-1 border-2 ring-1 ring-white/15 ring-inset data-[checked]:bg-gray-200"
                        >
                            <CheckIcon className="hidden fill-black group-data-[checked]:block"/>
                        </Checkbox>
                        <p className="text-black ml-2 text-sm font-extralight">Remember me</p>
                    </div>
                    <a className="text-black ml-2 text-sm font-extralight hover:text-blue-700" href="#" onClick={handleForgotPassword}>Forget Password
                        ?</a>
                </div>
                {error &&
                    <div className="rounded bg-red-500 w-full py-1 px-3 mt-2 text-center text-white">{error}</div>}
                <Button
                    className="rounded bg-white mt-8 mx-24 py-2 px-4 text-black border-2 data-[hover]:bg-black data-[active]:bg-black data-[hover]:text-white "
                    type="submit">
                    Login
                </Button>
            </form>
            <ModelReactive isOpen={isOpenReactive} onOpenChange={onOpenChangeReactive}
                           userEmail={userEmail}></ModelReactive>
            <ModelForgotPassword isOpen={isOpenForgot} onOpenChange={onOpenChangeForgot}></ModelForgotPassword>
        </>
    )
        ;
}
export default LoginForm;
