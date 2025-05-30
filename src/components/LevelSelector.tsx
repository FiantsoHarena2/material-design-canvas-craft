
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white z-50">
        <SelectItem value="L1">L1</SelectItem>
        <SelectItem value="L2">L2</SelectItem>
        <SelectItem value="L3">L3</SelectItem>
      </SelectContent>
    </Select>
  );
};
