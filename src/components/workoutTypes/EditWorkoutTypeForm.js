import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  editWorkoutType,
  workoutTypeUpdated,
  selectWorkoutTypeById,
  deleteWorkoutType,
  workoutTypeDeleted,
} from "./workoutTypesSlice";

export const EditWorkoutTypeForm = ({ match }) => {
  const { workoutTypeId } = match.params;

  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, workoutTypeId)
  );

  const [name, setName] = useState(workoutType.name);
  const [description, setDescription] = useState(workoutType.description);

  const history = useHistory();
  const dispatch = useDispatch();
  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const onSaveWorkoutTypeClicked = async () => {
    if (name && description) {
      const payload = { id: workoutTypeId, name, description };
      dispatch(editWorkoutType(payload));
      dispatch(workoutTypeUpdated(payload));
      history.push(`/workoutTypes/${workoutTypeId}`);
    }
  };

  const onDeleteWorkoutTypeClicked = async () => {
    dispatch(deleteWorkoutType({ id: workoutTypeId }));
    dispatch(workoutTypeDeleted({ id: workoutTypeId }));
    history.push("/workoutTypes");
  };

  return (
    <section>
      <h2>Edit Workout Type</h2>
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
        <button type="button" onClick={onSaveWorkoutTypeClicked}>
          Save Workout Type
        </button>
        <button type="button" onClick={onDeleteWorkoutTypeClicked}>
          Delete Workout Type
        </button>
      </form>
    </section>
  );
};
