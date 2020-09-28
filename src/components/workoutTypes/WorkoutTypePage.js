import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectWorkoutTypeById } from "./workoutTypesSlice";
import { selectWorkoutsByWorkoutType } from "../workouts/workoutsSlice";

export const WorkoutTypePage = ({ match }) => {
  const { workoutTypeId } = match.params;
  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, workoutTypeId)
  );

  const workoutsForWorkoutType = useSelector((state) =>
    selectWorkoutsByWorkoutType(state, workoutTypeId)
  );

  const workoutTitles = workoutsForWorkoutType.map((workout) => (
    <li key={workout.id}>
      <Link to={`/workouts/${workout.id}`}>{workout.title}</Link>
    </li>
  ));

  console.log(workoutType);

  return (
    <section>
      <h2>{workoutType.name}</h2>
      <ul>{workoutTitles}</ul>
    </section>
  );
};
