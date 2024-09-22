"use client";
import React, { useState, useEffect } from 'react';
import { Box, TableContainer, Table as MuiTable, TableBody, Paper, TableHead, Grid } from '@mui/material';
import DateRangeCalendar from './DateRangeCalendar';
import Header from './Header';
import CustomTableRow from './TableRow';
import GenerateButton from './GenerateButton';
import initialRows from './RowsData'; // Assuming this is defined

function Table() {
    const today = new Date();
    const defaultStartDate = today;
    const defaultEndDate = new Date(today);
    defaultEndDate.setDate(today.getDate() + 15);

    const [state, setState] = useState([
        {
            startDate: defaultStartDate,
            endDate: defaultEndDate,
            key: 'selection'
        }
    ]);

    const [dayRange, setDayRange] = useState([]);
    const [rows, setRows] = useState(initialRows); // Initialize with employee data
    const [selectedCells, setSelectedCells] = useState([]); // Track selected cells

    const handleDateChange = (item) => {
        setState([item.selection]);
    };

    useEffect(() => {
        const generateDayRange = () => {
            const start = state[0].startDate;
            const end = state[0].endDate;
            const range = [];
            let current = new Date(start);

            while (current <= end) {
                range.push({
                    date: new Date(current),
                    dayOfWeek: current.toLocaleString('default', { weekday: 'short' })
                });
                current.setDate(current.getDate() + 1);
            }
            return range;
        };

        setDayRange(generateDayRange());
    }, [state]);

    const assignDutyToSelectedCells = () => {
        const updatedRows = [...rows];
        selectedCells.forEach(({ rowName }) => {
            const rowIndex = updatedRows.findIndex((row) => row.name === rowName);
            if (rowIndex !== -1) {
                // Set all duties to "Duty" for the selected cells
                const duties = updatedRows[rowIndex].duties.map((duty, index) =>
                    selectedCells.some(cell => cell.rowName === rowName && cell.dayIndex === index) ? 'Duty' : duty
                );
                updatedRows[rowIndex].duties = duties;
            }
        });
        setRows(updatedRows);
        setSelectedCells([]); // Clear selected cells after assignment
    };

    const onAssignDuty = () => {
        const updatedRows = [...rows];
    
        selectedCells.forEach(({ rowName, dayIndex }) => {
          const rowIndex = updatedRows.findIndex((row) => row.name === rowName);
          if (rowIndex !== -1) {
            updatedRows[rowIndex].duties[dayIndex] = 'Duty'; // Assign "Duty" to the selected cell
          }
        });
    
        setRows(updatedRows);
        setSelectedCells([]); // Clear selected cells after assigning duty
      };



    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <DateRangeCalendar handleDateChange={handleDateChange} />
                    </Grid>
                    <Grid item xs={6} md={4} textAlign={'right'}>
                        <GenerateButton onAssignDuty={assignDutyToSelectedCells} />
                    </Grid>
                </Grid>
            </Box>
           
            <TableContainer component={Paper}>
                <MuiTable>
                    <TableHead>
                        <Header dayRange={dayRange} />
                    </TableHead>
                    <TableBody>
                        <CustomTableRow 
                            dayRange={dayRange} 
                            rows={rows} 
                            setSelectedCells={setSelectedCells} // Pass down the function to manage selected cells
                            selectedCells={selectedCells} // Pass the selectedCells array
                            // setSelectedCells={setSelectedCells} // Pass the function to update selectedCells
                        />
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </Box>
    );
}

export default Table;
