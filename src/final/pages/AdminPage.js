
import React, { useState } from 'react';
import '../styles/AdminPage.css';
import Logo from '../components/Logo';

const Login = () => {
  const [username, setUsername] = useState('Username');
  const [password, setPassword] = useState('Password');

  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', { username, password });
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <Logo color="var(--white)" />
          <input id="username" placeholder="Username or Email"></input>
          <span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            ></input>
            <button className="showButton" onClick={handleShowPasswordClick}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </span>

          <button className="submit-button" type="submit-button">
            Login
          </button>
        </form>
      </div>
    </>

  );
};

export default Login;
