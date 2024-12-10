# Sistema de Tutorías

**Sistema de Tutorías** es una aplicación que permite gestionar reservas de salas. Los usuarios pueden registrarse, iniciar sesión, consultar y gestionar sus reservas de manera sencilla. La aplicación está diseñada para ser multiplataforma, funcionando tanto en dispositivos móviles como en escritorio.

## Tecnologías Usadas

### Frontend

- **React Native con Expo**: Para el desarrollo de la interfaz móvil multiplataforma (iOS y Android).
- **AsyncStorage**: Para la persistencia de datos locales, como tokens de sesión y datos de usuario.
- **React Navigation**: Para gestionar la navegación entre pantallas.

### Backend

- **Node.js con Express**: Para construir el servidor que gestiona la lógica de la API y la comunicación con la base de datos.
- **JWT (JSON Web Tokens)**: Para la autenticación segura entre el cliente y el servidor.

### Base de Datos

- **MongoDB**: Para almacenar información de usuarios y reservas, aprovechando su flexibilidad en el manejo de datos.

---

## Estructura del Proyecto

### Frontend

```
src/
├── components/           # Componentes reutilizables (botones, inputs, modales, etc.)
├── navigation/           # Configuración de la navegación de la aplicación.
├── screens/              # Pantallas principales de la aplicación.
├── services/             # Lógica para llamadas a la API.
├── styles/               # Archivos de estilos para componentes y pantallas.
└── App.tsx               # Punto de entrada de la aplicación Expo.
```

### Backend

```
backend/
├── config/               # Configuración de la base de datos y otros parámetros.
├── middlewares/          # Middleware para proteger rutas (validación de JWT).
├── models/               # Modelos de datos (usuarios y reservas).
├── routes/               # Rutas para la autenticación y gestión de reservas.
├── .env                  # Variables de entorno (URI de MongoDB, clave JWT).
└── server.js             # Configuración del servidor Express.
```

---

## Funcionamiento

### Frontend

1. **Autenticación**:  
   Los usuarios pueden registrarse y hacer login proporcionando su nombre, correo y contraseña. Al iniciar sesión, se genera un token JWT que se almacena en `AsyncStorage` para mantener la sesión activa.

2. **Gestión de Reservas**:  
   Los usuarios pueden consultar sus reservas existentes, tanto personales como globales. Además, pueden crear nuevas reservas eligiendo fecha, hora y sala mediante un modal interactivo.

3. **Pantalla de Perfil**:  
   Muestra la información del usuario autenticado (nombre, correo) y permite cerrar sesión, lo que elimina los datos almacenados localmente.

### Backend

1. **API REST**:
   - **Rutas de Autenticación**:
     - `/auth/register`: Registrar un nuevo usuario.
     - `/auth/login`: Autenticar al usuario y generar un token JWT.
     - `/auth/logout`: Invalida el token JWT en el cliente.
   - **Rutas de Reservas**:
     - `GET /reservations`: Obtener las reservas del usuario autenticado.
     - `GET /reservations/all`: Obtener todas las reservas disponibles.
     - `POST /reservations`: Crear una nueva reserva.
     - `PUT /reservations/:id`: Editar una reserva.
     - `DELETE /reservations/:id`: Eliminar una reserva.
2. **Middleware**:  
   Se emplea un middleware para proteger rutas, validando que el token JWT esté presente y sea válido.

### Base de Datos (MongoDB)

- **Modelos de Datos**:  
  Se utilizan modelos de MongoDB para gestionar los datos de los usuarios y las reservas.  
  Ejemplo de modelos:
  - `User`: Información del usuario (nombre, correo, etc.).
  - `Reservation`: Detalles de la reserva (fecha, hora, sala, usuario que realiza la reserva).

---
