import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllWorkoutTypes } from "./workoutTypesSlice";

export const WorkoutTypesList = () => {
  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const renderedWorkoutTypes = workoutTypes.undefined.map((workoutType) => (
    <li key={workoutType.id}>
      <Link to={`/workoutTypes/${workoutType.id}`}>{workoutType.name}</Link>
      <p className="description">{workoutType.description.substring(0, 100)}</p>
    </li>
  ));

  return (
    <section className="component">
      <h2>Workout Types</h2>
      <ul>{renderedWorkoutTypes}</ul>
    </section>
  );
};
