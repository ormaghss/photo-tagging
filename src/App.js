import React from "react";
import ReactImageAnnotate from "react-image-annotate";

const onSave = MainLayoutState => {

  console.log(JSON.stringify(MainLayoutState));
};
const App = () => (
  <ReactImageAnnotate
    labelImages
    regionClsList={["Benedict", "Anish", "Mathew", "Santhosh"]}
    regionTagList={["10C", "10B", "10A"]}
    images={[
      {
        src: "https://res.cloudinary.com/course4u/image/upload/v1680404739/ghss/group-photo_m6pntk.jpg",
        name: "Group Photo",
        regions:  [
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
  />
);

export default App;
