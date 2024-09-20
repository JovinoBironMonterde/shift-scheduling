import React from 'react';
import {
  TableRow,
  TableCell,
  Typography,
  Avatar,
  Box,
  Stack,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import ActionButton from './ActionButton'; // Import ActionButton
import rows from './RowsData';

const TableRowComponent = ({ dayRange }) => {
  // Track shift schedule for each row individually
  const [shiftSchedules, setShiftSchedules] = React.useState({});
  const [openActionButton, setOpenActionButton] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(null); // Track day index for duty update
  const [selectedRowName, setSelectedRowName] = React.useState('');
  const [selectedRowPosition, setSelectedRowPosition] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(''); // State to track selected value

  // Calculate the number of duties
  const countDuties = (duties) => duties.filter((duty) => duty === 'Duty').length;

  // Handle shift change for a specific row
  const handleShiftChange = (event, rowIndex) => {
    setShiftSchedules({
      ...shiftSchedules,
      [rowIndex]: event.target.value, // Set the value for the specific row
    });
  };

  // Styles for table cells
  const cellStyles = {
    fontSize: 16,
    letterSpacing: 1.5,
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    align: 'center',
  };

  // Handle opening ActionButton
  const handleClickOpenActionButton = (rowIndex, dayIndex) => {
    setOpenActionButton(true);
    setSelectedRow(rowIndex);
    setSelectedDayIndex(dayIndex);  // Store the day index
    setSelectedRowName(rows[rowIndex].name);
    setSelectedRowPosition(rows[rowIndex].position);
    setSelectedValue(rows[rowIndex].duties[dayIndex]);
  };

  // Handle saving selected value from ActionButton
  const handleSaveDuty = (newValue) => {
    const updatedRows = [...rows];
    updatedRows[selectedRow].duties[selectedDayIndex] = newValue;  // Update the specific duty for the row and day
    setSelectedValue(newValue);  // Optionally update the local state if needed
    setOpenActionButton(false);  // Close the ActionButton after save
  };

  // Handle action button close
  const handleCloseActionButton = () => {
    setOpenActionButton(false);
    setSelectedRow(null);
    setSelectedRowName('');
    setSelectedRowPosition('');
    setSelectedValue('');
    setSelectedDayIndex(null); // Reset the selected day index
  };

  // Get background color based on shift schedule
  const getBackgroundColor = (shift) => {
    if (shift === 'Evening Shift') return 'lightgray'; // Light gray for Evening Shift
    if (shift === 'Graveyard Shift') return 'gray'; // Gray for Graveyard Shift
    return 'white'; // Default background color
  };

  // Sort rows into different arrays based on the selected shift
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

  // Helper function to render rows
  const renderRows = (rowsToRender) =>
    rowsToRender.map((row, rowIndex) => (
      <TableRow
        key={rowIndex}
        sx={{
          backgroundColor: getBackgroundColor(shiftSchedules[rows.indexOf(row)]), // Apply background color
        }}
      >
        <TableCell sx={{ ...cellStyles, minWidth: 300, py: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt={row.name} src={row.profile} />
            <Box>
              <Typography sx={{ color: 'primary.dark' }}>{row.name}</Typography>
              <Typography sx={{ color: 'primary.dark' }}>{row.position}</Typography>
            </Box>
          </Stack>
        </TableCell>

        {/* Dynamic Shift Selection for each row */}
        <TableCell sx={{ ...cellStyles, minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              labelId={`select-shift-${rowIndex}`}
              id={`select-shift-${rowIndex}`}
              value={shiftSchedules[rows.indexOf(row)] || ''} // Default to empty if no shift selected
              onChange={(event) => handleShiftChange(event, rows.indexOf(row))}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Morning Shift">Morning Shift</MenuItem>
              <MenuItem value="Evening Shift">Evening Shift</MenuItem>
              <MenuItem value="Graveyard Shift">Graveyard Shift</MenuItem>
            </Select>
          </FormControl>
        </TableCell>

        {/* Duties for each day */}
        {dayRange.map((day, dayIndex) => (
          <TableCell
            key={dayIndex}
            sx={{ ...cellStyles, minWidth: 100 }}
            onClick={() => handleClickOpenActionButton(rowIndex, dayIndex)}
          >
            <Typography sx={{ textAlign: 'center', color: 'primary.dark' }}>
              {row.duties[dayIndex]}
            </Typography>
          </TableCell>
        ))}

        {/* Count Duties */}
        <TableCell sx={{ ...cellStyles, minWidth: 120 }}>
          <Typography sx={{ textAlign: 'center', color: 'secondary.main' }}>
            {countDuties(row.duties)}
          </Typography>
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      {/* Render categorized rows */}
      {renderRows(morningShiftRows)}
      {renderRows(eveningShiftRows)}
      {renderRows(graveyardShiftRows)}
      {renderRows(otherRows)}

      {/* Render ActionButton conditionally */}
      <ActionButton
        open={openActionButton && selectedRow !== null}
        handleClose={handleCloseActionButton}
        rowName={selectedRowName}
        rowPosition={selectedRowPosition}
        selectedValue={selectedValue}
        onSave={handleSaveDuty}  // Pass handleSaveDuty to ActionButton
      />
    </>
  );
};

export default TableRowComponent;
