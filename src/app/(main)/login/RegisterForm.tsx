"use client";
import { useForm } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [enabled, setEnabled] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 p-2">
            <div>
                <label className="text-black">
                    Name
                    <input
                        className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                        type="text"
                        {...register("Name", { required: "Name is required" })}
                    />
                    {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}
                </label>
            </div>

            <div className="mt-2">
                <label className="text-black">
                    Email
                    <input
                        className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                        type="email"
                        {...register("Email", { required: "Email is required" })}
                    />
                    {errors.Email && <p className="text-red-500 text-sm">{errors.Email.message}</p>}
                </label>
            </div>

            <div className="mt-2">
                <label className="text-black">
                    Phone
                    <input
                        className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                        type="text"
                        {...register("Phone", { required: "Phone number is required" })}
                    />
                    {errors.Phone && <p className="text-red-500 text-sm">{errors.Phone.message}</p>}
                </label>
            </div>

            <div className="mt-2">
                <label className="text-black">
                    Address
                    <input
                        className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                        type="text"
                        {...register("Address", { required: "Address is required" })}
                    />
                    {errors.Address && <p className="text-red-500 text-sm">{errors.Address.message}</p>}
                </label>
            </div>

            <div className="mt-2">
                <label className="text-black">
                    Password
                    <input
                        className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                        type="password"
                        {...register("Password", { required: "Password is required" })}
                    />
                    {errors.Password && <p className="text-red-500 text-sm">{errors.Password.message}</p>}
                </label>
            </div>

            <div className="mt-2">
                <label className="text-black">
                    Confirm Password
                    <input
                        className="w-full rounded-md border-2 py-1 px-3 text-black focus:outline-none focus:ring-2 focus:ring-black/40"
                        type="password"
                        {...register("ConfirmPassword", { required: "Confirmation is required" })}
                    />
                    {errors.ConfirmPassword && <p className="text-red-500 text-sm">{errors.ConfirmPassword.message}</p>}
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
                    Agree to our Terms, Privacy, and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.
                </p>
            </div>

            <button
                type="submit"
                className="rounded bg-black mt-8 py-2 px-4 text-white border-2 hover:bg-white hover:text-black transition"
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
