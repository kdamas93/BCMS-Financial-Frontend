import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
    children: ReactNode;
}

function ProtectedRoute({ children }: Props) {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {

        return <Navigate to="/" />;

    }

    return children;

}

export default ProtectedRoute;