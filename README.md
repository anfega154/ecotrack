# 🌿 EcoTrack

<div align="center">

![EcoTrack Logo](https://img.shields.io/badge/EcoTrack-Sustainable%20Habits-22c55e?style=for-the-badge&logo=leaf&logoColor=white)

**Aplicación web para registrar y visualizar hábitos ambientales**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.x-FFCA28?style=flat&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Demo en vivo](#) | [Reportar Bug](https://github.com/anfega154/ecotrack/issues) | [Solicitar Feature](https://github.com/anfega154/ecotrack/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🌍 Acerca del Proyecto

**EcoTrack** es una aplicación web diseñada para ayudar a los usuarios a tomar conciencia de su huella ambiental mediante el registro y visualización de sus hábitos diarios relacionados con el transporte y el consumo energético.

### 🎯 Objetivo

Crear una herramienta simple, intuitiva y motivadora que permita a las personas:
- Registrar fácilmente sus hábitos diarios
- Visualizar su impacto ambiental de forma clara
- Recibir recomendaciones personalizadas
- Gamificar el proceso de adoptar hábitos sostenibles
- Mantener la motivación mediante logros y rachas

### 💡 Motivación

El cambio climático es uno de los mayores desafíos de nuestra época. EcoTrack nace con la convicción de que **pequeñas acciones individuales pueden generar un gran impacto colectivo**. Al hacer visible y cuantificable nuestro comportamiento ambiental, podemos tomar mejores decisiones día a día.

---

## ✨ Características Principales

### 🔐 **Autenticación Segura**
- Inicio de sesión con correo y contraseña
- Registro de nuevos usuarios
- **Autenticación con Google** (OAuth 2.0)
- Gestión de sesiones con Firebase Authentication

### 📝 **Registro de Hábitos**
- **Transporte utilizado:** 🚗 Carro | 🏍️ Moto | 🚴 Bicicleta | 🚌 Transporte público
- **Consumo eléctrico:** 💡 Pocas horas | ⚡ Medias horas | 🔋 Muchas horas
- **Información adicional:** Duración, tipo de día, notas personales

### 📊 **Dashboard Interactivo**
- **Métricas en tiempo real:** Nivel de impacto, EcoScore (0-100), días registrados
- **Visualizaciones gráficas:** Barras, circulares y líneas con Recharts
- **Análisis detallado:** Por transporte, energía y tipo de día
- **Recomendaciones inteligentes:** Sugerencias personalizadas

### 📋 **Histórico Completo**
- **Vista dual:** Tabla ordenable o tarjetas visuales
- **Filtros avanzados:** Búsqueda, transporte, energía
- **Exportación a CSV:** Descarga tus datos
- **Estadísticas:** Total, eco-friendly, alto impacto

### 🏆 **Sistema de Gamificación**
- **20 Insignias desbloqueables:** 🚲 Transporte | ⚡ Energía | 🔥 Rachas | 🌟 General
- **Sistema de niveles:** 10 niveles con títulos únicos y XP progresivo
- **Rachas:** Días consecutivos con seguimiento histórico
- **Widget en Dashboard:** Progreso visual y próximo logro

---

## 🛠️ Tecnologías

**Frontend:** React 18, TypeScript, Vite, React Router DOM, Bootstrap 5, Recharts, Lucide React

**Backend:** Firebase Authentication, Cloud Firestore, Firebase Hosting

**Dev Tools:** ESLint, Git, npm

---

## 🚀 Instalación

### Prerequisitos
- Node.js 18+
- npm o yarn
- Cuenta de Firebase

### Pasos

1. **Clonar repositorio**
   \`\`\`bash
   git clone https://github.com/anfega154/ecotrack.git
   cd ecotrack
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configurar Firebase**
   
   Crea `.env` en la raíz:
   \`\`\`env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   \`\`\`

4. **Iniciar desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Abrir navegador:** `http://localhost:5173`

---

## ⚙️ Configuración

### Firebase Setup

1. **Crear proyecto** en [Firebase Console](https://console.firebase.google.com/)

2. **Habilitar Authentication**
   - Email/Password
   - Google (opcional)

3. **Crear Firestore Database**
   
   Reglas de seguridad:
   \`\`\`javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /habits/{habitId} {
         allow read, write: if request.auth != null && 
                              request.auth.uid == resource.data.uid;
         allow create: if request.auth != null && 
                         request.auth.uid == request.resource.data.uid;
       }
     }
   }
   \`\`\`

### Estructura de Datos

**Colección:** `habits`
\`\`\`typescript
{
  uid: string,           // ID del usuario
  date: string,          // "YYYY-MM-DD"
  transport: string,     // "carro" | "moto" | "bici" | "publico"
  energy: string,        // "poco" | "medio" | "mucho"
  duration: string,      // "bajo" | "medio" | "alto"
  dayType: string,       // "laboral" | "fin de semana"
  notes: string,         // Opcional
  createdAt: timestamp
}
\`\`\`

---

## 📖 Uso

1. **Registro:** Crea cuenta con correo o Google
2. **Registrar hábitos:** Completa formulario diario
3. **Ver dashboard:** Métricas, gráficos y recomendaciones
4. **Explorar histórico:** Filtra, busca y exporta datos
5. **Desbloquear logros:** Mantén rachas y alcanza objetivos

---

## 📁 Estructura del Proyecto

\`\`\`
ecotrack/
├── src/
│   ├── app/
│   │   ├── context/           # AuthContext, AuthProvider
│   │   ├── layout/            # AuthLayout, MainLayout
│   │   └── router/            # AppRouter, rutas protegidas
│   ├── data/
│   │   └── FirebaseConfig.ts  # Configuración Firebase
│   ├── presentation/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── hooks/             # Custom hooks (useAuth)
│   │   ├── pages/
│   │   │   ├── achievements/  # 🏆 Sistema de logros
│   │   │   ├── auth/          # Login y registro
│   │   │   ├── dashboard/     # 📊 Dashboard principal
│   │   │   ├── habits/        # ✏️ Registro de hábitos
│   │   │   └── history/       # 📋 Histórico completo
│   │   └── utils/
│   │       └── achievements.ts # Lógica de gamificación
│   └── main.tsx
├── .env                       # Variables de entorno
├── package.json
└── README.md
\`\`\`

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Completado)
- [x] Autenticación con Firebase
- [x] Registro de hábitos
- [x] Dashboard con gráficos
- [x] Histórico con filtros
- [x] Sistema de gamificación (20 badges, niveles, rachas)
- [x] Diseño responsive

### 🚧 Fase 2 - Mejoras
- [ ] Notificaciones push
- [ ] Recordatorios diarios
- [ ] Compartir logros en redes
- [ ] Modo offline

### 🔮 Fase 3 - Avanzadas
- [ ] Calculadora de huella de carbono
- [ ] Rankings sociales
- [ ] Desafíos comunitarios
- [ ] Calendario visual
- [ ] Análisis predictivo IA
- [ ] App móvil (React Native)

---

## 🤝 Contribuir

¡Contribuciones bienvenidas!

1. Fork el proyecto
2. Crea branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a branch (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

**Reportar bugs:** [Issues](https://github.com/anfega154/ecotrack/issues)

---

## 📄 Licencia

Licencia MIT - Ver [LICENSE](LICENSE)

Copyright © 2025 Andrés Felipe Gañán Moreno

---

## 👨‍💻 Autor

**Andrés Felipe Gañán Moreno**

- GitHub: [@anfega154](https://github.com/anfega154)
- LinkedIn: [Andrés Felipe Gañán Moreno](https://www.linkedin.com/in/andr%C3%A9s-felipe-ga%C3%B1%C3%A1n-moreno-profile/)

---

## 🙏 Agradecimientos

- Comunidad de React y Firebase
- Todos los que contribuyen a un mundo más sostenible
- Early adopters y testers

---

## 📞 Contacto

- **Issues:** [github.com/anfega154/ecotrack/issues](https://github.com/anfega154/ecotrack/issues)
- **LinkedIn:** [Andrés Felipe Gañán Moreno](https://www.linkedin.com/in/andr%C3%A9s-felipe-ga%C3%B1%C3%A1n-moreno-profile/)

---

<div align="center">

**¡Juntos podemos hacer la diferencia! 🌍💚**

Hecho con ❤️ y ♻️ por [Andrés Felipe Gañán Moreno](https://github.com/anfega154)

⭐ Si te gusta el proyecto, dale una estrella en GitHub

</div>
