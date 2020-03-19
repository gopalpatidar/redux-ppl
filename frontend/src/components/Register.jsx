import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register(props) {
  const useSignUpForm = callback => {
    const [inputs, setInputs] = useState({
      FirstName:"",
      LastName:"",
      Email:"",
      Password:"",
      Username:"",
      Image:""
    });
    const handleSubmit = event => {
      event.preventDefault();
      var formData = new FormData();
      formData.append("FirstName", inputs.FirstName);
      formData.append("LastName", inputs.LastName);
      formData.append("Email", inputs.Email);
      formData.append("Password", inputs.Password);
      formData.append("Username", inputs.Username);
      formData.append("Image", inputs.Image);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      axios
        .post("http://192.168.100.111:9000/auth/header", formData, config)
        .then(response => {
          if (response.data) {
            props.history.push("loginpage");
          } else {
            alert("Already Exit");
            props.history.push("loginpage");
          }
        })
        .catch(err => {
          alert(err);
          console.log(err);
        });
    };
    const handleChange = event => {
      event.persist();
        setInputs(inputs => ({
        ...inputs,
        [event.target.name]: event.target.value
      }));
    };
    const handleUploade = event => {
      event.persist();
      setInputs(inputs => ({ ...inputs, Image: event.target.files[0] }));
      console.log(event.target.files[0], "asd");

    };
    return {
      handleSubmit,
      handleChange,
      handleUploade,
      inputs
    };
  };

  const { inputs, handleChange, handleUploade, handleSubmit } = useSignUpForm();

  useEffect(() => {
    if (localStorage.getItem("Email")) props.history.push("/timeline");
  });

  return (
    <div className="content_rgt">
      <div className="register_sec">
        <h1>Create An Account</h1>
        <form id="fromre" onSubmit={handleSubmit}>
          <ul>
            <li>
              <span>Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                name="Username"
                onChange={handleChange}
                required
              />
            </li>
            <li>
              <span>Password</span>
              <input
                type="password"
                maxlength="8"
                minLength="5"
                name="Password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </li>
            <li>
              <span>Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                name="Email"
                onChange={handleChange}
                required
              />
            </li>
            <li>
              <span>First Name</span>
              <input
                type="text"
                placeholder="Enter your first name"
                onChange={handleChange}
                name="FirstName"
                required
              />
            </li>
            <li>
              <span>Last Name</span>
              <input
                type="text"
                placeholder="Enter your last name"
                onChange={handleChange}
                name="LastName"
                required
              />
            </li>
            <li>
              <span>Upload Picture</span>
              <input
                type="file"
                onChange={handleUploade}
                name="Image"
                required
              />
            </li>
            <li>
              <input type="checkbox" onChange={handleChange} required />I agree
              to Term &amp; Conditions
            </li>
            <li>
              <input type="submit" value="submit" />
            </li>
          </ul>
        </form>
        <div className="addtnal_acnt">
          I already have an account.
          <Link to="loginpage">Login My Account !</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
