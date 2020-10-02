import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";

import { addNewWorkout, workoutAdded } from "./workoutsSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

export const AddWorkoutForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workoutTypeId, setWorkoutTypeId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onWorkoutTypeChanged = (e) => setWorkoutTypeId(e.target.value);

  const canSave =
    [name, description, workoutTypeId].every(Boolean) &&
    addRequestStatus === "idle";

  const onSaveWorkoutClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const payload = { name, description, id: nanoid() };
        const resultAction = await dispatch(addNewWorkout(payload));
        unwrapResult(resultAction);
        setName("");
        setDescription("");
        setWorkoutTypeId("");
        dispatch(workoutAdded(payload));
      } catch (err) {
        console.error("Failed to save post:", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const workoutTypeOptions = workoutTypes.undefined.map((workoutType) => (
    <option key={workoutType.id} value={workoutType.id}>
      {workoutType.name}
    </option>
  ));

  return (
    <section>
      <h2>Add New Workouts</h2>
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
        <select
          id="workoutType"
          value={workoutTypeId}
          onChange={onWorkoutTypeChanged}
        >
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
        <button type="button" onClick={onSaveWorkoutClicked} disable={!canSave}>
          Save Workout
        </button>
      </form>
    </section>
  );
};
