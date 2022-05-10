import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
//import bgImage from "../assets/images/pov3.jpg"

import { db } from "../firebaseConfig";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const [userType, setuserType] = useState("Donor");
  const onSelect = (selectedList, selectedItem) => {
    setuserType(selectedItem.key);
    console.log(selectedItem);
  }
  const user_type = [
    { key: "Donor" },
    { key: "NGO" }
  ]
  const addUser = () => {
    var data = {
      user: username,
      email: email,
      type: userType,
      phone: phone,
    }
    // db.ref(`/${userType}`).push(data);
    console.log("Hey this is login place", userType);
    db.collection(`/${userType}`).add(data);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      console.log("Calling adduser", userType);
      addUser();
      navigate("/", { user: userType });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Control
              type="text"
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <h4 style={{ color: "black" }}>Select Type of User</h4>
          <Multiselect
            options={user_type}
            singleSelect
            displayValue="key"
            onSelect={onSelect}
          />
          <br />

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;