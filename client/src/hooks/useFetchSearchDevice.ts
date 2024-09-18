import { useState } from "react";

export const useFetchInventory = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = async (identityNumber: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/repairs/${identityNumber}`);
      if (!response.ok) {
        throw new Error("Error fetching repairs");
      }
      const { data } = await response.json();
      setDevices(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { devices, loading, error, fetchInventory };  // Asegúrate de que `fetchInventory` se retorne aquí
};

