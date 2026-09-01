import React, { useState } from "react";
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
  {
    id: "16:9",
    nombre: "Horizontal",
    icon: Monitor,
  },
  {
    id: "9:16",
    nombre: "Vertical",
    icon: Smartphone,
  },
  {
    id: "1:1",
    nombre: "Cuadrado",
    icon: ImageIcon,
  },
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
  const [prompt, setPrompt] = useState("");
  const [estilo, setEstilo] = useState(estilos[0]);
  const [iluminacion, setIluminacion] = useState("Cinemática");
  const [formato, setFormato] = useState("16:9");

  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const generarIdea = () => {
    const idea = ideas[Math.floor(Math.random() * ideas.length)];
    setPrompt(idea);
    setError("");
  };

  const generarImagen = async () => {
    if (!prompt.trim()) {
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
${prompt}

Visual style:
${estilo.prompt}

Lighting:
${iluminacion}

Aspect ratio:
${formato}

Important:
Professional composition.
Strong visual storytelling.
Detailed characters and environment.
Consistent anatomy.
Cinematic framing.
High quality rendering.
No text, no logos, no watermarks.
`;

    try {
      const response = await fetch("/.netlify/functions/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptFinal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "No se pudo generar la imagen."
        );
      }

      if (!data.image) {
        throw new Error("Gemini no devolvió ninguna imagen.");
      }

      const mimeType = data.mimeType || "image/png";

      setGeneratedImage(
        `data:${mimeType};base64,${data.image}`
      );

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Ocurrió un error al conectar con el generador de IA."
      );
    } finally {
      setGenerating(false);
    }
  };

  const descargarImagen = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `oiioii-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

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

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 rounded-full px-3 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            IA conectada
          </div>

        </div>
      </header>


      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* TITULO */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-pink-500 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            Generador creativo
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Creá cualquier cosa con IA.
          </h2>

          <p className="text-zinc-500 mt-2 text-sm sm:text-base max-w-2xl">
            Diseñá personajes, escenarios, concept art e imágenes para tus
            proyectos de animación.
          </p>
        </div>


        {/* GENERADOR */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* PANEL DE CONTROLES */}
          <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 sm:p-6">

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-pink-500" />
                Crear imagen
              </h3>

              <button
                onClick={generarIdea}
                className="text-xs text-zinc-500 hover:text-pink-400 transition flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Idea
              </button>
            </div>


            {/* PROMPT */}
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              ¿Qué querés crear?
            </label>

            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setError("");
              }}
              placeholder="Describí tu escena, personaje o idea..."
              className="w-full h-32 bg-black border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500 transition resize-none"
            />


            {/* ESTILO */}
            <div className="mt-5">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <Palette className="w-3.5 h-3.5 inline mr-1" />
                Estilo
              </label>

              <div className="grid grid-cols-2 gap-2">
                {estilos.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEstilo(item)}
                    className={`text-left p-3 rounded-xl border transition ${
                      estilo.id === item.id
                        ? "border-pink-500 bg-pink-500/10"
                        : "border-zinc-800 bg-black hover:border-zinc-600"
                    }`}
                  >
                    <div className="text-sm font-semibold">
                      {item.nombre}
                    </div>

                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      {item.descripcion}
                    </div>
                  </button>
                ))}
              </div>
            </div>


            {/* ILUMINACION */}
            <div className="mt-5">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <Lightbulb className="w-3.5 h-3.5 inline mr-1" />
                Iluminación
              </label>

              <select
                value={iluminacion}
                onChange={(e) => setIluminacion(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:border-pink-500"
              >
                {iluminaciones.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>


            {/* FORMATO */}
            <div className="mt-5">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Formato
              </label>

              <div className="grid grid-cols-3 gap-2">
                {formatos.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setFormato(item.id)}
                      className={`p-3 rounded-xl border text-center transition ${
                        formato === item.id
                          ? "border-purple-500 bg-purple-500/10 text-purple-300"
                          : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                      }`}
                    >
                      <Icon className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px] font-semibold">
                        {item.nombre}
                      </span>
                      <span className="block text-[9px] opacity-60 mt-0.5">
                        {item.id}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>


            {/* ERROR */}
            {error && (
              <div className="mt-5 p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 text-xs flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}


            {/* BOTON */}
            <button
              onClick={generarImagen}
              disabled={generating}
              className="w-full mt-5 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-pink-500/10 transition"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generando imagen...
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
          <div className="lg:col-span-3 bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden min-h-[420px]">

            <div className="border-b border-zinc-900 px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">
                  Resultado
                </h3>

                <p className="text-[10px] text-zinc-600 mt-0.5">
                  {estilo.nombre} · {formato}
                </p>
              </div>

              {generatedImage && (
                <button
                  onClick={descargarImagen}
                  className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  Guardar
                </button>
              )}
            </div>


            <div className="p-4 h-[calc(100%-69px)] min-h-[350px] flex items-center justify-center">

              {generating ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-pink-500 animate-pulse" />
                  </div>

                  <h4 className="font-bold">
                    Creando tu imagen...
                  </h4>

                  <p className="text-xs text-zinc-600 mt-1">
                    La IA está interpretando tu dirección artística.
                  </p>
                </div>
              ) : generatedImage ? (
                <div className="w-full h-full flex flex-col items-center justify-center">

                  <img
                    src={generatedImage}
                    alt="Imagen generada por Oiioii Studio"
                    className="max-w-full max-h-[500px] object-contain rounded-xl border border-zinc-800 shadow-2xl"
                  />

                  {success && (
                    <div className="mt-3 text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Imagen generada correctamente
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center max-w-sm">

                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-7 h-7 text-zinc-700" />
                  </div>

                  <h4 className="font-bold text-zinc-400">
                    Tu creación aparecerá acá
                  </h4>

                  <p className="text-xs text-zinc-600 mt-2">
                    Escribí una idea, elegí un estilo y presioná
                    "Generar con IA".
                  </p>

                </div>
              )}

            </div>
          </div>

        </div>


        {/* IDEAS RAPIDAS */}
        <section className="mt-8">

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">
              Ideas rápidas
            </h3>

            <span className="text-xs text-zinc-600">
              Tocá una para usarla
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {ideas.map((idea, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrompt(idea);
                  setError("");
                }}
                className="text-left p-4 rounded-xl border border-zinc-900 bg-z
