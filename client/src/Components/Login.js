import React, { useState,useContext } from "react";
// import axios from "axios";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
} from "@mui/material";
import { AuthContext } from "../context/authContext.js";
import {useNavigate} from 'react-router-dom';


// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Email Validation
const isEmail = (email) =>{
  if(email.length!==0){
    return true;
  }
  else{
    return false;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const { login,currentUser } = useContext(AuthContext);
  
  //Inputs
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState();
  
  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();
  const [failure, setFailure] = useState();
  
  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    
    setEmailError(false);
  };
  
  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
      ) {
        setPasswordError(true);
        return;
      }
      
      setPasswordError(false);
    };
    
    const [inputs,setInputs]=useState({
      username:"",
      password:""
    })
    
    const handleChange=(e)=>{
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    //handle Submittion
    const handleSubmit = async (e) => {
    setSuccess(null);
    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    e.preventDefault();

    try {
       const res =  await login(inputs)
      //  setCurrentUser(res.data.user)
      setSuccess("Login Successful");
 navigate("/");
      } catch (err) {
        console.log(err.response.data);
        //console.log(err.response.data);
      }

    if(!currentUser){
      setFailure("User Not Found")
      return;
    }
    setFormValid(null);

    // Proceed to use the information passed
    // console.log("username : " + currentuser);
    // console.log("Password : " + passwordInput);
    // console.log("Remember : " + rememberMe);

    //Show Successfull Submittion
    
    if(success === "Login Successful"){
      setTimeout(() => {
      // navigate("/");
      }, 100); 
    }
  }; 
  
  // console.log(inputs);
  return (
    <div>
      <div style={{ marginTop: "25px" }}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          error={emailError}
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          value={emailInput}
          InputProps={{}}
          size="small"
         onBlur={handleEmail}
          onChange={(event) => {
            handleChange(event);
            setEmailInput(event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel
            error={passwordError}
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Input
            error={passwordError}
            name="password"
            onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => {
                handleChange(event);
              setPasswordInput(event.target.value);
            }}
            value={passwordInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div style={{ fontSize: "10px" }}>
        <Checkbox
          {...label}
          size="small"
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        Remember Me
      </div>

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          LOGIN
        </Button>
      </div>

      {/* Show Form Error if any */}
      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
          </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small"> 
            {success}
          </Alert>
        </Stack>
      )}
      {failure && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small"> 
            {failure}
          </Alert>
        </Stack>
      )}
    </div>
  );
}


