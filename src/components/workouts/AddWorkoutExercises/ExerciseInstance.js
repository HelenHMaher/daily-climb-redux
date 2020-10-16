import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectExerciseById } from "../../exercises/exerciseSlice";
import { selectWorkoutById } from "../workoutsSlice";
import { Link, useHistory } from "react-router-dom";

import { StyledExerciseInstance } from "./ExerciseInstance.styled";

export const ExerciseInstance = ({ match }) => {
  const { workoutId, exerciseId, instanceId } = match.params;
  const dispatch = useDispatch();
  const exercise = useSelector((state) =>
    selectExerciseById(state, exerciseId)
  );
  const workout = useSelector((state) => selectWorkoutById(state, workoutId));
  const instance = workout.exercises.find(
    (exercise) => exercise.id === instanceId
  );

  const [editNotes, setEditNotes] = useState(false);
  const [notes, setNotes] = useState(instance.notes);

  const onNotesChanged = (e) => setNotes(e.target.value);
  const onEditNotesClicked = setEditNotes(!editNotes);

  const onSaveExerciseClicked = async () => {
    console.log("clicked");
    setEditNotes(!editNotes);
  };

  if (!editNotes) {
    return (
      <section className="singleComponent">
        <h2>{exercise.name}</h2>
        <p className="exerciseDescription">{exercise.description}</p>
        <h4>Notes</h4>
        <p className="notes">{instance.notes}</p>
        <button type="button" onClick={onEditNotesClicked}>
          Edit
        </button>
        <Link to={`/workouts/${workoutId}`} className="button">
          Back
        </Link>
      </section>
    );
  } else {
    return (
      <StyledExerciseInstance>
        <form id="specialEntry">
          <section className="formSection">
            <div className="formDiv">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={notes}
                onChange={onNotesChanged}
              />
              <button type="button" onClick={onSaveExerciseClicked}>
                Save Changes
              </button>
            </div>
          </section>
        </form>
      </StyledExerciseInstance>
    );
  }
};
