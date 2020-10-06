import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectWorkoutTypeById } from "./workoutTypesSlice";
import { selectWorkoutsByWorkoutType } from "../workouts/workoutsSlice";
import { ExerciseList } from "../exercises/ExerciseList";

export const SingleWorkoutTypePage = ({ match }) => {
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
      {/*show either workouts or exercise templates*/}
      <ExerciseList workoutTypeId={workoutTypeId} />
      <h3>Workouts</h3>
      <ul>{workoutTitles}</ul>
    </section>
  );
};
