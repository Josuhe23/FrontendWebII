import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaSave, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const CrearHorario = ({ token }) => {
  const [form, setForm] = useState({
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate para navegar

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/crear_horario', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Horario creado exitosamente');
      setForm({
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
      });
    } catch (error) {
      setErrorMessage('No se pudo crear el horario. Verifica los datos e inténtalo de nuevo.');
    }
  };

  // Función corregida para navegar hacia atrás
  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleGoBack} style={styles.backButton}>
          <FaArrowLeft style={styles.icon} /> Regresar
        </button>
        <h2>Crear Horario</h2>
      </div>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <FaCalendarAlt style={styles.icon} />
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaClock style={styles.icon} />
          <input
            type="time"
            name="hora_inicio"
            value={form.hora_inicio}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaClock style={styles.icon} />
          <input
            type="time"
            name="hora_fin"
            value={form.hora_fin}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          <FaSave /> Guardar
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '30px auto',
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
    marginBottom: '30px',
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
    marginLeft: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '24px',
    color: '#007BFF',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '300px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default CrearHorario;