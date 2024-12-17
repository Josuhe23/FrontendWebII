import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa'; // Agregamos el icono de la flecha
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para la navegación

const VerHorarios = ({ token }) => {
  const [horarios, setHorarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate para la navegación

  useEffect(() => {
    // Obtener los horarios desde el backend
    const fetchHorarios = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/horarios', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHorarios(response.data.data);
      } catch (error) {
        setErrorMessage('No se pudo obtener los horarios. Intenta de nuevo más tarde.');
      }
    };

    fetchHorarios();
  }, [token]);

  // Función para manejar el regreso
  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás en la historia
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleGoBack} style={styles.backButton}>
          <FaArrowLeft style={styles.icon} /> Regresar
        </button>
        <h2>Horarios</h2>
      </div>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <div style={styles.horariosList}>
        {horarios.length === 0 ? (
          <p>No hay horarios disponibles.</p>
        ) : (
          horarios.map((horario) => (
            <div key={horario.id} style={styles.horarioCard}>
              <div style={styles.iconWrapper}>
                <FaCalendarAlt style={styles.icon} />
              </div>
              <div style={styles.textWrapper}>
                <p>{horario.fecha}</p>
                <p>{horario.hora_inicio} - {horario.hora_fin}</p>
              </div>
              <FaClock style={styles.icon} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#007BFF',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  horariosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
  },
  horarioCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    margin: '5px 0',
  },
  iconWrapper: {
    flexShrink: 0,
  },
  textWrapper: {
    flex: 1,
    textAlign: 'left',
  },
  icon: {
    fontSize: '20px',
    color: '#007BFF',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default VerHorarios;