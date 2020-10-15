import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";

import { addNewExercise, exerciseAdded } from "./exerciseSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

//add props so can specify workouttype from redirect from Single Workout Type Page

export const AddExerciseForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workoutTypeId, setWorkoutTypeId] = useState("");

  const dispatch = useDispatch();
  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onWorkoutTypeChanged = (e) => setWorkoutTypeId(e.target.value);

  const canSave = [name, workoutTypeId, description].every(Boolean);

  const payload = {
    name,
    description,
    type: workoutTypeId,
    id: nanoid(),
  };

  const onSaveExerciseClicked = async () => {
    try {
      const resultAction = await dispatch(addNewExercise(payload));
      unwrapResult(resultAction);
      setName("");
      setDescription("");
      setWorkoutTypeId("");
      dispatch(exerciseAdded(payload));
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };

  const workoutTypeOptions = workoutTypes.undefined.map((workoutType) => (
    <option key={workoutType.id} value={workoutType.id}>
      {workoutType.name}
    </option>
  ));

  return (
    <section>
      <h2 className="formTitle">New Exercise</h2>
      <form>
        <section className="formSection">
          <div className="formDiv">
            <label hmtlFor="exerciseName">Name</label>
            <input
              type="text"
              id="exerciseName"
              name="exerciseName"
              value={name}
              onChange={onNameChanged}
            />
          </div>
          <div className="formDiv">
            <label htmlFor="workoutType">Type</label>
            <select
              id="workoutType"
              value={workoutTypeId}
              onChange={onWorkoutTypeChanged}
            >
              <option value=""></option>
              {workoutTypeOptions}
            </select>
          </div>
          <div className="formDiv">
            <textarea
              id="exerciseDescription"
              name="exerciseDescription"
              value={description}
              onChange={onDescriptionChanged}
              placeholder="Description..."
            />
          </div>
          <div className="formDiv">
            <button
              type="button"
              onClick={onSaveExerciseClicked}
              disable={!canSave}
            >
              Save
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};
