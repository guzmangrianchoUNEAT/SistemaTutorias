# Sistema de Tutorías

**Sistema de Tutorías** es una aplicación que permite gestionar reservas de salas. Los usuarios pueden registrarse, iniciar sesión, consultar y gestionar sus reservas de manera sencilla. La aplicación está diseñada para ser multiplataforma, funcionando tanto en dispositivos móviles como en escritorio.

## Tecnologías Usadas

### Frontend

- **React Native con Expo**: Para el desarrollo de la interfaz móvil multiplataforma (iOS y Android).
- **AsyncStorage**: Para la persistencia de datos locales, como tokens de sesión y datos de usuario.
- **React Navigation**: Para gestionar la navegación entre pantallas.

### Backend

El backend de la aplicación está construido con las siguientes tecnologías:

- **Node.js con Express**: Para crear el servidor y manejar las rutas de la API.
- **Mongoose**: Librería para interactuar con MongoDB de manera fácil y estructurada.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios de manera segura.
- **bcryptjs**: Para encriptar y comparar contraseñas de forma segura.
- **CORS**: Para permitir que la API se comunique con el frontend, incluso si están en diferentes dominios.
- **dotenv**: Para gestionar variables de configuración como la URI de MongoDB y la clave secreta de JWT.
- **express.json()**: Para procesar datos en formato JSON en las solicitudes.

Estas tecnologías permiten manejar de manera segura y eficiente el registro, inicio de sesión y gestión de reservas de los usuarios.

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

## Casos de Uso

1. **Registrarse**:  
   Un usuario nuevo puede crear una cuenta proporcionando su nombre, correo y contraseña.

2. **Iniciar sesión**:  
   Los usuarios registrados pueden iniciar sesión con su correo y contraseña.

3. **Consultar sus reservas**:  
   Los usuarios pueden ver todas las reservas que han realizado, con detalles como la fecha, la hora y la sala.

4. **Crear nuevas reservas**:  
   Los usuarios pueden crear una nueva reserva seleccionando una sala, fecha y hora disponibles.

5. **Editar una reserva**:  
   Si lo desean, los usuarios pueden modificar una reserva existente (por ejemplo, cambiar la fecha o la hora).

6. **Eliminar una reserva**:  
   Los usuarios pueden cancelar una reserva que ya no necesiten.

7. **Ver su perfil**:  
   Los usuarios pueden acceder a su perfil, donde se muestra su información básica (nombre y correo) y pueden cerrar sesión.

8. **Cerrar sesión**:  
   Los usuarios pueden cerrar sesión en cualquier momento, lo que eliminará su token de sesión y los desconectará de la aplicación.

---

## Funcionamiento

![Funcionamiento del sistema](assets/funcionamiento.svg)
