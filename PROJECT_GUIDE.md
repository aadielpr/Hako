# Hako - Project Guide

## Project Structure

```
Hako/
  ├── cmd/
  │   └── server/          # Main server entry point
  ├── internal/
  │   ├── handler/         # HTTP handlers
  │   ├── middleware/      # HTTP middleware
  │   ├── models/          # Data models
  │   └── service/         # Business logic
  └── web/                 # Frontend application
      ├── src/
      │   ├── assets/      # Static assets (images, etc)
      │   ├── components/  # Vue components
      │   ├── router/      # Vue router configuration
      │   ├── utils/       # Utility functions
      │   └── views/       # Vue views/pages
      └── public/          # Public static files
```

## Current Progress

### Backend (Go)
- Basic server setup with Go
- Health check endpoint
- Project structure following clean architecture

### Frontend (Vue.js)
1. Core Setup
   - Vue 3 with Vite
   - TailwindCSS for styling
   - Vue Router for navigation
   - Dark theme implementation

2. Components
   - SummaryCards: Monthly income, expenses, and savings overview
   - MonthlyChart: Bar chart showing financial overview
   - ExpensesCategory: Pie chart for expense categories
   - BudgetStatus: Budget tracking with circular progress
   - ExpensesList: Recent transactions list

3. Views
   - Expenses: Main dashboard with financial overview
   - Budget: Budget management (in progress)
   - Categories: Expense categories (in progress)
   - Achievements: Financial goals (planned)

4. Features Implemented
   - Responsive design for mobile and desktop
   - Modern, minimalist UI with dark theme
   - Interactive charts and visualizations
   - Currency formatting for Indonesian Rupiah
   - Component-based architecture for better maintainability

## Next Steps
1. Backend Development
   - Database setup (PostgreSQL)
   - User authentication
   - CRUD operations for expenses
   - File storage system

2. Frontend Development
   - Complete remaining views
   - File upload and management
   - User settings and preferences
   - Family member management
   - Document organization system

3. Features Planned
   - Document storage and organization
   - Photo gallery
   - Family records management
   - Expense tracking and analysis
   - Budget planning tools
   - Family calendar integration

## Development Guidelines

### Code Style
- Use spaces for indentation (4 spaces)
- Follow language-specific conventions (camelCase for JS, snake_case for Python)
- Minimize dev dependencies
- Prefer clear function declarations
- Keep code modular and maintainable

### Component Structure
- Split large components into smaller, reusable ones
- Keep components focused on single responsibility
- Use props for component communication
- Maintain consistent styling across components

### Git Workflow
- Use meaningful commit messages
- Create feature branches for new development
- Review code before merging to main
- Keep commits focused and atomic

## Project Overview

A personal family app for managing media files and tracking daily expenses. Built with Vue 3 frontend and Go Echo backend.

## Core Features

### 📸 Media Storage
- **Photos**: Upload, organize, and view family photos
- **Videos**: Store and stream family videos  
- **Documents**: Upload and manage important family documents
- **Organization**: Folders, tags, search functionality
- **Sharing**: Share media between family members

### 💰 Expense Tracking
- **Daily Records**: Log daily expenses and income
- **Categories**: Organize by expense types (food, transport, utilities, etc.)
- **Visualizations**: Charts and graphs for spending analysis
- **Reports**: Monthly/yearly financial summaries
- **Budget Tracking**: Set and monitor budget limits

## Technical Stack

- **Frontend**: Vue 3 + Vite + Pnpm + Tailwind CSS + Vue Router
- **Backend**: Go + Echo Framework
- **Database**: TBD (PostgreSQL/SQLite)
- **File Storage**: Local filesystem or cloud storage
- **Hot Reload**: Air for Go, Vite HMR for Vue
- **UI Theme**: Dark theme (Vercel/X inspired, slightly brighter/silver)
- **Design**: Mobile-first responsive design with Tailwind CSS

## Project Structure

```
Hako/
├── cmd/server/          # Go server entry point
├── internal/            # Private Go code
│   ├── handler/         # HTTP handlers
│   ├── service/         # Business logic
│   ├── middleware/      # HTTP middleware
│   └── models/          # Data models
├── web/                 # Vue 3 frontend
│   ├── src/
│   │   ├── components/  # Vue components
│   │   ├── views/       # Page components
│   │   ├── router/      # Vue Router configuration
│   │   └── assets/      # Static assets
│   └── tailwind.config.js
├── bin/                 # Build outputs
└── migrations/          # Database migrations (future)
```

## Development Phases

### Phase 1: Foundation ✅
- [x] Project structure setup
- [x] Go Echo server with hot reload
- [x] Vue 3 frontend with Vite
- [x] Build system and deployment setup
- [x] Basic health check API

