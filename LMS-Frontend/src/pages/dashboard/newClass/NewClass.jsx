import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { URL } from "../../../components/URL";
import "./newClass.css";

export default function NewClass() {
  let { classid } = useParams(); //get classId from url defined in the dashboardRoutes
  const [classobj, setclass] = useState();
  const [className, setclassName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const getclass = (classid) => {
    //get class data by ID (We have to do this for the update)
    fetch(URL + "/classes/" + classid)
      .then((res) => res.json())
      .catch((error) => window.history.back())
      .then(
        (result) => {
          setclass(result.Data);
          if (result.Data && result.Data.id) {
            setclassName(result.Data.name);
          } else {
            window.history.back();
          }
        },
        (error) => {}
      )
      .catch((error) => window.history.back());
  };
  useEffect(() => {
    if (classid) {
      try {
        getclass(classid);
      } catch (e) {}
    }
  }, []);
  async function requestData(url = "", data = {}, type = "GET") {
    const response = await fetch(url, {
      method: type, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).catch((e) => {
      console.log(e);
      setResponseMessage("Failed to create class");
    });

    try {
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (e) {}
  }
  

  return (
    <div className="Newclass">
      <h1 className="NewclassTitle">{classid ? "Edit" : "New"} class</h1>
      <form className="NewclassForm">
        <div className="NewclassItem">
          <label>Class Name</label>
          <input
            type="text"
            value={className}
            onChange={(event) => {
              setclassName(event.target.value);
            }}
            placeholder="class 1"
          />
        </div>

        {responseMessage && responseMessage.length > 0 && (
          <div className="NewclassItem">{responseMessage}</div>
        )}

        {classid ? (
          <button
            type="button"
            className="NewclassButton"
            onClick={async (event) => {
              let res = await requestData(
                URL + "/classes/" + classid,
                {
                  name: className,
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
            className="NewclassButton"
            onClick={async (event) => {
              let res = await requestData(
                URL + "/classes",
                {
                  name: className,
                },
                "POST"
              );
              if (res) {
                setResponseMessage(res.Message);
                window.location.href = "/listSection";
              }
            }}
          >
            Create
          </button>
        )}
      </form>
    </div>
  );
}
