import React from "react";
import  Cookies  from "react-cookies";
import { Link } from "react-router-dom";

const NavBar = ({ user,setUser }) => {

  const logout = () => {
setUser(null);
Cookies.remove("token");

  }
  return (
    <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/Home">
          <img src="/assets/Images/logo300.png" width={54} alt />{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/ListUsers">
                Users List
              </Link>
            </li>
            {user ? (
              <> 
              <li className="nav-item" onClick={{logout}}>
                  <Link className="nav-link" to="/Messages">
                    my messages
                  </Link>
                </li>
              <li className="nav-item" onClick={{logout}}>
                  <a className="nav-link" href="#">
                    Logout
                  </a>
                </li>
              
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
