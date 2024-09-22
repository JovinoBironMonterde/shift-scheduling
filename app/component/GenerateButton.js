import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DutyIcon from '@mui/icons-material/Assignment';
import MorningOffIcon from '@mui/icons-material/WbSunny';
import EveningOffIcon from '@mui/icons-material/NightsStay';
import GraveyardOffIcon from '@mui/icons-material/RemoveCircle';

const GenerateButton = ({ onAssignDuty }) => {
  return (
    <div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button sx={{ textTransform: 'capitalize' }} startIcon={<DutyIcon />} onClick={onAssignDuty}>
          Assign Duty
        </Button>
        <Button sx={{ textTransform: 'capitalize' }} startIcon={<MorningOffIcon />}>
          Morning Off
        </Button>
        <Button sx={{ textTransform: 'capitalize' }} startIcon={<EveningOffIcon />}>
          Evening Off
        </Button>
        <Button sx={{ textTransform: 'capitalize' }} startIcon={<GraveyardOffIcon />}>
          Graveyard Off
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default GenerateButton;
