import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditExercise({ selectedExercise }) {
  const [reps, setReps] = useState(selectedExercise.sets);

  const [updatedWorkout, setUpdatedWorkout] = useState({
    sets: selectedExercise.sets,
    name: selectedExercise.name,
    date: selectedExercise.date,
    notes: selectedExercise.notes,
    _id: selectedExercise._id,
  });

  let addSet = () => {
    setReps([...reps, { repNumber: "", repWeight: "" }]);
  };

  let removeSet = (i) => {
    let newReps = [...reps];
    newReps.splice(i, 1);
    setReps(newReps);
  };

  const handleChange = (e) => {
    setUpdatedWorkout({
      ...updatedWorkout,
      [e.target.name]: e.target.value,
    });
  };

  let handleReps = (e, i) => {
    let newReps = [...reps];
    newReps[i][e.target.name] = e.target.value;
    setReps(newReps);
    setUpdatedWorkout({
      ...updatedWorkout,
      sets: reps,
    });
  };

  const updateWorkout = (data) => {
    const newWorkout = {
      sets: updatedWorkout.sets || data.sets,
      lift: updatedWorkout.name || data.name,
      date: updatedWorkout.date || data.date,
      notes: updatedWorkout.notes || data.notes,
      _id: updatedWorkout._id || data._id,
    };
    axios
      .post("http://localhost:3001/api/update_workout/", newWorkout)
      .then(() => console.log(`updated`));
    console.log(newWorkout);
  };

  return (
    <div className="absolute top-1/2 left-1/3">
      <h1>Edit Exercise</h1>
      <div
        key={updatedWorkout._id}
        className="border border-blue-500 fit flex flex-col justify-center z-20 bg-white"
      >
        <label> Name </label>
        <input
          name="name"
          type="text"
          value={updatedWorkout.name}
          onChange={handleChange}
        />
        <label> Sets </label>
        <button className="button add" type="button" onClick={() => addSet()}>
          Add
        </button>

        {reps.map((rep, index) => (
          <ul key={index} className="flex flex-row justify-evenly">
            <input
              name="repNumber"
              type="text"
              placeholder="Reps"
              value={rep.repNumber || ""}
              onChange={(e) => handleReps(e, index)}
            />
            <input
              name="repWeight"
              type="text"
              placeholder="Weight"
              value={rep.repWeight || ""}
              onChange={(e) => handleReps(e, index)}
            />
            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeSet(index)}
              >
                Remove
              </button>
            ) : null}
          </ul>
        ))}
        <label> Notes </label>
        <textarea
          name="notes"
          placeholder="notes"
          value={updatedWorkout.notes}
          onChange={handleChange}
        ></textarea>
        <button
          type="button"
          id={selectedExercise._id}
          onClick={(e) =>
            updateWorkout(e, selectedExercise._id, selectedExercise)
          }
        >
          update
        </button>
      </div>
    </div>
  );
}
