import React, { useState } from 'react';
import styles from '../styles/AdminMain.module.css';
import Logo from '../components/Logo';
import {UserAuth} from '../../utils/Auth.js'
import {useNavigate} from "react-router-dom"


function AdminMain() {
  const {signOut}=UserAuth();
  const navigate=useNavigate();

  const logOut = async(e)=>{
      e.preventDefault();
      await signOut();
  }

  const settings = async(e)=>{
      e.preventDefault();
      console.log("move to settings page");
      navigate("/adminSettings");
  }

  const add = async(e)=>{
      e.preventDefault();
      console.log("move to addartifact page");
      //navigate("/addartifact");
  }

  const update = async(e)=>{
      e.preventDefault();
      console.log("move to updateArtifact page");
      //navigate("/updateArtifact");
  }

  const manage = async(e)=>{
      e.preventDefault();
      navigate("/mangeAdmins");
  }

    return (
      
      <div className={styles["container"]}>
        <button className={styles["sign-out-button"]} onClick={logOut}>Sign out</button>
        <button className={styles["left-button"]} onClick={add}>Add new artifact</button>
        <button className={styles["middle-button"]} onClick={update}>Edit an artifact</button>
        <button className={styles["right-button"]} onClick={manage}>Manage administrators</button>
        <Logo color="var(--white)" />
      </div>
    );

    
}

export default AdminMain;
