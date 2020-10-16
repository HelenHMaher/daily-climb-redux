import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectExerciseByWorkoutType } from "./exerciseSlice";
import PropTypes from "prop-types";

export const ExerciseListByWorkoutType = (props) => {
  const { workoutTypeId, workoutId } = props;
  const exercises = useSelector((state) =>
    selectExerciseByWorkoutType(state, workoutTypeId)
  );

  const renderedExercises = exercises.map((exercise) => {
    const link = workoutId
      ? `/workouts/${workoutId}/exercises/${exercise.id}`
      : `/exercises/${exercise.id}`;

    return (
      <li key={exercise.id}>
        <Link to={link}>{exercise.name}</Link>
        <p className="exerciseDescription">
          {exercise.description.substring(0, 100)}
        </p>
      </li>
    );
  });

  return (
    <section>
      <ul>{renderedExercises}</ul>
    </section>
  );
};

ExerciseListByWorkoutType.propTypes = {
  workoutTypeId: PropTypes.string.isRequired,
  workoutId: PropTypes.string,
};
