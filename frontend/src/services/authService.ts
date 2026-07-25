import api from "./api";

import type { AuthResponse, User } from "../types/auth";

export async function registerUser(

    email: string,

    password: string,

    fullName: string,

): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(

        "/auth/register",

        {

            email,

            password,

            full_name: fullName || null,

        },

    );

    return response.data;

}

export async function loginUser(

    email: string,

    password: string,

): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(

        "/auth/login",

        {

            email,

            password,

        },

    );

    return response.data;

}

export async function fetchCurrentUser(): Promise<User> {

    const response = await api.get<User>("/auth/me");

    return response.data;

}
