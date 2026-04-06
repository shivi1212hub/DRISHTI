import React from 'react';
import { useHealth } from '../contexts/HealthContext';

export default function ClinicalInsights() {
  const { metrics, session } = useHealth();
  
  // Calculate average focal distance to check against optimal
  const optimalGoalDiff = Math.abs(metrics.distance - 45); 

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="space-y-2">
        <p className="text-primary font-semibold tracking-wider text-xs uppercase">Performance Analysis</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-onSurface">Clinical Insights</h2>
        <p className="text-onSurfaceVariant text-md max-w-2xl leading-relaxed">
          Your digital wellness metrics are synthesized from real-time monitoring to provide actionable ocular health scores.
        </p>
      </div>

      {/* Bento Grid Insights */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Daily Screen Time vs Break Compliance */}
        <div className="md:col-span-8 glass-card rounded-xl p-6 shadow-[0px_8px_32px_rgba(0,0,0,0.04)] bg-surfaceContainerLowest">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-bold text-onSurface">Screen Time & Breaks</h3>
              <p className="text-sm text-onSurfaceVariant">Daily correlation between activity and rest</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold text-primary uppercase">Screen</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-[10px] font-bold text-secondary uppercase">Breaks</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-64 w-full flex items-end justify-between gap-4 px-2">
            {/* Fake Chart Visualization representing week view */}
            {[
              { day: 'Mon', active: '70%', rest: '20%' },
              { day: 'Tue', active: '85%', rest: '10%' },
              { day: 'Wed', active: '60%', rest: '35%' },
              { day: 'Thu', active: '75%', rest: '15%' },
              { day: 'Fri', active: '95%', rest: '5%' },
              { day: 'Today', active: `${Math.min(100, Math.max(20, metrics.screenTime * 2))}%`, rest: '50%' }
            ].map((stat, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex flex-col justify-end items-center h-full gap-1">
                  <div className="w-full bg-primary/10 rounded-t-lg group-hover:bg-primary/20 transition-colors" style={{ height: stat.active }}></div>
                  <div className={`w-full ${idx === 5 ? 'bg-secondary' : 'bg-secondary/20'} rounded-b-lg`} style={{ height: stat.rest }}></div>
                </div>
                <span className={`text-[11px] font-medium ${idx === 5 ? 'text-primary font-bold' : 'text-outline'}`}>{stat.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fatigue Trends */}
        <div className="md:col-span-4 glass-card rounded-xl p-6 bg-surfaceContainerLowest shadow-[0px_8px_32px_rgba(0,0,0,0.04)] border-none">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-onSurface">Fatigue Levels</h3>
            <p className="text-sm text-onSurfaceVariant">Estimated strain index based on blinking</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-onSurface">Current Index</span>
                <span className={metrics.blinkRate < 10 ? "text-error" : "text-tertiary"}>
                  {metrics.blinkRate < 10 ? "High/Strain" : "Moderate"}
                </span>
              </div>
              <div className="h-3 w-full bg-surfaceContainerHigh rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r rounded-full transition-all duration-1000 ${metrics.blinkRate < 10 ? 'from-tertiary to-error' : 'from-secondary to-tertiary'}`} 
                  style={{ width: `${Math.max(10, 100 - (metrics.blinkRate * 5))}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-surfaceContainerLow border-none">
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${metrics.distance < 30 ? 'text-error' : 'text-tertiary'}`}>
                  {metrics.distance < 30 ? 'error' : 'warning'}
                </span>
                <p className="text-xs font-medium leading-relaxed text-onSurfaceVariant">
                  {metrics.distance < 30 
                    ? "Warning: You are situated dangerously close to your monitor." 
                    : "Fatigue usually peaks at 3:00 PM. Schedule a mandatory 5-min walk-away then."}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-3 bg-surface text-center rounded-lg">
                <p className="text-[10px] text-outline font-bold uppercase">Screen Dist.</p>
                <p className={`text-lg font-bold ${metrics.distance < 30 ? 'text-error' : 'text-onSurface'}`}>{metrics.distance} cm</p>
              </div>
              <div className="p-3 bg-surface text-center rounded-lg">
                <p className="text-[10px] text-outline font-bold uppercase">Active Time</p>
                <p className="text-lg font-bold text-onSurface">{metrics.screenTime} m</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blink Rate Analysis */}
        <div className="md:col-span-6 glass-card rounded-xl p-6 bg-surfaceContainerLowest shadow-[0px_8px_32px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-onSurface">Blink Rate Analysis</h3>
              <p className="text-sm text-onSurfaceVariant">Average blinks per minute (BPM)</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-end justify-between gap-1 h-32 px-2">
              {/* Dynamic Waveform mock */}
              {[40, 50, 60, 100, 80, 60, 100, 80, 50, 70, 100, 80, 50].map((h, i) => (
                <div key={i} className={`w-1.5 bg-primaryContainer rounded-full transition-all duration-500`} style={{ height: `${h}%`, opacity: Math.random() * 0.5 + 0.3 }}></div>
              ))}
              {/* Live active blinks injection point */}
              <div className="w-1.5 bg-primary h-full rounded-full animate-pulse shadow-[0_0_8px_rgba(0,95,170,0.5)]"></div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-surfaceContainerHigh">
              <div className="text-center">
                <span className="block text-2xl font-extrabold text-onSurface">{metrics.blinkRate}</span>
                <span className="text-[10px] text-outline font-bold uppercase">Live BPM</span>
              </div>
              <div className="h-8 w-[1px] bg-surfaceContainerHigh"></div>
              <div className="text-center">
                <span className={`block text-2xl font-extrabold ${metrics.blinkRate >= 12 ? 'text-secondary' : 'text-tertiary'}`}>
                  {metrics.blinkRate >= 12 ? 'Optimal' : 'Low'}
                </span>
                <span className="text-[10px] text-outline font-bold uppercase">Health Status</span>
              </div>
              <div className="h-8 w-[1px] bg-surfaceContainerHigh"></div>
              <div className="text-center">
                <span className={`block text-2xl font-extrabold ${metrics.blinkRate < 14 ? 'text-error' : 'text-onSurface'}`}>
                  {Math.round(((metrics.blinkRate - 14) / 14) * 100)}%
                </span>
                <span className="text-[10px] text-outline font-bold uppercase">Vs Goal</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI-Generated Tips (Incentive block) */}
        <div className="md:col-span-6 rounded-xl overflow-hidden relative group">
          <img 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt="serene morning sunbeams" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHX2Ldtu1YsuQHCmk1ypgL6WevVz04J8SyFwPSuFb0ahLOisN7sWUp3gapBj_ngJiUdZet-FihylQlMwNDNIO2HDTz4BsNfl8HHemwdPke4vU6seDHP1gklKwnrID8VB17fridrDPpADizzabsEStheNrkN7ATDgSXGHgLk29IYt1lp-0zn1urpqEnytpkv-p4fSjuHF3zHxc2yKHSRF5aCgQGh5RuyFewuqgJt9Mz2vuHZyFvcyJNEG3FXA6RU1J06gmDB_d9Lb9X"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onSurface/90 via-onSurface/40 to-transparent"></div>
          
          <div className="relative h-full p-8 flex flex-col justify-end text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full w-fit mb-4">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span className="text-[10px] font-bold tracking-widest uppercase">AI Clinical Advisory</span>
            </div>
            
            <h4 className="text-xl font-bold mb-3">Habit Incentive: The 20-20-20 Ritual</h4>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Your real-time camera data indicates active working blocks of {metrics.screenTime} minutes. 
              To maintain your {metrics.blinkRate} BPM blink rate, look at an object 20 feet away for 20 seconds. 
              You've unlocked a 'Focus Master' badge!
            </p>
            <button className="w-full bg-white text-onSurface py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-surfaceContainerLow transition-colors">
              Apply Habit Suggestion
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
