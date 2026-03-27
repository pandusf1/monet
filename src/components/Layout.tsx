import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  TrendingUp, 
  Mic2, 
  Zap, 
  BarChart3, 
  Settings,
  FolderOpen
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/creator', label: 'Video Creator', icon: Video },
  { path: '/trends', label: 'Trends', icon: TrendingUp },
  { path: '/hooks', label: 'Hook Generator', icon: Zap },
  { path: '/voice', label: 'Voice Studio', icon: Mic2 },
  { path: '/projects', label: 'Projects', icon: FolderOpen },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#1F2937] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] flex flex-col border-r border-gray-800">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">M</div>
            <span className="text-xl font-bold tracking-tight">MonetAI</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#1F2937]">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-[#1F2937] sticky top-0 z-10">
          <h2 className="text-xl font-semibold">
            {navItems.find(n => n.path === location.pathname)?.label || 'Page'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full border border-gray-600 flex items-center justify-center text-xs">U</div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
