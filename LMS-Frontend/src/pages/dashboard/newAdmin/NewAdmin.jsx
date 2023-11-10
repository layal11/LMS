import "./newAdmin.css";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import SessionContext from "../../../context/SessionContext";

export default function NewAdmin() {
  const {
    errors,
    fetchAdmins,

    actions: { register },
    session: {
      user: { access_token },
    },
  } = useContext(SessionContext);
  console.log(useContext(SessionContext));
  const [state, setValue] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleClick = () => {
    history.push("/admin");
  };
  const { name, email, password, last_name } = state;
  function setState(nextState) {
    setValue((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
    console.log("errors", errors);
  }

  async function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    register(name, email, password, last_name);

    console.log("admin", fetchAdmins);
  }

  return (
    <div className="newAdmin">
      <h1 className="newAdminTitle">New Admin</h1>
      <form className="newAdminForm">
        <div className="newAdminItem">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
          {errors &&
            Object.keys(errors).map((err) => {
              if (err === "name") {
                return <p style={{ color: "red" }}>{errors[err]}</p>;
              }
            })}
        </div>
        <div className="newAdminItem">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleChange}
          />
          {errors &&
            Object.keys(errors).map((err) => {
              if (err === "last_name") {
                return <p style={{ color: "red" }}>{errors[err]}</p>;
              }
            })}
        </div>
        <div className="newAdminItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errors &&
            Object.keys(errors).map((err) => {
              if (err === "email") {
                return <p style={{ color: "red" }}>{errors[err]}</p>;
              }
            })}
        </div>
        <div className="newAdminItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          {errors &&
            Object.keys(errors).map((err) => {
              if (err === "password") {
                return <p style={{ color: "red" }}>{errors[err]}</p>;
              }
            })}
        </div>

        <div className="newAdminItem"></div>
        <div className="newAdminItem">
          <div className="newAdminGender"></div>
        </div>
        <div className="newAdminItem"></div>
        <div className="newAdminItem"></div>
        <button
          className="newAdminButton"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
            {
              errors && handleClick();
            }
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
}
