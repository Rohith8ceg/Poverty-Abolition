import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
import { db } from "../firebaseConfig";

const NGOHome = () => {
  var data = [];
  
  getDonations();
  useEffect(() => {
    let ignore = false;

    if (!ignore) getDonations()
    return () => { ignore = true; }
  }, []);

  const { logOut, user } = useUserAuth();
  var data = [{
    "category": "Food",
    "description": "Raw food",
    "id": "j8INRnioVE2AnAzQtuNb",
    "quantity": "1kg",
  },
  {
    "category": "Clothes",
    "description": "Shirt and pant",
    "id": "j8INRnioVE2AnAzQtuNb",
    "quantity": "4",
  },
  ];

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };


  async function getDonations() {
    await db
      .collection("Donations")
      .get()
      .then((res) => {
        var db_data = res.docs[0].data(0);
        for (var i in db_data) {
          console.log("Res:\n", db_data[i]);
          db_data[i]["id"] = i;
          data.push(db_data[i]);
          //setdata([...data, db_data[i]]);
        }
        console.log("Res:\n", data);
      })
  }

  function Card(props) {
    console.log(props.itemData);
    return (
      <div>
        <div className="p-01 box mt-3 text-center" >
          <h2 >{props.itemData.category}</h2>
          <p >{props.itemData.description}</p>
          <p >{props.itemData.quantity}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>Available Donations</h1>
      <div>
        {data.map((item) => {
          return <Card itemData={item} />
        })}
      </div>
      <br />
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <br />
      <div className="p-4 box mt-3 text-center">
        <b>Welcome NGO<br />
          {user && user.email}</b>
      </div>
      <br />
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={getDonations}>
          Continue
        </Button>
      </div>
      <br /><br />
      <br /><br />
    </>
  );
};

export default NGOHome;