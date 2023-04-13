import { createBrowserRouter } from "react-router-dom";

import Login from "../Pages/Login"
import Dashboard from "../Components/Dashboard/Dashboard";
import LayautPublic from "../Layout/LayautPublic";
import NotFound from "../Pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayautPublic />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Login />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ],
    }   
]);