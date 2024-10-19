import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Importar Axios para manejar solicitudes HTTP
import { AiOutlineArrowRight } from "react-icons/ai"; // Importar el ícono de flecha
import "../App.css";

const App = () => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // Inicializar la API de Gemini
    const genAI = new GoogleGenerativeAI("AIzaSyAxcHIYZaBolOa3MjBtpvES_EttV3RQEj4");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Función para manejar la entrada del usuario
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const goToChat = () => {
        navigate("/Chat");
      }

    // Función para generar una respuesta con experiencia en agronomía
    const generateResponse = async (input) => {
        try {
            const result = await model.generateContent(input);
            const response = await result.response;

            // Limpiar la respuesta eliminando * y #
            const cleanedResponse = response.text().replace(/\*/g, "").replace(/#/g, "");

            // Formatear la respuesta
            const formattedResponse = cleanedResponse
                .replace(/(\d+)\. /g, "<strong>$1.</strong> ")
                .replace(/(\n\n|\r\n|\r)/g, "<br /><br />")
                .replace(/\n/g, "<br />")
                .replace(/(Consejos adicionales:)/g, "<strong>$1</strong><ul>")
                .replace(/(Tipos de frijoles:)/g, "<strong>$1</strong><ul>")
                .replace(/- (.*?)(?=<br>|$)/g, "<li>$1</li>")
                .replace(/<\/ul>\s*<ul>/g, "")
                .replace(/<ul>(.*?)<\/ul>/g, (match, p1) => `<ul>${p1.trim()}</ul>`);

            return formattedResponse || "Lo siento, no pude generar una respuesta adecuada.";
        } catch (error) {
            console.error("Error generating response:", error);
            return "Lo siento, no pude entender tu pregunta. ¿Podrías reformularla?";
        }
    };

    const sendMessage = async () => {
        if (userInput.trim() === "") return;

        const userMessage = { type: "user", message: userInput };
        setChatHistory((prevHistory) => [...prevHistory, userMessage]);
        setUserInput("");

        // Mostrar mensaje de carga inmediatamente
        const loadingMessage = { type: "bot", message: "Cargando..." };
        setChatHistory((prevHistory) => [...prevHistory, loadingMessage]);

        try {
            const botMessage = await generateResponse(userMessage.message);

            // Reemplaza el mensaje de carga con la respuesta del bot
            setChatHistory((prevHistory) => [
                ...prevHistory.slice(0, -1), // Elimina el mensaje "Cargando..."
                { type: "bot", message: botMessage },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    useEffect(() => {
        const welcomeMessage =
            "¡Hola! Soy el Dr. Agro, tu experto agrónomo virtual. Estoy aquí para ayudarte con cualquier pregunta sobre cultivos, gestión de tierras, y enfermedades de plantas. ¿En qué puedo asistirte hoy?";
        setChatHistory([{ type: "bot", message: welcomeMessage }]);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className="flex h-screen overflow-hidden"> {/* Asegurando que no se salga del contenedor */}
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-900 text-white flex flex-col justify-between">
                <div className="pt-4">
                    <div className="px-4 py-2 text-lg font-semibold">Agronova</div>
                    <div className="px-4 py-2 text-gray-500">Nuevo Chat</div>

                    {/* Sidebar content with scroll */}
                    <div className="h-[calc(100vh-4rem)] overflow-y-auto p-4 text-gray-300">
                        <div className="mb-6">
                            <div className="text-gray-400 text-xs uppercase mb-2">Hoy</div>
                            <div className="space-y-2">
                                <div className="bg-gray-700 text-blue-400 p-2 rounded-md cursor-pointer font-semibold">
                                    Técnicas de siembra directa
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer">
                                    Monitoreo de suelos con sensores
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer">
                                    Prevención de plagas en cultivos de maíz
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer">
                                    Optimización del riego por goteo
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer">
                                    Uso de drones para análisis de cultivos
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer">
                                    Control biológico de plagas
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer">
                                    Fertilización orgánica para mejorar el suelo
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer">
                                    Técnicas de compostaje en cultivos
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer">
                                    Gestión sostenible del agua en la agricultura
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-gray-400 text-xs uppercase mb-2">Ayer</div>
                            <div className="space-y-2">
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer text-gray-500">
                                    Rotación de cultivos para evitar la erosión
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer text-gray-500">
                                    Conservación de suelos en terrenos inclinados
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer text-gray-500">
                                    Implementación de sistemas agroforestales
                                </div>
                                <div className="bg-gray-800 p-2 rounded-md cursor-pointer text-gray-500">
                                    Eficiencia en el uso de fertilizantes
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Main Chat Section */}
            <div className="w-3/4 bg-gray-800 text-white flex flex-col justify-between">
                <div className="flex-grow overflow-y-auto p-4" ref={chatContainerRef}>
                    <AnimatePresence>
                        {chatHistory.map((chat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"} mb-2`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-lg ${chat.type === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black"
                                        }`}
                                    style={{ maxWidth: "60%" }}
                                    dangerouslySetInnerHTML={{ __html: chat.message }}
                                ></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="flex items-center justify-center p-4">
                    <div className="relative w-3/4">
                        <input
                            type="text"
                            placeholder="Escribe tu mensaje..."
                            className="bg-gray-700 text-white p-4 w-full rounded-full outline-none placeholder-gray-400"
                            value={userInput}
                            onChange={handleUserInput}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                            onClick={sendMessage}
                            disabled={isLoading}
                        >
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
