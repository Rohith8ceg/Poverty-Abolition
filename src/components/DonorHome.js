import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
import { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles"
import {
  BrowserRouter as Router,
  Link, Routes, Route
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
// import InfoIcon from '@material-ui/icons/Info';
// import MailIcon from '@material-ui/icons/Mail';
import QueueIcon from '@material-ui/icons/Queue';
import MapIcon from '@material-ui/icons/Map';
import DraftsIcon from '@material-ui/icons/Drafts';
import LogoutIcon from '@material-ui/icons/Input';
import DonorPost from "./DonorPost";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 'inherit', backgroundColor: '#BEBEBECC'},
  link: {
    textDecoration: 'none',
    color: 'black',
  }
}))

const DonorHome = ({ route }) => {
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
  console.log(route);

  const donation_category = [
    { key: "Cooked", category: "Food" },
    { key: "Raw materials", category: "Food" },
    { key: "Spices", category: "Food" },
    { key: "New", category: "Clothes" },
    { key: "Old", category: "Clothes" },
    { key: "Electronics", category: "Others" },
    { key: "Other not in list", category: "Others" }
  ]
  //   const [userType, setuserType] = useState("Donor");
  //   const onSelect = (selectedList, selectedItem) => {
  //         setuserType(selectedItem.key);
  //         console.log(selectedItem);
  // }
  const classes = useStyles();
  return (
    <>
      <Drawer
        style={{ width: '220px' }}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <Link to="/donorhome" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link to="/donorpost" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <QueueIcon />
              </ListItemIcon>
              <ListItemText primary={"Post"} />
            </ListItem>
          </Link>
          <Link to="/track" className={classes.link}>
            <ListItem button>
              <ListItemIcon >
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary={"Tracking"} />
            </ListItem>
          </Link>
          <Link to="/donations" className={classes.link}>
            <ListItem button>
              <ListItemIcon >
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={"All Donations"} />
            </ListItem>
          </Link>   
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
          
        </List>
      </Drawer>

      <Routes>
          <Route exact path="/donorpost" element={DonorPost}>
          </Route>
      </Routes>

      {/* <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div> */}
      <div className="p-4 box mt-3 text-center">
        <b>Welcome Donor<br />
          {user && user.email}</b>
      </div>

      {/* <h2>Select Category</h2>
      <Multiselect
        options={donation_category}
        displayValue="key"
        groupBy="category"
        showCheckbox={true}
      /> */}
      <br /><br />
    </>
  );
};

export default DonorHome;
