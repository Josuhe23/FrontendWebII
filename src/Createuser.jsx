import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaUserMd, FaArrowLeft } from 'react-icons/fa';

const CreateUser = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/crear_user', formData);
      setMessage(response.data.message || 'Usuario creado exitosamente.');
      setFormData({ name: '', email: '', password: '', role: '' });
      setTimeout(() => navigate('/user-profile'), 2000);
    } catch (error) {
      setMessage('Error al crear el usuario. Intenta nuevamente.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Crear Usuario</h2>
      {message && <p style={message.includes('exitosamente') ? styles.success : styles.error}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <FaUser style={styles.icon} />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <FaEnvelope style={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <FaUserMd style={styles.icon} />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="" disabled>
              Seleccionar Rol
            </option>
            <option value="medico">Médico</option>
            <option value="admin">Admin</option>
            <option value="recepcionista">Recepcionista</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Crear Usuario
        </button>
      </form>
      <button onClick={() => navigate('/user-profile')} style={styles.backButton}>
        <FaArrowLeft style={styles.arrowIcon} /> Atrás
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto',
  },
  icon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#888',
    fontSize: '18px',
  },
  input: {
    padding: '12px 12px 12px 35px', // space for the icon
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9',
    transition: '0.3s',
  },
  select: {
    padding: '12px 12px 12px 35px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '100%',
    backgroundColor: '#f9f9f9',
    color: '#555',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s',
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto',
  },
  backButton: {
    marginTop: '20px',
    padding: '12px 20px',
    backgroundColor: '#f1f1f1',
    color: '#333',
    borderRadius: '8px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    marginRight: '8px',
    fontSize: '18px',
  },
  success: {
    color: '#28a745',
    fontSize: '16px',
    marginBottom: '15px',
  },
  error: {
    color: '#e74c3c',
    fontSize: '16px',
    marginBottom: '15px',
  },
};

export default CreateUser;