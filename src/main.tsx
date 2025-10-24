import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/router/AppRouter";
import { AuthProvider } from "./app/context/AuthContext";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
 <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
