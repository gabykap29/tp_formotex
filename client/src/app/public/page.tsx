"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { useFetchInventory } from "@/hooks/useFetchSearchDevice";
import dayjs from "dayjs";
import RepairModal from "@/components/RepairModal";

const RepairStatusPage = () => {
  const { devices, loading, error, fetchInventory } = useFetchInventory();
  const [dni, setDni] = useState("");
  const [selectedRepairId, setSelectedRepairId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (id: string) => {
    setSelectedRepairId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRepairId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dni) {
      fetchInventory(dni);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f9fafc", height: "100vh", padding: "20px" }}>
      {/* Header */}
      <div className="bg-light p-4 mb-4 rounded" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <h1 className="fw-bold" style={{ color: "#202124", fontSize: "2rem" }}>Consulta de Reparaciones</h1>
        <p className="lead" style={{ color: "#5f6368", fontSize: "1.1rem" }}>Verifica el estado de tu equipo usando tu DNI.</p>
      </div>

      {/* Formulario de búsqueda */}
      <div className="card shadow-sm mb-4" style={{ borderRadius: "12px" }}>
        <div className="card-body">
          <form className="d-flex" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ingresar DNI del cliente"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                style={{ borderRadius: "8px 0 0 8px" }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#1a73e8", border: "none", borderRadius: "0 8px 8px 0" }}
              >
                <FaSearch className="me-2" /> Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Lista de reparaciones */}
      <div className="row">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <div className="alert alert-danger">{error.message}</div>
        ) : devices.length > 0 ? (
          devices.map((repair) => (
            <div className="col-md-4 mb-4" key={repair._id}>
              <div className="card border-0 rounded-lg shadow" style={{ backgroundColor: "#fff", transition: "transform 0.2s" }}>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title text-center mb-2" style={{ fontWeight: "bold", color: "#333" }}>
                    {(repair.device.deviceType).toUpperCase()} {repair.device.brand}
                  </h6>
                  <h6 className="card-subtitle text-muted mb-3 d-flex align-items-center justify-content-center">
                    <BiUser className="me-2" /> {repair.client.lastname} {repair.client.names}
                  </h6>
                  <div className="mb-3">
                    <p className="d-flex align-items-center mb-2">
                      <FaCalendarAlt className="me-2" style={{ color: "#1a73e8" }} /> <strong>Fecha de Ingreso:</strong> {dayjs(repair.createdAt).format('DD-MM-YYYY')}
                    </p>
                    <p className="d-flex align-items-center mb-2">
                      <FaTag className="me-2" style={{ color: "#1a73e8" }} /> <strong>Modelo:</strong> {repair.device.deviceModel}
                    </p>
                    <p className="d-flex align-items-center mb-2">
                      <FaTag className="me-2" style={{ color: "#1a73e8" }} /> <strong>N° serie:</strong> {repair.device.serialNumber}
                    </p>
                    <p className="d-flex align-items-center mb-2">
                      <FaTag className="me-2" style={{ color: "#1a73e8" }} /> <strong>SO:</strong> {repair.device.os}
                    </p>
                    <p className="d-flex align-items-center">
                      <FaTag className="me-2" style={{ color: "#1a73e8" }} /> <strong>Observaciones:</strong> {repair.device.observations || "Sin observaciones"}
                    </p>
                  </div>
                  <div
                    className="repair-status mt-auto text-center"
                    style={{
                      backgroundColor: repair.status === "completed" ? "#34a853" : "#fbbc05", // Verde para completado, amarillo para en progreso
                      color: "#ffffff",
                      borderRadius: "8px",
                      padding: "0.75rem 1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {repair.status === "completed" ? "Reparación Completada" : "En Proceso"}
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center" style={{ color: "#5f6368" }}>
            No se encontraron reparaciones para el DNI ingresado.
          </div>
        )}
      </div>

      {/* Modal */}
      <RepairModal show={showModal} handleClose={handleCloseModal} repair={selectedRepairId} />
    </div>
  );
};

export default RepairStatusPage;

