import { useState } from "react";

interface FetchClientData {
  names: string;
  lastname: string;
  identityCardNumber: string;
  birthDate: string;
  address: {
    street: string;
    number: number;
    neighborhood: string;
  };
}

const useFetchClient = () => {
  const [fetchClientData, setFetchClientData] = useState<FetchClientData>({
    names: '',
    lastname: '',
    identityCardNumber: '',
    birthDate: '',
    address: {
      street: '',
      number: 0,
      neighborhood: '',
    },
  });
  
  interface IfetchError {
    status: number;
    message: string;
  }

  const [error, setError] = useState<IfetchError>({status: 0, message: ""});
  const [clientId, setClientId] = useState<string | null>(null); // Nuevo estado para almacenar el id del cliente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressKey = name.split(".")[1];
      setFetchClientData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressKey]: value
        }
      }));
    } else {
      setFetchClientData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fetchClientData),
      });

      const data = await res.json();
      if (data.status !== 201 && data.status !== 200) {
        setError({status: data.status, message: data.message});
        setClientId(null); // Si hay error, no hay id
      } else {
        setError({status: data.status, message: data.message});
        setClientId(data.data._id); // Asumiendo que el id se encuentra en `data.id`
      }

      return data;
    } catch (error) {
      console.error(error);
      setError({status: 500, message: 'Ocurrió un error al intentar crear el cliente'});
      setClientId(null); // Si ocurre un error, no hay id
    }
  };

  return {
    fetchClientData,
    handleChange,
    handleSubmit,
    error,
    clientId, // Exponer el id del cliente
  };
};

export default useFetchClient;
