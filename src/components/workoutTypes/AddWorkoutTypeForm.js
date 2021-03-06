import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult, nanoid } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { addNewWorkoutType, workoutTypeAdded } from "./workoutTypesSlice";

export const AddWorkoutTypeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave = name && addRequestStatus === "idle";
  const history = useHistory();

  const payload = { name, description, id: nanoid() };

  const onSaveWorkoutTypeClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const resultAction = await dispatch(addNewWorkoutType(payload));
        unwrapResult(resultAction);
        setName("");
        setDescription("");
        dispatch(workoutTypeAdded(payload));
      } catch (err) {
        console.error("Failed to save workout type:", err);
      } finally {
        setAddRequestStatus("idle");
        history.push(`/workoutTypes/${payload.id}`);
      }
    }
  };

  return (
    <section>
      <form>
        <section className="formSection">
          <h3>New Workout Type</h3>
          <div className="formDiv">
            <label htmlFor="workoutTypeName">Name</label>
            <input
              type="text"
              id="workoutTypeName"
              name="workoutTypeName"
              value={name}
              onChange={onNameChanged}
            />
          </div>
          <div className="formDiv">
            <textarea
              id="workoutTypeDescription"
              name="workoutTypeDescription"
              value={description}
              onChange={onDescriptionChanged}
              placeholder="Description..."
            />
          </div>
          <div className="formDiv">
            <button
              type="button"
              onClick={onSaveWorkoutTypeClicked}
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
