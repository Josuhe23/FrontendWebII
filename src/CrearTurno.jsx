import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTurno } from './axios/authApi';
import axios from 'axios';
import { FaUser, FaCalendarAlt, FaStethoscope, FaRegArrowAltCircleLeft } from 'react-icons/fa';

const CrearTurno = ({ token }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cedula: '',
    fecha_hora: '',
    motivo: '',
    medico_nombre: '',
  });

  const [medicos, setMedicos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/medicos', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setMedicos(response.data.data);
        } else {
          setErrorMessage('Formato inesperado en la lista de médicos.');
        }
      } catch (error) {
        console.error('Error al obtener médicos:', error);
        setErrorMessage(
          error.response?.data?.error || 'No se pudo cargar la lista de médicos.'
        );
      }
    };

    fetchMedicos();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTurno(token, form);
      setSuccessMessage('Turno creado exitosamente.');
      setErrorMessage('');
      setForm({
        cedula: '',
        fecha_hora: '',
        motivo: '',
        medico_nombre: '',
      });
    } catch (error) {
      console.error('Error al crear turno:', error);
      setSuccessMessage('');
      setErrorMessage('No se pudo crear el turno. Verifica los datos.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Crear Turno</h2>
      {successMessage && <p style={styles.success}>{successMessage}</p>}
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <FaUser style={styles.icon} />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula del Paciente"
            value={form.cedula}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaCalendarAlt style={styles.icon} />
          <input
            type="datetime-local"
            name="fecha_hora"
            value={form.fecha_hora}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaStethoscope style={styles.icon} />
          <input
            type="text"
            name="motivo"
            placeholder="Motivo"
            value={form.motivo}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <select
            name="medico_nombre"
            value={form.medico_nombre}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Seleccione un Médico</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.name}>
                {medico.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Crear Turno
        </button>
      </form>
      <button onClick={() => navigate('/user-profile/pacientes-turnos')} style={styles.backButton}>
        <FaRegArrowAltCircleLeft style={styles.icon} /> Regresar
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#f4f7f6',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden', // Para evitar que los campos se desborden
  },
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
    alignItems: 'center', // Alineamos los elementos al centro
  },
  inputGroup: {
    position: 'relative',
    width: '100%', // Aseguramos que el input ocupe todo el espacio disponible
    maxWidth: '500px', // Limitamos el ancho máximo
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%', // Para que los inputs no se salgan del contenedor
    boxSizing: 'border-box', // Para incluir padding y border dentro del tamaño total
    paddingLeft: '35px', // Espacio para el icono
  },
  select: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '500px', // Limitar el ancho máximo del select
    backgroundColor: '#fff',
    color: '#333',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    width: '100%', // Hace que el botón ocupe todo el ancho
    maxWidth: '500px', // Limitar el ancho máximo del botón
  },
  backButton: {
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#6c757d',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
    transition: 'background-color 0.3s',
    width: '100%', // Hace que el botón ocupe todo el ancho
    maxWidth: '500px', // Limitar el ancho máximo del botón
  },
  success: {
    color: '#28a745',
    fontSize: '14px',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  icon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#6c757d',
  },
};

export default CrearTurno;