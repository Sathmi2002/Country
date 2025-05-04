import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex justify-center items-center w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full text-red-600 dark:text-red-400 mb-6">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;