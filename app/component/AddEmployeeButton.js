import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Box, TextField } from '@mui/material';
import CaptureImageModal from './CaptureImageModal'; // Import the CaptureImageModal

function AddEmployeeButton({ onAddEmployee }) {
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [openCaptureModal, setOpenCaptureModal] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleClickOpenAddEmployee = () => {
    setOpenAddEmployee(true);
  };

  const handleClose = () => {
    setOpenAddEmployee(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (name && position) {
      // If no image is provided, use initials
      const defaultAvatar = getInitials(name);
      const employeeImage = image || defaultAvatar;
      
      onAddEmployee(employeeImage, name, position); // Pass data back to parent

      // Reset the form after saving
      setName('');
      setPosition('');
      setImage(null);

      // Close the dialog
      handleClose();
    } else {
      alert('Please fill in the name and position fields.');
    }
  };

  const openCaptureModalHandler = () => {
    setOpenCaptureModal(true);
  };

  const closeCaptureModalHandler = () => {
    setOpenCaptureModal(false);
  };

  const handleCaptureImage = (capturedImage) => {
    setImage(capturedImage); // Store captured image
  };

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const namesArray = fullName.split(' ');
    const initials = namesArray.map((name) => name.charAt(0)).join('');
    return initials.toUpperCase();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpenAddEmployee}>
        Add Employee
      </Button>
      <Dialog
        open={openAddEmployee}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please fill out the form to add a new employee.
          </DialogContentText>

          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Box fullWidth>
              <Avatar
                alt="Employee Avatar"
                src={image || undefined} // If image is not uploaded, no image is displayed
                sx={{ width: 200, height: 200, mx: 'auto', fontSize: 60, backgroundColor: '#2196f3' }}
              >
                {!image && getInitials(name)} {/* Show initials if no image */}
              </Avatar>
            </Box>
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            <Button variant="contained" onClick={openCaptureModalHandler}>
              Capture Image
            </Button>

            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Capture Image Modal */}
      <CaptureImageModal
        open={openCaptureModal}
        onClose={closeCaptureModalHandler}
        onCapture={handleCaptureImage}
      />
    </div>
  );
}

export default AddEmployeeButton;
