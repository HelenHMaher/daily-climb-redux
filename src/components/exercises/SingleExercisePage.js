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
    <section className="singleComponent">
      <div className="singleHeader">
        <h2>{exercise.name}</h2>
        {"("}
        <Link to={`/workoutTypes/${exercise.type}`}>{workoutType.name}</Link>
        {")"}
      </div>
      <div className="singleBody">
        <p className="exerciseDescription">{exercise.description}</p>
      </div>
      <Link to={`/editExercises/${exerciseId}`} className="button">
        Edit
      </Link>
    </section>
  );
};
