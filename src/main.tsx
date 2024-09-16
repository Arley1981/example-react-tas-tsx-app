//import React from 'react'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "toastify-js/src/toastify.css"
import './index.css';
import {TaskContextProvider} from './context/TaskContext';

//==Hacer una verificación del elemento root del DOM==//
const rootElement = document.getElementById('root');
if (!rootElement){
  throw new Error("No se pudo encontrar el elemento 'root' en el DOM")
}

createRoot(rootElement).render(
  <StrictMode>
    <TaskContextProvider>
    <App />
    </TaskContextProvider>
  </StrictMode>,
)
