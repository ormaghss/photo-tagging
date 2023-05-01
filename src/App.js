import React from "react";
import ReactImageAnnotate from "react-image-annotate";
import Grid from "@material-ui/core/Grid";
import { ImageMapper, Annotation } from "react-image-mapper";
import { Col, Row } from "reactstrap";

function App(props) {

  const [newMap, setMap] = React.useState({
    name: "my-map",
    areas: [
      {
        name: "7",
        shape: "circle",
        coords: [628, 37, 10],
        preFillColor: 'rgba(52, 52, 52, 0.18)'
      }]
  });
  const [showtag, setShowtag]= React.useState(false);
  const [studentId, setStudentId] = React.useState(7);
  const [studentDivision, setStudentDivision] = React.useState(7);
  const [studentName, setStudentName] = React.useState("");
  const [top, setTop] = React.useState(0);
  const [left, setLeft] = React.useState(0);
  const [currentScene, setCurrentScene] = React.useState(0);
  const [imgCoords, setImgCoords] = React.useState(0);
  const [yaw, setYaw] = React.useState(0);
  const [pitch, setPitch] = React.useState(0);

  const panImage = React.useRef(null);
  const hotspotIcon = (hotSpotDiv) => {
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("width", "30");
    image.setAttribute("height", "30");
    image.setAttribute(
      "src",
      "https://img.icons8.com/material/4ac144/256/camera.png"
    );
    hotSpotDiv.appendChild(image);
  };


  const map = {
    name: "my-map",
    areas: [
      {
        name: "7",
        shape: "circle",
        coords: [628, 37, 10],
        preFillColor: 'rgba(52, 52, 52, 0.18)'
      },
      {
        name: "7",
        shape: "circle",
        coords: [588, 38, 10],
        preFillColor: 'rgba(52, 52, 52, 0.18)'
      },
      {
        name: "7",
        shape: "circle",
        coords: [530, 37, 20],
        preFillColor: 'rgba(52, 52, 52, 0.18)'
      },
      {
        name: "8",
        shape: "circle",
        coords: [607, 38, 10],
        preFillColor: 'rgba(52, 52, 52, 0.18)'
      },
      {
        name: "9",
        shape: "circle",
        coords: [342, 36, 10],
        preFillColor: 'rgba(52, 52, 52, 0.18)'
      },
      {
        name: "10",
        shape: "circle",
        coords: [148, 196, 5],
        preFillColor: "red"
      },
      {
        name: "5",
        shape: "circle",
        coords: [163, 145, 5],
        preFillColor: "red"
      },
      {
        name: "6",
        shape: "circle",
        coords: [188, 103, 5],
        preFillColor: "red"
      },
      {
        name: "12",
        shape: "circle",
        coords: [185, 184, 5],
        preFillColor: "red"
      },
      {
        name: "13",
        shape: "circle",
        coords: [189, 223, 5],
        preFillColor: "red"
      },
      {
        name: "0",
        shape: "circle",
        coords: [221, 66, 5],
        preFillColor: "red"
      },
      {
        name: "1",
        shape: "circle",
        coords: [214, 91, 5],
        preFillColor: "red"
      },
      {
        name: "2",
        shape: "circle",
        coords: [222, 114, 5],
        preFillColor: "red"
      },
      {
        name: "3",
        shape: "circle",
        coords: [215, 129, 5],
        preFillColor: "red"
      },
      {
        name: "4",
        shape: "circle",
        coords: [212, 146, 5],
        preFillColor: "red"
      },
      {
        name: "11",
        shape: "circle",
        coords: [212, 171, 5],
        preFillColor: "red"
      },
      {
        name: "15",
        shape: "circle",
        coords: [231, 172, 5],
        preFillColor: "red"
      },
      {
        name: "14",
        shape: "circle",
        coords: [222, 208, 5],
        preFillColor: "red"
      },
      {
        name: "31",
        shape: "circle",
        coords: [270, 80, 5],
        preFillColor: "red"
      },
      {
        name: "30",
        shape: "circle",
        coords: [270, 118, 5],
        preFillColor: "red"
      },
      {
        name: "16",
        shape: "circle",
        coords: [269, 146, 5],
        preFillColor: "red"
      },
      {
        name: "18",
        shape: "circle",
        coords: [257, 172, 5],
        preFillColor: "red"
      },
      {
        name: "17",
        shape: "circle",
        coords: [274, 170, 5],
        preFillColor: "red"
      },
      {
        name: "19",
        shape: "circle",
        coords: [261, 205, 5],
        preFillColor: "red"
      },
      {
        name: "20",
        shape: "circle",
        coords: [304, 189, 5],
        preFillColor: "red"
      },
      {
        name: "21",
        shape: "circle",
        coords: [297, 224, 5],
        preFillColor: "red"
      },
      {
        name: "29",
        shape: "circle",
        coords: [300, 104, 5],
        preFillColor: "red"
      },
      {
        name: "22",
        shape: "circle",
        coords: [305, 147, 5],
        preFillColor: "red"
      },
      {
        name: "28",
        shape: "circle",
        coords: [340, 77, 5],
        preFillColor: "red"
      },
      {
        name: "27",
        shape: "circle",
        coords: [335, 112, 5],
        preFillColor: "red"
      },
      {
        name: "26",
        shape: "circle",
        coords: [340, 151, 5],
        preFillColor: "red"
      },
      {
        name: "23",
        shape: "circle",
        coords: [325, 161, 5],
        preFillColor: "red"
      },
      {
        name: "25",
        shape: "circle",
        coords: [340, 165, 5],
        preFillColor: "red"
      },
      {
        name: "24",
        shape: "circle",
        coords: [335, 201, 5],
        preFillColor: "red"
      }
    ]
  }

  const onSave = MainLayoutState => {

    console.log(JSON.stringify(MainLayoutState));
  };
const  handleBoxToggle = () => setShowtag(true);
  return (
    <>
      <div>
        <div>






          < ReactImageAnnotate
            labelImages
            regionClsList={["Benedict", "Anish", "Mathew", "Santhosh"]}
            regionTagList={["10C", "10B", "10A"]}
            enabledTools={["select",  "create-box"]}
            hideSettings={true}
            hideNext={true}
            hidePrev={true}
            showTags={true}
            images={[
              {
                src: "https://res.cloudinary.com/course4u/image/upload/v1680404739/ghss/group-photo_m6pntk.jpg",
                name: "Group Photo",
                regions: [
                  {
                    "type": "box",
                    "x": 0.20833332722003645,
                    "y": 0.20262018751398636,
                    "w": 0.030448717948717924,
                    "h": 0.12738013493323552,
                    "highlighted": false,
                    "editingLabels": false,
                    "color": "#f44336",
                    "cls": "Benedict",
                    "id": "009000480300168645",
                    "tags": [
                      "10C"
                    ]
                  },
                  {
                    "type": "box",
                    "x": 0.2580128143995236,
                    "y": 0.23298022542712485,
                    "w": 0.027243589743589758,
                    "h": 0.07854007854007852,
                    "highlighted": false,
                    "editingLabels": false,
                    "color": "#2196f3",
                    "cls": "Anish",
                    "id": "6686307799047855",
                    "tags": [
                      "10B"
                    ]
                  },
                  {
                    "type": "box",
                    "x": 0.46474358363029283,
                    "y": 0.1082401006870001,
                    "w": 0.03846153846153849,
                    "h": 0.11550011550011552,
                    "highlighted": false,
                    "editingLabels": false,
                    "color": "#4caf50",
                    "cls": "Mathew",
                    "id": "5963047210586554",
                    "tags": [
                      "10A"
                    ]
                  },
                  {
                    "type": "box",
                    "x": 0.24209050538000393,
                    "y": 0.22572652946628186,
                    "w": 0.014350948905109517,
                    "h": 0.08372926283948184,
                    "highlighted": false,
                    "editingLabels": false,
                    "color": "#4caf50",
                    "cls": "Mathew",
                    "id": "6886601235777507",
                    "tags": [
                      "10A"
                    ]
                  }
                ]

              }
            ]}

            onExit={onSave}

            // onMouseEnter={() => setShowtag(true)}
            // onMouseOver={() => setShowtag(true)}

          />

        </div>
      </div>
    </>
  )
}

export default App;
