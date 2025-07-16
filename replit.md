# BuildPro Connect - Construction Services Platform

## Overview

BuildPro Connect is a full-stack web application that connects property owners with professional construction contractors and skilled laborers. The platform facilitates finding and hiring construction professionals for residential, commercial, and industrial projects.

**Current Implementation**: The project has been rebuilt using vanilla HTML, CSS, and JavaScript with a Node.js/Express backend and PostgreSQL database. This provides a lightweight, fast-loading web application with full functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, and vanilla JavaScript
- **Styling**: Custom CSS with modern design patterns and responsive layouts
- **Backend**: Node.js with Express.js and TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **No Frontend Framework**: Pure JavaScript for DOM manipulation and API calls
- **Forms**: Native HTML5 forms with JavaScript validation
- **UI Components**: Custom CSS components with modern styling

### Architecture Pattern
The application follows a monorepo structure with clear separation between client, server, and shared code:
- **Client**: Vanilla HTML/CSS/JS SPA in the `client/` directory
- **Server**: Express API server in the `server/` directory  
- **Shared**: Common schemas and types in the `shared/` directory

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized in `shared/schema.ts` with tables for services, contractors, laborers, projects, and contact submissions
- **Migration**: Managed through Drizzle Kit with migrations stored in `./migrations`

### Data Storage
The application uses an abstraction layer (`IStorage` interface) that allows for different storage implementations:
- **Memory Storage**: In-memory implementation for development/testing
- **Database Storage**: PostgreSQL implementation for production
- **Storage Interface**: Provides methods for CRUD operations on all entities

### API Structure
RESTful API endpoints organized by entity:
- `/api/services` - Construction services with category filtering
- `/api/contractors` - Contractor profiles with specialty and location filtering
- `/api/laborers` - Individual laborers with availability status
- `/api/projects` - Project portfolio with contractor associations
- `/api/contact` - Contact form submissions

### Frontend Architecture
- **Component Structure**: Organized as a single-page application with section-based navigation
- **State Management**: Local JavaScript state management with API data fetching
- **Routing**: Hash-based routing with vanilla JavaScript navigation
- **Styling**: Custom CSS with modern design patterns and responsive layouts

## Data Flow

1. **Client Requests**: Vanilla JavaScript makes fetch API calls to backend endpoints
2. **API Layer**: Express routes handle requests and delegate to storage layer
3. **Storage Layer**: Storage implementation performs database operations via Drizzle ORM
4. **Response**: Data flows back through the layers with JSON responses rendered via DOM manipulation

### Key Data Entities
- **Services**: Construction services categorized by type (residential, commercial, industrial)
- **Contractors**: Professional contractors with specialties, ratings, and location data
- **Laborers**: Individual skilled workers with hourly rates and availability
- **Projects**: Portfolio showcasing completed work by contractors
- **Contact Submissions**: Customer inquiries and project requests

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod for schema validation on the backend
- **No External UI Libraries**: Pure CSS and vanilla JavaScript implementation

### Development Dependencies
- **Build Tool**: Vite for fast development and optimized builds
- **TypeScript**: Full type safety across the application
- **ESBuild**: For server-side bundling in production

## Deployment Strategy

### Build Process
1. **Client Build**: Static HTML/CSS/JS files served directly from `client/` directory
2. **Server Build**: ESBuild bundles the Express server to `dist/index.js`
3. **Database**: Drizzle migrations are applied via `db:push` command

### Environment Configuration
- **Development**: Uses Vite dev server for hot reloading of static files
- **Production**: Serves static files from Express with proper error handling
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (configured for Neon Database)
- Environment variables for database connection and any external service integrations

The application is designed to be deployed on platforms that support full-stack Node.js applications with database connectivity.