import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { addNewWorkout } from "./workoutsSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

export const AddWorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [workoutTypeId, setWorkoutTypeId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onWorkoutTypeChanged = (e) => setWorkoutTypeId(e.target.value);

  const canSave =
    [title, content, workoutTypeId].every(Boolean) &&
    addRequestStatus === "idle";

  const onSaveWorkoutClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const resultAction = await dispatch(
          addNewWorkout({ title, content, workoutType: workoutTypeId })
        );
        unwrapResult(resultAction);
        setTitle("");
        setContent("");
        setWorkoutTypeId("");
      } catch (err) {
        console.error("Failed to save post:", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const workoutTypeOptions = workoutTypes.map((workoutType) => (
    <option key={workoutType.id} value={workoutType.id}>
      {workoutType.name}
    </option>
  ));

  return (
    <section>
      <h2>Add New Workouts</h2>
      <form>
        <label htmlFor="workoutTitle">Workout Title</label>
        <input
          type="text"
          id="workoutTitle"
          name="workoutTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="workoutType">Workout Type"</label>
        <select
          id="workoutType"
          value={workoutTypeId}
          onChange={onWorkoutTypeChanged}
        >
          <option value=""></option>
          {workoutTypeOptions}
        </select>
        <label htmlFor="workoutContent">Content:</label>
        <textarea
          id="workoutContent"
          name="workoutContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSaveWorkoutClicked} disable={!canSave}>
          Save Workout
        </button>
      </form>
    </section>
  );
};
