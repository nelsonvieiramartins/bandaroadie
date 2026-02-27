import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  ArrowRight,
  Video,
  Play,
  PlayCircle,
  Menu,
  X,
  Calendar,
  Loader2,
  Instagram,
  Youtube,
  Music2,
  Facebook,
  ChevronDown
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [videoItems, setVideoItems] = useState<any[]>([]);
  const [discographyItems, setDiscographyItems] = useState<any[]>([]);
  const [agendaItems, setAgendaItems] = useState<any[]>([]);
  const [memberItems, setMemberItems] = useState<any[]>([]);

  // Modal State
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [
          { data: gallery },
          { data: videos },
          { data: discography },
          { data: agenda },
          { data: members }
        ] = await Promise.all([
          supabase.from('gallery').select('*').order('created_at', { ascending: false }),
          supabase.from('videos').select('*').order('created_at', { ascending: false }),
          supabase.from('discography').select('*').order('created_at', { ascending: false }),
          supabase.from('agenda').select('*').order('event_date', { ascending: true }),
          supabase.from('members').select('*').order('created_at', { ascending: true })
        ]);

        if (gallery) setGalleryItems(gallery);
        if (videos) setVideoItems(videos);
        if (discography) setDiscographyItems(discography);
        if (agenda) setAgendaItems(agenda);
        if (members) setMemberItems(members);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark overflow-x-hidden text-slate-100 font-sans selection:bg-primary selection:text-black">
      <div className="layout-container flex h-full grow flex-col">

        {/* Header - Acid Rock Style */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-white/5 px-6 py-4 lg:px-20 sticky top-0 bg-background-dark/95 backdrop-blur-md z-50">
          <div className="flex items-center gap-12">
            <div className="flex items-end gap-1 text-primary cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">ROADIE</h1>
              <div className="size-2 bg-primary mb-1 shrink-0"></div>
            </div>
            <nav className="hidden md:flex items-center gap-8 ml-8">
              <a className="text-white hover:text-primary text-xs font-bold uppercase tracking-[0.2em] transition-colors" href="#home">Sobre</a>
              <a className="text-white hover:text-primary text-xs font-bold uppercase tracking-[0.2em] transition-colors" href="#integrantes">Integrantes</a>
              <a className="text-white hover:text-primary text-xs font-bold uppercase tracking-[0.2em] transition-colors" href="#tour">Eventos</a>
              <a className="text-white hover:text-primary text-xs font-bold uppercase tracking-[0.2em] transition-colors" href="#media">Galeria</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden sm:flex items-center gap-2 bg-primary text-black px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-white border-2 border-primary hover:border-white">
              <Calendar className="size-4" /> Contratar
            </button>
            <div className="flex gap-3">
              <button
                className="md:hidden text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Marquee Ticker */}
        <div className="w-full bg-primary overflow-hidden py-2 border-y border-black">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center text-black font-extrabold text-sm tracking-widest uppercase gap-4 px-4">
                <span>★ DISPONÍVEL PARA EVENTOS</span>
                <span>★ CASAMENTOS</span>
                <span>★ FESTAS CORPORATIVAS</span>
                <span>★ ANIVERSÁRIOS</span>
                <span>★ SHOWS PRIVADOS</span>
                <span>★ BARES E PUBS</span>
                <span>★ FESTIVAIS</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[76px] bg-background-dark z-40 p-6 flex flex-col gap-6">
            <nav className="flex flex-col gap-6">
              <a className="text-white hover:text-primary text-xl font-bold uppercase tracking-widest transition-colors" href="#home" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a className="text-white hover:text-primary text-xl font-bold uppercase tracking-widest transition-colors" href="#integrantes" onClick={() => setIsMenuOpen(false)}>Integrantes</a>
              <a className="text-white hover:text-primary text-xl font-bold uppercase tracking-widest transition-colors" href="#tour" onClick={() => setIsMenuOpen(false)}>Eventos</a>
              <a className="text-white hover:text-primary text-xl font-bold uppercase tracking-widest transition-colors" href="#media" onClick={() => setIsMenuOpen(false)}>Galeria</a>
            </nav>
            <button className="bg-primary text-black px-6 py-4 flex justify-center items-center text-sm font-bold uppercase tracking-widest w-full border-2 border-primary">
              Contratar
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="animate-spin size-12 text-primary mb-4" />
            <p className="text-white font-bold uppercase tracking-widest text-sm">Carregando...</p>
          </div>
        ) : (
          <main className="flex-1 px-6 lg:px-20 py-10 w-full relative">

            {/* Background Note Icon Overlay */}
            <div className="absolute top-1/4 right-1/4 opacity-5 pointer-events-none hidden lg:block">
              <Music2 className="w-[400px] h-[400px]" />
            </div>

            {/* Hero Section */}
            <section id="home" className="min-h-[80vh] flex flex-col justify-center relative">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 z-10 w-full mx-auto max-w-[1400px] mt-12 lg:mt-0">

                <div className="flex-1">
                  <div className="w-20 h-1 bg-primary mb-6"></div>
                  <h3 className="text-primary font-bold uppercase tracking-[0.3em] text-sm lg:text-base mb-4">
                    Pop Rock Cover Band
                  </h3>
                  <h2 className="text-7xl md:text-8xl lg:text-[160px] font-black tracking-tighter leading-none text-white uppercase mb-6">
                    ROADIE
                  </h2>
                  <p className="text-zinc-300 max-w-xl text-lg lg:text-xl font-inter leading-relaxed mb-10">
                    A energia do rock clássico e o melhor do pop em uma experiência ao vivo inesquecível. Covers que fazem seu evento ser memorável.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-primary text-black font-bold text-sm uppercase tracking-widest px-8 py-4 flex items-center justify-center gap-2 transition-all hover:bg-white border-2 border-primary hover:border-white">
                      <span>⚡</span> Contratar Agora
                    </button>
                    <button className="bg-transparent border-2 border-zinc-700 text-white font-bold text-sm uppercase tracking-widest px-8 py-4 flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all">
                      <Calendar className="size-4" /> Ver Agenda
                    </button>
                  </div>
                </div>

                {/* Right Side Stats & Socials */}
                <div className="flex flex-col items-end gap-12 lg:gap-24 w-full lg:w-auto">
                  <div className="flex flex-col gap-8 text-right w-full lg:w-auto mt-12 lg:mt-0">
                    <div>
                      <h4 className="text-6xl lg:text-8xl font-black text-primary leading-none tracking-tighter w-full text-right">+500</h4>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-2 w-full text-right">Shows Realizados</p>
                    </div>
                    <div>
                      <h4 className="text-6xl lg:text-8xl font-black text-primary leading-none tracking-tighter w-full text-right">12</h4>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-2 w-full text-right">Anos de Estrada</p>
                    </div>
                  </div>

                  <div className="flex gap-4 self-end lg:mt-12">
                    <SocialButton icon={<Instagram className="size-5" />} />
                    <SocialButton icon={<Youtube className="size-5" />} />
                    <SocialButton icon={<Music2 className="size-5" />} />
                    <SocialButton icon={<Facebook className="size-5" />} />
                  </div>
                </div>

              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse hidden lg:flex">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
                <ChevronDown className="text-primary size-5" />
              </div>
            </section>

            {/* Nova Seção: Integrantes (Lineup) */}
            <section id="integrantes" className="py-24 lg:py-32 border-t-2 border-zinc-800 scroll-mt-20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] block mb-4">// LINEUP</span>
                  <h2 className="font-sans font-bold uppercase tracking-tighter leading-[0.9] text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
                    INTEGRANTES<span className="text-primary">.</span>
                  </h2>
                </div>
                <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">4 MÚSICOS — 1 ENERGIA</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {memberItems.length > 0 ? memberItems.map((member) => (
                  <div key={member.id} onClick={() => setSelectedMember(member)} className="group relative border-2 border-zinc-800 overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary bg-zinc-900">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                        style={{ backgroundImage: `url('${member.image_url}')` }}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>

                      <div className="absolute bottom-0 left-0 w-full p-5 bg-black/90 transition-all border-t-2 border-transparent group-hover:border-primary">
                        <p className="text-white font-black text-lg uppercase tracking-tight leading-none">{member.name}</p>
                        <p className="text-primary text-[10px] font-inter uppercase tracking-[0.2em] mt-2 font-bold">{member.role}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-zinc-500 font-inter col-span-full">Nenhum integrante cadastrado no momento.</p>
                )}
              </div>
            </section>

            {/* Member Modal */}
            {selectedMember && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop overlay */}
                <div
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                  onClick={() => setSelectedMember(null)}
                ></div>

                {/* Modal content */}
                <div className="relative bg-zinc-900 border-2 border-primary w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 z-20 size-10 bg-black/50 hover:bg-primary hover:text-black flex items-center justify-center border border-white/10 transition-all"
                  >
                    <X className="size-6" />
                  </button>

                  <div className="flex flex-col md:flex-row gap-0">
                    {/* Left side: Cover photo */}
                    <div className="md:w-2/5 aspect-[3/4] md:aspect-auto md:min-h-[500px] relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${selectedMember.image_url}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:hidden"></div>
                    </div>

                    {/* Right side: Info */}
                    <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                      <h4 className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">{selectedMember.role}</h4>
                      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                        {selectedMember.name}<span className="text-primary">.</span>
                      </h2>

                      <div className="space-y-6 mb-8">
                        <div>
                          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Nome Completo</p>
                          <p className="text-white text-lg font-inter">{selectedMember.full_name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Influências / Estilo Favorito</p>
                          <p className="text-white text-lg font-inter">{selectedMember.favorite_style}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Sobre</p>
                          <p className="text-zinc-300 font-inter leading-relaxed">{selectedMember.presentation_text}</p>
                        </div>
                      </div>

                      {/* Photo Gallery within Modal */}
                      {selectedMember.gallery_urls && selectedMember.gallery_urls.length > 0 && (
                        <div>
                          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-4">Galeria</p>
                          <div className="flex gap-2 overflow-x-auto pb-4 snap-x">
                            {selectedMember.gallery_urls.split(',').map((url: string, idx: number) => (
                              <div
                                key={idx}
                                className="w-24 h-24 shrink-0 bg-zinc-800 border border-zinc-700 overflow-hidden snap-start"
                              >
                                <img
                                  src={url.trim()}
                                  alt={`Galeria ${selectedMember.name} ${idx + 1}`}
                                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-pointer"
                                  onClick={() => window.open(url.trim(), '_blank')}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Marquee Ticker 2 - Nomes de Bandas */}
            <div className="w-full overflow-hidden py-16">
              <div className="flex whitespace-nowrap animate-marquee">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex shrink-0 items-center font-black text-5xl lg:text-7xl tracking-tighter uppercase gap-12 px-6">
                    <span><span className="text-primary mr-6">★</span><span className="text-transparent" style={{ WebkitTextStroke: '2px #3f3f46' }}>LEGIÃO URBANA</span></span>
                    <span><span className="text-primary mr-6">★</span><span className="text-transparent" style={{ WebkitTextStroke: '2px #3f3f46' }}>COLDPLAY</span></span>
                    <span><span className="text-primary mr-6">★</span><span className="text-transparent" style={{ WebkitTextStroke: '2px #3f3f46' }}>CAPITAL INICIAL</span></span>
                    <span><span className="text-primary mr-6">★</span><span className="text-transparent" style={{ WebkitTextStroke: '2px #3f3f46' }}>U2</span></span>
                    <span><span className="text-primary mr-6">★</span><span className="text-transparent" style={{ WebkitTextStroke: '2px #3f3f46' }}>BARÃO VERMELHO</span></span>
                    <span><span className="text-primary mr-6">★</span><span className="text-transparent" style={{ WebkitTextStroke: '2px #3f3f46' }}>LINKIN PARK</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wrapper limitador para o resto do conteúdo */}
            <div className="max-w-7xl mx-auto w-full mt-10">

              {/* Seção Nova: Agenda (Tour) */}
              <div id="tour" className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-8 scroll-mt-28 mt-24">
                <h3 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary"></div> Próximos Eventos
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                {agendaItems.length > 0 ? agendaItems.map((item) => (
                  <AgendaItem
                    key={item.id}
                    date={item.event_date}
                    location={item.location}
                    venue={item.venue}
                    ticketUrl={item.ticket_url}
                  />
                )) : (
                  <p className="text-zinc-500 font-inter">Nenhum evento agendado no momento.</p>
                )}
              </div>

              {/* Live Gallery */}
              <div id="media" className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-8 scroll-mt-28">
                <h3 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary"></div> Galeria ao Vivo
                </h3>
                <button className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-primary flex items-center gap-1 transition-colors cursor-pointer">
                  Ver Todos <ArrowRight className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-24">
                {galleryItems.map(item => (
                  <GalleryItem
                    key={item.id}
                    image={item.image_url}
                    title={item.title}
                    alt={item.alt_text}
                  />
                ))}
              </div>

              {/* Music Videos */}
              <section className="mb-24">
                <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-8">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
                    <div className="w-4 h-4 bg-primary"></div> Vídeos
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {videoItems.map(item => (
                    <VideoItem
                      key={item.id}
                      image={item.video_thumb_url}
                      youtubeUrl={item.youtube_url}
                      title={item.title}
                      meta={item.meta}
                      duration={item.duration}
                      accent={item.accent as 'primary' | 'secondary'}
                    />
                  ))}
                </div>
              </section>

              {/* Discography */}
              <section id="discography" className="mb-10 scroll-mt-28">
                <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-8">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-3">
                    <div className="w-4 h-4 bg-primary"></div> Repertório & Lançamentos
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discographyItems.map(item => (
                    <DiscographyItem
                      key={item.id}
                      image={item.cover_url}
                      title={item.title}
                      meta={item.meta}
                    />
                  ))}
                </div>
              </section>

              {/* Footer */}
              <footer className="mt-32 pt-10 border-t-2 border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 pb-10">
                <div className="flex items-center gap-3 relative">
                  <h2 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">ROADIE</h2>
                  <div className="size-2 bg-primary"></div>
                </div>
                <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em]">
                  <a className="hover:text-primary transition-colors" href="#">Privacidade</a>
                  <a className="hover:text-primary transition-colors" href="#">Termos</a>
                  <a className="hover:text-primary transition-colors" href="/admin">Admin Hub</a>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest">© 2024 Roadie Cover Band.</p>
              </footer>

            </div>
          </main>
        )}
      </div>
    </div>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="flex items-center justify-center w-12 h-12 border-2 border-zinc-700 text-white hover:border-primary hover:bg-primary hover:text-black transition-all">
      {icon}
    </a>
  );
}

