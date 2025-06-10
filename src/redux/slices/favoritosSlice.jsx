import { createSlice } from '@reduxjs/toolkit';
import { APP_CONFIG } from '../../utils/constants.jsx';

//----------------------------
// SLICE DE FAVORITOS
//----------------------------

const initialState = {
  favoritos: [],
  maxFavoritos: APP_CONFIG.MAX_FAVORITOS
};

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    // Toggle favorito
    toggleFavorito: (state, action) => {
      const productoId = action.payload;
      const index = state.favoritos.indexOf(productoId);
      
      if (index !== -1) {
        // Remover de favoritos
        state.favoritos.splice(index, 1);
      } else {
        // Agregar a favoritos si no se excede el límite
        if (state.favoritos.length < state.maxFavoritos) {
          state.favoritos.push(productoId);
        }
      }
    },

    // Agregar favorito
    agregarFavorito: (state, action) => {
      const productoId = action.payload;
      if (!state.favoritos.includes(productoId) && state.favoritos.length < state.maxFavoritos) {
        state.favoritos.push(productoId);
      }
    },

    // Remover favorito
    removerFavorito: (state, action) => {
      const productoId = action.payload;
      state.favoritos = state.favoritos.filter(id => id !== productoId);
    },

    // Agregar múltiples favoritos
    agregarFavoritos: (state, action) => {
      const productosIds = action.payload;
      productosIds.forEach(id => {
        if (!state.favoritos.includes(id) && state.favoritos.length < state.maxFavoritos) {
          state.favoritos.push(id);
        }
      });
    },

    // Limpiar todos los favoritos
    limpiarFavoritos: (state) => {
      state.favoritos = [];
    },

    // Importar favoritos
    importarFavoritos: (state, action) => {
      const favoritos = action.payload;
      if (Array.isArray(favoritos)) {
        state.favoritos = favoritos.slice(0, state.maxFavoritos);
      }
    }
  }
});

// Selectores
export const selectFavoritos = (state) => state.favoritos.favoritos;
export const selectCantidadFavoritos = (state) => state.favoritos.favoritos.length;
export const selectMaxFavoritos = (state) => state.favoritos.maxFavoritos;
export const selectEsFavorito = (productoId) => (state) => 
  state.favoritos.favoritos.includes(productoId);
export const selectEnLimiteFavoritos = (state) => 
  state.favoritos.favoritos.length >= state.favoritos.maxFavoritos;

export const {
  toggleFavorito,
  agregarFavorito,
  removerFavorito,
  agregarFavoritos,
  limpiarFavoritos,
  importarFavoritos
} = favoritosSlice.actions;

export default favoritosSlice.reducer;
