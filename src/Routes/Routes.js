import { createBrowserRouter } from "react-router-dom";
import BillingsData from "../components/Billings/BillingsData";
import Home from "../components/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Main from "../Layout/Main";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/billings-data',
                element: <PrivateRoute><BillingsData></BillingsData></PrivateRoute>
            }
        ]
    }
])

export default router;