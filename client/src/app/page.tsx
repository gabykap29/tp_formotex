import Link from 'next/link';
import Head from 'next/head';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>FORMOTEX - Reparación de Equipos Informáticos</title>
        <meta name="description" content="Reparación y mantenimiento de equipos informáticos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-light min-vh-100 d-flex align-items-center">
        <Container className="text-center">
          <div className="p-4 bg-white rounded shadow">
            <h1 className="display-4 mb-3">Bienvenidos a FORMOTEX</h1>
            <p className="lead mb-4">
              Nos especializamos en la reparación y mantenimiento de equipos informáticos. 
              Ofrecemos un servicio rápido y profesional para que tus dispositivos vuelvan 
              a funcionar en el menor tiempo posible.
            </p>

            <Row className="justify-content-center">
              <Col xs={12} md={6} lg={4} className="mb-3">
                <Link href="/pages/login" passHref>
                  <Button className="w-100" variant="primary" size="lg">
                    Eres empleado? Ingresa aquí
                  </Button>
                </Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="mb-3">
                <Link href="/register" passHref>
                  <Button className="w-100" variant="secondary" size="lg">
                    Eres cliente? Consulta el estado de tu equipo aquí
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </main>
    </>
  );
}
