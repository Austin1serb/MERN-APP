# Task Manager - A MERN Stack Application

## Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview

Task Manager is a full-stack web application designed to help users manage their tasks efficiently. The project leverages the MERN stack (MongoDB, Express, React, and Node.js) to provide a seamless user experience. Users can create an account, log in, create tasks, edit tasks, delete tasks, and view tasks assigned to various users.

## Demo

The live demo of the application can be accessed [here](http://3.84.147.38/).

The GitHub repository can be found [here](https://github.com/Austin1serb/MERN-APP.git).

## Features

- User authentication
- Create, edit, and delete tasks
- Filter tasks by status and priority
- View tasks in a tabular format
- Real-time task updates

## Technologies Used

- MongoDB
- Express
- React
- Node.js
- Axios

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/Austin1serb/MERN-APP.git
```

2. Navigate to the project directory
```bash
cd MERN-APP
```

3. Install server-side dependencies
```bash
npm install
```

4. Navigate to the client directory
```bash
cd client
```

5. Install client-side dependencies
```bash
npm install
```

6. Start the development server
```bash
npm start
```

## Usage

To run the project locally, execute the following command in both the server and client directories:
```bash
npm start
```

## API Endpoints

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| POST   | `/api/users/register`| Register a new user              |
| POST   | `/api/users/login`   | Login an existing user           |
| GET    | `/api/tasks`         | Fetch all tasks                  |
| POST   | `/api/tasks`         | Create a new task                |
| PUT    | `/api/tasks/:id`     | Update an existing task          |
| DELETE | `/api/tasks/:id`     | Delete a task                    |

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Austin Serb - [Austin.serb@icloud.com](mailto:Austin.serb@icloud.com)

## Acknowledgements

- [React Router](https://reactrouter.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Token (JWT)](https://jwt.io/)
