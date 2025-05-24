package models

import _ "gorm.io/gorm"

type Subject struct {
	SubjectID uint   `gorm:"primaryKey" json:"subject_id"`
	Name      string `json:"name"`
}

func (Subject) TableName() string {
	return "subjects"
}
