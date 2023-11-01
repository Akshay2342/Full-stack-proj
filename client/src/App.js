import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as  Router , Route , Routes } from 'react-router-dom';
import UploadBlog from './Components/UploadBlog';
import ViewBlog from './Components/ViewBlog';
import ViewBook from './Components/ViewBook';
import UploadBook from './Components/UploadBook';
import UploadCourse from './Components/UploadCourse';
import ViewCourse from './Components/ViewCourse';
import QuestionPages from './Components/ViewTest';
import UploadTestCpy from './Components/UploadTestCpy';
import TransitionGroupExample from './Components/Transistion';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="Navbar">
      <Navbar />
      </div>
      <div className="content_x">
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload_blog" element={<UploadBlog />} />
            <Route path="/view_blog" element={<ViewBlog />} />
            <Route path="/upload_book" element={<UploadBook />} />
            <Route path="/view_book" element={<ViewBook />} />
            <Route path="/upload_test" element={<UploadTestCpy />} />
            <Route path="/view_test" element={<QuestionPages />} />
            <Route path="/upload_course" element={<TransitionGroupExample/>} />
            <Route path="/view_course" element={<ViewCourse />} />
          </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
