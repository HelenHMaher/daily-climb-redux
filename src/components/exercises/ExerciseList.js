import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllExercises } from "./exerciseSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

export const ExerciseList = () => {
  const exercises = useSelector(selectAllExercises);

  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const renderedExercises = exercises.undefined.map((exercise) => {
    const workoutType = workoutTypes.undefined.find(
      (type) => type.id === exercise.type
    );

    return (
      <li key={exercise.id}>
        <Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link>
        <p className="exerciseDescription">
          ({workoutType.name}) {exercise.description.substring(0, 100)}
        </p>
      </li>
    );
  });

  return (
    <section>
      <h2>Exercise List</h2>
      <ul>{renderedExercises}</ul>
    </section>
  );
};
