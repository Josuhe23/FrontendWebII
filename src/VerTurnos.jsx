import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getTurnos } from './axios/authApi';
import { FaArrowLeft, FaIdCard, FaCalendarAlt, FaFileAlt } from 'react-icons/fa'; // Importamos los iconos

const VerTurnos = ({ token }) => {
  const [turnos, setTurnos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const data = await getTurnos(token);
        setTurnos(data.data);
        setErrorMessage('');
      } catch (error) {
        console.error('Error al obtener turnos:', error);
        setErrorMessage('No se pudo cargar la lista de turnos.');
      }
    };

    fetchTurnos();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2>Lista de Turnos</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {turnos.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}><FaIdCard /> ID</th>
              <th style={styles.th}><FaIdCard /> Cédula</th>
              <th style={styles.th}><FaCalendarAlt /> Fecha y Hora</th>
              <th style={styles.th}><FaFileAlt /> Motivo</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr key={turno.id}>
                <td style={styles.td}>{turno.id}</td>
                <td style={styles.td}>{turno.cedula}</td>
                <td style={styles.td}>{new Date(turno.fecha_hora).toLocaleString()}</td>
                <td style={styles.td}>{turno.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !errorMessage && <p>No hay turnos registrados.</p>
      )}
      <button style={styles.button} onClick={() => navigate(-1)}>
        <FaArrowLeft style={styles.arrowIcon} /> Regresar
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
    textAlign: 'center', // Centramos los encabezados
    fontSize: '16px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center', // Centramos los datos de cada celda
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    marginRight: '8px',
    fontSize: '18px',
  },
};

export default VerTurnos;