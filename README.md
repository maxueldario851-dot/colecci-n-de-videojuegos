# 🎮 Colección de Videojuegos

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Características Principales](#características-principales)
3. [Demo y Repositorio](#demo-y-repositorio)
4. [Aplicación Desplegada](#aplicación-desplegada)
5. [Repositorio GitHub](#repositorio-github)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Backend y Base de Datos](#backend-y-base-de-datos)
8. [Herramientas de Desarrollo](#herramientas-de-desarrollo)
9. [Requisitos Previos](#requisitos-previos)
10. [Instalación y Configuración](#instalación-y-configuración)
11. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
12. [Estructura de Carpetas](#estructura-de-carpetas)
13. [Componentes Principales](#componentes-principales)
14. [Video de Demostración](#video-de-demostración)

---

## Descripción del Proyecto

**Colección de Videojuegos** es una aplicación web desarrollada con **Angular** que implementa un sistema **CRUD** completo para gestionar una colección personal de videojuegos. La aplicación permite a los usuarios autenticarse, registrar, editar, eliminar y visualizar videojuegos, almacenando la información en **Firebase Firestore** y mostrando los datos en tiempo real.

Este proyecto fue desarrollado como parte de un trabajo académico, aplicando buenas prácticas de desarrollo frontend, arquitectura por componentes y servicios, e integración con servicios backend en la nube.

---

## Características Principales

* Autenticación de usuarios mediante **Firebase Authentication**
* CRUD completo de videojuegos (Crear, Leer, Actualizar, Eliminar)
* Asociación de registros al usuario autenticado
* Validaciones de formularios reactivos
* Búsqueda y filtrado por nombre, categoría o fecha
* Listado dinámico con actualización en tiempo real desde Firestore
* Vista de resumen con estadísticas generales
* Diseño modular basado en componentes y servicios

---

## Demo y Repositorio

### Aplicación Desplegada

🔗 **URL:** [https://coleccion-videojuegos-38697.web.app](https://coleccion-videojuegos-38697.web.app)

### Repositorio GitHub

🔗 **URL:** [https://github.com/maxueldario851-dot/colecci-n-de-videojuegos.git](https://github.com/maxueldario851-dot/colecci-n-de-videojuegos.git)

---

## Tecnologías Utilizadas

### Frontend

* Angular 20
* TypeScript
* HTML5
* CSS3
* RxJS

### Backend y Base de Datos

* Firebase Authentication
* Firebase Firestore
* Firebase Hosting

---

## Herramientas de Desarrollo

* Visual Studio Code
* Angular CLI
* Git y GitHub
* Node.js
* npm

---

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

* Node.js
* npm
* Angular CLI
* Git

### Verificar versiones instaladas

```bash
node --version
npm --version
ng version
```

### Versiones utilizadas en el proyecto

```text
Angular CLI: 20.3.11
Node: 24.11.1
npm: 11.6.2
Sistema Operativo: Windows 64 bits

Angular: 20.3.13
@angular/fire: 20.0.1
rxjs: 7.8.2
TypeScript: 5.9.3
zone.js: 0.15.1
```

---

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/maxueldario851-dot/colecci-n-de-videojuegos.git
cd colecci-n-de-videojuegos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

1. Crear un proyecto en [https://console.firebase.google.com](https://console.firebase.google.com)
2. Habilitar **Authentication (Email/Password)**
3. Crear una base de datos **Firestore**
4. Copiar las credenciales del proyecto
5. Configurar el archivo `environment.ts`:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  }
};
```

### 4. Iniciar el servidor de desarrollo

```bash
ng serve
```

La aplicación estará disponible en:

```
http://localhost:4200
```

### 5. Compilar para producción

```bash
ng build --configuration production
```

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura basada en **componentes y servicios**, separando responsabilidades para mejorar la mantenibilidad y escalabilidad:

* **Componentes**: manejo de la interfaz de usuario
* **Servicios**: lógica de negocio y comunicación con Firebase
* **Modelos**: definición de estructuras de datos
* **Guards**: protección de rutas

---

## Estructura de Carpetas

```text
src/
├── app/
│   ├── auth/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── models/
│   ├── guards/
│   └── app.module.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── main.ts
```

---

## Componentes Principales

### AuthComponent

* Registro e inicio de sesión de usuarios

### VideojuegosComponent

* Listado de videojuegos
* Búsqueda y filtrado

### VideojuegoFormComponent

* Crear y editar videojuegos

### EstadisticasComponent

* Resumen general y métricas

---

## Video de Demostración

🎥 **Video del funcionamiento del sistema:**

👉 Enlace de Google Drive: https://drive.google.com/file/d/1SXZTnNp4X35Jr-wUIgAfo6hDCyPWoVH9/view?usp=drive_link
> El video muestra el proceso de autenticación, registro de videojuegos, edición, eliminación y visualización en tiempo real de los datos.

---

## Autor

**PICHIHUA QUISPE, MAXUEL DARIO**

Proyecto académico desarrollado con Angular y Firebase.
