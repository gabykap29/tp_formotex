import { useEffect, useState } from "react";

export const useFetchUsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({ status: false, message: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users"); // Ajusta la URL según tu backend
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError({
          status: true,
          message: err.message || "Error al obtener los usuarios",
        });
      }
    };

    fetchUsers();
  }, []);

  return { users, error };
};

