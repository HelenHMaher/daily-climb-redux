import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectExerciseByWorkoutType } from "./exerciseSlice";
import PropTypes from "prop-types";

export const ExerciseList = ({ workoutTypeId }) => {
  const exercises = useSelector((state) =>
    selectExerciseByWorkoutType(state, workoutTypeId)
  );

  console.log(exercises);

  const renderedExercises = exercises.map((exercise) => {
    return (
      <li key={exercise.id}>
        <Link to={`exercises/${exercise.id}`}>{exercise.name}</Link>
        <p className="exerciseDescription">
          {exercise.description.substring(0, 100)}
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

ExerciseList.propTypes = {
  workoutTypeId: PropTypes.string.isRequired,
};
