import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';

function ActionButton({ open, handleClose, rowName, rowPosition, selectedValue }) {
  const [alignment, setAlignment] = React.useState(selectedValue);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Choose Action for {rowName}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography sx={{ color: 'primary.dark' }}>Position: {rowPosition}</Typography>

          Select the duty type:
        </DialogContentText>

        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Duty">Duty</ToggleButton>
          <ToggleButton value="Rest day">Rest Day</ToggleButton>
          <ToggleButton value="Leave">Leave</ToggleButton>
        </ToggleButtonGroup>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ActionButton;
