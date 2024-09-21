import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

const Header = ({ dayRange }) => {
    return (
        <TableRow>
            <TableCell align="center" sx={{ fontSize: 16, color: "text.secondary", letterSpacing: 1.5, minWidth: 300, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
            <TableCell align="center" sx={{ fontSize: 16, color: "text.secondary", letterSpacing: 1.5, minWidth: 100, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Shift</TableCell>
            {dayRange.map(day => (
                <React.Fragment key={day.date.toString()}>
                    <TableCell align="center" sx={{ p: 0, minWidth: 100, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                        <Typography sx={{ p: 2, fontSize: 16, color: "text.secondary", letterSpacing: 1.5 }}>{day.date.getDate()}</Typography>
                        <Typography sx={{ p: 1, fontSize: 14, color: "text.secondary", letterSpacing: 1.5, backgroundColor: "rgba(224, 224, 224, 1)" }}>{day.dayOfWeek}</Typography>
                    </TableCell>
                </React.Fragment>
            ))}
            <TableCell align="center" sx={{ minWidth: 120, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Total of duty</TableCell>
            <TableCell>Action</TableCell>
        </TableRow>
    );
};

export default Header;
