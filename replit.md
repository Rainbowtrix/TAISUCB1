# Logistics & Freight Management System

## Overview

A comprehensive logistics and freight management web application for tracking rides, cargo, warehouse operations, and documents. The system provides dual views (broker and client) for managing transportation data, customs documentation, and warehouse operations. Built as a full-stack TypeScript application with React frontend and Express backend, designed for enterprise-grade data management with professional UI polish.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server with HMR support
- **Wouter** for lightweight client-side routing
- **Single Page Application (SPA)** architecture with client-side routing

**State Management & Data Fetching**
- **TanStack Query (React Query)** for server state management, caching, and data synchronization
- Custom query client configured with `getQueryFn` helper for standardized API requests
- No global client state management (relies on React Query cache and local component state)

**UI Component System**
- **shadcn/ui** component library (New York style variant) with Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- Component composition pattern using Radix UI headless components
- Custom CSS variables for theming (light/dark mode support)
- Design system emphasizes data-first approach for enterprise logistics interfaces

**Styling Strategy**
- Tailwind configured with custom spacing (max-w-7xl containers for wide data tables)
- CSS custom properties for color theming with HSL values
- Inter font family via Google Fonts CDN
- Responsive design with mobile-first breakpoints
- Hover/active elevation effects using custom CSS classes

**Key UI Patterns**
- Data-heavy table interfaces with horizontal scroll on mobile
- Modal dialogs for detailed cargo/operation views
- Dual view system (broker vs client) with different permission levels
- Toast notifications for user feedback
- Form validation with react-hook-form and zod resolvers

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for REST API endpoints
- **HTTP server** created using Node's `http` module (ready for WebSocket upgrade)
- Development mode uses Vite middleware for seamless HMR integration
- Production serves static files from `dist/public` directory

**Database & ORM**
- **Drizzle ORM** configured for PostgreSQL dialect
- Schema-first approach with TypeScript type inference
- Database migrations stored in `./migrations` directory
- Zod schema validation using `drizzle-zod` for runtime type safety
- Minimal starter schema includes users table with UUID primary keys

**Session Management**
- **express-session** prepared for user sessions
- **connect-pg-simple** for PostgreSQL-backed session store (when database is provisioned)
- In-memory storage fallback with `MemStorage` class implementation

**Storage Layer**
- Abstract `IStorage` interface defining CRUD operations
- `MemStorage` implementation for development/testing without database
- Designed for easy swap to database-backed storage once PostgreSQL is configured
- User management methods (getUser, getUserByUsername, createUser) as starter implementation

**API Design Approach**
- RESTful endpoint structure with `/api` prefix convention
- JSON request/body parsing with raw body preservation for webhooks
- CORS-ready configuration
- Request logging middleware with duration tracking
- Error handling follows HTTP status code conventions

**Build & Deployment**
- **esbuild** for server-side bundling with selective dependency bundling
- Dependencies allowlist to reduce cold start times (bundles specific packages like drizzle-orm, express, zod)
- External dependencies excluded from bundle to leverage Node modules
- Separate Vite build for client assets
- Production mode serves pre-built static files

### External Dependencies

**Third-Party UI Libraries**
- Radix UI component primitives (dialogs, dropdowns, popovers, tabs, etc.)
- Lucide React for iconography
- cmdk for command palette components
- embla-carousel-react for carousel functionality
- react-day-picker for date selection

**Development Tools**
- Replit plugins (cartographer, dev-banner, runtime-error-modal) for development environment
- TypeScript for type checking across client/server/shared code
- PostCSS with Tailwind and Autoprefixer

**Database & Session (Prepared)**
- PostgreSQL (via `pg` driver) - connection configured via DATABASE_URL environment variable
- connect-pg-simple for session persistence
- Drizzle Kit for schema migrations

**Validation & Schemas**
- Zod for runtime type validation
- drizzle-zod for ORM schema validation integration
- zod-validation-error for enhanced error messages

**Utilities**
- date-fns for date manipulation
- nanoid for unique ID generation
- clsx and tailwind-merge (via cn utility) for conditional className composition
- class-variance-authority for component variant management

**Build Dependencies**
- esbuild for server bundling
- Vite for client bundling
- tsx for TypeScript execution in development