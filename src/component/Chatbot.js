import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Importar Axios para manejar solicitudes HTTP
import "../App.css";
import { BiExpand } from "react-icons/bi"; // Importar el ícono para expandir

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false); // Estado para controlar si el chat está expandido

  const navigate = useNavigate(); // Inicializar useNavigate

  // Inicializar la API de Gemini
  const genAI = new GoogleGenerativeAI("AIzaSyAxcHIYZaBolOa3MjBtpvES_EttV3RQEj4");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Función para manejar la entrada del usuario
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Función para generar una respuesta con experiencia en agronomía
  const generateResponse = async (input) => {
    try {
      const result = await model.generateContent(input);
      const response = await result.response;

      // Limpiar la respuesta eliminando * y #
      const cleanedResponse = response.text().replace(/\*/g, "").replace(/#/g, "");

      // Formatear la respuesta para incluir numeraciones y listas
      const formattedResponse = cleanedResponse
        .replace(/(\d+)\. /g, "<strong>$1.</strong> ") // Formato para números
        .replace(/(\n\n|\r\n|\r)/g, "<br />") // Reemplazar saltos de línea con <br />
        .replace(/(\n)(?=[^<]*<strong>)/g, "<br /><br />") // Añadir espacio entre secciones
        .replace(/\n/g, "<br />"); // Reemplazar saltos de línea con <br />

      // Convertir el texto que empieza con "Consejos" y "Recuerda" en listas
      return formattedResponse
        .replace(/(Consejos adicionales:)/, "<strong>$1</strong><ul>")
        .replace(/(Tipos de frijoles:)/, "<strong>$1</strong><ul>")
        .replace(/- (.*?)(?=<br>|$)/g, "<li>$1</li>")
        .replace(/<\/ul>\s*<ul>/g, ""); // Evitar listas anidadas
    } catch (error) {
      console.error("Error generating response:", error);
      return "Lo siento, no pude entender tu pregunta. ¿Podrías reformularla?";
    }
  };

  // Función para enviar el mensaje del usuario y guardar la conversación
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const userMessage = { type: "user", message: userInput };
      const botMessage = await generateResponse(userInput);

      setChatHistory([...chatHistory, userMessage, { type: "bot", message: botMessage }]);

      // Guardar mensajes en la base de datos
      await axios.post('http://localhost:8000/api/conversations', { message: userInput, type: 'user' });
      await axios.post('http://localhost:8000/api/conversations', { message: botMessage, type: 'bot' });
    } catch (error) {
      console.error("Error sending message:", error.response ? error.response.data : error.message);
    } finally {
      setUserInput(""); 
      setIsLoading(false);
    }
  };

  // Función para manejar eventos de tecla
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Función para limpiar el historial del chat
  const clearChat = () => {
    setChatHistory([]);
  };

  // Alternar la visibilidad del chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Función para alternar la expansión del chat
  const toggleChatSize = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  const goToChat = () => {
    navigate("/Chat"); // Navega a la ruta "/Chat"
  };

  useEffect(() => {
    const welcomeMessage =
      "¡Hola! Soy el Dr. Agro, tu experto agrónomo virtual. Estoy aquí para ayudarte con cualquier pregunta sobre cultivos, gestión de tierras, y enfermedades de plantas. ¿En qué puedo asistirte hoy?";
    setChatHistory([{ type: "bot", message: welcomeMessage }]);
  }, []);

  return (
    <div className="relative" style={{ backgroundColor: '#1F2937' }}> {/* bg-gray-900 */}

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className={`fixed bottom-8 right-8 w-full sm:w-[550px] ${isChatExpanded ? 'h-[800px]' : 'h-[600px]'} bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden`}
            initial={{ opacity: 0, y: 100 }} // Mueve el chat hacia arriba en lugar de escalar
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Botón de cierre claro en la parte superior */}
            <div className="absolute top-2 right-2 flex space-x-2">
              {/* Botón de cierre */}
              <button
                onClick={toggleChat}
                className="bg-transparent hover:bg-gray-700 text-gray-300 font-semibold py-1 px-2 rounded-full border border-gray-300 transition duration-300 focus:outline-none"
                title="Cerrar chat"
              >
                ✕
              </button>

              {/* Botón de expansión */}
              <button
                onClick={goToChat}
                className="bg-transparent hover:bg-gray-700 text-gray-300 font-semibold py-1 px-2 rounded-full border border-gray-300 transition duration-300 focus:outline-none"
                title="Expandir chat"
              >
                <BiExpand className="text-lg" />
              </button>
            </div>


            <div className="p-4 flex flex-col h-full">
              <div className="chat-container flex-grow overflow-y-auto mb-2 ">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"} mb-2`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg ${chat.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                      style={{ maxWidth: "80%" }}
                      dangerouslySetInnerHTML={{ __html: chat.message }} // Renderiza el HTML
                    ></div>
                  </div>
                ))}
                {isLoading && <p>Loading...</p>}
              </div>

              <div className="flex mt-auto">
                <input
                  type="text"
                  className="form-control flex-grow rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2"
                  placeholder="Escribe tu mensaje..."
                  value={userInput}
                  onChange={handleUserInput}
                  onKeyDown={handleKeyPress}
                />
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                  onClick={sendMessage}
                  disabled={isLoading}
                >
                  Enviar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isChatOpen && (
        <motion.button
          className="fixed bottom-8 right-8 bg-primary text-white px-7 py-2.5 rounded-full flex items-center z-50"
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <span className="me-2 text-lg">Chat</span>
          <i className="bi bi-chat-quote fs-4"></i>
        </motion.button>
      )}
    </div>
  );
};

export default App;
