import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebaseConfig";

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      var type = "";
      var data = {};
      const snapshot_ngo = await db.collection('NGO').get();
      const snapshot_donor = await db.collection('Donor').get();
      data["NGO"] = snapshot_ngo.docs.map(doc => doc.data());
      data["Donor"] = snapshot_donor.docs.map(doc => doc.data());
      console.log("dataa",data)
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var new_data = data[key];
          for(var new_var in new_data){
            if(new_data.hasOwnProperty(new_var)){
              if(new_data[new_var]["phone"] === number.slice(3)){
                console.log(new_data[new_var]["type"]);
                type = new_data[new_var]["type"];
              }
            }
          }
        }
      }
      if(type == "Donor"){
        console.log("donor heree");
        navigate("/donorhome");
      }
      else if(type == "NGO"){
        console.log("NGO heree");
        navigate("/ngohome");
      }
      else
        throw "NOTA";
    } catch (err) {
      setError(err.message);
    }
  };

  const test = () => {
    console.log(number.slice(3));
    console.log(number);
  }

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Phone Auth</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Send Otp
            </Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneSignUp;