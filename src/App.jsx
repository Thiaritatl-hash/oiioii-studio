import React, { useState, useEffect } from "react";
import {
  Clapperboard,
  Sparkles,
  Wand2,
  Image as ImageIcon,
  Download,
  Loader2,
  Lightbulb,
  Palette,
  Smartphone,
  Monitor,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Film,
  Layers,
  History,
  Trash2,
  Play,
  Plus
} from "lucide-react";

const estilos = [
  {
    id: "cinematic",
    nombre: "Cinemático",
    descripcion: "Película de alto presupuesto",
    prompt: "cinematic film still, professional cinematography, dramatic composition, highly detailed",
  },
  {
    id: "anime",
    nombre: "Anime",
    descripcion: "Anime moderno",
    prompt: "high quality modern anime style, detailed anime illustration, cinematic composition",
  },
  {
    id: "pixel",
    nombre: "Pixel Art",
    descripcion: "Arte pixelado",
    prompt: "detailed pixel art, carefully crafted pixels, retro game aesthetic, cinematic composition",
  },
  {
    id: "fantasy",
    nombre: "Fantasía",
    descripcion: "Mundo fantástico",
    prompt: "epic fantasy concept art, magical atmosphere, highly detailed environment, cinematic lighting",
  },
  {
    id: "cyberpunk",
    nombre: "Cyberpunk",
    descripcion: "Neón futurista",
    prompt: "cyberpunk futuristic city, neon lights, rain, atmospheric cinematic lighting, highly detailed",
  },
  {
    id: "ghibli",
    nombre: "Animación artesanal",
    descripcion: "Fantasía dibujada",
    prompt: "hand-drawn animated film aesthetic, whimsical fantasy environment, soft cinematic atmosphere",
  },
];

const iluminaciones = [
  "Cinemática",
  "Neón",
  "Atardecer dorado",
  "Luz suave",
  "Noche",
  "Contraluz dramático",
  "Estudio profesional",
];

const formatos = [
  { id: "16:9", nombre: "Horizontal", icon: Monitor },
  { id: "9:16", nombre: "Vertical", icon: Smartphone },
  { id: "1:1", nombre: "Cuadrado", icon: ImageIcon },
];

const ideas = [
  "Una joven descubre una ciudad escondida debajo de su propia ciudad.",
  "Un robot solitario encuentra una pequeña flor creciendo entre edificios abandonados.",
  "Una exploradora llega a un planeta cubierto completamente por océanos.",
  "Un detective camina bajo la lluvia por una megaciudad iluminada con neón.",
  "Un grupo de amigos descubre una puerta misteriosa dentro de un bosque ancestral.",
  "Una astronauta observa una enorme estructura desconocida flotando sobre un planeta.",
];

