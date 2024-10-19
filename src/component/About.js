import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import backgroundImage from "../assets/images/fondo.jpg";
import fondo from "../assets/images/fondo2.jpg";
import fondo2 from "../assets/images/fondoinicio.jpg";
import fondo3 from "../assets/images/fondo3.jpg";
import fondo4 from "../assets/images/fondo4.jpg";
import fondo5 from "../assets/images/fondo5.jpg";
import Footer from "../component/Footer";
import { motion } from "framer-motion";

// Import team member images
import Ga from '../assets/images/yp .jpg';
import Mo from '../assets/images/Monica.jpg';
import Jo from '../assets/images/josh.jpg';
import Eno from '../assets/images/enocc.jpg';
import cri from '../assets/images/cris .jpg';

const AgricultureLandingPage = () => {
    const infoSectionRef = useRef(null);
    const contactFormRef = useRef(null); // Nueva referencia para el formulario de contacto
    const navigate = useNavigate();

    // Estado para controlar la visibilidad del formulario de contacto
    const [isContactFormVisible, setContactFormVisible] = useState(false);

    const scrollToInfoSection = () => {
        infoSectionRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const handleBackClick = () => {
        navigate('/'); // Navegar a la ruta de inicio
    };

    // Función para mostrar/ocultar el formulario de contacto
    // Función para mostrar el formulario de contacto y hacer scroll hacia él
    const toggleContactForm = () => {
        setContactFormVisible(true); // Muestra el formulario

        // Usar setTimeout para esperar a que el formulario se renderice antes de hacer scroll
        setTimeout(() => {
            if (contactFormRef.current) {
                contactFormRef.current.scrollIntoView({ behavior: "smooth" }); // Desplaza hacia el formulario
            }
        }, 0); // Puede usar un timeout de 0 para asegurar que se ejecute después de la actualización del estado
    };

    return (
        <div className="relative bg-gray-900 text-white min-h-screen">
            {/* Header Section */}
            <header
                className="flex flex-col items-center justify-center min-h-screen text-center relative" // Mantiene la posición relativa
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <button
                    className="absolute top-4 left-4 px-4 py-2 bg-white text-green-600 border border-green-600 rounded-full shadow hover:bg-green-600 hover:text-white transition duration-300" // Estilos para el botón más estético
                    onClick={handleBackClick} // Llama a la función de navegación al hacer clic
                >
                    Regresa
                </button>
                <div className="bg-black bg-opacity-50 p-10 rounded-lg">
                    <h1 className="text-5xl font-bold mb-4">Cultivando un futuro sostenible</h1>
                    <p className="text-xl mb-6">
                        Únase a nosotros para adoptar prácticas agrícolas innovadoras para un mañana más verde.
                    </p>
                    <button
                        className="px-6 py-3 bg-green-500 rounded hover:bg-green-400 transition duration-300"
                        onClick={scrollToInfoSection}
                    >
                        Leer Más
                    </button>
                </div>
            </header>

            {/* Information Section */}
            <InformationSection ref={infoSectionRef} />

            {/* More Info Section */}
            <MoreInfoSection />

            {/* New Feature Section */}
            <FeatureSection handleBackClick={handleBackClick} />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Team Section */}
            <TeamSection />

            {/* Contact Section */}
            <footer className="py-20 bg-gray-800 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Contáctanos</h2>
                <p className="mb-6 text-gray-400">
                    ¡Nos encantaría saber de ti! Contáctanos para cualquier consulta.
                </p>
                <button
                    className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-400 transition duration-300"
                    onClick={toggleContactForm} // Llama a la función al hacer clic
                >
                    Contáctanos
                </button>

                {/* Formulario de contacto */}
                {isContactFormVisible && (
                    <div ref={contactFormRef} className="mt-6 mx-auto max-w-md p-6 bg-gray-700 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-4">Formulario de Contacto</h3>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-1" htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border border-gray-600 bg-gray-800 rounded focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Ingrese su nombre"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border border-gray-600 bg-gray-800 rounded focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Ingrese su correo electrónico"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-1" htmlFor="message">Mensaje</label>
                                <textarea
                                    id="message"
                                    className="w-full px-4 py-2 border border-gray-600 bg-gray-800 rounded focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Escriba su mensaje"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-400 transition duration-300"
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
                )}
            </footer>

        </div>
    );
};

