import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import {TransitionGroup} from 'react-transition-group';
import Collapse from "@mui/material/Collapse";

const UploadCourse = () => {
    const topcourses = ["node", "sql", "java", "c", "c++", "python", "ruby", "kotlin", "jellyfish", "kangaroo", "lemon", "mango", "nest", "orange", "parrot", "quokka", "raccoon", "strawberry", "tiger", "umbrella", "violet", "whale", "xylophone", "zebra"];
    const handleRemoveItem = ()=>{
        console.log("Hii");
    }

    return (
        <>
            <h1>Upload Course</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={topcourses}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Courses AVailable" />}
            />
        </>
    );
}

export default UploadCourse;


