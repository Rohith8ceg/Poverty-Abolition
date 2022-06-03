import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
import { db } from "../firebaseConfig";

const NGOHome = () => {
  
  // getDonations();
  // useEffect(() => {
  //   let ignore = false;

  //   if (!ignore) getDonations()
  //   return () => { ignore = true; }
  // }, []);

  var data = [];
  useEffect(() => {
    console.log("in useeffectttt");
    getDonations();
    console.log("Dataaa",data)
  })
  const [tdata,setData] = useState(data);

  const { logOut, user } = useUserAuth();
  // var data = [{
  //   "category": "Food",
  //   "description": "Raw food",
  //   "id": "j8INRnioVE2AnAzQtuNb",
  //   "quantity": "1kg",
  // },
  // {
  //   "category": "Clothes",
  //   "description": "Shirt and pant",
  //   "id": "j8INRnioVE2AnAzQtuNb",
  //   "quantity": "4",
  // },
  // ];

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
        //data = [];
        var db_data = res.docs[0].data(0);
        for(var key in db_data){
          console.log(db_data[key]);
          var i = 0;
          for(var item in db_data[key]){
              db_data[key][item]["id"] = item;
              console.log("____",db_data[key][item])
              data.push(db_data[key][item]);
              i += 1;
            }

          // db_data[key]["id"] = key;
          // console.log("____",db_data[key]["id"]);
          // data.push(db_data[key]);
        }
        // console.log("----",db_data["donation_list"]);
        // var i = 0;
        // for(var item in db_data["donation_list"]){
        //   db_data["donation_list"][item]["id"] = i;
        //   console.log("____",db_data["donation_list"][item])
        //   data.push(db_data["donation_list"][item]);
        //   i += 1;
        // }
        console.log("---data",data);
      })
  }

  function Card(props) {
    // console.log("---inside card",props.itemData);
    return (
      <div>
        <div className="p-01 box mt-3 text-center" >
          <h2 >{props.itemData.category}</h2>
          <p >{props.itemData.description}</p>
          <p >{props.itemData.quantity}</p>
          <Button>Take this order</Button>
          <br/><br/>
        </div>
      </div>
    );
  }

  return (
    <>
      <br />
      <div className="p-4 box mt-3 text-center">
        <b>Welcome NGO<br />
          {user && user.email}</b>
      </div>
      <br />
      {/* <div className="d-grid gap-2">
        <Button variant="primary" onClick={getDonations}>
          Continue
        </Button>
      </div>
      <br /><br /> */}
      <center><h2>Available Donations</h2></center>
      <div>
        {tdata.map((item) => {
          return <Card itemData={item} />
        })}
      </div>
      <br />
      <br /><br />
    </>
  );
};

export default NGOHome;