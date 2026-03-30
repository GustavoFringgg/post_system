# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend
```bash
cd Backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py          # runs uvicorn on :8000 with --reload
```

### Frontend
```bash
cd Frontend
npm install
npm run dev             # runs Vite dev server on :5173
npm run build           # production build
npm run preview         # preview production build
```

## Architecture

This is a full-stack app: a Vue 3 SPA (`Frontend/`) backed by a FastAPI REST API (`Backend/`).

**Frontend** uses Vue 3 with Composition API, Vue Router, and Pinia for state. The `@` alias resolves to `src/`. During development, Vite proxies all `/api/*` requests to `http://localhost:8000`, so the frontend never needs to know the backend URL.

**Backend** uses a factory pattern — `create_app()` in `Backend/app/__init__.py` assembles the FastAPI app with CORS middleware and mounts routers. Configuration lives in `Backend/app/core/config.py` via `pydantic-settings` (reads from `.env`). All API routes are prefixed with `/api` and routers live in `Backend/app/api/routes/`. Pydantic v2 schemas are in `Backend/app/schemas/`.

**Current state:** The posts routes (`GET /api/posts/`, `GET /api/posts/{id}`) return stub data — no database is wired up yet. Models directory (`Backend/app/models/`) exists but is empty.

**API docs** are available at `http://localhost:8000/docs` when the backend is running.
