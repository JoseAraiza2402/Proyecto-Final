package handlers

import (
	"net/http"
	"sistema-control-escolar/config"
	"sistema-control-escolar/models"

	"github.com/gin-gonic/gin"
)

func CreateStudent(c *gin.Context) {
	var student models.Student
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos: " + err.Error()})
		return
	}

	if err := config.DB.Create(&student).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear el estudiante: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, student)
}

func GetStudents(c *gin.Context) {
	var students []models.Student
	if err := config.DB.Find(&students).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo obtener los estudiantes"})
		return
	}
	c.JSON(http.StatusOK, students)
}

func GetStudent(c *gin.Context) {
	var student models.Student
	studentID := c.Param("student_id")
	if err := config.DB.First(&student, studentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	c.JSON(http.StatusOK, student)
}

func UpdateStudent(c *gin.Context) {
	var student models.Student
	studentID := c.Param("student_id")
	if err := config.DB.First(&student, studentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}
	config.DB.Save(&student)
	c.JSON(http.StatusOK, student)
}

func DeleteStudent(c *gin.Context) {
	studentID := c.Param("student_id")
	if err := config.DB.Delete(&models.Student{}, studentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Estudiante eliminado"})
}
