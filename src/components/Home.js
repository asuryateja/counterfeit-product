import React from "react";
import "../css/home.css";
import { NavLink } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/1.json";
import animationData1 from "../lotties/2.json";
import animationData2 from "../lotties/3.json";

const Home = ({ account }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  };

  return (
    <div className="container">
      <div id="login-type-container">
        <h4 style={{fontSize: '20px', color: "#f7f7f7", position: "fixed", right: 8, top: 2 }}>
          Wallet Address:
          {account.substring(0, 4) +
            "..." +
            account.substring(account.length - 4, account.length)}
        </h4>
        <br />
        <div style={{color: '#f7f7f7'}} id="login-type">
          <h1 id="greetings">Welcome to MetaTrack</h1>
          <h1 id="subtitle-txt">
            A Blockchain Based Fake Product Detection 🕵️‍♀️
          </h1>
          <div id="options-container">
            <NavLink to="/vendor" className="select-link">
              <div className="options">
              <Lottie options={defaultOptions1} height={240} width={240} />
                <h1 style={{color: '#f7f7f7'}} className="options-image-caption">Manufacturer Login</h1>
              </div>
            </NavLink>
            <NavLink to="/distributorform" className="select-link">
              <div className="options">
                <img
                  src="/assets/images/distributor.png"
                  alt="manufacturer"
                  className="options-image"
                />
                <h1 style={{color: '#f7f7f7'}} className="options-image-caption">Distributor Login</h1>
              </div>
            </NavLink>
            <NavLink to="/authenticate" className="select-link">
              <div className="options">
              <Lottie options={defaultOptions} height={240} width={240} />
                <h1 style={{color: '#f7f7f7'}} className="options-image-caption">Authenticate Product</h1>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
