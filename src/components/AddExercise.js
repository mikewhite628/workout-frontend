import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddExercise({ date }) {
  const [workout, setWorkout] = useState({
    lift: "",
    dates: date,
    notes: "",
    sets: [{ repNumber: "", repWeight: "" }],
  });

  const [reps, setReps] = useState([{ repNumber: "", repWeight: "" }]);

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  let handleReps = (e, i) => {
    let newReps = [...reps];
    newReps[i][e.target.name] = e.target.value;
    setReps(newReps);
    setWorkout({
      ...workout,
      sets: reps,
    });
  };

  const createWorkout = (date) => {
    setWorkout({
      ...workout,
      dates: date,
    });

    console.log(workout);
    axios
      .post("http://localhost:3001/api/workouts", workout)
      .then(() => console.log(`Workout Created`));
  };

  let addSet = () => {
    setReps([...reps, { repNumber: "", repWeight: "" }]);
  };

  let removeSet = (i) => {
    let newReps = [...reps];
    newReps.splice(i, 1);
    setReps(newReps);
  };

  return (
    <div>
      <h1> Add Exercise</h1>
      <main className="flex flex-col justify-center mb-24 relative">
        <h1 className={"text-center"}>Workout Tracker {date}</h1>

        <form
          className={"border-2 border-cyan-600 flex flex-col w-96 m-auto p-6"}
          onSubmit={(e) => createWorkout(e)}
        >
          <label className="text-lg text-center"> Lift </label>
          <input
            name="lift"
            type="text"
            className="outline outline-cyan-600 w-44 m-auto"
            placeholder="Lift"
            value={workout.lift}
            onChange={handleChange}
          />
          <label className="text-center"> Sets </label>
          <button
            className="border bg-cyan-500 w-24"
            type="button"
            onClick={() => addSet()}
          >
            Add
          </button>

          {reps.map((rep, index) => (
            <div key={index}>
              <input
                name="repNumber"
                type="text"
                placeholder="Reps"
                className="outline outline-cyan-600 w-44"
                value={rep.repNumber || ""}
                onChange={(e) => handleReps(e, index)}
              />
              <input
                name="repWeight"
                type="text"
                placeholder="Weight"
                className="outline outline-cyan-600 w-44"
                value={rep.repWeight || ""}
                onChange={(e) => handleReps(e, index)}
              />
              {index ? (
                <button
                  type="button"
                  className="outline bg-red-600 w-44"
                  onClick={() => removeSet(index)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}

          <label className="text-center"> Notes </label>
          <textarea
            name="notes"
            placeholder="notes"
            value={workout.notes}
            className="outline outline-cyan-600 w-44 m-auto"
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="bg-green-500 w-24 mx-auto mt-6">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
