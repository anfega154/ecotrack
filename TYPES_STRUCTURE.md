# Estructura de Tipos TypeScript - EcoTrack

Este documento describe la organización de tipos TypeScript en el proyecto EcoTrack.

## 📁 Estructura de Carpetas

```
src/
└── types/
    ├── index.ts                 # Barrel export de todos los tipos
    ├── user.types.ts           # Tipos relacionados con usuarios
    ├── habit.types.ts          # Tipos relacionados con hábitos
    ├── achievement.types.ts    # Tipos relacionados con logros
    ├── chart.types.ts          # Tipos relacionados con gráficos
    └── navigation.types.ts     # Tipos relacionados con navegación
```

## 📝 Descripción de Tipos

### user.types.ts
Define los tipos relacionados con la autenticación y usuarios:
- `User`: Extensión del tipo de Firebase User
- `AuthContextProps`: Props del contexto de autenticación

### habit.types.ts
Define los tipos relacionados con hábitos ecológicos:
- `TransportType`: Tipos de transporte ("carro" | "moto" | "bici" | "publico")
- `EnergyType`: Niveles de energía ("poco" | "medio" | "mucho")
- `DayType`: Tipos de día ("laboral" | "finde" | "festivo")
- `Habit`: Interface completa de un hábito
- `HabitFormData`: Datos del formulario de hábitos

### achievement.types.ts
Define los tipos relacionados con logros y gamificación:
- `BadgeCategory`: Categorías de insignias
- `Badge`: Interface de una insignia/logro
- `UserLevel`: Interface del nivel del usuario
- `Streak`: Interface de racha de días consecutivos

### chart.types.ts
Define los tipos relacionados con visualización de datos:
- `ChartData`: Datos para gráficos
- `TimeSeriesData`: Datos de series temporales
- `StatCard`: Datos para tarjetas de estadísticas

### navigation.types.ts
Define los tipos relacionados con navegación:
- `NavItem`: Item de navegación con icono y ruta

## 🔄 Uso de Tipos

### Importación desde tipos centralizados
```typescript
// ✅ Correcto - Importar desde el barrel export
import type { User, Habit, Badge } from '../types';

// ❌ Incorrecto - Importar desde archivos individuales
import type { User } from '../types/user.types';
```

### Ejemplo de uso en componentes
```typescript
import type { Habit, ChartData } from '../../types';

const Component = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  // ...
};
```

## ✅ Beneficios de esta Estructura

1. **Organización**: Tipos agrupados por dominio/funcionalidad
2. **Reutilización**: Tipos compartidos entre múltiples componentes
3. **Mantenibilidad**: Fácil localizar y actualizar tipos
4. **Escalabilidad**: Simple añadir nuevos tipos o categorías
5. **Type Safety**: TypeScript puede verificar tipos en toda la aplicación
6. **Barrel Exports**: Importación limpia desde un solo punto

## 🔍 Archivos Actualizados

Los siguientes archivos han sido tipados correctamente:

### Context & Providers
- ✅ `src/app/context/AuthContext.tsx`
- ✅ `src/app/context/AuthProvider.tsx`

### Utils
- ✅ `src/presentation/utils/achievements.ts`

### Pages
- ✅ `src/presentation/pages/dashboard/DashboardPage.tsx`
- ✅ `src/presentation/pages/habits/HabitsPage.tsx`
- ✅ `src/presentation/pages/achievements/AchievementsPage.tsx`
- ✅ `src/presentation/pages/history/HistoryPage.tsx`
- ✅ `src/presentation/pages/auth/LoginPage.tsx`
- ✅ `src/presentation/pages/auth/RegisterPage.tsx`

### Components
- ✅ `src/presentation/components/sidebar/Sidebar.tsx`
- ✅ `src/presentation/components/common/LoadingSpinner.tsx`

### Router
- ✅ `src/app/router/ProtectedRoute.tsx`
- ✅ `src/app/router/PublicRouter.tsx`

## 🎯 Convenciones

1. **Nombres de archivos**: `*.types.ts` para archivos de tipos
2. **Nombres de tipos**: PascalCase para interfaces y tipos
3. **Imports**: Usar `import type` para imports de solo tipos
4. **Export**: Usar barrel exports desde `index.ts`
5. **Organización**: Agrupar tipos relacionados en el mismo archivo
