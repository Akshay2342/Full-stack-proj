import React from 'react'
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import { useState } from "react";
import { AuthContexProvider } from '../context/authContext';
import Login from './Login';
import SignUp from './signUp';

function LsDisplay() {
    
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <center>
    <div className='lsdisplay'>
            <Paper elevation={3} style={{ padding: "10px", paddingBottom: "50px" }}>
        <div align="center">
          {checked ? (
            <Chip
              icon={<LockIcon />}
              label="Log In"
              variant="outlined"
              color="info"
            />
          ) : (
            <Chip
              icon={<FaceIcon />}
              label="Sign Up"
              variant="outlined"
              color="info"
            />
          )}
          <br />

          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        {checked ? <Login /> : <AuthContexProvider><SignUp/></AuthContexProvider>}
      </Paper>
    </div>
    </center>
  )
}

export default LsDisplay