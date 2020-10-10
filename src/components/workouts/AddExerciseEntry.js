//takes an exerscise object

//option to create new exercise -- uses AddExercise component but uses the workoutId to autofill the add to workout option

//option to select form existing

//if select from existing then option to choose a Workout Type

//when you click a workout it pulls up the Single Exercise with add to workout option auto-filled

//when you have chosen or created a workout and clicked "add to workout" you are taken to a more detailed entry form to add more info
//--maybe this page includes a counter for manually counting out sets?

//there is a page for editing the details of existing exercise entries (you can edit all feilds and it won't effect the default)

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { exerciseAdded } from "./workoutsSlice";

export const AddExerciseEntry = ({ workout, exercise }) => {
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
  };

  const onSaveExerciseClicked = () => {
    dispatch(exerciseAdded({ sets: setArray, notes }));
  };

  return (
    <section>
      <h2>Add New Exercise</h2>
    </section>
  );
};
