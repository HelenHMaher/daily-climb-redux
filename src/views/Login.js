import React, { useState } from "react";
import { RegisterForm } from "../components/user/RegisterForm";
import { unwrapResult } from "@reduxjs/toolkit";
import store from "../app/store";
import { useDispatch } from "react-redux";
import { fetchUser } from "../components/user/userSlice";
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const dispatch = useDispatch();

  const clickSubmit = async () => {
    try {
      const response = await axios.post(
        "/api/users/authenticate/",
        `username=${username}&password=${password}`
      );
      console.log(response + ": has been returned");
      store.dispatch(fetchUser(username));
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log("Failed to login user:", err);
    } finally {
      console.log(`${username} attempted to log in`);
    }
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
