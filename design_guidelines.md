# Weather App Design Guidelines

## Design Approach
**System**: Material Design principles with influences from Apple Weather and Google Weather - optimized for information clarity and rapid data consumption. Focus on clean hierarchy, generous spacing, and intuitive data visualization.

## Layout Architecture

**Single-Page Application Structure**:
- Full viewport experience with centered content container (max-w-2xl)
- Vertical flow: Search bar → Weather display → Additional details
- Use tailwind spacing units: 4, 6, 8, 12, 16, 20 consistently throughout

**Grid System**:
- Primary content: Single column on mobile, centered layout on desktop
- Weather details: 2-column grid on tablet/desktop (md:grid-cols-2)
- Hourly forecast: Horizontal scrollable cards (flex overflow-x-auto)

## Typography Hierarchy

**Font Selection**: Google Fonts - Inter for UI elements, system font stack for fallback
- Primary Heading (City/Location): text-4xl md:text-5xl, font-bold
- Temperature Display: text-6xl md:text-7xl, font-light (major focal point)
- Weather Description: text-xl md:text-2xl, font-medium
- Data Labels: text-sm, font-semibold, uppercase tracking-wide
- Data Values: text-lg md:text-xl, font-normal
- Error Messages: text-base, font-medium

## Component Library

### Search Component
- Large, prominent search input: h-14 md:h-16, text-lg with rounded-2xl
- Search icon positioned inside input (left side)
- Submit button integrated into input (right side) with rounded-full
- Floating label or placeholder: "Enter city name..."
- Full-width on mobile, max-w-xl centered on desktop

### Weather Display Card
- Primary card container: rounded-3xl, p-8 md:p-12
- Content hierarchy: Location name → Temperature → Weather icon → Description
- Weather icon: Large and prominent (w-32 h-32 md:w-40 h-40)
- Vertical centering of main weather info
- Use OpenWeatherMap icon codes to display appropriate weather icons

### Details Grid
- 2x2 or 2x3 grid layout of metric cards
- Each metric card: rounded-2xl, p-6
- Metrics to display: Feels Like, Humidity, Wind Speed, Pressure, Visibility, UV Index
- Icon + Label + Value layout per card
- Icons from Heroicons (outline style)

### Loading State
- Skeleton screens with pulse animation
- Match the shape/size of actual content containers
- Smooth fade-in transition when data loads

### Error State
- Alert card: rounded-2xl, p-6
- Icon (exclamation triangle) + Error message
- Subtle animation on appearance
- "Try again" action button

## Spacing & Rhythm

**Vertical Spacing**:
- Section gaps: space-y-8 md:space-y-12
- Card internal padding: p-6 to p-12 based on hierarchy
- Between elements within cards: space-y-4 to space-y-6

**Horizontal Spacing**:
- Container padding: px-4 md:px-6
- Grid gaps: gap-4 md:gap-6
- Button padding: px-8 py-3

## Page Structure

### Hero/Search Section
- Positioned at top with generous padding (pt-16 md:pt-24)
- App title/logo (if included): text-2xl, font-bold, mb-12
- Search input as primary focal point
- Clean, minimal background

### Current Weather Section
- Appears after successful search
- Large card displaying primary weather info
- Smooth slide-up animation on data load (animate-in)

### Additional Details Section
- Grid of secondary metrics below main card
- Each card emphasizes readability over decoration
- Consistent icon sizing (w-6 h-6)

### Footer (optional)
- Attribution to OpenWeatherMap
- Minimal, text-sm, centered
- mt-16 md:mt-24

## Images

**No hero images**. This is a utility app focused on data display. Instead:
- Use OpenWeatherMap API icons for weather conditions
- Icons from Heroicons for UI elements (search, metrics)
- Clean, minimal backgrounds without images
- Consider subtle gradient backgrounds for visual interest (not specified in color guidelines)

## Responsive Behavior

**Mobile (base)**:
- Single column layout
- Full-width search and cards
- Stacked metric cards (grid-cols-1)
- Compact spacing (p-4, space-y-6)

**Tablet (md: 768px+)**:
- Centered content container
- 2-column metric grid
- Increased spacing and font sizes
- Search input max-width constraint

**Desktop (lg: 1024px+)**:
- Maximum content width (max-w-2xl or max-w-3xl)
- Enhanced typography scale
- Generous whitespace

## Interaction Patterns

**Search Flow**:
1. User types city name
2. Submit via button click or Enter key
3. Show loading state immediately
4. Fade in weather data or error message
5. Clear previous results before showing new data

**Error Handling**:
- Invalid city: "City not found. Please check spelling."
- API error: "Unable to fetch weather data. Please try again."
- Network error: "Connection issue. Check your internet."
- Position error messages below search input

## Accessibility

- Proper label associations for inputs
- ARIA labels for icon-only buttons
- Focus states: ring-2 ring-offset-2 on all interactive elements
- Error messages with appropriate ARIA roles
- Keyboard navigation support throughout
- High contrast text for readability

## Animation Guidelines

**Minimal, purposeful animations only**:
- Fade in weather data: transition-opacity duration-300
- Skeleton pulse: animate-pulse
- Error shake: Brief horizontal shake animation
- No hover animations on static elements
- Button hover: subtle scale or brightness change

This weather app prioritizes clarity, speed, and usability while maintaining modern visual appeal through thoughtful spacing, typography, and component design.