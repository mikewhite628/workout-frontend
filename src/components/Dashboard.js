import React from "react";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import Workout from "./Workout";
import axios from "axios";
import "../index.css";
import "../App.css";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date(new Date()));
  const [dateSelected, setDateSelected] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);
  const [checkedDate, setCheckedDate] = useState([]);

  const fetchAllWorkouts = async () => {
    const response = await axios("http://localhost:3001/api/workouts/");
    setApiResponse(response.data);
    setDataLoaded(true);

    response.data.forEach((item) => {
      setMarkedDates([...markedDates, markedDates.push(item.date)]);
    });
  };

  useEffect(() => {
    fetchAllWorkouts();
  }, []);

  const toggleWorkout = (e) => {
    let workoutOpen = !dateSelected;
    setDateSelected(workoutOpen);
    setCheckedDate(apiResponse.filter(({ date }) => date === e.toDateString()));
    console.log(checkedDate);
  };

  return (
    <div className="h-screen">
      <h1 className="test">Dashboard</h1>
      <Calendar
        onChange={setSelectedDate}
        onClickDay={(e) => toggleWorkout(e)}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          if (markedDates.find((x) => x === date.toDateString())) {
            return "Fire";
          }
        }}
      />
      {dateSelected ? (
        <Workout checkedDate={checkedDate} selectedDate={selectedDate} />
      ) : null}
    </div>
  );
}
