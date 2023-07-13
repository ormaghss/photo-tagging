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
import { useState, useEffect, useRef } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import PropagateLoader from "react-spinners/PropagateLoader";


import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

import Form from "react-jsonschema-form";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import "../App.css";
import Select from 'react-select';

const Index = (props) => {
    const [tags, setTags] = useState([]);
    const [taggedData, setTaggedData] = useState([]);
    const [currentTag1, setCurrentTag1] = useState('');
    const [currentTag2, setCurrentTag2] = useState('');
    //   const [sampleNames1] = useState(['John', 'Jane', 'Mike', 'Sarah']); // Sample names for first dropdown list
    const [sampleNames2] = useState(["10A", "10B", "10C", "Teacher"]); // Sample names for second dropdown list
    const [zoomLevel, setZoomLevel] = useState(10);
    const [hoveredTag, setHoveredTag] = useState(null);
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
    const [searchQuery, setSearchQuery] = useState('');








    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };




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
                    .filter(item => !item.tagged);

                setUserNames(sortedUsers);
                setUserNamesLength(sortedUsers.length);
                const filteredUsers = await sortedUsers.filter(user => !user.tagged);
                setTagFilteredUsers(filteredUsers);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            // Handle the error gracefully (e.g., show an error message)
        } finally {
            // setBusy(false);
        }
        fetchData();
    };




    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const floatingControlsRef = useRef(null);

    const handleImageClick = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;

        if (currentTag1.trim() === '') {
            return;
        }

        const selectedName = currentTag1.trim();
        const user = tagFilteredUsers.find((element) => element.name === selectedName);

        const newTag = {
            x: offsetX,
            y: offsetY,
            name: selectedName,
            division: user ? user.division : '', // Include the division value
        };

        setTags([...tags, newTag]);
        setCurrentTag1('');
    };


    const handleTagClick = (tag) => {
        if (window.confirm('Are you sure you want to delete this tag?')) {
            const updatedTags = tags.filter((t) => t !== tag);
            setTags(updatedTags);
        }
    };

    const handleTagInput1 = (event) => {
        const selectedName = event.target.value;

        // Find the user with the selected name
        const user = tagFilteredUsers.find((element) => element.name === selectedName);

        // Set the currentTag1 value including the division if the user is found
        const currentTagValue = user ? `${selectedName}, ${user.division}` : selectedName;
        setCurrentTag1(currentTagValue);
    };




    //     const handleTagInput1 = (event) => {
    //         const selectedName = event.target.value;


    //         // Find the user with the selected name
    //         const user = tagFilteredUsers.find((element) => element.name === selectedName);
    //       console.log(user)
    //         // Set the division value if the user is found
    //         setCurrentTag1(selectedName, user ? user.division : '');
    //         setCurrentTag2(user ? user.division : '');

    //         const divisionValue = user ? user.division : '';

    //   // Find the tag with the selected name and update the division value
    //   const updatedTags = tags.map((tag) =>
    //     tag.name === selectedName ? { ...tag, division: divisionValue } : tag
    //   );

    //   setTags(updatedTags);
    //     };

    const getDivisions = () => {
        const user = tagFilteredUsers.find((element) => element.name === currentTag1);
        return user ? user.division : '';
    };

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => prevZoom + 0.1);
    };

    const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
    };

    const handleResetZoom = () => {
        setZoomLevel(1);
    };

    const handleTagHover = (tag) => {
        setHoveredTag(tag);
    };

    const handleTagLeave = () => {
        setHoveredTag(null);
    };

    const fetchData = async function () {
        setBusy(true);
        try {

            const response = await axios.get("https://photo-tagging-java.onrender.com/taggedPhoto");
            if (response.status === 200) {
                setTags(JSON.parse(JSON.stringify(response.data)));
                setTaggedData(JSON.parse(JSON.stringify(response.data)))
            }
        } catch (error) {
            throw error;
        } finally {
           setBusy(false);
        }
    };


    const hideTagging = () => {
        setHideTaggingData(!hideTaggingData);

    };

    const handleSaveAll = async () => {
        // Logic to save the tagging data
        console.log('Tags:', tags);
        setValidation(false)
        var valueArr = tags.map(function (item) { return item.name });
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
            data.taggedUsers = tags;
            console.log(data)
            await axios.post(url, data, headers)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                })
                .catch((err) => {
                    setError(true)
                    setErrorData(JSON.stringify(err.message))
                    console.log("AXIOS ERROR: ", err);
                })
            // fetchData();
            fetchUserData();
            // setBusy(false);
        }
        
    };

    // Handle the search input change
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter the users based on the search query
    const filteredUsers = searchQuery
        ? tagFilteredUsers.filter((element, index) =>
            element.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : tagFilteredUsers;

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            width: 300, // Set the desired width here
        }),
    };

    const handleWheel = (event) => {
        event.preventDefault();
        if (event.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };




    useEffect(() => {
        const container = containerRef.current;
        const floatingControls = floatingControlsRef.current;
        fetchUserData();
        if (!container) {
            // Handle the case when the container element is not available
            return;
        }
        container.addEventListener('wheel', handleWheel, { passive: false });
        // Add the following code for search functionality      

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);




    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
            {validating && (
                    <div style={{ color: 'red', lineHeight: 1, padding: 1 }} >
                        <br></br>
                        <h4>  {duplicateErorr}</h4> </div>
                )}          
                {!isBusy && (
                    <button class="btn btn-success" onClick={hideTagging}>Hide / Unhide Tagging</button>
                )}
                {hideTaggingData && !isBusy && (<button class="btn btn-warning">Tags are Hidden!</button>)}
                <Row>
                    <div>
                        {validating && (
                            <PropagateLoader
                                color={"red"}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        )}
                    </div>
                    <div>
                        {validating && (
                            <div style={{ color: 'red', lineHeight: 1, padding: 1 }} >
                                <br></br>
                                <h3>  {duplicateErorr}</h3> </div>
                        )}
                    </div>                   
                    <Col className="mb-12 mb-xl-0" xl="12">
                    {isBusy && (
                    <div>
                         <h3> Please wait for a few minutes for the loading of names before tagging!</h3>
                        <BeatLoader
                            color={"green"}
                            loading={true}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>)}
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            Group Photo - SSLC(Batch -1991)
                                        </h6>

                                    </div>
                                    {!hideTaggingData && (
                                        <div className="app-container">
                                            <div className="frame">

                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <button type="button" onClick={handleZoomIn}>
                                                                Zoom In
                                                            </button>
                                                            <button type="button" onClick={handleZoomOut}>
                                                                Zoom Out
                                                            </button>
                                                            <button type="button" onClick={handleResetZoom}>
                                                                Reset Zoom
                                                            </button>
                                                        </div>
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <div className="select-container">
                                                                <div className="select-wrapper">
                                                                    <Select
                                                                        value={currentTag1}
                                                                        onChange={(selectedOption) => setCurrentTag1(selectedOption?.value || '')}
                                                                        options={tagFilteredUsers.map((element, index) => ({ value: element.name, label: element.name }))}
                                                                        placeholder="Type here to select a name..."
                                                                        styles={selectStyles} // Apply the custom styles
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div style={{ display: 'flex', alignItems: 'left', marginBottom: '20px' }}>
                                                                <select value={currentTag1} onChange={handleTagInput1} style={{ backgroundColor: '#1E385C', color: 'white', opacity: '1' }} disabled>
                                                                    <option value=""></option>
                                                                    {filteredUsers.length === 0 ? (
                                                                        <option disabled>No matching names found</option>
                                                                    ) : (
                                                                        filteredUsers.map((element, index) => (
                                                                            <option key={index} value={element.name}>
                                                                                {element.name}
                                                                            </option>
                                                                        ))
                                                                    )}
                                                                </select>

                                                                <select value={getDivisions()} onChange={(event) => setCurrentTag2(event.target.value)} style={{ backgroundColor: '#1E385C', color: 'white', opacity: '1' }} disabled>
                                                                    <option value=""  >Division / Teacher</option>
                                                                    {tagFilteredUsers.map((element, index) => (
                                                                        <option key={index} value={element.division} >
                                                                            {element.division}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button class="btn btn-warning" type="button" onClick={handleSaveAll}>
                                                                Save All
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <div
                                                            className="frame"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: 'calc(100vh - 300px)',
                                                                transform: `scale(${zoomLevel})`,
                                                                transformOrigin: 'top left',
                                                            }}
                                                            ref={containerRef}
                                                        >
                                                            <div
                                                                style={{
                                                                    position: 'relative',
                                                                    width: 'fit-content',
                                                                    height: 'fit-content',
                                                                    margin: '0 auto',
                                                                }}
                                                            >

                                                                <img
                                                                    ref={imageRef}
                                                                    src="https://res.cloudinary.com/course4u/image/upload/v1686154431/ghss/photoshop-edited_8_tbhtsv.jpg" class="responsive"
                                                                    alt=""
                                                                    style={{
                                                                        display: 'block',
                                                                        maxWidth: '100%',
                                                                        maxHeight: '100%',
                                                                    }}
                                                                    onClick={handleImageClick}
                                                                />
                                                                {tags.map((tag, index) => {
                                                                    const { x, y, name, division } = tag; // Destructure the division property
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            style={{
                                                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                                                padding: '5px',
                                                                                borderRadius: '4px',
                                                                                color: 'white',
                                                                                cursor: 'pointer',
                                                                                position: 'absolute',
                                                                                left: `${x}px`,
                                                                                top: `${y}px`,
                                                                                transform: `scale(${1 / zoomLevel})`,
                                                                                transformOrigin: 'top left',
                                                                                opacity: hoveredTag === tag ? 1 : 0.5,
                                                                            }}
                                                                            onClick={() => handleTagClick(tag)}
                                                                            onMouseEnter={() => handleTagHover(tag)}
                                                                            onMouseLeave={handleTagLeave}
                                                                            onTouchStart={() => handleTagHover(tag)}
                                                                            onTouchEnd={handleTagLeave}
                                                                        >
                                                                            {`${name}, ${division}`} {/* Display the name and division */}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {hideTaggingData && (

                                        <div className="app-container">
                                            <div className="frame">

                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <button type="button" onClick={handleZoomIn}>
                                                                Zoom In
                                                            </button>
                                                            <button type="button" onClick={handleZoomOut}>
                                                                Zoom Out
                                                            </button>
                                                            <button type="button" onClick={handleResetZoom}>
                                                                Reset Zoom
                                                            </button>
                                                        </div>

                                                    </div>

                                                    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <div
                                                            className="frame"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: 'calc(100vh - 300px)',
                                                                transform: `scale(${zoomLevel})`,
                                                                transformOrigin: 'top left',
                                                            }}
                                                            ref={containerRef}
                                                        >
                                                            <div
                                                                style={{
                                                                    position: 'relative',
                                                                    width: 'fit-content',
                                                                    height: 'fit-content',
                                                                    margin: '0 auto',
                                                                }}
                                                            >

                                                                <img
                                                                    ref={imageRef}
                                                                    src="https://res.cloudinary.com/course4u/image/upload/v1686154431/ghss/photoshop-edited_8_tbhtsv.jpg" class="responsive"
                                                                    alt=""
                                                                    style={{
                                                                        display: 'block',
                                                                        maxWidth: '100%',
                                                                        maxHeight: '100%',
                                                                    }}
                                                                    onClick={handleImageClick}
                                                                />

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>

                </Row>

            </Container>
        </>
    );
};

export default Index;
