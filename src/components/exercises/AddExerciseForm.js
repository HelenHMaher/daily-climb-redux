import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { addNewExercise, exerciseAdded } from "./exerciseSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

//add props so can specify workouttype from redirect from Single Workout Type Page

export const AddExerciseForm = ({ match }) => {
  const workoutId = match.params.workoutId ? match.params.workoutId : "";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workoutTypeId, setWorkoutTypeId] = useState("");

  const history = useHistory();
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

  const link = workoutId
    ? `/workouts/${workoutId}/exercises/${payload.id}`
    : `/exercises/${payload.id}`;

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
    } finally {
      history.push(link);
    }
  };

  const workoutTypeOptions = workoutTypes.undefined.map((workoutType) => (
    <option key={workoutType.id} value={workoutType.id}>
      {workoutType.name}
    </option>
  ));

  return (
    <section>
      <form>
        <section className="formSection">
          <h3>Add New Exercise</h3>
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
