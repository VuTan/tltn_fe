import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {InactiveAccountError, InvalidEmailPasswordError} from "@/app/utils/errors";
import {sendRequest} from "@/app/utils/apis";

// Đảm bảo rằng "email" là trường đúng, không phải "emil"
export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const res = await sendRequest<IBackendRes<ILogin>>({
                    method: "POST",
                    url: "http://localhost:8080/api/auth/login",
                    body: {
                        ...credentials,
                    },
                });
                console.log("API ",res)
                if (+res.statusCode === 201) {
                    return {
                        _id: res.data?.user?._id,
                        name: res.data?.user?.name,
                        email: res.data?.user?.email,
                        access_token: res.data?.access_token,
                    };
                } else if (+res.statusCode === 401) {
                    throw new InvalidEmailPasswordError();
                } else if (+res.statusCode === 400) {
                    throw new InactiveAccountError();
                } else {
                    throw new Error("Internal server error");
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    access_token: user.access_token,
                };
            }
            return token;
        },
        session({session, token}) {
            session.user = token.user;
            return session;
        },
    },
});
