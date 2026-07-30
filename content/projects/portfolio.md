# Muhammed Sahal | Full-Stack Developer Portfolio

## Overview

A production-ready developer portfolio built with **Next.js 16 (App Router)**. This platform is designed to showcase projects, skills, and professional experience with a heavy focus on performance, modern UI patterns, and practical AI integration.

## Solution

To solve this, I developed an interactive, AI-powered portfolio. It features a custom context-aware assistant capable of answering highly specific questions about my experience and projects in real-time. This is built on top of a highly optimized, visually striking user interface that provides an exceptional user experience even before the AI is engaged.

## Features

- **Context-aware AI Chatbot**: Built with a true RAG (Retrieval-Augmented Generation) pipeline to answer questions about my work.
- **Modern UI Patterns**: Utilizes structured Bento Grids, glassmorphism, and meticulously tuned Dark/Light mode theme switching.
- **Secure Contact Integration**: Fully functional, serverless contact form powered by EmailJS.
- **Admin Dashboard**: A secure, custom-built dashboard to manage portfolio content (Projects, Experience) directly on the site.
- **Technical SEO**: Dynamic sitemaps, structured JSON-LD data, and strict canonical routing.

## Tech Stack

- **Core Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com), [Shadcn UI](https://ui.shadcn.com)
- **Animations & Graphics**: [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/) (WebGL)
- **Database & Auth**: [Supabase](https://supabase.com) (PostgreSQL)
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash), Vercel AI SDK
- **Forms**: EmailJS

## Architecture

The codebase is structured to maintain strict separation of concerns:

- **Component Organization**: The `/components` directory is modularized by feature domains (e.g., `/chat`, `/hero`, `/animations`).
- **Rendering Strategy**: Heavily relies on React Server Components (RSC) and Server Actions for initial data fetching and secure database mutations.
- **RAG Pipeline**: A dedicated `/api/seed` route fetches structured records, generates vector embeddings using `gemini-embedding-2`, and stores them. The `/api/chat` route performs a cosine similarity search against these embeddings to inject highly relevant context into the system prompt before streaming the LLM response.

## Database

[Supabase](https://supabase.com) (PostgreSQL) acts as the primary data layer. Crucially, it utilizes the `pgvector` extension to store and query the 3072-dimensional vector embeddings generated for the AI's memory bank, allowing for blazingly fast mathematical similarity searches (`<=>`).

## Authentication

Security is enforced at multiple layers:

- **Admin Dashboard**: Protected by Supabase Auth with server-side layout checks enforcing strict access control.
- **Database Mutations**: Server Actions (Create, Update, Delete) explicitly verify the user's session token (`supabase.auth.getUser()`) before execution.
- **API Protection**: The seed route uses a custom header secret (`x-seed-key`), and the public chat endpoint includes a basic in-memory IP-based rate limiter to mitigate abuse.

## Challenges

- **AI Hallucinations & Rate Limits**: Implementing an efficient RAG pipeline required fine-tuning the system prompt and bounding the context injection to ensure the model didn't hallucinate skills or exceed API rate limits.
- **WebGL Performance**: Ensuring complex Three.js WebGL background animations did not degrade scroll performance or drain battery life on mobile devices.
- **Theme Aesthetics**: Achieving perfect visual separation in light mode without using harsh borders or pure black/white contrasts.

## Performance

- **Hardware Acceleration**: Framer Motion animations explicitly target hardware-accelerated CSS properties (`transform` and `opacity`).
- **Dynamic Simulation Scaling**: The `LiquidEther` Three.js simulation dynamically scales down. On mobile screens (`window.innerWidth <= 768`), the pixel ratio is capped at `1.0` and interaction drivers are simplified to maintain a locked 60 FPS.
- **Next.js Caching**: Static assets and API responses leverage standard Next.js App Router caching and static generation where applicable.

## Deployment

Configured for seamless deployment on **Vercel**. The application leverages edge runtimes for the AI streaming endpoints to minimize latency and includes a programmatic `app/robots.ts` and `app/sitemap.ts` to ensure dynamic project URLs are indexed properly by search engines upon deployment.

## Lessons Learned

- **Embedding Structure is Critical**: The way structured data is converted into plain-text sentences before embedding significantly impacts the LLM's retrieval accuracy and output quality in a RAG system.
- **Custom CSS Variables over Utilities**: Using CSS variables to manually invert and map theme colors (e.g., forcing `zinc-900` to act as an off-white in light mode) allows for much finer control over premium UI aesthetics than relying purely on standard Tailwind utility classes.
- **Scroll Spy Robustness**: `IntersectionObserver` with a highly specific `rootMargin` (e.g., `-50% 0px -49% 0px`) is far more robust for active navbar states than manual scroll-position calculations.
