package handler

import (
	"hako-backend/internal/service"
	"net/http"

	"github.com/labstack/echo/v4"
)

func RegisterHealthRoutes(g *echo.Group) {
	g.GET("/health", GetHealth)
}

func GetHealth(c echo.Context) error {
	response := service.GetHealthStatus()
	return c.JSON(http.StatusOK, response)
}
