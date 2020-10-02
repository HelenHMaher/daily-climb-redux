import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectWorkoutById } from "./workoutsSlice";
import { selectWorkoutTypeById } from "../workoutTypes/workoutTypesSlice";

export const SingleWorkoutPage = ({ match }) => {
  const { workoutId } = match.params;
  const workout = useSelector((state) => selectWorkoutById(state, workoutId));

  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, workout.type)
  );

  return (
    <section>
      <h2>{workout.name}</h2>
      <h3>{workoutType.name}</h3>
      <Link to={`/workoutTypes/${workout.type}`} className="button">
        Details
      </Link>
      <p className="workoutDescription">{workout.description}</p>
      <Link to={`/editWorkout/${workoutId}`} className="button">
        Edit Workout
      </Link>
    </section>
  );
};
