import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPaciente } from './axios/authApi';
import { FaUser, FaPhone, FaEnvelope, FaMale, FaFemale, FaIdCard, FaUniversity, FaArrowLeft } from 'react-icons/fa'; // Importamos el icono de flecha

const CrearPaciente = ({ token }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo_elec: '',
    sexo: 'masculino',
    estado_civil: 'soltero',
    titulo: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPaciente(token, form);
      alert('Paciente creado exitosamente');
      setForm({
        cedula: '',
        nombre: '',
        apellido: '',
        telefono: '',
        correo_elec: '',
        sexo: 'masculino',
        estado_civil: 'soltero',
        titulo: '', // Resetea el campo titulo
      });
      navigate('/user-profile/pacientes-turnos');
    } catch (error) {
      console.error('Error al crear paciente:', error);
      setErrorMessage('No se pudo crear el paciente. Verifica los datos e inténtalo de nuevo.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Crear Paciente</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <FaIdCard style={styles.icon} />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={form.cedula}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaUser style={styles.icon} />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaUser style={styles.icon} />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaPhone style={styles.icon} />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaEnvelope style={styles.icon} />
          <input
            type="email"
            name="correo_elec"
            placeholder="Correo Electrónico"
            value={form.correo_elec}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <FaMale style={styles.icon} />
          <select
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <FaUniversity style={styles.icon} />
          <select
            name="estado_civil"
            value={form.estado_civil}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="soltero">Soltero</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <FaUniversity style={styles.icon} />
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Crear
        </button>
      </form>
      <button onClick={() => navigate('/user-profile/pacientes-turnos')} style={styles.backButton}>
        <FaArrowLeft style={styles.arrowIcon} /> Regresar
      </button>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    fontSize: '20px',
    color: '#007BFF',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    marginRight: '8px',
    fontSize: '18px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default CrearPaciente;