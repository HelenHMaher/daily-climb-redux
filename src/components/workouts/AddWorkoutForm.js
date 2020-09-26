import React, { useState } from "react";
import { addNewWorkout } from "./workoutsSlice";

export const AddWorkoutForm = () => {
  const [title, setTitle] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);

  return (
    <section>
      <h2>Add New Workouts</h2>
      <form>
        <label htmlFor="workoutTitle">Workout Title</label>
        <input
          type="text"
          id="workoutTitle"
          name="workoutTitle"
          value={title}
          onChange={onTitleChanged}
        />
      </form>
    </section>
  );
};