export function App() {
  const [activeTab, setActiveTab] = useState("generator"); // 'generator' | 'storyboard' | 'timeline'
  
  const [prompt, setPrompt] = useState("");
  const [estilo, setEstilo] = useState(estilos[0]);
  const [iluminacion, setIluminacion] = useState("Cinemática");
  const [formato, setFormato] = useState("16:9");

  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Historial de creaciones en localStorage
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("oiioii_history");
    return saved ? JSON.parse(saved) : [];
  });

  // Storyboard / Secuencia de escenas
  const [storyboard, setStoryboard] = useState(() => {
    const saved = localStorage.getItem("oiioii_storyboard");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("oiioii_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("oiioii_storyboard", JSON.stringify(storyboard));
  }, [storyboard]);

  const generarIdea = () => {
    const idea = ideas[Math.floor(Math.random() * ideas.length)];
    setPrompt(idea);
    setError("");
  };

  const generarImagen = async (customPrompt = null) => {
    const textoPrompt = customPrompt || prompt;
    if (!textoPrompt.trim()) {
      setError("Escribí una descripción antes de generar la imagen.");
      return;
    }

    setGenerating(true);
    setError("");
    setSuccess(false);
    setGeneratedImage(null);

    const promptFinal = `
Create a high quality original image for an animation production.
Main scene:
${textoPrompt}
Visual style:
${estilo.prompt}
Lighting:
${iluminacion}
Aspect ratio:
${formato}
Important:
Professional composition. Strong visual storytelling. No text, no logos, no watermarks.
`;

    try {
      const response = await fetch("/.netlify/functions/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptFinal }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "No se pudo generar la imagen.");
      }

      if (!data.image) {
        throw new Error("Gemini no devolvió ninguna imagen.");
      }

      const mimeType = data.mimeType || "image/png";
      const imageUrl = `data:${mimeType};base64,${data.image}`;

      setGeneratedImage(imageUrl);
      setSuccess(true);

      // Agregar al historial
      const newItem = {
        id: Date.now(),
        url: imageUrl,
        prompt: textoPrompt,
        estilo: estilo.nombre,
        formato,
      };
      setHistory((prev) => [newItem, ...prev]);

    } catch (err) {
      console.error(err);
      setError(err.message || "Ocurrió un error al conectar con el generador de IA.");
    } finally {
      setGenerating(false);
    }
  };

  const agregarAStoryboard = () => {
    if (!generatedImage) return;
    const nuevaEscena = {
      id: Date.now(),
      url: generatedImage,
      prompt: prompt || "Escena sin título",
      duracion: "3s"
    };
    setStoryboard((prev) => [...prev, nuevaEscena]);
  };

  const descargarImagen = (url) => {
    const targetUrl = url || generatedImage;
    if (!targetUrl) return;

    const link = document.createElement("a");
    link.href = targetUrl;
    link.download = `oiioii-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hacerVariacion = (nuevoEstiloId) => {
    const estiloEncontrado = estilos.find(e => e.id === nuevoEstiloId);
    if (estiloEncontrado) {
      setEstilo(estiloEncontrado);
      generarImagen();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-black tracking-tight text-lg">
                  OIIOII <span className="text-pink-500">STUDIO</span>
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                  AI Creative Studio
                </p>
              </div>
            </div>

            {/* Pestañas mobile */}
            <div className="flex sm:hidden gap-1 bg-zinc-900 p-1 rounded-xl">
              <button onClick={() => setActiveTab("generator")} className={`p-2 rounded-lg text-xs ${activeTab === "generator" ? "bg-pink-600 text-white" : "text-zinc-400"}`}><Wand2 className="w-4 h-4" /></button>
              <button onClick={() => setActiveTab("storyboard")} className={`p-2 rounded-lg text-xs ${activeTab === "storyboard" ? "bg-pink-600 text-white" : "text-zinc-400"}`}><Film className="w-4 h-4" /></button>
            </div>
          </div>

          {/* NAVEGACION DE PESTAÑAS */}
          <div className="hidden sm:flex items-center gap-1 bg-zinc-950 border border-zinc-900 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab("generator")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "generator" ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Wand2 className="w-4 h-4" />
              Generador IA
            </button>
            <button
              onClick={() => setActiveTab("storyboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "storyboard" ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Film className="w-4 h-4" />
              Storyboard & Timeline ({storyboard.length})
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 rounded-full px-3 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            IA conectada
          </div>

        </div>
      </header>


      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {activeTab === "generator" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* TITULO SECCION */}
            <div>
              <div className="flex items-center gap-2 text-pink-500 text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4" />
                Estudio de Creación Visual
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Diseñá mundos para animación.
              </h2>
            </div>

            {/* GENERADOR GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* PANEL DE CONTROLES */}
              <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 sm:p-6 space-y-5">

                <div className="flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2 text-sm">
                    <Wand2 className="w-4 h-4 text-pink-500" />
                    Parámetros de Escena
                  </h3>
                  <button
                    onClick={generarIdea}
                    className="text-xs text-zinc-500 hover:text-pink-400 transition flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Idea al azar
                  </button>
                </div>

                {/* PROMPT */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Descripción del Concepto
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      setError("");
                    }}
                    placeholder="Describí tu personaje, escena o atmósfera..."
                    className="w-full h-28 bg-black border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500 transition resize-none"
                  />
                </div>

                {/* ESTILO */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    <Palette className="w-3.5 h-3.5 inline mr-1" />
                    Estilo Artístico
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {estilos.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setEstilo(item)}
                        className={`text-left p-2.5 rounded-xl border transition ${
                          estilo.id === item.id
                            ? "border-pink-500 bg-pink-500/10"
                            : "border-zinc-800 bg-black hover:border-zinc-600"
                        }`}
                      >
                        <div className="text-xs font-semibold">{item.nombre}</div>
                        <div className="text-[10px] text-zinc-500 truncate mt-0.5">{item.descripcion}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ILUMINACION Y FORMATO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      <Lightbulb className="w-3.5 h-3.5 inline mr-1" />
                      Iluminación
                    </label>
                    <select
                      value={iluminacion}
                      onChange={(e) => setIluminacion(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-pink-500"
                    >
                      {iluminaciones.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Formato
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {formatos.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setFormato(item.id)}
                            className={`p-2 rounded-lg border text-center transition ${
                              formato === item.id
                                ? "border-purple-500 bg-purple-500/10 text-purple-300"
                                : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 mx-auto mb-0.5" />
                            <span className="block text-[9px] font-semibold">{item.id}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 text-xs flex gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={() => generarImagen()}
                  disabled={generating}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-pink-500/10 transition"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generando fotograma...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generar con IA
                    </>
                  )}
                </button>

              </div>

              {/* PREVISUALIZACION */}
              <div className="lg:col-span-3 bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden flex flex-col justify-between">

                <div className="border-b border-zinc-900 px-5 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm">Visualizador de Salida</h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{estilo.nombre} · {formato} · {iluminacion}</p>
                  </div>

                  {generatedImage && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={agregarAStoryboard}
                        className="px-3 py-1.5 rounded-lg bg-pink-600/20 border border-pink-500/30 text-pink-300 hover:bg-pink-600/30 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        A Storyboard
                      </button>
                      <button
                        onClick={() => descargarImagen()}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Guardar
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col items-center justify-center min-h-[400px]">
                  {generating ? (
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto">
                        <Sparkles className="w-7 h-7 text-pink-500 animate-pulse" />
                      </div>
                      <h4 className="font-bold text-sm">Renderizando escena con IA...</h4>
                      <p className="text-xs text-zinc-500">Interpretando iluminación y estilo cinemático.</p>
                    </div>
                  ) : generatedImage ? (
                    <div className="w-full flex flex-col items-center space-y-4">
                      <img
                        src={generatedImage}
                        alt="Fotograma generado"
                        className="max-h-[450px] object-contain rounded-xl border border-zinc-800 shadow-2xl"
                      />

                      {/* Variaciones de estilo rápidas */}
                      <div className="w-full bg-zinc-900/60 border border-zinc-800 p-3 rounded-xl flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-zinc-400 font-semibold">Variaciones rápidas:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {estilos.filter(e => e.id !== estilo.id).slice(0, 3).map(est => (
                            <button
                              key={est.id}
                              onClick={() => hacerVariacion(est.id)}
                              className="px-2.5 py-1 bg-black border border-zinc-800 hover:border-pink-500 text-[10px] rounded-lg transition"
                            >
                              Cambiar a {est.nombre}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center max-w-sm space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
                        <ImageIcon className="w-7 h-7 text-zinc-600" />
                      </div>
                      <h4 className="font-bold text-zinc-400 text-sm">Sin fotograma activo</h4>
                      <p className="text-xs text-zinc-600">Escribí una idea y generá tu primer concepto visual.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* IDEAS RAPIDAS */}
            <section className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-zinc-300">Inspiración instantánea</h3>
                <span className="text-[10px] text-zinc-500">Hacé clic para cargar el prompt</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ideas.map((idea, index) => (
                  <button
                    key={index}
                    onClick={() => { setPrompt(idea); setError(""); }}
                    className="text-left p-3.5 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/50 transition group flex flex-col justify-between"
                  >
                    <p className="text-xs text-zinc-400 group-hover:text-white transition line-clamp-2">"{idea}"</p>
                    <span className="text-[10px] text-pink-500/80 font-semibold mt-2 flex items-center gap-1">Usar idea →</span>
                  </button>
                ))}
              </div>
            </section>

          </div>
        )}

        {activeTab === "storyboard" && (
          <div className="space-y-8 animate-fadeIn">

            {/* CABECERA STORYBOARD */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
              <div>
                <div className="flex items-center gap-2 text-pink-500 text-xs font-bold uppercase tracking-widest mb-1">
                  <Film className="w-4 h-4" />
                  Secuencia de Animación
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Storyboard & Línea de Tiempo</h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStoryboard([])}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-red-400 transition flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpiar Secuencia
                </button>
                <button
                  onClick={() => alert("Simulando exportación de secuencia de video...")}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-xs font-bold flex items-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Exportar Video Premiere
                </button>
              </div>
            </div>

            {/* GRILLA DE ESCENAS EN SECUENCIA */}
            {storyboard.length === 0 ? (
              <div className="text-center py-20 bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
                <Film className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <h3 className="font-bold text-zinc-300">Tu storyboard está vacío</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                  Generá imágenes en la pestaña de IA y agregalas al storyboard para armar tu secuencia audiovisual.
                </p>
                <button
                  onClick={() => setActiveTab("generator")}
                  className="mt-4 px-4 py-2 rounded-xl bg-pink-600 text-xs font-bold text-white shadow-md"
                >
                  Ir al Generador
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {storyboard.map((escena, idx) => (
                    <div key={escena.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden group">
                      <div className="relative aspect-video bg-black">
                        <img src={escena.url} alt={`Escena ${idx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded-md text-[10px] font-bold text-pink-400 border border-zinc-800">
                          Escena {idx + 1}
                        </span>
                      </div>
                      <div className="p-3.5 space-y-2">
                        <p className="text-xs text-zinc-300 line-clamp-2">"{escena.prompt}"</p>
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-[10px] text-zinc-500">
                          <span>Duración: {escena.duracion}</span>
                          <button
                            onClick={() => setStoryboard(storyboard.filter(s => s.id !== escena.id))}
                            className="hover:text-red-400 transition"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SIMULADOR DE TIMELINE ESTILO PREMIERE */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-pink-500" />
                      Línea de tiempo de video (Multi-pista)
                    </span>
                    <span className="text-[10px] text-zinc-500">Total clips: {storyboard.length}</span>
                  </div>

                  <div className="bg-black border border-zinc-900 rounded-xl p-4 overflow-x-auto">
                    <div className="min-w-[600px] space-y-2">
                      <div className="flex items-center gap-2 text-[10px] text-zinc-600 border-b border-zinc-900 pb-1">
                        <span className="w-20">Video 1</span>
                        <div className="flex-1 flex gap-1">
                          {storyboard.map((_, i) => (
                            <div key={i} className="flex-1 bg-pink-600/20 border border-pink-500/40 rounded h-8 flex items-center px-2 text-pink-300 text-[10px] font-bold">
                              Clip_0{i + 1}.mp4
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                        <span className="w-20">Audio 1</span>
                        <div className="flex-1 bg-purple-600/10 border border-purple-500/20 rounded h-6 flex items-center px-2 text-purple-400 text-[10px]">
                          BGM_Cinematic_Ambient.wav
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}
