## Overview

AutoLink is a comprehensive smart vehicle communication platform designed to bridge the gap between vehicle owners and the general public. It provides a secure, real-time communication channel activated through QR codes placed on vehicles, ensuring seamless and anonymous interactions.

## Problem

In today's urban environments, traditional methods for contacting a vehicle owner (e.g., for parking issues, emergencies, or lights left on) are unreliable or disproportionate, such as leaving physical notes or involving law enforcement. Displaying personal phone numbers publicly raises significant privacy concerns, including spam and harassment. There is a critical need for an instant, secure, and privacy-preserving method to connect bystanders with vehicle owners.

## Solution

AutoLink resolves these issues by utilizing QR codes. Bystanders can scan a vehicle's unique QR code to instantly open a real-time communication channel with the owner. The system guarantees anonymity for the scanner and protects the vehicle owner's contact details. It supports anonymous text messaging and WebRTC voice calls, along with an emergency contact forwarding system if the owner is unreachable.

## Features

- **QR Code Scanning:** Contact vehicle owners instantly by scanning their vehicle's QR code.
- **Anonymous Messaging:** Send and receive real-time messages without exposing personal phone numbers.
- **Voice Calling:** Peer-to-peer audio calls via WebRTC for urgent communications.
- **Emergency Contact Forwarding:** Automatically routes unanswered calls to a pre-configured emergency contact.
- **Vehicle Management:** Register and manage multiple vehicles, generating unique QR codes for each.
- **Push Notifications:** Stay updated with FCM-powered alerts for incoming messages and calls.
- **Blocklist & Reporting:** Community-driven moderation allowing users to block contacts and report abusive behavior.
- **Web Fallback:** A browser-based chat interface for users who scan codes without having the mobile app installed.
- **Admin Dashboard:** Centralized Next.js panel for platform governance, moderation, and statistical oversight.

## Tech Stack

- **Frontend / Mobile App:** Flutter (Dart)
- **Web Applications (Admin Panel & Fallback):** Next.js (React)
- **Backend Server:** NestJS (Node.js, TypeScript)
- **Database & ORM:** PostgreSQL with TypeORM
- **Real-Time Communication:** Socket.IO (WebSockets)
- **Voice Calling:** WebRTC
- **Push Notifications:** Firebase Cloud Messaging (FCM)

## Architecture

The platform is built on a modern Client-Server architecture and comprises three main modules:

- **Vehicle Owner Module (Mobile App):** Used for vehicle registration, QR code management, messaging, and call handling.
- **Guest / Scanner Module:** Allows the public to scan QR codes and initiate chats/calls using the app or the Web Fallback interface.
- **Admin Module:** A web dashboard for system administrators to manage users, monitor platform activity, and moderate reports.
  The backend handles HTTP requests for standard operations and utilizes a WebSocket gateway for real-time signaling and messaging delivery.

## Database

The system relies on a PostgreSQL relational database structured around five core entities:

- **User:** Stores profile details, credentials, and FCM tokens.
- **Vehicle:** Links to users and stores QR generation data.
- **Message:** Contains chat payloads, linked to specific vehicles.
- **Report:** Tracks flagged messages for moderation.
- **BlockList:** Manages blocked users.
  TypeORM is used to maintain strict data typing, handle complex queries, and enforce relational constraints (e.g., CASCADE deletes).

## Authentication

AutoLink uses stateless JSON Web Token (JWT) based authentication.

- Passwords are securely hashed using bcrypt.
- The NestJS backend issues JWTs upon login, validating them for subsequent API calls using Passport.js.
- This approach ensures robust security without the overhead of server-side session management.

## Challenges

- Implementing reliable real-time messaging and WebRTC signaling across varied network conditions.
- Ensuring seamless cross-platform performance (Android/iOS) and web compatibility.
- Balancing user privacy with platform safety, necessitating robust blocklist and reporting mechanisms.
- Designing an intuitive web fallback for users without the app to eliminate adoption friction.

## Performance

- Leverages NestJS modularity for scalable server-side processing.
- Real-time updates delivered efficiently through Socket.IO with automatic reconnection handling.
- Optimizes database queries using TypeORM, utilizing appropriate indexing on primary and foreign keys.
- Lightweight and compiled Flutter frontend ensures native-like performance and smooth 60fps animations.

## Deployment

- Designed to be easily containerized and deployed to cloud infrastructure.
- The PostgreSQL database can be hosted on managed database services.
- Web apps (Next.js) are optimized for modern edge deployments (e.g., Vercel).
- Mobile application built for distribution via Google Play Store.

## Lessons Learned

- Leveraging WebSockets (Socket.IO) alongside standard REST APIs provides the perfect balance between real-time responsiveness and structured data management.
- Designing a web-fallback interface is crucial for user acquisition where app installation presents a barrier to entry.
- Privacy-first communication encourages user adoption in public-facing utilities.
