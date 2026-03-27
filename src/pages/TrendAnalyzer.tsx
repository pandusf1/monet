import { TrendingUp, BarChart3, Youtube, Music2, Search, ArrowUpRight } from 'lucide-react';

const youtubeTrends = [
  { title: 'ChatGPT Canvas Review', views: '450K', growth: '+32%', tags: ['AI', 'Tech'] },
  { title: 'iPhone 16 Pro Max Long-term', views: '1.2M', growth: '+15%', tags: ['Mobile', 'Review'] },
  { title: 'Morning Routine for Success', views: '280K', growth: '+45%', tags: ['Productivity'] },
];

const tiktokTrends = [
  { title: 'The "Lofi" Aesthetic Hack', uses: '120K', growth: '+85%', tags: ['Editing', 'Vibe'] },
  { title: 'POV: You use AI for everything', uses: '85K', growth: '+120%', tags: ['AI', 'Humor'] },
  { title: 'New 7-minute Workout', uses: '240K', growth: '+60%', tags: ['Fitness'] },
];

export default function TrendAnalyzer() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trend Analyzer</h1>
          <p className="text-gray-400">Discover what's viral across platforms and catch the wave early.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search niche (e.g. AI, Cooking)..."
            className="bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 w-full md:w-64 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* YouTube Section */}
        <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <Youtube size={24} />
            </div>
            <h2 className="text-xl font-bold">YouTube Shorts Trends</h2>
          </div>
          <div className="space-y-4">
            {youtubeTrends.map((trend, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all cursor-pointer border border-transparent hover:border-red-500/30 group">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-lg flex-1 leading-tight">{trend.title}</h4>
                  <ArrowUpRight size={18} className="text-gray-600 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {trend.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-gray-700 text-gray-400 uppercase font-bold tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <div className="text-right">
                    <span className="text-red-500 font-bold text-sm">{trend.growth}</span>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{trend.views} views</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TikTok Section */}
        <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
              <Music2 size={24} />
            </div>
            <h2 className="text-xl font-bold">TikTok Trends</h2>
          </div>
          <div className="space-y-4">
            {tiktokTrends.map((trend, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all cursor-pointer border border-transparent hover:border-cyan-500/30 group">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-lg flex-1 leading-tight">{trend.title}</h4>
                  <ArrowUpRight size={18} className="text-gray-600 group-hover:text-cyan-500 transition-colors" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {trend.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-gray-700 text-gray-400 uppercase font-bold tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-500 font-bold text-sm">{trend.growth}</span>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{trend.uses} uses</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prediction Banner */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 p-8 rounded-2xl flex items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <TrendingUp size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">Viral Prediction: <span className="text-purple-400">#AIAgent</span></h3>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Our AI predicts that content around AI Agents will grow by <span className="text-white font-bold">350%</span> in the next 48 hours. Start creating now!
            </p>
          </div>
        </div>
        <button className="bg-white text-purple-900 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-all active:scale-95 shadow-xl whitespace-nowrap">
          Create Content
        </button>
      </div>
    </div>
  );
}
