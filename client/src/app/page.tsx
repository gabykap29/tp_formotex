"use client";
import Link from 'next/link';
import Head from 'next/head';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignInAlt, FaUserCheck } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <Head>
        <title>FORMOTEX - Reparación de Equipos Informáticos</title>
        <meta name="description" content="Reparación y mantenimiento de equipos informáticos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-vh-100 d-flex flex-column bg-dark text-light">
        {/* Hero Section */}
        <section className="hero-section text-center py-5" style={{ backgroundColor: '#343a40' }}>
          <Container>
            <h1 className="display-3 mb-4">Bienvenidos a FORMOTEX</h1>
            <p className="lead mb-4">
              En FORMOTEX, ofrecemos soluciones rápidas y profesionales para la reparación y mantenimiento de equipos informáticos. Confía en nosotros para devolver a tus dispositivos su rendimiento óptimo.
            </p>
            <Row className="justify-content-center">
              <Col xs={12} md={6} lg={4} className="mb-3">
                <Link href="/pages/login" passHref>
                  <Button className="w-100" variant="outline-light" size="lg">
                    <FaSignInAlt className="me-2" /> Área de Empleados
                  </Button>
                </Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="mb-3">
                <Link href="/public" passHref>
                  <Button className="w-100" variant="outline-light" size="lg">
                    <FaUserCheck className="me-2" /> Consultar Estado del Equipo
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Information Section */}
        <section className="py-5" style={{ backgroundColor: '#495057' }}>
          <Container>
            <Row className="text-center">
              <Col md={4} className="mb-4">
                <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#6c757d', color: '#fff' }}>
                  <h5 className="fw-bold mb-3">Servicios Rápidos</h5>
                  <p>
                    Realizamos reparaciones y mantenimientos en el menor tiempo posible sin comprometer la calidad.
                  </p>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#adb5bd', color: '#333' }}>
                  <h5 className="fw-bold mb-3">Soporte Especializado</h5>
                  <p>
                    Nuestro equipo de expertos está altamente capacitado para resolver cualquier problema técnico que tengas.
                  </p>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#ced4da', color: '#333' }}>
                  <h5 className="fw-bold mb-3">Atención Personalizada</h5>
                  <p>
                    Ofrecemos un enfoque personalizado para cada cliente, asegurando que recibas la mejor atención posible.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Contact Section */}
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6}>
                <h2 className="display-4 mb-4">Contáctanos</h2>
                <p>
                  Si tienes alguna consulta o necesitas asistencia, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
                </p>
                <p><strong>Email:</strong> contacto@formotex.com</p>
                <p><strong>Teléfono:</strong> +123 456 7890</p>
              </Col>
              <Col md={6}>
                <div className="bg-secondary p-4 rounded shadow-sm">
                  <h5 className="fw-bold mb-3">Formulario de Contacto</h5>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nombre</label>
                      <input type="text" className="form-control" id="name" placeholder="Tu nombre" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Correo Electrónico</label>
                      <input type="email" className="form-control" id="email" placeholder="Tu correo electrónico" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Mensaje</label>
                      <textarea className="form-control" id="message" placeholder="Tu mensaje"></textarea>
                    </div>
                    <Button variant="primary" type="submit">Enviar</Button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}

