import { useState } from 'react';
import { Zap, Copy, RefreshCw, Send, Check } from 'lucide-react';

const mockHooks = [
  { id: 1, text: "The secret to 10x your productivity that nobody is telling you...", score: 98 },
  { id: 2, text: "I tried every AI tool for a week, and this one changed everything.", score: 95 },
  { id: 3, text: "Stop doing this if you want to grow your YouTube channel in 2026.", score: 92 },
  { id: 4, text: "Why most creators fail in their first 3 months (and how to avoid it).", score: 89 },
];

export default function HookGenerator() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [hooks, setHooks] = useState(mockHooks);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/hooks/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      if (data.success) {
        setHooks(data.hooks.map((h: any, i: number) => ({ id: i + 1, ...h })));
      }
    } catch (error) {
      console.error('Error generating hooks:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">AI Hook Generator</h1>
        <p className="text-gray-400">Enter your video topic and let AI craft the perfect viral opening for you.</p>
      </div>

      {/* Input Section */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 shadow-xl">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-400">What is your video about?</label>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. productivity hacks for busy professionals"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-4 px-6 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-lg"
            />
            <button
              onClick={handleGenerate}
              disabled={!topic || isGenerating}
              className={`absolute right-2 top-2 bottom-2 px-6 rounded-lg font-bold flex items-center gap-2 transition-all ${
                isGenerating 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-500 text-white active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Generate
                </>
              )}
            </button>
          </div>
          <div className="flex gap-4">
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">#Education</button>
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">#Tech</button>
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">#Business</button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold px-2">Viral Suggestions</h2>
        <div className="grid gap-4">
          {hooks.map((hook) => (
            <div 
              key={hook.id} 
              className="bg-[#111827] p-6 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all group flex items-center justify-between gap-6"
            >
              <div className="flex-1">
                <p className="text-lg leading-relaxed mb-2">{hook.text}</p>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500" 
                      style={{ width: `${hook.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Viral Score: {hook.score}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => copyToClipboard(hook.id, hook.text)}
                  className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                  title="Copy Hook"
                >
                  {copiedId === hook.id ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
                <button 
                  className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                  title="Send to Editor"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
