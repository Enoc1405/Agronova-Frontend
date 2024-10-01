import React from 'react';
import { FaClock, FaSun, FaSeedling, FaChartBar, FaRobot, FaHandHoldingUsd, FaMobileAlt } from 'react-icons/fa';
import presentation2 from '../assets/images/presentation2.png'; // Importar imagen localmente

function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Primera fila */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <FeatureItem
            icon={<FaClock />}
            title="Consultas en tiempo real"
            description="Obtén respuestas inmediatas sobre tus cultivos, desde cómo plantar hasta la gestión de plagas y enfermedades."
          />
          <FeatureItem
            icon={<FaSun />}
            title="Información sobre clima y suelo"
            description="Accede a recomendaciones basadas en las condiciones locales de tu terreno, como el clima y la calidad del suelo."
          />
          <FeatureItem
            icon={<FaSeedling />}
            title="Técnicas Modernas y Sostenibles"
            description="Aprende sobre métodos agrícolas innovadores para optimizar tus recursos y mejorar tus rendimientos de manera ecológica."
          />
        </div>

        {/* Segunda fila con imagen y tarjetas verdes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Izquierda: Imagen */}
          <div className="w-full flex justify-center">
            <img
              src={presentation2} // Usar la imagen importada localmente
              alt="Agricultura"
              className="w-[300px] h-auto rounded-lg shadow-md" // Tamaño personalizado, ajusta a tu gusto
            />
          </div>

          {/* Derecha: Tarjetas Verdes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GreenFeatureItem
              title="Información Precisa y Actualizada"
              description="Recibe recomendaciones basadas en los datos más recientes sobre cultivos, clima y prácticas agrícolas modernas."
            />
            <GreenFeatureItem
              title="Asistencia Personalizada"
              description="Nuestro chatbot se adapta a tus consultas específicas, ofreciendo soluciones a medida según el tipo de planta, suelo y ubicación geográfica."
            />
            <GreenFeatureItem
              title="Ahorra Tiempo y Recursos"
              description="Con información inmediata y precisa, puedes tomar decisiones informadas en el momento adecuado, reduciendo costos y maximizando la eficiencia de tus recursos."
            />
            <GreenFeatureItem
              title="Disponible en Cualquier Momento"
              description="Accede a AgroAsistente en cualquier momento para recibir información actualizada del clima y de tus cultivos. ¡Nunca esperes!"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300">
      <div className="flex justify-center items-center mb-4 text-indigo-600">
        <div className="text-4xl">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function GreenFeatureItem({ title, description }) {
  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-md transition-shadow duration-300">
      <h3 className="text-lg font-bold text-green-700 mb-2">{title}</h3>
      <p className="text-green-800">{description}</p>
    </div>
  );
}

export default Features;
