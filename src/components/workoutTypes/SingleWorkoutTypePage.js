import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectWorkoutTypeById } from "./workoutTypesSlice";
import { selectWorkoutsByWorkoutType } from "../workouts/workoutsSlice";

export const SingleWorkoutTypePage = ({ match }) => {
  const { workoutTypeId } = match.params;
  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, workoutTypeId)
  );

  const workoutsForWorkoutType = useSelector((state) =>
    selectWorkoutsByWorkoutType(state, workoutTypeId)
  );

  console.log(workoutsForWorkoutType);

  const workoutTitles = workoutsForWorkoutType.map((workout) => (
    <li key={workout.id}>
      <Link to={`/workouts/${workout.id}`}>{workout.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{workoutType.name}</h2>
      <p className="workoutTypeDescription">{workoutType.description}</p>
      <Link to={`/editWorkoutTypes/${workoutTypeId}`} className="button">
        Edit Workout Type
      </Link>
      <ul>{workoutTitles}</ul>
    </section>
  );
};
