import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

import { addNewWorkout, workoutAdded } from "./workoutsSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

export const AddWorkoutForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workoutTypeId, setWorkoutTypeId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const history = useHistory();
  const dispatch = useDispatch();
  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onWorkoutTypeChanged = (e) => setWorkoutTypeId(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);

  const canSave =
    [name, description, workoutTypeId].every(Boolean) &&
    addRequestStatus === "idle";

  const payload = {
    name,
    description,
    date,
    type: workoutTypeId,
    id: nanoid(),
    exercises: [],
  };

  const onSaveWorkoutClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        const resultAction = await dispatch(addNewWorkout(payload));
        unwrapResult(resultAction);
        setName("");
        setDescription("");
        setWorkoutTypeId("");
        setDate(format(new Date(), "yyyy-MM-dd"));
        dispatch(workoutAdded(payload));
      } catch (err) {
        console.error("Failed to save post:", err);
      } finally {
        setAddRequestStatus("idle");
        history.push(`/workouts/${payload.id}`);
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
      <form>
        <section className="formSection">
          <h3>Add New Workout</h3>
          <div className="formDiv">
            <label htmlFor="workoutName">Name</label>
            <input
              type="text"
              id="workoutName"
              name="workoutName"
              value={name}
              onChange={onNameChanged}
            />
          </div>
          <div className="formDiv">
            <label htmlFor="workoutDate">Date</label>
            <input
              type="date"
              id="workoutDate"
              name="workoutDate"
              value={date}
              onChange={onDateChanged}
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
              id="workoutDescription"
              name="workoutDescription"
              value={description}
              onChange={onDescriptionChanged}
              placeholder="Description..."
            />
          </div>
          <div className="formDiv">
            <button
              type="button"
              onClick={onSaveWorkoutClicked}
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
