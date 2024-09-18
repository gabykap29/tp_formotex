// pages/users.tsx

"use client";
import { FaSearch, FaPlus } from "react-icons/fa";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebard";
import Link from "next/link";
import { useFetchUsersList } from "@/hooks/useFetchUsersList";
import dayjs from 'dayjs';
import { useAuth } from "@/context/AuthContex";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const { users, error } = useFetchUsersList();
  const { isAutenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAutenticated === false) {
      router.push("/pages/login"); // Redirige si no está autenticado
    }
  }, [isAutenticated, router]);

  if (!isAutenticated) {
    return null;
  }

  return (
    <div className="d-flex" id="wrapper" style={{ height: "100vh", overflow: "hidden", backgroundColor: "#f5f5f5" }}>
      <Sidebar />
      {/* Contenido de la página */}
      <div id="page-content-wrapper" className="flex-fill" style={{ overflowY: "auto" }}>
        <Header />
        <div className="container-fluid">
          {/* Encabezado */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold" style={{ color: "#202124", fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                Gestión de Usuarios
              </h3>
              <p className="lead" style={{ color: "#5f6368", fontSize: "1rem" }}>
                Encuentra, administra y agrega usuarios de manera eficiente.
              </p>
            </div>
            <div>
              <Link href="/pages/users/add">
                <button className="btn btn-primary d-flex align-items-center" style={{ backgroundColor: "#1a73e8", border: "none", padding: "0.6rem 1.2rem", borderRadius: "4px" }}>
                  <FaPlus className="me-2" /> Nuevo Usuario
                </button>
              </Link>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="card shadow-sm mb-4" style={{ borderRadius: "8px" }}>
            <div className="card-body">
              <form className="d-flex align-items-center">
                <div className="input-group flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Buscar por nombre, documento, teléfono..."
                    style={{ borderRadius: "4px 0 0 4px", boxShadow: "none" }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#1a73e8", border: "none", borderRadius: "0 4px 4px 0" }}>
                    <FaSearch className="me-2" /> Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Lista de Usuarios */}
          <div className="card shadow-sm" style={{ borderRadius: "8px" }}>
            <div className="card-body">
              {error.status ? (
                <div className="alert alert-danger">{error.message}</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover" style={{ marginBottom: "0" }}>
                    <thead style={{ backgroundColor: "#f1f3f4", color: "#5f6368" }}>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Fecha Inicio</th>

                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={user._id} style={{ cursor: "pointer", color: "#202124" }}>
                            <td>{index + 1}</td>
                            <td>{user.lastname + " " + user.names}</td>
                            <td>{user.username}</td>
                            <td>{dayjs(user.createdAt).format('DD-MM-YYYY')}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center" style={{ color: "#5f6368" }}>
                            No se encontraron usuarios.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