// Information Section with Animations
const InformationSection = React.forwardRef((props, ref) => {
    const items = [
        {
            title: "Sostenibilidad",
            description:
                "Fomentamos tecnología agrícola accesible que mejora la productividad y apoya a los productores, optimizando costos y promoviendo prácticas sostenibles.",
        },
        {
            title: "Innovación",
            description:
                "Impulsamos la innovación agrícola con tecnología avanzada que ofrece soluciones efectivas y acceso a información precisa.",
        },
        {
            title: "Apoyo comunitario",
            description:
                "Nuestras iniciativas están diseñadas para empoderar a los agricultores locales, brindándoles las herramientas necesarias para mejorar sus prácticas agrícolas.",
        },
    ];

    return (
        <section ref={ref} className="py-20 px-6">
            <h2 className="text-4xl font-bold text-center mb-10">¿Por qué elegirnos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-800 p-6 rounded-lg text-center shadow-lg transition-transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                        <p>{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
});

// More Information Section
const MoreInfoSection = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 opacity-70"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                <h2 className="text-5xl font-bold mb-6">Más Información</h2>
                <p className="text-lg leading-relaxed mb-6">
                    Nuestra organización se dedica a fomentar la sostenibilidad y la innovación en la agricultura.
                </p>
                <div className="flex justify-center">
                    <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300">
                        Aprende Más
                    </button>
                </div>
            </div>
        </section>
    );
};

// New Feature Section with 4 images
const FeatureSection = ({ handleBackClick }) => {
    return (
        <section className="py-20 px-6 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-4xl font-bold mb-4">Nuestro Compromiso</h2>
                <p className="text-xl leading-relaxed">
                    Estamos comprometidos con el desarrollo sostenible, garantizando que nuestras prácticas agrícolas no solo sean productivas, sino también respetuosas con el medio ambiente.
                </p>
                <div className="mt-6">
                    <button className="px-6 py-3 bg-green-500 rounded hover:bg-green-400 transition duration-300"
                        onClick={handleBackClick}>
                        Iniciar
                    </button>
                </div>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                <img src={fondo} alt="Sostenibilidad" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                <img src={fondo5} alt="Sostenibilidad" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                <img src={fondo3} alt="Sostenibilidad" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                <img src={fondo4} alt="Sostenibilidad" className="w-full h-64 object-cover rounded-lg shadow-lg" />
            </div>
        </section>
    );
};

// Testimonials Section with Animations
const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Carlos Ramírez",
            location: "Veracruz, México",
            text: "Desde que comencé a usar esta plataforma, mis cultivos han mejorado significativamente. Ahora puedo acceder a información que antes era inaccesible para mí, lo que me ha ayudado a optimizar mis procesos agrícolas.",
            image: "https://i.pravatar.cc/300?img=8", // Placeholder para la imagen del testimonio
        },
        {
            name: "Ana María López",
            location: "Antioquia, Colombia",
            text: "El apoyo que recibimos de esta comunidad ha sido invaluable. Gracias a las tecnologías sostenibles que nos enseñaron, hemos logrado reducir costos y aumentar la productividad de nuestras tierras.",
            image: "https://i.pravatar.cc/300?img=2", // Placeholder para la imagen del testimonio
        },
        {
            name: "Juan Pérez",
            location: "Córdoba, Argentina",
            text: "Gracias a esta plataforma, he podido conectarme con expertos que me han ayudado a implementar prácticas más eficientes en mi producción agrícola. ¡Altamente recomendada!",
            image: "https://i.pravatar.cc/300?img=3", // Placeholder para la imagen del testimonio
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-green-600 to-green-900 text-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Testimonios de Agricultores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 p-8 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 object-cover rounded-full border-4 border-green-500"
                                />
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                    <p className="text-green-300">{testimonial.location}</p>
                                </div>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-300">{testimonial.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Team Section
const TeamSection = () => {
    const teamMembers = [
        {
            name: "Gabriel Torres",
            position: "Desarrollador Frontend",
            image: Ga,
        },
        {
            name: "Cristhofer González",
            position: "Desarrollador Backend",
            image: cri,
        },
        {
            name: "Mónica Guitiérrez",
            position: "Diseñadora",
            image: Mo,
        },
        {
            name: "Joshua Matus",
            position: "Marketing",
            image: Jo,
        },
        {
            name: "Enoc López",
            position: "Desarrollador Backend",
            image: Eno,
        },
    ];

    return (
        <section className="py-20 bg-gray-900 mt-10">
            <h2 className="text-4xl font-bold text-center text-white mb-20">Equipo Agronova</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-6">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-800 p-6 rounded-lg text-center shadow-lg transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-gray-400">{member.position}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AgricultureLandingPage;
