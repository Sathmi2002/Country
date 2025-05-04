import React, { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';

const LanguageFilter = ({ countries, onLanguageChange, selectedLanguage }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (countries.length > 0) {
      // Extract all unique languages from countries
      const allLanguages = new Set();
      countries.forEach(country => {
        if (country.languages) {
          Object.values(country.languages).forEach(language => {
            allLanguages.add(language);
          });
        }
      });
      
      // Convert to array and sort alphabetically
      setLanguages(['All', ...Array.from(allLanguages).sort()]);
    }
  }, [countries]);

  const handleChange = (e) => {
    onLanguageChange(e.target.value === 'All' ? '' : e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Languages className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <select
        value={selectedLanguage || 'All'}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none transition-all duration-300"
        data-testid="language-filter"
        disabled={languages.length <= 1}
      >
        {languages.length > 0 ? (
          languages.map(language => (
            <option key={language} value={language}>{language}</option>
          ))
        ) : (
          <option value="All">Loading languages...</option>
        )}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export default LanguageFilter;