import { useState, useEffect } from 'react';
import { Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getGrades, deleteGrade } from '../services/api';
import GradeForm from '../components/GradeForm';

function GradesPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [grades, setGrades] = useState([]);
  const [refresh, setRefresh] = useState(false); // Estado para recarga

  const fetchGrades = async () => {
    try {
      const response = await getGrades();
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const handleEdit = (grade) => {
    setSelectedGrade(grade);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGrade(id);
      fetchGrades();
    } catch (error) {
      console.error('Error deleting grade:', error);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedGrade(null);
    setRefresh(!refresh); // Forzar recarga
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedGrade(null);
  };

  useEffect(() => {
    fetchGrades();
  }, [refresh]);

  return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Gestionar Calificaciones
        </Typography>
        <Button
            variant="contained"
            onClick={() => {
              setSelectedGrade(null);
              setShowForm(true);
            }}
            sx={{ mb: 2 }}
        >
          Agregar Calificación
        </Button>
        {showForm && (
            <GradeForm
                grade={selectedGrade}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Estudiante</TableCell>
                <TableCell>Materia</TableCell>
                <TableCell>Calificación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map((grade) => (
                  <TableRow key={grade.grade_id}>
                    <TableCell>{grade.grade_id}</TableCell>
                    <TableCell>{grade.student ? grade.student.name : grade.student_id}</TableCell>
                    <TableCell>{grade.subject ? grade.subject.name : grade.subject_id}</TableCell>
                    <TableCell>{grade.grade}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(grade)}><Edit /></IconButton>
                      <IconButton onClick={() => handleDelete(grade.grade_id)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
}

export default GradesPage;