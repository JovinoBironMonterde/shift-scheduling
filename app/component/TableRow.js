import React from 'react';
import {
  TableRow,
  TableCell,
  Typography,
  Avatar,
  Box,
  Stack
} from '@mui/material';
import ActionButton from './ActionButton'; // Import ActionButton

import rows from './RowsData';

const TableRowComponent = ({ dayRange }) => {
  const [openActionButton, setOpenActionButton] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedRowName, setSelectedRowName] = React.useState('');
  const [selectedRowPosition, setSelectedRowPosition] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(''); // State to track selected value

  const countDuties = (duties) => duties.filter(duty => duty === "Duty").length;

  const cellStyles = {
    fontSize: 16,
    letterSpacing: 1.5,
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    align: 'center'
  };

  const handleClickOpenActionButton = (rowIndex, dutyIndex) => {
    setOpenActionButton(true);
    setSelectedRow(rowIndex);
    setSelectedRowName(rows[rowIndex].name);
    setSelectedRowPosition(rows[rowIndex].position);
    setSelectedValue(rows[rowIndex].duties[dutyIndex]);
  };

  const handleCloseActionButton = () => {
    setOpenActionButton(false);
    setSelectedRow(null);
    setSelectedRowName('');
    setSelectedRowPosition('');
    setSelectedValue('');
  };

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  return (
    <>
      {rows.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          <TableCell sx={{ ...cellStyles, minWidth: 300, py: 0 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar alt={row.name} src={row.profile} />
              <Box>
                <Typography sx={{ color: 'primary.dark' }}>{row.name}</Typography>
                <Typography sx={{ color: 'primary.dark' }}>{row.position}</Typography>
              </Box>
            </Stack>
          </TableCell>
          <TableCell sx={{ ...cellStyles, minWidth: 120 }}>
            <Typography sx={{ textAlign: 'center', color: 'secondary.main' }}>
              dfdf
            </Typography>
          </TableCell>
          {dayRange.map((day, dayIndex) => (
            <TableCell key={dayIndex} sx={{ ...cellStyles, minWidth: 100 }} onClick={() => handleClickOpenActionButton(rowIndex, dayIndex)}>
              <Typography sx={{ textAlign: 'center', color: 'primary.dark' }}>{row.duties[dayIndex]}</Typography>
            </TableCell>
          ))}
          <TableCell sx={{ ...cellStyles, minWidth: 120 }}>
            <Typography sx={{ textAlign: 'center', color: 'secondary.main' }}>
              {countDuties(row.duties)}
            </Typography>
          </TableCell>
        </TableRow>
      ))}

      {/* Render ActionButton conditionally */}
      <ActionButton
        open={openActionButton && selectedRow !== null}
        handleClose={handleCloseActionButton}
        rowName={selectedRowName}
        rowPosition={selectedRowPosition}
        selectedValue={selectedValue}
      />
    </>
  );
};

export default TableRowComponent;
