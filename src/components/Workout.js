import { useState, useEffect } from "react";

import axios from "axios";

export default function Workout({ checkedDate, selectedDate }) {
  let date = selectedDate.toDateString();

  const [workout, setWorkout] = useState({
    lift: "",
    dates: date,
    notes: "",
    sets: [{ repNumber: "", repWeight: "" }],
  });

  const [reps, setReps] = useState([{ repNumber: "", repWeight: "" }]);
  const [updatedWorkout, setUpdatedWorkout] = useState({
    lift: "",
    dates: "",
    notes: "",
    sets: [{ repNumber: "", repWeight: "" }],
  });

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

  let handleUpdate = (e) =>
    setUpdatedWorkout({
      ...updatedWorkout,
      [e.target.name]: e.target.value,
    });

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

  const [apiResponse, setApiResponse] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchWorkout = async (date) => {
    const response = await axios("http://localhost:3001/api/workouts/", {});
    setApiResponse(response.data);
    setDataLoaded(true);
  };

  const deleteWorkout = async (id) => {
    const deleteID = await id;

    axios.delete("http://localhost:3001/api/workouts/", { data: { id } });
    console.log(deleteID);
    window.location.reload(false);
  };

  const toggleUpdate = (e, id) => {
    let isUpdating = updating;
    setUpdating(!isUpdating);
    console.log(e.target.id);
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
  useEffect(() => {
    fetchWorkout();
  }, []);

  return (
    <div className={"container m-auto mt-6 "}>
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

      <div className="flex flex-row justify-between">
        {checkedDate.length > 0 ? (
          checkedDate.map((exercise) => (
            <div
              className={"border border-blue-500 w-64 relative"}
              key={exercise._id}
            >
              <p>ID: {exercise._id}</p>
              <h1>{exercise.name}</h1>
              <h3>{exercise.date}</h3>
              <button
                id={exercise.id}
                type="button"
                className="w-48 bg-red-500"
                onClick={() => deleteWorkout(exercise._id)}
              >
                delete
              </button>
              <h3>Sets</h3>
              {exercise.sets.map((set) => (
                <div key={set._id}>
                  <ul key={set._id} className="flex flex-row justify-evenly">
                    <li>Reps: {set.repNumber}</li>
                    <li>Sets: {set.repWeight}</li>
                  </ul>
                </div>
              ))}
              <p>{exercise.notes}</p>
              <button
                type="button"
                id={exercise._id}
                onClick={(e) => toggleUpdate(e, exercise._id)}
              >
                edit
              </button>
            </div>
          ))
        ) : (
          <div> Add a workout</div>
        )}
        {/* {dataLoaded ? (
          apiResponse.map((exercise) =>
            !updating ? (
              <div
                className={"border border-blue-500 w-64 relative"}
                key={exercise._id}
              >
                <p>ID: {exercise._id}</p>
                <h1>{exercise.name}</h1>
                <h3>{exercise.date}</h3>
                <button
                  id={exercise.id}
                  type="button"
                  className="w-48 bg-red-500"
                  onClick={() => deleteWorkout(exercise._id)}
                >
                  delete
                </button>
                <h3>Sets</h3>
                {exercise.sets.map((set) => (
                  <div key={set._id}>
                    <ul key={set._id} className="flex flex-row justify-evenly">
                      <li>Reps: {set.repNumber}</li>
                      <li>Sets: {set.repWeight}</li>
                    </ul>
                  </div>
                ))}
                <p>{exercise.notes}</p>
                <button
                  type="button"
                  id={exercise._id}
                  onClick={(e) => toggleUpdate(e, exercise._id)}
                >
                  edit
                </button>
              </div>
            ) : (
              <div key={exercise._id} className="border-green-500 w-48">
                <label> Lift </label>
                <input
                  name="lift"
                  type="text"
                  placeholder="Lift"
                  value={exercise.lift}
                  onChange={handleUpdate}
                />
                <label> Sets </label>
                <button
                  className="button add"
                  type="button"
                  onClick={() => addSet()}
                >
                  Add
                </button>

                {exercise.sets.map((rep, index) => (
                  <div key={index}>
                    <input
                      name="repNumber"
                      type="text"
                      placeholder="Reps"
                      value={rep.repNumber || ""}
                      onChange={(e) => handleUpdate(e, index)}
                    />
                    <input
                      name="repWeight"
                      type="text"
                      placeholder="Weight"
                      value={rep.repWeight || ""}
                      onChange={(e) => handleUpdate(e, index)}
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
                  </div>
                ))}

                <label> Date </label>
                <input
                  name="date"
                  type="date"
                  value={exercise.dates}
                  onChange={handleUpdate}
                ></input>
                <label> Notes </label>
                <textarea
                  name="notes"
                  placeholder="notes"
                  value={exercise.notes}
                  onChange={handleUpdate}
                ></textarea>
                <button
                  type="button"
                  id={exercise._id}
                  onClick={(e) => updateWorkout(e, exercise._id, exercise)}
                >
                  update
                </button>
              </div>
            )
          )
        ) : (
          <h1>Loading Data</h1>
        )} */}
      </div>
    </div>
  );
}
