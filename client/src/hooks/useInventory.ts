import { useState, useEffect } from "react";

interface ErrorType {
  status: number;
  message: string;
}

export const useFetchInventory = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:4000/api/devices", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDevices(data.data);
      } catch (err) {
        setError({
          status: (err as any).response?.status || 500,
          message: "Error al obtener los dispositivos",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return { devices, loading, error };
};

