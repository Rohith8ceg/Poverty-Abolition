import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

const NGOPost = () => {
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
       <h2>Select Category</h2>
      <Multiselect
        options={donation_category}
        displayValue="key"
        groupBy="category"
        showCheckbox={true}
      /> 
        <div>This is the post page</div>
    </>
  )
};

export default NGOPost;
