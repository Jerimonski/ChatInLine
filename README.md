# 💬 ChatInLine — Frontend

ChatInLine es el frontend de una aplicación de chat en tiempo real basada en salas libres identificadas por un código.

La aplicación permite a los usuarios registrarse, iniciar sesión y unirse a una sala, donde pueden enviar y recibir mensajes junto a otros usuarios conectados a la misma sala.

El frontend se comunica con un backend propio mediante:
- API REST para autenticación y gestión de salas.
- WebSockets (Socket.IO) para la actualización de mensajes en tiempo real.

Todo el sistema funciona de manera local, integrando frontend, backend y base de datos como una solución completa de chat en vivo.

## 🧠 Stack tecnológico (Frontend)

- **React 19**
- **TypeScript**
- **Vite**
- **Socket.IO Client**
- **SASS (SCSS)**
- **animate.css**
- **ESLint**

---

## 🔗 Proyecto relacionado (Backend)

Este frontend funciona **exclusivamente junto al backend** de ChatInLine:

👉 **Repositorio Backend:**  
https://github.com/Jerimonski/ChatInLine-Backend.git

El backend se encarga de:
- Autenticación (JWT con cookies HTTP-only)
- Creación y validación de salas
- Persistencia de mensajes en MongoDB
- Comunicación en tiempo real con Socket.IO

---

## 🗂 Estructura del proyecto
```
src/
│
├── assets/
│ └── fonts/ # Fuentes e íconos
│
├── components/
│ ├── common/ # Componentes reutilizables
│ │ └── icons/ # Íconos SVG como componentes
│ │
│ ├── Form/ # Formularios (login / register)
│ ├── RoomForm/ # Ingreso a sala por código
│ ├── RoomChat/ # Vista principal del chat
│ │
│ ├── Chat.tsx
│ ├── LoginUser.tsx
│ ├── Logout.tsx
│ └── RegisterUser.tsx
│
├── hooks/ # Custom hooks
│
├── sass/
│ ├── abstract/ # Variables y configuración base
│ ├── components/ # Estilos por componente
│ ├── chatRoom.scss
│ ├── forms.scss
│ └── style.scss
│
├── types/ # Tipos TypeScript
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🔐 Flujo de la aplicación

1. **Registro / Login**
   - El usuario se autentica mediante el backend.
2. **Ingreso a sala**
   - Se introduce un código de sala existente.
3. **Chat en tiempo real**
   - Envío y recepción de mensajes usando Socket.IO.
   - Todos los usuarios ven los mensajes en tiempo real.


## 🚀 Instalación y ejecución (local)

### 1️⃣ Instalar dependencias

```bash
1. pnpm install
2. Levantar servicios necesarios
Antes de iniciar el frontend, asegúrate de tener:

Backend de ChatInLine corriendo

MongoDB activo en local

3️. Iniciar el frontend
4. pnpm dev
La aplicación se ejecutará en el servidor local de Vite.

🛠 Scripts disponibles
pnpm dev       # Servidor de desarrollo
pnpm build     # Build de producción
pnpm preview   # Preview del build
pnpm lint      # Linting del proyecto
