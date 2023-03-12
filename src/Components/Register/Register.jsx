import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomInput from "../Common/CustomInput";
const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });

  const registerScheme = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().min(5).required(),
    password: Joi.string().required(),
    cPassword: Joi.string().required(),
  });

  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
   
    const validation = validateInput(value, registerScheme.extract(name));
    //const err = {};
    if (validation.error) {
      //err[name] = validation.error;

      setErrors({ ...errors, [name]: validation.error.details[0].message });
    } else {
      const err = { ...errors };
      delete err[name];
      setErrors({ ...err });
    }
    setInputs({ ...inputs, [name]: value });
  };


  const onSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0  ) {
 
      const result= await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",inputs);
      toast.success("Register successfully , please confirm your email");
      
console.log(result);
     

    }

  };

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={onSubmit}>
          
           <CustomInput
            errors={errors.email}
            name="email"
            onChange={onChange}
            text="Enter your email "
            type="email"
          />


          <CustomInput
            errors={errors.name}
            name="name"
            onChange={onChange}
            text="Enter your name "
            type="text"
          />

<CustomInput
            errors={errors.password}
            name="password"
            onChange={onChange}
            text="Enter your password "
            type="password"
          />

<CustomInput
            errors={errors.cPassword}
            name="cPassword"
            onChange={onChange}
            text="confirm your password "
            type="password"
          />

          
      <button className="btn btn-default-outline my-4 w-100 rounded">Login</button>
      <p>
        <a className="text-muted forgot btn" href>I Forgot My Password</a>
        </p>
   


         

          <a className="btn btn-default-outline" href="register.html">
            Register
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;