function GalleryItem({ image, title, alt }: { image: string; title: string; alt?: string }) {
  return (
    <div className="group relative aspect-square overflow-hidden bg-zinc-900 cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        style={{ backgroundImage: `url('${image}')` }}
        aria-label={alt || title}
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-full p-4 border-l-4 border-transparent group-hover:border-primary transition-all">
        <p className="text-xs font-bold text-white uppercase tracking-widest bg-black/80 inline-block px-2 py-1">{title}</p>
      </div>
    </div>
  );
}

function VideoItem({ image, youtubeUrl, title, meta, duration }: { image: string; youtubeUrl?: string; title: string; meta: string; duration: string; accent: 'primary' | 'secondary' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col gap-4 group">
      <div className="relative aspect-video overflow-hidden bg-zinc-900 border-2 border-zinc-800 group-hover:border-primary transition-colors cursor-pointer" onClick={() => setIsPlaying(true)}>

        {isPlaying && youtubeUrl ? (
          <iframe
            src={`${youtubeUrl}?autoplay=1`}
            title={title}
            className="w-full h-full absolute inset-0 z-10"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all flex items-center justify-center">
              <div className="w-16 h-16 bg-primary text-black flex items-center justify-center scale-90 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(234,255,0,0.3)]">
                <Play className="size-8 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black px-3 py-1 text-xs font-bold text-primary font-inter border border-primary/30 z-0">
              {duration}
            </div>
          </>
        )}

      </div>
      <div>
        <h4 className="text-2xl font-black uppercase text-white group-hover:text-primary transition-colors cursor-pointer" onClick={() => setIsPlaying(true)}>{title}</h4>
        <p className="text-zinc-500 text-xs mt-1 uppercase font-bold tracking-widest">{meta}</p>
      </div>
    </div>
  );
}

