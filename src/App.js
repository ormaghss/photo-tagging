import React from "react";
import ReactImageAnnotate from "react-image-annotate";
import Grid from "@material-ui/core/Grid";
import { Col, Row } from "reactstrap";


function App(props) {
  const onSave = MainLayoutState => {

    console.log(JSON.stringify(MainLayoutState));
  };

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
                      "x": 0.882589285565218,
                      "y": 0.11861966874654396,
                      "w": 0.024536998956521727,
                      "h": 0.07801313232902467,
                      "highlighted": false,
                      "editingLabels": false,
                      "color": "#f44336",
                      "cls": "Benedict",
                      "id": "8069525039067573",
                      "tags": [
                          "10C"
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
