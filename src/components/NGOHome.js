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
    console.log("Dataaa", data)
  })
  const [tdata, setData] = useState(data);

  const { logOut, user } = useUserAuth();
  window.localStorage.setItem("email",user.email);

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
        var i = 0;
        var index = 0;
        console.log(res.docs.length);
        var length = res.docs.length;
        while (length--) {
          var db_data = res.docs[i].data();
          for (var id in db_data) {
            console.log(id);
            if (db_data["status"] == "0" && id.includes("@gmail.com")) {
              for (var item in db_data[id]) {
                db_data[id][item]["id"] = index;
                data.push(db_data[id][item]);
                console.log(db_data[id][item]);
                index++;
              }
            }
          }
          i++;
        }
        console.log(data);
      })
  }

  async function confirmOrder(){
    await db
    .collection("NGO")
    .get()
    .then((res) => {
      // console.log(item);
        var i = 0;
        var index=0;
        var length=res.docs.length;
        var email= window.localStorage.getItem("email");
        var data=[];
        while (length--) {
          var db_data = res.docs[i].data();
          console.log(db_data["email"]);
          if(db_data["email"]==email){
            //add the selected item to history 
          }
        }
        //change the status in the donation node.
        console.log(data);
    });
  }

  function Card(props) {
    // console.log("---inside card",props.itemData);
    return (
      <div>
        <div className="p-01 box mt-3 text-center" >
          <h2 >{props.itemData.category}</h2>
          <p >{props.itemData.description}</p>
          <p >{props.itemData.quantity}</p>
          <Button onClick={confirmOrder}>Take this order</Button>
          <br /><br />
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