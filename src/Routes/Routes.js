import { createBrowserRouter } from "react-router-dom";
import BillingsData from "../components/Billings/BillingsData";
import Login from "../components/Login";
import Register from "../components/Register";
import Main from "../Layout/Main";
import Table from "../Layout/Table";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    },
    {
        path: '/billings-data',
        element: <Table></Table>,
        children: [
            {
                path: '/billings-data',
                element: <PrivateRoute><BillingsData></BillingsData></PrivateRoute>
            }
        ]
    }
])

export default router;