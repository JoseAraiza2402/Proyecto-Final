package routes

import (
	"github.com/gin-gonic/gin"
	"sistema-control-escolar/handlers"
)

func SetupRoutes(router *gin.Engine) {
	// Rutas para estudiantes
	router.POST("/api/students", handlers.CreateStudent)
	router.GET("/api/students", handlers.GetStudents)
	router.GET("/api/students/:student_id", handlers.GetStudent)
	router.PUT("/api/students/:student_id", handlers.UpdateStudent)
	router.DELETE("/api/students/:student_id", handlers.DeleteStudent)

	// Rutas para materias
	router.POST("/api/subjects", handlers.CreateSubject)
	router.GET("/api/subjects", handlers.GetSubjects)
	router.PUT("/api/subjects/:subject_id", handlers.UpdateSubject)
	router.DELETE("/api/subjects/:subject_id", handlers.DeleteSubject)

	// Rutas para calificaciones
	router.POST("/api/grades", handlers.CreateGrade)
	router.PUT("/api/grades/:grade_id", handlers.UpdateGrade)
	router.DELETE("/api/grades/:grade_id", handlers.DeleteGrade)
	router.GET("/api/grades", handlers.GetGrades)
	router.GET("/api/grades/:grade_id/student/:student_id", handlers.GetGradeByStudentAndSubject)
	router.GET("/api/grades/student/:student_id", handlers.GetGradesByStudent)

}
