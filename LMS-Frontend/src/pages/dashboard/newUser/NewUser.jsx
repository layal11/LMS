import "./newUser.css";
import React, {useEffect, useState} from "react";
import {URL} from "../../../components/URL";
import axios from "axios";
import {toast} from "react-toastify";
import {colors} from "@material-ui/core";

export default function NewUser() {
  const [classes, setClasses] = useState([]);
  const [students, SetStudents] = useState([]);
  const [sections, Setsections] = useState([]);
  const [sectionsValue, SetsectionsValueID] = useState([]);
  const [state, setValue] = useState([]);
  const [nameOfPicture,SetnameOfPicture] = useState([]);
  const [fileImage,SetfileImage] = useState([])
  const [errorValidation,setErrorValidation] = useState({
    errorMessage: ''
  })

  const handleChangePicture = async e => {
    const files = e.target.files;
    var filesArray = [].slice.call(files);
    SetfileImage(e.target.files);
    console.log("files222", files);
    await   filesArray.forEach(e => {
      SetnameOfPicture(e.name);
    });
  }

  const uploadImage = async () => {
    let student = new FormData();
    student.append('name', state.name);
    student.append(  'last_name', state.last_name);
    student.append( 'email', state.email);
    student.append( 'phone', state.phone);
    student.append( 'section_id', sectionsValue);
    student.append( 'class_id', students);
    student.append( 'image', fileImage[0]);

    const result=  await axios.post(`${URL}/profiles`, student,
        {
          headers: {
            'Accept': 'application/json',
          }
        }

    )

        .then((data) => {
          if (data.data.success) {
            toast.success(`Student ${state.name}`+` ${state.last_name}`+` has been created successfully`);
          }
        })
        .catch((error) => {

          setErrorValidation({errorMessage: error.response.data.errors});
        });

  };
  console.log("Validation 2",errorValidation);

  const getData = () => {
    fetch(URL + "/classes")
        .then((response) => response.json())
        .then((data) => {
          setClasses(data.Data);

        });
  };
  useEffect(() => {
    getData();

  }, []);

  useEffect(() => {
    getSectionByClass();
  }, [students]);

  const getSectionByClass = async () => {
    await fetch(URL + "/getClass/" + students)

        .then((response) => response.json())
        .then((data) => {
          Setsections(data.Data);

        });
  }

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

  const handleChange = (e) => {
    let {name, value} = e.target;
    setValue((data) => {
      return {
        ...data,
        [name]: value,
      }
    })
    console.log(state);


  }

  return (
      <div className="newUser">
        <h1 className="newUserTitle">New Student</h1>

        <form className="newUserForm" onSubmit={uploadImage}>
          <div className="newUserItem">
            <label>First Name</label>
            <input type="text"
                   name="name"
                // value={state.name}
                   onChange={handleChange}
            />
          </div>

          <div className="newUserItem">
            <label>Last Name</label>
            <input type="text"
                   name="last_name"
                   onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input type="email" name="email"
                   onChange={handleChange}/>
            { errorValidation.errorMessage.email &&
            <p style={{color:"red"}}> { errorValidation.errorMessage.email } </p> }
          </div>


          <div className="newUserItem">
            <label>Phone</label>
            <input type="text" name="phone"
                   onChange={handleChange}/>
            { errorValidation.errorMessage.phone &&
            <p style={{color:"red"}}> { errorValidation.errorMessage.phone } </p> }
          </div>
          <div className="newUserItem">
            <label>Class</label>
            <select
                className="newUserSelect"
                name="active"
                onChange={(event) => {
                  SetStudents(event.target.value);
                  Setsections([]);
                }}
                id="active"
            >

              < option selected disabled="selected" value=""> Class Name</option>
              {classes && classes.length > 0 &&
              classes.map((clas) => {
                return <option value={clas.id}> {clas.name}  </option>;
              })}

            </select>
          </div>
          <div className="newUserItem">

            <label>Section</label>
            <select
                className="newUserSelect"
                name="active"

                onChange={(event) => {
                  SetsectionsValueID(event.target.value);

                }}
                id="active"
            >
              <option selected="selected" value=""> Section Name</option>
              {sections && sections.length > 0 &&
              sections.map((section) => {
                return <option value={section.id}> {section.name}  </option>;
              })}
            </select>
          </div>
          <div className="newUserImage">
            <label>Upload a Student Image</label>
            <input type="file" className="newUserImage" name="file" id="img"
                   onChange={ (event ) =>{handleChangePicture(event)}}/>
          </div>
        </form>
        <button className="newUserButton" onClick={
          ()=>{
            uploadImage();
            setErrorValidation({
              errorMessage: ''
            } );
          }

        }>Create</button>
      </div>
  );
}