### Phase 2: Authentication & Family Management
- [ ] Family login system (single account per family)
- [ ] Manual family account creation script
- [ ] JWT authentication
- [ ] Protected routes
- [ ] Multi-family support

### Phase 3: Expense Tracking Module
- [ ] Expense/income entry forms
- [ ] Category management with budget allocation
- [ ] Data visualization (charts/graphs)
- [ ] Monthly/yearly reports
- [ ] Budget setting per category and monitoring
- [ ] Gamification system (achievements, savings goals)
- [ ] Achievement system (monthly savings targets)
- [ ] Export functionality

### Phase 4: Media Storage Module
- [ ] File upload API (photos, videos, documents)
- [ ] File storage system (local/cloud)
- [ ] Folder organization (custom sections: kids photos, travel, etc.)
- [ ] Bulk photo import script (from local folders)
- [ ] Media gallery interface with folder views
- [ ] Search and filtering
- [ ] Media preview/viewer

### Phase 5: Advanced Features
- [ ] Push notifications
- [ ] Data backup/restore
- [ ] Multi-language support (if needed)
- [ ] Multi-family tenant support

## Database Schema (Draft)

### Families Table
- id, family_name, email, password, avatar_path, created_at, updated_at

### Media Files Table  
- id, family_id, filename, file_path, file_type, file_size, folder_id, tags, uploaded_at

### Folders Table
- id, family_id, name, parent_id, created_at

### Expenses Table
- id, family_id, amount, category_id, description, transaction_type (income/expense), date, created_at

### Categories Table
- id, name, type (income/expense), color, icon, budget_limit

### Achievements Table
- id, family_id, achievement_type, target_amount, achieved_amount, achieved_at, month_year

### Budget Settings Table
- id, family_id, category_id, monthly_limit, current_spent, month_year

## API Endpoints (Planned)

### Authentication
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Media Management
- GET /api/media - List files
- POST /api/media/upload - Upload file
- DELETE /api/media/:id - Delete file
- GET /api/media/:id/download - Download file

### Expense Tracking
- GET /api/expenses - List expenses
- POST /api/expenses - Create expense
- PUT /api/expenses/:id - Update expense
- DELETE /api/expenses/:id - Delete expense
- GET /api/expenses/analytics - Get charts data
- GET /api/budget - Get budget status by category
- POST /api/budget - Set category budget
- GET /api/achievements - Get user achievements
- POST /api/achievements/check - Check and unlock achievements

## Security Considerations

- [ ] File type validation
- [ ] File size limits
- [ ] Secure file storage
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Rate limiting

## Deployment Strategy

- Single binary deployment (Go serves Vue build)
- Docker containerization
- Environment-based configuration
- Database migrations
- Backup strategies

## Success Criteria

1. **For Wife**: Easy expense tracking with visual insights
2. **For Family**: Secure media storage and sharing
3. **For Me**: Learning Go and building something useful
4. **Technical**: Clean code, good performance, maintainable

## Scripts & Tools

### Family & User Management Script
```bash
# Create new family account
go run scripts/create-family.go --name "Smith Family" --email "smith@family.local" --password "secure123"
```

### Bulk Media Import Script  
```bash
# Import photos from local folder to organized sections
go run scripts/import-media.go --source "/path/to/photos" --section "Kids Photos" --family-id 1
```

### Achievement Types
- **Monthly Saver**: Save X amount in a month
- **Budget Master**: Stay under budget in all categories for a month
- **Streak Keeper**: Log expenses for X consecutive days
- **Category King**: Optimize spending in specific category

### Budget System
- Set monthly limits per category
- Real-time tracking of spending vs budget
- Visual indicators (green/yellow/red) for budget status
- Automatic achievement checking when budget goals met

## Design System

### Color Palette (Dark Theme)
- **Background**: Slightly brighter than Vercel/X dark
- **Cards/Surfaces**: Silver-tinted dark surfaces
- **Text**: High contrast white/light gray
- **Accents**: Subtle color highlights for categories/achievements
- **Success/Error**: Green/Red with good contrast

### Mobile-First Approach
- Touch-friendly interface (44px minimum touch targets)
- Swipe gestures for navigation
- Responsive breakpoints: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- Bottom navigation for mobile
- Collapsible sidebar for larger screens

## Notes

- Keep it simple and focused on family needs
- Prioritize usability over complex features
- Mobile-first responsive design
- Plan for future multi-family scalability
- Manual family account creation (no public registration)
- Gamification should motivate, not overwhelm
- Dark theme throughout (inspired by Vercel/X but brighter) 