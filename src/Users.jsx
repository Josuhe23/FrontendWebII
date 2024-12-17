import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUsers } from './axios/authApi';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaArrowLeft, FaIdCard, FaUserAlt, FaEnvelope, FaUserShield } from 'react-icons/fa'; // Importamos iconos

const Users = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
        }
        const data = await getUsers(token);
        if (data && data.data) {
          setUsers(data.data);
        } else {
          setError('No se encontraron usuarios.');
        }
      } catch (error) {
        setError(error.message || 'Hubo un problema al cargar los usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Usuario eliminado correctamente');
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error.response || error.message);
        alert('Hubo un error al eliminar el usuario');
      }
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Cargando usuarios...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Usuarios</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}><FaIdCard /> ID</th>
            <th style={styles.th}><FaUserAlt /> Nombre</th>
            <th style={styles.th}><FaEnvelope /> Email</th>
            <th style={styles.th}><FaUserShield /> Rol</th>
            <th style={styles.th}><FaTrashAlt /> Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              style={
                currentUser && user.id === currentUser.id
                  ? styles.currentUserRow
                  : styles.defaultRow
              }
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrashAlt style={styles.icon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={styles.backButton}
        onClick={() => navigate('/user-profile')}
      >
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
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
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
  defaultRow: {
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    transition: 'background-color 0.3s',
  },
  currentUserRow: {
    backgroundColor: '#D4EDDA', // Verde claro para resaltar al usuario actual
    color: '#155724',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s',
  },
  icon: {
    fontSize: '16px',
  },
};

export default Users;