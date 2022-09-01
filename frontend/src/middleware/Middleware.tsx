import { Navigate } from "react-router-dom";
import { UseCurrentUser } from "../contexts/userCtx";

export function ProtectedRoute({ children }: any) {
    const { getUser } = UseCurrentUser()
    if (Object.keys(getUser()).length === 0) {
            return <Navigate to="/" />
    }
    return children;
}

export function UnprotectedRoute({ children }: any) {
    const { getUser } = UseCurrentUser()
    if (Object.keys(getUser()).length !== 0) {
            return <Navigate to="/feed" />
    }
    return children;
}