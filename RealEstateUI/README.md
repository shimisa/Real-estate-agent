# RealEstatePrice Frontend Documentation

This is the frontend part of the RealEstatePrice project, built using React. The frontend interacts with a Spring Java backend to provide a seamless user experience for managing real estate prices.

## Project Structure

- **public/**: Contains static files.
  - **index.html**: The main HTML file for the React application.

- **src/**: Contains the source code for the React application.
  - **components/**: Contains React components.
    - **LoginPage.js**: The login page component for user authentication.
  - **services/**: Contains service files for API interactions.
    - **api.js**: Functions for making API calls to the backend.
  - **App.js**: The main application component that sets up routing.
  - **index.js**: The entry point for the React application.

## Getting Started

1. **Installation**: Navigate to the project directory and run:
   ```sh
   npm install
   ```

2. **Running the Application**: Start the development server with:
   ```
   npm start
   ```

3. **Building for Production**: To create a production build, run:
   ```
   npm run build
   ```

## API Integration

The frontend communicates with the backend Spring Java application for user authentication and other functionalities. Ensure the backend is running to interact with the API.

## Contributing

Feel free to submit issues or pull requests for improvements and bug fixes.