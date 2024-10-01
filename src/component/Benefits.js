import React from 'react';

function Benefits() {
  return (
    <section className="bg-purple-100 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Beneficios para Agricultores</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <BenefitItem title="Respuesta Rápida" />
          <BenefitItem title="Ahorro de Tiempo" />
          <BenefitItem title="Aumento de Productividad" />
          <BenefitItem title="Mejora en la Toma de Decisiones" />
        </div>
      </div>
    </section>
  );
}

function BenefitItem({ title }) {
  return (
    <div className="bg-white p-6 shadow-md animate-slide-in-left">
      <h3 className="font-bold">{title}</h3>
    </div>
  );
}

export default Benefits;
