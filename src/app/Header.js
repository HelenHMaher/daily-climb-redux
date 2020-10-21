import React from "react";
import { StyledHeader } from "./Header.styled";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const history = useHistory();
  const logout = () => {
    console.log("logout");
    history.push("/logout");
  };
  return (
    <StyledHeader>
      <div className="navHeader">
        <h1>My Daily Climb</h1>
        <button className="button" onClick={logout}>
          LogOut
        </button>
      </div>
    </StyledHeader>
  );
};
