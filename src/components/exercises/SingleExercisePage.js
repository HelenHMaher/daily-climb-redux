import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectExerciseById } from "./exerciseSlice";
import { selectWorkoutTypeById } from "../workoutTypes/workoutTypesSlice";

export const SingleExercisePage = ({ match }) => {
  const { exerciseId } = match.params;
  const exercise = useSelector((state) =>
    selectExerciseById(state, exerciseId)
  );
  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, exercise.type)
  );

  //add button to add to workout --either to existing workout or create new workout!!

  return (
    <section>
      <h2>Exercise Name: {exercise.name}</h2>
      <p className="exerciseDescription">Description: {exercise.description}</p>
      <section>
        <p className="workoutType">Workout Type</p>
        <Link to={`/workoutTypes/${exercise.type}`}>{workoutType.name}</Link>
      </section>
      <Link to={`/editExercises/${exerciseId}`} className="button">
        Edit Exercise
      </Link>
    </section>
  );
};
