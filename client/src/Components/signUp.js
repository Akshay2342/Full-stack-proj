
import React, { useState } from "react";
import axios from "axios";
// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
  Stack,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Validations

// Email Validation
const isEmail = (email) =>
 {
  if(email.length!==0) return true;
  else return false;
 }
export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);

  //Inputs
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [firstnameInput, setFirstName] = useState();
  const [lastnameInput, setLastName] = useState();

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLAstNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Username
  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true);
      return;
    }

    setUsernameError(false);
  };

  const handleFirstName = () => {
    if (!firstnameInput) {
      setFirstNameError(true);
      return;
    }

    setFirstNameError(false);
  };

  const handleLastName = () => {
    if (!lastnameInput) {
      setLAstNameError(true);
      return;
    }

    setLAstNameError(false);
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput));
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

  //handle Submittion
  const handleSubmit = async (e) => {
    setSuccess(null);
    e.preventDefault();
    //First of all Check for Errors
    try{
        await axios.post("http://localhost:5000/api/user/signup",{
        nickname:usernameInput,     
        username : emailInput,
        password : passwordInput,
        firstname: firstnameInput,
        lastname: lastnameInput,
      })
      .then(res=>{
        if(res.data==="exist"){
          alert('account already exists...');
        }
        else if(res.data==="not exist"){
          alert('account created successfully..');
        }
      })
      .catch(e=>{
        alert("error..");
        console.log(e);
      })
      }
      catch(err){
        console.log(err);
      }
    // IF username error is true
    if (usernameError || !usernameInput) {
      setFormValid(
        "Username is set btw 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);

    // Proceed to use the information passed
    console.log("Username : " + usernameInput);
    console.log("Email : " + emailInput);
    console.log("Password : " + passwordInput);

    //Show Successfull Submittion
    setSuccess("Registered Successfully");
  };

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          error={firstNameError}
          name="firstname"
          label="First name"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={firstnameInput}
          InputProps={{}}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          onBlur={handleFirstName}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
      <TextField
          error={lastNameError}
          name="lastname"
          label="Last name"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={lastnameInput}
          InputProps={{}}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          onBlur={handleLastName}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          error={usernameError}
          label="Nickname"
          name="nickname"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={usernameInput}
          InputProps={{}}
          onChange={(event) => {
            setUsernameInput(event.target.value);
          }}
          onBlur={handleUsername}
        />
      </div>

      <div style={{ marginTop: "5px" }}>
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

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          SignUp
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
    </div>
  );
}