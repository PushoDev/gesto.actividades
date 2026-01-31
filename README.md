# Gestor de Actividades Culturales

Una aplicación web para la gestión y organización de actividades culturales, construida con Laravel 12 y React.

## 🎯 Objetivo

Este proyecto tiene como finalidad proporcionar una plataforma completa para la gestión de eventos y actividades culturales, permitiendo a los organizadores crear, administrar y promover sus eventos de manera eficiente.

## 🛠️ Stack Tecnológico

### Backend

- **Laravel 12** - Framework PHP
- **Laravel Fortify** - Autenticación
- **Laravel Wayfinder** - Generación de tipos TypeScript para rutas
- **SQLite** - Base de datos (por defecto)

### Frontend

- **React 19** - Biblioteca JavaScript
- **Inertia.js v2** - SPA sin API
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework de estilos
- **Radix UI** - Componentes accesibles
- **Vite** - Build tool

### Desarrollo y Calidad

- **Pest 4** - Framework de testing
- **Laravel Pint** - Formato de código PHP
- **ESLint & Prettier** - Calidad de código JavaScript/TypeScript

## 📁 Estructura del Proyecto

```
gesto.actividades/
├── app/                     # Lógica de la aplicación (PHP)
│   ├── Models/             # Modelos Eloquent
│   ├── Http/               # Controladores y middleware
│   └── Providers/          # Service providers
├── resources/js/           # Aplicación frontend (React)
│   ├── components/         # Componentes React reutilizables
│   ├── pages/             # Páginas de la aplicación
│   ├── layouts/           # Layouts principales
│   └── hooks/             # Hooks personalizados
├── database/              # Migraciones y seeders
├── config/               # Archivos de configuración
└── tests/                # Tests (Pest)
```

## 🚀 Funcionalidades Planificadas

### Gestión de Actividades

- Crear y editar eventos culturales
- Categorización de actividades (música, teatro, arte, etc.)
- Gestión de fechas y ubicaciones
- Sistema de inscripciones

### Gestión de Usuarios

- Autenticación y registro
- Perfiles de usuario
- Roles y permisos
- Panel de administrador

### Características Adicionales

- Calendario de eventos
- Sistema de notificaciones
- Búsqueda y filtrado avanzado
- Exportación de datos
- Galería de imágenes

## 📋 Requisitos

- PHP >= 8.2
- Node.js >= 18
- Composer
- NPM o Yarn

## 🛠️ Instalación

1. **Clonar el repositorio**

    ```bash
    git clone <repository-url>
    cd gesto.actividades
    ```

2. **Instalar dependencias**

    ```bash
    composer install
    npm install
    ```

3. **Configurar entorno**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. **Configurar base de datos**

    ```bash
    php artisan migrate
    ```

5. **Construir assets**
    ```bash
    npm run build
    ```

## 🚀 Desarrollo

### Modo Desarrollo

```bash
npm run dev
```

### Iniciar servidor completo (backend + frontend + queue)

```bash
composer run dev
```

### Ejecutar tests

```bash
composer run test
```

### Formato de código

```bash
composer run lint
npm run format
```

## 📚 Scripts Disponibles

### Composer Scripts

- `composer run dev` - Inicia servidor, queue y Vite en modo desarrollo
- `composer run test` - Ejecuta linting y tests
- `composer run lint` - Formatea código PHP con Pint

### NPM Scripts

- `npm run dev` - Inicia Vite en modo desarrollo
- `npm run build` - Construye assets para producción
- `npm run build:ssr` - Construye assets con SSR
- `npm run format` - Formatea código JavaScript/TypeScript
- `npm run lint` - Ejecuta ESLint
- `npm run types` - Verifica tipos TypeScript

## 🗂️ Estado Actual del Proyecto

El proyecto se encuentra en fase inicial con la siguiente estructura base:

### ✅ Configurado

- Autenticación completa con Laravel Fortify
- Sistema de usuarios y perfiles
- Estructura frontend con React e Inertia.js
- Sistema de layouts y componentes reutilizables
- Configuración de testing con Pest

### 🚧 En Desarrollo

- Modelado de datos para actividades culturales
- Sistema de categorización
- Gestión de eventos
- Panel de administración

### 📋 Planeado

- Sistema de inscripciones
- Notificaciones por email
- Integración con calendarios externos
- Sistema de pagos
- API pública para integraciones

## 🤝 Contribución

El proyecto sigue las convenciones de Laravel y React. Para contribuir:

1. Seguir el estilo de código existente
2. Escribir tests para nuevas funcionalidades
3. Documentar cambios significativos
4. Respetar la estructura de carpetas establecida

## 📄 Licencia

MIT License - Ver archivo LICENSE para detalles

---

**Nota**: Este es un proyecto en desarrollo activo. Las funcionalidades mencionadas están en distintas etapas de implementación.
