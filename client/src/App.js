import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as  Router , Route , Routes } from 'react-router-dom';
import UploadBlog from './Components/UploadBlog';
import ViewBlog from './Components/ViewBlog';
import ViewBook from './Components/ViewBook';
import UploadBook from './Components/UploadBook';
// import UploadCourse from './Components/UploadCourse';
import ViewCourse from './Components/ViewCourse';
import QuestionPages from './Components/ViewTest';
import UploadTestCpy from './Components/UploadTestCpy';
import TransitionGroupExample from './Components/Transistion';
import LsDisplay from './Components/LsDisplay';
import { AuthContexProvider } from './context/authContext';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import AllBlogs from './Pages/AllBlogs';

export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#bc87e6',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
       <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
    <AuthContexProvider>
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
            <Route path="/login" element={<LsDisplay />} />
            <Route path="/AllBlogs" element={<AllBlogs />} />
          </Routes>
      </div>
    </div>
    </Router>
    </AuthContexProvider>
    </Box>
    </ThemeProvider>
  );
}

export default App;
