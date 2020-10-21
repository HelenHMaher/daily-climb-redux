import React, { useState } from "react";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmChanged = (e) => setConfirm(e.target.value);

  const canSubmit = confirm === password;

  const clickSubmit = () => {
    console.log(`${username} attempted to register`);
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
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              value={confirm}
              onChange={onConfirmChanged}
            />
          </div>
          <div className="formDiv">
            <button type="button" onClick={clickSubmit} disable={!canSubmit}>
              Submit
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};