function DiscographyItem({ image, title, meta }: { image: string; title: string; meta: string }) {
  return (
    <div className="flex items-center gap-6 p-4 bg-zinc-900/50 border-2 border-zinc-800 hover:border-primary transition-all group">
      <div
        className="w-24 h-24 shrink-0 bg-cover grayscale group-hover:grayscale-0 transition-all"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="flex-1">
        <h5 className="text-xl font-black uppercase text-white group-hover:text-primary transition-colors leading-tight">{title}</h5>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] font-inter mt-1">{meta}</p>
      </div>
      <div className="flex gap-2">
        <button className="w-12 h-12 flex items-center justify-center bg-zinc-800 hover:bg-primary hover:text-black transition-all cursor-pointer">
          <PlayCircle className="size-6" />
        </button>
      </div>
    </div>
  );
}

function AgendaItem({ date, location, venue, ticketUrl }: { date: string; location: string; venue: string; ticketUrl?: string }) {
  const d = new Date(date);

  return (
    <div className="flex flex-col border-2 border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-primary transition-all p-6 group cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-zinc-800 group-hover:bg-primary transition-colors -mr-8 -mt-8 rotate-45"></div>

      <div className="flex gap-4 items-start mb-6">
        <div className="w-16 h-16 bg-black border-2 border-zinc-800 group-hover:border-primary flex flex-col items-center justify-center shrink-0 transition-colors">
          <span className="text-[10px] text-zinc-400 group-hover:text-black font-bold uppercase tracking-widest">{d.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}</span>
          <span className="text-2xl font-black text-white group-hover:text-black leading-none">{d.getDate()}</span>
        </div>
        <div className="flex-1 mt-1">
          <h4 className="font-black text-xl uppercase leading-tight text-white group-hover:text-primary transition-colors">{location}</h4>
          <p className="text-xs text-zinc-500 font-inter font-bold mt-1 uppercase tracking-wider">{venue}</p>
        </div>
      </div>

      <a
        href={ticketUrl || '#'}
        className="w-full py-4 text-center bg-zinc-800 group-hover:bg-primary text-zinc-300 group-hover:text-black text-xs font-bold uppercase tracking-[0.2em] transition-all"
      >
        Ingressos
      </a>
    </div>
  );
}
