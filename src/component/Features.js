import React, { useEffect, useState } from 'react';
import { FaClock, FaSun, FaSeedling } from 'react-icons/fa';
import presentation2 from '../assets/images/presentation2.png'; // Importar imagen localmente
import { motion } from 'framer-motion';
import { title } from 'framer-motion/client';

function Features() {
  const [inView, setInView] = useState(false);

  const handleScroll = () => {
    const featuresSection = document.getElementById('features');
    const rect = featuresSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
    } else {
      setInView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Primera fila */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FeatureItem
              icon={<FaClock className="h-10 w-10" style={{ color: '#309B5B' }} />}
              title="Consultas en tiempo real"
              description="Obtén respuestas inmediatas sobre tus cultivos, desde cómo plantar hasta la gestión de plagas y enfermedades."
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FeatureItem
              icon={<FaSun className="h-10 w-10" style={{ color: '#309B5B' }} />}
              title="Información sobre clima y suelo"
              description="Accede a recomendaciones basadas en las condiciones locales de tu terreno, como el clima y la calidad del suelo."
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FeatureItem
              icon={<FaSeedling className="h-10 w-10" style={{ color: '#309B5B' }} />}
              title="Técnicas Modernas y Sostenibles"
              description="Aprende sobre métodos agrícolas innovadores para optimizar tus recursos y mejorar tus rendimientos de manera ecológica."
            />
          </motion.div>
        </div>


        {/* Segunda fila con imagen y tarjetas verdes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Izquierda: Imagen que aparece al hacer scroll */}
          <div className="w-full flex justify-center items-center">
            <motion.img
              src={presentation2}
              alt="Agricultura"
              className="w-[400px] h-auto rounded-lg"
              initial={{ opacity: 0, y: 200 }} // Comienza oculto y desplazado hacia abajo
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }} // Aparece solo si está en vista
              transition={{ duration: 0.5 }} // Transición suave
            />
          </div>

          {/* Derecha: Tarjetas Verdes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Información Precisa y Actualizada",
                description: "Recibe recomendaciones basadas en los datos más recientes sobre cultivos, clima y prácticas agrícolas modernas."
              },
              {
                title: "Asistencia Personalizada",
                description: "Nuestro chatbot se adapta a tus consultas específicas, ofreciendo soluciones a medida según el tipo de planta, suelo y ubicación geográfica."
              },
              {
                title: "Ahorra Tiempo y Recursos",
                description: "Con información inmediata y precisa, puedes tomar decisiones informadas en el momento adecuado, reduciendo costos y maximizando la eficiencia de tus recursos."
              },
              {
                title: "Disponible en Cualquier Momento",
                description: "Accede a AgroAsistente en cualquier momento para recibir información actualizada del clima y de tus cultivos. ¡Nunca esperes!"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -100 }} // Comienza oculto y hacia arriba
                animate={inView ? { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } } : { opacity: 0, y: -300 }} // Aparece solo si está en vista
                transition={{ duration: 0.20, delay: index * 0.10 }} // Aumenta la duración y delay para el efecto de aparición
                whileHover={{ scale: 1.05 }} // Efecto de aumentar el tamaño al pasar el mouse
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <GreenFeatureItem
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ))}
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
