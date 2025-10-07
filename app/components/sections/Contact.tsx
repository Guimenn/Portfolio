"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import { emailConfig } from '../../config/email';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        if (value.trim().length > 50) return 'Nome deve ter no máximo 50 caracteres';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email inválido';
        return undefined;

      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres';
        if (value.trim().length > 1000) return 'Mensagem deve ter no máximo 1000 caracteres';
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Marca todos os campos como tocados
    setTouched({ name: true, email: true, message: true });

    // Valida o formulário
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

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
        toast.success('Mensagem enviada com sucesso! Entrarei em contato em breve.', {
          duration: 5000,
        });
        setFormData({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
        setErrors({});
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

    // Valida o campo enquanto o usuário digita (apenas se já foi tocado)
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Valida o campo ao perder o foco
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      label: "Email",
      value: "men.guilherme5@gmail.com",
      href: "mailto:men.guilherme5@gmail.com",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.11 11.31 8.09 12.13a1 1 0 0 0 1.22 0C13.89 22.31 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.3C10.14 17.01 5 12.36 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 1.36-5.14 6.01-7 8.3zM12 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
      </svg>
      ),
      label: "Localização",
      value: "Brasil - São Paulo"
    }
  ];

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

      <div className="z-10 container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Entre em <span className="text-[#19D1C2]">Contato</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Vamos trabalhar juntos? Estou sempre aberto a novos projetos e colaborações
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-1"
          >
            <div className="rounded-2xl border border-gray-700/50 bg-gray-900/70 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="mb-6 text-xl font-bold text-white">Informações de Contato</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 rounded-lg border border-gray-700/30 bg-gray-800/30 p-4 transition-all duration-300 hover:border-[#19D1C2]/50 hover:bg-gray-800/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#19D1C2]/10 text-[#19D1C2]">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-700/50 bg-gray-900/70 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="mb-4 text-lg font-bold text-white">Disponibilidade</h3>
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                </div>
                <p className="text-gray-300">Disponível para novos projetos</p>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Respondo geralmente em até 24 horas
              </p>
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-gray-700/50 bg-gray-900/70 p-8 shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Nome <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 ${errors.name && touched.name
                      ? 'border-red-500 bg-red-500/10 focus:border-red-500 focus:ring-red-500/50'
                      : 'border-gray-700/50 bg-gray-800/50 focus:border-[#19D1C2] focus:ring-[#19D1C2]/50'
                      }`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 ${errors.email && touched.email
                      ? 'border-red-500 bg-red-500/10 focus:border-red-500 focus:ring-red-500/50'
                      : 'border-gray-700/50 bg-gray-800/50 focus:border-[#19D1C2] focus:ring-[#19D1C2]/50'
                      }`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Mensagem <span className="text-red-400">*</span>
                    </label>
                    <span className={`text-sm ${formData.message.length > 1000 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                      {formData.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    className={`mt-1 block w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${errors.message && touched.message
                      ? 'border-red-500 bg-red-500/10 focus:border-red-500 focus:ring-red-500/50'
                      : 'border-gray-700/50 bg-gray-800/50 focus:border-[#19D1C2] focus:ring-[#19D1C2]/50'
                      }`}
                    placeholder="Descreva seu projeto ou ideia..."
                  />
                  {errors.message && touched.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#19D1C2] to-[#15b3a6] px-6 py-4 font-bold text-white shadow-xl shadow-[#19D1C2]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#19D1C2]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  {!isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}