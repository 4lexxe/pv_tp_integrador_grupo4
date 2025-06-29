import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { FavoritosProvider } from "./context/FavoritosContext.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <AppContextProvider>
            <FavoritosProvider>
                <ProductosProvider>
                    <App />
                </ProductosProvider>
            </FavoritosProvider>
        </AppContextProvider>
    </React.StrictMode>
);
