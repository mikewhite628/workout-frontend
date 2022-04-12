import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [workout, setWorkout] = useState({
    lift: "",
    dates: "",
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

  const createWorkout = (e) => {
    setWorkout({
      ...workout,
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

  const fetchWorkout = async () => {
    const response = await axios("http://localhost:3001/api/workouts/");
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
    <div className={"container"}>
      <main>
        <h1 className={""}>Workout Tracker</h1>

        <form className={""} onSubmit={(e) => createWorkout(e)}>
          <label> Lift </label>
          <input
            name="lift"
            type="text"
            placeholder="Lift"
            value={workout.lift}
            onChange={handleChange}
          />
          <label> Sets </label>
          <button className="button add" type="button" onClick={() => addSet()}>
            Add
          </button>

          {reps.map((rep, index) => (
            <div key={index}>
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
            </div>
          ))}

          <label> Date </label>
          <input
            name="date"
            type="date"
            value={workout.dates}
            onChange={handleChange}
          ></input>
          <label> Notes </label>
          <textarea
            name="notes"
            placeholder="notes"
            value={workout.notes}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </main>
      {dataLoaded ? (
        apiResponse.map((exercise) =>
          !updating ? (
            <div key={exercise._id}>
              <p>{exercise._id}</p>
              <h1>{exercise.name}</h1>
              <button
                id={exercise.id}
                type="button"
                onClick={() => deleteWorkout(exercise._id)}
              >
                delete
              </button>
              {exercise.sets.map((set) => (
                <div key={set._id}>
                  <ul key={set._id}>
                    <li>{set.repNumber}</li>
                    <li>{set.repWeight}</li>
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
            <div key={exercise._id}>
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
      )}
    </div>
  );
}
