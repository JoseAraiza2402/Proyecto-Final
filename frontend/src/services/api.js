import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Estudiantes
export const getStudents = () => api.get('/students');
export const createStudent = (student) => api.post('/students', student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Materias
export const getSubjects = () => api.get('/subjects');
export const createSubject = (subject) => api.post('/subjects', subject);
export const updateSubject = (id, subject) => api.put(`/subjects/${id}`, subject);
export const deleteSubject = (id) => api.delete(`/subjects/${id}`);

// Calificaciones
export const getGrades = () => api.get('/grades');
export const createGrade = (grade) => api.post('/grades', grade);
export const updateGrade = (id, grade) => api.put(`/grades/${id}`, grade);
export const deleteGrade = (id) => api.delete(`/grades/${id}`);
export const getGradesByStudent = (studentId) => api.get(`/grades/student/${studentId}`);

