import React, { useEffect, useState } from 'react';
import styles from '../styles/AdminSettings.module.css';
import Logo from '../components/Logo';
import { UserAuth } from '../utils/Auth.js';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../utils/firestoreFunctions.js';

export default function AdminSettings() {
  const [waiting, setState] = useState(true);
  const [email, setEmail] = useState('');
  const [emailChanged, setChanged] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const navigate = useNavigate();
  const { signOut, curUid, updatePass, updateUsername, removeUser } =
    UserAuth();

  const logOut = async (e) => {
    e.preventDefault();
    await signOut();
  };

  const save = async (e) => {
    e.preventDefault();
    console.log('save and exit');
    handleSubmit(e);
  };

  const exit = async (e) => {
    e.preventDefault();
    navigate('/adminHome');
  };

  const remove = async (e) => {
    e.preventDefault();
    console.log('deleting account');
    removeUser();
    navigate('/admin');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password1 != password2) {
      alert('Passwords must be the same');
      return;
    }
    if ((password1.length < 6) & (password1 != '')) {
      alert(
        'Password must be at least 6 characters long or blank to not update'
      );
      return;
    }
    if (emailChanged) {
      let test = await updateUsername(email);
      if (!test) {
        alert('Eamil must be valid');
        return;
      }
      console.log('email updated');
    }
    if (password1 != '') {
      await updatePass(password1);
      console.log('pass updated');
    }
    navigate('/adminHome');
  };

  const handleEmailChange = async (event) => {
    event.preventDefault();
    if (event.target.value != email) {
      setEmail(event.target.value);
      setChanged(true);
    }
  };

  const handlePassword1Change = async (event) => {
    event.preventDefault();
    setPassword1(event.target.value);
  };

  const handlePassword2Change = async (event) => {
    event.preventDefault();
    setPassword2(event.target.value);
  };

  useEffect(async () => {
    curUid().then((uid) => {
      getUserData(uid).then((data) => {
        setEmail(data.Email);
        setState(false);
      });
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
            <div className={styles['sign-out']}>
              <button className={styles['signoutbutton']} onClick={logOut}>
                Sign Out
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <h1 className={styles['title']}>Profile Settings</h1>
              <div className={styles['email']}>
                <label className={styles['email-label']}>Email</label>
                <input
                  type="email-input"
                  className={styles['email-input']}
                  value={email}
                  onChange={handleEmailChange}
                ></input>
              </div>
              <div className={styles['Password1']}>
                <label className={styles['p1']}>Password</label>
                <input
                  type="password"
                  className={styles['p1-input']}
                  onChange={handlePassword1Change}
                ></input>
              </div>
              <div className={styles['Password2']}>
                <label className={styles['p2']}>Re-enter Password</label>
                <input
                  type="password"
                  className={styles['p2-input']}
                  onChange={handlePassword2Change}
                ></input>
              </div>
            </form>
            <div className={styles['settingActions']}>
              <div>
                <button className={styles['save']} onClick={save}>
                  Save & Exit
                </button>
              </div>
              <div>
                <button className={styles['exit']} onClick={exit}>
                  Exit Without Saving
                </button>
              </div>
              <div>
                <button className={styles['delete']} onClick={remove}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