// import "./newUser.css";
// import React, { useEffect, useState } from "react";
// import { URL } from "../../../components/URL";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { colors } from "@material-ui/core";
// import { useParams } from "react-router";
// //
// export default function NewUser() {
//   let { userId } = useParams(); //get classId from url defined in the dashboardRoutes
//   const [classes, setClasses] = useState([]);
//   const [students, SetStudents] = useState(null);
//   const [sections, Setsections] = useState([]);
//   const [sectionsValue, SetsectionsValueID] = useState([]);
//   const [state, setValue] = useState({
//     name: "",
//     phone: "",
//     last_name: "",
//     email: "",
//   });
//   const [nameOfPicture, SetnameOfPicture] = useState([]);
//   const [fileImage, SetfileImage] = useState([]);
//   const [errorValidation, setErrorValidation] = useState({
//     errorMessage: "",
//   });
//
//   const [profile, setProfile] = useState(null);
//   const getUser = (userid) => {
//     console.log(userid);
//     fetch(URL + "/profiles/" + userid)
//       .then((res) => res.json())
//       .catch((error) => window.history.back())
//       .then(
//         async (result) => {
//           console.log(result);
//           if (result.Data && result.Data.id) {
//             setProfile(result.Data);
//             setValue(result.Data);
//             await getSectionByClass(result.Data.student.section_id);
//             SetStudents(result.Data.student.class_id);
//           } else {
//             window.history.back();
//           }
//         },
//         (error) => {}
//       )
//       .catch((error) => window.history.back());
//   };
//   const handleChangePicture = async (e) => {
//     const files = e.target.files;
//     var filesArray = [].slice.call(files);
//     SetfileImage(e.target.files);
//     console.log("files222", files);
//     await filesArray.forEach((e) => {
//       SetnameOfPicture(e.name);
//     });
//   };
//
//   const uploadImage = async () => {
//     let student = new FormData();
//     student.append("name", state.name);
//     student.append("last_name", state.last_name);
//     student.append("email", state.email);
//     student.append("phone", state.phone);
//     student.append("section_id", sectionsValue);
//     student.append("class_id", students);
//     student.append("image", fileImage[0]);
//
//     const result = await axios
//       .post(`${URL}/profiles`, student, {
//         headers: {
//           Accept: "application/json",
//         },
//       })
//
//       .then((data) => {
//         if (data.data.success) {
//           toast.success(
//             `Student ${state.name}` +
//               ` ${state.last_name}` +
//               ` has been created successfully`
//           );
//         }
//       })
//       .catch((error) => {
//         setErrorValidation({ errorMessage: error.response.data.errors });
//       });
//   };
//   console.log("Validation 2", errorValidation);
//
//   const getData = () => {
//     fetch(URL + "/classes")
//       .then((response) => response.json())
//       .then((data) => {
//         setClasses(data.Data);
//         if (userId && !isNaN(userId)) {
//           getUser(userId);
//         }
//       });
//   };
//   useEffect(() => {
//     getData();
//   }, []);
//
//   useEffect(() => {
//     //we should perform this request when we choose a class or onchange of the class dropdown
//     getSectionByClass();
//   }, [students, sectionsValue]);
//
//   const getSectionByClass = async (sectionId) => {
//     if (students) {
//       await fetch(URL + "/getClass/" + students)
//         .then((response) => response.json())
//         .then((data) => {
//           Setsections(data.Data);
//           if (sectionId) {
//             SetsectionsValueID(sectionId);
//           }
//         });
//     }
//   };
//
//   async function requestData(url = "", data = {}, type = "GET") {
//     const response = await fetch(url, {
//       method: type, // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }
//
//   const handleChange = (e) => {
//     let { name, value } = e.target;
//     setValue((data) => {
//       return {
//         ...data,
//         [name]: value,
//       };
//     });
//     console.log(state);
//   };
//
//   return (
//     <div className="newUser">
//       <h1 className="newUserTitle">New Student</h1>
//
//       <form className="newUserForm" onSubmit={uploadImage}>
//         <div className="newUserItem">
//           <label>First Name</label>
//           <input
//             type="text"
//             name="name"
//             value={state.name}
//             onChange={handleChange}
//           />
//         </div>
//
//         <div className="newUserItem">
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="last_name"
//             value={state.last_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="newUserItem">
//           <label>Email</label>
//           <input
//             type="email"
//             value={state.email}
//             name="email"
//             onChange={handleChange}
//           />
//           {errorValidation.errorMessage.email && (
//             <p style={{ color: "red" }}>
//               {" "}
//               {errorValidation.errorMessage.email}{" "}
//             </p>
//           )}
//         </div>
//
//         <div className="newUserItem">
//           <label>Phone</label>
//           <input
//             type="text"
//             value={state.phone}
//             name="phone"
//             onChange={handleChange}
//           />
//           {errorValidation.errorMessage.phone && (
//             <p style={{ color: "red" }}>
//               {" "}
//               {errorValidation.errorMessage.phone}{" "}
//             </p>
//           )}
//         </div>
//         <div className="newUserItem">
//           <label>Class</label>
//           <select
//             className="newUserSelect"
//             name="active"
//             value={students}
//             onChange={(event) => {
//               SetStudents(event.target.value);
//             }}
//             id="active"
//           >
//             <option value=""> Class Name</option>
//             {classes &&
//               classes.length > 0 &&
//               classes.map((clas) => {
//                 return <option value={clas.id}> {clas.name} </option>;
//               })}
//           </select>
//         </div>
//         <div className="newUserItem">
//           <label>Section</label>
//           <select
//             className="newUserSelect"
//             name="active"
//             value={sectionsValue}
//             onChange={(event) => {
//               SetsectionsValueID(event.target.value);
//             }}
//             id="active"
//           >
//             <option value=""> Section Name</option>
//             {sections &&
//               sections.length > 0 &&
//               sections.map((section) => {
//                 return <option value={section.id}> {section.name} </option>;
//               })}
//           </select>
//         </div>
//         <div className="newUserImage">
//           <label>Upload a Student Image</label>
//           <input
//             type="file"
//             className="newUserImage"
//             name="file"
//             id="img"
//             onChange={(event) => {
//               handleChangePicture(event);
//             }}
//           />
//         </div>
//       </form>
//       <button
//         className="newUserButton"
//         onClick={() => {
//           uploadImage();
//           setErrorValidation({
//             errorMessage: "",
//           });
//         }}
//       >
//         Create
//       </button>
//     </div>
//   );
// }
