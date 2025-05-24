import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { createSubject, updateSubject } from '../services/api';

function SubjectForm({ subject, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: subject ? subject.name : '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Limpia el error al cambiar el formulario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      if (subject) {
        await updateSubject(subject.subject_id, form);
      } else {
        const response = await createSubject(form);
        console.log('Materia creada:', response.data); // Depuración
      }
      setSuccess(true);
      onSave();
    } catch (error) {
      console.error('Error saving subject:', error.response || error.message);
      setError('No se pudo guardar la materia: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Materia guardada exitosamente</Alert>}
        <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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

export default SubjectForm;