# Express.js parody

This project was created in educational purposes to got familiarized with Node.js namely with HTTP module, EventEmitter, worker threads and middlewares.

## Endpoints description

- `GET /users` - endpoint for getting all users.
- `POST /users` - endpoint for creating new user. Body sample:

```javascript
{
  "id": 4,
  "name": "John"
}
```

- `POST /usersFromFile` - endpoint for creating new users from file. Sample of the file in root directory: `users.sample.xml`.
- `GET /exportUsers` - endpoint for getting all users in xml file.

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```
