import axiosInstance from './axiosConfig';

// Función para iniciar sesión
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return response.data; // Devuelve el token y los datos del usuario
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 404:
          throw new Error(data.error || 'Usuario no encontrado');
        case 401:
          throw new Error(data.error || 'Contraseña incorrecta');
        default:
          throw new Error(data.error || 'Error inesperado al iniciar sesión. Inténtalo más tarde.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para cerrar sesión
export const logoutUser = async (token) => {
  try {
    const response = await axiosInstance.post(
      '/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Mensaje de confirmación
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para cerrar sesión.');
        default:
          throw new Error(data.error || 'Error inesperado al cerrar sesión. Inténtalo más tarde.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para obtener horarios
export const getHorarios = async (token) => {
  try {
    const response = await axiosInstance.get('/horarios', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los horarios
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para ver los horarios.');
        default:
          throw new Error(data.error || 'Error al obtener los horarios.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para crear horarios
export const createHorario = async (token, horarioData) => {
  try {
    const response = await axiosInstance.post('/api/crear_horario', horarioData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve el horario creado
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para crear horarios.');
        default:
          throw new Error(data.error || 'Error al crear el horario.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para obtener el perfil del usuario
export const getUserProfile = async (token) => {
  try {
    const response = await axiosInstance.get('/user-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los datos del perfil del usuario
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para obtener el perfil.');
        default:
          throw new Error(data.error || 'Error al obtener el perfil del usuario.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para obtener la lista de usuarios
export const getUsers = async (token) => {
  try {
    const response = await axiosInstance.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los datos de los usuarios
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para ver la lista de usuarios.');
        default:
          throw new Error(data.error || 'Error al obtener la lista de usuarios.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para obtener la lista de pacientes
export const getPacientes = async (token) => {
  try {
    const response = await axiosInstance.get('/pacientes-ver', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los pacientes
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para ver la lista de pacientes.');
        default:
          throw new Error(data.error || 'Error al obtener la lista de pacientes.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para crear un paciente
export const createPaciente = async (token, pacienteData) => {
  try {
    const response = await axiosInstance.post('/pacientes', pacienteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve el paciente creado
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para crear pacientes.');
        default:
          throw new Error(data.error || 'Error al crear el paciente.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para obtener la lista de turnos
export const getTurnos = async (token) => {
  try {
    const response = await axiosInstance.get('/turnos-ver', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los turnos
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para ver la lista de turnos.');
        default:
          throw new Error(data.error || 'Error al obtener la lista de turnos.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para crear un turno
export const createTurno = async (token, turnoData) => {
  try {
    const response = await axiosInstance.post('/turnos', turnoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve el turno creado
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para crear turnos.');
        default:
          throw new Error(data.error || 'Error al crear el turno.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};

// Función para obtener la lista de médicos
export const fetchMedicos = async (token) => {
  try {
    const response = await axiosInstance.get('/medicos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve la lista de médicos
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error(data.error || 'No autorizado para ver la lista de médicos.');
        default:
          throw new Error(data.error || 'Error al obtener la lista de médicos.');
      }
    }
    throw new Error('Error de red o servidor. Verifica tu conexión.');
  }
};