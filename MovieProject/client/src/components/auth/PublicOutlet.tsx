import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../../services/auth";

interface PublicOutletProps {
    user: User | null;
}

export function PublicOutlet({ user }: PublicOutletProps) {
    return !user ? <Outlet /> : <Navigate to="/" />;
}
