## Overview
DevPulse is a full-stack web application designed to help developers track their project progress, manage tasks, and generate daily logs automatically based on their GitHub activity. It links a local Kanban board with real-time repository data.

## Problem
Developers often find manual time tracking and activity logging tedious. Recording time spent on tasks and the number of lines of code written disrupts the development workflow and is often inaccurate. Existing tools either require too much manual input or are entirely disconnected from the actual code being written.

## Solution
DevPulse connects local task management directly to version control. When a developer works on a task and pushes code to GitHub, the backend receives a webhook, calculates the time spent based on session timers, and retrieves the exact lines of code added. This data is then used to automatically generate daily progress logs without manual entry.

## Features
- **Project Dashboard**: View tracked projects alongside GitHub metrics like stars and open issues.
- **Kanban Board**: Manage tasks with standard "TODO", "IN PROGRESS", and "DONE" columns.
- **Session Timers**: Track exact time spent on tasks using server-validated UTC timestamps.
- **Automated Code Tracking**: Ingests GitHub webhooks to calculate exact lines of code (LOC) added per commit.
- **Auto-Generated Logs**: Creates daily activity logs pre-filled with time spent and LOC data.
- **Theme Support**: Includes built-in dark and light modes.

## Tech Stack
**Frontend:**
- React 19 (TypeScript) via Vite
- React Router DOM
- Tailwind CSS & shadcn/ui
- Axios

**Backend:**
- Python 3.14+
- FastAPI
- SQLModel (SQLAlchemy & Pydantic)
- PostgreSQL
- Alembic
- PyJWT & passlib
- uv (Package Manager)

## Architecture
The system consists of a Single Page Application communicating with a RESTful API.
- The **frontend** handles UI state and user interactions, structured by feature components.
- The **backend** manages data persistence, authentication, and external API communication.
- A key component is the webhook pipeline: instead of polling GitHub for updates, the backend listens for push events, validates their signatures, and processes commit data asynchronously to keep the local database synchronized with the remote repository.

## Database
The primary data store is PostgreSQL. The schema is defined using SQLModel, mapping relationships between Users, Projects, Tasks, and Daily Metrics. Schema changes are version-controlled and applied using Alembic migrations.

## Authentication
User authentication is handled via OAuth2 with Password flow. The backend verifies credentials, hashes passwords using bcrypt, and issues JSON Web Tokens (JWT). The frontend stores these tokens and includes them in the headers of protected API requests.

## Challenges
- **Webhook Reliability**: Processing incoming GitHub webhooks quickly and securely (validating HMAC signatures) while making follow-up requests to the GitHub API for exact line counts required careful handling of asynchronous tasks to avoid timeouts.
- **Time Accuracy**: Ensuring task timers were accurate meant relying on backend UTC timestamps rather than purely client-side clocks, which can drift or be manipulated.

## Performance
- The backend uses FastAPI's asynchronous capabilities and `httpx` to ensure external API requests do not block the main thread.
- The frontend leverages Vite for fast builds and Tailwind CSS for minimal stylesheet overhead.

## Deployment
- The backend is designed to run via Uvicorn and can be containerized using Docker for deployment on cloud platforms.
- The frontend is a static build that can be hosted on edge networks or static hosting providers.
- A managed PostgreSQL instance is required for the database.

## Lessons Learned
- Implementing an event-driven architecture with webhooks proved far more efficient than periodic polling, providing near-instant updates with lower server load.
- Enforcing strong typing across the stack—using TypeScript on the frontend and Python type hints with SQLModel on the backend—significantly reduced integration bugs and data shape mismatches.
