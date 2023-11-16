import {Link} from 'react-router-dom';

const Home = () => {
    return ( 
        <>
        <Link to = '/upload_blog' >Upload Blog</Link>
        <Link to = '/view_blog' >View Blog</Link>
        <Link to = '/upload_book' >Upload Book</Link>
        <Link to = '/view_book' >View Book</Link>
        <Link to = '/upload_test' >Upload test</Link>
        <Link to = '/view_test' >View TEst</Link>
        <Link to = '/upload_course' >Upload Course</Link>
        <Link to = '/view_course' >view_course</Link>
        <Link to = '/AllBlogs' >All Blogs Here</Link>
        <br />
        </>
     );
}
 
export default Home;
