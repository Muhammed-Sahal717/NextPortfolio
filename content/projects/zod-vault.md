## Overview

ZodVault is a privacy-first, secure personal vault built for individuals who need a digital locker to store their most sensitive data. It handles everything from passwords and banking details to secure notes and medical records. It's designed to be simple, highly secure, and accessible from anywhere without compromising on data privacy.

## Problem

Managing sensitive personal information across different platforms is a nightmare. Most people either reuse passwords, keep sensitive notes in plaintext apps, or trust third-party services that constantly suffer data breaches. We needed a place where we could store critical data, knowing exactly how it's encrypted and managed, without relying on opaque, proprietary systems.

## Solution

ZodVault gives you complete control over your sensitive information. Before any of your vault data (like titles and descriptions) hits the database, it's encrypted at rest using AES-256-GCM. We built this with a defense-in-depth approach—meaning we don't just rely on one security measure. We use JWT sessions, strict account lockouts to prevent brute-forcing, and CSRF protection on all mutating requests. It’s a transparent, self-hosted-friendly solution where you actually own your data.

## Features

- **Zero-Compromise Security**: AES-256-GCM encryption for all vault data at rest.
- **Smart Dashboard**: A central hub with real-time deep search capabilities and a favorites system for quick access to frequently used items.
- **Robust Authentication**: Secure login with bcrypt password hashing, account lockouts after 5 failed attempts, and Google OAuth integration.
- **Email Verification & OTP**: New accounts require email verification via a time-sensitive OTP.
- **Data Portability & Erasure**: Export all your data to a decrypted JSON file instantly, or delete your entire account and all associated data with one click.
- **Audit Logging**: Every single security event (logins, failed attempts, data mutations) is logged with IP and User-Agent tracking so you know exactly who did what and when.
- **Idle Timeout**: Automatically signs you out after 30 minutes of inactivity to keep your vault safe if you step away.

## Tech Stack

- **Frontend**: Next.js (App Router), React 19, Tailwind CSS, TypeScript
- **Backend**: Next.js Server Actions / API Routes, Node.js Crypto module
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js (v5 Beta) for JWT sessions and Google OAuth
- **Validation**: Zod for strict type safety and input sanitization
- **Email**: Nodemailer for transactional emails

## Architecture

We use a modern, serverless architecture built heavily around Next.js. Requests from the browser first hit an Edge Proxy, which handles rate-limiting and CSRF token validation before touching any core logic. From there, Next.js API Routes and Server Actions take over. When you save a new vault entry, the data passes through our custom encryption layer (AES-256-GCM) before Prisma ORM safely injects the ciphertext into the PostgreSQL database. This ensures your plaintext data is never exposed in the database logs or storage.

## Database

Our database is PostgreSQL, structured carefully to ensure strict data integrity. We use Prisma ORM to map our schema and prevent SQL injection natively. The database schema relies heavily on cascading deletes—meaning if a user deletes their account, all their vaults, sessions, OTPs, and audit logs are wiped out simultaneously. The actual sensitive fields in the `Vault` table are stored as encrypted strings (`iv:authTag:ciphertext`).

## Authentication

Authentication is handled by NextAuth.js. When you log in with a password, we hash it using bcrypt (cost factor 12). If someone tries to brute-force your account, we lock them out for 10 minutes after 5 failed attempts. We also support seamless Google OAuth, which bypasses the need for our internal email verification (OTP) step since Google already verified you. Sessions are managed statelessly via secure, HTTP-only JWT cookies that expire after 24 hours.

## Challenges

One of the biggest hurdles was implementing the custom AES-256-GCM encryption layer without breaking the search functionality on the frontend. Since the database only sees ciphertext, we couldn't just run a simple SQL `LIKE` query. We had to build a secure way to decrypt the data server-side and deliver it to the client so the React frontend could handle the real-time search and filtering smoothly, while still ensuring that data is protected at rest and during transit. Handling CSRF protection securely in a Next.js App Router environment also took a lot of fine-tuning, eventually leading us to implement a robust double-submit cookie pattern at the edge proxy level.

## Performance

By utilizing Next.js Server Components, we keep the initial client bundle incredibly small. The Edge proxy layer drops bad requests (like rate-limit violations or missing CSRF tokens) before they even wake up the heavier Node.js serverless functions. Database queries are highly optimized with Prisma, and our audit logging system is fire-and-forget, meaning it never blocks or slows down the user's primary request.

## Deployment

The application is deployed on Vercel to take advantage of their Edge network and serverless functions. The PostgreSQL database is hosted on Railway for reliable, persistent storage. The CI/CD pipeline automatically runs Prisma migrations on build, ensuring the database schema is always in sync with the deployed codebase.

## Lessons Learned

Building ZodVault reinforced the idea that security cannot be an afterthought. Implementing features like CSRF protection, timing-attack mitigation, and proper HTTP security headers from day one made the architecture much more resilient. It also highlighted the importance of balancing security with user experience—for example, adding the 30-minute idle timeout with a 2-minute warning banner ensures safety without abruptly kicking users out while they are actively reading a note.
