import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { URL } from "../../../components/URL";
import "./newSection.css";

export default function NewSection() {
  let { sectionId } = useParams(); //get sectionId from url defined in the dashboardRoutes
  const [section, setSection] = useState();

  const getSection = (id) => {
    //get section data by ID (We have to do this for the update)
    fetch(URL + "/sections/" + sectionId)
      .then((res) => res.json())
      .catch((error) => window.history.back())
      .then(
        (result) => {
          setSection(result.Data);
          if (result.Data && result.Data.id) {
            setClassId(result.Data.class_id);
            setMaxStudents(result.Data.max_students);
            setSectionName(result.Data.name);
          } else {
            window.history.back();
          }
        },
        (error) => {}
      )
      .catch((error) => window.history.back());
  };
  useEffect(() => {
    getData();
    if (sectionId) {
      try {
        getSection(sectionId);
      } catch (e) {}
    }
  }, []);
  const getData = () => {
    fetch(URL + "/classes")
      .then((res) => res.json())
      .then(
        (result) => {
          setClasses(result.Data);
          if (result.Data && result.Data.length > 0) {
            setClassId(result.Data[0].id);
          }
        },
        (error) => {}
      );
  };
  async function requestData(url = "", data = {}, type = "GET") {
    const response = await fetch(url, {
      method: type, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const [Classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(0);
  const [sectionName, setSectionName] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  return (
    <div className="NewSection">
      <h1 className="NewSectionTitle">{sectionId ? "Edit" : "New"} Section</h1>
      <form className="NewSectionForm">
        <div className="NewSectionItem">
          <label>Section Name</label>
          <input
            type="text"
            value={sectionName}
            onChange={(event) => {
              setSectionName(event.target.value);
            }}
            placeholder="Section 1"
          />
        </div>
        <div className="NewSectionItem">
          <label>Max Students</label>
          <input
            max="20"
            min="1"
            type="number"
            value={maxStudents}
            onChange={(event) => {
              if (
                event.target.value &&
                parseInt(event.target.value) > 0 &&
                parseInt(event.target.value) < 16
              ) {
                setMaxStudents(event.target.value);
              } else {
                setMaxStudents(event.target.value);
                setResponseMessage("Students number can't be negative");
              }
            }}
            placeholder="Number of students"
          />
        </div>
        <div className="NewSectionItem">
          <label>Choose Your Class</label>
          <select
            className="NewSectionSelect"
            value={classId}
            name="active"
            onChange={(event) => {
              setClassId(event.target.value);
            }}
            id="active"
          >
            {Classes &&
              Classes.length > 0 &&
              Classes.map((classes) => {
                return <option value={classes.id}>{classes.name}</option>;
              })}
          </select>
        </div>
        {responseMessage && responseMessage.length > 0 && (
          <div className="NewSectionItem">{responseMessage}</div>
        )}

        {sectionId ? (
          <button
            type="button"
            className="NewSectionButton"
            onClick={async (event) => {
              let res = await requestData(
                URL + "/sections/" + sectionId,
                {
                  name: sectionName,
                  class_id: classId,
                  max_students: maxStudents,
                },
                "PUT"
              );
              if (res.Data && res.Data.id) {
                setResponseMessage(res.Message);
                window.history.back();
              } else {
                setResponseMessage("Please try again later.");
              }
            }}
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            className="NewSectionButton"
            onClick={async (event) => {
              let res = await requestData(
                URL + "/sections",
                {
                  name: sectionName,
                  class_id: classId,
                  max_students: maxStudents,
                },
                "POST"
              );
              setResponseMessage(res.Message);
            }}
          >
            Create
          </button>
        )}
      </form>
    </div>
  );
}
