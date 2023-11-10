import React, { Component, useEffect,useState } from "react";


function Blogs() {
	const [blogs, setBlog] = useState(null);
	
	useEffect(() => {
        const rend = async () => {
            const res = await fetch("http://localhost:8000/api/getAdmin", {
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

            {blogs&&blogs.map((blog)=>(
         <div>
            <h2>
                {blog.name}
            </h2>
        </div>
    ))}


    </div> );
}

    export default Blogs;