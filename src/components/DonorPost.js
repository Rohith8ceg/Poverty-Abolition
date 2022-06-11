import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { useUserAuth } from "../context/UserAuthContext";
import { Multiselect } from "multiselect-react-dropdown";
import {useLocation} from "react-router-dom";


class DonorPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: "",
      formValues: [{ category: "", description: "", quantity: "" }],
    };
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeLocation(event) {
    console.log(event.target.value);
    this.setState({location: event.target.value});
  }

  handleChange(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues });
  }

  addFormFields() {
    this.setState(({
      formValues: [...this.state.formValues, { category: "", description: "", quantity: "" }]
    }))
  }

  removeFormFields(i) {
    let formValues = this.state.formValues;
    formValues.splice(i, 1);
    this.setState({ formValues });
  }
  // async pushData() {
  //   await db.collection("Donations")
  //     .add({
  //       category: this.state.formValues.category,
  //       description: this.state.formValues.description,
  //       quantity: this.state.formValues.quantity,
  //     })
  //     .then((res) => {
  //       console.log("posted");
  //     });
  // }


  handleSubmit(event) {
    var post = [];
    event.preventDefault();
    console.log(this.state.formValues.length);
    const hex = '0123456789ABCDEF';
    let output = '';
    for (let i = 0; i < 10; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    var test_json = {};
    var email = window.localStorage.getItem("email");
    console.log(this.state.packageId);
    test_json[email] = this.state.formValues;
    test_json["status"] = 0;
    test_json["location"] = this.state.location;
    test_json["package_id"] = output;
    db.collection("Donations")
      .add(test_json)
      .then((res) => {
        console.log("posted");
      });
    alert(JSON.stringify(this.state.formValues));
    console.log(this.state.formValues);
    //window.location.reload();
  }

  render() {
    return (
      <>
      <label>Your Location: &nbsp; &nbsp; &nbsp; &nbsp;</label>
      <input type="text" value={this.state.location} onChange={this.handleChangeLocation} />
      <form onSubmit={this.handleSubmit}>
        {this.state.formValues.map((element, index) => (
          <div className="form-inline" key={index}><br/>
            <label>Category: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
            <input type="text" name="category" value={element.category || ""} onChange={e => this.handleChange(index, e)} /><br/><br/>
            <label>Description:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </label>
            <input type="text" name="description" value={element.description || ""} onChange={e => this.handleChange(index, e)} /><br/><br/>
            <label>Quantity:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; </label>
            <input type="text" name="quantity" value={element.quantity || ""} onChange={e => this.handleChange(index, e)} /><br/><br/>
            {
              index ?
                <button type="button" className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button>
                : null
            }
          </div>
        ))}
        <div className="button-section">
          <br/>
          <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>{" "}
          <button className="button submit" type="submit">Submit</button>
        </div>
      </form>
      </>
    );
  }
}

// const DonorPost = () => {
//   const donation_category = [
//     { key: "Cooked", category: "Food" },
//     { key: "Raw materials", category: "Food" },
//     { key: "Spices", category: "Food" },
//     { key: "New clothes", category: "Clothes" },
//     { key: "Old clothes", category: "Clothes" },
//     { key: "Electronics", category: "Others" },
//     { key: "Other not in list", category: "Others" }
//   ]

//   const [donatingItem, setdonatingItem] = useState("")

//   const onSelect = (selectedList, selectedItem) => {
//     setdonatingItem(selectedList);
//     console.log(selectedList);
//   }

//   const [itemList, setitemList] = useState([{ item: "" }]);

//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [description, setDescription] = useState("");
//   const [final, setFinal] = useState("");

//   // const handleitemChange = (e, index) => {
//   //   const { name, value } = e.target;
//   //   const list = [...itemList];
//   //   var item_desc={"category": category, "quantity":quantity, "description":value };
//   //   console.log(item_desc);
//   //   list[index][name] = item_desc;
//   //   // setitemList(list);
//   //   console.log(name, value);
//   // };

//   const handleitemRemove = (index) => {
//     const list = [...itemList];
//     list.splice(index, 1);
//     setitemList(list);
//     setFinal(list);
//     console.log(list);
//   };

//   const handleitemAdd = () => {
//     var item_desc={"category": category, "quantity":quantity, "description":description };
//     setFinal([...final, item_desc]);
//     setitemList([...itemList, { item: "" }]);
//     console.log(final)
//   };

//   const complete = () => {

//   }

//   return (
//     <div style={{backgroundColor: "white"}}>
//        < h2  > Select Category</h2 >
//       <Multiselect
//         options={donation_category}
//         displayValue="key"
//         groupBy="category"
//         showCheckbox={true}
//         onSelect={onSelect}
//       /> 
//       {/* <p>{donatingItem}</p> */}

//       <form className="App" autoComplete="off">
//       <div className="form-field">
//         <label htmlFor="item">item(s)</label>

//         {itemList.map((singleitem, index) => (
//           <div key={index} className="items">
//             <br/>
//             <div className="first-division">
//               <input
//                 name="item"
//                 type="text"
//                 id="item"
//                 // value={singleitem.item}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//                 placeholder="Category type"
//               />
//               <br/>
//               <input
//                 type="text"
//                 maxLength={10}
//                 placeholder="Quantity"
//                 onChange={(e) => setQuantity(e.target.value)}
//               />
//               <br/>
//               <input
//                 type="text"
//                 maxLength={100}
//                 placeholder="Description"
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//               <br/>

//             </div>

//             <div className="second-division">
//               {itemList.length !== 1 && (
//                 <button
//                   type="button"
//                   onClick={() => handleitemRemove(index)}
//                   className="remove-btn"
//                 >
//                   <span>Remove</span>
//                 </button>
//               )}
//               <br/>
//             </div>
//             {itemList.length - 1 === index && (
//                 <button
//                   type="button"
//                   onClick={handleitemAdd}
//                   className="add-btn"
//                 >
//                   <span>Add a item</span>
//                 </button>
//               )}

//           </div>
//         ))}
//         <button type="button" onClick={complete}>Complete</button>
//       </div>
//       {/* <div className="output">
//         <h2>Output</h2>
//         {itemList &&
//           itemList.map((singleitem, index) => (
//             <ul key={index}>
//               {singleitem.item && <li>{singleitem.item}</li>}
//             </ul>
//           ))}
//       </div> */}
//     </form>
//     </div>
//   )
// };

export default DonorPost;