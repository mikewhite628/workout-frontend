import React, { useState, useEffect } from "react";

export default function EditExercise({ selectedExercise }) {
  const [reps, setReps] = useState([{ repNumber: "", repWeight: "" }]);

  let addSet = () => {
    setReps([...reps, { repNumber: "", repWeight: "" }]);
  };

  let removeSet = (i) => {
    let newReps = [...reps];
    newReps.splice(i, 1);
    setReps(newReps);
  };
  const updateWorkout = async (id, e, data) => {
    const newWorkout = await {
      lift: updatedWorkout.lift || data.lift,
      sets: updatedWorkout.sets || data.sets,
      date: updatedWorkout.date || data.date,
      notes: updatedWorkout.notes || data.notes,
      id: id,
    };
    axios.put("http://localhost:3001/api/workouts/", newWorkout);
    console.log(newWorkout);
  };
  return (
    <div>
      <h1>Edit Exercise</h1>
    </div>
  );
}
