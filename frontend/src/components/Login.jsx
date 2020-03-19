import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [color, setColor] = useState({});

  const useLoginForm = callback => {
    const [inputs, setInputs] = useState();
    const loginForm = e => {
      e.preventDefault();
      axios
        .post("http://192.168.100.111:9000/auth/login", inputs)
        .then(response => {
          if (response.data) {
            localStorage.setItem(
              "UserName",
              response.data[0].FirstName + " " + response.data[0].LastName
            );
            localStorage.setItem("picture", response.data[0].Image);
            localStorage.setItem("FirstName", response.data[0].FirstName);
            localStorage.setItem("LastName", response.data[0].LastName);
            localStorage.setItem("Email", inputs.Email);
            props.history.push("timeline", { obj: response.data });
          } else {
            alert("Insert Valid User Id and Password");
            setColor("red");
          }
        })
        .catch(err => {
          console.log(err, "login catch axios");
        });
    };
    const handleChange = e => {
      e.persist();
      setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
    };

    return {
      loginForm,
      handleChange,
      inputs
    };
  };

  const { inputs, handleChange, loginForm } = useLoginForm();

  useEffect(() => {
    if (localStorage.getItem("Email")) {
      props.history.push("/timeline");
    }
  });
  return (
    <div className="content_rgt">
      <div className="login_sec">
        <h1>Log In</h1>
        <form onSubmit={loginForm}>
          <ul>
            <li>
              <span>Email-ID</span>
              <input
                type="email"
                placeholder="Enter your email"
                name="Email"
                style={{ backgroundColor: color }}
                onChange={handleChange}
                required
              />
            </li>
            <li>
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                name="Password"
                style={{ backgroundColor: color }}
                onChange={handleChange}
                required
              />
            </li>
            <li>
              <input type="checkbox" />
              Remember Me
            </li>
            <li>
              <input type="submit" defaultValue="Log In" />
              <Link to="/forgotpage">Forgot Password</Link>
            </li>
          </ul>
        </form>
        <div className="addtnal_acnt">
          I do not have any account yet.
          <Link to="/">Create My Account Now !</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;