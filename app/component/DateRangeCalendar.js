import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Import CalendarMonthIcon from MUI icons

function DateRangeCalendar({ handleDateChange }) {
    const [open, setOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState(null); // State to hold selected dates

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getDefaultDateRange = () => {
        const currentDate = new Date();
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of the current month
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 15); // 15 days before the end date

        return [
            {
                startDate: startDate,
                endDate: endDate,
                key: 'selection'
            }
        ];
    };

    useEffect(() => {
        const defaultDateRange = getDefaultDateRange();
        setSelectedDates(defaultDateRange[0]);
        handleDateChange({ selection: defaultDateRange[0] });
    }, []); // Run this effect only once on component mount

    const handleSelect = (ranges) => {
        setSelectedDates(ranges.selection); // Update selected dates state
        handleDateChange(ranges);
    };

    return (
        <Box>
            <Box sx={{display: 'flex', alignItems: 'center', mb:1}}>
                <Button sx={{px:0, minWidth: '40px'}} onClick={handleClickOpen}>
                  <CalendarMonthIcon sx={{ color: 'primary.main', cursor: 'pointer' }} />
                </Button>
                {selectedDates && (
                    <>
                        <Typography sx={{ color: 'primary.dark' }}>{selectedDates.startDate.toDateString()}</Typography>
                        <Typography sx={{ color: 'primary.dark', mx:4 }}>-</Typography>
                        <Typography sx={{ color: 'primary.dark' }}>{selectedDates.endDate.toDateString()}</Typography>
                    </>
                )}
            </Box>
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
                            onChange={handleSelect}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={[selectedDates]}
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
