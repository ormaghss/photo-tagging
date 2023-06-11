/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright Orma group (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Orma group

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from "react"
//import '../App.css'
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import whatsApp from '../../assets/img/whatsapp.png';
import phone from "../../assets/img/phone.png";
//import "./styles.css";
import Form from "react-jsonschema-form";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
const UserData = () => {



  const [tagging, setTagging] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState();
  const [userData, setUserData] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [validating, setValidation] = useState(false);
  const [duplicateErorr, setDuplicateErorr] = useState("");
  const [isShowNewForm, setIsShowNewForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [userNamesLength, setUserNamesLength] = useState(0)
  const [tagFilteredUsers, setTagFilteredUsers] = useState([]);


  const [open, setOpen] = React.useState(false);

  const handleToClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };



  const handleSubmit = (formData) => {
    setOpen(false);
    console.log(formData.formData)
    putUserData(formData.formData);
  }

  const handleNewFormSubmit = (formData) => {
    console.log(formData.formData)
    postUserData(formData.formData);
  }

  const schema = {
    type: 'object',
    required: ['name', 'division'],
    properties: {
      userId: { type: 'string', default: userNamesLength + 1 },
      name: { type: 'string', title: 'Name (Make it a unique name by adding initials or nickname)' },
      familyName: { type: 'string', title: 'Family Name', default: "" },
      division: { type: 'string', title: 'Class & division(For teachers choose "Teacher")', enum: ["10-A", "10-B", "10-C", "Teacher"] },
      birthday: { type: 'string', title: 'Birthday (--month--date - eg. --12--25 (for Dec. 25)', default: "" },
      whatsappNumber: { type: 'string', title: 'Whatsapp Number', default: "" },
      phoneNumber: { type: 'string', title: 'Phone Number', default: "" },
      tagged: { type: 'string', title: 'Tagged', default: false },

    }
  }
  const uiSchema = {
    classNames: "col-md-12",

    "ui:order": [
      'userId', 'name', 'familyName', 'division', 'birthday', 'tagged', 'whatsappNumber', 'phoneNumber'
    ],
    userId: { classNames: "col-md-12", "ui:widget": "hidden" },
    name: { classNames: "col-md-12" },
    familyName: { classNames: "col-md-12" },
    division: { classNames: "col-md-12" },
    birthday: { classNames: "col-md-12" },
    whatsappNumber: { classNames: "col-md-12" },
    phoneNumber: { classNames: "col-md-12" },
    tagged: { classNames: "col-md-1", "ui:widget": "hidden" },
  }


  const EditForm = () => {
    return (
      <div style={{ backgroundColor: "skyblue" }} className="App">
        <React.Fragment>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={editData}
            onSubmit={handleSubmit}
            noValidate={true}
          />
        </React.Fragment>
      </div>
    );
  };

  const NewAddForm = () => {
    return (
      <div style={{ backgroundColor: "lightgreen" }} className="App">

        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleNewFormSubmit}
          noValidate={true}
        />

      </div>
    );
  };

  const handleEditClick = (value) => {
    setOpen(true);
    setEditData(value);
    console.log(value)
  };
  const handleNewClick = () => {
    setIsShowNewForm((isShowNewForm) => !isShowNewForm);

  };

  const handleDeleteClick = (value) => {
    deleteData(value);
    console.log(value)

  };
  const deleteData = async function (value) {
    setBusy(true);
    try {

      await axios.delete("https://photo-tagging-java.onrender.com/deletUsers/" + value.userId);
    } catch (error) {
      throw error;
    } finally {
      // setBusy(false);
    }
    fetchData();
    fetchUserData();
  };
  const fetchData = async function () {
    setBusy(true);
    try {

      const response = await axios.get("https://photo-tagging-java.onrender.com/taggedPhoto");
      if (response.status === 200) {
        setTagging(response.data);

      }
    } catch (error) {
      throw error;
    } finally {
      setBusy(false);
    }
  };
// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your base URL
});

