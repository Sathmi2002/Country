import React from 'react';
import { Globe } from 'lucide-react';

const RegionFilter = ({ onRegionChange, selectedRegion }) => {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleChange = (e) => {
    onRegionChange(e.target.value === 'All' ? '' : e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <select
        value={selectedRegion || 'All'}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none transition-all duration-300"
        data-testid="region-filter"
      >
        {regions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export default RegionFilter;