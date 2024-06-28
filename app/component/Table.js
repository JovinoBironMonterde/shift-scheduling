"use client";
import React, { useState } from 'react';
import { Box, TableContainer, Table as MuiTable, TableBody, Paper } from '@mui/material';
import DateRangeCalendar from './DateRangeCalendar';
import Header from './Header';
import CustomTableRow from './TableRow';

function Table() {
    const [state, setState] = useState([
        {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
            key: 'selection'
        }
    ]);

    const handleDateChange = (item) => {
        setState([item.selection]);
    };

    const generateDayRange = () => {
        const start = state[0].startDate;
        const end = state[0].endDate;
        const dayRange = [];
        let current = new Date(start);
        
        while (current <= end) {
            dayRange.push({
                date: new Date(current),
                dayOfWeek: current.toLocaleString('default', { weekday: 'short' })
            });
            current.setDate(current.getDate() + 1);
        }
        return dayRange;
    };

    return (
        <Box>
            <DateRangeCalendar state={state} handleDateChange={handleDateChange} />
            <TableContainer component={Paper}>
                <MuiTable>
                    <Header dayRange={generateDayRange()} />
                    <TableBody>
                        <CustomTableRow dayRange={generateDayRange()} />
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </Box>
    );
}

export default Table;
