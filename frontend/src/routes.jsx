import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/products" replace />,
            },

            {
                index: true,
                element: <DashboardPage />,
            },

            {
                path: "products",
                element: <ProductsPage />,
            },

            {
                path: "dashboard",
                element: <DashboardPage />,
            },

            
        ],
    },
]);
