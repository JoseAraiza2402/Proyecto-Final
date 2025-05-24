import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import SubjectsPage from './pages/SubjectsPage';
import GradesPage from './pages/GradesPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define un tema claro con fondo ajustado
const theme = createTheme({
    palette: {
        mode: 'dark', // Cambia a 'dark' si prefieres el modo oscuro
        background: {
            default: '#000000', // Fondo claro para mejor contraste
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Normaliza estilos y asegura compatibilidad */}
            <Router>
                <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Sistema Control Escolar
                            </Typography>
                            <Button color="inherit" component={Link} to="/students">
                                Estudiantes
                            </Button>
                            <Button color="inherit" component={Link} to="/subjects">
                                Materias
                            </Button>
                            <Button color="inherit" component={Link} to="/grades">
                                Calificaciones
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Container sx={{ flex: '1 1 auto', mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 0, width: '100%',
                        maxWidth: '1200px', boxSizing: 'border-box'}}>
                        <Routes>
                            <Route path="/students" element={<StudentsPage />} />
                            <Route path="/subjects" element={<SubjectsPage />} />
                            <Route path="/grades" element={<GradesPage />} />
                            <Route path="/" element={<StudentsPage />} />
                        </Routes>
                    </Container>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;