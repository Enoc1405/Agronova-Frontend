import React, { useState, useEffect } from 'react';

const FormularioGuia = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombreCultivo: '',
    tipoCultivo: '',
    fechaSiembra: '',
    cuidadosEspeciales: '',
    notas: '',
  });

  // Estado para las etapas del cultivo
  const [etapas, setEtapas] = useState({
    preparacion: '',
    siembra: '',
    juvenil: '',
    adulto: '',
    floracion: '',
  });

  // Estado para la sección activa del formulario
  const [activeSection, setActiveSection] = useState('informacion');
  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Estado para mostrar la confirmación de guardado
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el cambio en los campos de las etapas
  const handleEtapaChange = (e) => {
    const { name, value } = e.target;
    setEtapas((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular envío de datos
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Datos del cultivo:', formData);
    console.log('Etapas del cultivo:', etapas);
    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  // Maneja el temporizador para ocultar el mensaje de confirmación
  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => setShowConfirmation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  // Renderiza la sección activa del formulario
  const renderSection = () => {
    switch (activeSection) {
      case 'informacion':
        return (
          <div className="space-y-6 transition-all duration-500 ease-in-out transform">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Información General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-400" htmlFor="nombreCultivo">Nombre del Cultivo</label>
                <input
                  type="text"
                  name="nombreCultivo"
                  id="nombreCultivo"
                  value={formData.nombreCultivo}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-200 focus:border-gray-500 transition duration-300 bg-white"
                  placeholder="Ej. Tomate"
                />
              </div>
              <div className="group">
                <label className="block text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-400" htmlFor="tipoCultivo">Tipo de Cultivo</label>
                <input
                  type="text"
                  name="tipoCultivo"
                  id="tipoCultivo"
                  value={formData.tipoCultivo}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-200 focus:border-gray-500 transition duration-300 bg-white"
                  placeholder="Ej. Hortaliza"
                />
              </div>
              <div className="group">
                <label className="block text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-400" htmlFor="fechaSiembra">Fecha de Siembra</label>
                <input
                  type="date"
                  name="fechaSiembra"
                  id="fechaSiembra"
                  value={formData.fechaSiembra}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-200 focus:border-gray-500 transition duration-300 bg-white"
                />
              </div>
              <div className="group">
                <label className="block text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-400" htmlFor="cuidadosEspeciales">Cuidados Especiales</label>
                <textarea
                  name="cuidadosEspeciales"
                  id="cuidadosEspeciales"
                  value={formData.cuidadosEspeciales}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-200 focus:border-gray-500 transition duration-300 bg-white"
                  placeholder="Ej. Riego cada 2 días"
                  rows={3}
                />
              </div>
            </div>
            <div className="group">
              <label className="block text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-400" htmlFor="notas">Notas Adicionales</label>
              <textarea
                name="notas"
                id="notas"
                value={formData.notas}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-200 focus:border-gray-500 transition duration-300 bg-white"
                placeholder="Cualquier información adicional"
                rows={4}
              />
            </div>
          </div>
        );
      case 'etapas':
        return (
          <div className="space-y-6 transition-all duration-500 ease-in-out transform">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Etapas del Cultivo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(etapas).map(([etapa, valor], index) => (
                <div
                  key={etapa}
                  className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                >
                  <h4 className="text-2xl font-semibold text-gray-700 mb-4 capitalize group-hover:text-gray-500 transition-colors duration-300">{etapa}</h4>
                  <textarea
                    name={etapa}
                    value={valor}
                    onChange={handleEtapaChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-200 focus:border-gray-500 transition duration-300 bg-white"
                    placeholder={`Información sobre ${etapa}`}
                    rows={4}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-101">
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-70 flex items-center justify-center">
            <h2 className="text-5xl font-extrabold text-white text-center drop-shadow-lg">Guía de Cultivo de Tomates</h2>
          </div>
        </div>

        <div className="p-8">
          <p className="text-xl text-gray-700 mb-8 text-center font-semibold">
            Esta guía te ayudará a cultivar tomates en un balcón, con consejos prácticos y cuidados necesarios.
          </p>

          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setActiveSection('informacion')}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                activeSection === 'informacion'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Información General
            </button>
            <button
              onClick={() => setActiveSection('etapas')}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                activeSection === 'etapas'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Etapas del Cultivo
            </button>
          </div>

          {renderSection()}

          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-500'
              }`}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Guía'}
            </button>
          </div>

          {showConfirmation && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              Guía guardada con éxito!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioGuia;
