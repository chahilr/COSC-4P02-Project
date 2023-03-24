import React, { useState } from "react";
import "../styles/AdminPage.css";

const Login = () => {
  const [username, setUsername] = useState("Username");
  const [password, setPassword] = useState("Password");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setCapsLockOn(event.getModifierState("CapsLock"));
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", { username, password });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className={capsLockOn ? "caps-on" : ""}
            />
          </label>
          <label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={capsLockOn ? "caps-on" : ""}
              />
              <span
                onClick={handleShowPasswordClick}
                className="show-password-button"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </label>
          <button type="submit" style={{marginTop: "20px", fontSize: "0.8em"}}>Login</button>
        </form>
      </div>
    </div>
    
  );
};

export default Login;
