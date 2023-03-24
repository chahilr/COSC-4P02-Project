import { Outlet} from "react-router-dom";

import {Navigate} from "react-router"
import {UserAuth} from './Auth.js'

export const AdminRoutes= () =>{

    const {loggedIn}=UserAuth();

    return(
        loggedIn()? <Outlet/>: <Navigate to="/admin"/>
    )
}