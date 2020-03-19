import React from "react";
import Leftloginreg from "../components/leftloginreg";
import Register from "../components/Register";
import {Route} from 'react-router-dom'

const RegisterPage = props => {
  return (
    <div className="container">
      <div className="content">
        <Leftloginreg />
        < Route component={Register} />
      </div>
    </div>
  );
};

export default RegisterPage;
