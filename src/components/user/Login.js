import React, { useState } from "react";
import RegisterForm from "./RegisterFrom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const clickSubmit = () => {
    console.log(`${username} attempted to log in`);
  };

  const toggleRegister = () => {
    setRegister(!register);
  };

  if (register) return <RegisterForm />;
  else {
    return (
      <section>
        <form>
          <section className="formSection">
            <h2>Login</h2>
            <div className="formDiv">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={onUsernameChanged}
              />
            </div>
            <div className="formDiv">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={onPasswordChanged}
              />
            </div>
            <div className="formDiv">
              <button type="button" onClick={clickSubmit}>
                Submit
              </button>
              <button type="button" onClick={toggleRegister}>
                Register
              </button>
            </div>
          </section>
        </form>
      </section>
    );
  }
};
