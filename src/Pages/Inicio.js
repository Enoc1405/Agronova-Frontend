import React from "react";

function App() {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-700">Agrónova</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-600 hover:text-purple-700">Inicio</a></li>
            <li><a href="/" className="text-gray-600 hover:text-purple-700">Conócenos</a></li>
            <li><a href="/" className="text-gray-600 hover:text-purple-700">Beneficios</a></li>
            <li><a href="/" className="text-gray-600 hover:text-purple-700">Soporte</a></li>
          </ul>
        </nav>
        <div className="space-x-2">
          <button className="text-purple-700 border border-purple-700 py-1 px-4 rounded">Iniciar sesión</button>
          <button className="bg-purple-700 text-white py-1 px-4 rounded">Registrarse</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[url('https://example.com/path-to-your-hero-image.jpg')] bg-cover bg-center h-96 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold">Bienvenido a Agrónova</h1>
        <p className="text-lg mt-2">Conectamos a agricultores con expertos en cultivo</p>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md text-center">
            <h3 className="font-bold text-lg">Controla los Sensores</h3>
            <p className="mt-2 text-gray-600">Información en tiempo real desde tus cultivos.</p>
          </div>
          <div className="bg-white p-6 shadow-md text-center">
            <h3 className="font-bold text-lg">Actualizaciones Automáticas</h3>
            <p className="mt-2 text-gray-600">No te pierdas ninguna actualización importante.</p>
          </div>
          <div className="bg-white p-6 shadow-md text-center">
            <h3 className="font-bold text-lg">Riego Eficiente</h3>
            <p className="mt-2 text-gray-600">Optimiza el uso del agua en tus cultivos.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          {/* Granos y cereales */}
          <h2 className="text-2xl font-bold mb-4">Granos y Cereales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryItem name="Maíz" />
            <CategoryItem name="Trigo" />
            <CategoryItem name="Arroz" />
            <CategoryItem name="Avena" />
          </div>

          {/* Plantas medicinales */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Plantas Medicinales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryItem name="Menta" />
            <CategoryItem name="Manzanilla" />
            <CategoryItem name="Orégano" />
          </div>

          {/* Frutas */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Frutas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryItem name="Mango" />
            <CategoryItem name="Piña" />
            <CategoryItem name="Banana" />
            <CategoryItem name="Naranja" />
          </div>

          {/* Raíces y tubérculos */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Raíces y Tubérculos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryItem name="Yuca" />
            <CategoryItem name="Papa" />
            <CategoryItem name="Jengibre" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-purple-100 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Beneficios para Agricultores</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <BenefitItem title="Respuesta Rápida" />
            <BenefitItem title="Ahorro de Tiempo" />
            <BenefitItem title="Aumento de productividad" />
            <BenefitItem title="Mejora en la Toma de Decisiones" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto flex justify-between">
          <p>Gracias por su apoyo</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryItem({ name }) {
  return (
    <div className="bg-white p-4 shadow-md text-center">
      <img
        src={`https://example.com/path-to-${name.toLowerCase()}.jpg`}
        alt={name}
        className="h-24 w-full object-cover"
      />
      <h3 className="mt-2 font-bold">{name}</h3>
    </div>
  );
}

function BenefitItem({ title }) {
  return (
    <div className="bg-white p-6 shadow-md">
      <h3 className="font-bold">{title}</h3>
    </div>
  );
}

export default App;
