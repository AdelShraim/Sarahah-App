import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Forget = () => {
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const onChange = (event) => {
    const {value} = event.target;
    setEmail(value);
  };

  const submitForm =async (event) => {
    event.preventDefault();

    if(!email || email.length < 8) {
        toast.warning("please enter your email");
        return;
    }

    const result = await axios.patch("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode", 
    {email},
    );
    toast.success("please check your email");
    navigate(`/reset-code/${email}`);

  };

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Forget Password</h4>
      </div>

      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={submitForm}>
          <input
            onChange={onChange}
            className="form-control"
            placeholder="Enter your email"
            type="text"
            name="email"
            value={email}
          />

          <Link className="btn btn-default-outline my-4 w-100 rounded" to="/reset-code" >
            Reset Password
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Forget;
