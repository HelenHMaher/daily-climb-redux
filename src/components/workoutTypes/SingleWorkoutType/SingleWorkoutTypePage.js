import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectWorkoutTypeById } from "../workoutTypesSlice";
import { selectWorkoutsByWorkoutType } from "../../workouts/workoutsSlice";
import { ExerciseListByWorkoutType } from "../../exercises/ExerciseListByWorkoutType";

import { StyledSingleWorkoutTypePage } from "./SingleWorkoutTypePage.styled";

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
    <StyledSingleWorkoutTypePage>
      <section className="singleComponent">
        <div id="special">
          <div className="singleHeader">
            <h2>{workoutType.name}</h2>
          </div>
          <div className="singlebody">
            <p className="workoutTypeDescription">{workoutType.description}</p>
          </div>
          <Link to={`/editWorkoutTypes/${workoutTypeId}`} className="button">
            Edit
          </Link>
        </div>
        <h3>Exercises</h3>
        <button type="button" onClick={clickShowExercises}>
          {showExercises ? "Hide" : "Show"} Exercises
        </button>
        {showExercises ? (
          <ExerciseListByWorkoutType workoutTypeId={workoutTypeId} />
        ) : (
          <></>
        )}
        <h3>Workouts</h3>
        <button type="button" onClick={clickShowWorkouts}>
          {showWorkouts ? "Hide" : "Show"} Workouts
        </button>
        {showWorkouts ? <ul>{workoutTitles}</ul> : <></>}
      </section>
    </StyledSingleWorkoutTypePage>
  );
};
