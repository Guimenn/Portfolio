"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type SocialLinkProps = {
  href: string;
  imgSrc: string;
  alt: string;
  className: string;
};

const SocialLink = ({ href, imgSrc, alt, className }: SocialLinkProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`transition-all duration-300 ${className}`}
    style={{ borderRadius: "50%" }}
  >
    <Image
      src={imgSrc}
      alt={alt}
      width={40}
      height={40}
      className="transition-all duration-300"
    />
  </motion.a>
);

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      <SocialLink
        href="https://www.instagram.com/guimen_dev/"
        imgSrc="/img/instagram.png"
        alt="Instagram"
        className="insta hover:shadow-[0_0_10px_#dd001a8c] hover:-translate-y-1 hover:translate-x-[-3px]"
      />
      <SocialLink
        href="https://wa.me/5511941837635"
        imgSrc="/img/whatsapp.png"
        alt="WhatsApp"
        className="whats hover:shadow-[0_0_10px_#25d3659c] hover:-translate-y-1 hover:translate-x-[-3px]"
      />
      <SocialLink
        href="https://www.linkedin.com/in/guimen/"
        imgSrc="/img/linkedin.png"
        alt="LinkedIn"
        className="linkedin hover:shadow-[0_0_10px_#0076b58c] hover:-translate-y-1 hover:translate-x-[-3px]"
      />
      <SocialLink
        href="https://github.com/guimen"
        imgSrc="/img/github.png"
        alt="GitHub"
        className="git hover:shadow-[0_0_10px_#F1F1F1] hover:-translate-y-1 hover:translate-x-[-3px]"
      />
    </div>
  );
}