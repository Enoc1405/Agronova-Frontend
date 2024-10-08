// Categories.js
import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import corn from '../assets/images/Plantas/maiz.png';
import wheat from '../assets/images/Plantas/trigo.png';
import rice from '../assets/images/Plantas/arroz.png';
import oat from '../assets/images/Plantas/avena.png';
import mint from '../assets/images/Plantas/menta.png';
import chamomile from '../assets/images/Plantas/manzanilla.png';
import oregano from '../assets/images/Plantas/oregano.png';
import mango from '../assets/images/Plantas/mango.png';
import pineapple from '../assets/images/Plantas/piña.png';
import banana from '../assets/images/Plantas/banano.png';
import orange from '../assets/images/Plantas/naranja.png';
import cassava from '../assets/images/Plantas/yuca.png';
import potato from '../assets/images/Plantas/papa.png';
import ginger from '../assets/images/Plantas/jengibre.png';

function Categories() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto">
        <CategoryGroup title="Granos y Cereales" items={[
          { name: "Maíz", apiName: "corn", image: corn },
          { name: "Trigo", apiName: "wheat", image: wheat },
          { name: "Arroz", apiName: "rice", image: rice },
          { name: "Avena", apiName: "oats", image: oat }
        ]} />

        <CategoryGroup title="Plantas Medicinales" items={[
          { name: "Menta", apiName: "mint", image: mint },
          { name: "Manzanilla", apiName: "chamomile", image: chamomile },
          { name: "Orégano", apiName: "oregano", image: oregano }
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
    </section>
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