const fetchUserData = async () => {
  setBusy(true);
  try {
    const response = await api.get('https://photo-tagging-java.onrender.com/AllUsers'); // Use the Axios instance instead of axios directly
    if (response.status === 200) {
      setUserData(response.data);
      const sortedUsers = response.data
        .filter(item => !item.tagged)
        .map(item => item.name);
      setUserNames(sortedUsers);
      setUserNamesLength(sortedUsers.length);
      const filteredUsers = response.data.filter(user => !user.tagged);
      setTagFilteredUsers(filteredUsers);
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    // Handle the error gracefully (e.g., show an error message)
  } finally {
    setBusy(false);
  }

    fetchData();
  };

  const putUserData = async function (editData) {
    setBusy(true);
    setIsShowNewForm(false)
    try {
      await axios.put("https://photo-tagging-java.onrender.com/users/" + editData.userId, editData);
    } catch (error) {
      throw error;
    } finally {
      // setBusy(false);
    }
    fetchData();
    fetchUserData();
  };

  const postUserData = async function (newData) {
    setBusy(true);
    setIsShowNewForm(false)
    try {
      await axios.post("https://photo-tagging-java.onrender.com/addSingleUser", newData);
    } catch (error) {
      throw error;
    } finally {
      // setBusy(false);
    }
    fetchData();
    fetchUserData();
  };

  const onSave = async (MainLayoutState) => {
    setValidation(false)
    var valueArr = MainLayoutState.images[0].regions.map(function (item) { return item.cls });
    console.log(valueArr)
    var hasDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) !== idx
    });
    console.log("hasDuplicate", hasDuplicate)
    if (hasDuplicate) {
      setValidation(true)
      setDuplicateErorr("Please remove the duplicate tagging! Same name is used for multiple tagging!")
    }

    if (!hasDuplicate) {
      setBusy(true);
      const headers = {
        'Content-Type': 'application/json'
      }
      let url = "/addTagging";
      let data = {
        "taggedUsers": {}
      }
      data.taggedUsers = MainLayoutState.images[0].regions;
      await axios.post(url, data, headers)
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
          setError(true)
          setErrorData(JSON.stringify(err.message))
          console.log("AXIOS ERROR: ", err);
        })
      fetchData();
      fetchUserData();
      // setBusy(false);
    }
  }


  useEffect(() => {
    fetchUserData();
  }, []);

  if (isBusy) {
    return (


      <div> 
        <div className="sweet-loading">
          <Header           
          />
         Loading Data! Please Wait... 
          <BeatLoader
            color={"green"}
            loading={true}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>

    )
  }

  if (error) {
    return (
      <div> <Header />
        {errorData}</div>

    )
  }
  if (!isBusy) {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--8" fluid>
          {/* Table */}
          <Row>
          <div className="col">
          <div>
        <br></br>

        <div>  

          <div style={{ backgroundColor: "lightblue" }} className="App">
            <h4>All Students and Teachers</h4>
          </div>
          <p></p>
          <div style={{ backgroundColor: "lightyellow", padding: 2 }} className="App">
            <table>

              <tr>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>Sr. No.</th>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>Name</th>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>House Name</th>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>Division</th>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}> Tagged</th>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>  <img src={whatsApp} alt={"Whatsapp"} />Whatsapp </th>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}> <img src={phone} alt={"Phone"} /> phone </th>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>{" "}</th>
                <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>{" "} </th>
              </tr>
              {userData.sort(function (a, b) { return a.userId - b.userId }).map((val, key) => {
                return (
                  <tr key={key} style={{ backgroundColor: "lightyellow" }}>

                    <td style={{ border: "2px solid black" }}>{key + 1}</td>
                    <td style={{ border: "2px solid black" }}>{val.name}</td>
                    <td style={{ border: "2px solid black" }}>{val.familyName}</td>
                    <td style={{ border: "2px solid black" }}>{val.division}</td>
                    <td style={{ border: "2px solid black" }}><input
                      type="checkbox"
                      checked={val.tagged}
                    /></td>
                    <td style={{ border: "2px solid black" }}>

                      {val.whatsappNumber}
                    </td>
                    <td style={{ border: "2px solid black" }}>

                      {val.phoneNumber}
                    </td>
                    <td style={{ border: "2px solid black" }} s>

                      <button class="btn btn-primary" onClick={() => { handleEditClick(val) }} > Edit</button>
                     
                      </td>
                    <br>
                    </br>
                    <td style={{ border: "2px solid black" }}>
                      <button class="btn btn-danger" onClick={(e) => {
                        e.preventDefault();
                        if (
                          window.confirm(" ഈ റെക്കോർഡ് പൂര്ണമായിട്ടും ഡിലീറ്റ് ചെയ്യണോ?")
                        ) {
                          handleDeleteClick(val)
                        }
                      }}  > delete</button></td>
           
                  </tr>

                )
              })}
            </table>
          
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{" Please fill at least a name and the division!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       
                    </DialogContentText>
                    <EditForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToClose}
                        color="primary" autoFocus>
                        Cancel Editing
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <div>
              {isShowEditForm && (
                <EditForm

                />
              )}
            </div> */}
          </div>
          <div>
            <button class="btn btn-success" onClick={() => { handleNewClick() }} > Add New Record</button>
          </div>
          <br></br>
          <div>
            {isShowNewForm && (
              <NewAddForm

              />
            )}
          </div>
        </div>
        <br></br>
        <div>
                
                <br></br>
   
                   <div style={{ backgroundColor: "lightcoral" }} className="App">
                 <h4>Tag  ചെയ്യുവ്വാൻ ബാക്കിയുള്ളവർ</h4>
               </div>
               <p></p>
               <div style={{ backgroundColor: "lightcoral" }} className="App">
                 <table>
     
                   <tr>
                     <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>Sr. No.</th>
                     <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>Name</th>
                     <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>House Name</th>
                     <th style={{ border: "2px solid black", backgroundColor: "yellow" }}>Division</th>
                     <th style={{ border: "2px solid black", backgroundColor: "yellow" }}> Tagged</th>
     
                   </tr>
                   {tagFilteredUsers.sort(function (a, b) { return a.userId - b.userId }).map((val, key) => {
                     return (
                       <tr key={key} style={{ backgroundColor: "lightyellow" }}>
     
                         <td style={{ border: "2px solid black" }}>{key + 1}</td>
                         <td style={{ border: "2px solid black" }}>{val.name}</td>
                         <td style={{ border: "2px solid black" }}>{val.familyName}</td>
                         <td style={{ border: "2px solid black" }}>{val.division}</td>
                         <td style={{ border: "2px solid black" }}><input
                           type="checkbox"
                           checked={val.tagged}
                         /></td>
                         <td style={{ border: "2px solid black" }}>
     
                           {val.whatsappNumber}
                         </td>
                         <td style={{ border: "2px solid black" }}>
     
                           {val.phoneNumber}
                         </td>
                       
                       </tr>
     
                     )
                   })}
                 </table>
     
     </div>
     </div>
     <br></br>
      </div>

</div>






       
         
          </Row>
          {/* Dark table */}
       
        </Container>
      </>
    );
  }
};

export default UserData;
