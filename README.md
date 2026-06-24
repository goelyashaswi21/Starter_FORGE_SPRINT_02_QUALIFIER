# Forge 2 Qualifier — Kanban Board

A Trello-style Kanban board built with Laravel API + React UI, orchestrated by a two-agent system (Hermes + OpenClaw) via Slack.

## Models Used
- **Hermes (brain/orchestrator):** ollama/qwen2.5-coder:7b — stronger model for planning
- **OpenClaw (hands/coder):** ollama/qwen3:8b — fast local model for code execution

## Run Instructions

### Backend (Laravel API)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## Live URL
_Coming soon after deployment_

## Agent Log
See agent-log.md for the full chat loop.
