import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { addNewWorkoutType } from "./workoutTypesSlice";

export const AddWorkoutTypeForm = () => {
  const [name, setName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const onNameChanged = (e) => setName(e.target.value);

  const canSave = name && addRequestStatus === "idle";

  const onSaveWorkoutTypeClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const resultAction = await dispatch(addNewWorkoutType({ name }));
        unwrapResult(resultAction);
        setName("");
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
        <button
          type="button"
          onClick={onSaveWorkoutTypeClicked}
          disalbe={!canSave}
        >
          Save Workout Type
        </button>
      </form>
    </section>
  );
};
