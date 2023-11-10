import "./sectionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { URL } from "../../../components/URL";

export default function SectionList() {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch(URL + "/sections")
      .then((response) => response.json())
      .then((data) => {
        setData(data.Data);
        // console.log(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
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
  const handleDelete = async (sectionId) => {
    await requestData(URL + "/sections/" + sectionId, undefined, "DELETE");
    setData(data.filter((item) => item.id !== sectionId));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 ,cellClassName: 'userListUser',
      headerClassName: 'userListUser' },
    {
      field: "name",
      headerName: "Section",
      width: 200,
      cellClassName: 'userListUser',
      headerClassName: 'userListUser',
    },
    {
      field: "class",
      headerName: "Class",
      width: 200,
      cellClassName: 'userListUser',
      headerClassName: 'userListUser',
      renderCell: (params) => {
        return <div className="sectionListSection">{params.value.name}</div>;
      },
    },
    {
      field: "max_students",
      headerName: "Max Students",
      width: 160,
      cellClassName: 'userListUser',
      headerClassName: 'userListUser',
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      cellClassName: 'userListUser',
      headerClassName: 'userListUser',
      renderCell: (params) => {
        return (
          <>
            <Link to={"/section/" + params.row.id}>
              <button className="sectionListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="sectionListDelete"
              onClick={async () => await handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="sectionList">
      <Link to="/newSection">
        <button className="userAddButton">Create</button>
      </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
