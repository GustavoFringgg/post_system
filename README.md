# Post System

A full-stack web application with a Vue 3 + Vite frontend and a FastAPI backend.

## Project Structure

```
Post_System/
  Frontend/   — Vue 3 + Vite SPA
  Backend/    — FastAPI REST API
```

## Getting Started

### Backend

```bash
cd Backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

API: http://localhost:8000
Swagger docs: http://localhost:8000/docs

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

App: http://localhost:5173

During development, requests to `/api/*` are proxied to the backend automatically.
