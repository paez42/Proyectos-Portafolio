import { createBrowserRouter } from "react-router-dom";

import Login from "../Pages/Login";

import LayoutPrivate from "../Layout/LayoutPrivate";
import LayautPublic from "../Layout/LayoutPublic";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Components/Dashboard/Dashboard";

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
                element: <LayoutPrivate />,
                children: [
                    {
                        path:"/dashboard",
                        element: <Dashboard />
                    }
                ]
            }
        ],
    }   
]);