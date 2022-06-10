import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
import { db } from "../firebaseConfig";

const NGODelivery = () => {

  var data = [];
  useEffect(() => {
    console.log("in useeffectttt");
    getDonations();
    console.log("Dataaa", data)
  })
  const [tdata, setData] = useState(data);

  const { logOut, user } = useUserAuth();

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
        var length = res.docs.length;
        while (length--) {
          var db_data = res.docs[i].data();
          for (var id in db_data) {
            if(id=="package_id"){
              console.log(db_data["package_id"]);
            }
            if (db_data["status"] == "1" && id.includes("@gmail.com")) {
              for (var item in db_data[id]) {
                db_data[id][item]["id"] = db_data["package_id"];
                db_data[id][item]["location"] = db_data["location"];
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

  async function finishOrder(package_id){
    await db
      .collection("Donations")
      .get()
      .then((res) => {
        var i = 0;
        var index = 0;
        var length = res.docs.length;
        while (length--) {
          var db_data = res.docs[i].data();
          for (var id in db_data) {
            if(db_data["package_id"]==package_id){
              console.log(db_data["package_id"]);
              // db_data["status"] = 1;
              db.collection("Donations").doc(res.docs[i]["id"]).update({"status":2},{merge:true}); 
            }
          }
          i++;
        }
        console.log(data);
      });
    //   window.location.reload();
  }

  function Card(props) {
    console.log("---inside card",props.itemData.id);
    return (
      <div>
        <div className="p-01 box mt-3 text-center" >
          <h2 >{props.itemData.category}</h2>
          <p><b>Order Id</b> - {props.itemData.id}</p>
          <p><b>Location</b> - {props.itemData.location}</p>
          <p ><b>Description</b> - {props.itemData.description}</p>
          <p ><b>Quantity</b> - {props.itemData.quantity}</p>
          <Button onClick={finishOrder.bind(this,props.itemData.id)}>Finish delivery</Button>
          <br /><br />
        </div>
      </div>
    );
  }

  return (
    <>
      <br />
      <br/><br/>
      <center><h2>Yet to be delivered</h2></center>
      <div>
        {tdata.map((item) => {
          return <Card itemData={item} />
        })}
      </div>
    </>
  );
};

export default NGODelivery;