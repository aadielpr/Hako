# Hako (箱) - Your Family's Digital Box

<p align="center">
    <img src="web/src/assets/HakoSecondary.png" alt="Hako Logo" width="200" />
</p>

## About

Hako (箱), meaning "Box" in Japanese, is a comprehensive family management application designed to be your family's digital storage box. Just like a traditional family box that stores important documents, photos, and memories in a safe place, Hako provides a secure digital space for managing your family's needs.

## Features

### Financial Management
- Track monthly income and expenses
- Visualize spending patterns
- Set and monitor budgets
- Achieve financial goals

### Document Storage
- Secure storage for important documents
- Easy organization and retrieval
- Support for multiple file types
- Version history tracking

### Photo Gallery
- Store family photos
- Organize by events or dates
- Easy sharing between family members
- Backup important memories

### Family Records
- Keep track of important dates
- Store medical records
- Manage family schedules
- Document milestones

## Tech Stack

### Backend
- Go
- Clean Architecture
- RESTful API

### Frontend
- Vue 3
- Vite
- TailwindCSS
- Modern UI/UX

## Getting Started

### Prerequisites
- Go 1.21+
- Node.js 18+
- pnpm

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/hako.git
cd hako
```

2. Install dependencies
```bash
make install
```

### Development
```bash
# Run backend only (with hot reload)
make dev-backend

# Run frontend only
make dev-frontend

# Run both frontend & backend
make dev
```

### Production
```bash
# Build for production
make build

# Run production build
make prod
```

### Other Commands
```bash
# Clean build artifacts
make clean
```

## License
MIT 