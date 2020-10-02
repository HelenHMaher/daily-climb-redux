import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";

import { addNewExercise, exerciseAdded } from "./exerciseSlice";

export const AddExerciseForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workoutTypeId, setWorkoutTypeId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
};
