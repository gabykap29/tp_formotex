import { useState, useEffect } from 'react';

export const useFetchRepairById = (id: string) => {
  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/repairs/getByDevice/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener la reparación');
        const data = await response.json();
        setRepair(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRepair();
  }, [id]);

  return { repair, loading, error };
};

