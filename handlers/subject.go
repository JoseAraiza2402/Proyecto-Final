package handlers

import (
	"net/http"
	"sistema-control-escolar/config"
	"sistema-control-escolar/models"

	"github.com/gin-gonic/gin"
)

func CreateSubject(c *gin.Context) {
	var subject models.Subject
	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}
	if err := config.DB.Create(&subject).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear la materia"})
		return
	}
	c.JSON(http.StatusCreated, subject)
}

func GetSubjects(c *gin.Context) {
	var subjects []models.Subject
	if err := config.DB.Find(&subjects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo obtener las materias: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, subjects)
}

func UpdateSubject(c *gin.Context) {
	var subject models.Subject
	subjectID := c.Param("subject_id")
	if err := config.DB.First(&subject, subjectID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Materia no encontrada"})
		return
	}
	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}
	config.DB.Save(&subject)
	c.JSON(http.StatusOK, subject)
}

func DeleteSubject(c *gin.Context) {
	subjectID := c.Param("subject_id")
	if err := config.DB.Delete(&models.Subject{}, subjectID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Materia no encontrada"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Materia eliminada"})
}
