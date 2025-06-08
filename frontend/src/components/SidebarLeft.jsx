import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserCircle,
  FaSignInAlt,
  FaTools,
  FaUsers,
  FaCogs,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const SidebarLeft = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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

      <div className="user-info">
        <div className="user-detail">
          <FaUserCircle className="user-icon" />
          <span className="user">{user.name}</span>
        </div>
        <button className="logout-btn" onClick={logoutUser}>
          <FaSignInAlt className="logout-icon" />
        </button>
      </div>
    </div>
  );
};

export default SidebarLeft;
