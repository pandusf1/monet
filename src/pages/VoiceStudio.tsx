import { useState } from 'react';
import { Play, Mic2, Settings2, Download, RefreshCw, Volume2 } from 'lucide-react';

const voices = [
  { id: 'v1', name: 'Antoni', type: 'Male', emotion: 'Professional' },
  { id: 'v2', name: 'Rachel', type: 'Female', emotion: 'Energetic' },
  { id: 'v3', name: 'Josh', type: 'Male', emotion: 'Deep/Storyteller' },
  { id: 'v4', name: 'Bella', type: 'Female', emotion: 'Soft/Friendly' },
];

export default function VoiceStudio() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emotion, setEmotion] = useState(50);
  const [stability, setStability] = useState(50);

  const handleGenerate = () => {
    if (!text) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Voice Studio</h1>
          <p className="text-gray-400 text-lg">Generate human-like voiceovers with natural emotions.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Credits Remaining:</span>
          <span className="text-purple-500 font-bold">2,450</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest text-[10px]">Script Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your video script here... Try to include pauses and emphasis for better results."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-6 h-64 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-lg resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">{text.length} / 5000 characters</span>
              <button
                onClick={handleGenerate}
                disabled={!text || isGenerating}
                className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                  isGenerating 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-500 text-white active:scale-95'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    Generating Audio...
                  </>
                ) : (
                  <>
                    <Volume2 size={20} />
                    Generate Voiceover
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800/30 p-6 rounded-2xl border border-dashed border-gray-700 flex items-center justify-center h-32">
            <p className="text-gray-500 flex items-center gap-2">
              <Play size={20} />
              Generate audio to preview results
            </p>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-8">
            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest text-[10px]">Select Voice</label>
              <div className="grid gap-3">
                {voices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      selectedVoice === voice.id 
                        ? 'bg-purple-600/10 border-purple-500 text-white' 
                        : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-bold text-sm">{voice.name}</p>
                      <p className="text-[10px] opacity-60 uppercase">{voice.type} • {voice.emotion}</p>
                    </div>
                    {selectedVoice === voice.id && <Play size={16} fill="currentColor" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Emotion Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest text-[10px] font-bold">Emotion Intensity</label>
                  <span className="text-purple-500 text-xs font-bold">{emotion}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={emotion}
                  onChange={(e) => setEmotion(parseInt(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest text-[10px] font-bold">Voice Stability</label>
                  <span className="text-purple-500 text-xs font-bold">{stability}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stability}
                  onChange={(e) => setStability(parseInt(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors pt-4 border-t border-gray-800">
              <Settings2 size={16} />
              Advanced Voice Settings
            </button>
          </div>

          {/* Quick Tips */}
          <div className="bg-purple-600/10 p-6 rounded-2xl border border-purple-500/20">
            <h4 className="text-purple-400 font-bold text-sm mb-2 flex items-center gap-2">
              <Mic2 size={16} />
              Pro Tip
            </h4>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Use "..." for short pauses and ALL CAPS for emphasis. High intensity works best for TikTok hooks!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
