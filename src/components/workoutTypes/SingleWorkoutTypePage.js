import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectWorkoutTypeById } from "./workoutTypesSlice";
import { selectWorkoutsByWorkoutType } from "../workouts/workoutsSlice";
import { ExerciseListByWorkoutType } from "../exercises/ExerciseListByWorkoutType";

export const SingleWorkoutTypePage = ({ match }) => {
  const [showExercises, setShowExercises] = useState(true);
  const [showWorkouts, setShowWorkouts] = useState(true);

  const clickShowExercises = () => setShowExercises(!showExercises);
  const clickShowWorkouts = () => setShowWorkouts(!showWorkouts);

  const { workoutTypeId } = match.params;
  const workoutType = useSelector((state) =>
    selectWorkoutTypeById(state, workoutTypeId)
  );

  const workoutsForWorkoutType = useSelector((state) =>
    selectWorkoutsByWorkoutType(state, workoutTypeId)
  );

  const workoutTitles = workoutsForWorkoutType.map((workout) => (
    <li key={workout.id}>
      <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
      <p className="workoutDescription">
        {workout.description.substring(0, 100)}
      </p>
    </li>
  ));

  return (
    <section>
      <h2>Workout Type Name: {workoutType.name}</h2>
      <p className="workoutTypeDescription">
        Description: {workoutType.description}
      </p>
      <Link to={`/editWorkoutTypes/${workoutTypeId}`} className="button">
        Edit Workout Type
      </Link>
      <button type="button" onClick={clickShowExercises}>
        {showExercises ? "Hide" : "Show"} Exercises
      </button>
      <button type="button" onClick={clickShowWorkouts}>
        {showWorkouts ? "Hide" : "Show"} Workouts
      </button>
      <h3>Exercises</h3>
      <ExerciseListByWorkoutType workoutTypeId={workoutTypeId} />
      <h3>Workouts</h3>
      <ul>{workoutTitles}</ul>
    </section>
  );
};
