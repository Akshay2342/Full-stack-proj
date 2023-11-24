import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const StyledFormContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const StyledForm = styled('form')({
  width: '400px',
  padding: '16px',
  borderRadius: '8px',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
});

const ChangePasswordForm = ({ open, onClose, u }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { update, currentUser } = useContext(AuthContext);

  const handlePasswordChange = async () => {
    // Handle password change logic here
    // You may want to add validation and communication with your backend
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', currentUser);

    if (oldPassword === newPassword) {
      alert('password cannot be the same as old');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('password mismatch')
      return;
    } 
  
    const inputs = {
      username: currentUser?.username,
      password: confirmPassword
    }
    const res = await update(inputs)

    // Reset the form
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePasswordChange} color="primary">
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProfileForm = () => {

  const navigate = useNavigate();

  const { currentUser, update } = useContext(AuthContext)

  const [nicknameInput, setNickNameInput] = useState(currentUser?.name);
  const [firstnameInput, setFirstName] = useState(currentUser?.firstname);
  const [lastnameInput, setLastName] = useState(currentUser?.lastname);
  
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);

  const handleOpenChangePasswordDialog = () => {
    setChangePasswordDialogOpen(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setChangePasswordDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputs = {
      username: currentUser?.username,
      name: nicknameInput,
      firstname: firstnameInput,
      lastname: lastnameInput
    }
    const res = await update(inputs)
    // Handle form submission logic here
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);



  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        {/* ... (other form fields) */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label htmlFor="nickname">Nickname</label>
            <TextField
              id="nickname"
              variant="outlined"
              fullWidth
              required
              value={nicknameInput}
              onChange={(event) => {
                setNickNameInput(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="firstName">First Name</label>
            <TextField
              id="firstName"
              variant="outlined"
              fullWidth
              required
              value={firstnameInput}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="lastName">Last Name</label>
            <TextField
              id="lastName"
              variant="outlined"
              fullWidth
              required
              value={lastnameInput}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </Grid>
        </Grid>
        <StyledButton type="submit" variant="contained" color="primary" style={{ margin: 20 }}>
          Update Profile
        </StyledButton>
        <StyledButton type="submit" variant="contained" color="primary" style={{ margin: 20 }} onClick={handleOpenChangePasswordDialog}>
          Change Password
        </StyledButton>
      </StyledForm>
      <ChangePasswordForm open={changePasswordDialogOpen} onClose={handleCloseChangePasswordDialog} />
    </StyledFormContainer>
          
  );
};

export default ProfileForm;
