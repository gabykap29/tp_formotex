"use client";
import { useState, useEffect } from "react";

interface IfetchError {
  status: number;
  message: string;
}

const useFetchRepairs = (clientId: string, deviceId: string) => {
  const [error, setError] = useState<IfetchError>({ status: 0, message: "" });

  // Token puede ser obtenido desde el localStorage u otro método

  const handleSubmitRepairs = async (e: React.FormEvent) => {
    e.preventDefault();

    const repairData = {
      clientId,
      deviceId,
    };
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:4000/api/repairs", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
          // Enviando el token en el header
        },
        body: JSON.stringify(repairData),
      });

      if (res.ok) {
        setError({
          status: res.status,
          message: "Reparación registrada exitosamente",
        });
      } else {
        const error = await res.json();
        setError({
          status: res.status,
          message: error.message,
        });
      }
    } catch (error) {
      setError({
        status: 500,
        message: "Error en el servidor",
      });
    }
  };

  return {
    errorRepair: error,
    handleSubmitRepairs,
  };
};

interface IfetchError {
  status: number;
  message: string;
}

export const useFetchRepairsList = () => {
  const [repairs, setRepairs] = useState<[]>([]);
  const [error, setError] = useState<IfetchError>({ status: 0, message: "" });
  const [token, setToken] = useState<string>("");
  // Token puede ser obtenido desde el localStorage u otro método
  useEffect((): void => {
    const storageToken = localStorage.getItem("token") || "";
    setToken(storageToken);
  }, []);

  const fetchRepairs = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/repairs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setRepairs(data.data);
      } else {
        setError({
          status: data.status,
          message: data.message,
        });
      }
    } catch (error) {
      setError({
        status: 500,
        message: "Error en el servidor",
      });
    }
  };

  // Ejecuta fetchRepairs cuando el hook se monta
  useEffect(() => {
    fetchRepairs();
  }, []);

  return {
    repairs,
    error,
  };
};

export default useFetchRepairs;
