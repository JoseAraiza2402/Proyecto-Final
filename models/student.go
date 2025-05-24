package models

import _ "gorm.io/gorm"

type Student struct {
	StudentID uint   `gorm:"primaryKey" json:"student_id"`
	Name      string `json:"name"`
	Group     string `json:"group"`
	Email     string `json:"email"`
}

func (Student) TableName() string {
	return "students"
}
