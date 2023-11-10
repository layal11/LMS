import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import "./DeleteTest.css"
import "./CreateAdmins"
import "../components/UpdateAdmins";
import CreateAdmins from "./CreateAdmins";
import UpdateAdmins from "../components/UpdateAdmins";

const URL = 'http://localhost:8000/api/getAdmin'
const URLDELETE ='http://localhost:8000/api/deleteAdmin'
const URLUPDATE ='http://localhost:8000/api/updateAdmin'


const DeleteTable = () => {
    const closePopup = (value) =>{
        setOpen(value);
    }

    const history = useHistory();

    const handleClick = () => {
        history.push("/CreateAdmins");
    }
    const [admins, setAdmins] = useState([]);
    const [updateadmins, setUpdateAdmins] = useState([])
    const [item, setitem] = useState({})
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setAdmins(response.data)
    }

    const removeData = (id) => {

        axios.delete(`${URLDELETE}/${id}`).then(res => {
            const del = admins.filter(admin => id !== admin.id)
            setAdmins(del)
        })
    }



    const handleUpdateInfo = (index) => {
        setitem(admins[index])

    }

    const renderHeader = () => {
        let headerElement = ['id', 'name',  'last name','email', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return admins && admins.map((admin,index) => {
            return (
                <tr key={index}>
                    <td>{admin.id}</td>
                    <td>{admin.name}</td>
                    <td>{admin.last_name}</td>
                    <td>{admin.email}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(admin.id)}>Delete</button>
                        <button className='button' onClick={() =>{
                            handleUpdateInfo(index);
                            setOpen(true);


                            // updateData(id)
                        }}>
                            Update</button>

                    </td>

                </tr>



            )

        })

    }

    return (
        <>

            <UpdateAdmins open={isOpen} updatedItem={item} close={closePopup}

            />

            <h1 id='title'>Admins Table</h1>
            <table id='employee'>
                <thead>
                <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                {renderBody()}
                </tbody>
            </table>
            <button className='button2' onClick={() => handleClick()}>Create</button>
        </>
    )
}


export default DeleteTable