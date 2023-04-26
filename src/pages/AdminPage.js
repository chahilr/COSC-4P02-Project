import React, { useState, useEffect } from 'react';
import styles from '../styles/AdminPage.module.css';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../utils/Auth.js';

const Login = () => {
  const [username, setUsername] = useState('Username');
  const [password, setPassword] = useState('Password');

  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const navigate = useNavigate();
  const { signIn, loggedIn } = UserAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (loggedIn()) {
      navigate('/adminHome');
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted:', { username, password });

    try {
      await signIn(username, password);
    } catch (e) {
      //how to know if login was succesful or not
      console.log(e.code);
      console.log(e.message);
    }
  };

  return (
    <>
      <div className={styles['login-container']}>
        <form onSubmit={handleSubmit}>
          <Logo color="var(--white)" background="var(--translucent-grey)" />
          <input
            id={styles['username']}
            className={styles['login-field']}
            placeholder="Username or Email"
            onChange={handleUsernameChange}
          ></input>
          <span className={styles['password-container']}>
            <input
              id="password"
              className={styles['login-field']}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={handlePasswordChange}
            ></input>
            <button
              className={styles['showButton']}
              onClick={handleShowPasswordClick}
              type="button"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </span>

          <button className="secondary-button" type="submit-button">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
