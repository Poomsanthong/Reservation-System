# Reservation System

A modern web application for managing reservations, built with Next.js, TypeScript, and a modular component architecture.

## Demo Credentials

**Owner Dashboard**

- Email: owner@test.com
- Password: Test1234

## Features

- User authentication and authorization
- Admin dashboard for managing bookings
- Booking form and summary
- Guest details and party size selection
- Time slot grid for reservations
- Modal dialogs for editing, viewing, and canceling bookings
- State management with custom hooks and stores
- Responsive UI with reusable components

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
├── app/                # Next.js app directory
│   ├── (auth)/         # Authentication pages
│   ├── (root)/         # Main landing pages
│   ├── (admin)/        # Admin dashboard
│   └── api/            # API routes
├── components/         # Reusable UI and page components
│   ├── AdminDashbaordPage/
│   ├── BookingPage/
│   ├── modal/
│   └── ui/
├── lib/                # Helpers, utilities, and actions
├── public/             # Static assets
├── store/              # Zustand stores for state management
├── ...                 # Config and setup file
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
