import { useState, useEffect } from "react";

interface FetchDeviceData {
  deviceType: string;
  brand: string;
  deviceModel: string;
  serialNumber: string;
  os: string;
  clientId: string;
}

interface IfetchError {
  status: number;
  message: string;
}

const useFetchDevice = (initialClientId: string) => {
  const [fetchDeviceData, setFetchDeviceData] = useState<FetchDeviceData>({
    deviceType: '',
    brand: '',
    deviceModel: '',
    serialNumber: '',
    os: '',
    clientId: initialClientId, // Inicializa con clientId pasado
  });

  const [error, setError] = useState<IfetchError>({ status: 0, message: "" });

  // Asegúrate de que fetchDeviceData.clientId se actualice si initialClientId cambia
  useEffect(() => {
    setFetchDeviceData(prevData => ({
      ...prevData,
      clientId: initialClientId
    }));
  }, [initialClientId]);

  const handleChangeDevice = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFetchDeviceData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(fetchDeviceData);
    try {
      const res = await fetch('http://localhost:4000/api/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fetchDeviceData),
      });
      if (res.ok) {
        setError({ status: res.status, message: 'Dispositivo registrado correctamente' });
      } else {
        const data = await res.json();
        setError({ status: res.status, message: data.message });
      }
    } catch (error) {
      setError({ status: 500, message: 'Ocurrió un error al registrar el dispositivo' });
    }
  };

  return {
    fetchDeviceData,
    handleChangeDevice,
    handleSubmitDevice,
    errorDevice: error,
  };
};

export default useFetchDevice;
