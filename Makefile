.PHONY: dev build clean install dev-all

install:
	cd web && pnpm install
	cd backend && go mod tidy
	go install github.com/air-verse/air@latest

dev-frontend:
	cd web && pnpm dev

dev-backend:
	cd backend && air

dev:
	make dev-backend & make dev-frontend

build:
	mkdir -p bin
	cd web && pnpm build --outDir ../bin/web --emptyOutDir
	cd backend && go build -o ../bin/hako cmd/server/main.go

clean:
	rm -rf bin
	rm -rf tmp

prod: build
	./bin/hako 