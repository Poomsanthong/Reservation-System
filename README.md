# Reservation System

A modern web application for managing reservations, built with Next.js, TypeScript, and a modular component architecture.

## Demo Credentials

**Owner Dashboard**

- Email: Demo@gmail.com
- Password: Demo1234

## Features

- User authentication and authorization
- Admin dashboard for managing bookings
- Booking form and summary
- Guest details and party size selection
- Time slot grid for reservations
- Modal dialogs for editing, viewing, and canceling bookings
- State management with custom hooks and stores
- Responsive UI with reusable components
- Email automation ( need to use live domain otherwise it only work in dev mode)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **State Management:** Custom React hooks and stores
- **Database:** (Add your database info here)
- **APIs:** RESTful endpoints under `/api`

## Project Structure

```
reservation-system/
├── app/                # Next.js routes, layouts, and API handlers
├── features/           # Feature UI, hooks, types, and server logic
│   ├── ai/
│   ├── auth/
│   ├── bookings/
│   ├── dashboard/
│   ├── marketing/
│   ├── messages/
│   └── restaurants/
├── components/         # Shared layout components and UI primitives
├── lib/                # Shared utilities and infrastructure
│   ├── email/          # Resend client, templates, and message recording
│   ├── inngest/        # Inngest client and background functions
│   └── server/         # Shared server-only Supabase clients
├── shared/             # Cross-feature API client and validation schemas
├── store/              # Zustand stores for application state
└── public/             # Static assets
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in required values.
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Lint the codebase
