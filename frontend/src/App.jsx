import React, { useState } from 'react';
import { useWebcam } from './contexts/WebcamContext';
import { useHealth } from './contexts/HealthContext';
import { LayoutDashboard, UserSquare, Settings, Activity, Eye, AlertCircle, LogOut } from 'lucide-react';

// Import our rich views
import Onboarding from './views/Onboarding';
import ClinicalInsights from './views/ClinicalInsights';
import ClinicalProfile from './views/ClinicalProfile';

function App() {
  const { videoRef, isInitializing } = useWebcam();
  const { metrics, status } = useHealth();
  
  const [userName, setUserName] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');

  // App gating logic
  if (!userName) {
    return <Onboarding onLogin={(name) => setUserName(name || 'Guest User')} />;
  }

  return (
    <div className="flex bg-background min-h-screen text-onSurface font-inter">
      {/* Sidebar - Translucent Sanctuary style */}
      <aside className="w-20 md:w-64 bg-surfaceContainerLow border-r border-outlineVariant/15 flex flex-col justify-between p-4 flex-shrink-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primaryContainer flex items-center justify-center text-white font-bold text-xl shadow-ambient">
              D
            </div>
            <span className="hidden md:block font-bold text-xl tracking-tight text-onSurface">Drishti</span>
          </div>

          <nav className="flex flex-col gap-2">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={activeTab === 'Dashboard'} 
              onClick={() => setActiveTab('Dashboard')}
            />
            <NavItem 
              icon={<Activity size={20} />} 
              label="Insights" 
              active={activeTab === 'Insights'} 
              onClick={() => setActiveTab('Insights')}
            />
            <NavItem 
              icon={<UserSquare size={20} />} 
              label="Clinical Profile" 
              active={activeTab === 'Clinical Profile'} 
              onClick={() => setActiveTab('Clinical Profile')}
            />
          </nav>
        </div>
        
        <nav className="flex flex-col gap-2">
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeTab === 'Settings'} 
            onClick={() => setActiveTab('Settings')}
          />
          <NavItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            onClick={() => setUserName(null)}
          />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-8 bg-surface/70 backdrop-blur-[20px] sticky top-0 z-10 border-b border-outlineVariant/15">
          <h1 className="text-2xl font-semibold tracking-tight">{activeTab}</h1>
          
          <div className="flex items-center gap-4">
            {/* Health Score Pill */}
            <div className="flex items-center gap-2 bg-secondaryContainer text-onSecondaryContainer px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Score: {metrics.screenTime > 120 ? 'Good' : 'Excellent'}
            </div>
            
            {/* Profile Avatar placeholder */}
            <div className="w-8 h-8 rounded-full bg-surfaceContainerHighest border border-outlineVariant/30 flex items-center justify-center text-xs font-bold text-onSurfaceVariant">
              {userName.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dynamic View Rendering */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'Dashboard' && <DashboardView userName={userName} metrics={metrics} isInitializing={isInitializing} videoRef={videoRef} />}
          {activeTab === 'Insights' && <ClinicalInsights />}
          {activeTab === 'Clinical Profile' && <ClinicalProfile />}
          {activeTab === 'Settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

// ---------------------------
// VIEW COMPONENTS (Local ones not mapped to Stitch)
// ---------------------------

function DashboardView({ userName, metrics, isInitializing, videoRef }) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200 max-w-6xl mx-auto">
      {/* Hero / Welcome Section */}
      <section className="glass-card p-8 bg-surfaceContainerLowest rounded-xl shadow-ambient">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-body-lg text-onSurfaceVariant mb-1">Welcome back,</h2>
            <div className="text-4xl font-bold text-primary mb-2 line-clamp-1">{userName}</div>
            <p className="text-onSurfaceVariant max-w-md">
              {metrics.distance < 30 ? "You are sitting very close to the screen. Please move back." : "Your eye health is looking optimal today. Remember to take a break in 15 minutes."}
            </p>
          </div>
          
          {/* Webcam Preview feed */}
          <div className="relative w-32 h-24 rounded-xl overflow-hidden bg-surfaceContainerHigh border border-outlineVariant/15 shadow-sm">
            <video 
              ref={videoRef} 
              className="object-cover w-full h-full transform -scale-x-100" 
              autoPlay 
              playsInline 
              muted
            />
            {isInitializing && (
              <div className="absolute inset-0 flex items-center justify-center bg-surfaceContainerHighest/80 text-xs text-onSurfaceVariant">
                Starting Camera
              </div>
            )}
            <div className="absolute top-1 right-1 flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,110,6,0.8)] animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Blink Rate" 
          value={metrics.blinkRate} 
          unit=" / min" 
          trend={metrics.blinkRate < 10 ? "Low" : "Normal"}
          status={metrics.blinkRate < 10 ? "warning" : "good"}
          icon={<Eye size={20} className={metrics.blinkRate < 10 ? "text-tertiary" : "text-primary"} />}
        />
        
        <MetricCard 
          title="Screen Time" 
          value={metrics.screenTime} 
          unit=" min" 
          trend="Active Session"
          status="good"
        />
        
        <MetricCard 
          title="Screen Distance" 
          value={metrics.distance} 
          unit=" cm" 
          trend={metrics.distance < 30 ? "Too Close" : "Optimal"}
          status={metrics.distance < 30 ? "warning" : "good"}
          icon={<AlertCircle size={20} className={metrics.distance < 30 ? "text-tertiary" : "text-primary"} />}
        />
      </section>

      {/* Expanded module */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 min-h-[300px] flex flex-col rounded-xl shadow-ambient bg-surfaceContainerLow">
          <h3 className="font-semibold text-lg mb-4 text-onSurface">Fatigue Analysis</h3>
          <div className="flex-1 flex items-center justify-center text-onSurfaceVariant/80 bg-surfaceContainer p-4 rounded-xl border border-dashed border-outlineVariant/30">
            {metrics.blinkRate < 10 ? 'High probability of severe digital eye strain detected.' : 'Gathering diagnostic metrics based on blink consistency...'}
          </div>
        </div>
        
        <div className="glass-card p-6 min-h-[300px] flex flex-col rounded-xl shadow-ambient bg-surfaceContainerLowest border border-primary/20">
          <h3 className="font-semibold text-lg mb-4 text-onSurface">Upcoming Reminders</h3>
          <div className="space-y-3">
            <ReminderCard time="14:30" label="20-20-20 Rule Break" active />
            <ReminderCard time="16:00" label="Hydration Pause" active={false} />
          </div>
        </div>
      </section>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="animate-in fade-in duration-200 flex items-center justify-center h-full min-h-[500px]">
      <div className="text-center">
        <Settings size={48} className="mx-auto mb-4 text-outlineVariant opacity-50" />
        <h2 className="text-xl font-medium text-onSurface">App Settings</h2>
        <p className="text-onSurfaceVariant">Configure baseline calibrations and tracking limits.</p>
      </div>
    </div>
  );
}

// ---------------------------
// UTILITY COMPONENTS
// ---------------------------

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all border-none cursor-pointer ${
        active 
          ? 'bg-surfaceContainerHighest text-primary font-medium shadow-sm' 
          : 'text-onSurfaceVariant hover:bg-surfaceContainer bg-transparent hover:text-onSurface'
      }`}
    >
      {icon}
      <span className="hidden md:block transition-all">{label}</span>
      {active && <span className="w-1.5 h-1.5 rounded-full bg-primary ml-auto hidden md:block"></span>}
    </button>
  );
}

function MetricCard({ title, value, unit, trend, status, icon }) {
  return (
    <div className="glass-card p-6 rounded-xl bg-surfaceContainerLow hover:bg-surfaceContainerLowest shadow-ambient transition-colors relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-onSurfaceVariant font-medium">{title}</h3>
        {icon}
      </div>
      <div className="flex items-baseline gap-1 relative z-10">
        <span className="text-3xl font-bold tracking-tight text-onSurface">{value}</span>
        <span className="text-sm font-medium text-onSurfaceVariant">{unit}</span>
      </div>
      <div className={`mt-2 text-sm font-medium relative z-10 ${status === 'good' ? 'text-secondary' : 'text-tertiary'}`}>
        {trend}
      </div>
      {/* Decorative gradient blob based on state */}
      <div className={`absolute -right-12 -bottom-12 w-32 h-32 blur-[40px] opacity-20 rounded-full transition-all group-hover:scale-150 ${status === 'good' ? 'bg-secondary' : 'bg-error'}`}></div>
    </div>
  );
}

function ReminderCard({ time, label, active }) {
  return (
    <div className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
      active ? 'bg-surfaceContainerLowest border-primary/20 shadow-[0_4px_12px_rgba(0,120,212,0.05)]' : 'bg-surfaceContainer border-transparent'
    }`}>
      <div className={`font-semibold ${active ? 'text-primary' : 'text-onSurfaceVariant'}`}>{time}</div>
      <div className="w-px h-8 bg-outlineVariant/20"></div>
      <div className={active ? 'text-onSurface' : 'text-onSurfaceVariant'}>{label}</div>
    </div>
  );
}

export default App;
