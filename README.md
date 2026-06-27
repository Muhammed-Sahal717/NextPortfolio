# Muhammed Sahal's Developer Portfolio 🚀

A highly interactive, enterprise-grade developer portfolio built with **Next.js** and a powerful modern web stack. Designed to showcase projects, skills, and experience with stunning cinematic visuals and clean architecture.

## ✨ Key Features

- **Immersive WebGL Experiences**: Features a custom-built Liquid Ether WebGL background simulation for butter-smooth, interactive ambient visuals.
- **AI Agent Integration**: Powered by the Gemini API and Vercel AI SDK to provide a smart, context-aware AI chatbot assistant (Aira) built natively into the UI.
- **Enterprise-Grade Architecture**: Fully modular codebase utilizing the "Orchestrator + Subcomponents" pattern. The repository is meticulously organized into domains like `animations/`, `providers/`, `chat/`, and `projects/`.
- **Premium Design Aesthetics**: Includes high-end glassmorphism, editorial typography, and scroll-driven parallax effects.
- **Custom Easter Eggs**: Interactive UI elements that react to user behavior, including a system-overload shutter crash state built into the liquid navigation bar.
- **Dynamic Content Integration**: Server-side integrations to securely serve the latest resume, dynamic projects, and more via Supabase.
- **Seamless Contact**: Form integration using EmailJS with built-in toast notifications.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com), `clsx`, `tailwind-merge`
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Auth/Storage**: [Supabase](https://supabase.com) (`@supabase/ssr`)
- **AI Tools**: Vercel AI SDK, `@google/generative-ai`
- **UI Architecture**: Headless component design, heavily optimized for zero dead-code.

## 📁 Codebase Structure

The `components/` directory is strictly organized by feature domain to ensure massive scalability:
- `/animations/`: Framer Motion and WebGL visual effects (`LiquidEther`, `Noise`, `ParticleText`, etc.)
- `/providers/`: Global contexts and loading indicators.
- `/common/`: Reusable, interactive UI elements like the custom cursor.
- `/navbar/`: The orchestrator and subcomponents for the liquid navigation bar.
- `/chat/`: The AI widget, message bubbles, input formatting, and Aira avatar.
- `/hero/`, `/about/`, `/projects/`, `/footer/`: Dedicated directories for page sections.

## 🚀 Getting Started

### Prerequisites

You will need a [Supabase](https://supabase.com) project, an [EmailJS](https://www.emailjs.com/) account, and a Google Generative AI access key.

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

NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_id

# App Settings & Contact Info
NEXT_PUBLIC_CONTACT_EMAIL=your_email@example.com
NEXT_PUBLIC_CONTACT_LINKEDIN=your_linkedin
NEXT_PUBLIC_CONTACT_GITHUB=your_github
NEXT_PUBLIC_PORTFOLIO_URL=deployed_url
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new). Make sure to add all the production environment variables in your Vercel project settings before deploying.
