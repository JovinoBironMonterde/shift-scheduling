"use client";
import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DateRangeCalendar({ state, handleDateChange }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open Date Range Picker
            </Button>
            <Dialog fullWidth open={open} onClose={handleClose} maxWidth='md'>
                <DialogTitle id="date-range-dialog-title">
                    Select Date Range
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="date-range-dialog-description">
                        Choose the start and end date for your range.
                    </DialogContentText>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <DateRange
                            onChange={handleDateChange}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={state}
                            direction="horizontal"
                            preventSnapRefocus={true}
                            calendarFocus="backwards"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default DateRangeCalendar;
