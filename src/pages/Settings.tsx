import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Youtube, 
  Smartphone, 
  Link2, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Key
} from 'lucide-react';

export default function Settings() {
  const [integrations, setIntegrations] = useState({
    youtube: { connected: false, account: null },
    tiktok: { connected: false, account: null },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <SettingsIcon className="text-purple-500" />
          Settings
        </h1>
        <p className="text-gray-400">Manage your account preferences and third-party integrations.</p>
      </div>

      {/* Integrations Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
          <Link2 size={20} className="text-blue-400" />
          <h2 className="text-xl font-bold">Integrations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* YouTube Card */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-red-500/30 transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 transition-colors">
                <Youtube className="text-red-500" size={28} />
              </div>
              {integrations.youtube.connected ? (
                <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Connected
                </span>
              ) : (
                <span className="bg-gray-800 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">
                  Not Connected
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold mb-2">YouTube Automation</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Connect your YouTube channel to enable automatic uploads of Shorts and Videos directly from the creator.
            </p>
            
            <button className="w-full bg-white text-black hover:bg-red-500 hover:text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
              <Youtube size={18} fill="currentColor" />
              Connect YouTube Account
            </button>
          </div>

          {/* TikTok Card */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                <Smartphone className="text-cyan-400" size={28} />
              </div>
              {integrations.tiktok.connected ? (
                <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Connected
                </span>
              ) : (
                <span className="bg-gray-800 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">
                  Not Connected
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold mb-2">TikTok Business</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Link your TikTok account to auto-publish viral content and track real-time engagement metrics.
            </p>
            
            <button className="w-full bg-white text-black hover:bg-cyan-400 hover:text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
              <Smartphone size={18} fill="currentColor" />
              Connect TikTok Account
            </button>
          </div>
        </div>
      </section>

      {/* Security Info */}
      <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 flex gap-4 items-start">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <ShieldCheck className="text-purple-400" size={20} />
        </div>
        <div>
          <h4 className="font-bold text-purple-200 mb-1">Secure OAuth Integration</h4>
          <p className="text-sm text-purple-300/70 leading-relaxed">
            We use official YouTube and TikTok APIs. We never see your password, and you can revoke access anytime from your platform settings.
          </p>
        </div>
      </div>

      {/* API Keys (Developer Mode) */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
          <Key size={20} className="text-yellow-500" />
          <h2 className="text-xl font-bold">Developer API Keys</h2>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">OpenAI API Status</p>
              <p className="text-sm font-bold text-green-400 flex items-center gap-1">
                <CheckCircle2 size={14} /> Active (from .env)
              </p>
            </div>
            <button className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              Configure <ExternalLink size={12} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">ElevenLabs API Status</p>
              <p className="text-sm font-bold text-green-400 flex items-center gap-1">
                <CheckCircle2 size={14} /> Active (from .env)
              </p>
            </div>
            <button className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              Configure <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
