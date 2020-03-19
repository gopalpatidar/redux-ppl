import React from "react";
import Leftloginreg from "../components/leftloginreg";
import Forgot from "../components/Forgot";

function Forgotpage(){
    return (
      <div className="container">
        <div className="content">
          <Leftloginreg />
          <Forgot {...this.props} />
        </div>
      </div>
    );
  }
export default Forgotpage;
