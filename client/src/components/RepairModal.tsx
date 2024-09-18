import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTools, FaCheckCircle, FaTruck, FaBan } from 'react-icons/fa';

const RepairModal = ({ show, handleClose, repair }) => {
  // Función para obtener el ícono basado en el estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'en proceso':
        return <FaTools color="orange" size={20} />;
      case 'terminado':
        return <FaCheckCircle color="green" size={20} />;
      case 'entregado':
        return <FaTruck color="blue" size={20} />;
      case 'cancelado':
        return <FaBan color="red" size={20} />;
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Reparación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {repair ? (
          <>
            <h4>Estado: {repair.status} {getStatusIcon(repair.status)}</h4>

            <h5>Dispositivo</h5>
            <p><strong>Tipo de Dispositivo:</strong> {repair.device.deviceType}</p>
            <p><strong>Marca:</strong> {repair.device.brand}</p>
            <p><strong>Modelo:</strong> {repair.device.deviceModel}</p>
            <p><strong>N° Serie:</strong> {repair.device.serialNumber}</p>
            <p><strong>Sistema Operativo:</strong> {repair.device.os}</p>

            <h5>Cliente</h5>
            <p><strong>Nombre:</strong> {repair.client.names} {repair.client.lastname}</p>
            <p><strong>Documento de Identidad:</strong> {repair.client.identityCardNumber}</p>
            <p><strong>Dirección:</strong> {repair.client.address.street} {repair.client.address.number}, {repair.client.address.neighborhood}</p>

            <h5>Costo y Fechas</h5>
            <p><strong>Fecha de Reparación:</strong> {new Date(repair.date).toLocaleDateString()}</p>
            <p><strong>Costo:</strong> ${repair.cost}</p>
          </>
        ) : (
          <p>Cargando detalles...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RepairModal;

