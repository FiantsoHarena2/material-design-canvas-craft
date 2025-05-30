
import React from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface LevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 80 }}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="L1">L1</MenuItem>
        <MenuItem value="L2">L2</MenuItem>
        <MenuItem value="L3">L3</MenuItem>
      </Select>
    </FormControl>
  );
};
