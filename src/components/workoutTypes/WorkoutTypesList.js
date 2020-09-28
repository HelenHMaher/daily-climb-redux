import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllWorkoutTypes } from "./workoutTypesSlice";

export const WorkoutTypesList = () => {
  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const renderedWorkoutTypes = workoutTypes.map((workoutTypes) => (
    <li key={workoutTypes.id}>
      <Link to={`/workoutTypes/${workoutTypes.id}`}>
        {workoutTypes.workoutType.name}
      </Link>
    </li>
  ));

  return (
    <section>
      <h2>Workout Types</h2>
      <ul>{renderedWorkoutTypes}</ul>
    </section>
  );
};
