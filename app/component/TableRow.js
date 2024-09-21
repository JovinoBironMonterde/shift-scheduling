import React from 'react';
import {
  TableRow,
  TableCell,
  Typography,
  Avatar,
  Box,
  Stack,
  MenuItem,
  Select,
} from '@mui/material';
import ActionButton from './ActionButton'; // Import ActionButton
import initialRows from './RowsData'; // Assuming you are importing the initial rows data from RowsData
import AddEmployeeButton from './AddEmployeeButton';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const TableRowComponent = ({ dayRange }) => {
  const [shiftSchedules, setShiftSchedules] = React.useState({});
  const [openActionButton, setOpenActionButton] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(null); 
  const [selectedRowName, setSelectedRowName] = React.useState('');
  const [selectedRowPosition, setSelectedRowPosition] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(''); 
  const [rows, setRows] = React.useState(initialRows); 

  // Add a new employee to the list of rows
  const handleAddEmployee = (profile, name, position) => {
    const newEmployee = {
      profile,
      name,
      position,
      duties: Array(dayRange.length).fill(''), // Initialize duties with empty values for each day
    };
    setRows([...rows, newEmployee]); // Add the new employee to the rows state
  };

  // Handle deleting a row by filtering it out from the rows array
  const handleDeleteRow = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows); // Update the rows state with the remaining rows
  };

  // Calculate the number of duties
  const countDuties = (duties) => duties.filter((duty) => duty === 'Duty').length;

  // Handle shift change for a specific row
  const handleShiftChange = (event, rowIndex) => {
    setShiftSchedules({
      ...shiftSchedules,
      [rowIndex]: event.target.value,
    });
  };

  // Open the ActionButton based on the row and day
  const handleClickOpenActionButton = (name, dayIndex) => {
    const selectedRow = rows.find((row) => row.name === name);

    if (selectedRow) {
      setOpenActionButton(true);
      setSelectedRow(name);
      setSelectedDayIndex(dayIndex);
      setSelectedRowName(selectedRow.name);
      setSelectedRowPosition(selectedRow.position);
      setSelectedValue(selectedRow.duties[dayIndex]);
    }
  };

  // Handle saving selected value from ActionButton
  const handleSaveDuty = (newValue) => {
    const rowIndex = rows.findIndex((row) => row.name === selectedRow);

    if (rowIndex !== -1) {
      const updatedRows = [...rows];
      const updatedRow = { ...updatedRows[rowIndex] };
      updatedRow.duties = [...updatedRow.duties];
      updatedRow.duties[selectedDayIndex] = newValue; // Update duty for the selected day

      updatedRows[rowIndex] = updatedRow;

      setRows(updatedRows);
      setOpenActionButton(false);
    }
  };

  // Handle closing the ActionButton
  const handleCloseActionButton = () => {
    setOpenActionButton(false);
    setSelectedRow(null);
    setSelectedRowName('');
    setSelectedRowPosition('');
    setSelectedValue('');
    setSelectedDayIndex(null);
  };

  const getBackgroundColor = (shift) => {
    if (shift === 'Evening Shift') return 'lightgray';
    if (shift === 'Graveyard Shift') return 'gray';
    return 'white';
  };

  const morningShiftRows = [];
  const eveningShiftRows = [];
  const graveyardShiftRows = [];
  const otherRows = [];

  rows.forEach((row, rowIndex) => {
    const selectedShift = shiftSchedules[rowIndex] || '';

    if (selectedShift === 'Morning Shift') {
      morningShiftRows.push(row);
    } else if (selectedShift === 'Evening Shift') {
      eveningShiftRows.push(row);
    } else if (selectedShift === 'Graveyard Shift') {
      graveyardShiftRows.push(row);
    } else {
      otherRows.push(row);
    }
  });

  const renderRows = (rowsToRender) =>
    rowsToRender.map((row, rowIndex) => (
      <TableRow
        key={rowIndex}
        sx={{
          backgroundColor: getBackgroundColor(shiftSchedules[rows.indexOf(row)]),
        }}
      >
        <TableCell sx={{ minWidth: 300, py: 0, borderRight: '1px solid #e0e0e0' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt={row.name} src={row.profile} />
            <Box>
              <Typography sx={{ color: 'primary.dark' }}>{row.name}</Typography>
              <Typography sx={{ color: 'primary.dark' }}>{row.position}</Typography>
            </Box>
          </Stack>
        </TableCell>

        <TableCell sx={{ minWidth: 120, px: 2, py: 0, borderRight: '1px solid #e0e0e0' }}>
          <Select
            sx={{ fontSize: 14 }}
            displayEmpty
            value={shiftSchedules[rows.indexOf(row)] || ''}
            onChange={(event) => handleShiftChange(event, rows.indexOf(row))}
            renderValue={(selected) => {
              if (selected === '') {
                return <em>Select Shift</em>;
              }
              return selected;
            }}
          >
            <MenuItem disabled sx={{ fontSize: 14 }} value="">
              <em>Select Shift</em>
            </MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value="Morning Shift">Morning Shift</MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value="Evening Shift">Evening Shift</MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value="Graveyard Shift">Graveyard Shift</MenuItem>
          </Select>
        </TableCell>

        {dayRange.map((day, dayIndex) => (
          <TableCell
            key={dayIndex}
            sx={{
              minWidth: 100,
              '&:hover': {
                backgroundColor: 'lightblue',
              },
              cursor: 'pointer', borderRight: '1px solid #e0e0e0'
            }}
            onClick={() => handleClickOpenActionButton(row.name, dayIndex)}
          >
            <Typography sx={{ textAlign: 'center', color: 'primary.dark' }}>
              {row.duties[dayIndex]}
            </Typography>
          </TableCell>
        ))}

        <TableCell sx={{ minWidth: 120, borderRight: '1px solid #e0e0e0' }}>
          <Typography sx={{ textAlign: 'center', color: 'secondary.main' }}>
            {countDuties(row.duties)}
          </Typography>
        </TableCell>

        {/* Delete row */}
        <TableCell>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => handleDeleteRow(rowIndex)} // Call the delete function
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      {renderRows(morningShiftRows)}
      {renderRows(eveningShiftRows)}
      {renderRows(graveyardShiftRows)}
      {renderRows(otherRows)}

      <TableRow>
        <TableCell colSpan={dayRange.length + 2}>
          <AddEmployeeButton
            onAddEmployee={handleAddEmployee}
            existingEmployeeNames={rows.map(employee => employee.name)}
          />
        </TableCell>
      </TableRow>

      <ActionButton
        open={openActionButton && selectedRow !== null}
        handleClose={handleCloseActionButton}
        rowName={selectedRowName}
        rowPosition={selectedRowPosition}
        selectedValue={selectedValue}
        onSave={handleSaveDuty}
      />
    </>
  );
};

export default TableRowComponent;
