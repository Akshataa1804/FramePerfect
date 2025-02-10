import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaClosedCaptioning, FaPhotoVideo, FaMusic, FaEdit, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>FramePerfect</h2>
      <ul>
        <li>
          <Link to="/">
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/subtitles">
            <FaClosedCaptioning className="icon" /> Subtitles
          </Link>
        </li>
        <li>
          <Link to="/media">
            <FaPhotoVideo className="icon" /> Media
          </Link>
        </li>
        <li>
          <Link to="/audio">
            <FaMusic className="icon" /> Audio
          </Link>
        </li>
        <li>
          <Link to="/edit">
            <FaEdit className="icon" /> Edit
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser className="icon" /> Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
