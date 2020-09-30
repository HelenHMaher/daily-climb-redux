import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";
import { editWorkout, selectWorkoutById } from "./workoutsSlice";

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
      dispatch(editWorkout({ id: workoutId, name, description, type }));
      history.push(`/workout/${workoutId}`);
    }
  };

  const workoutTypeOptions = workoutTypes.undefined.map((workoutType) => (
    <options key={workoutType.id} value={workoutType.id}>
      {workoutType.name}
    </options>
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
      </form>
    </section>
  );
};
