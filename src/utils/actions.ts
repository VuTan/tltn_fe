'use server'


import {auth, signIn} from "@/auth";
import {sendRequest} from "@/utils/apis";
import {revalidateTag} from "next/cache";

export async function authenticate(email: string, password: string) {
    try {
        return await signIn("credentials", {
            email: email,
            password: password,
            // callbackUrl: "/",
            redirect: false,
        });
    } catch (error) {
        if ((error as any).name === "InvalidEmailPasswordError") {
            return {
                error: (error as any).type,
                code: 1
            }

        } else if ((error as any).name === "InactiveAccountError") {
            return {
                error: (error as any).type,
                code: 2
            }
        } else {
            return {
                error: "Internal server error",
                code: 0
            }
        }

    }
}

export const handleCreateAction = async (type, data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/users`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: {...data}
    })
    revalidateTag(`list-${type}`)
    return res;
}

export const handleUpdateAction = async (type, data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/users`,
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: {...data}
    })
    revalidateTag(`list-${type}`)
    return res;
}

export const handleDeleteAction = async (type, id: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/${type}/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    })

    revalidateTag(`list-${type}`)
    return res;
}

export const handleUpdateProduct = async (type, data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/${type}`,
        method: "PATCH",
        body: {
            ...data
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    })

    revalidateTag('list-product')
    return res;
}

export const handleUpdateItemOrder = async (data) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/order-item`,
        method: "PATCH",
        body: {
            ...data
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    })

    revalidateTag('list-order')
    return res;
}
