import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonio = () => {
  const testimonios = [
    {
      id: 1,
      nombre: 'Roberto Juárez',
      tiempo: 'Hace 1 semana',
      texto: 'Gracias al chatbot, pude identificar una plaga en mis cultivos y tomar acción inmediata. ¡Es como tener a un experto en el bolsillo!',
      estrellas: 5,
    },
    {
      id: 2,
      nombre: 'José Calderón',
      tiempo: 'Hace 2 días',
      texto: 'Me dio recomendaciones precisas para el riego de mis cultivos en una temporada seca, ¡lo que salvó mi cosecha!',
      estrellas: 5,
    },
    {
      id: 3,
      nombre: 'Pedro Álvarez',
      tiempo: 'Hace 1 día',
      texto: 'El chatbot me ayudó a entender mejor las necesidades de mis cultivos y ajustar mi estrategia de fertilización. Ahora mis cosechas son mucho más productivas.',
      estrellas: 5,
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      tiempo: 'Hace 3 días',
      texto: 'La herramienta me ha permitido monitorear mis cultivos de manera efectiva, logrando optimizar mi riego y fertilización.',
      estrellas: 5,
    },
    {
      id: 5,
      nombre: 'Luis Pérez',
      tiempo: 'Hace 1 semana',
      texto: 'Las alertas en tiempo real me permitieron tomar decisiones rápidas ante cambios climáticos repentinos.',
      estrellas: 4,
    },
    {
      id: 6,
      nombre: 'Carla Gómez',
      tiempo: 'Hace 5 días',
      texto: 'El análisis de datos de mis cosechas mejoró notablemente gracias a esta tecnología. ¡Totalmente recomendado!',
      estrellas: 5,
    },
  ];

  const [selectedId, setSelectedId] = useState(null);
  const [visibleIds, setVisibleIds] = useState([]); // Guardar los IDs visibles
  const ref = useRef(null);

  // Variantes para la animación de entrada de las tarjetas
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleScroll = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const newVisibleIds = testimonios.map((testimonio) => {
        const card = document.getElementById(`testimonio-${testimonio.id}`);
        if (card) {
          const cardRect = card.getBoundingClientRect();
          return cardRect.top < window.innerHeight && cardRect.bottom > 0
            ? testimonio.id
            : null;
        }
        return null;
      }).filter(Boolean); // Filtrar IDs nulos

      setVisibleIds(newVisibleIds);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="text-center py-12 bg-white">
      <motion.h2
        className="text-3xl font-bold mb-4 text-green-500"
        ref={ref}
        initial="hidden"
        animate={visibleIds.length > 0 ? "visible" : "hidden"}
        variants={headerVariants}
        transition={{ duration: 0.5 }} // Duración de la animación
      >
        Lo que dicen nuestros usuarios
      </motion.h2>
      <motion.p
        className="text-gray-600 mb-12 text-green-800"
        initial="hidden"
        animate={visibleIds.length > 0 ? "visible" : "hidden"}
        variants={headerVariants}
        transition={{ duration: 0.5 }} // Duración de la animación
      >
        Descubre cómo nuestro chatbot ha ayudado a agricultores a mejorar su rendimiento y resolver problemas en el campo.
      </motion.p>

      <div className="max-w-screen-lg mx-auto px-4 grid md:grid-cols-3 gap-y-8 gap-x-8">
        <AnimatePresence>
          {testimonios.map((testimonio) => (
            <motion.div
              key={testimonio.id}
              id={`testimonio-${testimonio.id}`}
              className="bg-gradient-to-b bg-purple-400 rounded-lg shadow-lg p-6 w-full cursor-pointer"
              initial="hidden"
              animate={visibleIds.includes(testimonio.id) ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ duration: 0.5 }} // Duración de la animación
              onClick={() => setSelectedId(testimonio.id)}
            >
              <h3 className="text-xl font-bold text-white">{testimonio.nombre}</h3>
              <p className="text-sm text-white mb-4">{testimonio.tiempo}</p>
              <p>{testimonio.texto}</p>
              <div className="flex justify-start mt-4">
                {Array.from({ length: testimonio.estrellas }).map((_, idx) => (
                  <svg
                    key={idx}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-yellow-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.711 5.287a1 1 0 00.95.69h5.536c.969 0 1.372 1.24.588 1.81l-4.482 3.255a1 1 0 00-.364 1.118l1.71 5.287c.3.921-.755 1.688-1.539 1.118l-4.482-3.256a1 1 0 00-1.175 0l-4.482 3.256c-.784.57-1.838-.197-1.539-1.118l1.71-5.287a1 1 0 00-.364-1.118L2.265 10.714c-.784-.57-.381-1.81.588-1.81h5.536a1 1 0 00.95-.69l1.71-5.287z"
                    />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedId(null)}
          >
            <motion.div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4">
                {testimonios.find((item) => item.id === selectedId)?.nombre || ""}
              </h3>
              <p className="text-gray-700 mb-4">
                {testimonios.find((item) => item.id === selectedId)?.texto || ""}
              </p>
              <motion.button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={() => setSelectedId(null)}
              >
                Cerrar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonio;
