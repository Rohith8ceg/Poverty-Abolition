import { useState} from "react";
import { Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router";
import { useUserAuth } from "./context/UserAuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PhoneSignUp from "./components/PhoneSignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import NGOHome from "./components/NGOHome";
import DonorHome from "./components/DonorHome";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import { makeStyles } from "@material-ui/core/styles"
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import QueueIcon from '@material-ui/icons/Queue';
import HistoryIcon from '@material-ui/icons/History';
import DraftsIcon from '@material-ui/icons/Drafts';
import LogoutIcon from '@material-ui/icons/Input';
import DonorPost from "./components/DonorPost";
import NGOPost from "./components/NGOPost";
import { db } from "./firebaseConfig";


const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 'inherit', backgroundColor: '#BEBEBECC'},
  link: {
    textDecoration: 'none',
    color: 'black',
  }
}))

const App = () => {
  const { logOut, user } = useUserAuth();
  // const email = user.email;
  const navigate = useNavigate();
  const [usertype,setUsertype] = useState("");
  // console.log("-----",user.uid)
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
 
  const generate_user_type = async () => {
    console.log("called here");
    var data = {};
    const snapshot_ngo =  await db.collection('NGO').get();
    const snapshot_donor =  await db.collection('Donor').get();
    data["NGO"] = snapshot_ngo.docs.map(doc => doc.data());
    data["Donor"] = snapshot_donor.docs.map(doc => doc.data());
    console.log("dataa in App.js",data)
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var new_data = data[key];
        for(var new_var in new_data){
          if(new_data.hasOwnProperty(new_var)){
            if(new_data[new_var]["email"] === user.email){
              console.log(new_data[new_var]["type"]);
              // type = new_data[new_var]["type"];
              //setType(type);
              setUsertype(new_data[new_var]["type"]);
              console.log('--here1',usertype);
              }
          }
        }
      }
    }
  }
  const classes = useStyles();
  if(user){
    generate_user_type();
    console.log('--here2',usertype);
  }
    
  return (
    <>
    {user && 
    <Drawer
        style={{ width: '220px' }}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          {/*try to get the ngo user type and conditional rendering if possible*/}
          
         
          {usertype == "Donor" && <><Link to="/donorhome" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link to={{pathname: "/donorpost", state: { email: user.email} }} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <QueueIcon />
              </ListItemIcon>
              <ListItemText primary={"Post"} />
            </ListItem>
          </Link>
          <Link to="#" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"History"} />
            </ListItem>
          </Link></>}
          
          {usertype == "NGO" && <><Link to="/ngohome" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
         <Link to="#" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"History"} />
            </ListItem>
          </Link></>}
          {/* <Link to="/track" className={classes.link}>
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
          </Link>    */}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
          
        </List>
      </Drawer>
}

    <Container style={{ width: "400px",  }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              {/* <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Login />
                  </ProtectedRoute>
                }
              /> */}
              <Route exact path="/" element={<Login />} /> 
              <Route path="/ngohome" element={<ProtectedRoute><NGOHome /></ProtectedRoute>} />
              <Route path="/donorhome" element={<ProtectedRoute><DonorHome /></ProtectedRoute>} />
              <Route path="/donorpost" element={<ProtectedRoute><DonorPost /></ProtectedRoute>} />
              <Route path="/ngopost" element={<ProtectedRoute><NGOPost /></ProtectedRoute>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/phonesignup" element={<PhoneSignUp />} />
                           
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
    </>
  );
}


export default App;