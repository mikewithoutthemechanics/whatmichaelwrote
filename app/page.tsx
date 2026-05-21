'use client';

import { motion } from 'framer-motion';
import { Feather, BookOpen, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }));

  const poems = [
    {
      id: 1,
      title: "Whispers in the Dark",
      excerpt: "In the quiet hours before dawn,\nWhen shadows dance upon the wall,\nI find the words that were never spoken...",
      category: "Poetry"
    },
    {
      id: 2,
      title: "The Art of Letting Go",
      excerpt: "Some stories aren't meant to be finished,\nSome chapters end without goodbye,\nAnd in the silence between heartbeats...",
      category: "Prose"
    },
    {
      id: 3,
      title: "Midnight Musings",
      excerpt: "The world sleeps while I awake,\nCollecting thoughts like fallen stars,\nEach one a universe unto itself...",
      category: "Poetry"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Ambient background with mouse-following gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(196, 167, 125, 0.08) 0%, transparent 50%)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full bg-[#c4a77d]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-[#c4a77d]"
            >
              <Feather className="w-6 h-6" />
              <span className="text-xl font-light tracking-widest">whatmichaelwrote</span>
            </motion.div>
            <div className="flex items-center gap-8 text-sm text-[#a0a0a0]">
              <motion.a
                whileHover={{ color: "#c4a77d" }}
                href="#poems"
                className="transition-colors"
              >
                Poems
              </motion.a>
              <motion.a
                whileHover={{ color: "#c4a77d" }}
                href="#prose"
                className="transition-colors"
              >
                Prose
              </motion.a>
              <motion.a
                whileHover={{ color: "#c4a77d" }}
                href="#instagram"
                className="transition-colors"
              >
                Instagram
              </motion.a>
              <motion.a
                whileHover={{ color: "#c4a77d" }}
                href="#about"
                className="transition-colors"
              >
                About
              </motion.a>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <BookOpen className="w-16 h-16 mx-auto text-[#c4a77d] mb-12" />
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-playfair-display font-black tracking-tighter mb-8 leading-none bg-gradient-to-r from-[#c4a77d] via-[#f5f5f5] to-[#c4a77d] bg-clip-text text-transparent">
                whatmichael<br />wrote
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl text-[#808080] font-light tracking-[0.3em] uppercase leading-relaxed">
                where words breathe
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(196, 167, 125, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-[#c4a77d] text-[#c4a77d] rounded-full text-sm tracking-widest hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-300"
              >
                EXPLORE THE WORDS
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Featured Poems Section */}
        <section id="poems" className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-[#f5f5f5]">
                Featured Works
              </h2>
              <div className="w-24 h-px bg-[#c4a77d] mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {poems.map((poem, index) => (
                <motion.div
                  key={poem.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative p-8 border border-[#1a1a1a] rounded-lg hover:border-[#c4a77d] transition-all duration-500 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4a77d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  <div className="relative">
                    <span className="text-xs text-[#c4a77d] tracking-widest mb-4 block">
                      {poem.category}
                    </span>
                    <h3 className="text-2xl font-light mb-4 text-[#f5f5f5] group-hover:text-[#c4a77d] transition-colors">
                      {poem.title}
                    </h3>
                    <p className="text-[#808080] leading-relaxed whitespace-pre-line text-sm">
                      {poem.excerpt}
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      className="mt-6 h-px bg-[#c4a77d] group-hover:w-full transition-all duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section id="instagram" className="py-32 px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c4a77d]/5 to-transparent" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Custom Instagram Icon SVG */}
              <svg
                className="w-12 h-12 mx-auto text-[#c4a77d] mb-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-[#f5f5f5]">
                Instagram Feed
              </h2>
              <p className="text-lg text-[#808080] leading-relaxed mb-8">
                Discover more poetry, prose, and daily inspiration
              </p>
            </motion.div>

            {/* Instagram Feed Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.a
                  key={item}
                  href="https://instagram.com/whatmichaelwrote"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: item * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative aspect-square border border-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4a77d]/20 to-[#8b7355]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-[#c4a77d] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-50 group-hover:scale-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050505] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[#c4a77d] text-sm">View on Instagram</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.a
                href="https://instagram.com/whatmichaelwrote"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(196, 167, 125, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 border border-[#c4a77d] text-[#c4a77d] rounded-full text-sm tracking-widest hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @whatmichaelwrote
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c4a77d]/5 to-transparent" />
          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Heart className="w-12 h-12 mx-auto text-[#c4a77d] mb-8" />
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-[#f5f5f5]">
                About This Space
              </h2>
              <p className="text-lg text-[#808080] leading-relaxed mb-8">
                This is a sanctuary for words that refuse to stay silent. Here, poetry and prose intertwine
                to create moments of reflection, connection, and raw emotion. Every piece is a fragment of
                the human experience, waiting to resonate with yours.
              </p>
              <p className="text-lg text-[#808080] leading-relaxed italic">
                "In the end, we're all just stories waiting to be told."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8 border-t border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 text-[#c4a77d] mb-4"
            >
              <Feather className="w-5 h-5" />
              <span className="text-lg tracking-widest">whatmichaelwrote</span>
            </motion.div>
            <p className="text-[#505050] text-sm">
              © {new Date().getFullYear()} — where words breathe and emotions flow
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
