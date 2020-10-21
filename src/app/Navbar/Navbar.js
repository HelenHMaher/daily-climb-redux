import React from "react";
import { Link } from "react-router-dom";
import { StyledNavbar } from "./Navbar.styled";

export const Navbar = () => {
  return (
    <StyledNavbar>
      <section>
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
