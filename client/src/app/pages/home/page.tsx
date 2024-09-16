"use client";
import Sidebar from "@/components/Sidebard";
import Header from "@/components/Header";
import { useEffect } from "react";
import Link from "next/link";


const Home = () => {
  useEffect(() => {
    // Asegurarse de que el body ocupe el 100% de la altura
    document.body.style.height = "100vh";
  }, []);

  // Colores para las tarjetas
  const cardColors = {
    reparaciones: "#ff7675",
    inventario: "#74b9ff",
    clientes: "#55efc4",
    usuarios: "#fdcb6e"
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row" style={{ height: "100%" }}>
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 px-0" style={{ height: "100vh" }}>
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="col-md-9 col-lg-10 px-0 bg-white" style={{ overflowY: "auto", height: "100%" }}>
          <Header />
          
          {/* Contenedor de Tarjetas */}
          <div className="container mt-4">
            <div className="row g-4">
              {/* Reparaciones Card */}
              <div className="col-md-6">
                <div className="card shadow-lg border-0" style={{ backgroundColor: cardColors.reparaciones, borderRadius: '15px' }}>
                  <div className="card-body text-white">
                    <h5 className="card-title">Reparaciones</h5>
                    <p className="card-text">Gestión de reparaciones de productos.</p>
                    <Link href={"/pages/repairs"}>
                      <button className="btn btn-light">Ver más</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Inventario Card */}
              <div className="col-md-6">
                <div className="card shadow-lg border-0" style={{ backgroundColor: cardColors.inventario, borderRadius: '15px' }}>
                  <div className="card-body text-white">
                    <h5 className="card-title">Inventario</h5>
                    <p className="card-text">Control del inventario y stock.</p>
                    <a href="#" className="btn btn-light">Ver más</a>
                  </div>
                </div>
              </div>

              {/* Clientes Card */}
              <div className="col-md-6">
                <div className="card shadow-lg border-0" style={{ backgroundColor: cardColors.clientes, borderRadius: '15px' }}>
                  <div className="card-body text-white">
                    <h5 className="card-title">Clientes</h5>
                    <p className="card-text">Gestión de clientes y ventas.</p>
                    <a href="#" className="btn btn-light">Ver más</a>
                  </div>
                </div>
              </div>

              {/* Usuarios Card */}
              <div className="col-md-6">
                <div className="card shadow-lg border-0" style={{ backgroundColor: cardColors.usuarios, borderRadius: '15px' }}>
                  <div className="card-body text-white">
                    <h5 className="card-title">Usuarios</h5>
                    <p className="card-text">Gestión de usuarios del sistema.</p>
                    <a href="#" className="btn btn-light">Ver más</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
