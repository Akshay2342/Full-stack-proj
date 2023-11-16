import axios from "axios";

const AllBlogs = () => {
     axios.get('http://localhost:5000/api/blogs')
     .then(res => console.log(res))
        .catch(err => console.log(err))

    return ( 
        <>
        AllBlogs Here
        </>
     );
}
 
export default AllBlogs;