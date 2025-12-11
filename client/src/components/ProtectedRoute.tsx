import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const ProtectedRoute = () => {
    const { user, loading } = useUser();

    if (loading) return <p>Cargando…</p>;
    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />;
};