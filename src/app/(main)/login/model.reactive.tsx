import {Button, Modal, ModalBody, ModalContent} from "@nextui-org/react";
import {sendRequest} from "@/utils/apis";
import toast, {Toaster} from "react-hot-toast";
import {ToastError} from "@/conponents/toast/toast.custom";
import React from "react";
import {useRouter} from "next/navigation";

export default function ModelReactive(props: any) {
    const {isOpen, onOpenChange, userEmail} = props;
    const router = useRouter();

    const onFinish = async (values: any) => {
        const res = await sendRequest<IBackendRes<any>>({
            url: `http://localhost:8080/api/auth/retry-active`,
            method: "POST",
            body: {
                email: userEmail
            }
        })
        if (res?.error) {
            toast.custom((t) => <ToastError t={t} type="Send Mail " error={res.message}/>);
        } else {
            router.push(`/verify/${res?.data?._id}`);
        }

    }

    return (
        <>
            <Toaster
                position="bot-center"
                reverseOrder={true}
            />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="gap-6 my-4">
                                <h1>Your account has not been activated</h1>

                                <input className="w-full rounded-md border-2 py-1 px-3 text-black
                                               focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/40"
                                       value={userEmail}
                                       disabled={true}>

                                </input>
                                <Button
                                    className="rounded bg-white mx-24 py-2 px-4 text-black border-2 data-[hover]:bg-black data-[active]:bg-black data-[hover]:text-white "
                                    onClick={onFinish}>
                                    Resend code
                                </Button>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}