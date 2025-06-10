import { createSlice } from '@reduxjs/toolkit';

//----------------------------
// SLICE DE NOTIFICACIONES
//----------------------------

const initialState = {
  notificaciones: []
};

const notificacionesSlice = createSlice({
  name: 'notificaciones',
  initialState,
  reducers: {
    // Agregar notificación
    agregarNotificacion: (state, action) => {
      const { mensaje, tipo = 'info', duracion = 5000 } = action.payload;
      const id = Date.now() + Math.random();
      
      state.notificaciones.push({
        id,
        mensaje,
        tipo,
        duracion,
        timestamp: new Date().toISOString()
      });
    },

    // Remover notificación
    removerNotificacion: (state, action) => {
      const id = action.payload;
      state.notificaciones = state.notificaciones.filter(n => n.id !== id);
    },

    // Limpiar todas las notificaciones
    limpiarNotificaciones: (state) => {
      state.notificaciones = [];
    }
  }
});

// Selectores
export const selectNotificaciones = (state) => state.notificaciones.notificaciones;

export const {
  agregarNotificacion,
  removerNotificacion,
  limpiarNotificaciones
} = notificacionesSlice.actions;

export default notificacionesSlice.reducer;
