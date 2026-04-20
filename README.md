# Modern Developer Portfolio 🚀

A highly interactive, premium developer portfolio built with **Next.js 16**, **React 19**, and a powerful modern web stack to showcase projects, skills, and experience with stunning cinematic visuals.

## ✨ Key Features

- **Immersive 3D & WebGL Experiences**: Utilizes Three.js for interactive models and GSAP/Framer Motion for buttery-smooth animations.
- **Premium Design Aesthetics**: Includes high-end glassmorphism, editorial typography, and scroll-driven parallax effects via Lenis.
- **AI Integration**: Powered by `@ai-sdk/google` to provide smart features like a 3D Robot AI Mascot (Aira).
- **Admin Dashboard**: Full-featured admin panel mapped out with role-based authentication using Supabase.
- **Dynamic Content & Resume API**: Server-side integrations to securely serve the latest resume, dynamic projects, and more via Supabase buckets.
- **Responsive & Accessible**: Uses Radix UI primitives and Tailwind CSS for robust, beautifully accessible components (fully responsive).
- **Contact Integration**: Seamless messaging system using EmailJS.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com), `clsx`, `tailwind-merge`
- **Animations / 3D**: [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/), Lenis (smooth scrolling), LottieFiles
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Backend/Auth/Storage**: [Supabase](https://supabase.com) (`@supabase/ssr`)
- **AI Tools**: Vercel AI SDK, `@google/generative-ai`
- **Forms & Validation**: `react-hook-form`, `zod`

## 🚀 Getting Started

### Prerequisites

You will need a [Supabase](https://supabase.com) project, an [EmailJS](https://www.emailjs.com/) account, and optionally Google Generative AI access.

### 1. Clone & Install

```bash
git clone https://github.com/Muhammed-Sahal717/NextPortfolio.git
cd NextPortfolio
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory based on `.env.example`:

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
SEED_SECRET_KEY=secret
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
