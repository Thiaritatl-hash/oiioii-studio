import React, { useState } from 'react';
import { Clapperboard, Sparkles, Wand2, Film, Video, Layers, Download, CheckCircle, Crown } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [scriptText, setScriptText] = useState('');
  const [generating, setGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Clapperboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">
              Animation Studio AI
            </h1>
            <p className="text-xs text-indigo-400 font-medium">Versión Gratuita Activa</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-300 text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Acceso Libre (Sin Pagos)</span>
          </div>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col justify-center">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-400">
            <Sparkles className="w-7 h-7 animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mb-2">Crea tus animaciones sin límites</h2>
          <p className="text-slate-400 text-sm text-center mb-8 max-w-lg mx-auto">
            La aplicación está completamente desbloqueada para uso libre. Escribe tu idea o guion y genera contenido al instante.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Descripción de la animación o guion
              </label>
              <textarea 
                value={scriptText}
                onChange={(e) => setScriptText(e.target.value)}
                placeholder="Ej. Un tierno robot camina por un bosque neón iluminado..."
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition text-sm resize-none"
              />
            </div>

            <button 
              onClick={() => {
                setGenerating(true);
                setTimeout(() => setGenerating(false), 2000);
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
            >
              <Wand2 className="w-5 h-5" />
              <span>{generating ? 'Generando animación...' : 'Generar Animación con IA'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
