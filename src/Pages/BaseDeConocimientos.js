import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CultivosExportados = () => {
    const [cultivos, setCultivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerCultivos = async () => {
            try {
                const response = await axios.get('cultivos-exportados'); // Cambia la URL a la de tu API
                setCultivos(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        obtenerCultivos();
    }, []);

    if (loading) {
        return <div>Cargando cultivos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Cultivos más exportados en Nicaragua</h1>
            <ul>
                {cultivos.map((cultivo, index) => (
                    <li key={index}>{cultivo.name}</li> // Ajusta 'name' según la estructura del JSON que recibes
                ))}
            </ul>
        </div>
    );
};

export default CultivosExportados;
