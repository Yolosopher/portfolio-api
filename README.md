# Portfolio API

This is the backend API for the web portfolio of Yolosopher. It is built using Node.js, Express, and TypeScript, and it includes various other libraries and tools for a comprehensive and robust development setup.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/portfolio-api.git
   cd portfolio-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   PORT=your_port
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   REDIS_URL=your_redis_url
   ```

4. Build the project:

   ```sh
   npm run build
   ```

5. Start the development server:

   ```sh
   npm run dev
   ```

6. To run the production build:
   ```sh
   npm start
   ```

## Scripts

- `npm run build`: Cleans the `dist` folder and compiles the TypeScript code.
- `npm run dev`: Starts the development server with `nodemon` for hot reloading.
- `npm start`: Starts the production server.
- `npm test`: Runs the test suite with Jest.
- `npm run test-watch`: Runs the test suite in watch mode.
- `npm run test-coverage`: Runs the test suite and generates a coverage report.
- `npm run docker_bg`: Starts the Docker containers in the background.

## Technologies

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Jest**: JavaScript testing framework designed to ensure correctness of any JavaScript codebase.
- **Supertest**: Super-agent driven library for testing node.js HTTP servers using a fluent API.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Redis**: In-memory data structure store, used as a database, cache, and message broker.
- **Zod**: TypeScript-first schema declaration and validation library.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License

This project is licensed under the ISC License.

---

Created with ❤️ by Yolosopher.
