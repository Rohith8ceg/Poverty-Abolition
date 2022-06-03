import React from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

import { makeStyles } from "@material-ui/core/styles"

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

  // const user_type = [
  //   {key: "Donor"},
  //   {key: "NGO"}
  // ]
  console.log(route);
  console.log(user.email);
  window.localStorage.setItem("email",user.email);
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
