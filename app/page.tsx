'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Feather, BookOpen, Heart, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface InstagramPost {
  id: string;
  permalink: string;
  media_url: string;
  caption?: string;
  media_type: string;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const pages = [
    { id: 0, title: "Cover", type: "cover" },
    { id: 1, title: "Whispers in the Dark", type: "poem", content: "In the quiet hours before dawn,\nWhen shadows dance upon the wall,\nI find the words that were never spoken,\nAnd write them down before they fall.\n\nEach syllable a secret kept,\nEach verse a whispered prayer,\nTo the darkness that has wept,\nAnd found me lying there." },
    { id: 2, title: "The Art of Letting Go", type: "prose", content: "Some stories aren't meant to be finished. Some chapters end without goodbye. And in the silence between heartbeats, we learn that letting go is not the end—it is the beginning of becoming.\n\nWe hold on to the familiar because it feels like safety. But growth demands that we release what no longer serves us. The art of letting go is the art of trusting that what comes next will be even more beautiful than what we leave behind." },
    { id: 3, title: "Midnight Musings", type: "poem", content: "The world sleeps while I awake,\nCollecting thoughts like fallen stars,\nEach one a universe unto itself,\nEach one a memory's scar.\n\nI write to keep the darkness company,\nTo give the silence voice,\nFor in the midnight's symphony,\nI find I have no choice." },
    { id: 4, title: "Instagram", type: "instagram" },
    { id: 5, title: "About", type: "about" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.book-page').forEach((page, i) => {
        gsap.fromTo(page, 
          { rotateY: i % 2 === 0 ? -90 : 90, opacity: 0, scale: 0.9 },
          {
            rotateY: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: page, start: "top 80%", end: "top 30%", scrub: 1 }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.parallax-text').forEach((text) => {
        gsap.fromTo(text,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: text, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      });
    }, containerRef);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    async function fetchInstagramPosts() {
      try {
        const response = await fetch('/api/instagram');
        if (response.ok) {
          const data = await response.json();
          setInstagramPosts(data.data || []);
        }
      } catch (error) {
        console.log('Instagram API not configured yet');
      }
    }
    fetchInstagramPosts();
  }, []);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      gsap.to(`.page-${currentPage}`, { rotateY: -180, duration: 1, ease: "power2.inOut" });
      gsap.fromTo(`.page-${newPage}`, 
        { rotateY: 90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 1, ease: "power2.inOut", delay: 0.3 }
      );
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      gsap.to(`.page-${currentPage}`, { rotateY: 90, duration: 1, ease: "power2.inOut" });
      gsap.fromTo(`.page-${newPage}`, 
        { rotateY: -180, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 1, ease: "power2.inOut", delay: 0.3 }
      );
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden bg-[#050505]">
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(196, 167, 125, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(139, 115, 85, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196, 167, 125, 0.05) 0%, transparent 50%)`
        }}
      />

      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="fixed rounded-full bg-[#c4a77d] animate-float pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`, animationDelay: `${Math.random() * 6}s`, opacity: 0.3 }}
        />
      ))}

      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 backdrop-blur-md bg-[#050505]/50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[#c4a77d]">
            <Feather className="w-5 h-5" />
            <span className="text-sm font-light tracking-[0.3em] uppercase">whatmichaelwrote</span>
          </div>
          <div className="flex items-center gap-8 text-xs text-[#808080] tracking-[0.2em] uppercase">
            <span className="text-[#c4a77d]">Page {currentPage + 1} of {pages.length}</span>
          </div>
        </div>
      </nav>

      <div ref={bookRef} className="relative z-10 pt-24 pb-32">
        <section className="book-page page-0 min-h-screen flex items-center justify-center px-8 perspective-1000">
          <div className="text-center max-w-5xl mx-auto">
            <div className="parallax-text mb-12">
              <BookOpen className="w-20 h-20 mx-auto text-[#c4a77d] mb-8 opacity-60" />
              <h1 className="text-8xl md:text-[10rem] lg:text-[14rem] font-playfair-display font-black tracking-tighter leading-[0.85] mb-8">
                <span className="block bg-gradient-to-b from-[#c4a77d] via-[#f5f5f5] to-[#8b7355] bg-clip-text text-transparent">what</span>
                <span className="block bg-gradient-to-b from-[#f5f5f5] via-[#c4a77d] to-[#8b7355] bg-clip-text text-transparent">michael</span>
                <span className="block bg-gradient-to-b from-[#c4a77d] via-[#8b7355] to-[#c4a77d] bg-clip-text text-transparent">wrote</span>
              </h1>
            </div>
            <div className="parallax-text">
              <p className="text-xl md:text-2xl text-[#808080] font-light tracking-[0.4em] uppercase mb-16">a collection of poetry & prose</p>
              <button onClick={nextPage} className="group inline-flex items-center gap-4 px-10 py-5 border border-[#c4a77d] text-[#c4a77d] rounded-full text-sm tracking-[0.3em] uppercase hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-500">
                Open the Book<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        <section className="book-page page-1 min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="parallax-text text-center mb-16">
              <span className="text-xs text-[#c4a77d] tracking-[0.5em] uppercase block mb-4">Poetry</span>
              <h2 className="text-6xl md:text-8xl font-playfair-display font-black tracking-tighter text-[#f5f5f5] mb-4">Whispers in the Dark</h2>
              <div className="w-32 h-px bg-[#c4a77d] mx-auto" />
            </div>
            <div className="parallax-text max-w-2xl mx-auto">
              <p className="text-2xl md:text-3xl text-[#a0a0a0] leading-relaxed font-light whitespace-pre-line text-center">{pages[1].content}</p>
            </div>
            <div className="flex justify-center gap-4 mt-16">
              <button onClick={prevPage} className="px-6 py-3 border border-[#2a2a2a] text-[#808080] rounded-full text-xs tracking-[0.2em] uppercase hover:border-[#c4a77d] hover:text-[#c4a77d] transition-all duration-300">Previous</button>
              <button onClick={nextPage} className="px-6 py-3 border border-[#c4a77d] text-[#c4a77d] rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-300">Next Page</button>
            </div>
          </div>
        </section>

        <section className="book-page page-2 min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="parallax-text text-center mb-16">
              <span className="text-xs text-[#c4a77d] tracking-[0.5em] uppercase block mb-4">Prose</span>
              <h2 className="text-6xl md:text-8xl font-playfair-display font-black tracking-tighter text-[#f5f5f5] mb-4">The Art of Letting Go</h2>
              <div className="w-32 h-px bg-[#c4a77d] mx-auto" />
            </div>
            <div className="parallax-text max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-[#a0a0a0] leading-relaxed font-light whitespace-pre-line text-center">{pages[2].content}</p>
            </div>
            <div className="flex justify-center gap-4 mt-16">
              <button onClick={prevPage} className="px-6 py-3 border border-[#2a2a2a] text-[#808080] rounded-full text-xs tracking-[0.2em] uppercase hover:border-[#c4a77d] hover:text-[#c4a77d] transition-all duration-300">Previous</button>
              <button onClick={nextPage} className="px-6 py-3 border border-[#c4a77d] text-[#c4a77d] rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-300">Next Page</button>
            </div>
          </div>
        </section>

        <section className="book-page page-3 min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="parallax-text text-center mb-16">
              <span className="text-xs text-[#c4a77d] tracking-[0.5em] uppercase block mb-4">Poetry</span>
              <h2 className="text-6xl md:text-8xl font-playfair-display font-black tracking-tighter text-[#f5f5f5] mb-4">Midnight Musings</h2>
              <div className="w-32 h-px bg-[#c4a77d] mx-auto" />
            </div>
            <div className="parallax-text max-w-2xl mx-auto">
              <p className="text-2xl md:text-3xl text-[#a0a0a0] leading-relaxed font-light whitespace-pre-line text-center">{pages[3].content}</p>
            </div>
            <div className="flex justify-center gap-4 mt-16">
              <button onClick={prevPage} className="px-6 py-3 border border-[#2a2a2a] text-[#808080] rounded-full text-xs tracking-[0.2em] uppercase hover:border-[#c4a77d] hover:text-[#c4a77d] transition-all duration-300">Previous</button>
              <button onClick={nextPage} className="px-6 py-3 border border-[#c4a77d] text-[#c4a77d] rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-300">Next Page</button>
            </div>
          </div>
        </section>

        <section className="book-page page-4 min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-6xl mx-auto w-full">
            <div className="parallax-text text-center mb-16">
              <svg className="w-16 h-16 mx-auto text-[#c4a77d] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              <h2 className="text-6xl md:text-8xl font-playfair-display font-black tracking-tighter text-[#f5f5f5] mb-4">Visual Stories</h2>
              <p className="text-lg text-[#808080] tracking-[0.2em] uppercase">@whatmichaelwrote on Instagram</p>
              <div className="w-32 h-px bg-[#c4a77d] mx-auto mt-6" />
            </div>

            {instagramPosts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {instagramPosts.slice(0, 6).map((post) => (
                  <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className="group relative aspect-square border border-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#c4a77d] transition-all duration-500">
                    <img src={post.media_url} alt={post.caption || 'Instagram post'} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {post.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-[#c4a77d] text-sm line-clamp-2">{post.caption}</p>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <a key={item} href="https://instagram.com/whatmichaelwrote" target="_blank" rel="noopener noreferrer" className="group relative aspect-square border border-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#c4a77d] transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c4a77d]/10 to-[#8b7355]/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#c4a77d] opacity-40 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050505] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-[#c4a77d] text-sm">View on Instagram</p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <a href="https://instagram.com/whatmichaelwrote" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 border border-[#c4a77d] text-[#c4a77d] rounded-full text-sm tracking-[0.2em] uppercase hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                Follow @whatmichaelwrote
              </a>
            </div>

            <div className="flex justify-center gap-4 mt-16">
              <button onClick={prevPage} className="px-6 py-3 border border-[#2a2a2a] text-[#808080] rounded-full text-xs tracking-[0.2em] uppercase hover:border-[#c4a77d] hover:text-[#c4a77d] transition-all duration-300">Previous</button>
              <button onClick={nextPage} className="px-6 py-3 border border-[#c4a77d] text-[#c4a77d] rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-300">Next Page</button>
            </div>
          </div>
        </section>

        <section className="book-page page-5 min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="parallax-text mb-16">
              <Heart className="w-16 h-16 mx-auto text-[#c4a77d] mb-8 opacity-60" />
              <h2 className="text-6xl md:text-8xl font-playfair-display font-black tracking-tighter text-[#f5f5f5] mb-8">About This Space</h2>
              <div className="w-32 h-px bg-[#c4a77d] mx-auto" />
            </div>
            <div className="parallax-text">
              <p className="text-xl md:text-2xl text-[#a0a0a0] leading-relaxed mb-8">This is a sanctuary for words that refuse to stay silent. Here, poetry and prose intertwine to create moments of reflection, connection, and raw emotion.</p>
              <p className="text-xl md:text-2xl text-[#a0a0a0] leading-relaxed mb-8">Every piece is a fragment of the human experience, waiting to resonate with yours.</p>
              <p className="text-2xl md:text-3xl text-[#c4a77d] leading-relaxed italic font-playfair-display">"In the end, we're all just stories waiting to be told."</p>
            </div>
            <div className="flex justify-center gap-4 mt-16">
              <button onClick={prevPage} className="px-6 py-3 border border-[#2a2a2a] text-[#808080] rounded-full text-xs tracking-[0.2em] uppercase hover:border-[#c4a77d] hover:text-[#c4a77d] transition-all duration-300">Previous</button>
              <button onClick={() => setCurrentPage(0)} className="px-6 py-3 border border-[#c4a77d] text-[#c4a77d] rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[#c4a77d] hover:text-[#050505] transition-all duration-300">Back to Cover</button>
            </div>
          </div>
        </section>

        <footer className="py-16 px-8 border-t border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[#c4a77d] mb-4">
              <Feather className="w-5 h-5" />
              <span className="text-lg tracking-[0.3em] uppercase">whatmichaelwrote</span>
            </div>
            <p className="text-[#505050] text-sm tracking-[0.2em]">© {new Date().getFullYear()} — where words breathe and emotions flow</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
