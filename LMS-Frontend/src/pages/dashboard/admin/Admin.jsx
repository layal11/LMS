import "./admin.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";


const URL_ID ='http://localhost:8000/api/getAdminID'

export default function Admin() {
  const {adminId} = useParams();

  const [dataID, setData] = useState([]);
  const [errorID, setError] = useState([]);
  const [messageID, setMessage] = useState([]);
  const [state, setValue] = useState({});

  const getDataID = async () => {
    const response = await axios.get(`${URL_ID}/${adminId}`)
    setData(response.data);
    console.log("data ID", response.data);
  };

  const handleSubmit = async (e,id) => {
    e.preventDefault();
    try {
      const sala = {
        name: state.name,
        last_name: state.last_name,
        email: state.email
      }

      console.log("test");

      const response = await fetch("http://localhost:8000/api/updateAdmin/" + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sala),
      });
      const data = await response.json();
      setMessage(data.message);
      console.log(data);
      if(!data.success){
        setError(data.errors);
      }else{
        setData(data.data);

      }
      console.log("message2",data.message)
      console.log("errors",data.errors)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleChange = (e) => {
    let {name, value} = e.target;
    setValue((data) => {
      return {
        ...data,
        [name]: value,
      }

    })

  }

  useEffect(() => {
    getDataID()

  }, [])

    return (

        <div className="admin">
          <div className="adminTitleContainer">
            <h1 className="adminTitle">Edit Admin</h1>
            
          </div>
          <div className="adminContainer">
            
            <div className="adminUpdate">
              <span className="adminUpdateTitle">Edit</span>
              <form className="adminUpdateForm">
                <div className="adminUpdateLeft">
                  <div className="adminUpdateItem">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={dataID.name}
                        className="adminUpdateInput"
                        onChange={handleChange}
                    />
                    {errorID && Object.keys(errorID).map((err)=>{
                      console.log("error");
                      if(err  === "name"){
                        return <p style={{color:"red"}}>{errorID[err][0]}</p>
                      }
                    })}
                  </div>
                  <div className="adminUpdateItem">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"

                        defaultValue={dataID.last_name}
                        className="adminUpdateInput"
                        onChange={handleChange}
                    />
                    {errorID && Object.keys(errorID).map((err)=>{
                      console.log("error");
                      if(err  === "last_name"){
                        return <p style={{color:"red"}}>{errorID[err][0]}</p>
                      }
                    })}
                  </div>
                  <div className="adminUpdateItem">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        defaultValue={dataID.email}
                        className="adminUpdateInput"
                        onChange={handleChange}
                    />
                    {console.log("hellolololo",errorID)}
                    {console.log("message",messageID)}
                    {errorID && Object.keys(errorID).map((err)=>{
                      console.log("error");
                      if(err  === "email"){
                        return <p style={{color:"red"}}>{errorID[err][0]}</p>
                      }
                    })}
                  </div>
                  <div className="mybutton">
                  <button type="submit" className="adminUpdateButton"
                          onClick={(e) =>
                            handleSubmit(e,adminId)
                          }
                  >Update
                  </button>
                  </div>
                  {<p style={{color:"red"}}>{messageID}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
