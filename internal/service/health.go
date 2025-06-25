package service

import "hako-backend/internal/models"

func GetHealthStatus() models.HealthResponse {
	return models.HealthResponse{
		Status:  "healthy",
		Message: "API is running successfully",
	}
}
