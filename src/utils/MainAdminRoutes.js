import { Outlet} from "react-router-dom";

import {Navigate} from "react-router"
import {UserAuth} from './Auth.js'

export const MainAdminRoutes= () =>{

    const {mainUser}=UserAuth();

    return(
        mainUser()? <Outlet/>: <Navigate to="/adminHome"/>
    )
}