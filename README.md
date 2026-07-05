# Muhammed Sahal | Full-Stack Developer Portfolio

A production-ready developer portfolio built with **Next.js 16 (App Router)**. Designed to showcase projects, skills, and experience with a focus on performance, modern UI patterns, and practical AI integration.

---

## 🛠 Tech Stack

- **Core Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com), [Shadcn UI](https://ui.shadcn.com)
- **Animations & Graphics**: [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/) (WebGL)
- **Backend & Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash), Vercel AI SDK
- **Forms & Contact**: EmailJS

---

## 📐 Architecture & Organization

The codebase is organized to maintain separation of concerns and readability:

- **Component Organization**: The `components/` directory is structured by feature domains (e.g., `/animations`, `/chat`, `/providers`, `/hero`).
- **Server Components & Actions**: Initial data fetching and database mutations are handled server-side using React Server Components (RSC) and Server Actions.
- **TypeScript**: The project uses TypeScript for API routes, database payloads, and component props to ensure type safety.

---

## 🤖 AI Assistant & Context Injection

The portfolio features an AI chatbot powered by **Gemini 2.5 Flash** to answer questions about my skills and experience.

### How it Works:
1. **Context Fetching**: When a chat session initiates, the backend fetches all active project and experience data directly from the Supabase database.
2. **Dynamic Prompt Injection**: This data is injected into a strict system prompt. The model is instructed to adopt a professional persona and answer exclusively based on this injected context.
3. **Streaming**: Responses are streamed back to the client using the `ReadableStream` API and Vercel AI SDK.

*(Note: The codebase also includes an `/api/seed` route capable of generating embeddings via `text-embedding-004` and storing them in `pgvector`. While built for future Retrieval-Augmented Generation (RAG) capabilities, the current chat implementation relies purely on full-context prompt injection due to the small dataset size.)*

---

## 🎨 Design & UI Patterns

The user interface implements modern design patterns while maintaining accessibility and readability:

- **Bento Grid**: Project and experience sections utilize a structured grid layout for organized content presentation.
- **Glassmorphism**: Backdrop filters are used sparingly to maintain text legibility over animated backgrounds.
- **Theme System**: Implements a standard CSS variable-based approach for Light and Dark modes.
- **View Transitions**: Theme toggling uses standard opacity crossfades to ensure smooth transitions without layout shifts.

---

## ⚡ Performance Optimization

- **Hardware Acceleration**: Framer Motion animations target `transform` and `opacity` properties.
- **WebGL Tuning**: The `LiquidEther` Three.js simulation adjusts resolution based on device capabilities. On mobile (`window.innerWidth <= 768`), the pixel ratio is capped at `1.0` and interaction drivers are simplified to maintain 60 FPS.
- **Next.js Caching**: Static assets and API responses leverage standard Next.js App Router caching mechanisms.

---

## 🔒 Security & Admin Panel

A custom admin dashboard (`/admin`) is used to manage content, implemented with a focus on security:

- **Authentication**: The dashboard is protected by Supabase Auth, with server-side layout checks enforcing access control.
- **Server Action Protection**: Database mutations (Create, Update, Delete) explicitly verify the user's session token (`supabase.auth.getUser()`) before execution.
- **Rate Limiting**: The public `/api/chat` endpoint includes a basic in-memory IP-based rate limiter (evaluating `x-forwarded-for`) to mitigate abuse. *(Note: While sufficient for a personal portfolio, a true distributed system would replace this with Vercel KV or Redis to persist across serverless instances and deployments).*
- **Route Validation**: Privileged API routes validate environment secrets before execution.

---

## 🚀 Getting Started

### Prerequisites
You will need a [Supabase](https://supabase.com) project, an [EmailJS](https://www.emailjs.com/) account, and a Google Generative AI API Key.

### 1. Clone & Install

```bash
git clone https://github.com/Muhammed-Sahal717/NextPortfolio.git
cd NextPortfolio
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Integrations
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
SEED_SECRET_KEY=your_custom_secret_key_for_ai_seeding

NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_id
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
