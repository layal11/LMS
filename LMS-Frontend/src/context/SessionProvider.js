import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { toast } from "react-toastify";


export default function SessionProvider({ children }) {
    const [errors,setErrors]= useState({

    });
    const [fetchAdmins,setAdmins]= useState(null);

    const [session, setSession] = useState({

        user: {
            access_token: localStorage.getItem("access_token") },
    });

    function updateSession(nextSession) {
        let value =
            typeof nextSession === "function"
                ? nextSession
                : (prevSession) => ({ ...prevSession, ...nextSession });
        setSession(value);
    }

    useEffect(() => {
        let user_id = localStorage.getItem("user_id");
        let access_token = localStorage.getItem("access_token");
        let user = { user_id, access_token };
        updateSession({ user });
    }, []);



    async function login(email, password) {
        const body = new FormData();
        body.append("email", email);
        body.append("password", password);
        const response = await fetch("http://localhost:8000/api/login", {
            method: "post",
            body,
        });
        const result = await response.json();
        const { access_token, user_id } = result;
        if(access_token && user_id) {
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user_id", user_id);
        }
        const user = { access_token, user_id };
        updateSession({ user });
        console.log("result",result);
        // const email_admin = result.email;
        // console.log(result);
        // const response_admin = await fetch(`http://localhost:8000/api/admin_email/${email_admin}`, {
        //     method: "GET",
        //     headers: { "Content-Type": "application/json" }
        // });
        // const result_admin = await response_admin.json();
        // console.log(result_admin);
        // toast.success(`Welcome ${result_admin.name}`+` ${result_admin.last_name}`);

    }
    async function register(name, email,password, last_name) {
        const body = new FormData();
        body.append("name",name);
        body.append("email", email);
        body.append("password", password);
        body.append("last_name",last_name);
        const response = await fetch("http://localhost:8000/api/register", {
            method: "post",
            headers: {"Accept":"application/json"},
            body,
        });
        const result = await response.json();
        if(result.success){
            const { access_token, user_id } = result;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user_id", user_id);
            // toast.success(`Welcome ${user.access_token[1].name}`+` ${user.access_token[1].last_name}`);
            const user = { access_token, user_id };
            updateSession({ user });
        }
        else{
            setErrors(result.errors);
            console.log(result.errors);
        }

        console.log("result",result);
        // toast.success(`Welcome ${user.access_token[1].name}`+` ${user.access_token[1].last_name}`);
    }


    async function logout(email, password) {
        const body = new FormData();
        body.append("email", email);
        body.append("password", password);
        const response = await fetch("http://localhost:8000/api/logout", {
            method: "post",
            body,
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        const user = { access_token: null, user_id: null };
        updateSession({ user });
        toast("Goodbye!!");

    }
    useEffect(() => {
        const rend = async () => {
            const res = await fetch("http://localhost:8000/api/getAdmin", {
                method: "Get",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            setAdmins(data);
        };
        rend();
    }, []);
    const context = {fetchAdmins,errors, session, actions: {  login, logout,register } };
    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    );
}