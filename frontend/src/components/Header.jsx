import React from "react";
import {pHome} from '../actions/actions'
import {connect} from 'react-redux'


function Header (props){

  const signOut=()=> {
    localStorage.clear();
    props.history.push("/");
  };
    return (
      <>
        <div className="header">
          <div className="header_lft">
            <div className="logo"  onClick={() => {props.pHome('home')}}>
              <a href>
                <img alt="abc" src="/images/logo.png" />
              </a>
            </div>
            <div className="navigatn">
              <ul>
                <li>
                  <a href onClick={() => {
                          this.props.pHome('home');
                        }} className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href> E-Coupons </a>
                </li>
                <li>
                  <a href>E-Brands </a>
                </li>
                <li>
                  <a href> Resuse Market </a>
                </li>
                <li>
                  {localStorage.getItem("Email") ? (
                    <a href onClick={signOut
                    }>
                      signOut
                    </a>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          </div>
          {localStorage.getItem("Email") ? (
            <div className="header_rgt">
              <div className="flag_div">
                <img alt="abc" src="/images/flag.png" />
              </div>
              <input type="text" placeholder="Search" className="txt_box" />
              <div className="msg_box">
                <a href>
                  <span className="msg_count">100</span>
                </a>
              </div>
              <div className="info_div" onClick={() => {
                          props.pHome('profile');
                        }} >
                <div className="image_div">
                  {" "}
                  <img alt="abc" src="/images/pic.png" />{" "}
                </div>
                <div className="info_div1">Me</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
export default connect(null,{pHome})(Header)