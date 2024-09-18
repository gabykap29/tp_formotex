"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebard";
import Link from "next/link";
import { useAuth } from "@/context/AuthContex";
import { useFetchInventory } from "@/hooks/useInventory";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import RepairModal from "@/components/RepairModal";
import { useFetchRepairById } from "@/hooks/useFetchRepairById";

const InventaryPage = () => {
  const { devices, loading, error } = useFetchInventory();
  const { isAutenticated } = useAuth();
  const router = useRouter();
  const [selectedRepairId, setSelectedRepairId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda

  useEffect(() => {
    if (isAutenticated === false) {
      router.push("/pages/login");
    }
  }, [isAutenticated, router]);

  const handleShowModal = (id: string) => {
    setSelectedRepairId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRepairId(null);
  };

  const { repair, loading: loadingRepair } = useFetchRepairById(selectedRepairId);

  // Filtramos los dispositivos según el término de búsqueda
  const filteredDevices = devices.filter((repair) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      repair.deviceType.toLowerCase().includes(searchLower) ||
      repair.brand.toLowerCase().includes(searchLower) ||
      repair.serialNumber.toLowerCase().includes(searchLower) ||
      repair.clientId.lastname.toLowerCase().includes(searchLower) ||
      repair.clientId.names.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="d-flex" id="wrapper" style={{ height: "100vh", overflow: "hidden", backgroundColor: "#f5f5f5" }}>
      <Sidebar />
      <div id="page-content-wrapper" className="flex-fill" style={{ overflowY: "auto" }}>
        <Header />
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold" style={{ color: "#202124", fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                Inventario de reparaciones
              </h3>
              <p className="lead" style={{ color: "#5f6368", fontSize: "1rem" }}>
                Encuentra, administra y agrega reparaciones de manera eficiente.
              </p>
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado de búsqueda
                    placeholder="Buscar por ID, producto, cliente..."
                    style={{ borderRadius: "4px 0 0 4px", boxShadow: "none" }}
                  />
                  <button disabled type="button" className="btn btn-primary" style={{ backgroundColor: "#1a73e8", border: "none", borderRadius: "0 4px 4px 0" }}>
                    <FaSearch className="me-2" /> Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Lista de Reparaciones */}
          <div className="row">
            {error ? (
              <div className="alert alert-danger">{error.message}</div>
            ) : filteredDevices.length > 0 ? (
              filteredDevices.map((repair) => (
                <div className="col-md-4 mb-4" key={repair._id}>
                  <div className="card border-0 rounded-lg shadow-lg" style={{ backgroundColor: "#ffffff", transition: "transform 0.2s" }}>
                    <div className="card-body d-flex flex-column">
                      <div className="mb-3">
                        <h6 className="card-title mb-3 text-center" style={{ color: "#333333" }}>
                          {(repair.deviceType).toUpperCase()} {repair.brand}
                        </h6>
                        <h6 className="card-subtitle text-muted d-flex align-items-center">
                          <BiUser className="" style={{ color: "#5f6368" }} /> {repair.clientId.lastname} {repair.clientId.names}
                        </h6>
                      </div>
                      <div className="mb-3">
                        <p className="card-text d-flex align-items-center" style={{ marginBottom: "0.5rem" }}>
                          <FaCalendarAlt className="me-2" style={{ color: "#1a73e8" }} /> <strong>Fecha de Ingreso:</strong> {dayjs(repair.createdAt).format('DD-MM-YYYY')}
                        </p>
                        <p className="card-text d-flex align-items-center" style={{ marginBottom: "0.5rem" }}>
                          <FaTag className="me-2" style={{ color: "#1a73e8" }} /> <strong>Modelo:</strong> {repair.deviceModel}
                        </p>
                        <p className="card-text d-flex align-items-center" style={{ marginBottom: "0.5rem" }}>
                          <FaTag className="me-2" style={{ color: "#1a73e8" }} /> <strong>N° serie:</strong> {repair.serialNumber}
                        </p>
                        <p className="card-text d-flex align-items-center" style={{ marginBottom: "0.5rem" }}>
                          <FaTag className="me-2" style={{ color: "#1a73e8" }} /> <strong>SO:</strong> {repair.os}
                        </p>
                        <p className="card-text d-flex align-items-center">
                          <FaTag className="me-2" style={{ color: "#1a73e8" }} /> <strong>Observaciones:</strong> {repair.observations || " sin observaciones"}
                        </p>
                      </div>
                      <button className="btn btn-primary mt-auto" onClick={() => handleShowModal(repair._id)} style={{ backgroundColor: "#1a73e8", border: "none", borderRadius: "4px", padding: "0.5rem 1rem" }}>
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center" style={{ color: "#5f6368" }}>
                No se encontraron reparaciones.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <RepairModal show={showModal} handleClose={handleCloseModal} repair={repair} />
    </div>
  );
};

export default InventaryPage;

