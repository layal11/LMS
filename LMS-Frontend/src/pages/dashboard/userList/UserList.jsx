import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { URLPIC, URL } from "../../../components/URL";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserList() {
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, SetStudents] = useState(null);
  const [sections, Setsections] = useState([]);
  const [sectionsValue, SetsectionsValueID] = useState(null);
  const [filter, SetFilter] = useState({
    filterName: "",
  });

  useEffect(() => {
    getData();
    getClasses();
    getSectionByClass();
  }, [students, sectionsValue]);
  const getData = async () => {
    // const response = await axios.get(URL + "/profiles");
    if (sectionsValue && students) {
      fetch(URL + "/profiles?section_id=" + sectionsValue)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } else if (students) {
      fetch(URL + "/profiles?class_id=" + students)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } else {
      fetch(URL + "/profiles")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${URL}/profiles/${id}`).then((res) => {
      const del = data.filter((item) => id !== item.id);
      setData(del);
    });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    SetFilter((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };
  const getClasses = () => {
    fetch(URL + "/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.Data);
      });
  };
  const getSectionByClass = async (sectionId) => {
    if (students) {
      await fetch(URL + "/getClass/" + students)
        .then((response) => response.json())
        .then((data) => {
          Setsections(data.Data);

          if (sectionId) {
            SetsectionsValueID(sectionId);
          }
        });
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      valueFormatter: (params) => params.row?.profile?.id,
    },
    {
      field: "username",
      headerName: "First Name",
      width: 145,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      renderCell: (data) => {
        // console.log("row data", data.row);

        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={data.row && data.row.profile && URLPIC + data.row.profile.image}
              alt=""
            />
            {data && data.row.profile && data.row.profile.name}
            {/*{data.row.name}*/}
          </div>
        );
      },
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 140,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      valueFormatter: (params) => params.row?.profile?.last_name,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      valueFormatter: (params) => params.row?.profile?.email,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      valueFormatter: (params) => params.row?.profile?.phone,
    },
    {
      field: "Class ID",
      headerName: "Class",
      width: 140,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      valueFormatter: (params) => params.row?.classes?.name,
    },
    {
      field: "section_id",
      headerName: "Section",
      width: 140,
      cellClassName: "userListUser",
      headerClassName: "userListUser",
      valueFormatter: (params) => params.row?.section?.name,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "userListUser",

      renderCell: (data) => {
        return (
          <>
            <Link to={"/user/" + data.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                handleDelete(data.row.profile.id);
                toast.success(
                  `Student ${data.row.profile.name}` +
                    ` ${data.row.profile.last_name}` +
                    ` was deleted`
                );
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link to="/newUser">
        <button className="userAddButton">Create</button>
      </Link>
      <div className="container">
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
          {classes &&
            classes.length > 0 &&
            classes.map((clas) => {
              return <option value={clas.id}> {clas.name} </option>;
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
              return <option value={section.id}> {section.name} </option>;
            })}
        </select>
      </div>
      </div>
      {/* {"CLASS ID " + students}
      {" Section ID " + sectionsValue} */}
      {/*<input type="text" value={filter.filterName} name="filterName" onChange={handleChange}/>*/}

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        // filterModel={{
        //     items: [{ columnField: 'last_name', operatorValue: 'contains',value:'c'}],
        // }}
      />
    </div>
  );
}
