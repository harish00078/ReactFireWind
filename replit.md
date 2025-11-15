# Weather Application

## Overview

A modern, single-page weather application that provides real-time weather information for cities worldwide. Built with React, Express, and TypeScript, the application features a clean Material Design-inspired interface optimized for rapid data consumption. Users can search for any city to view current weather conditions including temperature, humidity, wind speed, and other meteorological data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching
- Tailwind CSS for utility-first styling with custom design tokens

**UI Component System:**
- Shadcn/UI component library with Radix UI primitives
- Custom theme system supporting light/dark modes with CSS variables
- Material Design principles with influences from Apple Weather and Google Weather
- Responsive design with mobile-first approach (breakpoint at 768px)

**State Management Strategy:**
- Server state managed by React Query with disabled automatic refetching
- Local UI state managed with React hooks
- Theme preference persisted in localStorage
- No global state management library needed due to simple data flow

**Design System:**
- Typography: Inter font family for UI elements
- Spacing: Consistent Tailwind units (4, 6, 8, 12, 16, 20)
- Components: Large, prominent inputs (h-14/h-16), rounded corners (rounded-2xl, rounded-3xl)
- Color system: HSL-based with CSS custom properties for theme support
- Cards use elevated shadow system with hover states

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the stack
- Custom middleware for request logging and JSON response capture

**API Design:**
- RESTful endpoint pattern: `GET /api/weather/:city`
- URL-encoded city names for search
- Standardized error responses with appropriate HTTP status codes
- Response transformation to normalize OpenWeatherMap data

**Error Handling Strategy:**
- 400 for missing/invalid parameters
- 404 for cities not found
- 500 for server configuration issues
- Graceful error message extraction from external API failures

**Development vs Production:**
- Vite dev server with HMR in development mode
- Static file serving in production
- Environment-based configuration switching

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using Map data structure for favorite locations
- No persistent database currently configured
- Data structures defined using Zod schemas for runtime validation

**Database Configuration (Prepared but Not Active):**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver available
- Schema defined in `shared/schema.ts` with favorite locations structure
- Migration setup prepared with `drizzle-kit`

**Data Models:**
- Weather data: Validated with Zod schemas including city, temperature, conditions, and metrics
- Favorite locations: ID, city name, country code, and timestamp
- Type-safe interfaces shared between client and server

### External Dependencies

**Third-Party Services:**
- **OpenWeatherMap API**: Primary weather data provider
  - Endpoint: `api.openweathermap.org/data/2.5/weather`
  - Units: Metric system
  - Authentication: API key via environment variable `OPENWEATHERMAP_API_KEY`
  - Rate limiting and error handling implemented

**UI Libraries:**
- Multiple Radix UI primitives for accessible components (dialogs, dropdowns, tooltips, etc.)
- Lucide React for icon system
- Class Variance Authority for component variant management

**Development Tools:**
- Replit-specific plugins for development experience (cartographer, dev banner, runtime error overlay)
- ESBuild for production server bundling
- PostCSS with Autoprefixer for CSS processing

**Validation and Type Safety:**
- Zod for runtime schema validation
- TypeScript for compile-time type checking
- Shared types between client and server via `shared/` directory

**Session Management:**
- Connect-pg-simple prepared for PostgreSQL session storage
- Session management infrastructure available but not currently active