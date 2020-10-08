import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllExercises } from "./exerciseSlice";
import { selectAllWorkoutTypes } from "../workoutTypes/workoutTypesSlice";

import { AddExerciseForm } from "./AddExerciseForm";
import { ExerciseListByWorkoutType } from "./ExerciseListByWorkoutType";

export const ExerciseList = () => {
  const [displayAll, setDisplayAll] = useState(true);
  const [type, setType] = useState("");
  const exercises = useSelector(selectAllExercises);

  const workoutTypes = useSelector(selectAllWorkoutTypes);

  const displayAllExercises = () => setDisplayAll(!displayAll);
  const onTypeChanged = (e) => setType(e.target.value);

  const workoutTypeOptions = workoutTypes.undefined.map((workoutType) => (
    <option key={workoutType.id} value={workoutType.id}>
      {workoutType.name}
    </option>
  ));

  const renderedExercises = exercises.map((exercise) => {
    const workoutType = workoutTypes.undefined.find(
      (type) => type.id === exercise.type
    );
    return (
      <li key={exercise.id}>
        <Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link>
        <p className="exerciseDescription">
          ({workoutType.name}) {exercise.description.substring(0, 100)}
        </p>
      </li>
    );
  });

  if (displayAll === true) {
    return (
      <section>
        <AddExerciseForm />
        <h2>Exercise List: All Exercises</h2>
        <button type="button" onClick={displayAllExercises}>
          Display By Workout Type
        </button>
        <ul>{renderedExercises}</ul>}
      </section>
    );
  } else {
    return (
      <section>
        <AddExerciseForm />
        <h2>Exercise List: </h2>
        <button type="button" onClick={displayAllExercises}>
          Display All Workout Types
        </button>
        <label htmlFor="workoutType">Workout Type</label>
        <select id="workoutType" value={type} onChange={onTypeChanged}>
          <option value=""></option>
          {workoutTypeOptions}
        </select>
        <ExerciseListByWorkoutType workoutTypeId={type} />
      </section>
    );
  }
};
