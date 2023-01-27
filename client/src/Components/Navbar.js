import React from 'react'
import { NavLink,useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate();
  function handleLogout(){
    localStorage.removeItem("authToken");
    navigate("/login");
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-1 fst-italic" to="/">A & TM</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <NavLink className="nav-link bg-white bg-gradient text-dark rounded m-3" aria-current="page" to="/">Home</NavLink>
              </li>
              {(localStorage.getItem("authToken")) ?
                <div className="d-flex">
                  <NavLink className="nav-link bg-white text-dark rounded m-3" aria-current="page" to="/addTask">Add Task</NavLink>
                  <NavLink className="nav-link bg-white text-dark rounded m-3" aria-current="page" to="/dashboard">Dashboard</NavLink>
                </div>
                : ""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className="d-flex">
                <NavLink className="btn bg-white mx-1" to="/signup">Signup</NavLink>
                <NavLink className="btn bg-white mx-1" to="/login">Login</NavLink>
              </div>
              :
              <div>
                <div className='btn bg-white mx-1' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
