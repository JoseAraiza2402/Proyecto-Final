package models

type Grade struct {
	GradeID   uint    `gorm:"primaryKey;autoIncrement" json:"grade_id"`
	StudentID uint    `json:"student_id"`
	SubjectID uint    `json:"subject_id"`
	Grade     float64 `json:"grade"`
	Student   Student `gorm:"foreignKey:StudentID" json:"student"`
	Subject   Subject `gorm:"foreignKey:SubjectID" json:"subject"`
}

func (Grade) TableName() string {
	return "grades"
}
