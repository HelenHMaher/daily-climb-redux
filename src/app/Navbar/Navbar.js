import React from "react";
import { Link } from "react-router-dom";
import { StyledNavbar } from "./Navbar.styled";

//import {selectCurrentUser} from '../featurs/users/usersSlice';

export const Navbar = () => {
  const logout = () => {
    return console.log("logout");
  };

  return (
    <StyledNavbar>
      <section>
        <div className="navHeader">
          <h1>My Daily Climb</h1>
          <button className="button" onClick={logout}>
            LogOut
          </button>
        </div>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home</Link>
            <span>|</span>
            <Link to="/workouts">Workouts</Link>
            <span>|</span>
            <Link to="/workoutTypes">Workout Types</Link>
            <span>|</span>
            <Link to="/exercises">Exercises</Link>
            <span>|</span>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </section>
    </StyledNavbar>
  );
};
