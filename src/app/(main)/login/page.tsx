'use client'
import {Button} from "@headlessui/react";
import LoginForm from "@/app/(main)/login/LoginForm";
import {useState} from "react";
import RegisterForm from "@/app/(main)/login/RegisterForm";

const LoginPage = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className="flex justify-center content-center my-24">
            <div className="min-w-64 p-4 border-2 rounded-sm">
                <h1 className="font-extrabold text-3xl">Exclusive</h1>
                <div className="flex mt-4 justify-center space-x-4">
                    {login ?
                        <Button className="text-white bg-black w-full py-2 rounded-md">
                            Login
                        </Button> :
                        <Button className="bg-white border-2 text-black w-full py-2 rounded-md hover:bg-gray-300"
                                onClick={() => {
                                    setLogin(true)
                                }}>
                            Login
                        </Button>
                    }
                    {!login ?
                        <Button className="bg-black text-white w-full py-2 rounded-md border-2">
                            Signup
                        </Button>
                        :
                        <Button className="bg-white text-black w-full py-2 rounded-md border-2 hover:bg-gray-300"
                                onClick={() => {
                                    setLogin(false)
                                }}>Signup</Button>}
                </div>
                <div className="w-[22rem]">
                    {login &&
                        <LoginForm></LoginForm>}
                    {!login && <RegisterForm></RegisterForm>}
                </div>
            </div>

        </div>
    );
}
export default LoginPage;
