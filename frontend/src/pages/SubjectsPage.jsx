import { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import SubjectList from '../components/SubjectList';
import SubjectForm from '../components/SubjectForm';

function SubjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedSubject(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedSubject(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestionar Materias
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setSelectedSubject(null);
          setShowForm(true);
        }}
        sx={{ mb: 2 }}
      >
        Agregar Materia
      </Button>
      {showForm && (
        <SubjectForm
          subject={selectedSubject}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <SubjectList onEdit={handleEdit} />
    </Box>
  );
}

export default SubjectsPage;
