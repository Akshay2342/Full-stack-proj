import axios from "axios";
import ViewBlog from "../Components/ViewBlog";
import { useState,useEffect } from "react";



const AllBlogs = () => {
    const [Id, setId] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/blogs')
        .then(res => {
            console.log(res.data[0])
          const ids = res.data[0].map(element => element.contentID);
          setId(ids);
        })
        .catch(err => console.log(err));
    }, []);
    

  
    return ( 
        <div className="AllBlogs">
            <ViewBlog id ={4}></ViewBlog>
        </div>
     );
}
 
export default AllBlogs;