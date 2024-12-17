import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loginUser, logoutUser } from './axios/authApi';
import Login from './Login';
import UserProfile from './UserProfile';
import CreateUser from './Createuser';
import Users from './Users';
import PacientesTurnos from './PacientesTurnos';
import VerPacientes from './VerPacientes'; 
import CrearPaciente from './CrearPaciente'; 
import VerTurnos from './VerTurnos'; 
import CrearTurno from './CrearTurno'; 
import CrearHorario from './CrearHorario';
import VerHorarios from './VerHorarios';
const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      setToken(data.token); 
      setUser(data.user); 
      localStorage.setItem('token', data.token); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(token);
      setToken('');
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Ruta para login */}
        <Route
          path="/"
          element={!user ? <Login handleLogin={handleLogin} /> : <Navigate to="/user-profile" />}
        />

        {/* Ruta para el perfil */}
        <Route
          path="/user-profile"
          element={user ? <UserProfile user={user} handleLogout={handleLogout} /> : <Navigate to="/" />}
        />

        {/* Subruta para visualizar usuarios */}
        <Route
          path="/user-profile/users"
          element={user ? <Users currentUser={user} /> : <Navigate to="/" />} // Pasa `currentUser` como prop
        />

        {/* Ruta independiente para crear usuario */}
        <Route
          path="/user-profile/create-user"
          element={user ? <CreateUser /> : <Navigate to="/" />}
        />

        {/* Ruta para Pacientes y Turnos combinados */}
        <Route
          path="/user-profile/pacientes-turnos"
          element={user ? <PacientesTurnos token={token} user={user} /> : <Navigate to="/" />}
        />

        {/* Ruta para ver pacientes */}
        <Route
          path="/user-profile/pacientes/ver"
          element={user ? <VerPacientes token={token} user={user} /> : <Navigate to="/" />}
        />

        {/* Ruta para crear pacientes (solo recepcionista) */}
        <Route
          path="/user-profile/pacientes/crear"
          element={user && user.role === 'recepcionista' ? <CrearPaciente token={token} /> : <Navigate to="/" />}
        />

        {/* Ruta para ver turnos */}
        <Route
          path="/user-profile/turnos/ver"
          element={user ? <VerTurnos token={token} user={user} /> : <Navigate to="/" />}
        />

        {/* Ruta para crear turnos (solo recepcionista) */}
        <Route
          path="/user-profile/turnos/crear"
          element={user && user.role === 'recepcionista' ? <CrearTurno token={token} /> : <Navigate to="/" />}
        />

        {/* Ruta para ver horarios */}
        <Route
          path="/user-profile/ver-horarios"
          element={user ? <VerHorarios token={token} user={user} /> : <Navigate to="/" />}
        />

        {/* Ruta para crear horarios (solo médicos) */}
        <Route
          path="/user-profile/crear-horario"
          element={user && user.role === 'medico' ? <CrearHorario token={token} user={user} /> : <Navigate to="/" />}
        />

        {/* Ruta por defecto para manejar rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;