import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllWorkouts } from "./workoutsSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

export const WorkoutsList = () => {
  const workouts = useSelector(selectAllWorkouts);
  console.log(workouts);

  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const renderedWorkouts = workouts.undefined.map((workout) => {
    const workoutType = workoutTypes.undefined.find(
      (type) => type.id === workout.type
    );

    return (
      <li key={workout.id}>
        <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
        <p className="workoutDescription">
          ({workoutType.name}) {workout.description.substring(0, 100)}
        </p>
      </li>
    );
  });

  return (
    <section>
      <h2>Workouts List</h2>
      <ul>{renderedWorkouts}</ul>
    </section>
  );
};
