# Hako App

Vue 3 + Golang Echo starter application.

## Structure

```
cmd/               # Main applications
├── server/        # HTTP server
internal/          # Private application code
├── handler/       # HTTP handlers
├── service/       # Business logic
├── middleware/    # HTTP middleware
└── dto/          # Data transfer objects
web/              # Vue 3 frontend
```

## Development

### Setup
```bash
make install
```

### Development
```bash
# Both frontend + backend with hot reload
make dev-all

# Or separate:
make dev-frontend    # Vue dev server (localhost:3000)
make dev-backend     # Go server with Air hot reload (localhost:8080)
```

### Production Build & Run
```bash
make build
make prod
```

Single server on http://localhost:8080 serves both API and frontend. 