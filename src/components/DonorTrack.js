import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
import { db } from "../firebaseConfig";
import Select from 'react-select'

const DonorTrack = () => {
    var data = [];
    const [status, setStatus] = useState();
    const [flag, setflag] = useState();
    const [tdata, setData] = useState(data);
    useEffect(() => {
        console.log("in useeffectttt");
        getDonations();
        console.log("Dataaa", data)
        setData(data)
    }, [status])

    const d_status = [
        { value: 0, label: 'Yet to be picked' },
        { value: 1, label: 'Picked and not delivered' }
    ]

    const statusHandler = (e) => {
        setStatus(e.value);
        console.log(status);
        getDonations();
        console.log("Dataaa", data);
        setflag(1);
    }
    // const [tdata, setData] = useState(data);

    async function getDonations() {
        var email = window.localStorage.getItem("email");
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
                        if (id == email && db_data["status"] == status) {
                            for (var item in db_data[id]) {
                                db_data[id][item]["id"] = db_data["package_id"];
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
        console.log(props.itemData);
        return (
            <div>
                <div className="p-01 box mt-3 text-center" >
                    <h2 >{props.itemData.category}</h2>
                    <p><b>Order Id</b> - {props.itemData.id}</p>
                    <p ><b>Description</b> - {props.itemData.description}</p>
                    <p ><b>Quantity</b> - {props.itemData.quantity}</p>

                </div>
            </div>
        );
    }

    return (
        <>
            <br /><br /> <br /><br />
            <Select
                style={{
                    width: '30px'
                }}
                options={d_status}
                onChange={statusHandler}
                placeholder="Select to track"
            />
            {flag == 1 ?
                <div>
                    {tdata.map((item) => {
                        return <Card itemData={item} />
                    })}
                </div> : <p></p>}
            <br />
            <br /><br />
        </>
    );
};

export default DonorTrack;