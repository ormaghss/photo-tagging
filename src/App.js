import React, { useEffect, useState } from "react"
import './App.css'
import ReactImageAnnotate from "react-image-annotate";
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import whatsApp from "./images/icons8-whatsapp-32.png";
import phone from "./images/icons8-phone-cute-outline-32.png";
import "./styles.css";
import Form from "react-jsonschema-form";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const App = () => {


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
  const [hideTaggingData, setHideTaggingData] = useState(false);
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
  const hideTagging = () => {
    setHideTaggingData(!hideTaggingData);
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

  const fetchUserData = async function () {
    setBusy(true);
    try {

      const response = await axios.get("https://photo-tagging-java.onrender.com/AllUsers");
      if (response.status === 200) {
        setUserData(response.data);
        var sortedUsers = response.data.map((item, index, arr) => {
          if (!item.tagged) {
            return item.name
          }
        });
        setUserNames(sortedUsers);
        setUserNamesLength(sortedUsers.length)
        var filteredUsers = response.data.filter(users => {
          return users.tagged === false
        })
        setTagFilteredUsers(filteredUsers)
      }
    } catch (error) {
      throw error;
    } finally {
      // setBusy(false);
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
      let url = "https://photo-tagging-java.onrender.com/addTagging";
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

      <div> Loading Tags! Please Wait...
        <div className="sweet-loading">

          <BeatLoader
            color={"green"}
            loading={true}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <ReactImageAnnotate
            labelImages
            regionClsList={userNames}
            regionTagList={["10A", "10B", "10C", "Teacher"]}

            images={[
              {
                src: "https://res.cloudinary.com/course4u/image/upload/v1685689725/ghss/photoshop-edited_7_ht0ddr.jpg",
                name: "Group Photo-SSLC- Batch-1991",
                regions: []
              }
            ]
            }           
          />
      </div>
    )
  }

  if (error) {
    return (
      <div> {errorData}</div>
    )
  }
  if (!isBusy) {


    //newTaglist[0].regions.push(tagging);
    // const data = tagging.map(el => ({id: el.id,  type:el.type, x:el.x, y:el.y, w:el.w, h:el.h, highlighted:el.highlighted, editingLabels:el.editingLabels, color:el.color, cls:el.cls, tags:el.tags}))
    //   console.log(data)
    return (

      <div>
<div>
  <br></br>
<button class="btn btn-success" onClick= { hideTagging }>Hide / Unhide Tagging</button>
  
</div>
        {validating && (

          <PropagateLoader
            color={"red"}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

        )}
        <div>
          {validating && (
            <div style={{ color: 'red', lineHeight: 1, padding: 1 }} >
              <br></br>
              <h3>  {duplicateErorr}</h3> </div>
          )}
                     {hideTaggingData && (
           
           <ReactImageAnnotate
             labelImages
             regionClsList={userNames}
             regionTagList={["10A", "10B", "10C", "Teacher"]}
 
             images={[
               {
                src: "https://res.cloudinary.com/course4u/image/upload/v1685689725/ghss/photoshop-edited_7_ht0ddr.jpg",
                name: "Group Photo-SSLC- Batch-1991",             
                 regions: []
               }
             ]
             }
             onExit={onSave}
           />
           )}
 
 {!hideTaggingData && (
 
            
 <ReactImageAnnotate
   labelImages
   regionClsList={userNames}
   regionTagList={["10A", "10B", "10C", "Teacher"]}
 
   images={[
     {
      src: "https://res.cloudinary.com/course4u/image/upload/v1685689725/ghss/photoshop-edited_7_ht0ddr.jpg",
      name: "Group Photo-SSLC- Batch-1991",                 
       regions: JSON.parse(JSON.stringify(tagging))
     }
   ]
   }
   onExit={onSave}
 />
 )}
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

                      <button class="btn btn-primary" onClick={() => { handleEditClick(val) }} > Edit</button></td>
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
   
                   <div style={{ backgroundColor: "lightcoral" }}>
                 <h4>Tag  ചെയ്യുവ്വാൻ ബാക്കിയുള്ളവർ</h4>
               </div>
               <p></p>
               <div >
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


    )

  }

}
export default App;
