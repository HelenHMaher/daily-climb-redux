import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectWorkoutById } from "./workoutsSlice";
import { selectWorkoutTypeById } from "../workoutTypes/workoutTypesSlice";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";
import { workoutAdded, addNewWorkout } from "./workoutsSlice";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

export const SingleWorkoutPage = ({ match }) => {
  const { workoutId } = match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const workout = useSelector((state) => selectWorkoutById(state, workoutId));

  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, workout.type)
  );

  const payload = {
    name: workout.name,
    description: workout.description,
    type: workout.type,
    id: nanoid(),
    date: format(new Date(), "yyyy-MM-dd"),
  };

  const onCopyWorkoutClicked = async () => {
    try {
      const resultAction = await dispatch(addNewWorkout(payload));
      unwrapResult(resultAction);
      dispatch(workoutAdded(payload));
    } catch (err) {
      console.error("Failed to save post:", err);
    } finally {
      history.push(`/workouts/${payload.id}`);
    }
  };

  return (
    <section>
      <h2>Workout Name: {workout.name}</h2>
      <h3>Workout Type: {workoutType.name}</h3>
      <Link to={`/workoutTypes/${workout.type}`} className="button">
        Workout Type Details
      </Link>
      <p className="workoutDate">{workout.date}</p>
      <p className="workoutDescription">
        Workout Description: {workout.description}
      </p>
      <Link to={`/editWorkout/${workoutId}`} className="button">
        Edit Workout
      </Link>
      <button type="button" onClick={onCopyWorkoutClicked}>
        Copy Workout
      </button>
    </section>
  );
};
