import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { selectWorkoutTypeById } from "../../workoutTypes/workoutTypesSlice";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";
import {
  workoutAdded,
  addNewWorkout,
  selectWorkoutById,
} from "../workoutsSlice";
import { format } from "date-fns";

import { ListExercises } from "./ListExercises";
import { StyledSingleWorkoutPage } from "./SingleWorkoutPage.styled";

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
    exercises: workout.exercises,
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
    <StyledSingleWorkoutPage>
      <section className="singleComponent">
        <div id="special">
          <div className="singleHeader">
            <h2>{workout.name}</h2>
            <p className="workoutDate">{workout.date}</p>
            {"("}
            <Link to={`/workoutTypes/${workout.type}`}>{workoutType.name}</Link>
            {")"}
          </div>
          <div className="singleBody">
            <p className="workoutDescription">{workout.description}</p>
          </div>
          <Link to={`/editWorkout/${workoutId}`} className="button">
            Edit
          </Link>
          <button type="button" onClick={onCopyWorkoutClicked}>
            Create Copy
          </button>
        </div>
        <ListExercises workout={workout} />
      </section>
    </StyledSingleWorkoutPage>
  );
};
