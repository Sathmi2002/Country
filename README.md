

    
   Deployment - versel
   Link - https://country-alpha-puce.vercel.app/
    



 Features

- *Country Exploration*
  - View all countries with essential information
  - Search countries by name
  - Filter by region and language
  - Detailed view for each country
  - Responsive design for all devices

- *User Features*
  - User authentication (email/password)
  - Save favorite countries
  - Manage favorite countries list
  - Dark/Light theme support

- *Technical Features*
  - React 18 with functional components
  - REST Countries API integration
  - Tailwind CSS for styling
  - Framer Motion animations
  - Comprehensive testing suite
  - Responsive design



- Node.js (v18 or higher)
- npm (v8 or higher)

Installation

1. Install dependencies:
bash
npm install


2. Start the development server:
bash
npm run dev


T1he app will be available at http://localhost:5173
 Running Tests

1. Run all tests once:
bash
npm test


2. Run tests in watch mode (development):
bash
npm run test:watch


3. Generate coverage report:
bash
npm run test:coverage


 Test Structure

Tests are organized in the following directories:


src/
├── components/
│   └── countries/
│       └── __tests__/
│           ├── CountryCard.test.js
│           ├── Countrysearch.test.js
│           └── RegionFilter.test.js
|

 Test Coverage

The test suite covers:
- Component rendering and interactions
- Context providers and consumers
- Authentication flows
- API integration
- User interactions
- Error handling
```

 Tech Stack

- *Frontend Framework*: React 18
- *Routing*: React Router v6
- *Styling*: Tailwind CSS
- *HTTP Client*: Axios
- *Animation*: Framer Motion
- *Testing*:
  - Jest
  - React Testing Library
  - Jest DOM
- *Development*:
  - Vite
  - ESLint
  - PostCSS
  - Autoprefixer

 API Integration

The application integrates with the REST Countries API using the following endpoints:

- GET /all - Fetch all countries
- GET /name/{name} - Search countries by name
- GET /region/{region} - Filter countries by region
- GET /alpha/{code} - Get detailed country information

 Authentication

The app includes a demo authentication system:
- Demo Email: user@example.com
- Demo Password: password

 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop computers
- Large screens

 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
