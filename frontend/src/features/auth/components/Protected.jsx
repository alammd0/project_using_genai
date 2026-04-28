import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

export default function Protected({ children }) {

    const { loading, user } = useAuth();

    if (loading) {
        return <main>
            <div>Loading...</div>
        </main>;
    }

    if (!user) {
        <Navigate to="/login" />;
    }

    return children;
}