import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { selectExerciseById } from "../../exercises/exerciseSlice";
import { selectWorkoutTypeById } from "../../workoutTypes/workoutTypesSlice";

export const PushExercisePage = ({ match }) => {
  const { exerciseId, workoutId } = match.params;
  const history = useHistory();

  const exercise = useSelector((state) =>
    selectExerciseById(state, exerciseId)
  );
  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, exercise.type)
  );

  const pushExercise = () => {
    history.pushState(`/workouts/${workoutId}`);
  };

  return (
    <section className="singleComponent">
      <div className="singleHeader">
        <h2>{exercise.name}</h2>
        <p className="exerciseType">({workoutType.name})</p>
      </div>
      <div className="singleBody">
        <p className="exerciseDescription">{exercise.description}</p>
      </div>
      <Link to={`/workouts/${workoutId}/exercises`} className="button">
        Back
      </Link>
      <button type="button" onClick={pushExercise}>
        Add to Workout
      </button>
    </section>
  );
};
