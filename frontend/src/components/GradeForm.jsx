import { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import { createGrade, updateGrade, getStudents, getSubjects } from '../services/api';

function GradeForm({ grade, onSave, onCancel }) {
  const [form, setForm] = useState({
    student_id: grade ? grade.student_id : '',
    subject_id: grade ? grade.subject_id : '',
    grade: grade ? grade.grade : '',
  });
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchData = async () => {
    try {
      const studentsResponse = await getStudents();
      const subjectsResponse = await getSubjects();
      setStudents(studentsResponse.data);
      setSubjects(subjectsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Convertir los valores a los tipos correctos
    const payload = {
      student_id: parseInt(form.student_id, 10),
      subject_id: parseInt(form.subject_id, 10),
      grade: parseFloat(form.grade),
    };

    try {
      if (grade) {
        await updateGrade(grade.grade_id, payload);
      } else {
        await createGrade(payload);
      }
      setSuccess(true);
      onSave();
    } catch (error) {
      console.error('Error saving grade:', error.response || error.message);
      setError('No se pudo guardar la calificación: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Calificación guardada exitosamente</Alert>}
        <FormControl fullWidth margin="normal">
          <InputLabel>Estudiante</InputLabel>
          <Select
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              required
          >
            {students.map((student) => (
                <MenuItem key={student.student_id} value={student.student_id}>
                  {student.name}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Materia</InputLabel>
          <Select
              name="subject_id"
              value={form.subject_id}
              onChange={handleChange}
              required
          >
            {subjects.map((subject) => (
                <MenuItem key={subject.subject_id} value={subject.subject_id}>
                  {subject.name}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
            label="Calificación"
            name="grade"
            type="number"
            value={form.grade}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 0, max: 10, step: 0.1 }}
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>
            Guardar
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
  );
}

export default GradeForm;