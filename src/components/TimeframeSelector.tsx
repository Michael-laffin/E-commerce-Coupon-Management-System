import React from 'react';

interface TimeframeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

function TimeframeSelector({ value, onChange }: TimeframeSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );
}

export default TimeframeSelector;