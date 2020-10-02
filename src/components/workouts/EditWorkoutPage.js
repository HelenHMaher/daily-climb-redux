import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";
import {
  editWorkout,
  workoutUpdated,
  deleteWorkout,
  workoutDeleted,
  selectWorkoutById,
} from "./workoutsSlice";

export const EditWorkoutPage = ({ match }) => {
  const { workoutId } = match.params;

  const workout = useSelector((state) => selectWorkoutById(state, workoutId));

  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);
  const [type, setType] = useState(workout.type);

  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const history = useHistory();
  const dispatch = useDispatch();
  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onTypeChanged = (e) => setType(e.target.value);

  const onSaveWorkoutClicked = async () => {
    if (name && type && description) {
      const payload = { id: workoutId, name, description, type };
      dispatch(editWorkout(payload));
      dispatch(workoutUpdated(payload));
      history.push(`/workouts/${workoutId}`);
    }
  };

  const onDeleteWorkoutClicked = async () => {
    dispatch(deleteWorkout({ id: workoutId }));
    dispatch(workoutDeleted({ id: workoutId }));
    history.push("/workouts");
  };

  const workoutTypeOptions = workoutTypes.undefined.map((workoutType) => (
    <option key={workoutType.id} value={workoutType.id}>
      {workoutType.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Workout</h2>
      <form>
        <label htmlFor="workoutName">Workout Name</label>
        <input
          type="text"
          id="workoutName"
          name="workoutName"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="workoutType">Workout Type</label>
        <select id="workoutType" value={type} onChange={onTypeChanged}>
          <option value=""></option>
          {workoutTypeOptions}
        </select>
        <label htmlFor="workoutDescription">Description</label>
        <textarea
          id="workoutDescription"
          name="workoutDescription"
          value={description}
          onChange={onDescriptionChanged}
        />
        <button type="button" onClick={onSaveWorkoutClicked}>
          Save Workout
        </button>
        <button type="button" onClick={onDeleteWorkoutClicked}>
          Delete Workout
        </button>
      </form>
    </section>
  );
};
