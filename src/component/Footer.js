import React from 'react';
import loguito from '../assets/images/LogoFooter.png'; s

function Footer() {
  return (
    <footer className="bg-gray-200 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
 
        <div className="flex items-center md:items-start mb-6 md:mb-0">
       
          <img src={loguito} alt="Logo Agrónova" className="h-20" />
        </div>

        {/* Links Section */}
        {/* Aumentar el espaciado entre las columnas usando space-x-16 */}
        <div className="flex flex-wrap justify-center space-x-20 mt-4 md:mt-0 text-gray-800">
          <FooterColumn 
            title="Compañía" 
            links={["Acerca de nosotros", "Nuestro compromiso", "Contacto"]} 
          />
          <FooterColumn 
            title="Ayuda" 
            links={["Preguntas frecuentes", "Soporte técnico", "Centro de asistencia"]} 
          />
          <FooterColumn 
            title="Recursos" 
            links={["Blog", "Actualizaciones agrícolas"]} 
          />
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-600 mt-14">&copy; {new Date().getFullYear()} Agrónova. Todos los derechos reservados.</p>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <h4 className="font-bold mb-4 text-black">{title}</h4>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="text-gray-600 hover:text-purple-700 mb-2">
            <a href="/">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
