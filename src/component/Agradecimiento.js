import React from 'react'; // Asegúrate de ajustar la ruta del logo
import fondo from '../assets/images/fondo.jpg'; // Ajusta la ruta de la imagen de fondo

const Agradecimiento = () => {
    return (

        <section className="relative bg-gray-100 mt-15 mb-20">
            {/* Imagen de fondo */}
            <div className="relative">
                <img
                    src={fondo} // Reemplaza esto con la ruta a tu imagen
                    alt="Agricultura"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center px-4">
                    <h1 className="text-4xl font-bold mb-4">Un asistente agrícola en tus manos</h1>
                    <p className="text-lg mb-6">
                        Empieza a mejorar tu cosecha ahora. Haz tu primera pregunta u obtén consejos personalizados para tu terreno y cultivos.
                    </p>
                    <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                        Registrarse
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Agradecimiento;
