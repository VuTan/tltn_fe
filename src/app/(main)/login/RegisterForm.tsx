"use client";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {sendRequest} from "@/utils/apis";
import {useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import {ToastError} from "@/conponents/toast/toast.custom";

const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [enabled, setEnabled] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: any) => {
        const {email, password, name, address, phone, repassword} = data;

        const res = await sendRequest<IBackendRes<any>>({
            url: `http://localhost:8080/api/auth/register`,
            method: "POST",
            body: {
                email, password, name, address, phone, repassword
            }
        })
        if (res?.data) {
            router.push(`/verify/${res?.data?._id}`);
        } else {
            console.log("run")
            toast.custom((t) => <ToastError t={t} type="Register" error={res.message}/>);
        }
    };


    return (<><Toaster
            position="bot-center"
            reverseOrder={true}
        />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 p-2">
                <div>
                    <label className="text-black">
                        Name
                        <input
                            className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                            type="text"
                            {...register("name", {required: "Name is required"})}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </label>
                </div>

                <div className="mt-2">
                    <label className="text-black">
                        Email
                        <input
                            className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                            type="email"
                            {...register("email", {required: "Email is required"})}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </label>
                </div>

                <div className="mt-2">
                    <label className="text-black">
                        Phone
                        <input
                            className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                            type="text"
                            {...register("phone", {required: "Phone number is required"})}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </label>
                </div>

                <div className="mt-2">
                    <label className="text-black">
                        Address
                        <input
                            className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                            type="text"
                            {...register("address", {required: "Address is required"})}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </label>
                </div>

                <div className="mt-2">
                    <label className="text-black">
                        Password
                        <input
                            className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                            type="password"
                            {...register("password", {required: "Password is required"})}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </label>
                </div>

                <div className="mt-2">
                    <label className="text-black">
                        Confirm Password
                        <input
                            className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                            type="password"
                            {...register("repassword", {required: "Confirmation is required"})}
                        />
                        {errors.repassword && <p className="text-red-500 text-sm">{errors.repassword.message}</p>}
                    </label>
                </div>

                <div className="flex mt-4">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => setEnabled(!enabled)}
                        className="h-5 w-5 border-2 rounded-md"
                    />
                    <p className="text-black ml-2 text-sm font-extralight">
                        Agree to our Terms, Privacy, and Cookies Policy. You may receive SMS notifications from us and
                        can
                        opt out at any time.
                    </p>
                </div>

                <button
                    type="submit"
                    className="rounded bg-black mt-8 py-2 px-4 text-white border-2 hover:bg-white hover:text-black transition"
                >
                    Register
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
