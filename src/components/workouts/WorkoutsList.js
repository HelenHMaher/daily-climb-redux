import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllWorkouts } from "./workoutsSlice";
import { selectWorkoutTypeById } from "../workoutTypes/workoutTypesSlice";

export const WorkoutsList = () => {
  const workouts = useSelector(selectAllWorkouts);
  console.log(workouts);

  const renderedWorkouts = workouts.undefined.map((workout) => {
    const workoutType = useSelector((state) =>
      selectWorkoutTypeById(state, workout.id)
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
      <h2>WorkoutsList</h2>
      <ul>{renderedWorkouts}</ul>
    </section>
  );
};
