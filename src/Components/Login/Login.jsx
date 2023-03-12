import axios from "axios";
import Joi from "joi";
import React from "react";
import { useState } from "react";
import Cookie from "react-cookies";
import { Link } from "react-router-dom";

const Login = ({ logUser }) => {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const validateUser = () => {
    const scheme = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return scheme.validate(User, { abortEarly: false });
  };

  const onChange = (event) => {
    setUser({ ...User, [event.target.name]: event.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    // console.log(validateUser());
    const validation = validateUser();
    const errorList = [];

    if (validation.error) {
      validation.error.details.map((err) => {
        errorList.push(err.message);
        setErrors(errorList);
      });
    } else {
      setErrors([]);
      const result = await axios.post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin ",
        User
      );
      //console.log(result);

      if (result.data.message === "success") {
        console.log(result.data.token);
        //logUser(result.data.token);
        const expires = new Date();
        const futureDay = expires.getDate() + 1;

        expires.setDate(futureDay);
        console.log(expires);

        Cookie.save("token", result.data.token, { expires });

        logUser(result.data.token);
      } else {
        result.data.err.map((err) => {
          errorList.push(err[0].message);
          setErrors(errorList);
        });
      }
    }
  };

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>

      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={submitForm}>
          {errors.map((error, index) => (
            <div className="alert alert-danger" role="alert" key={index}>
              {error}
            </div>
          ))}

          <input
            onChange={onChange}
            className="form-control"
            placeholder="Enter your email"
            type="text"
            name="email"
            value={User.email}
          />

          <input
            onChange={onChange}
            className="form-control my-4 "
            placeholder="Enter your Password"
            type="text"
            name="password"
            value={User.password}
          />

          <button className="btn btn-default-outline my-4 w-100 rounded">
            Login
          </button>
          <p>
            <Link className="text-muted forgot btn" to="/forget-password">
              I Forgot My Password
            </Link>
          </p>
          <a className="btn btn-default-outline" href="register.html">
            Register
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
