# MINI-JIRA

Mini-Jira is a small project-management demo combining a Python (Flask + SQLite) backend and a React + Vite frontend. The app demonstrates React fundamentals, backend API development, a simple database schema, and end-to-end local development.

## Prerequisites
- Python 3.10+ (or 3.8+)
- Node.js 18+ and npm
- Git

## Backend (API)
1. Create and activate a Python virtual environment:

	```bash
	python3 -m venv venv
	source venv/bin/activate
	```

2. Install Python dependencies:

	```bash
	pip install -r requirements.txt
	```

3. Initialize the SQLite database (creates `database.db` and tables):

	```bash
	flask --app app.py initdb
	```

	Or simply running the app will also create tables on first run.

4. Run the backend server (development):

	```bash
	python app.py
	```

	The API will be available at http://localhost:5000/ with endpoints under `/api/*` (e.g., `/api/projects`, `/api/tasks`).

## Frontend (React + Vite)
1. Install frontend dependencies:

	```bash
	cd frontend
	npm install
	```

2. Start the dev server:

	```bash
	npm run dev
	```

	Vite usually serves at `http://localhost:5173/`. If that port is busy it will pick the next available port (e.g., `5176`, `5177`). The console shows the actual URL.

3. Build for production:

	```bash
	npm run build
	npm run start   # preview (serves dist)
	```

## Tests
Run the Python test suite from the project root:

```bash
pytest -q
```

## Quick dev workflow
1. Start backend (in one terminal):

	```bash
	source venv/bin/activate
	python app.py
	```

2. Start frontend (in another terminal):

	```bash
	cd frontend
	npm run dev
	```

3. Open the URL printed by Vite (usually `http://localhost:5173/`) and the UI will talk to the backend at `http://localhost:5000`.

## Notes
- The backend exposes a CLI command `initdb` to create DB tables: `flask --app app.py initdb`.
- If you previously used localStorage, the app stores projects/tasks in the browser. The backend endpoints are available and the frontend can be wired to use them.

If you want, I can update the frontend to default to talking to the backend API (instead of localStorage) and provide an env flag for switching between localStorage and API modes.
