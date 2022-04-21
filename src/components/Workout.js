import { useState, useEffect } from "react";
import AddExercise from "./AddExercise";
import EditExercise from "./EditExercise";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Workout({ checkedDate, selectedDate }) {
  let date = selectedDate.toDateString();

  const [apiResponse, setApiResponse] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});

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

  const toggleUpdate = async (e, apiResponse) => {
    let isUpdating = updating;
    setUpdating(!isUpdating);
    console.log(e.target.id);

    setSelectedExercise(apiResponse.find(({ _id }) => _id === e.target.id));
  };

  useEffect(() => {
    fetchWorkout();
  }, []);

  return (
    <div className={"container m-auto mt-6 "}>
      <AddExercise date={date} />
      <div className="flex flex-row flex-wrap justify-between">
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
                onClick={(e) => toggleUpdate(e, apiResponse)}
              >
                edit
              </button>
            </div>
          ))
        ) : (
          <div> Add a workout</div>
        )}
        {updating ? <EditExercise selectedExercise={selectedExercise} /> : null}
      </div>
    </div>
  );
}
