import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import HookGenerator from "@/pages/HookGenerator";
import VoiceStudio from "@/pages/VoiceStudio";
import VideoCreator from "@/pages/VideoCreator";
import TrendAnalyzer from "@/pages/TrendAnalyzer";

// Placeholder components for other pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-gray-400">This feature is currently under development.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />

        <Route path="/creator" element={
          <Layout>
            <VideoCreator />
          </Layout>
        } />

        <Route path="/trends" element={
          <Layout>
            <TrendAnalyzer />
          </Layout>
        } />

        <Route path="/hooks" element={
          <Layout>
            <HookGenerator />
          </Layout>
        } />

        <Route path="/voice" element={
          <Layout>
            <VoiceStudio />
          </Layout>
        } />

        <Route path="/projects" element={
          <Layout>
            <Placeholder title="Project Manager" />
          </Layout>
        } />

        <Route path="/analytics" element={
          <Layout>
            <Placeholder title="Analytics" />
          </Layout>
        } />

        <Route path="/settings" element={
          <Layout>
            <Placeholder title="Settings" />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}
