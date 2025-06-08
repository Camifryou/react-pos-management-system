import React from "react";
import { Link } from "react-router-dom";
import {
  FaTools,
  FaUsers,
  FaCogs,
} from "react-icons/fa";

const SidebarLeft = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Phone Repair Shop</h2>
      </div>
      
      <nav>
        <ul>
          <li>
            <Link to="/" className="menu-item">
              <FaTools className="icon" />
              <span>Reparaciones</span>
            </Link>
          </li>
          <li>
            <Link to="/customers" className="menu-item">
              <FaUsers className="icon" />
              <span>Clientes</span>
            </Link>
          </li>
          <li>
            <Link to="/parts" className="menu-item">
              <FaCogs className="icon" />
              <span>Repuestos</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarLeft;
