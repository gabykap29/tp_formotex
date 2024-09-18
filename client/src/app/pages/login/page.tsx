"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import useLogin from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { loginData, error, handleChange, handleSubmit } = useLogin();
  const router = useRouter();

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailOrUsername" className="form-label">Correo Electrónico/Usuario</label>
            <input
              type="text"
              className="form-control"
              id="emailOrUsername"
              value={loginData.emailOrUsername}
              name='emailOrUsername'
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={loginData.password}
              name='password'
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

