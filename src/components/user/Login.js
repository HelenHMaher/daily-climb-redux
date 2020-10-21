import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const clickSubmit = () => {
    console.log(`${username} attempted to log in`);
  };

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
            <Link to={`/register`} className="button">
              Register
            </Link>
          </div>
        </section>
      </form>
    </section>
  );
};
