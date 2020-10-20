import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectExerciseById } from "../../exercises/exerciseSlice";
import { selectWorkoutById } from "../workoutsSlice";
import { Link, useHistory } from "react-router-dom";
import {
  instanceUpdated,
  editInstance,
  instanceDeleted,
} from "../workoutsSlice";

import { StyledExerciseInstance } from "./ExerciseInstance.styled";
import { unwrapResult } from "@reduxjs/toolkit";

export const ExerciseInstance = ({ match }) => {
  const { workoutId, exerciseId, instanceId } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const exercise = useSelector((state) =>
    selectExerciseById(state, exerciseId)
  );
  const workout = useSelector((state) => selectWorkoutById(state, workoutId));
  const instance = workout.exercises.find(
    (exercise) => exercise.id === instanceId
  );

  const [editNotes, setEditNotes] = useState(false);
  const [notes, setNotes] = useState(instance.notes);

  const onNotesChanged = (e) => setNotes(e.target.value);
  const onEditNotesClicked = () => {
    setEditNotes(!editNotes);
    setNotes(instance.notes);
  };

  const payload = { workoutId, notes, instanceId, deleteExercise: false };

  const onSaveExerciseClicked = async () => {
    try {
      const resultAction = await dispatch(editInstance(payload));
      unwrapResult(resultAction);
      dispatch(instanceUpdated(payload));
    } catch (err) {
      console.error("Failed to update exercise instance:", err);
    } finally {
      setEditNotes(!editNotes);
    }
  };

  const onDeleteExerciseClicked = async () => {
    try {
      payload["deleteExercise"] = true;
      const resultAction = await dispatch(editInstance(payload));
      unwrapResult(resultAction);
      dispatch(instanceDeleted(payload));
    } catch (err) {
      console.log("Failed to delete exercise instance:", err);
    } finally {
      history.push(`/workouts/${workoutId}`);
    }
  };

  const displayNotes = (
    <section className="component">
      <h4>Notes</h4>
      <p className="notes">{instance.notes}</p>
      <button type="button" onClick={onEditNotesClicked}>
        Edit
      </button>
    </section>
  );

  const displayEditNotes = (
    <section className="formSection">
      <form id="specialEntry">
        <div className="formDiv">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={onNotesChanged}
          />
          <button type="button" onClick={onSaveExerciseClicked}>
            Save Changes
          </button>
          <button type="button" onClick={onEditNotesClicked}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );

  const notesDisplay = !editNotes ? displayNotes : displayEditNotes;

  return (
    <StyledExerciseInstance>
      <section className="component">
        <h2>{workout.name}</h2>
      </section>
      <section className="singleComponent">
        <h2>{exercise.name}</h2>
        <p className="exerciseDescription">{exercise.description}</p>
        <button type="button" onClick={onDeleteExerciseClicked}>
          Delete Exercise
        </button>

        {notesDisplay}

        <Link to={`/workouts/${workoutId}`} className="button">
          Back to Workout
        </Link>
      </section>
    </StyledExerciseInstance>
  );
};
