import { lazy } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import Details from "../Pages/Details";
const Home = lazy(() => import("../Pages/Home"))
export const PublicRoutes :RouteObject[] = [
    {
        path:"/",
        element: <Outlet/>,
        children:[
            {index:true, element:<Home/>},
            {path:"user/:id", element:<Details/>},
            {path:"*",element:<Navigate to="/"/>}
        ]
    }
]