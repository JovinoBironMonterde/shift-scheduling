import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import rows from './RowsData';

const TableRowComponent = ({ dayRange }) => {
    return (
        <>
            {rows.map((row, index) => (
                <TableRow key={index}>
                    <TableCell align="center" sx={{ fontSize: 16, color: "text.secondary", letterSpacing: 1.5, minWidth: 300, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                        {row.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 16, color: "text.secondary", letterSpacing: 1.5, minWidth: 100, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Shift</TableCell>
                    {dayRange.map((day, index) => (
                        <TableCell key={index} align="center" sx={{ fontSize: 16, color: "text.secondary", letterSpacing: 1.5, minWidth: 100, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                            Duty
                        </TableCell>
                    ))}
                    <TableCell align="center" sx={{ minWidth: 120, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Total of duty</TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default TableRowComponent;
