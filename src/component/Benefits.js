import React from 'react';
import { motion } from 'framer-motion';
import Agrii from '../assets/images/agrii.jpg'; // Asegúrate de reemplazar esto con la ruta correcta de tu imagen

function Benefits() {
  return (
    <section className="bg-green-50 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Título y Descripción Central */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-200 text-green-900 rounded-full px-4 py-1 mb-2">
            Ayuda gratuita
          </div>
          <h2 className="text-4xl font-bold text-black">Beneficios para agricultores</h2>
          <p className="text-lg text-gray-700 mt-2">
            Conoce la manera en que Agronova puede aportar a tus cultivos
          </p>
        </div>

        {/* Contenedor principal con las tarjetas de beneficios y el texto a la derecha */}
        <div className="md:flex md:space-x-8">
          {/* Sección de Tarjetas de Beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            <BenefitItem title="Respuestas Rápidas" icon="⏱️" />
            <BenefitItem title="Ahorro de tiempo" icon="⏲️" />
            <BenefitItem title="Asesoría personalizada" icon="💬" />
            <BenefitItem title="Mejor toma de decisiones" icon="📊" />
          </div>

          {/* Sección de Texto a la Derecha con animación de aparición desde la derecha */}
          <motion.div
            className="max-w-md text-left bg-white p-6 rounded-lg shadow-lg mt-6 md:mt-0 md:flex-shrink-0"
            whileInView={{ opacity: [0, 1], x: [100, 0] }} // Animación de aparición desde la derecha
            initial={{ opacity: 0, x: 100 }} // Comienza invisible y fuera de pantalla a la derecha
            transition={{ duration: 0.8, ease: 'easeOut' }} // Controla la duración y la suavidad de la aparición
            viewport={{ once: false }} // Para permitir la animación cada vez que entra en vista
          >
            <h3 className="text-2xl font-bold text-black mb-4">
              Agronova puede ofrecer una variedad de oportunidades
            </h3>
            <p className="text-gray-700">
              Agronova te ofrece oportunidades para optimizar tus cultivos, brindando apoyo personalizado en cada etapa del proceso agrícola, desde el manejo del riego hasta el control de plagas. Nuestro equipo de expertos está disponible para asesorarte en la implementación de técnicas avanzadas que maximicen el rendimiento de tus cosechas y minimicen el uso de insumos. Con un enfoque en la eficiencia y sostenibilidad, te proporcionamos herramientas y recursos que te permiten tomar decisiones informadas, asegurando que tus cultivos prosperen en un entorno saludable y productivo. Juntos, transformamos cada desafío en una oportunidad para crecer.
            </p>
          </motion.div>
        </div>

          {/* Nuevo Apartado de Consultas */}
          <div className="mt-48 relative">
            {/* Imagen de fondo */}
            <motion.img
              src={Agrii}
              alt="Fondo de Consultas"
              className="w-full h-96 object-cover opacity-70 rounded-2xl" // Asegúrate de que la imagen ocupe todo el contenedor
              initial={{ x: '-100%', opacity: 0 }} // Inicializa la imagen desde la izquierda y con opacidad 0
              whileInView={{ x: 0, opacity: 0.7 }} // Animación al entrar en vista
              transition={{ duration: 1 }} // Aumenta la duración de la animación a 1 segundo
              viewport={{ once: false }} // La animación se repetirá al volver a entrar en vista
            />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center" // Centra el texto sobre la imagen
              initial={{ x: '-100%', opacity: 0 }} // Inicializa desde la izquierda y con opacidad 0
              whileInView={{ x: 0, opacity: 1 }} // Animación al entra  r en vista
              transition={{ duration: 1 }} // Aumenta la duración de la animación a 1 segundo
              viewport={{ once: false }} // La animación se repetirá al volver a entrar en vista
            >
              <h2 className="text-3xl font-bold text-center text-black">Haz todas las consultas que necesites</h2>
              <p className="text-lg text-black font-semibold mt-10"> {/* Añade aquí tu párrafo */}
                Consulta sobre cualquier tema agrícola y recibe información detallada <br />
                para cuidar y mejorar tus cultivos de forma eficiente y sostenible.
              </p>

              <div className="text-center mt-8">
                <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
                  ¡Empezamos ahora!
                </button>
              </div>
            </motion.div>
          </div>

          {/* Tarjetas de Consulta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-16">
            <ConsultationItem title="Cómo Preparar el Suelo para la Siembra" icon="🌱" />
            <ConsultationItem title="Control de Enfermedades y plagas en Plantas" icon="🦠" />
            <ConsultationItem title="Técnicas Modernas y eficaces de Agricultura" icon="🚜" />
          </div>
        </div>
      </section>
    );
  }

  function BenefitItem({ title, icon }) {
    return (
      <motion.div
        className="benefit-item bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-lg shadow-lg text-center"
        whileInView={{ opacity: [0, 1], y: [100, 0] }} // Animación de aparición
        initial={{ opacity: 0, y: 100 }} // Comienza invisible y fuera de pantalla
        transition={{ duration: 0.8, ease: 'easeOut' }} // Controla la duración y la suavidad de la aparición
        viewport={{ once: false }} // Para permitir la animación cada vez que entra en vista
        whileHover={{ scale: 1.1, rotate: 5 }} // Animación de hover
      >
        <div className="text-white text-6xl mb-4">{icon}</div>
        <h3 className="font-bold text-white text-xl">{title}</h3>
      </motion.div>
  );
}

function ConsultationItem({ title, icon }) {
  return (
    <motion.div
      className="bg-green-100 text-white p-6 rounded-lg shadow-lg text-center transition-transform duration-300 transform hover:scale-105"
      whileInView={{ opacity: [0, 1], y: [100, 0] }} // Animación de aparición
      initial={{ opacity: 0, y: 200 }} // Comienza invisible y fuera de pantalla
      transition={{ duration: 0.1, ease: 'easeOut' }} // Controla la duración y la suavidad de la aparición
      viewport={{ once: false }} // Para permitir la animación cada vez que entra en vista
    >
      <div className="text-4xl mb-2">{icon}</div> {/* Añade el ícono aquí */}
      <h4 className="text-lg font-bold mb-2 text-green-700">{title}</h4>
      <p className="text-sm text-green-800">Comencemos</p>
    </motion.div>
  );
}

export default Benefits;
