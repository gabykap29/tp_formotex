import { FaSearch, FaPlus } from 'react-icons/fa'; // Importa los íconos necesarios
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebard"; // Asegúrate de que el nombre del archivo y la importación coincidan
import Link from "next/link";

const RepairsPage = () => {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper" className="flex-fill">
        <Header />
        <div className="container-fluid" style={{ backgroundColor: '#f8f9fa' }}> {/* Fondo más oscuro que blanco */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="display-4">Gestión de Reparaciones</h1>
              <p className="lead">Encuentra, administra y agrega reparaciones de manera eficiente.</p>
            </div>
            <div>
              <Link href="/pages/repairs/add">
                <button className="btn btn-success d-flex align-items-center">
                  <FaPlus className="me-2" /> Registrar Nueva Reparación
                </button>
              </Link>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm">
                <div className="card-header">
                  <h4 className="m-0">Buscar Reparaciones</h4>
                </div>
                <div className="card-body">
                  <form className="d-flex">
                    <div className="form-group mb-0 me-2 flex-grow-1">
                      <label htmlFor="search" className="form-label sr-only">Buscar Reparaciones</label>
                      <input type="text" className="form-control" id="search" placeholder="Buscar por ID, producto, cliente..." />
                      <button type="submit" className="btn btn-primary">
                      <FaSearch className="me-2" /> Buscar
                    </button>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-sm">
                <div className="card-header">
                  <h4 className="m-0">Lista de Reparaciones</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered" style={{ backgroundColor: '#ffffff' }}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Producto</th>
                          <th>Cliente</th>
                          <th>Fecha de Inicio</th>
                          <th>Fecha de Fin</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Producto 1</td>
                          <td>Cliente 1</td>
                          <td>01/01/2021</td>
                          <td>01/02/2021</td>
                          <td>Completado</td>
                        </tr>
                        {/* Agrega más filas según sea necesario */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairsPage;
