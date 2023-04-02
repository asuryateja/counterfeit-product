import React, { useState, useEffect , useRef} from "react";
import QrScanner from "qr-scanner";
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

  const handleClick = () => {
    fileRef.current.click();
    console.log(file);
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);

    try {
      await QrScanner.scanImage(file);
    } catch (e) {
      console.log(e); 
      setVerify(false);
      setMessage("Product is Not Authenticated ❌");
    }

    const result = await QrScanner.scanImage(file)
    console.log(result);
    try{ 
    let data = JSON.parse(result);
    
    console.log(data.hash);
    setHash(data.hash);
    
    let res = await axios.get(
      `https://api-goerli.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    );
    if (res) {
      console.log(res);
      setVerify(true);
      setMessage("Product is Authenticated ✅");
      setAuth(true);
    }
    }
    catch(e){
      console.log(e);
      setVerify(false);
      setMessage("Product is Not Authenticated ❌");
    }

  };

  const handleVerify = async () => {
    if (hash) {
      let res = await axios.get(
        `https://api-goerli.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      );
      if (res) {
        console.log(res);
        setVerify(true);
        setMessage("Product is Authenticated ✅");
        setAuth(true);
      }
      else{
        setVerify(false);
        setMessage("Product is Not Authenticated ❌");
      }
    }
  };

  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [hash, setHash] = useState("");
  const [verify, setVerify] = useState(null);

  useEffect(() => {
    if (verify !== null) {
      handleVerify();
    }
  }, [verify]);

  return (
    <>
      <center>
        <div className='container'>
          <button
            type="button"
            onClick={handleClick}
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ backgroundColor: "#A9A9A9", color: "#28282B", border: "none", margin: "20px", padding: "10px 20px" , borderRadius: "10px", fontWeight: "bold", marginTop: "10%"}}
          >
            Scan QR Code
          </button>
          <input
            type="file"
            ref={fileRef}
            onChange={handleChange}
            accept=".png, .jpg, .jpeg"
            style={{ display: "none" }}
          />
        </div>
      </center>
      <div>
        <h1 style={{ color: "#E5E4E2", textAlign: "center", marginTop: '20px' }}>
          {message}
          {verify && <Lottie options={defaultOptions} height={300} width={300} />}
        </h1>
      </div>
    </>
  );
};

export default Authenticate;
