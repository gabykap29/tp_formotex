# Plataforma de Gestión de Inventario de Reparaciones

## Descripción
Esta aplicación está diseñada para gestionar el inventario de equipos informáticos en la empresa FORMOTEX, que se dedica al mantenimiento y distribución de equipos. El objetivo es reemplazar el sistema manual actual, proporcionando una solución más eficiente y precisa.

## Tecnologías Utilizadas
- **Backend**: TypeScript con Node.js y MongoDB
- **Frontend**: Next.js 14 con TypeScript
- **Autenticación**: JSON Web Token (JWT)

## Funcionalidades

### 1. Operaciones CRUD
- **Crear**: Agregar nuevos equipos informáticos al inventario.
- **Leer**: Listar equipos y sus detalles.
- **Actualizar**: Modificar información de los equipos existentes.
- **Eliminar**: Quitar equipos del inventario.

### 2. Autenticación con JWT
- Los usuarios deben autenticarse para realizar operaciones CRUD.
- Endpoints protegidos: `/auth/login`, `/auth/register`, y todos los endpoints de gestión de equipos.
- Al iniciar sesión, se genera un token JWT que se debe enviar en los encabezados de las solicitudes.

### 3. Interfaz de Usuario
- Formulario de login en el frontend.
- Visualización y gestión del inventario de equipos.
- Almacenamiento del token JWT en `localStorage`.

## Instalación

### Requisitos
- Node.js (v14 o superior)
- MongoDB (local o en la nube)

### Pasos para Configurar el Backend
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/gabykap29/tp_formotex
   cd tp_formotex
   ```

2. Instalar dependencias:

```bash

npm install
```
3. Configurar la base de datos MongoDB en el archivo de configuración (ejemplo: .env).

4. Iniciar el servidor:

```bash
npm run dev
```
