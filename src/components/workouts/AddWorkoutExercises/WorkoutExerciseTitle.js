import React from "react";
import { Link } from "react-router-dom";
import { StyledWorkoutExerciseTitle } from "./WorkoutExerciseTitle.styled";

export const WorkoutExerciseTitle = ({ match }) => {
  const { workoutId } = match.params;
  return (
    <StyledWorkoutExerciseTitle>
      <section className="selectExTitle">
        <h1 className="pageTitle">Select Exercise</h1>
        <Link to={`/workouts/${workoutId}`} className="button">
          Back to Workout
        </Link>
      </section>
    </StyledWorkoutExerciseTitle>
  );
};
