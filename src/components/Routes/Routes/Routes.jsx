import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import ErrorPage from "../../ErrorPage/ErrorPage";
import Home from "../../Pages/HomePage/Home";
import Refund from "../../Pages/RefundPage/Refund";
import Resend from "../../Pages/ResendPage/Resend";
import Supply from "../../Pages/SupplyPage/Supply";
import Repair from "../../Pages/RepairPage/Repair";
import About from "../../Pages/AboutPage/About";
import Login from "../../Pages/LogInPage/LogIn";
import FullLogInPage from "../../Pages/LogInPage/FullLogInPage";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import Admin from "../../Pages/AdminPage/Admin";
import DetailsLayout from "../../Pages/RefundPage/DetailsLayout";
import FunctionalMain from "../../Layout/FuntionalMain";



export const routes = createBrowserRouter([

    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "/about",
                element: <About></About>
            },
        ]

    },
    {
        path: "/",
        element: <FunctionalMain></FunctionalMain>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [

            {
                path: "/refund",
                element: <PrivateRoute><Refund></Refund></PrivateRoute>
            },
            {
                path: "refund/details/:orderNumber",
                element: <PrivateRoute><DetailsLayout></DetailsLayout></PrivateRoute>,
            },
            {
                path: "/resend",
                element: <PrivateRoute><Resend></Resend></PrivateRoute>
            },
            {
                path: "/supply",
                element: <PrivateRoute><Supply></Supply></PrivateRoute>
            },
            {
                path: "/repair",
                element: <PrivateRoute><Repair></Repair></PrivateRoute>
            },
            {
                path: "/admin",
                element: <PrivateRoute><Admin></Admin></PrivateRoute>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/login",
                element: <FullLogInPage></FullLogInPage>
            }
        ]

    }

])