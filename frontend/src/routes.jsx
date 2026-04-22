import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import POSPage from "./pages/POSPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },

            //===================
            //      index
            //===================
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [

            //===================
            //      index
            //===================
            {
                index: true,
                element: <Navigate to="/products" replace />,
            },


            //===================
            //      Path
            //===================
            {
                path: "products",
                element: <ProductsPage />,
            },

            {
                path: "dashboard",
                element: <DashboardPage />,
            },

            {
                path: "pos",
                element: <POSPage/>,
            },

            
        ],
    },
]);
