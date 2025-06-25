package main

import (
	"hako-backend/internal/handler"
	"hako-backend/internal/middleware"
	"log"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	middleware.Setup(e)
	setupStaticFiles(e)
	setupRoutes(e)

	log.Println("Starting server on :8080")
	e.Logger.Fatal(e.Start(":8080"))
}

func setupRoutes(e *echo.Echo) {
	api := e.Group("/api")

	handler.RegisterHealthRoutes(api)
}

func setupStaticFiles(e *echo.Echo) {
	e.Static("/assets", "bin/web/assets")
	e.File("/", "bin/web/index.html")
	e.GET("/*", func(c echo.Context) error {
		return c.File("bin/web/index.html")
	})
}
