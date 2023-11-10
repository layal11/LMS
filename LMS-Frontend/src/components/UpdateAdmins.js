import React, {useState,useEffect} from "react";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
const URLUPDATE ='http://localhost:8000/api/updateAdmin'


export default function UpdateAdmins(props) {

    console.log("UPDATE ID", props.updatedItem.id);

    // async function handleSubmit(e) {
    //
    // }

    const [updateadmins, setUpdateAdmins] = useState([])
    const [state, setValue] = useState({});



    const handleChange = (e) => {
        let {name, value} = e.target;
        setValue((data) => {
            return {
                ...data,
                [name]: value,
            }

        });


    }
    console.log("id",props.updatedItem.id)
    console.log("state",state);
    // const handleSubmit  = async () =>{
    //     console.log("state",state);
    //     let formData = new FormData();
    //     formData.append("name", state.name);
    //     formData.append("last_name", state.last_name);
    //     formData.append("email", state.email);;
    //    await axios.
    //     put("http://localhost:8000/api/updateAdmin/" + props.updatedItem.id, {
    //         params: {
    //             data: formData
    //         },
    //
    //        headers: {
    //            Accept: 'application/json',
    //            'Content-Type': 'application/json',
    //        },
    //
    //     })
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    const handleSubmit = async (e)=>{
        try{
      const body = {
          name: state.name,
          last_name: state.last_name,
          email:state.email
      }

     const response =  await  fetch("http://localhost:8000/api/updateAdmin/" + props.updatedItem.id, {

            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
           body: JSON.stringify(body),
        });

      const data = await response.json();

      console.log(data);

        }catch(err){
            console.log(err.message)
        }
    }



    // const handleSubmit  = async (e) => {
    //         try{
    //             const admin = {
    //                 name:state.name,
    //                 last_name:state.last_name,
    //                 email:state.email
    //             }
    //             const response = await fetch(`http://localhost:8000/api/updateAdmin/${id}`, {
    //                 method: "PUT",
    //                 headers: {"Content-Type": "multipart/form-data",
    //                 "Accept":"application/json"},
    //                 body:JSON.stringify(admin)
    //             });
    //             const data = await response.json();
    //             setValue(data);
    //             }
    //             catch (err){
    //                 console.log(err)
    //         }
    // }



    if (!props.open) {
        return null
    }
    return <div>

        <input
            type="text"
            name="name"
            defaultValue={props.updatedItem.name}
            onChange={handleChange}

        />
        <input
            type="text"
            name="last_name"
            defaultValue={props.updatedItem.last_name}
            onChange={handleChange}
        />
        <input
            type="text"
            name="email"
            defaultValue={props.updatedItem.email}
            onChange={handleChange}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
                handleSubmit(props.updatedItem.id);
            }}>
            Update
        </Button>
        <div>{props.updatedItem.name}</div>

        <h1>
            <h1>ID..
                {props.updatedItem.id}
            </h1>
          <h1>NAME..
              {props.updatedItem.name}
          </h1>
            <h1>LAST NAME...
                {props.updatedItem.last_name}
            </h1>
            <h1> EMAIL...
                {props.updatedItem.email}
            </h1>

        </h1>

        <div onClick={() => {
            props.close(false)
        }
        }>
            x
        </div>
    </div>


}

