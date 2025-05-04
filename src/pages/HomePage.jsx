import React, { useState, useEffect, useCallback } from 'react';
import CountryList from '../components/countries/CountryList';
import CountrySearch from '../components/countries/CountrySearch';
import RegionFilter from '../components/countries/RegionFilter';
import LanguageFilter from '../components/countries/LanguageFilter';
import { getAllCountries, searchCountriesByName, getCountriesByRegion } from '../api/countriesAPI';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');

  // Fetch all countries on initial load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        setError('Failed to fetch countries. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Apply filters when search, region, or language changes
  const applyFilters = useCallback(() => {
    if (!countries.length) return;

    let result = [...countries];

    // Filter by language if selected
    if (language) {
      result = result.filter(country => 
        country.languages && 
        Object.values(country.languages).some(lang => 
          lang.toLowerCase() === language.toLowerCase()
        )
      );
    }

    setFilteredCountries(result);
  }, [countries, language]);

  // Handle search by name
  const handleSearch = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    
    try {
      let data;
      if (term.trim() === '') {
        // If search is cleared, load all countries or filter by region if selected
        if (region) {
          data = await getCountriesByRegion(region);
        } else {
          data = await getAllCountries();
        }
      } else {
        // Search by name
        data = await searchCountriesByName(term);
        
        // Apply region filter if selected
        if (region && data.length > 0) {
          data = data.filter(country => country.region === region);
        }
      }
      
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      setError('Failed to search countries. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle region change
  const handleRegionChange = async (selectedRegion) => {
    setRegion(selectedRegion);
    setLoading(true);
    
    try {
      let data;
      if (selectedRegion) {
        data = await getCountriesByRegion(selectedRegion);
        
        // Apply search filter if exists
        if (searchTerm.trim() !== '') {
          data = data.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      } else if (searchTerm.trim() !== '') {
        // If region is cleared but search exists
        data = await searchCountriesByName(searchTerm);
      } else {
        // If both region and search are cleared
        data = await getAllCountries();
      }
      
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      setError('Failed to filter countries. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  // Apply language filter when it changes
  useEffect(() => {
    applyFilters();
  }, [language, applyFilters]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Explore Countries</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-1">
            <CountrySearch onSearch={handleSearch} />
          </div>
          <div>
            <RegionFilter onRegionChange={handleRegionChange} selectedRegion={region} />
          </div>
          <div>
            <LanguageFilter 
              countries={countries} 
              onLanguageChange={handleLanguageChange} 
              selectedLanguage={language} 
            />
          </div>
        </div>
      </div>
      
      <CountryList 
        countries={filteredCountries} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default HomePage;