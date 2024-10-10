// Categories.js
import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import corn from '../assets/images/Plantas/maiz.png';
import wheat from '../assets/images/Plantas/trigo.png';
import rice from '../assets/images/Plantas/arroz.png';
import barley from '../assets/images/Plantas/cebada.jpg';
import mint from '../assets/images/Plantas/menta.png';
import chamomile from '../assets/images/Plantas/manzanilla.png';
import camellia from '../assets/images/Plantas/camellia.jpeg';
import mango from '../assets/images/Plantas/mango.png';
import pineapple from '../assets/images/Plantas/piña.png';
import banana from '../assets/images/Plantas/banano.png';
import orange from '../assets/images/Plantas/naranja.png';
import cassava from '../assets/images/Plantas/yuca.png';
import potato from '../assets/images/Plantas/papa.png';
import ginger from '../assets/images/Plantas/jengibre.png';
import { image } from 'framer-motion/client';

function Categories() {
  return (
    <><section className="h-64 flex items-center justify-center bg-green-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Consulta sobre tus cultivos</h1>
        <p className="text-lg text-green-600">Selecciona el tipo de cultivo que te interesa y encuentra toda la<br/> informacion que necesitas,
          para maximizar su rendimiento.
        </p>
      </div>
    </section><section className="py-12">

        <div className="max-w-6xl mx-auto">
          <CategoryGroup title="Granos y Cereales" items={[
            { name: "Maíz", apiName: "corn", image: corn },
            { name: "Trigo", apiName: "wheat", image: wheat },
            { name: "Arroz", apiName: "rice", image: rice },
            { name: "Cebada", apiName: "barley", image: barley }
          ]} />

          <CategoryGroup title="Plantas Medicinales" items={[
            { name: "Menta", apiName: "mint", image: mint },
            { name: "Manzanilla", apiName: "german-chamomile", image: chamomile },
            { name: "Camellia sinensis", apiName: "tea", image: camellia }
          ]} />

          <CategoryGroup title="Frutas" items={[
            { name: "Mango", apiName: "mango", image: mango },
            { name: "Piña", apiName: "pineapple", image: pineapple },
            { name: "Banano", apiName: "banana", image: banana },
            { name: "Naranja", apiName: "orange", image: orange }
          ]} />

          <CategoryGroup title="Raíces y Tubérculos" items={[
            { name: "Yuca", apiName: "cassava", image: cassava },
            { name: "Papa", apiName: "potato", image: potato },
            { name: "Jengibre", apiName: "ginger", image: ginger }
          ]} />
        </div>
      </section></>
  );
}

function CategoryGroup({ title, items }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <CategoryItem key={index} name={item.name} apiName={item.apiName} image={item.image} />
        ))}
      </div>
    </>
  );
}

function CategoryItem({ name, apiName, image }) {
  return (
    <Link to={`/planta/${apiName}`}> {/* Usa apiName para la ruta */}
      <div className="bg-white p-4 shadow-md text-center transition-transform transform hover:scale-105">
        <img
          src={image}
          alt={name}
          className="h-38 w-full object-cover"
        />
        <h3 className="mt-2 font-bold">{name}</h3> {/* Mostrar nombre en español */}
      </div>
    </Link>
  );
}

export default Categories;
