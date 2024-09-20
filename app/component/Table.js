"use client"
import React, { useState, useEffect } from 'react';
import { Box, TableContainer, Table as MuiTable, TableBody, Paper, TableHead } from '@mui/material';
import DateRangeCalendar from './DateRangeCalendar';
import Header from './Header';
import CustomTableRow from './TableRow';

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

    

    return (
        <Box>
            <DateRangeCalendar handleDateChange={handleDateChange} />
            <TableContainer component={Paper}>
                <MuiTable>
                    <TableHead>
                        <Header dayRange={dayRange} />
                    </TableHead>
                    <TableBody>
                        <CustomTableRow dayRange={dayRange} />
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </Box>
    );
}

export default Table;
