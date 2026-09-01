import React, { useState } from 'react';
import {
  Clapperboard,
  Sparkles,
  Wand2,
  Film,
  Image,
  Video,
  Palette,
  Lightbulb,
  UserRound,
  Globe,
  Music,
  FolderOpen,
  Settings,
  Crown,
  Play,
  Download,
  ChevronRight,
  X,
  Check,
  SlidersHorizontal,
  Layers,
  Type,
  Eraser,
  Sun,
  Moon,
  Zap,
  Camera,
  Plus,
  Heart,
  Menu
} from 'lucide-react';

const tools = [
  {
    id: 'image',
    title: 'Imagen IA',
    description: 'Crea imágenes cinematográficas desde texto.',
    icon: Image,
    image:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'video',
    title: 'Video IA',
    description: 'Convierte ideas y escenas en video.',
    icon: Video,
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'design',
    title: 'Diseño',
    description: 'Crea composiciones, posters y montajes.',
    icon: Palette,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'lighting',
    title: 'Iluminación',
    description: 'Añade luces, sombras y ambiente.',
    icon: Lightbulb,
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'characters',
    title: 'Personajes',
    description: 'Diseña personajes consistentes.',
    icon: UserRound,
    image:
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'scenes',
    title: 'Escenarios',
    description: 'Construye mundos y fondos.',
    icon: Globe,
    image:
      'https://images.unsplash.com/photo-1511497584788-876760042212?q=80&w=900&auto=format&fit=crop'
  }
];

