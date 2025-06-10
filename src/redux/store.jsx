import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import productosReducer from './slices/productosSlice.jsx';
import favoritosReducer from './slices/favoritosSlice.jsx';
import notificacionesReducer from './slices/notificacionesSlice.jsx';

//----------------------------
// CONFIGURACIÓN DE REDUX STORE
//----------------------------

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favoritos'], // Solo persistir favoritos
};

// Combinar todos los reducers
const rootReducer = combineReducers({
  productos: productosReducer,
  favoritos: favoritosReducer,
  notificaciones: notificacionesReducer,
});

// Aplicar persistencia al reducer principal
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar el store con Redux Toolkit
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Crear persistor para la persistencia
export const persistor = persistStore(store);
