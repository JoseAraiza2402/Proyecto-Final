package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"sistema-control-escolar/config"
	"sistema-control-escolar/routes"
)

func main() {
	// Inicializar la base de datos
	config.ConnectDatabase()

	// Configurar el router de Gin
	router := gin.Default()

	// Configurar CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Registrar las rutas
	routes.SetupRoutes(router)

	// Iniciar el servidor
	router.Run(":8080")

}
