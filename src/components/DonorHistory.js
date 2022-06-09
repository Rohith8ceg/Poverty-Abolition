import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
import { db } from "../firebaseConfig";

const DonorHistory = () => {
    var data = [];
    useEffect(() => {
        console.log("in useeffectttt");
        getDonations();
        console.log("Dataaa", data)
    })
   
    const [tdata, setData] = useState(data);

    async function getDonations() {
        var email = window.localStorage.getItem("email");
        await db
            .collection("Donations")
            .get()
            .then((res) => {
                var i = 0;
                var index=0;
                console.log(res.docs.length);
                var length=res.docs.length;
                while (length--) {
                    var db_data = res.docs[i].data();
                    for (var id in db_data) {
                        if (id == email && db_data["status"] == "2") {
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

    function Card(props) {
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
            <br/><br/>
            <h1>Donations done so far</h1>
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

export default DonorHistory;