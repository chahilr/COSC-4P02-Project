import React, {useEffect, useState, createContext, useContext} from "react";
import {auth} from "./FirebaseApp.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthContext=createContext();

export const AuthenticationContext= ({children}) =>{
    //add functions to sign in and login
    const signIn= async (email,password)=>{
        return await signInWithEmailAndPassword(auth,email,password);
    }

    const [curUser, setCurUser]= useState(null);

    const signOut= async ()=>{
        await auth.signOut();
        setCurUser(null);
        return true
    }

    const loggedIn= ()=>{
        if (curUser!=null) {
           return true;
        }
        return false;
    }

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setCurUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{signIn,loggedIn,signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = ()=> {
    return useContext(AuthContext)
}