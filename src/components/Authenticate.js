import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../lotties/4.json";

import "../css/Authenticate.css";
const Authenticate = ({ account }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  };

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="cam">
        <h4 style={{fontSize: '20px' ,color: "#f7f7f7", position: "fixed", right: 8, top: 2 }}>
          Wallet Address:{" "}
          {account.substring(0, 4) +
            "..." +
            account.substring(account.length - 4, account.length)}
        </h4>
        <br />
        <h2 style={{color: "#f7f7f7", position: "absolute", top: 20 }}>
          Hold QR Code Steady and Clear to Scan
        </h2>
        <QrReader
          onResult={async (result, error) => {
            if (!!result && !!result?.text) {
              let data = JSON.parse(result?.text);
              if (data.hash) {
                //HV1DID1M2FQ3Z9GKVSK6T2BKCNB8X89UCT
                let res = await axios.get(
                  `https://api-goerli.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${data.hash}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
                );
                if (res) {
                  console.log(res);
                  <>
                  <Lottie options={defaultOptions} height={300} width={300} />
                  </>
                  setMessage("Product is Authenticated ✅");
                  setAuth(true);
                }
              }
            }
            if (!!error) {
              //setMessage("Product is Not Authenticated ❌");
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
            color: "#f7f7f7"
          }}
        >
          <div>
            <h1 style={{color: "#f7f7f7"}}>{message}
            {
              (
                ()=>{
                  if(auth){
                    return(
                    <Lottie options={defaultOptions} height={300} width={300} />)
                  }
                }
              )()
            }
            </h1>
          </div>
        </div>
        <div style={{color: "#f7f7f7", position: "absolute", bottom: 90 }}>
          <h3>
            Please wait for 15 sec if Authentication messages is not appearing
            on the screen then your product is not Authenticated.
          </h3>
          <br />
          <span>Please reload the page to Scan again.</span>
        </div>
      </div>
    </>
  );
};

export default Authenticate;
