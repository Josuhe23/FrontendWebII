import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { getPacientes } from './axios/authApi'; // Asegúrate de que esta función esté configurada correctamente
import { FaArrowLeft, FaIdCard, FaUserAlt, FaPhoneAlt, FaEnvelope, FaTransgender } from 'react-icons/fa'; // Importa los iconos que vamos a usar

const VerPacientes = ({ token }) => {
  const [pacientes, setPacientes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacientes(token);
        setPacientes(data.data); // Asegúrate de que `data.data` contiene la lista de pacientes
        setErrorMessage('');
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
        setErrorMessage('No se pudo cargar la lista de pacientes.');
      }
    };

    fetchPacientes();
  }, [token]);

  const handleGoBack = () => {
    navigate(-1); // Navega hacia la página anterior
  };

  return (
    <div style={styles.container}>
      <h2>Lista de Pacientes</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {pacientes.length > 0 ? (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}><FaIdCard /> Cédula</th>
                <th style={styles.th}><FaUserAlt /> Nombre</th>
                <th style={styles.th}><FaUserAlt /> Apellido</th>
                <th style={styles.th}><FaPhoneAlt /> Teléfono</th>
                <th style={styles.th}><FaEnvelope /> Correo</th>
                <th style={styles.th}><FaTransgender /> Sexo</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.cedula} style={styles.tableRow}>
                  <td style={styles.td}>{paciente.cedula}</td>
                  <td style={styles.td}>{paciente.nombre}</td>
                  <td style={styles.td}>{paciente.apellido}</td>
                  <td style={styles.td}>{paciente.telefono}</td>
                  <td style={styles.td}>{paciente.correo_elec}</td>
                  <td style={styles.td}>{paciente.sexo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleGoBack} style={styles.backButton}>
            <FaArrowLeft style={styles.arrowIcon} /> Regresar
          </button>
        </>
      ) : (
        !errorMessage && <p>No hay pacientes registrados.</p>
      )}
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
  backButton: {
    margin: '20px 0',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
  },
  arrowIcon: {
    marginRight: '8px',
    fontSize: '18px',
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
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    fontSize: '14px',
  },
  tableRow: {
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default VerPacientes;