package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"sistema-control-escolar/config"
	"sistema-control-escolar/models"
)

func CreateGrade(c *gin.Context) {
	var grade models.Grade
	if err := c.ShouldBindJSON(&grade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos: " + err.Error()})
		return
	}

	if err := config.DB.Create(&grade).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear la calificación: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, grade)
}

func GetGrades(c *gin.Context) {
	var grades []models.Grade
	if err := config.DB.Find(&grades).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo obtener las calificaciones: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, grades)
}
