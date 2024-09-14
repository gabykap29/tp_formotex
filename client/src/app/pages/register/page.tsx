"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Container, Button, Form } from "react-bootstrap";
import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>Registro - FORMOTEX</title>
      </Head>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="w-50 card shadow">
          <div className="m-4">
            <h1 className="mb-4">Crear Cuenta</h1>

            <Form>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Crear Cuenta
              </Button>
            </Form>
            <p className="mt-3">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-primary">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
