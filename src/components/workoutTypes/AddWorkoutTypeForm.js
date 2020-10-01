import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult, nanoid } from "@reduxjs/toolkit";

import { addNewWorkoutType, workoutTypeAdded } from "./workoutTypesSlice";

export const AddWorkoutTypeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave = name && addRequestStatus === "idle";

  const onSaveWorkoutTypeClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const payload = { name, description, id: nanoid() };
        const resultAction = await dispatch(addNewWorkoutType(payload));
        unwrapResult(resultAction);
        setName("");
        setDescription("");
        dispatch(workoutTypeAdded(payload));
      } catch (err) {
        console.error("Failed to save workout type:", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Add New Workout Type</h2>
      <form>
        <label htmlFor="workoutTypeName">Workout Type Name</label>
        <input
          type="text"
          id="workoutTypeName"
          name="workoutTypeName"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="workoutTypeDescription">Description</label>
        <textarea
          id="workoutTypeDescription"
          name="workoutTypeDescription"
          value={description}
          onChange={onDescriptionChanged}
        />
        <button
          type="button"
          onClick={onSaveWorkoutTypeClicked}
          disable={!canSave}
        >
          Save Workout Type
        </button>
      </form>
    </section>
  );
};
