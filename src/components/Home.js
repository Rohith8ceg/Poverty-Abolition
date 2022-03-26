import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";

const Home = () => {
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

  const user_type = [
    {key: "Donor"},
    {key: "NGO"}
  ]

  const donation_category = [
    { key: "Cooked", category: "Food" },
    { key: "Raw materials", category: "Food" },
    { key: "Spices", category: "Food" },
    { key: "New", category: "Clothes" },
    { key: "Old", category: "Clothes" },
    { key: "Electronics", category: "Others" },
    { key: "Other not in list", category: "Others" }
  ]
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <br/><br/>
      <h2>Select Type of User</h2>
      <Multiselect
        options={user_type}
        singleSelect
        displayValue="key"
      />
      <h2>Select Category</h2>
      <Multiselect
        options={donation_category}
        displayValue="key"
        groupBy="category"
        showCheckbox={true}
      />
    </>
  );
};

export default Home;
