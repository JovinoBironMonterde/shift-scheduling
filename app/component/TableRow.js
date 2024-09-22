import React, { useState } from 'react';
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
import ActionButton from './ActionButton';
import initialRows from './RowsData';
import AddEmployeeButton from './AddEmployeeButton';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const TableRowComponent = ({ dayRange }) => {
  const [shiftSchedules, setShiftSchedules] = useState({});
  const [openActionButton, setOpenActionButton] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedRowName, setSelectedRowName] = useState('');
  const [selectedRowPosition, setSelectedRowPosition] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [rows, setRows] = useState(initialRows);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]); // Track selected cells

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
    const updatedRows = [...rows];
    selectedCells.forEach(({ rowName, dayIndex }) => {
      const rowIndex = updatedRows.findIndex((row) => row.name === rowName);
      const updatedRow = { ...updatedRows[rowIndex] };
      updatedRow.duties[dayIndex] = newValue; // Apply the new value from ToggleButton to selected cells
      updatedRows[rowIndex] = updatedRow;
    });

    setRows(updatedRows);
    setOpenActionButton(false);
    setSelectedCells([]); // Clear selected cells after saving
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

  // Track dragging start
  const handleMouseDown = (rowName, dayIndex) => {
    setIsDragging(true);
    setSelectedCells([{ rowName, dayIndex }]); // Start with the first selected cell
  };

  // Track dragging over cells
  const handleMouseEnter = (rowName, dayIndex) => {
    if (isDragging) {
      setSelectedCells((prevSelectedCells) => {
        if (!prevSelectedCells.some((cell) => cell.rowName === rowName && cell.dayIndex === dayIndex)) {
          return [...prevSelectedCells, { rowName, dayIndex }];
        }
        return prevSelectedCells;
      });
    }
  };

  // Stop dragging and open ActionButton
  const handleMouseUp = () => {
    setIsDragging(false);
    if (selectedCells.length > 0) {
      const firstSelectedCell = selectedCells[0];
      handleClickOpenActionButton(firstSelectedCell.rowName, firstSelectedCell.dayIndex);
    }
  };

  // Check if a cell is selected
  const isCellSelected = (rowName, dayIndex) => {
    return selectedCells.some((cell) => cell.rowName === rowName && cell.dayIndex === dayIndex);
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
    rowsToRender.map((row) => (
      <TableRow
        key={row.name}
        sx={{
          backgroundColor: getBackgroundColor(shiftSchedules[rows.indexOf(row)]),
        }}
      >
        <TableCell sx={{ minWidth: 300, py: 0, borderRight: '1px solid #e0e0e0',  userSelect: 'none'}}>
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
            sx={{ fontSize: 14, userSelect: 'none' }}
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
              backgroundColor: isCellSelected(row.name, dayIndex) ? 'lightblue' : 'white',
              '&:hover': {
                backgroundColor: 'lightblue',
              },
              cursor: 'pointer',
              borderRight: '1px solid #e0e0e0',
              userSelect: 'none' 
            }}
            onMouseDown={() => handleMouseDown(row.name, dayIndex)}
            onMouseEnter={() => handleMouseEnter(row.name, dayIndex)}
            onMouseUp={handleMouseUp}
          >
            <Typography sx={{ textAlign: 'center', color: 'primary.dark' }}>
              {row.duties[dayIndex]}
            </Typography>
          </TableCell>
        ))}

        <TableCell sx={{ minWidth: 120, borderRight: '1px solid #e0e0e0', userSelect: 'none'  }}>
          <Typography sx={{ textAlign: 'center', color: 'secondary.main' }}>
            {countDuties(row.duties)}
          </Typography>
        </TableCell>

        {/* Delete row */}
        <TableCell>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => handleDeleteRow(rows.indexOf(row))} // Call the delete function
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
        selectedValue={selectedValue}
        onSave={handleSaveDuty} // Pass selected value back to the table component
      />
    </>
  );
};

export default TableRowComponent;
