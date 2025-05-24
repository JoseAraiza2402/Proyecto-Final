import { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { createStudent, updateStudent } from '../services/api';

function StudentForm({ student, onSave, onCancel }) {
    const [form, setForm] = useState({
        name: student ? student.name : '',
        group: student ? student.group : '',
        email: student ? student.email : '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (student) {
                await updateStudent(student.student_id, form);
            } else {
                await createStudent(form);
            }
            onSave();
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2, maxWidth: '600px', width: '100%', margin: '0 auto' }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nombre"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Grupo"
                    name="group"
                    value={form.group}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button type="submit" variant="contained">
                        Guardar
                    </Button>
                    <Button variant="outlined" onClick={onCancel}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default StudentForm;