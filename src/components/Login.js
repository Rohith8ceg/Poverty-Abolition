import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebaseConfig";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    var type = ""
    var username = ""
    e.preventDefault();
    setError("");
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
            if(new_data[new_var]["email"] === email){
              console.log(new_data[new_var]["type"]);
              type = new_data[new_var]["type"];
              username = new_data[new_var]["user"];
            }
          }
        }
      }
    }
    try {
      await logIn(email, password);
      if(type == "Donor"){
        console.log("donor heree");
        navigate("/donorhome", {user: username});
      }
      else if(type == "NGO"){
        console.log("NGO heree");
        navigate("/ngohome", {user: username});
      }
      else
        throw "NOTA";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>{props.user}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <Link to="/phonesignup">
          <div className="d-grid gap-2 mt-3">
            <Button variant="success" type="Submit">
              Sign in with Phone
            </Button>
          </div>
        </Link>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;