import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const MainLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    return (
        <div className="app-shell">
            <Sidebar onLogout={handleLogout} />
            <main className="app-shell__content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
