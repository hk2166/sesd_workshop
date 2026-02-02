# ToDo API

A simple REST API for managing tasks using file-based storage instead of a database.

## Features

- Create new tasks
- Retrieve all tasks
- Tasks stored in `task.json` file
- No database required

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sesd_wo
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:4000`

## API Endpoints

### Get All Tasks

```bash
GET http://localhost:4000/api/task
```

**Example:**

```bash
curl http://localhost:4000/api/task
```

**Response:**

```json
[
  {
    "id": "1738483200000",
    "title": "Complete project documentation"
  },
  {
    "id": "1738483250000",
    "title": "Review pull requests"
  }
]
```

### Create a New Task

```bash
POST http://localhost:4000/api/task
Content-Type: application/json

{
  "title": "Your task title"
}
```

**Example:**

```bash
curl -X POST http://localhost:4000/api/task \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete homework"}'
```

**Response:**

```json
{
  "id": "1738483200000",
  "title": "Complete homework"
}
```

## Project Structure

```
sesd_wo/
├── src/
│   ├── app.ts                  # Main application setup
│   ├── server.ts              # Server entry point
│   ├── controller/
│   │   └── todo.controller.ts # API route handlers
│   ├── schema/
│   │   └── toDo.schema.ts     # TypeScript interface
│   └── service/
│       └── todo.service.ts    # Business logic
├── task.json                  # Task storage file
├── package.json
└── tsconfig.json
```

## Technology Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **tsx** - TypeScript execution
- **nodemon** - Auto-restart on file changes

## Data Storage

Tasks are stored in `task.json` in the project root directory. Each task has:

- `id`: Unique identifier (timestamp)
- `title`: Task description

## Development

The application uses `nodemon` with `tsx` for hot-reloading during development. Any changes to `.ts` or `.json` files will automatically restart the server.

## Notes

- Make sure port 4000 is available
- The `task.json` file is created automatically if it doesn't exist
- Tasks persist between server restarts
