"use client";
import { FaSave } from 'react-icons/fa'; 
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebard"; 
import { FormEvent } from 'react';
import useFetchClient from "@/hooks/useFetchClient"; 
import useFetchDevice from '@/hooks/useFetchDevice';
const RegisterRepairPage: React.FC = () => {
  
  const { fetchClientData, handleChange, handleSubmit, error, clientId } = useFetchClient(); // Usar el hook para gestionar los datos del cliente
  const { fetchDeviceData, handleChangeDevice, handleSubmitDevice, errorDevice } = useFetchDevice(clientId);


  console.log("ID DEL CLIENTE", clientId);
  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(e); // Ejecuta el envío del formulario del cliente
  };

  return (
    <div className="d-flex vh-80">
      <Sidebar />
      <div id="page-content-wrapper" className="flex-grow-1 d-flex flex-column ms-0" style={{ marginLeft: '250px' }}>
        <Header />
        <div className="container-fluid flex-grow-1 d-flex flex-column" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="text-center">
            <h3 className="display-7">Registrar Reparaciones</h3>
            <p className="lead">Complete los formularios para registrar un nuevo dispositivo y cliente.</p>
          </div>

          <div className="mb-2">
            <button className="btn btn-success d-flex align-items-center">
              Completar
            </button>
          </div>

          <div className="row mb-4 flex-fill d-flex">

            <div className="col-md-6 d-flex flex-column">
              <div className="card shadow-sm mb-4" style={{ maxHeight: 'calc(100vh - 150px)', overflow: 'hidden' }}>
                <div className="card-header">
                  <h4 className="m-0">Registrar Cliente</h4>
                </div>
                {error.status !== 201 && error.status !== 200 && error.status !== 0 ? (
                    <div className="alert alert-danger mt-3">{error.message}</div>
                  ) : error.status === 201 || error.status === 200 ? (
                    <div className="alert alert-success mt-3 mx-2">Cliente registrado correctamente.</div>
                  ): ""}
                  <div className="card-body d-flex flex-column" style={{ maxHeight: 'calc(100vh - 290px)', overflowY: 'auto' }}>
                  <form onSubmit={handleRegisterSubmit}>
                    {/* Formulario del cliente */}
                    <div className="form-group mb-3">
                      <label htmlFor="identityCardNumber" className="form-label">N° Documento/Pasaporte</label>
                      <input
                        type="text"
                        className="form-control"
                        id="identityCardNumber"
                        name="identityCardNumber"
                        value={fetchClientData.identityCardNumber} // Vincular con el hook
                        onChange={handleChange}
                        placeholder="Número de documento del cliente"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="names" className="form-label">Nombres</label>
                      <input
                        type="text"
                        className="form-control"
                        id="names"
                        name="names"
                        value={fetchClientData.names} // Vincular con el hook
                        onChange={handleChange}
                        placeholder="Nombres del cliente"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="lastname" className="form-label">Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        value={fetchClientData.lastname} // Vincular con el hook
                        onChange={handleChange}
                        placeholder="Apellido del cliente"
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        className="form-control"
                        id="birthDate"
                        name="birthDate"
                        value={fetchClientData.birthDate} // Verificar si birthDate no es null
                        onChange={handleChange}
                      />

                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="address.street" className="form-label">Calle</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address.street"
                        name="address.street"
                        value={fetchClientData.address.street} // Vincular con el hook
                        onChange={handleChange}
                        placeholder="Calle de residencia"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="address.number" className="form-label">Número</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address.number"
                        name="address.number"
                        value={fetchClientData.address.number.toString()} // Convertir a string
                        onChange={handleChange}
                        placeholder="Número de residencia"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="address.neighborhood" className="form-label">Barrio</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address.neighborhood"
                        name="address.neighborhood"
                        value={fetchClientData.address.neighborhood} // Vincular con el hook
                        onChange={handleChange}
                        placeholder="Barrio de residencia"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary d-flex align-items-center">
                      <FaSave className="me-2" /> Guardar Cliente
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-column">
              <div className="card shadow-sm mb-4" style={{ maxHeight: 'calc(100vh - 150px)', overflow: 'hidden' }}>
              <div className="card-header">
                  <h4 className="m-0">Registrar Dispositivo</h4>
                </div>
                {errorDevice && typeof errorDevice === 'object' && errorDevice.status !== 201 && errorDevice.status !== 200 && errorDevice.status !== 0 ? (
                  <div className="alert alert-danger mt-3">{errorDevice.message}</div>
                ) : (errorDevice && typeof errorDevice === 'object' && (errorDevice.status === 201 || errorDevice.status === 200) ? (
                  <div className="alert alert-success mt-3 mx-2">Cliente registrado correctamente.</div>
                ) : null )}
 
                  <div className="card-body d-flex flex-column" style={{ maxHeight: 'calc(100vh - 290px)', overflowY: 'auto' }}>
                  <form onSubmit={handleSubmitDevice}>
                    {/* Formulario del dispositivo */}
                    <div className="form-group mb-3">
                      <label htmlFor="deviceType" className="form-label">Tipo de Dispositivo</label>
                      <select
                        type="text"
                        className="form-control"
                        id="deviceType"
                        name="deviceType"
                        value={fetchDeviceData.deviceType}
                        onChange={handleChangeDevice}
                        placeholder="Portátil, escritorio, móvil, tablet"
                      >
                        <option selected>Seleccione un tipo de dispositivo</option>
                        <option value="portatil">Portátil</option>
                        <option value="escritorio">Escritorio</option>
                        <option value="movil">Móvil</option>
                        <option value="tablet">Tablet</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="brand" className="form-label">Marca</label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand"
                        value={fetchDeviceData.brand}
                        onChange={handleChangeDevice}
                        placeholder="Marca del dispositivo"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="deviceModel" className="form-label">Modelo</label>
                      <input
                        type="text"
                        className="form-control"
                        id="deviceModel"
                        name="deviceModel"
                        value={fetchDeviceData.deviceModel}
                        onChange={handleChangeDevice}
                        placeholder="Modelo del dispositivo"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="serialNumber" className="form-label">Número de Serie</label>
                      <input
                        type="text"
                        className="form-control"
                        id="serialNumber"
                        name="serialNumber"
                        value={fetchDeviceData.serialNumber}
                        onChange={handleChangeDevice}
                        placeholder="Número de serie del dispositivo"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="os" className="form-label">Sistema Operativo</label>
                      <input
                        type="text"
                        className="form-control"
                        id="os"
                        name="os"
                        value={fetchDeviceData.os}
                        onChange={handleChangeDevice}
                        placeholder="Sistema operativo del dispositivo"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary d-flex align-items-center">
                      <FaSave className="me-2" /> Guardar Dispositivo
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRepairPage;