const styles = [
  {
    name: 'Anime',
    description: 'Anime cinematográfico',
    image:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Pixel Art',
    description: 'Estética pixel retro',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Cyberpunk',
    description: 'Neón futurista',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Fantasy',
    description: 'Fantasía cinematográfica',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: '3D',
    description: 'Render 3D estilizado',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Realista',
    description: 'Cine fotorealista',
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('Anime');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const generate = () => {
    if (!prompt.trim()) {
      setPrompt(
        'Una ciudad futurista de noche, lluvia intensa, luces de neón y una protagonista caminando por las calles.'
      );
    }

    setGenerating(true);
    setGenerated(false);

    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2200);
  };

  const randomPrompt = () => {
    const ideas = [
      'Un astronauta descubre una ciudad abandonada en otro planeta.',
      'Una chica corre bajo la lluvia mientras una megaciudad cyberpunk despierta.',
      'Un pequeño robot encuentra un bosque mágico escondido.',
      'Un guerrero atraviesa un templo flotante entre las nubes.',
      'Una nave espacial llega a un planeta cubierto de océanos.',
      'Una detective investiga un misterio en una ciudad futurista.'
    ];

    setPrompt(ideas[Math.floor(Math.random() * ideas.length)]);
  };

  const renderStudio = () => (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-950/30 via-slate-950 to-purple-950/30 p-6 sm:p-10">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-2 text-fuchsia-400">
            <Sparkles size={18} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              AI Creative Studio
            </span>
          </div>

          <h2 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
            Tu idea.
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              Tu película.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Crea imágenes, escenas, personajes, videos y mundos completos
            utilizando inteligencia artificial.
          </p>

          {/* GENERADOR */}
          <div className="mt-7 rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-xl">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe lo que quieres crear..."
              className="h-28 w-full resize-none bg-transparent p-3 text-sm text-white outline-none placeholder:text-slate-600"
            />

            <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
              <button
                onClick={randomPrompt}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              >
                <Zap size={15} />
                Idea
              </button>

              <button
                onClick={() => setSelectedTool('image')}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              >
                <Image size={15} />
                Imagen
              </button>

              <button
                onClick={() => setSelectedTool('video')}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              >
                <Video size={15} />
                Video
              </button>

              <button
                onClick={generate}
                disabled={generating}
                className="ml-auto flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-fuchsia-900/30 transition hover:scale-[1.02] disabled:opacity-60"
              >
                <Wand2 size={16} />
                {generating ? 'Generando...' : 'Generar'}
              </button>
            </div>
          </div>

          {/* RESULTADO */}
          {generated && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-fuchsia-500/30">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1200&auto=format&fit=crop"
                  className="h-64 w-full object-cover"
                  alt="Resultado generado"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                      Resultado
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {selectedStyle} · Cinematic
                    </p>
                  </div>

                  <button className="rounded-xl bg-white/10 p-3 text-white backdrop-blur hover:bg-white/20">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
              Herramientas
            </p>
            <h3 className="mt-1 text-xl font-black text-white">
              Todo tu estudio en un solo lugar
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-left transition hover:-translate-y-1 hover:border-fuchsia-500/50"
              >
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="h-32 w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <Icon className="mb-2 text-fuchsia-400" size={19} />
                  <h4 className="text-sm font-bold text-white">
                    {tool.title}
                  </h4>
                  <p className="mt-1 hidden text-[10px] leading-4 text-slate-400 sm:block">
                    {tool.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ESTILOS */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
            Dirección artística
          </p>
          <h3 className="mt-1 text-xl font-black text-white">
            Elegí el estilo de tu proyecto
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {styles.map((style) => (
            <button
              key={style.name}
              onClick={() => setSelectedStyle(style.name)}
              className={`group relative overflow-hidden rounded-2xl border transition ${
                selectedStyle === style.name
                  ? 'border-fuchsia-500 ring-1 ring-fuchsia-500'
                  : 'border-white/10'
              }`}
            >
              <img
                src={style.image}
                alt={style.name}
                className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {style.name}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {style.description}
                    </p>
                  </div>

                  {selectedStyle === style.name && (
                    <div className="rounded-full bg-fuchsia-500 p-1.5 text-white">
                      <Check size={12} />
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
          Workspace
        </p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Mis proyectos
        </h2>
      </div>

      <button
        onClick={() => setActiveTab('studio')}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] py-10 text-sm font-semibold text-slate-400 transition hover:border-fuchsia-500 hover:text-fuchsia-400"
      >
        <Plus size={20} />
        Crear nuevo proyecto
      </button>

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-fuchsia-500/10 p-3 text-fuchsia-400">
            <Film size={24} />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-white">Mi primer proyecto</h3>
            <p className="text-xs text-slate-500">
              Proyecto de prueba · Guardado automáticamente
            </p>
          </div>

          <ChevronRight className="text-slate-600" size={20} />
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
          Biblioteca
        </p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Recursos creativos
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSelectedTool('characters')}
          className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-left transition hover:border-fuchsia-500/50"
        >
          <UserRound className="mb-4 text-fuchsia-400" />
          <h3 className="font-bold text-white">Personajes</h3>
          <p className="mt-1 text-xs text-slate-500">
            Fichas y referencias
          </p>
        </button>

        <button
          onClick={() => setSelectedTool('scenes')}
          className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-left transition hover:border-purple-500/50"
        >
          <Globe className="mb-4 text-purple-400" />
          <h3 className="font-bold text-white">Escenarios</h3>
          <p className="mt-1 text-xs text-slate-500">
            Mundos y fondos
          </p>
        </button>

        <button
          onClick={() => setSelectedTool('audio')}
          className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-left transition hover:border-fuchsia-500/50"
        >
          <Music className="mb-4 text-fuchsia-400" />
          <h3 className="font-bold text-white">Audio</h3>
          <p className="mt-1 text-xs text-slate-500">
            Música y efectos
          </p>
        </button>

        <button
          onClick={() => setActiveTab('styles')}
          className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-left transition hover:border-purple-500/50"
        >
          <Palette className="mb-4 text-purple-400" />
          <h3 className="font-bold text-white">Estilos</h3>
          <p className="mt-1 text-xs text-slate-500">
            Dirección artística
          </p>
        </button>
      </div>
    </div>
  );

  const renderStyles = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
          Style Lab
        </p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Catálogo de estilos
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {styles.map((style) => (
          <button
            key={style.name}
            onClick={() => {
              setSelectedStyle(style.name);
              setActiveTab('studio');
            }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-left transition hover:border-fuchsia-500/50"
          >
            <img
              src={style.image}
              alt={style.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-3">
              <h3 className="font-bold text-white">{style.name}</h3>
              <p className="mt-1 text-xs text-slate-500">
                {style.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pb-24 text-slate-100">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-fuchsia-600 to-purple-600 p-2.5 shadow-lg shadow-fuchsia-900/30">
              <Clapperboard size={21} />
            </div>

            <div>
              <h1 className="text-base font-black tracking-tight text-white">
                OIIOII <span className="text-fuchsia-500">STUDIO</span>
              </h1>

              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Creative AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Próximamente: planes y funciones Premium.')}
              className="flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1.5 text-[10px] font-bold text-fuchsia-400"
            >
              <Crown size={13} />
              PRO
            </button>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {showMenu && (
          <div className="mx-auto mt-3 max-w-6xl rounded-2xl border border-white/10 bg-slate-900 p-2">
            <button
              onClick={() => {
                setShowMenu(false);
                alert('Configuración próximamente.');
              }}
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm text-slate-300 hover:bg-white/5"
            >
              <Settings size={18} />
              Configuración
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                alert('Perfil próximamente.');
              }}
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm text-slate-300 hover:bg-white/5"
            >
              <UserRound size={18} />
              Mi cuenta
            </button>
          </div>
        )}
      </header>

      {/* CONTENIDO */}
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        {activeTab === 'studio' && renderStudio()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'library' && renderLibrary()}
        {activeTab === 'styles' && renderStyles()}
      </main>

      {/* MODAL DE HERRAMIENTA */}
      {selectedTool && (
        <div className="f
