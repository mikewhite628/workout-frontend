import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>Link 2</li>
        <li>Link 3</li>
      </ul>
    </div>
  );
};

export default Nav;
