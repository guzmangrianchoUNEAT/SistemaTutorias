# Sistema de Tutorías

## Descripción General

El **Sistema de Tutorías** es una aplicación desarrollada para gestionar reservas de salas, permitiendo a los usuarios registrarse, iniciar sesión, consultar y gestionar reservas de manera sencilla. Está diseñada para funcionar tanto en dispositivos móviles como en escritorio, con un backend eficiente que maneja la autenticación y las reservas.

---

## Tecnologías Usadas

### **Frontend**

- **React Native con Expo**:
  - **Uso**: Desarrollo de la interfaz de usuario para plataformas móviles.
  - **Razón**: Permite un desarrollo multiplataforma con una base de código única, lo que acelera el desarrollo y facilita la integración de bibliotecas con Expo.
- **AsyncStorage**:
  - **Uso**: Persistencia de datos, como tokens de sesión y datos de usuario.
  - **Razón**: Simple y eficaz para gestionar almacenamiento local en dispositivos móviles.
- **React Navigation**:
  - **Uso**: Navegación entre pantallas.
  - **Razón**: Facilita la creación de estructuras de navegación modernas como pilas y pestañas.

### **Backend**

- **Node.js con Express**:
  - **Uso**: API REST que gestiona la lógica del servidor y la comunicación con la base de datos.
  - **Razón**: Ligero, rápido y fácil de usar con un ecosistema robusto.
- **MongoDB**:
  - **Uso**: Base de datos para gestionar usuarios y reservas.
  - **Razón**: Ideal para manejar datos flexibles en aplicaciones dinámicas.
- **JWT (JSON Web Tokens)**:
  - **Uso**: Autenticación segura entre el cliente y el servidor.
  - **Razón**: Es una solución moderna y escalable para manejar sesiones de usuario.

---

## Estructura del Proyecto

### **Frontend**

```
src/
├── components/           # Componentes reutilizables (botones, inputs, modales, etc.)
├── navigation/           # Configuración de la navegación de la aplicación.
├── screens/              # Pantallas principales de la aplicación.
├── services/             # Lógica para llamadas a la API.
├── styles/               # Archivos de estilos para componentes y pantallas.
└── App.tsx               # Punto de entrada de la aplicación Expo.
```

### **Backend**

```
backend/
├── config/               # Configuración de la base de datos.
├── middlewares/          # Middleware para autenticar rutas.
├── models/               # Modelos de datos (usuarios y reservas).
├── routes/               # Rutas para autenticación y gestión de reservas.
├── .env                  # Variables de entorno (URI de MongoDB, clave JWT).
└── server.js             # Configuración del servidor Express.
```

---

## Funcionamiento

### **Frontend**

1. **Autenticación**:
   - Los usuarios pueden registrarse proporcionando un nombre, correo y contraseña.
   - Al iniciar sesión, se almacena un token de autenticación en AsyncStorage para mantener la sesión activa.
2. **Gestión de Reservas**:
   - Los usuarios pueden consultar reservas existentes, tanto personales como globales.
   - Pueden crear nuevas reservas seleccionando fecha, hora y sala mediante un modal interactivo.
3. **Navegación**:
   - Se utiliza un Tab Navigator para organizar las pantallas principales: Inicio, Reservas y Perfil.
4. **Pantalla de Perfil**:
   - Muestra información del usuario autenticado (nombre y correo).
   - Permite cerrar sesión eliminando los datos almacenados localmente.

### **Backend**

1. **API REST**:
   - **Rutas de Autenticación**:
     - `/auth/register`: Registrar nuevos usuarios.
     - `/auth/login`: Autenticar usuarios y generar tokens JWT.
     - `/auth/logout`: Invalida el token (manejado del lado del cliente).
   - **Rutas de Reservas**:
     - `GET /reservations`: Retorna las reservas del usuario autenticado (ordenadas por fecha y hora).
     - `GET /reservations/all`: Retorna todas las reservas disponibles, sin filtrar por usuario.
     - `POST /reservations`: Permite crear una nueva reserva con los campos `date`, `time`, `location`, y `name`.
     - `PUT /reservations/:id`: Permite editar una reserva específica del usuario autenticado.
     - `DELETE /reservations/:id`: Permite eliminar una reserva específica del usuario autenticado.
2. **Middleware**:
   - Se utiliza para proteger las rutas restringidas validando el token JWT.
3. **Base de Datos MongoDB**:
   - Gestiona los usuarios y las reservas utilizando modelos definidos.

---

## Razones para la Elección de las Tecnologías

- **React Native**: La capacidad de crear aplicaciones multiplataforma con un único código base es ideal para optimizar tiempo y recursos.
- **Expo**: Simplifica la configuración inicial del proyecto y proporciona herramientas útiles para el desarrollo móvil.
- **Node.js y Express**: Son ligeros, escalables y cuentan con un ecosistema robusto para crear servidores eficientes.
- **MongoDB**: Ofrece flexibilidad para manejar datos no estructurados, siendo perfecto para reservas dinámicas.
- **JWT**: Asegura un método seguro y moderno para autenticar usuarios en aplicaciones distribuidas.

Este stack asegura un desarrollo eficiente, una experiencia de usuario moderna y una arquitectura escalable.
