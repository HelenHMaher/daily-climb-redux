import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllWorkouts } from "./workoutsSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";
import { format, parseISO } from "date-fns";

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
        {" "}
        <span id="workoutDate">
          {format(parseISO(workout.date), "MMM d, yyyy")}
        </span>
        <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
        <p className="description">
          <span id="workoutType">({workoutType.name})</span>{" "}
          {workout.description.substring(0, 100)}
        </p>
      </li>
    );
  });

  return (
    <section className="component">
      <h2>Workout History</h2>
      <ul>{renderedWorkouts}</ul>
    </section>
  );
};
