import { createBrowserRouter } from "react-router-dom";

import Login from "../Pages/Login"
import Dashboard from "../Components/Dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
]);