import { useState } from 'react';
import { 
  Play, 
  Plus, 
  Layers, 
  Scissors, 
  Type, 
  Image as ImageIcon, 
  Music,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Loader2,
  ExternalLink
} from 'lucide-react';

const templates = [
  { id: 1, name: 'Minimalist Tech', category: 'Tech', duration: '60s', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimalist%20tech%20office%20setup%20clean%20aesthetic&image_size=square' },
  { id: 2, name: 'Vibrant Gaming', category: 'Gaming', duration: '30s', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=neon%20gaming%20setup%20vibrant%20colors%20professional&image_size=square' },
  { id: 3, name: 'Educational Explainer', category: 'Education', duration: '90s', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20educational%20graphics%20clean%20design&image_size=square' },
  { id: 4, name: 'Cinematic Lifestyle', category: 'Lifestyle', duration: '60s', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20lifestyle%20morning%20routine%20warm%20lighting&image_size=square' },
];

export default function VideoCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoResult, setAutoResult] = useState<any>(null);

  const handleAutoGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setAutoResult(null);
    
    try {
       const response = await fetch('http://localhost:3001/api/automation/one-click', {
         method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic, 
          platform: 'youtube_shorts', 
          tone: 'energetic' 
        }),
      });
      const data = await response.json();
      if (data.success) {
        setAutoResult(data);
      } else {
        alert(data.error || 'Failed to automate video');
      }
    } catch (error) {
      console.error('Automation error:', error);
      alert('An error occurred during automation.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Video Creator</h1>
          <p className="text-gray-400">Choose a viral template or start from scratch.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg">
          <Plus size={20} />
          Blank Project
        </button>
      </div>

      {/* One-Click Automation Section */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap size={120} className="text-yellow-400" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse">
              Magic AI
            </span>
            <h2 className="text-2xl font-black italic tracking-tight">ONE-CLICK AUTOMATION</h2>
          </div>
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">
            Enter your topic, and our AI will automatically generate the hook, script, voiceover, and video—then upload it directly to YouTube or TikTok.
          </p>
          
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Ex: 'The future of AI in 2026' or 'Best gaming setups'"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button 
              onClick={handleAutoGenerate}
              disabled={isGenerating || !topic}
              className="bg-white text-black hover:bg-purple-400 hover:text-white px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap size={18} fill="currentColor" />
                  MAGIC GENERATE
                </>
              )}
            </button>
          </div>

          {autoResult && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl animate-in zoom-in duration-300">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm mb-2">
                <CheckCircle2 size={18} />
                Video Generated & Uploaded!
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-300 line-clamp-1 italic">"{autoResult.script}"</p>
                </div>
                <a 
                  href={autoResult.publicUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  View Video
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Template Selection */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles size={20} className="text-purple-500" />
              Viral Templates
            </h2>
            <div className="flex gap-2">
              {['All', 'Tech', 'Gaming', 'Education', 'Lifestyle'].map(cat => (
                <button key={cat} className="px-4 py-1.5 rounded-full text-xs font-medium bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all border border-gray-700">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div 
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedTemplate === template.id ? 'border-purple-500 shadow-2xl' : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="relative aspect-[9/16] bg-gray-900 overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">{template.category}</p>
                    <h4 className="font-bold text-lg leading-tight mb-2">{template.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                      <span>{template.duration}</span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span>Used 12.4k times</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black transform scale-90 group-hover:scale-100 transition-transform">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Editor Tools</h3>
            <div className="space-y-3">
              {[
                { icon: Scissors, label: 'Smart Trim', desc: 'AI auto-cut hooks' },
                { icon: Layers, label: 'Transitions', desc: 'Dynamic scene shifts' },
                { icon: Type, label: 'Auto Captions', desc: '20+ styles available' },
                { icon: ImageIcon, label: 'Media Library', desc: 'Stock footage & images' },
                { icon: Music, label: 'Audio Engine', desc: 'Trending bg music' },
              ].map((tool) => (
                <button 
                  key={tool.label}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-purple-500/50 transition-all group text-left"
                >
                  <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-purple-600 transition-colors">
                    <tool.icon size={18} className="text-gray-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm group-hover:text-white transition-colors">{tool.label}</p>
                    <p className="text-[10px] text-gray-500">{tool.desc}</p>
                  </div>
                  <ChevronRight size={14} className="ml-auto text-gray-600 group-hover:text-purple-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-sm font-bold mb-4">Current Selection</h3>
            {selectedTemplate ? (
              <div className="space-y-4">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                   <img 
                    src={templates.find(t => t.id === selectedTemplate)?.image} 
                    className="w-full h-full object-cover"
                   />
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-bold transition-all active:scale-95">
                  Use This Template
                </button>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">Select a template to preview settings.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
