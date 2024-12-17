import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaClipboardList, FaSignOutAlt, FaBars, FaUserCircle, FaCalendarPlus, FaCalendarCheck } from 'react-icons/fa';

const UserProfile = ({ user, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={styles.container}>
      <div style={isMenuOpen ? styles.sidebarOpen : styles.sidebarClosed}>
        <div style={styles.menuHeader}>
          <button onClick={toggleMenu} style={styles.toggleButton}>
            <FaBars style={styles.icon} />
          </button>
        </div>

        <div style={styles.menu}>
          <button
            onClick={() => navigate('/user-profile/users')}
            style={styles.menuButton}
          >
            <FaUsers style={{ ...styles.icon, fontSize: isMenuOpen ? '20px' : '25px' }} /> {isMenuOpen && 'Ver Usuarios'}
          </button>

          <button
            onClick={() => navigate('/user-profile/create-user')}
            style={styles.menuButton}
          >
            <FaUserPlus style={{ ...styles.icon, fontSize: isMenuOpen ? '20px' : '25px' }} /> {isMenuOpen && 'Crear nuevo usuario'}
          </button>

          <button
            onClick={() => navigate('/user-profile/pacientes-turnos')}
            style={styles.menuButton}
          >
            <FaClipboardList style={{ ...styles.icon, fontSize: isMenuOpen ? '20px' : '25px' }} /> {isMenuOpen && 'Gestión de Pacientes y Turnos'}
          </button>

          {/* Nuevos botones para crear y ver horarios */}
          <button
            onClick={() => navigate('/user-profile/crear-horario')}
            style={styles.menuButton}
          >
            <FaCalendarPlus style={{ ...styles.icon, fontSize: isMenuOpen ? '20px' : '25px' }} /> {isMenuOpen && 'Crear Horario'}
          </button>

          <button
            onClick={() => navigate('/user-profile/ver-horarios')}
            style={styles.menuButton}
          >
            <FaCalendarCheck style={{ ...styles.icon, fontSize: isMenuOpen ? '20px' : '25px' }} /> {isMenuOpen && 'Ver Horarios'}
          </button>

          <button
            onClick={handleLogout}
            style={styles.menuButton}
          >
            <FaSignOutAlt style={{ ...styles.icon, fontSize: isMenuOpen ? '20px' : '25px' }} /> {isMenuOpen && 'Cerrar sesion'}
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <h2>Información sobre mi cuenta</h2>
        <div style={styles.userProfileContainer}>
          <div style={styles.userInfo}>
            <FaUserCircle style={styles.userIcon} />
            <div style={styles.userDetails}>
              <h2>Bienvenido, {user.name}!</h2>
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  sidebarClosed: {
    width: '60px',
    backgroundColor: '#343a40',
    color: '#fff',
    transition: '0.3s',
    position: 'fixed',
    height: '100%',
    overflow: 'hidden',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
  },
  sidebarOpen: {
    width: '250px',
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '20px',
    transition: '0.3s',
    position: 'fixed',
    height: '100%',
    overflow: 'hidden',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
  },
  menuHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  toggleButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '30px',
    cursor: 'pointer',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#343a40', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    justifyContent: 'center', 
    outline: 'none', 
  },
  icon: {
    fontSize: '25px', 
    marginRight: '10px', 
  },
  content: {
    marginLeft: '60px',
    padding: '20px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  userProfileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  userIcon: {
    fontSize: '80px',
    color: '#007BFF',
    marginBottom: '20px',
  },
  userDetails: {
    textAlign: 'center',
  },
};

export default UserProfile;