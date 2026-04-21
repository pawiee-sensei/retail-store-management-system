import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAuthenticated = Boolean(localStorage.getItem("user"));

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
