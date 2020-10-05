import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { addNewExercise, exerciseAdded } from "./exerciseSlice";

export const AddExerciseForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave = [name, description].every(Boolean);

  const payload = {
    name,
    description,
  };

  const onSaveExerciseClicked = async () => {
    try {
      const resultAction = await dispatch(addNewExercise(payload));
      unwrapResult(resultAction);
      setName("");
      setDescription("");
      dispatch(exerciseAdded(payload));
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };
  return (
    <section>
      <h2>Add New Exercise</h2>
      <form>
        <label hmtlFor="exerciseName">Exercise Name</label>
        <input
          type="text"
          id="exerciseName"
          name="exerciseName"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="exerciseDescription">Exercise Description</label>
        <textarea
          id="exerciseDescription"
          name="exerciseDescription"
          value={description}
          onChange={onDescriptionChanged}
        />
        <button
          type="button"
          onClick={onSaveExerciseClicked}
          disable={!canSave}
        >
          Save Exercise
        </button>
      </form>
    </section>
  );
};
