import React from 'react';
import maiz from '../assets/images/Plantas/maiz.png';
import trigo from '../assets/images/Plantas/trigo.png';
import arroz from '../assets/images/Plantas/arroz.png';
import avena from '../assets/images/Plantas/avena.png';
import menta from '../assets/images/Plantas/menta.png';
import manzanilla from '../assets/images/Plantas/manzanilla.png';
import oregano from '../assets/images/Plantas/oregano.png';
import mango from '../assets/images/Plantas/mango.png';
import pina from '../assets/images/Plantas/piña.png';
import banana from '../assets/images/Plantas/banano.png';
import naranja from '../assets/images/Plantas/naranja.png';
import yuca from '../assets/images/Plantas/yuca.png';
import papa from '../assets/images/Plantas/papa.png';
import jengibre from '../assets/images/Plantas/jengibre.png';

function Categories() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto">
        <CategoryGroup title="Granos y Cereales" items={[
          { name: "Maíz", image: maiz },
          { name: "Trigo", image: trigo },
          { name: "Arroz", image: arroz },
          { name: "Avena", image: avena }
        ]} />

        <CategoryGroup title="Plantas Medicinales" items={[
          { name: "Menta", image: menta },
          { name: "Manzanilla", image: manzanilla },
          { name: "Orégano", image: oregano }
        ]} />

        <CategoryGroup title="Frutas" items={[
          { name: "Mango", image: mango },
          { name: "Piña", image: pina },
          { name: "Banana", image: banana },
          { name: "Naranja", image: naranja }
        ]} />

        <CategoryGroup title="Raíces y Tubérculos" items={[
          { name: "Yuca", image: yuca },
          { name: "Papa", image: papa },
          { name: "Jengibre", image: jengibre }
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
          <CategoryItem key={index} name={item.name} image={item.image} />
        ))}
      </div>
    </>
  );
}

function CategoryItem({ name, image }) {
  return (
    <div className="bg-white p-4 shadow-md text-center transition-transform transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="h-38 w-full object-cover" 
      />
      <h3 className="mt-2 font-bold">{name}</h3>
    </div>
  );
}

export default Categories;
