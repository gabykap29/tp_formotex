"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContex";


const Header = () => {
  const { logout } = useAuth();
  return (
    <div
      className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom text-white"
      style={{
        background: "linear-gradient(90deg, #343a40, #495057)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Título o Logo */}
      <h3 className="h4 m-0">Panel de Control</h3>

      {/* Botones de navegación */}
      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group me-3">
          <Link href={'/pages/home'}>
            <button type="button" className="btn btn-sm btn-outline-light" style={{ marginRight: "10px" }}>
              Inicio
            </button>
          </Link>
          <Link href={'/pages/repairs'}>
            <button type="button" className="btn btn-sm btn-outline-light" style={{ marginRight: "10px" }}>
              Reparaciones
            </button>

          </Link>
          <Link href={'/pages/clients'}>
            <button type="button" className="btn btn-sm btn-outline-light" style={{ marginRight: "10px" }}>
              Clientes
            </button>
          </Link>
          <Link href={'/pages/users'}>
            <button type="button" className="btn btn-sm btn-outline-light">
              Usuarios
            </button>
          </Link>
        </div>

        {/* Botón de cuenta con ícono */}
        <button
          type="button"
          className="btn btn-sm btn-danger" // Cambié a 'btn-danger' para darle un color rojo asociado con acciones de cierre o eliminación
          style={{ marginLeft: "10px", display: "flex", alignItems: "center", padding: "0.5rem 1rem", borderRadius: "4px" }}
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right me-2"></i> {/* Icono de salida */}
          Cerrar Sesión
        </button>

      </div>
    </div>
  );
};

export default Header;

