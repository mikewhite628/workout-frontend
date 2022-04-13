import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import Workout from "./Workout";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date(new Date()));
  const [dateSelected, setDateSelected] = useState(false);

  const mark = ["Mon Mar 28 2022", "Tue Mar 29 2022"];

  const toggleWorkout = () => {
    let workoutOpen = !dateSelected;
    setDateSelected(workoutOpen);
    console.log(dateSelected);
  };

  console.log(selectedDate);

  return (
    <div>
      <h1>Dashboard</h1>
      <Calendar
        onChange={setSelectedDate}
        onClickDay={toggleWorkout}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          if (mark.find((x) => x === date.toDateString())) {
            return "Fire";
          }
        }}
      />
      {dateSelected ? <Workout selectedDate={selectedDate} /> : null}
    </div>
  );
}
