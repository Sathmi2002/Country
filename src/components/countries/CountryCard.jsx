import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const CountryCard = ({ country }) => {
  const { user, addToFavorites, removeFromFavorites, isInFavorites } = useContext(AuthContext);
  const isFavorite = user && isInFavorites(country.cca3);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    if (isFavorite) {
      removeFromFavorites(country.cca3);
    } else {
      addToFavorites(country);
    }
  };

  return (
    <Link 
      to={`/country/${country.cca3}`}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={country.flags.svg} 
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {user && (
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite 
                ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            } hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-300 transition-colors`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate">{country.name.common}</h3>
        <div className="space-y-1 text-sm">
          <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
          <p><span className="font-semibold">Region:</span> {country.region}</p>
          <p><span className="font-semibold">Capital:</span> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;