import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllExercises } from "../../exercises/exerciseSlice";

export const ListExercises = ({ workout }) => {
  console.log(workout);
  const exerciseTypes = useSelector(selectAllExercises);

  const renderedExercises = workout.exercises.map((exercise) => {
    const exerciseType = exerciseTypes.undefined.find(
      (type) => type.id === exercise.exercise
    );

    return (
      <li key={exercise.id}>
        {exerciseType.name}
        <p className="description">
          {exerciseType.description.substring(0, 100)}
        </p>
        <p className="notes">{exercise.notes}</p>
      </li>
    );
  });

  return (
    <section>
      <h2>Exercises</h2>
      <Link to={`/workouts/${workout.id}/exercises`} className="button">
        Add New Exercise
      </Link>
      <ul>{renderedExercises}</ul>
    </section>
  );
};
