import { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import axios from "axios";

export default function Home() {
  const [workout, setWorkout] = useState({
    lift: "",
    dates: "",
    notes: "",
    sets: [{ reps: "", weight: "" }],
  });

  const [reps, setReps] = useState([{ repNumber: "", repWeight: "" }]);

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
    console.log(workout);
  };

  let handleReps = (e, i) => {
    let newReps = [...reps];
    newReps[i][e.target.name] = e.target.value;
    setReps(newReps);
    setWorkout({
      ...workout,
      ...newReps,
    });
  };

  const createWorkout = (e) => {
    e.preventDefault();
    setWorkout({
      ...workout,
      set: reps,
    });
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

  const fetchWorkout = async () => {
    const response = await axios("http://localhost:3001/workouts/");
    setApiResponse(response.data);
    setDataLoaded(true);
  };

  useEffect(() => {
    fetchWorkout();
  }, []);

  return (
    <div className={"container"}>
      <Calendar />

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
            placeholder="Date"
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
        apiResponse.map((exercise, index) => (
          <div key={index}>
            <h1>{exercise.name}</h1>
            {exercise.sets.map((set) => (
              <div key={set.__id}>
                <ul>
                  <li>{set.reps}</li>
                  <li>{set.weight}</li>
                </ul>
              </div>
            ))}
            <p>{exercise.notes}</p>
          </div>
        ))
      ) : (
        <h1>Loading Data</h1>
      )}
    </div>
  );
}
