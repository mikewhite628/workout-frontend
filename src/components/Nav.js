import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w/100 bg-stone-500 h-8 flex justify-end">
      <ul className="flex flex-row w-96 justify-between text-slate-50">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>Link 3</li>
      </ul>
    </nav>
  );
};

export default Nav;
