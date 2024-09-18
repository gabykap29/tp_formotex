import { useState } from 'react';
import { useAuth } from '@/context/AuthContex';
import { useRouter } from 'next/navigation';

interface LoginData {
  emailOrUsername: string;
  password: string;
}

const useLogin = () => {
  const { login } = useAuth(); // Obtener la función login del contexto
  const router = useRouter(); // Usar router para la redirección
  const [loginData, setLoginData] = useState<LoginData>({ emailOrUsername: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();

      if (result.status === 200) {
        localStorage.setItem('token', result.token);
        login(); // Llamar a la función login del contexto
        router.push('/pages/home'); // Redirigir con router
      } else {
        setError(result.message || 'Error al iniciar sesión. Intente de nuevo!');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Intente más tarde!');
    }
  };

  return { loginData, error, handleChange, handleSubmit };
};

export default useLogin;

