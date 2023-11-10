import React, { Component, useEffect,useState } from "react";


function ManageClasses() {
	const [blogs, setBlog] = useState(null);
	
	useEffect(() => {
        const rend = async () => {
            const res = await fetch("http://localhost:8000/api/blogs", {
                method: "Get",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            console.log(data)
            setBlog(data);
        };
		rend();
	}, []);

    return (
        
    <div> 
         <h1>
             Patata
             </h1>
        {blogs&&blogs.map((blog)=>(
         <div>
            
            <h2>
                {blog.title}
            </h2>
        </div>
    ))}
    </div> );
}

    export default ManageClasses;