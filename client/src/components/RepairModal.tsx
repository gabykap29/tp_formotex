import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaTools, FaCheckCircle, FaTimes, FaPlayCircle, FaCheck, FaBan, FaTruck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
const RepairModal = ({ show, handleClose, repair }) => {
  const [cost, setCost] = useState(repair?.cost || 0); // Estado para el costo
  const [loading, setLoading] = useState(false); // Para mostrar feedback de cargando
  const router = useRouter();
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

  // Función para manejar la actualización del estado de la reparación
  const handleUpdateStatus = async (newStatus) => {
    if (repair) {
      try {
        setLoading(true); // Inicia el estado de carga
        const response = await fetch(`http://localhost:4000/api/repair/state/${repair._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus, cost }),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar el estado');
        }
        alert("Se actualizó el estado con éxito!");
        handleClose(); // Cierra el modal
        router.push('/pages/repairs')
      } catch (error) {
        console.error('Error al actualizar el estado de la reparación:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Reparación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {repair ? (
          <>
            <Row className="mb-4">
              <Col>
                <h4 className="d-flex align-items-center">
                  Estado: {repair.status} {getStatusIcon(repair.status)}
                </h4>
              </Col>
            </Row>

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
            <Form.Group as={Row} controlId="formCost">
              <Form.Label column sm={3}><strong>Costo:</strong></Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  placeholder="Introduce el costo"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  min="0"
                />
              </Col>
            </Form.Group>
          </>
        ) : (
          <p>Cargando detalles...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          <FaTimes /> Cerrar
        </Button>
        <Button variant="danger" onClick={() => handleUpdateStatus('cancelado')} disabled={loading}>
          {loading ? 'Actualizando...' : <><FaBan /> Cancelar</>}
        </Button>
        <Button variant="success" onClick={() => handleUpdateStatus('terminado')} disabled={loading}>
          {loading ? 'Actualizando...' : <><FaCheck /> Terminar</>}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RepairModal;

