import { nanoid, unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { selectExerciseById } from "../../exercises/exerciseSlice";
import { selectWorkoutTypeById } from "../../workoutTypes/workoutTypesSlice";

import { addExercise, exerciseAdded } from "../workoutsSlice";

export const PushExercisePage = ({ match }) => {
  const { exerciseId, workoutId } = match.params;
  const history = useHistory();
  const dispatch = useDispatch();

  const exercise = useSelector((state) =>
    selectExerciseById(state, exerciseId)
  );
  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, exercise.type)
  );

  const payload = {
    exerciseObject: { exercise: exerciseId, id: nanoid(), notes: "incomplete" },
    workout: workoutId,
  };

  const pushExercise = async () => {
    try {
      const resultAction = await dispatch(addExercise(payload));
      unwrapResult(resultAction);
      dispatch(exerciseAdded(payload));
    } catch (err) {
      console.error("Failed to add exercise:", err);
    } finally {
      history.push(`/workouts/${workoutId}`);
    }
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
