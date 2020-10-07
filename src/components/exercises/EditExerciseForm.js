import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

import {
  editExercise,
  exerciseUpdated,
  selectExerciseById,
  deleteExercise,
  exerciseDeleted,
} from "./exerciseSlice";

export const EditExerciseForm = ({ match }) => {
  const { exerciseId } = match.params;

  const exercise = useSelector((state) =>
    selectExerciseById(state, exerciseId)
  );

  const [name, setName] = useState(exercise.name);
  const [description, setDescription] = useState(exercise.description);
  const [type, setType] = useState(exercise.type);

  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const history = useHistory();
  const dispatch = useDispatch();
  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onTypeChanged = (e) => setType(e.target.value);

  const onSaveExerciseClicked = async () => {
    if (name && description && type) {
      const payload = { id: exerciseId, name, description, type };
      dispatch(editExercise(payload));
      dispatch(exerciseUpdated(payload));
      history.push(`/exercises/${exerciseId}`);
    }
  };

  const onDeleteExerciseClicked = async () => {
    dispatch(deleteExercise({ id: exerciseId }));
    dispatch(exerciseDeleted({ id: exerciseId }));
    history.push(`/workoutTypes/${type}`);
  };

  const workoutTypeOptions = workoutTypes.undefined.map((workoutType) => (
    <option key={workoutType.id} value={workoutType.id}>
      {workoutType.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Exercise</h2>
      <form>
        <label htmlFor="exerciseName">Exercise Name</label>
        <input
          type="text"
          id="exerciseName"
          name="exerciseName"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="workoutType">Workout Type</label>
        <select id="workoutType" value={type} onChange={onTypeChanged}>
          <option value=""></option>
          {workoutTypeOptions}
        </select>
        <label htmlFor="exerciseDescription">Exercise Description</label>
        <textarea
          id="exerciseDescription"
          name="exerciseDescription"
          value={description}
          onChange={onDescriptionChanged}
        />
        <button type="button" onClick={onSaveExerciseClicked}>
          Save Exercise
        </button>
        <button type="button" onClick={onDeleteExerciseClicked}>
          Delete Exercise
        </button>
      </form>
    </section>
  );
};
