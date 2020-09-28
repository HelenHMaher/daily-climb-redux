import React from "react";
import { Link } from "react-router-dom";

//import {selectCurrentUser} from '../featurs/users/usersSlice';

export const Navbar = () => {
  const logout = () => {
    return console.log("logout");
  };

  return (
    <nav>
      <section>
        <h1>My Daily Climb</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home</Link>
            <Link to="/workouts">Workouts</Link>
            <Link to="/workoutTypes">Workout Types</Link>
            <Link to="/profile">Profile</Link>
          </div>
          <button className="button" onClick={logout}>
            LogOut
          </button>
        </div>
      </section>
    </nav>
  );
};
