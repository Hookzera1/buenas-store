import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsappChat = () => {

  const phone = "5531988528698";
  const message = "Olá! Gostaria de atendimento na Buenas Store 😄";

  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center animate-bounce"
      aria-label="Atendimento via WhatsApp"
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default WhatsappChat;
