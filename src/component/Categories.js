// Categories.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import Runner_Bean from '../assets/images/Plantas/frijol.jpg';
import Lentil from '../assets/images/Plantas/lenteja.jpg'
import Chickpea from '../assets/images/Plantas/garbanzo.jpg'
import { motion } from 'framer-motion';
import { image } from 'framer-motion/client';

function Categories() {
  const [inView, setInView] = useState(false);

  const handleScroll = () => {
    const categoriesSection = document.getElementById('categories');
    const rect = categoriesSection.getBoundingClientRect();
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
    <>
      <section className="h-64 flex items-center justify-center bg-green-100">
        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold text-green-700 mb-4"
            initial={{ opacity: 0, y: -50 }} // Empieza opaco y un poco desplazado hacia arriba
            animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }} // Aparece y hace un pequeño pulso
            transition={{
              duration: 1.5, // Duración de la aparición
              ease: "easeInOut", // Transición suave
              repeat: Infinity, // Repite la animación de pulso
              repeatType: "mirror", // Hace que el pulso sea suave en ambas direcciones
              delay: 0.2, // Añade un pequeño retraso
            }}
          >
            Consulta sobre tus cultivos
          </motion.h1>
          <motion.p
            className="text-lg text-green-600"
            initial={{ opacity: 0, y: 50 }} // Comienza opaco y desplazado hacia abajo
            animate={{ opacity: 1, y: 0 }} // Aparece suavemente
            transition={{
              duration: 1.5, // Duración de la transición
              ease: "easeInOut", // Transición suave
              delay: 0.5, // Retraso para que aparezca después del título
            }}
          >
            Selecciona el tipo de cultivo que te interesa y encuentra toda la
            <br /> información que necesitas para maximizar su rendimiento.
          </motion.p>
        </div>
      </section>

      <section id="categories" className="py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <CategoryGroup
            title="Granos y Cereales"
            description="Descubre los mejores granos y cereales para cultivar.
            Información detallada para maximizar tus cosechas."
            items={[
              { name: 'Maíz', apiName: 'corn', image: corn },
              { name: 'Trigo', apiName: 'wheat', image: wheat },
              { name: 'Arroz', apiName: 'rice', image: rice },
              { name: 'Cebada', apiName: 'barley', image: barley },
              { name: 'Frijol', apiName: 'Runner Bean', image: Runner_Bean },
              { name: 'Lenteja', apiName: 'Lentil', image: Lentil },
              { name: 'Garbanzo', apiName: 'Chickpea', image: Chickpea },
            ]}
            inView={inView}
          />

          <CategoryGroup
            title="Plantas Medicinales"
            description="Las plantas medicinales más utilizadas.
            Descubre sus beneficios y cómo cultivarlas."
            items={[
              { name: 'Menta', apiName: 'mint', image: mint },
              { name: 'Manzanilla', apiName: 'german-chamomile', image: chamomile },
              { name: 'Camellia sinensis', apiName: 'tea', image: camellia },
            ]}
            inView={inView}
          />

          <CategoryGroup
            title="Frutas"
            description="Frutas frescas y exóticas para tu cosecha.
            Información sobre las mejores prácticas de cultivo."
            items={[
              { name: 'Mango', apiName: 'mango', image: mango },
              { name: 'Piña', apiName: 'pineapple', image: pineapple },
              { name: 'Banano', apiName: 'banana', image: banana },
              { name: 'Naranja', apiName: 'orange', image: orange },
            ]}
            inView={inView}
          />

          <CategoryGroup
            title="Raíces y Tubérculos"
            description="Las raíces y tubérculos más nutritivas.
            Cultiva productos ricos en nutrientes."
            items={[
              { name: 'Yuca', apiName: 'cassava', image: cassava },
              { name: 'Papa', apiName: 'potato', image: potato },
              { name: 'Jengibre', apiName: 'ginger', image: ginger },
            ]}
            inView={inView}
          />
        </div>
      </section>
    </>
  );
}

function CategoryGroup({ title, description, items, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-start mb-8"
    >
      <div className="md:w-1/3 mb-4 md:mb-0 md:mr-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-lg whitespace-pre-line">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:w-2/3">
        {items.map((item, index) => (
          <CategoryItem key={index} name={item.name} apiName={item.apiName} image={item.image} />
        ))}
      </div>
    </motion.div>
  );
}

function CategoryItem({ name, apiName, image }) {
  return (
    <Link to={`/planta/${apiName}`}>
      <motion.div
        className="text-center"
        whileHover={{ scale: 1.05, filter: 'brightness(90%)' }} // Efecto de hover
        transition={{ duration: 0.3 }} // Duración de la transición
      >
        <img
          src={image}
          alt={name}
          className="h-40 w-full object-cover" // Ajustar altura y mantener proporciones
        />
        <h3 className="mt-2 font-bold text-lg">{name}</h3>
      </motion.div>
    </Link>
  );

  
}
export default Categories;
