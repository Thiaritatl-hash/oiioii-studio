import React, { useEffect, useMemo, useState } from "react";
import {
  Home,
  Sparkles,
  Wand2,
  Film,
  FolderOpen,
  Library,
  Palette,
  Image as ImageIcon,
  Video,
  Upload,
  Dice5,
  ChevronRight,
  ChevronLeft,
  Play,
  Plus,
  Trash2,
  Download,
  Sun,
  Contrast,
  Thermometer,
  Droplets,
  SlidersHorizontal,
  Layers,
  Type,
  Eraser,
  Crop,
  RotateCw,
  Maximize2,
  Check,
  Clock3,
  Camera,
  Clapperboard,
  UserRound,
  Map,
  Crown,
  Settings2,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   OIIOII STUDIO
   Primera versión funcional - Mobile First
   ========================================================= */

const styles = [
  {
    id: "anime",
    name: "Anime",
    category: "Ilustración",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=900&auto=format&fit=crop",
    prompt: "anime cinematográfico, líneas limpias, expresiones dinámicas",
  },
  {
    id: "pixel",
    name: "Pixel Art",
    category: "Retro",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=900&auto=format&fit=crop",
    prompt: "pixel art detallado, estética retro, iluminación de videojuego",
  },
  {
    id: "3d",
    name: "3D Cinemático",
    category: "Render",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=900&auto=format&fit=crop",
    prompt: "animación 3D cinematográfica, materiales detallados, iluminación profesional",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    category: "Cinemático",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=900&auto=format&fit=crop",
    prompt: "cyberpunk, neón, lluvia, ciudad futurista, ambiente cinematográfico",
  },
  {
    id: "fantasy",
    name: "Fantasía",
    category: "Fantástico",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop",
    prompt: "fantasía cinematográfica, naturaleza mágica, luz volumétrica",
  },
  {
    id: "comic",
    name: "Cómic",
    category: "Ilustración",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=900&auto=format&fit=crop",
    prompt: "comic book, tinta marcada, colores intensos, composición dramática",
  },
];

const randomPrompts = [
  "Una exploradora descubre una ciudad flotante sobre las nubes al amanecer.",
  "Un pequeño robot atraviesa un bosque iluminado por criaturas bioluminiscentes.",
  "Una detective camina bajo la lluvia por una megaciudad cyberpunk.",
  "Dos viajeros encuentran una estación espacial abandonada en los límites de la galaxia.",
  "Un guerrero protege una aldea mientras aparece una enorme luna roja.",
  "Una adolescente descubre que las pinturas de su habitación cobran vida durante la noche.",
];

const toolGroups = [
  {
    title: "Imagen",
    tools: [
      { id: "brightness", label: "Brillo", icon: Sun },
      { id: "contrast", label: "Contraste", icon: Contrast },
      { id: "temperature", label: "Temperatura", icon: Thermometer },
      { id: "saturation", label: "Saturación", icon: Droplets },
    ],
  },
  {
    title: "Transformar",
    tools: [
      { id: "crop", label: "Recortar", icon: Crop },
      { id: "rotate", label: "Rotar", icon: RotateCw },
      { id: "resize", label: "Tamaño", icon: Maximize2 },
    ],
  },
  {
    title: "Creativo",
    tools: [
      { id: "layers", label: "Capas", icon: Layers },
      { id: "text", label: "Texto", icon: Type },
      { id: "remove-bg", label: "Quitar fondo", icon: Eraser },
    ],
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("anime");
  const [generationType, setGenerationType] = useState("image");
  const [aspect, setAspect] = useState("16:9");
  const [duration, setDuration] = useState("10s");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);

  const [projects, setProjects] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("oiioii-projects") || "[]");
    } catch {
      return [];
    }
  });

  const [editorImage, setEditorImage] = useState(
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop"
  );

  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    temperature: 0,
    saturation: 100,
  });

  const [activeTool, setActiveTool] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    localStorage.setItem("oiioii-projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => setNotification(""), 2500);
    return () => clearTimeout(timer);
  }, [notification]);

  const selectedStyleData = useMemo(
    () => styles.find((style) => style.id === selectedStyle),
    [selectedStyle]
  );

  function showNotification(message) {
    setNotification(message);
  }

  function randomPrompt() {
    const value =
      randomPrompts[Math.floor(Math.random() * randomPrompts.length)];

    setPrompt(value);
    showNotification("Idea cinematográfica generada ✨");
  }

  function selectStyle(style) {
    setSelectedStyle(style.id);

    if (!prompt.trim()) {
      setPrompt(style.prompt);
    }

    showNotification(`${style.name} seleccionado`);
  }

  function handleGenerate() {
    if (!prompt.trim()) {
      showNotification("Escribí una idea antes de generar.");
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      const newProject = {
        id: Date.now(),
        title: prompt.slice(0, 42) + (prompt.length > 42 ? "…" : ""),
        prompt,
        style: selectedStyleData.name,
        type: generationType,
        aspect,
        duration,
        image: selectedStyleData.image,
        createdAt: new Date().toLocaleString("es-AR"),
      };

      setProjects((prev) => [newProject, ...prev]);

      setGenerated(newProject);
      setGenerating(false);

      showNotification("Producción creada correctamente 🎬");
    }, 1800);
  }

  function deleteProject(id) {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    showNotification("Proyecto eliminado");
  }

  function loadProject(project) {
    setPrompt(project.prompt);
    setSelectedStyle(
      styles.find((style) => style.name === project.style)?.id || "anime"
    );
    setGenerationType(project.type || "image");
    setAspect(project.aspect || "16:9");
    setDuration(project.duration || "10s");

    setActiveTab("create");
    showNotification("Proyecto cargado en el Studio");
  }

  function updateAdjustment(key, value) {
    setAdjustments((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  }

  function handleEditorTool(tool) {
    setActiveTool(tool.id);

    if (tool.id === "remove-bg") {
      showNotification("Herramienta IA de quitar fondo preparada");
    } else if (tool.id === "text") {
      showNotification("Herramienta de texto activada");
    } else if (tool.id === "layers") {
      showNotification("Panel de capas activado");
    } else if (tool.id === "crop") {
      showNotification("Modo recorte activado");
    } else if (tool.id === "rotate") {
      showNotification("Imagen rotada 90°");
      setEditorImage(
        `${editorImage}${editorImage.includes("?") ? "&" : "?"}rotate=90`
      );
    } else if (tool.id === "resize") {
      showNotification("Herramienta de tamaño activada");
    }
  }

  const editorFilter = {
    filter: `
      brightness(${adjustments.brightness}%)
      contrast(${adjustments.contrast}%)
      saturate(${adjustments.saturation}%)
      sepia(${Math.max(0, adjustments.temperature / 5)}%)
    `,
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-24">
      {/* =====================================================
          HEADER
         ===================================================== */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-600 to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-900/30">
              <Clapperboard className="w-5 h-5" />
            </div>

            <div className="text-left">
              <h1 className="font-black tracking-tight">
                OIIOII <span className="text-fuchsia-500">STUDIO</span>
              </h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                AI Creative Studio
              </p>
            </div>
          </button>

          <button
            onClick={() => showNotification("Cuenta preparada para Premium")}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 text-xs font-bold"
          >
            <Crown className="w-4 h-4" />
            PRO
          </button>
        </div>
      </header>

      {/* =====================================================
          NOTIFICACIÓN
         ===================================================== */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-xl shadow-2xl text-sm flex items-center gap-2 max-w-[90%]">
          <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* =====================================================
          CONTENIDO
         ===================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ========================= HOME ========================= */}
        {activeTab === "home" && (
          <div className="space-y-8">
            <section className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-6 sm:p-10">
              <div className="absolute -top-32 -right-20 w-80 h-80 bg-fuchsia-600/15 blur-3xl rounded-full" />
              <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-purple-600/10 blur-3xl rounded-full" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-xs font-bold mb-5">
                  <Zap className="w-3.5 h-3.5" />
                  STUDIO IA
                </div>

                <h2 className="text-3xl sm:text-5xl font-black leading-tight max-w-3xl">
                  Convertí tus ideas en{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">
                    imágenes, escenas y películas.
                  </span>
                </h2>

                <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                  Un espacio creativo pensado para crear desde el celular:
                  generación IA, edición visual, estilos, personajes,
                  escenarios y proyectos cinematográficos.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-7">
                  <button
                    onClick={() => setActiveTab("create")}
                    className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 font-bold shadow-lg shadow-fuchsia-900/30 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Empezar a crear
                  </button>

                  <button
                    onClick={() => setActiveTab("editor")}
                    className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 font-bold flex items-center justify-center gap-2"
                  >
                    <Palette className="w-5 h-5" />
                    Abrir editor
                  </button>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle
                icon={<Sparkles className="w-5 h-5" />}
                title="¿Qué querés crear?"
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <QuickAction
                  icon={<ImageIcon />}
                  title="Imagen IA"
                  text="Crear una imagen"
                  onClick={() => {
                    setGenerationType("image");
                    setActiveTab("create");
                  }}
                />

                <QuickAction
                  icon={<Video />}
                  title="Video IA"
                  text="Crear una escena"
                  onClick={() => {
                    setGenerationType("video");
                    setActiveTab("create");
                  }}
                />

                <QuickAction
                  icon={<Film />}
                  title="Película"
                  text="Planificar proyecto"
                  onClick={() => {
                    setDuration("100+ min");
                    setActiveTab("create");
                  }}
                />

                <QuickAction
                  icon={<Palette />}
                  title="Editar"
                  text="Editar una imagen"
                  onClick={() => setActiveTab("editor")}
                />
              </div>
            </section>

            <section>
              <SectionTitle
                icon={<Palette className="w-5 h-5" />}
                title="Estilos populares"
                action="Ver todos"
                onAction={() => setActiveTab("styles")}
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {styles.map((style) => (
                  <StyleCard
                    key={style.id}
                    style={style}
                    compact
                    onClick={() => {
                      selectStyle(style);
                      setActiveTab("create");
                    }}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================= CREATE ========================= */}
        {activeTab === "create" && (
          <div className="space-y-6">
            <PageHeader
              title="Crear con IA"
              subtitle="Diseñá tu escena y prepará la generación."
              icon={<Sparkles />}
            />

            <section className="grid lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-5">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold">
                      Describí tu escena
                    </label>

                    <button
                      onClick={randomPrompt}
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-fuchsia-400"
                      title="Idea aleatoria"
                    >
                      <Dice5 className="w-5 h-5" />
                    </button>
                  </div>

                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ej. Una joven camina por una megaciudad cyberpunk durante una tormenta, luces de neón reflejadas en el pavimento..."
                    className="w-full min-h-36 bg-black border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-fuchsia-500 resize-none"
                  />

                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      "Cinemático",
                      "Iluminación dramática",
                      "Plano general",
                      "Alta calidad",
                    ].map((tag) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setPrompt((prev) =>
                            prev
                              ? `${prev}, ${tag.toLowerCase()}`
                              : tag.toLowerCase()
                          )
                        }
                        className="text-xs px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4 sm:p-6">
                  <label className="text-sm font-bold block mb-3">
                    Referencia visual
                  </label>

                  <label className="border-2 border-dashed border-zinc-800 hover:border-fuchsia-500 rounded-xl min-h-32 flex flex-col items-center justify-center text-center cursor-pointer transition">
                    <Upload className="w-7 h-7 text-zinc-600 mb-2" />
                    <span className="text-sm text-zinc-300">
                      Subir imagen o video
                    </span>
                    <span className="text-xs text-zinc-600 mt-1">
                      JPG, PNG, WEBP, MP4
                    </span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          showNotification(
                            `Referencia "${e.target.files[0].name}" cargada`
                          );
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4">
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                    Tipo
                  </label>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <ChoiceButton
                      active={generationType === "image"}
                      icon={<ImageIcon />}
                      text="Imagen"
                      onClick={() => setGenerationType("image")}
                    />
                    <ChoiceButton
                      active={generationType === "video"}
                      icon={<Video />}
                      text="Video"
                      onClick={() => setGenerationType("video")}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4">
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                    Estilo
                  </label>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => selectStyle(style)}
                        className={`relative overflo
