import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
import { db } from "../firebaseConfig";

const NGOHistory = () => {
    var data = [];
    var history = [];
    var hist_final = [];
    useEffect(() => {
        console.log("in useeffectttt");
        getDonations();
        console.log("Dataaa", hist_final)
    })
    const [tdata, setData] = useState(hist_final);

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
        var email = window.localStorage.getItem("email");
        await db
            .collection("NGO")
            .get()
            .then((res) => {
                var i = 0;
                var index = 0;
                var length = res.docs.length;
                while (length--) {
                    var db_data = res.docs[i].data();
                    console.log(db_data);
                    if (db_data["email"] == email) {
                        for (var item in db_data["package_id"]) {
                            console.log(db_data["package_id"][item]);
                            data.push(db_data["package_id"][item]);
                        }
                    }
                    i++;
                }
                console.log(data);
            })
        await db
            .collection("Donations")
            .get()
            .then((res) => {
                var length = res.docs.length;
                for (var ids in data) {
                    var i = 0;
                    while (length--) {
                        var db_data_hist = res.docs[i].data();
                        console.log(data[ids]);
                        if (data[ids] == db_data_hist["package_id"] && db_data_hist["status"] == "2") {
                            for (var item in db_data_hist) {
                                console.log(item);
                                if (item.includes("@gmail.com")) {
                                    history.push(db_data_hist[item])
                                    console.log(db_data_hist[item]);
                                }
                            }
                        }
                        i++;
                    }
                    length = res.docs.length;
                }
                var index_key=0;
                for(var outer in history){
                    for(var inner in history[outer]){
                        history[outer][inner]["id"]=index_key;
                        hist_final.push(history[outer][inner]);
                        index_key++;
                    }
                }
                console.log(hist_final);
            })
    }

    // for (var itemid in db_data_hist) {
    //     console.log(db_data_hist["package_id"]);

    //             if (itemid.includes("@gmail.com")) {
    //                 for (var item in db_data_hist[itemid]) {
    //                     console.log(item)
    //                     db_data_hist[id][item]["id"] = db_data_hist["package_id"];
    //                     history.push(db_data_hist[id][item]);
    //                     console.log(db_data_hist[id][item]);
    //                     // index++;
    //                 }
    //             }
    //         }
    //     }
    //     if (itemid.includes("@gmail.com")) {
    //         for (var item in db_data_hist[itemid]) {
    //             console.log(item)
    //             db_data_hist[id][item]["id"] = db_data_hist["package_id"];
    //             history.push(db_data_hist[id][item]);
    //             console.log(db_data_hist[id][item]);
    //             // index++;
    //         }
    //     }
    //     // if(db_data_hist["package_id"]==itemid){
    //     //     for(var id in db_data_hist){
    //     //         console.log(id);
    //     //         if(id.includes("@gmail.com")){
    //     //             for (var item in db_data_hist[id]) {
    //     //                 console.log(item)
    //     //                 db_data_hist[id][item]["id"] = db_data_hist["package_id"];
    //     //                 history.push(db_data_hist[id][item]);
    //     //                 console.log(db_data_hist[id][item]);
    //     //                 // index++;
    //     //             }
    //     //         }
    //     //     }
    //     // }
    //     // }
    //     // console.log(db_data_hist["package_id"])
    // }
    // i++;



    function Card(props) {
        console.log("---inside card", props.itemData.id);
        return (
            <div>
                <div className="p-01 box mt-3 text-center" >
                    <h2 >{props.itemData.category}</h2>
                    <p ><b>Description</b> - {props.itemData.description}</p>
                    <p ><b>Quantity</b> - {props.itemData.quantity}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <br />
            <br /><br />
            <center><h2>Donations completed so far..</h2></center>
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

export default NGOHistory;