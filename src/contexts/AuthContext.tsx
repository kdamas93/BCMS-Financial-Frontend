import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    function login(token: string) {

        localStorage.setItem("token", token);

        setToken(token);
    }

    function logout() {

        localStorage.removeItem("token");

        setToken(null);
    }

    return (

        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}