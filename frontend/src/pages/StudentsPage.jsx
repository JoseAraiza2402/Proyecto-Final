import { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';

function StudentsPage() {
    const [showForm, setShowForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setShowForm(true);
    };

    const handleSave = () => {
        setShowForm(false);
        setSelectedStudent(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedStudent(null);
    };

    return (
        <Box sx={{ flexGrow: 1, maxWidth: '800px', width: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Gestionar Estudiantes
            </Typography>
            <Button
                variant="contained"
                onClick={() => {
                    setSelectedStudent(null);
                    setShowForm(true);
                }}
                sx={{ mb: 2 }}
            >
                Agregar Estudiante
            </Button>
            {showForm && (
                <StudentForm
                    student={selectedStudent}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            <StudentList onEdit={handleEdit} />
        </Box>
    );
}

export default StudentsPage;