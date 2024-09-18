"use client";
import { FaSearch } from "react-icons/fa";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebard";
import Link from "next/link";
import { useFetchClientsList } from "@/hooks/useClientList";
import dayjs from 'dayjs';
import { useAuth } from "@/context/AuthContex";
import { useEffect, useState } from "react"; // Importamos useState
import { useRouter } from "next/navigation";

const ClientsPage = () => {
  const { clients, error } = useFetchClientsList();
  const { isAutenticated } = useAuth();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(""); // Almacena el término de búsqueda

  useEffect(() => {
    if (isAutenticated === false) {
      router.push("/pages/login"); // Redirige si no está autenticado
    }
  }, [isAutenticated, router]);

  if (!isAutenticated) {
    return null;
  }

  // Filtra los clientes en función del término de búsqueda
  const filteredClients = clients.filter((client) => {
    const clientFullName = `${client.lastname} ${client.names}`.toLowerCase();
    const identityCardNumber = client.identityCardNumber.toLowerCase();
    const address = `${client.address.street} ${client.address.number}`.toLowerCase();

    return (
      clientFullName.includes(searchTerm.toLowerCase()) ||
      identityCardNumber.includes(searchTerm.toLowerCase()) ||
      address.includes(searchTerm.toLowerCase())
    );
  });

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
                Gestión de Clientes
              </h3>
              <p className="lead" style={{ color: "#5f6368", fontSize: "1rem" }}>
                Encuentra, administra y agrega clientes de manera eficiente.
              </p>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="card shadow-sm mb-4" style={{ borderRadius: "8px" }}>
            <div className="card-body">
              <form
                className="d-flex align-items-center"
                onSubmit={(e) => e.preventDefault()} // Evita el refresh de la página al buscar
              >
                <div className="input-group flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Buscar por nombre, documento, dirección..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                    style={{ borderRadius: "4px 0 0 4px", boxShadow: "none" }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#1a73e8", border: "none", borderRadius: "0 4px 4px 0" }}>
                    <FaSearch className="me-2" /> Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Lista de Clientes */}
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
                        <th>Documento</th>
                        <th>Teléfono</th>
                        <th>Fecha de Registro</th>
                        <th>Dirección</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.length > 0 ? (
                        filteredClients.map((client, index) => (
                          <tr key={client._id} style={{ cursor: "pointer", color: "#202124" }}>
                            <td>{index + 1}</td>
                            <td>{client.lastname + " " + client.names}</td>
                            <td>{client.identityCardNumber}</td>
                            <td>{client.phone}</td>
                            <td>{dayjs(client.createdAt).format('DD-MM-YYYY')}</td>
                            <td>{client.address.street + " " + client.address.number}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center" style={{ color: "#5f6368" }}>
                            No se encontraron clientes.
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

export default ClientsPage;

