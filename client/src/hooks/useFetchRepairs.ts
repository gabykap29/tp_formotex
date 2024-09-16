import { useState } from "react";

interface IfetchError {
  status: number;
  message: string;
}

const useFetchRepairs = (clientId: string, deviceId: string) => {
  const [error, setError] = useState<IfetchError>({ status: 0, message: "" });

  // Token puede ser obtenido desde el localStorage u otro método
  const token = localStorage.getItem("token") || "";

  const handleSubmitRepairs = async (e: React.FormEvent) => {
    e.preventDefault();

    const repairData = {
      clientId,
      deviceId,
    };

    try {
      const res = await fetch("http://localhost:4000/api/repairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviando el token en el header
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

export default useFetchRepairs;
