## Overview

A production-ready, highly scalable, and distributed B2B SaaS Learning Management System platform. The system is designed to serve multiple "academies" (tenants) from a single deployment while ensuring strict data isolation. It features a Next.js Multi-Zone Micro-Frontend (MFE) architecture on the frontend and a Python FastAPI Modular Monolith on the backend.

## Problem

Traditional LMS monoliths struggle to scale and provide robust tenant isolation in B2B environments. Managing multiple isolated academies typically requires deploying separate infrastructure instances, resulting in high overhead, cost, and maintenance complexity. Furthermore, frontend monoliths become bloated, making it difficult for multiple teams to independently develop, test, and deploy specific domains (like learning, catalog, and admin).

## Solution

A hybrid multi-tenant architecture where a single infrastructure deployment serves numerous clients with zero data leakage. The frontend employs a micro-frontend (MFE) approach, breaking the UI into 7 distinct applications that are stitched together to act as a single Single Page Application (SPA). The backend utilizes a modular monolith pattern with strict Domain-Driven Design (DDD) boundaries, allowing features to be extracted into microservices later with minimal churn.

## Features

- **Course Catalog & Discovery:** Public-facing storefront for users to browse, filter, and enroll in courses.
- **Dynamic Curriculum Builder:** Administrative interface for instructors to dynamically construct courses with text, document, and video lessons.
- **Assignment & Grading Engine:** Instructors can create quizzes and assignments; students can submit work for grades and feedback.
- **Multi-Tenant Administration:** Super Admins can instantly provision isolated "Academies" with custom branding, specific users, and selectively licensed modules.
- **Role-Based Dashboards:** A unified interface that seamlessly adapts depending on whether the user is a Student, Instructor, or Tenant Admin.
- **Module Licensing / Feature Flags:** Gate access to specific modules (e.g., assignments, course catalog) at the tenant level.

## Tech Stack

**Frontend:**

- Next.js (Multi-Zone Rewrites)
- Turborepo (Monorepo Management)
- React, Tailwind CSS, Shadcn UI
- Axios, PNPM Workspaces

**Backend:**

- Python 3.13+
- FastAPI
- SQLAlchemy 2.0 (Async) & Alembic
- Pydantic v2

**Infrastructure & Database:**

- PostgreSQL
- Redis (Rate limiting, caching)
- Docker & Docker Compose
- JSON Web Tokens (JWT)

## Architecture

**Frontend Architecture:**
The frontend consists of 7 mathematically distinct Next.js applications (shell, auth, catalog, learning, assignment, dashboard, admin). The `shell` application acts as a Host API Gateway, utilizing Next.js `rewrites` to invisibly reverse-proxy requests to the other zones. This creates a unified SPA experience without full page reloads. Shared logic and UI components are managed via Turborepo workspaces (`@lms/ui`, `@lms/api-client`).

**Backend Architecture:**
The backend is a tightly-coupled Modular Monolith. Business logic is strictly segmented into modules (e.g., Auth, Courses, Learning, Admin), each with its own router, schemas, models, and service. Modules communicate via internal service methods and domain events on an in-process async bus, preventing direct cross-table database joins and ensuring clean boundaries.

## Database

The platform relies on PostgreSQL with a sophisticated three-layer hybrid tenant isolation strategy:

1. **Request Context:** Tenant slugs are resolved dynamically from the `X-Tenant-ID` header (or JWT) and injected into global request context variables.
2. **Repository Layer:** A `TenantRepository` automatically filters all read operations and stamps all write operations with the active `tenant_id`.
3. **Postgres RLS (Row-Level Security):** As an ultimate safety net, strict RLS policies are enforced at the transaction level keyed to the `tenant_id`, ensuring cross-tenant data contamination is mathematically impossible, even if a repository filter is missed.

Additionally, data integrity is maintained using soft deletes (e.g., `SoftDeleteMixin`), ensuring historical data like past enrollments are preserved when records are archived.

## Authentication

Authentication is stateless and relies on JWTs with rotating refresh tokens.

The system implements a robust Role-Based Access Control (RBAC) system applied at two levels:

- **Frontend UI Gating:** The UI dynamically hides or shows navigation elements and pages based on the user's role array (e.g., Student, Instructor, Tenant Admin).
- **Backend API Enforcement:** True security is enforced via a strict permission matrix. Endpoints are secured with dependency injection (e.g., `require_permission("course:update")`). If a user bypasses the UI, the backend evaluates their permissions directly per-request and blocks unauthorized access.

## Challenges

- **MFE Orchestration:** Seamlessly stitching 7 independent Next.js applications together without page reloads while maintaining global state (like authentication context) across all zones required complex Next.js rewrite configuration and shared workspace packages.
- **Absolute Data Isolation:** Guaranteeing zero data leakage in a shared schema multi-tenant database is difficult. Relying purely on ORM-level filtering is prone to human error.
- **Dynamic Routing & Tenant Resolution:** Accurately parsing tenant identifiers from subdomains (e.g., `acme.lms.com`) and propagating them as HTTP headers across all internal MFE requests to the backend.

## Performance

- **Build & Development Speed:** Turborepo enables instantaneous hot-reloading across all 7 frontend zones while sharing a single component library, significantly reducing build times.
- **High-Concurrency Backend:** Built on FastAPI and Async SQLAlchemy 2.0, the backend is highly optimized for asynchronous I/O and concurrent request handling.
- **Optimized Database Queries:** Postgres RLS and tenant-specific filtering ensure queries are always scoped to a single tenant, preventing expensive cross-tenant table scans.

## Deployment

- **Database:** Managed PostgreSQL (e.g., AWS RDS, Neon, Supabase) with schema construction handled by Alembic migrations.
- **Backend:** The FastAPI application is fully containerized with Docker, ready to be deployed to scalable container orchestration platforms like Google Cloud Run, AWS ECS, or Render behind a load balancer.
- **Frontend:** Deployed seamlessly via Vercel. Vercel automatically detects the Turborepo configuration, allowing either the `shell` app to build all logic or deploying separate Vercel projects for each zone, utilizing the Shell as a reverse proxy.

## Lessons Learned

- **Modular Monoliths Maximize Velocity:** Starting with a modular monolith offers the development speed of a traditional monolith while enforcing the strict boundaries necessary to confidently extract microservices in the future when traffic demands it.
- **Database-Level Isolation is Essential:** Moving tenant data isolation down to the database level via Postgres Row-Level Security (RLS) provides a robust safety net that application-level ORM filters simply cannot match.
- **MFE Empowers Teams:** Utilizing Turborepo with Next.js Multi-Zone rewrites provides the organizational benefits of independent team deployments without sacrificing the snappy, unified SPA experience expected by end-users.
