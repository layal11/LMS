import "./adminList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "../admin/Admin";

const URL = "http://localhost:8000/api/getAdmin";
const URLDELETE = "http://localhost:8000/api/deleteAdmin";
export default function AdminList() {
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [item, setitem] = useState({});
  const [isOpen, setOpen] = useState(false);
  const closePopup = (value) => {
    setOpen(value);
  };

  const getData = async () => {
    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };
  const handleUpdateInfo = (index) => {
    console.log("data", data);
    setitem(data.filter((item) => item.id === index));
  };
  const handleDelete = (id) => {
    axios.delete(`${URLDELETE}/${id}`).then((res) => {
      const del = data.filter((item) => id !== item.id);
      setData(del);
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
    },
    {
      field: "user",
      headerName: "Name",
      width: 200,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      renderCell: (data) => {
        return <div className="adminListUser">{data.row.name}</div>;
      },
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 200,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      renderCell: (data) => {
        return (
          <>
            {/*{console.log(data.in)}*/}
            <Link to={"/admin/" + data.row.id}>
              <button
                className="adminListEdit"
                onClick={() => {
                  // handleUpdateInfo(data.row.id)
                  return (
                    <Admin
                      open={isOpen}
                      data={data}
                      updatedItem={item}
                      close={closePopup}
                    />
                  );

                  // console.log("ID",data.id)
                }}
              >
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="adminListDelete"
              onClick={() => handleDelete(data.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="adminList">
      {console.log("item", item)}
      <Link to="/newAdmin">
        <button className="adminAddButton">Create</button>
      </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />

      {/*<Admin open={isOpen} data={data} updatedItem={item} close={closePopup}*/}

      {/*/>*/}
    </div>
  );
}
