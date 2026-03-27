import { TrendingUp, Users, Play, DollarSign } from 'lucide-react';

const stats = [
  { label: 'Total Views', value: '1.2M', change: '+12.5%', icon: Play, color: 'text-blue-500' },
  { label: 'Engagement Rate', value: '8.4%', change: '+2.1%', icon: Users, color: 'text-green-500' },
  { label: 'Estimated Revenue', value: '$4,520', change: '+18.2%', icon: DollarSign, color: 'text-purple-500' },
  { label: 'Trend Score', value: '94/100', change: '+5.4%', icon: TrendingUp, color: 'text-orange-500' },
];

const trendingTopics = [
  { id: 1, title: 'AI Productivity Hacks', platform: 'YouTube Shorts', growth: '+245%', category: 'Education' },
  { id: 2, title: 'Minimalist Office Setup', platform: 'TikTok', growth: '+180%', category: 'Tech' },
  { id: 3, title: 'Healthy Meal Prep', platform: 'YouTube Shorts', growth: '+150%', category: 'Lifestyle' },
  { id: 4, title: 'Crypto Market Trends', platform: 'TikTok', growth: '+120%', category: 'Finance' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Creator!</h1>
        <p className="text-gray-400 text-lg">Here's what's happening with your content today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#111827] p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gray-800 group-hover:bg-gray-700 transition-colors`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Trending Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111827] p-8 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Trending Topics Today</h2>
            <button className="text-purple-500 hover:text-purple-400 text-sm font-medium transition-colors">View All Trends</button>
          </div>
          <div className="space-y-4">
            {trendingTopics.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    {topic.title[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold">{topic.title}</h4>
                    <p className="text-xs text-gray-400">{topic.platform} • {topic.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-500 font-bold">{topic.growth}</span>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Growth Rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ready to go viral?</h2>
            <p className="text-purple-100 mb-8 leading-relaxed">
              Use our AI Hook Generator to create the perfect opening for your next video.
            </p>
          </div>
          <button className="bg-white text-purple-600 py-3 px-6 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-xl">
            Create New Video
          </button>
        </div>
      </div>
    </div>
  );
}
