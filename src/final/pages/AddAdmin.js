import React, {useEffect, useState} from 'react';
import styles from '../styles/AddAdmin.module.css';
import Logo from '../components/Logo';
import {UserAuth} from '../../utils/Auth.js'
import {useNavigate} from "react-router-dom"

export default function AddAdmin() {
    const [email, setEmail]= useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [role, setRole] = useState("");

    const navigate=useNavigate();
    const {signOut,addUser}=UserAuth();

    const logOut = async(e)=>{
        e.preventDefault();
        await signOut();
    }

    const submit = async(e)=>{
        e.preventDefault();
        console.log("submit");
        handleSubmit(e);
    }

    const exit = async(e)=>{
        e.preventDefault();
        navigate("/mangeAdmins");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password1!=password2){
            return;
        }
        await addUser(email,password1,role);
        //add message to say that the user has been creaeted succesfully
        navigate("/adminHome");
    };

    const handleEmailChange = async (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const handlePassword1Change = async (event) => {
        event.preventDefault();
        setPassword1(event.target.value);
    }

    const handlePassword2Change = async (event) => {
        event.preventDefault();
        setPassword2(event.target.value);
    }

    const handleRoleChange = async (event) => {
        event.preventDefault();
        setRole(event.target.value);
    }
    
    return (
        <>
            <div className={styles["manageAdmin"]}>
                <div>
                    <Logo color="var(--white)" />
                    <div className={styles["sign-out"]}>
                        <button className={styles["signoutbutton"]} onClick={logOut}>Sign Out</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h1 className={styles["title"]}>Add Admin</h1>
                        <div className={styles["email"]}>
                            <input type="email-input" className={styles["email-input"]} placeholder='Email' onChange={handleEmailChange}></input>
                        </div>
                        <div className={styles['Password1']}>
                            <input type="password" className={styles["p1-input"]} placeholder='Password' onChange={handlePassword1Change}></input>
                        </div>
                        <div className={styles['Password2']}>
                            <input type="password" className={styles["p2-input"]} placeholder='Re-enter Password' onChange={handlePassword2Change}></input>
                        </div>
                        <div className={styles['role']}>
                            <input type="input" className={styles["role-input"]} placeholder='Role' onChange={handleRoleChange}></input>
                        </div>
                    </form>
                    <div className={styles["addingActions"]}>
                        <div>
                            <button className={styles["submit"]} onClick={submit}>submit</button>
                        </div>
                        <div>
                            <button className={styles["exitAdding"]} onClick={exit}>Exit Without Saving</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}