import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Reset = () => {

  const [inputFields,setInputFields] = useState({
    email:"",
    code:"",
    newPassword:"",

  });

  const navigate = useNavigate();

  const {email} = useParams();

  const submitForm =async (e) => {
    e.preventDefault();
    const results = await axios.patch("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword", 
    {...inputFields,email},
    );

    if(results.data.message === "success"){
      toast.success("password change succcefully");
      navigate("/login");
    } else if(results.data.message === "fail"){

      toast.error("please enter the right code");

    }

  };

  const onChange = (e) => {
    const {name,value} = e.target;
    setInputFields({...inputFields,[name]:value});

    
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
            className="form-control my-3"
            placeholder="please enter the code"
            type="text"
            name="code"
            value={inputFields.code}
          />
           <input
            onChange={onChange}
            className="form-control my-3"
            placeholder="plese enter new password"
            type="text"
            name="newPassword"
            value={inputFields.newPassword}
          />


          <button className="btn btn-default-outline my-4 w-100 rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reset