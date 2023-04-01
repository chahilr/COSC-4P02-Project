import React, {useEffect, useState} from 'react';
import styles from'../styles/ManageAdmins.module.css';
import Logo from '../components/Logo';
import {UserAuth} from '../../utils/Auth.js'
import {useNavigate} from "react-router-dom"
import {getUserEmails} from '../../utils/firestoreFunctions.js';

export default function ManageAdmins() {
    const [waiting, setState]= useState(true);
    const [emails, setEmails]= useState([]);

    const navigate=useNavigate();
    const {signOut, removeOtherUser}=UserAuth();

    const logOut = async(e)=>{
        e.preventDefault();
        await signOut();
    }

    const settings = async(e)=>{
        e.preventDefault();
        navigate("/adminSettings");
    }

    const home = async(e)=>{
        e.preventDefault();
        navigate("/adminHome");
    }

    const add = async(e)=>{
        e.preventDefault();
        navigate("/addAdmin");
    }

    const handleDelete=async(e,email)=>{
        e.preventDefault();
        removeOtherUser(email);
        navigate("/adminHome");
    }

    useEffect(async ()=>{
        getUserEmails()
            .then((data) => {
                let temp=[];
                let i=0;
                data.forEach(email => {
                    temp.push([i,email]);
                    i++;
                });
                setEmails(temp);
                setState(false);
        });
    }, []);

    return (
        <>
            <div className={styles["manageAdmin"]}>
                {waiting ? (
                    <>loding...</>
                ):(
                    <div>
                        <Logo color="var(--white)" />
                        <div className={styles["signout-settings"]}>
                            <div className={styles["sign-out"]}>
                                <button className={styles["sign-out-button"]} onClick={logOut}>Sign Out</button>
                            </div>
                            <div className={styles["settings"]}>
                                <button className={styles["settings-button"]} onClick={settings}></button>
                            </div>
                        </div>
                        <h1 className={styles["title"]}>Manage Admins</h1>
                        <div className={styles["admins-container"]}>
                            {emails.map((email) => {
                                return(
                                    <div key={"container"+email[0]}>
                                        <input type="email" key={"label"+email[0]} className={styles["emails"]} value={email[1]} readOnly></input>
                                        <button key={"button"+email[0]} className={styles["deltes"]} onClick={(e)=>handleDelete(e,email[1])}>Delete</button>
                                    </div>
                                )})
                            }
                        </div>
                        <div className={styles["actions"]}>
                            <button className={styles["return"]} onClick={home}>Return to Main Menu</button>
                            <button className={styles["add"]} onClick={add}>Add Admin</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}