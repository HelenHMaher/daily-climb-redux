import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { exerciseAdded, addExercise } from "../workoutsSlice";

import { StyledAddExerciseEntry } from "./AddExerciseEntry.styled";

export const AddExerciseEntry = ({ workout }) => {
  const dispatch = useDispatch();
  const [setArray, setSetArray] = useState([]);
  const [currentSetReps, setCurrentSetReps] = useState("");
  const [currentSetWeight, setCurrentSetWeight] = useState("");
  const [notes, setNotes] = useState("");

  const onCurrentSetRepsChanged = (e) => setCurrentSetReps(e.target.value);
  const onCurrentSetWeightChanged = (e) => setCurrentSetWeight(e.target.value);
  const onNotesChanged = (e) => setNotes(e.target.value);

  const onSaveSetClicked = () => {
    const newSet = { reps: currentSetReps, weight: currentSetWeight };
    setSetArray(setArray.push(newSet));
    setCurrentSetReps("");
    setCurrentSetWeight("");
  };

  const exerciseObject = {
    sets: setArray,
    notes,
    date: new Date().toISOString(),
    id: nanoid(),
  };

  const onSaveExerciseClicked = () => {
    dispatch(exerciseAdded({ exerciseObject, workout }));
    dispatch(addExercise({ exerciseObject, workout }));
  };

  return (
    <StyledAddExerciseEntry>
      <form>
        <section className="formSection">
          <h3>Add New Exercise</h3>
          <div className="formDiv">
            <label htmlFor="reps">Reps</label>
            <input
              type="text"
              id="reps"
              name="reps"
              value={currentSetReps}
              onChange={onCurrentSetRepsChanged}
            />
          </div>
          <div className="formDiv">
            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={currentSetWeight}
              onChange={onCurrentSetWeightChanged}
            />
          </div>
          <div className="formDiv">
            <button type="button" onClick={onSaveSetClicked}>
              Save Set
            </button>
          </div>
          <div className="formDiv">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={onNotesChanged}
            />
            <button type="button" onClick={onSaveExerciseClicked}>
              Save Exercises
            </button>
          </div>
        </section>
      </form>
    </StyledAddExerciseEntry>
  );
};
