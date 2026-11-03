# Sistema de Gestión de Licencias Docentes — CPEM N° 25

Aplicación web moderna y liviana desarrollada en **React + TypeScript + Vite + Tailwind CSS** con persistencia en **Firebase Firestore** y resguardo documental directo en **Google Drive**.

Este proyecto es 100% independiente y puede ser clonado, editado, ejecutado y desplegado desde cualquier computadora con Visual Studio Code u otro editor de código, sin depender de Google AI Studio.

---

## 🚀 Requisitos Previos en tu PC

- **Node.js** (versión 18.x, 20.x o superior) — [Descargar Node.js](https://nodejs.org/)
- **Git** — [Descargar Git](https://git-scm.com/)
- Un editor de código como **Visual Studio Code**, **Cursor**, o similar.

---

## 🛠️ Instalación y Puesta en Marcha Local

### 1. Clonar el repositorio
Abre una terminal en tu computadora y clona tu repositorio de GitHub:

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
```

### 2. Instalar dependencias
Ejecuta:

```bash
npm install
```

### 3. Configuración de credenciales (.env)
Copia el archivo de ejemplo para crear tu archivo `.env` local:

```bash
cp .env.example .env
```

Abre el archivo `.env` en tu editor y completa tus variables de Firebase (o coloca tu archivo `firebase-applet-config.json` en la raíz de tu proyecto local):

```env
# Configuración del Cliente Firebase
VITE_FIREBASE_API_KEY="AIzaSyDx1bJ8JUk-rRyV2-U44-Fq4OwD_mwOGL8"
VITE_FIREBASE_AUTH_DOMAIN="gen-lang-client-0302919713.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="gen-lang-client-0302919713"
VITE_FIREBASE_STORAGE_BUCKET="gen-lang-client-0302919713.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="769743112053"
VITE_FIREBASE_APP_ID="1:769743112053:web:dbcb5747ec96639df2b53c"
VITE_FIREBASE_FIRESTORE_DATABASE_ID="ai-studio-d7258386-3f0d-4c10-bc1f-4315081542ab"
```

> **Nota de Seguridad:** El archivo `.env` y `firebase-applet-config.json` están incluidos en `.gitignore`, por lo que nunca se subirán a GitHub si haces commits.

### 4. Iniciar el Servidor de Desarrollo
Para levantar la aplicación en tu máquina local:

```bash
npm run dev
```

Abre tu navegador en:
**`http://localhost:3000`**

---

## 🧭 Estructura de Vistas y Rutas

- **Frontend Público para Agentes (`/`):**
  - **Solicitar licencia:** Formulario oficial para los 156 agentes con firma digital en pantalla.
  - **Mis solicitudes:** Consulta de estado y subida de certificados/constancias médicas.
  - Los docentes solo ingresan con su DNI o N° de Legajo (sin contraseñas ni login de Google).

- **Dashboard Privado para Secretaría y Dirección (`/admin` o `/dashboard`):**
  - Acceso privado con usuario institucional (`cpem25oficial@gmail.com` / contraseña `admin123`).
  - Módulos: Dashboard general, Cargos y Puestos, Padrón de Agentes, Solicitudes de Licencias, Importador SISO Neuquén, Tipos de Licencia, Gestión de Archivos y Usuarios.

- **Integración con Google Drive:**
  - El administrador autoriza la cuenta institucional por **única vez** desde el Dashboard Privado (`/admin`).
  - La autorización se guarda en Firestore (`system_settings/google_drive`) y en almacenamiento local.
  - El **cron automático cada 1 hora** transfiere en segundo plano cualquier archivo acumulado a las carpetas designadas:
    - Firmas: `1fK_xLbkgN2fcANBmabajgZhA7Hhry1wY`
    - Constancias: `1WXKwjHBvDPosGtX9XLohkEq_tOk224Kv`

---

## 📦 Compilación para Producción

Para compilar el proyecto optimizado para subir a un servidor:

```bash
npm run build
```

Esto generará la carpeta optimizada **`dist/`** con todos los archivos estáticos listos para desplegar.

---

## 🌐 Opciones de Publicación Gratuita (Sin Costos)

Al ser una aplicación estándar Vite SPA, puedes desplegar la carpeta `dist/` en cualquiera de las siguientes plataformas gratuitas:

### Opción A: Vercel (Recomendada - 1 clic)
1. Instala el CLI de Vercel en tu PC: `npm i -g vercel`
2. Ejecuta en la carpeta del proyecto: `vercel`
3. Sigue las instrucciones en pantalla. Se conectará automáticamente con tu repositorio de GitHub para actualizarse con cada commit.

### Opción B: Netlify
1. Arrastra la carpeta `dist/` en el panel de [Netlify Drop](https://app.netlify.com/drop), o
2. Conecta tu repositorio de GitHub en Netlify seleccionando:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Opción C: Firebase Hosting (Plan Gratuito Spark)
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión: `firebase login`
3. Inicializa hosting: `firebase init hosting` (selecciona `dist` como carpeta pública y responde 'Yes' a Single Page App).
4. Despliega: `firebase deploy --only hosting`

---

## 📁 Estructura del Código Fuente

```
├── src/
│   ├── components/
│   │   ├── admin/               # Módulos del panel privado de Secretaría
│   │   ├── Navbar.tsx           # Barra de navegación pública (2 pestañas)
│   │   ├── SolicitarLicencia.tsx# Formulario de solicitud y firma
│   │   └── MisSolicitudes.tsx   # Panel de consulta y justificación de agentes
│   ├── services/
│   │   ├── authService.ts       # Autenticación de roles (Superadmin/Secretaría)
│   │   ├── dataService.ts       # Gestión de datos maestros y Firestore
│   │   ├── firebase.ts          # Inicialización resiliente de Firebase
│   │   ├── googleDriveService.ts# Subida directa a Google Drive v3 API
│   │   └── driveSyncCronService.ts # Cron automático de sincronización cada 1 hora
│   ├── types/                   # Definición de tipos TypeScript
│   ├── App.tsx                  # Enrutador principal (/ y /admin)
│   └── main.tsx                 # Entrada principal React
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore                   # Exclusión de archivos sensibles para Git
├── package.json                 # Dependencias y scripts
└── vite.config.ts               # Configuración del bundler Vite
```
