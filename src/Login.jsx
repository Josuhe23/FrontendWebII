import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //Redireccion a las paginas
import { FaEnvelope, FaLock, FaHospital } from 'react-icons/fa';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Controlar visibilidad de la contraseña
  const navigate = useNavigate(); // Inicializar para redirección

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password); // Llama a handleLogin para manejar el inicio de sesión
      navigate('/user-profile'); // Redirige al perfil del usuario después del login
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message;
      if (errorResponse === 'Usuario no encontrado') {
        setErrorMessage('Usuario no encontrado. Verifica el correo electrónico.');
      } else if (errorResponse === 'Contraseña incorrecta') {
        setErrorMessage('Contraseña incorrecta. Inténtalo de nuevo.');
      } else {
        setErrorMessage('Error al iniciar sesión. Inténtalo más tarde.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.centeredContainer}>
        <div style={styles.titleContainer}>
          <FaHospital style={styles.iconHospital} />
          <h2 style={styles.title}> Clinica Ponce SA </h2>
        </div>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <form onSubmit={onSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? '🙉' : '🙈'}
            </button>
          </div>
          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8', // Fondo gris claro
  },
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    textAlign: 'center', 
    marginBottom: '20px', 
  },
  title: {
    fontSize: '28px', 
    color: '#007BFF',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold', 
    letterSpacing: '1px', 
  },
  iconHospital: {
    fontSize: '70px',
    color: '#007BFF',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '10px',
    fontSize: '18px',
    color: '#999',
  },
  input: {
    width: '100%',
    padding: '12px 15px 12px 35px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f8f8',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#007BFF',
    cursor: 'pointer',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '15px',
  },
};

export default Login;