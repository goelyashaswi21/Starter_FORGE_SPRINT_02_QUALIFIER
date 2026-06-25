# Forge 2 Qualifier — Kanban Board

A Trello-style Kanban board built with Laravel API + React UI, orchestrated by a two-agent system (Hermes + OpenClaw) via Slack.

## Live URL
https://starter-forge-sprint-02-qualifier.vercel.app

## Models Used
- **Hermes (brain/orchestrator):** ollama/qwen3:8b — planning, memory, cron jobs
- **OpenClaw (hands/coder):** ollama/qwen3:8b — code execution via Slack

## Why this routing?
Both agents use local Ollama (free, unlimited, offline). Hermes handles planning and orchestration while OpenClaw handles code writing and execution. No paid APIs used.

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

Open http://localhost:5173

## Features
- Create/delete boards
- Create lists (columns) per board
- Create/edit/delete cards
- Move cards between lists
- Add coloured tags to cards
- Assign members to cards
- Set due dates (overdue cards highlighted in red)

## Agent Setup
- **Hermes:** brain/orchestrator — plans tasks, stores memory, runs cron jobs
- **OpenClaw:** hands/coder — writes and runs code, reports via Slack
- **Slack channels:** #sprint-main (planning), #agent-coder (coding tasks), #agent-log (audit trail)

## Free Stack
Ollama (local) with qwen3:8b — no paid APIs used.

## Repo
https://github.com/goelyashaswi21/Starter_FORGE_SPRINT_02_QUALIFIER