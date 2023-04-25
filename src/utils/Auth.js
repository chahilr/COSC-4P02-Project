import React, {useEffect, useState, createContext, useContext} from "react";
import {auth} from "./FirebaseApp.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword, deleteUser} from "firebase/auth";
import {mainAdmin, updateE, updateP, removeU, getUsersPassword, addAdmin} from './firestoreFunctions';

const AuthContext=createContext();

export const AuthenticationContext= ({children}) =>{
    const signIn= async (email,password)=>{
        return await signInWithEmailAndPassword(auth,email,password);
    }

    const [curUser, setCurUser]= useState(null);
    const [signedIn, setSignedIn]= useState(false);
    const [mainAdm, setMainAdm]= useState(false);

    const curUid= async ()=>{
        return curUser.uid;
    }

    const updateUsername=async(newEmail)=>{
        let result=false;
        await updateEmail(auth.currentUser,newEmail).then(()=>{
            updateE(curUser.uid,newEmail);
            result=true;
        }).catch((error)=>{
            console.log(error.message);
            result=false;
        })
        return result;
    }

    const updatePass=async(newPass)=>{
        await updatePassword(auth.currentUser,newPass).catch((error)=>{
            console.log(error.message);
        });
        await updateP(curUser.uid,newPass);
    }

    const removeUser=async()=>{
        await deleteUser(auth.currentUser).catch((error)=>{
            console.log(error.message);
        });
        await removeU(curUser.uid);
    }

    const addUser=async(email,password, role)=>{
        let result=false;
        let temp=curUser.email;
        let p=await getUsersPassword(temp);
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredentail)=>{
                let newUID=userCredentail.user.uid;
                await auth.signOut();
                await signInWithEmailAndPassword(auth,temp,p);
                await addAdmin(newUID, email, password, role);
                result=true;
            }).catch((error)=>{
                console.log(error.message);
                result=false;
            })
        return result
    }

    const removeOtherUser=async(email)=>{
        let temp=curUser.email;
        let p1=await getUsersPassword(email);
        let p2=await getUsersPassword(temp);
        await signInWithEmailAndPassword(auth,email,p1);
        let oldUID= auth.currentUser.uid;
        await deleteUser(auth.currentUser).catch((error)=>{
            console.log(error.message);
        });
        await auth.signOut();
        await signInWithEmailAndPassword(auth,temp,p2);
        await removeU(oldUID);
    }

    const signOut= async ()=>{
        setSignedIn(false);
        setMainAdm(false);
        setCurUser(null);
        await auth.signOut();
        return true;
    }

    const loggedIn= ()=>{
        return signedIn;
    }

    const mainUser= ()=>{
        if(loggedIn() && mainAdm){
            return true;
        }
        return false;
    }

    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
            setCurUser(user);
            if(user!=null){
                setSignedIn(true);
                if(await mainAdmin(user.uid)){
                    setMainAdm(true);
                }else{
                    setMainAdm(false);
                }
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{signIn,loggedIn,signOut,mainUser,curUid,updatePass, updateUsername,removeUser,removeOtherUser, addUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = ()=> {
    return useContext(AuthContext)
}