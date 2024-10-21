import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "../App.css";
import { BiExpand } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = useNavigate();
  const genAI = new GoogleGenerativeAI("AIzaSyAxcHIYZaBolOa3MjBtpvES_EttV3RQEj4");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => setUserInput(e.target.value);

  const generateResponse = async (input) => {
    try {
      const result = await model.generateContent(input);
      const response = await result.response;

      const cleanedResponse = response.text()
        .replace(/\*/g, "")
        .replace(/#/g, "")
        .replace(/(\d+)\. /g, "<strong>$1.</strong> ")
        .replace(/(\n\n|\r\n|\r)/g, "<br />")
        .replace(/(\n)(?=[^<]*<strong>)/g, "<br /><br />")
        .replace(/\n/g, "<br />");

      return cleanedResponse
        .replace(/(Consejos adicionales:)/, "<strong>$1</strong><ul>")
        .replace(/(Tipos de frijoles:)/, "<strong>$1</strong><ul>")
        .replace(/- (.*?)(?=<br>|$)/g, "<li>$1</li>")
        .replace(/<\/ul>\s*<ul>/g, "");
    } catch (error) {
      console.error("Error generating response:", error);
      return "Lo siento, no pude entender tu pregunta. ¿Podrías reformularla?";
    }
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
        const userMessage = { type: "user", message: userInput };
        const botMessage = await generateResponse(userInput);

        setChatHistory((prevHistory) => [
            ...prevHistory,
            userMessage,
            { type: "bot", message: botMessage },
        ]);

        // Guardar solo la consulta del usuario en la API
        await axios.post('https://agronova-backend-production.up.railway.app/api/consultas', {
            consulta_texto: userInput,
            user_id: 1 // Ajusta este valor según tu lógica de autenticación
        });

    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
    } finally {
        setUserInput(""); // Limpiar el campo de entrada
        setIsLoading(false);
    }
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const goToChat = () => {
    navigate("/Chat");
  };

  useEffect(() => {
    const welcomeMessage =
      "¡Hola! Soy el Dr. Agro, tu experto agrónomo virtual. Estoy aquí para ayudarte con cualquier pregunta sobre cultivos, gestión de tierras, y enfermedades de plantas. ¿En qué puedo asistirte hoy?";
    setChatHistory([{ type: "bot", message: welcomeMessage }]);
  }, []);

  return (
    <div className="relative" style={{ backgroundColor: '#1F2937' }}>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-8 right-8 w-full sm:w-[550px] h-[600px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={toggleChat}
                className="bg-transparent hover:bg-gray-700 text-gray-300 font-semibold py-1 px-2 rounded-full border border-gray-300 transition duration-300 focus:outline-none"
                title="Cerrar chat"
              >
                ✕
              </button>

              <button
                onClick={goToChat}
                className="bg-transparent hover:bg-gray-700 text-gray-300 font-semibold py-1 px-2 rounded-full border border-gray-300 transition duration-300 focus:outline-none"
                title="Expandir chat"
              >
                <BiExpand className="text-lg" />
              </button>
            </div>

            <div className="p-4 flex flex-col h-full">
              <div className="chat-container flex-grow overflow-y-auto mb-2">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"} mb-2`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg ${chat.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                      style={{ maxWidth: "80%" }}
                      dangerouslySetInnerHTML={{ __html: chat.message }}
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
          <FiMessageSquare className="mr-2" />
          <span className="text-lg">Chat</span>
        </motion.button>
      )}
    </div>
  );
};

export default App;
