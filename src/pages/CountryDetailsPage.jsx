import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Globe, Users, MapPin, ExternalLink } from 'lucide-react';
import { getCountryByCode } from '../api/countriesAPI';
import { AuthContext } from '../context/AuthContext';

const CountryDetailsPage = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, addToFavorites, removeFromFavorites, isInFavorites } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(countryCode);
        setCountry(data);
      } catch (error) {
        setError('Failed to fetch country details. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    if (!user) return;
    
    if (isInFavorites(country.cca3)) {
      removeFromFavorites(country.cca3);
    } else {
      addToFavorites(country);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error || 'Country not found'}</p>
        <button 
          onClick={handleBack} 
          className="mt-6 flex items-center justify-center mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  // Format languages for display
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  
  // Format currencies for display
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ') 
    : 'N/A';
  
  // Format borders for display
  const borders = country.borders ? country.borders.join(', ') : 'None';

  const isFavorite = user && isInFavorites(country.cca3);

  return (
    <div className="animate-fadeIn">
      <button 
        onClick={handleBack} 
        className="mb-8 flex items-center px-6 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-md transition duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img 
            src={country.flags.svg} 
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
          
          {user && (
            <button 
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 p-3 rounded-full ${
                isFavorite 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              } hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-300 transition-colors shadow-md`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">{country.name.common}</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {country.name.official !== country.name.common && (
                <p className="mb-1">Official: {country.name.official}</p>
              )}
              <p>Alpha-3 code: {country.cca3}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium">Capital</p>
                    <p>{country.capital ? country.capital.join(', ') : 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium">Region</p>
                    <p>{country.region} {country.subregion && `(${country.subregion})`}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium">Population</p>
                    <p>{country.population.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-4">Languages & Currency</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Languages</p>
                  <p>{languages}</p>
                </div>
                <div>
                  <p className="font-medium">Currencies</p>
                  <p>{currencies}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Top Level Domain</p>
                  <p>{country.tld ? country.tld.join(', ') : 'N/A'}</p>
                </div>
                <div>
                  <p className="font-medium">Border Countries</p>
                  <p>{borders}</p>
                </div>
                <div>
                  <p className="font-medium">Independent</p>
                  <p>{country.independent ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="font-medium">UN Member</p>
                  <p>{country.unMember ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="font-medium">Timezones</p>
                  <p>{country.timezones ? country.timezones.join(', ') : 'N/A'}</p>
                </div>
              </div>

              {country.maps && country.maps.googleMaps && (
                <div className="mt-6">
                  <a 
                    href={country.maps.googleMaps} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsPage;