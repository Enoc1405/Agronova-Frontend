import React, { useEffect, useState } from 'react';
import { FaClock, FaSun, FaSeedling } from 'react-icons/fa';
import presentation2 from '../assets/images/presentation2.png'; // Importar imagen localmente
import { motion, AnimatePresence } from 'framer-motion';

function Features() {
  const [inView, setInView] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const items = [
    {
      id: '1',
      icon: <FaClock className="h-10 w-10" style={{ color: '#309B5B' }} />,
      title: 'Consultas en tiempo real',
      subtitle: 'Obtén respuestas inmediatas sobre tus cultivos.',
      description: 'Desde cómo plantar hasta la gestión de plagas y enfermedades.',
      moreInfo: (
        <>
          Siempre disponible, nuestro servicio te ayuda a resolver cualquier duda sobre tus cultivos en el momento.<br />
          Ya sea que necesites asesoría sobre técnicas de cultivo, identificación de plagas o recomendaciones para <br />
          mejorar el rendimiento, estamos aquí para brindarte apoyo inmediato. Con un acceso fácil y rápido a información <br />
          relevante, podrás tomar decisiones informadas que optimicen la salud y productividad de tus cultivos, sin importar<br />
          la hora del día. Tu éxito agrícola es nuestra prioridad.
        </>
      )
    },
    {
      id: '2',
      icon: <FaSun className="h-10 w-10" style={{ color: '#309B5B' }} />,
      title: 'Información sobre clima y suelo',
      subtitle: 'Accede a recomendaciones basadas en las condiciones locales.',
      description: 'Clima y la calidad del suelo.',
      moreInfo: (
        <>
          Datos actualizados y recomendaciones precisas para mejorar la calidad de tus cultivos. <br />
          Aprovecha nuestra tecnología avanzada para optimizar tus prácticas agrícolas, identificar <br /> y mitigar enfermedades, y maximizar el rendimiento de tus cosechas.
          Con información en tiempo real <br />y consejos personalizados, te ayudamos a tomar decisiones informadas que asegurarán la salud y productividad de tus cultivos.
        </>
      )
    },
    {
      id: '3',
      icon: <FaSeedling className="h-10 w-10" style={{ color: '#309B5B' }} />,
      title: 'Técnicas Modernas y Sostenibles',
      subtitle: 'Aprende sobre métodos agrícolas innovadores.',
      description: 'Optimiza tus recursos y mejora tus rendimientos de manera ecológica.',
      moreInfo: (
        <>
          Metodologías sostenibles que promueven la salud del medio ambiente.<br />
          Implementamos prácticas agrícolas responsables que no solo mejoran la calidad de tus cultivos, sino<br />
          que también preservan la biodiversidad y protegen nuestros recursos naturales. Desde la rotación<br />
          de cultivos y el uso eficiente del agua, hasta el control biológico de plagas y el manejo de suelos,<br />
          nuestras estrategias están diseñadas para fomentar un equilibrio ecológico. Al adoptar estas metodologías,<br />
          contribuirás a un futuro más verde y sostenible para las generaciones venideras.
        </>
      )
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Primera fila */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          {items.map(item => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FeatureItem
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              layoutId={selectedId}
              className="fixed inset-0 flex items-center justify-center bg-green-400 bg-opacity-50 z-10" // Cambiado a fondo transparente
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                className="bg-white rounded-lg p-6 shadow-lg" // Fondo blanco para el contenido del modal
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {items.find(item => item.id === selectedId) && (
                  <>
                    <motion.h5 className="text-lg font-semibold">
                      {items.find(item => item.id === selectedId).subtitle}
                    </motion.h5>
                    <motion.h2 className="text-xl font-bold">
                      {items.find(item => item.id === selectedId).title}
                    </motion.h2>
                    <motion.p className="text-gray-600 mt-2">
                      {items.find(item => item.id === selectedId).description}
                    </motion.p>
                    {/* Información adicional */}
                    <motion.p className="text-gray-500 mt-2 italic">
                      {items.find(item => item.id === selectedId).moreInfo}
                    </motion.p>
                    <motion.button
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                      onClick={() => setSelectedId(null)}
                    >
                      Cerrar
                    </motion.button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
