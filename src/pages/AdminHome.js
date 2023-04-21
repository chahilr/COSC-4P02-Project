import React from 'react';
import styles from '../styles/AdminHome.module.css';
import Logo from '../components/Logo';
import { UserAuth } from '../utils/Auth.js';
import { useNavigate } from 'react-router-dom';

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
          <div className={styles['sign-out']}>
            <button className={styles['sign-out-button']} onClick={logOut}>
              Sign Out
            </button>
          </div>
          <div className={styles['settings']}>
            <button
              className={styles['settings-button']}
              onClick={settings}
            ></button>
          </div>
        </div>
        <button className={styles['add-artifact']} onClick={add}>
          Add New Artifact
        </button>
        <button className={styles['edit-artifact']} onClick={update}>
          Edit an Artifact
        </button>
        <button className={styles['manage-admins']} onClick={manage}>
          Manage Administrators
        </button>
      </div>
    </>
  );
}
