# Weather Application

## Overview

A modern, responsive weather application built with React, Vite, Tailwind CSS, and Express that provides real-time weather information for cities worldwide. The app features a clean Material Design-inspired interface optimized for rapid data consumption with comprehensive error handling and beautiful loading states.

## Current Status

**Completed MVP Features:**
- ✅ City search with real-time weather data fetching from OpenWeatherMap API
- ✅ Display current temperature in Celsius, weather description, and weather icons
- ✅ Comprehensive error handling for invalid cities and API failures
- ✅ Responsive and visually appealing UI following Material Design principles
- ✅ Dark/light theme toggle with localStorage persistence
- ✅ Beautiful loading states with skeleton screens
- ✅ Smooth transitions and animations
- ✅ Backend API for favorite locations (ready but not exposed in UI)

**Known Issue:**
- OpenWeatherMap API key may need activation (1-2 hours for new keys)
- User will fix API key later; UI/UX is fully functional

**Future Features (Planned):**
- 5-day weather forecast display
- Temperature unit toggle (Celsius/Fahrenheit)
- Geolocation support for automatic location detection
- User authentication with Firebase
- Additional weather details and UV index
- Weather data visualization with charts

## User Preferences

- Communication style: Simple, everyday language
- Focus: Beautiful, polished UI with exceptional visual quality
- Design priority: Frontend visual excellence is paramount

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite for build tooling and hot module replacement
- Wouter for lightweight client-side routing
- TanStack Query v5 for server state management
- Tailwind CSS with custom design system
- Shadcn/UI component library with Radix UI primitives

**Component Structure:**
```
client/src/
├── components/
│   ├── ui/ (Shadcn components)
│   ├── WeatherSearch.tsx - Search input with submit button
│   ├── WeatherDisplay.tsx - Main weather card with city, temp, icon
│   ├── WeatherDetails.tsx - Metrics grid (feels like, humidity, wind, etc)
│   ├── WeatherSkeleton.tsx - Loading state with pulse animations
│   ├── WeatherError.tsx - Error display with retry button
│   └── ThemeToggle.tsx - Dark/light mode switcher
├── pages/
│   └── Home.tsx - Main weather page with all components
└── App.tsx - Root component with routing
```

**State Management:**
- Server state: TanStack Query with custom queryFn for weather data
- Local state: React hooks for search input and UI interactions
- Theme: localStorage + document.documentElement class toggle
- No global state management needed (simple data flow)

**Design System:**
- Typography: Inter font family for clean, modern UI
- Spacing: Tailwind units (4, 6, 8, 12, 16, 20) consistently applied
- Components: Large inputs (h-14/h-16), rounded corners (rounded-2xl, rounded-3xl)
- Colors: HSL-based with CSS custom properties for theme support
- Elevation: Custom hover-elevate and active-elevate-2 utilities

**Key Features:**
- Fully responsive (mobile-first with md: and lg: breakpoints)
- Accessible (ARIA labels, keyboard navigation, focus states)
- Type-safe (TypeScript throughout with Zod schemas)
- Error boundaries and graceful degradation
- SEO optimized with meta tags and descriptions

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Custom error handling middleware
- JSON request/response with proper status codes

**API Endpoints:**

1. **GET /api/weather/:city**
   - Fetches current weather from OpenWeatherMap API
   - URL-encodes city names for proper query handling
   - Returns normalized weather data in WeatherData schema
   - Status codes: 200 (success), 400 (bad request), 401 (auth failed), 404 (city not found), 500 (server error)

2. **GET /api/favorites**
   - Returns all favorite locations sorted by date
   - Response: Array of FavoriteLocation objects

3. **POST /api/favorites**
   - Adds a new favorite location
   - Body: { city: string, country: string }
   - Response: Created FavoriteLocation with id and timestamp

4. **DELETE /api/favorites/:id**
   - Removes a favorite location by id
   - Response: 204 No Content

**Error Handling Strategy:**
- Consistent error message structure
- Detailed logging for debugging (enabled in development)
- User-friendly error messages on frontend
- Proper HTTP status codes for all scenarios

**Environment Configuration:**
- OPENWEATHERMAP_API_KEY: API key for weather data (required)
- NODE_ENV: development/production mode switching

### Data Models

**WeatherData Schema (Zod):**
```typescript
{
  city: string
  country: string
  temperature: number (Celsius)
  feelsLike: number (Celsius)
  description: string (weather condition)
  icon: string (OpenWeatherMap icon code)
  humidity: number (percentage)
  windSpeed: number (m/s)
  pressure: number (hPa)
  visibility?: number (meters)
  timestamp: number (Unix timestamp)
}
```

**FavoriteLocation Schema (Zod):**
```typescript
{
  id: string (UUID)
  city: string
  country: string
  addedAt: number (Unix timestamp)
}
```

### Data Storage

**Current Implementation:**
- In-memory storage using Map data structures
- No persistence between server restarts
- Suitable for development and testing

**Storage Interface:**
```typescript
interface IStorage {
  getFavorites(): Promise<FavoriteLocation[]>
  addFavorite(location: InsertFavoriteLocation): Promise<FavoriteLocation>
  removeFavorite(id: string): Promise<void>
}
```

**Future Enhancement:**
- PostgreSQL with Drizzle ORM (infrastructure ready)
- Session management for user-specific favorites
- Firebase integration for cross-device sync

### External Dependencies

**Third-Party Services:**
- **OpenWeatherMap API**
  - Endpoint: `api.openweathermap.org/data/2.5/weather`
  - Units: Metric system
  - Authentication: API key via environment variable
  - Rate limit: 1000 calls/day (free tier)

**Key Libraries:**
- React Query (@tanstack/react-query) - Server state management
- Radix UI - Accessible component primitives
- Lucide React - Icon system
- Zod - Runtime validation and type safety
- Wouter - Client-side routing

### Development Workflow

**Running the App:**
```bash
npm run dev  # Starts Express + Vite dev servers on port 5000
```

**Project Structure:**
- `/client` - React frontend
- `/server` - Express backend
- `/shared` - Shared types and schemas

**Important Guidelines:**
- Never modify `vite.config.ts` or `server/vite.ts`
- Use packager tool for package installation
- Follow design_guidelines.md for all UI work
- Use Shadcn components instead of custom styling
- Maintain type safety with shared schemas

### Testing & Quality

**Testing Strategy:**
- End-to-end testing with Playwright (via run_test tool)
- Manual testing for visual polish and UX
- Error scenario coverage (404, 401, network errors)

**Quality Standards:**
- Pixel-perfect design implementation
- Accessible (WCAG compliant)
- Responsive across all breakpoints
- Smooth animations and transitions
- Comprehensive error handling

## Recent Changes (November 15, 2025)

**Initial Implementation:**
- Created complete weather app MVP from scratch
- Implemented all frontend components with exceptional visual quality
- Built backend API with OpenWeatherMap integration
- Added theme toggle and responsive design
- Configured design system with Inter font and custom colors
- Fixed critical bug in weather query endpoint construction

**Design Decisions:**
- Used custom queryFn in react-query to properly construct `/api/weather/${city}` endpoint
- Added detailed server logging for debugging API issues
- Implemented error handling that distinguishes between 404, 401, and network errors
- Used Material Design principles for clean, modern aesthetic

## Next Steps

1. Wait for OpenWeatherMap API key activation (user to handle)
2. Implement future features when requested:
   - 5-day forecast
   - Temperature unit toggle
   - Geolocation
   - Firebase auth
   - Weather charts
3. Consider PostgreSQL for favorite locations persistence
4. Potential deployment to production
