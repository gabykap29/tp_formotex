import { useEffect, useState } from "react";

export const useFetchClientsList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState({ status: false, message: "" });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/clients");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { data } = await response.json();
        setClients(data);
      } catch (err) {
        setError({
          status: true,
          message: err.message || "Error al obtener los clientes",
        });
      }
    };

    fetchClients();
  }, []);

  return { clients, error };
};

