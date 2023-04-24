import React from 'react';
import styles from '../styles/AdminHome.module.css';
import Logo from '../components/Logo';
import { UserAuth } from '../utils/Auth.js';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '../images/settingsIcon.svg';

export default function AdminHome() {
  const { signOut } = UserAuth();
  const navigate = useNavigate();

  const logOut = async (e) => {
    e.preventDefault();
    await signOut();
  };

  const settings = async (e) => {
    e.preventDefault();
    console.log('move to settings page');
    navigate('/adminSettings');
  };

  const add = async (e) => {
    e.preventDefault();
    console.log('move to addartifact page');
    //navigate("/addartifact");
  };

  const update = async (e) => {
    e.preventDefault();
    console.log('move to updateArtifact page');
    //navigate("/updateArtifact");
  };

  const manage = async (e) => {
    e.preventDefault();
    navigate('/mangeAdmins');
  };

  return (
    <>
      <div className={styles['adminHome']}>
        <Logo color="var(--white)" />
        <div className={styles['signout-settings']}>
          <button className="secondary-button" onClick={logOut}>
            Sign Out
          </button>
          <img
            className={styles['settings-button']}
            src={SettingsIcon}
            alt="Settings"
            onClick={settings}
          />
        </div>
        <div className={styles['main-menu-button-group']}>
          <button className={styles['main-menu-button']} onClick={add}>
            Add New Artifact
          </button>
          <button className={styles['main-menu-button']} onClick={update}>
            Edit an Artifact
          </button>
          <button className={styles['main-menu-button']} onClick={manage}>
            Manage Administrators
          </button>
        </div>
      </div>
    </>
  );
}
