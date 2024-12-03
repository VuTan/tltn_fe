import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
    type: string;

    constructor(message?: any) {
        super();
        this.type = message;
    }
}

export class InvalidEmailPasswordError extends AuthError {
    type = "Email/Password is Invalid"
}

export class InactiveAccountError extends AuthError {
    type = "Account is not activated"
}