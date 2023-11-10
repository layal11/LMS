import "./user.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL, URLPIC } from "../../../components/URL";
import { toast } from "react-toastify";

export default function User() {
  const { userId } = useParams();
  const [dataID, setData] = useState([]); // Get Data profile
  const [state, setValue] = useState({}); // Set New Data
  const [students, SetStudents] = useState(null); //Get Class ID
  const [classes, setClasses] = useState([]);
  const [sections, Setsections] = useState([]); // Get Section ID
  const [sectionsValue, SetsectionsValueID] = useState(null);
  const [sectionsId, SetsectionsId] = useState(null);
  const [fileValue, setFileValue] = useState(null); // To Preview Image Only
  const [fileImage, SetfileImage] = useState([]); // To send File

  console.log("param", userId);

  const getDataID = async () => {
    const response = await axios.get(URL + "/profiles/" + userId);
    setData(response.data.Data);
    getSectionByClassUpdate(response.data.Data.class_id);
    SetsectionsId(response.data.Data.section.id);
    console.log("data ID", response.data);
    console.log("section", response.data.Data.section);
    console.log("class_id", response.data.Data.class_id);
  };

  useEffect(() => {
    getDataID();
    getClassesUpdate();
    getSectionByClassUpdate();
  }, [students, sectionsValue]);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setValue((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };
  const getClassesUpdate = () => {
    fetch(URL + "/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.Data);
      });
  };
  const getSectionByClassUpdate = async (value) => {
    if (value) {
      await fetch(URL + "/getClass/" + value)
        .then((response) => response.json())
        .then((data) => {
          Setsections(data.Data);
          // if (sectionId) {
          //   SetsectionsValueID(sectionId);
          // }
        });
    }

    // else {
    //   await fetch(URL + "/getClass/" + dataID.student.section_id)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         Setsections(data.Data);
    //         if (sectionId) {
    //           SetsectionsValueID(sectionId);
    //         }
    //       });
    // }
  };

  const handleChangeUploadPIC = (event) => {
    SetfileImage(event.target.files);
    setFileValue({
      file: global.URL.createObjectURL(event.target.files[0]),
    });
  };
  const updateStudent = async (e) => {
    e.preventDefault();

    let studentUpdate = new FormData();
    studentUpdate.append("_method", "PUT");

    if (state.name !== undefined && state.name !== "") {
      studentUpdate.append("name", state.name);
    }

    if (state.last_name !== undefined && state.last_name !== "") {
      studentUpdate.append("last_name", state.last_name);
    }
    if (state.email !== undefined && state.email !== "") {
      studentUpdate.append("email", state.email);
    }
    if (state.phone !== undefined && state.phone !== "") {
      studentUpdate.append("phone", state.phone);
    }
    if (state.phone !== undefined && state.phone !== "") {
    }
    if (state.phone !== undefined && state.phone !== "") {
    }
    if (state.phone !== undefined && state.phone !== "") {
    }
    studentUpdate.append("section_id", sectionsValue);
    studentUpdate.append("class_id", students);
    studentUpdate.append("student_id", dataID.profile.student_id);
    studentUpdate.append("image", fileImage[0]);

    const result = await axios.post(
      `${URL}/profiles/${dataID.profile.id}`,
      studentUpdate,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log("result", result.data.Message);
    if (result.data.Message) {
          toast.success(result.data.Message);
    }
    // .then((data) => {
    //   if (data.data.success) {
    //     toast.success(`Student ${state.name}`+` ${state.last_name}`+` has been updated successfully`);
    //   }
    // })
    // .catch((error) => {
    //
    //   setErrorValidation({errorMessage: error.response.data.errors});
    // });
  };
  console.log("state", state);
  return (
    <div className="user">
      {/* {dataID && dataID.profile && " PROFILE ID " + dataID.profile.id}
      {dataID && dataID.profile && " STUDENT ID " + dataID.profile.student_id}
      {" CLASS ID " + students}
      {" SECTION ID " + sectionsValue}
      {" file " + fileValue} */}
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Student</h1>
      </div>
      <div className="userContainer">
        <div className="adminShow">
          <div className="adminShowTop">
            <img
              src={dataID && dataID.profile && URLPIC + dataID.profile.image}
              alt=""
              className="adminShowImg"
            />
            <div className="adminShowTopTitle">
              <span className="adminShowUsername">
                {dataID && dataID.profile && dataID.profile.name}
              </span>
              <span className="adminShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="adminShowBottom">
            <span className="adminShowTitle">Account Details</span>
            <div className="adminShowInfo">
              <PermIdentity className="adminShowIcon" />
              <span className="adminShowInfoTitle">
                {dataID && dataID.profile && dataID.profile.last_name}
              </span>
            </div>

            <span className="adminShowTitle">Contact Details</span>
            <div className="adminShowInfo">
              <PhoneAndroid className="adminShowIcon" />
              <span className="adminShowInfoTitle">
                {dataID && dataID.profile && dataID.profile.phone}
              </span>
            </div>
            <div className="adminShowInfo">
              <MailOutline className="adminShowIcon" />
              <span className="adminShowInfoTitle">
                {dataID && dataID.profile && dataID.profile.email}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={dataID && dataID.profile && dataID.profile.name}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  defaultValue={
                    dataID && dataID.profile && dataID.profile.last_name
                  }
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={
                    dataID && dataID.profile && dataID.profile.email
                  }
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  name="phone"
                  defaultValue={
                    dataID && dataID.profile && dataID.profile.phone
                  }
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                {!fileValue && (
                  <img
                    className="userUpdateImg"
                    src={
                      dataID && dataID.profile && URLPIC + dataID.profile.image
                    }
                    alt=""
                  />
                )}

                {fileValue && (
                  <img className="userUpdateImg" src={fileValue.file} alt="" />
                )}

                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" onChange={handleChangeUploadPIC} />
              </div>
             
              <div className="newUserItem">
                <label>Class</label>
                <select
                  className="newUserSelect"
                  name="active"
                  value={students}
                  onChange={(event) => {
                    SetStudents(event.target.value);
                    SetsectionsValueID("");
                  }}
                  id="active"
                >
                  <option value=""> Class Name</option>
                  {dataID && dataID.classes && classes &&
                    classes.length > 0 &&
                    classes.map((clas) => {
                      if (clas.id === dataID.classes.id) {
                        return (
                          <option value={clas.id} selected={"selected"}>
                            {" "}
                            {clas.name}{" "}
                          </option>
                        );
                      } else {
                        return <option value={clas.id}> {clas.name} </option>;
                      }
                    })}
                </select>
              </div>
              <div className="newUserItem">
                <label>Section</label>
                <select
                  className="newUserSelect"
                  name="active"
                  value={sectionsValue}
                  onChange={(event) => {
                    SetsectionsValueID(event.target.value);
                  }}
                  id="active"
                >
                  <option value=""> Section Name</option>
                  {sections &&
                    sections.length > 0 &&
                    sections.map((section) => {
                      if (dataID.section.id === sectionsId) {
                        return (
                          <option value={section.id} selected={"selected"}>
                            {" "}
                            {section.name}{" "}
                          </option>
                        );
                      } else {
                        return (
                          <option value={section.id}> {section.name} </option>
                        );
                      }
                    })}
                </select>
              </div>
              <div className="buttonUpdate"> 
               <button
                type="submit"
                className="userUpdateButton"
                onClick={(e) => updateStudent(e, userId)}
              >
                Update
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
