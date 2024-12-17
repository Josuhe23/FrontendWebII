import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendarCheck, FaPlusCircle, FaArrowLeft } from 'react-icons/fa';

const PacientesTurnos = ({ user }) => {
  const navigate = useNavigate(); 

  const isRecepcionista = user.role === 'recepcionista';

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Pacientes y Turnos</h2>

      {/* Opciones comunes para todos los roles */}
      <div style={styles.buttonsContainer}>
        <button
          style={{ ...styles.button, backgroundColor: '#28a745' }} // Verde para ver pacientes
          onClick={() => navigate('/user-profile/pacientes/ver')}
        >
          <FaUsers style={styles.icon} /> Ver Pacientes
        </button>
        <button
          style={{ ...styles.button, backgroundColor: '#007BFF' }} // Azul para ver turnos
          onClick={() => navigate('/user-profile/turnos/ver')}
        >
          <FaCalendarCheck style={styles.icon} /> Ver Turnos
        </button>
      </div>

      {/* Opciones exclusivas para recepcionista */}
      {isRecepcionista && (
        <div style={styles.buttonsContainer}>
          <button
            style={{ ...styles.button, backgroundColor: '#ffc107' }} // Amarillo para ingresar paciente
            onClick={() => navigate('/user-profile/pacientes/crear')}
          >
            <FaPlusCircle style={styles.icon} /> Ingresar Paciente
          </button>
          <button
            style={{ ...styles.button, backgroundColor: '#17a2b8' }} // Cian para generar turno
            onClick={() => navigate('/user-profile/turnos/crear')}
          >
            <FaCalendarCheck style={styles.icon} /> Generar Turno
          </button>
        </div>
      )}

      {/* Botón de regresar */}
      <div style={styles.backButtonContainer}>
        <button
          style={styles.backButton}
          onClick={() => navigate('/user-profile')}
        >
          <FaArrowLeft style={styles.arrowIcon} /> Regresar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    fontSize: '20px',
  },
  backButtonContainer: {
    marginTop: '30px',
  },
  backButton: {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#6c757d',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    marginRight: '8px',
    fontSize: '18px',
  },
};

export default PacientesTurnos;