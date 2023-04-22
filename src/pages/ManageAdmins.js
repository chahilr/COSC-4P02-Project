import React, { useEffect, useState } from 'react';
import styles from '../styles/ManageAdmins.module.css';
import Logo from '../components/Logo';
import { UserAuth } from '../utils/Auth.js';
import { useNavigate } from 'react-router-dom';
import { getUserEmails } from '../utils/firestoreFunctions.js';
import SettingsIcon from '../images/settingsIcon.svg';

export default function ManageAdmins() {
  const [waiting, setState] = useState(true);
  const [emails, setEmails] = useState([]);

  const navigate = useNavigate();
  const { signOut, removeOtherUser } = UserAuth();

  const logOut = async (e) => {
    e.preventDefault();
    await signOut();
  };

  const settings = async (e) => {
    e.preventDefault();
    navigate('/adminSettings');
  };

  const home = async (e) => {
    e.preventDefault();
    navigate('/adminHome');
  };

  const add = async (e) => {
    e.preventDefault();
    navigate('/addAdmin');
  };

  const handleDelete = (e, email) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this admin?')) {
      removeOtherUser(email);
      navigate('/adminHome');
    }
  };

  useEffect(async () => {
    getUserEmails().then((data) => {
      let temp = [];
      let i = 0;
      data.forEach((email) => {
        temp.push([i, email]);
        i++;
      });
      setEmails(temp);
      setState(false);
    });
  }, []);

  return (
    <>
      <div className={styles['manageAdmin']}>
        {waiting ? (
          <>loding...</>
        ) : (
          <div>
            <Logo color="var(--white)" />
            <div className={styles['signout-settings']}>
              <button className={styles['sign-out-button']} onClick={logOut}>
                Sign Out
              </button>
              <img
                className={styles['settings-button']}
                src={SettingsIcon}
                alt="Settings"
                onClick={settings}
              />
            </div>
            <h1 className={styles['title']}>Manage Admins</h1>
            <div className={styles['admins']}>
              <div className={styles['admins-container']}>
                {emails.map((email) => {
                  return (
                    <div key={'container' + email[0]}>
                      <input
                        type="email"
                        key={'label' + email[0]}
                        className={styles['emails']}
                        value={email[1]}
                        readOnly
                      ></input>
                      <button
                        key={'button' + email[0]}
                        className={styles['deltes']}
                        onClick={(e) => handleDelete(e, email[1])}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles['actions']}>
              <button className={styles['return']} onClick={home}>
                Return to Main Menu
              </button>
              <button className={styles['add']} onClick={add}>
                Add Admin
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
