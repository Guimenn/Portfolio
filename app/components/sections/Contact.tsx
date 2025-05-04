"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import { emailConfig } from '../../config/email';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Inicializa o EmailJS com sua chave pública
      emailjs.init(emailConfig.publicKey);

      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          to_email: 'men.guilherme5@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );

      if (result.status === 200) {
        toast.success('Mensagem enviada com sucesso!');
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error('Falha ao enviar email');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section
      id="contato"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6 py-16"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="animate-pulse-slow absolute top-20 left-10 h-72 w-72 rounded-full bg-[#19D1C2]/15 blur-3xl filter"></div>
        <div className="animate-pulse-slow absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl filter"></div>
      </div>

      <div className="z-10 container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-gray-700/50 bg-gray-900/70 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">Envie uma Mensagem</h2>
            <p className="mt-2 text-lg text-gray-300">
              Estou sempre aberto a novas oportunidades e colaborações
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-700/50 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-400 focus:border-[#19D1C2] focus:outline-none focus:ring-1 focus:ring-[#19D1C2]"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-700/50 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-400 focus:border-[#19D1C2] focus:outline-none focus:ring-1 focus:ring-[#19D1C2]"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-lg border border-gray-700/50 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-400 focus:border-[#19D1C2] focus:outline-none focus:ring-1 focus:ring-[#19D1C2] resize-none"
                placeholder="Sua mensagem"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className="w-full rounded-xl bg-[#19D1C2] px-6 py-3 font-bold text-white shadow-xl shadow-[#19D1C2]/20 transition-all duration-300 hover:bg-[#19D1C2]/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}