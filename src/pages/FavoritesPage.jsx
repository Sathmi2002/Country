import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import CountryCard from '../components/countries/CountryCard';

const FavoritesPage = () => {
  const { favorites } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favorite Countries</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't added any countries to your favorites.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
          >
            Explore Countries
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
          {favorites.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;