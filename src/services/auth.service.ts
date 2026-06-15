import { api } from "../api/axios";

export class AuthService {

    async login(
        email: string,
        password: string
    ) {

        const response =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

        return response.data;

    }

    async register(
        name: string,
        email: string,
        password: string
    ) {

        const response =
            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

        return response.data;

    }

}

export const authService =
    new AuthService();