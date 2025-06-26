# Sistema Comercial API 

API REST desarrollada en **.NET 8** para la gestión de productos y usuarios, con autenticación JWT y roles de acceso. Diseñada para ser escalable, segura y fácil de implementar.

## 🔧 Tecnologías y Dependencias
- **.NET 8** (Target Framework)
- **Entity Framework Core 9** (ORM para SQL Server)
- **JWT Bearer Authentication** (Autenticación segura)
- **BCrypt.Net-Next** (Hash de contraseñas)
- **Swashbuckle.AspNetCore** (Documentación Swagger/OpenAPI)
- **Docker** (Próximamente)

## ✨ Características
- ✅ **CRUD completo** para productos y usuarios
- 🔐 **Autenticación** con:
  - JWT (Bearer Tokens)
  - Cookies
- 👥 **Sistema de roles**:
  - `user`: Acceso básico
  - `admin`: Gestión de usuarios
- 📦 **Próximamente**: Containerización con Docker

## 🚀 Configuración Inicial

### Requisitos
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- SQL Server (o compatible con EF Core)
- (Opcional) [Docker](https://www.docker.com/) (para implementación futura)

### Pasos para ejecutar
1. **Configurar conexión a BD**:
   Edita `Sistema_comercial/appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=TU_SERVIDOR;Database=SistemaComercial;User=TU_USUARIO;Password=TU_CONTRASEÑA;TrustServerCertificate=True"
   }
   ```

2. **Aplicar migraciones**:
   ```bash
   dotnet ef database update
   ```

3. **Ejecutar el proyecto**:
   ```bash
   dotnet run
   ```

4. **Acceder a Swagger UI**:
   Visita `https://localhost:<PORT>/swagger` (reemplaza `<PORT>` con el puerto asignado).

## 🛠️ Estructura de Roles
| Rol    | Permisos                          |
|--------|-----------------------------------|
| `user` | Ver                               |
| `admin`| Gestión completa de usuarios y configuración de productos                  |

## 📌 Ejemplo de Uso (JWT)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin123!"
}
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "admin"
}
```

## 📦 Docker (Próximamente)
```bash
docker build -t sistema-comercial-api .
docker run -p 8080:80 sistema-comercial-api
```

## 📄 Licencia
MIT License (Ver archivo `LICENSE` para detalles)
---
> ✨ **Contribuciones bienvenidas**! Reporta issues o envía PRs para mejorar el proyecto.
---
