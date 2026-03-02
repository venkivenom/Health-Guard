import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Activity, 
  Calculator, 
  Info, 
  ShieldCheck, 
  User, 
  ChevronRight, 
  AlertCircle,
  CheckCircle2,
  Scale,
  Thermometer,
  Zap,
  X,
  Check,
  Droplets,
  BellRing,
  Wind,
  Play,
  Square
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bmiData, setBmiData] = useState({ weight: '', height: '' });
  const [bmiResult, setBmiResult] = useState(null);
  
  // Hydration 5-Point Tracker State (500ml each = 2.5L total)
  const [hydrationLog, setHydrationLog] = useState([
    { id: 1, time: '9 AM', period: '6am-9am', status: 'pending' },
    { id: 2, time: '12 PM', period: '9am-12pm', status: 'pending' },
    { id: 3, time: '3 PM', period: '12pm-3pm', status: 'pending' },
    { id: 4, time: '6 PM', period: '3pm-6pm', status: 'pending' },
    { id: 5, time: '9 PM', period: '6pm-9pm', status: 'pending' },
  ]);

  // Meditation State
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationMinutes, setMeditationMinutes] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [meditationSessions, setMeditationSessions] = useState(0);
  const audioRef = useRef(null);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isMeditating && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isMeditating && timeRemaining === 0) {
      setIsMeditating(false);
      setMeditationSessions((prev) => prev + 1);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
    return () => clearInterval(interval);
  }, [isMeditating, timeRemaining]);

  const startMeditation = () => {
    setTimeRemaining(meditationMinutes * 60);
    setIsMeditating(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed. Note: Browsers may block autoplay until interaction.", e));
    }
  };

  const stopMeditation = () => {
    setIsMeditating(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const waterConsumed = hydrationLog.filter(log => log.status === 'yes').length * 0.5;

  const toggleHydration = (id) => {
    setHydrationLog(prev => prev.map(log => {
      if (log.id === id) {
        const nextStatus = log.status === 'pending' ? 'yes' : log.status === 'yes' ? 'no' : 'pending';
        return { ...log, status: nextStatus };
      }
      return log;
    }));
  };

  // Calculate BMI Logic
  const calculateBMI = () => {
    const w = parseFloat(bmiData.weight);
    const h = parseFloat(bmiData.height) / 100; // convert cm to m
    if (w > 0 && h > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      let category = '';
      let color = '';
      if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-400'; }
      else if (bmi < 25) { category = 'Healthy'; color = 'text-emerald-400'; }
      else if (bmi < 30) { category = 'Overweight'; color = 'text-amber-400'; }
      else { category = 'Obese'; color = 'text-rose-400'; }
      setBmiResult({ value: bmi, category, color });
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center justify-center w-full py-3 transition-all duration-300 ${
        activeTab === id 
          ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' 
          : 'text-white/40 hover:text-white/70'
      }`}
    >
      <Icon size={24} className={activeTab === id ? 'animate-pulse' : ''} />
      <span className="text-[10px] mt-1.5 font-medium tracking-wider uppercase">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-white font-sans flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      
      {/* --- Glassmorphism Background Orbs --- */}
      <div className="absolute top-[-10%] left-[-20%] w-80 h-80 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-20%] w-96 h-96 bg-emerald-600/20 rounded-full mix-blend-screen filter blur-[90px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[30%] right-[10%] w-64 h-64 bg-amber-600/20 rounded-full mix-blend-screen filter blur-[70px] animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl px-6 py-5 border-b border-white/10 flex justify-between items-center sticky top-0 z-20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3 text-emerald-400">
          <ShieldCheck size={28} strokeWidth={2.5} className="drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          <h1 className="text-xl font-bold tracking-widest uppercase text-white drop-shadow-md">HealthGuard</h1>
        </div>
        <button className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:bg-white/20 transition-all shadow-lg">
          <User size={18} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 pb-28 relative z-10 space-y-8 custom-scrollbar">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Restored Daily Status Section */}
            <section>
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Daily Status</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-lg p-5 rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="bg-blue-500/20 text-blue-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/30">
                    <Zap size={22} />
                  </div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Activity</p>
                  <p className="text-2xl font-bold tracking-tight">4,281 <span className="text-xs text-white/40 font-normal">steps</span></p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg p-5 rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="bg-rose-500/20 text-rose-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-rose-500/30">
                    <Heart size={22} className="animate-pulse" />
                  </div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Heart Rate</p>
                  <p className="text-2xl font-bold tracking-tight">72 <span className="text-xs text-white/40 font-normal">bpm</span></p>
                </div>
              </div>
            </section>

            {/* Restored Market Insight Section */}
            <section className="bg-gradient-to-br from-emerald-500/40 to-emerald-900/40 backdrop-blur-xl rounded-[2rem] p-7 border border-emerald-400/30 shadow-[0_8px_32px_rgba(16,185,129,0.2)] relative overflow-hidden">
              <div className="absolute -right-10 -top-10 bg-emerald-400/20 w-40 h-40 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Market Insight</h3>
                  <p className="text-emerald-200/80 text-xs uppercase tracking-widest mt-2">Version 1.0 (2026 Ready)</p>
                </div>
                <ShieldCheck className="text-emerald-300 drop-shadow-[0_0_15px_rgba(110,231,183,0.6)]" size={48} />
              </div>
              <p className="text-sm text-emerald-50/90 leading-relaxed mb-6 relative z-10 font-light">
                Built for the Australian preventative health landscape. Privacy-first, open-source, and ready for integration.
              </p>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-300 py-3 px-6 rounded-full text-sm font-semibold inline-flex items-center gap-2 w-full justify-center relative z-10 shadow-lg">
                Learn more <ChevronRight size={16} />
              </button>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Quick Check</h2>
              <div className="space-y-4">
                {[
                  { label: 'Sleep Quality', value: '7.5 hrs', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
                  { 
                    label: 'Hydration', 
                    value: `${waterConsumed.toFixed(1)} / 2.5 L`, 
                    icon: waterConsumed >= 2.0 ? CheckCircle2 : AlertCircle, 
                    color: waterConsumed >= 2.0 ? 'text-emerald-400' : 'text-amber-400', 
                    bg: waterConsumed >= 2.0 ? 'bg-emerald-400/10' : 'bg-amber-400/10', 
                    border: waterConsumed >= 2.0 ? 'border-emerald-400/20' : 'border-amber-400/20' 
                  },
                  { label: 'Meditation', value: `${meditationSessions} sessions`, icon: Wind, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center shadow-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`${item.bg} ${item.border} border p-2 rounded-xl`}>
                        <item.icon className={item.color} size={20} />
                      </div>
                      <span className="font-medium text-white/90">{item.label}</span>
                    </div>
                    <span className="font-bold tracking-wider">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-1">Calculator</h2>
              <p className="text-white/50 text-sm">Measure your wellness metrics</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-7 rounded-[2rem] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-6">
              <div className="flex items-center gap-3 text-emerald-400 mb-6 border-b border-white/10 pb-4">
                <Scale size={24} />
                <span className="font-bold text-lg tracking-wide text-white">BMI Index</span>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 ml-1">Height (cm)</label>
                  <input 
                    type="number" 
                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-400/50 focus:bg-white/5 transition-all text-white placeholder-white/30 text-lg shadow-inner"
                    placeholder="e.g. 175"
                    value={bmiData.height}
                    onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 ml-1">Weight (kg)</label>
                  <input 
                    type="number" 
                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-400/50 focus:bg-white/5 transition-all text-white placeholder-white/30 text-lg shadow-inner"
                    placeholder="e.g. 70"
                    value={bmiData.weight}
                    onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                  />
                </div>
                <button 
                  onClick={calculateBMI}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all"
                >
                  Calculate BMI
                </button>
              </div>

              {bmiResult && (
                <div className="mt-8 pt-8 border-t border-white/10 text-center animate-in zoom-in duration-300">
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Your Result</p>
                  <p className="text-6xl font-black my-2 drop-shadow-lg">{bmiResult.value}</p>
                  <div className={`inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mt-2`}>
                    <p className={`font-bold tracking-widest uppercase text-sm ${bmiResult.color} drop-shadow-[0_0_8px_currentColor]`}>
                      {bmiResult.category}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-500/10 backdrop-blur-md p-5 rounded-2xl border border-blue-400/20 shadow-lg">
              <div className="flex gap-4 items-start">
                <Info size={24} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-100/80 leading-relaxed font-light">
                  The Healthy Weight Range for most adults in Australia is a BMI between 18.5 and 24.9.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checker' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <div>
               <h2 className="text-3xl font-bold tracking-tight mb-1">Health Guard</h2>
               <p className="text-white/50 text-sm">Real-time habit tracking</p>
             </div>

             <div className="space-y-5">
                <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold flex items-center gap-2 text-white/90">
                      <Thermometer size={20} className="text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]"/> 
                      Body Temp
                    </span>
                    <span className="bg-white/5 px-3 py-1 rounded-full text-white/40 font-mono text-[10px] tracking-widest uppercase border border-white/10">Manual</span>
                  </div>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-5xl font-black tracking-tighter">36.6</span>
                    <span className="text-white/40 pb-2 text-xl">°C</span>
                    <span className="ml-auto bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">Normal</span>
                  </div>
                </div>

                {/* 5-Point Hydration Tracker */}
                <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-white/90">
                      <Droplets className="text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]" size={20} />
                      Smart Hydration
                    </h3>
                    <span className="text-xs text-white/50 font-mono font-bold tracking-wider">{waterConsumed.toFixed(1)}L / 2.5L</span>
                  </div>
                  
                  <div className="relative mt-2">
                    {/* Background line connecting the dots */}
                    <div className="absolute top-[1.35rem] left-6 right-6 h-0.5 bg-white/10 z-0"></div>
                    
                    <div className="flex justify-between relative z-10">
                      {hydrationLog.map((log) => (
                        <div key={log.id} className="flex flex-col items-center gap-3">
                          <button 
                            onClick={() => toggleHydration(log.id)}
                            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              log.status === 'yes' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]' :
                              log.status === 'no' ? 'bg-rose-500/20 border-rose-400 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]' :
                              'bg-black/60 border-white/20 text-white/30 hover:border-white/50 hover:bg-white/5'
                            }`}
                          >
                            {log.status === 'yes' && <Check size={20} strokeWidth={3} />}
                            {log.status === 'no' && <X size={20} strokeWidth={3} />}
                            {log.status === 'pending' && <BellRing size={16} className="opacity-40" />}
                          </button>
                          <div className="text-center">
                            <p className="text-[10px] font-bold text-white/60 tracking-wider">{log.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-[10px] text-white/40 mt-5 font-light uppercase tracking-widest">Tap to log 500ml intake (Yes ➔ No ➔ Reset)</p>
                </div>

                {/* Meditation Setup Panel */}
                <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-white/90">
                      <Wind className="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]" size={20} />
                      Zen Timer
                    </h3>
                    <span className="bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
                      {meditationSessions} Sessions
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center mb-6">
                    <span className="text-4xl font-black text-white mb-2">{meditationMinutes} <span className="text-xl text-white/40">min</span></span>
                    <input 
                      type="range" 
                      min="1" max="60" 
                      value={meditationMinutes} 
                      onChange={(e) => setMeditationMinutes(parseInt(e.target.value))}
                      className="w-full accent-purple-500 bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <button 
                    onClick={startMeditation}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all active:scale-[0.98]"
                  >
                    <Play fill="currentColor" size={20} /> Start Session
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                   <h3 className="font-semibold text-lg mb-6 border-b border-white/10 pb-4">Daily Check-in</h3>
                   <div className="space-y-5">
                     {['30m Exercise', 'No processed sugar', 'Mindfulness session', 'Reading 20 pages'].map((task, i) => (
                       <label key={i} className="flex items-center gap-4 cursor-pointer group">
                         <div className="w-7 h-7 rounded-xl border border-white/30 bg-black/20 group-hover:border-emerald-400 flex items-center justify-center transition-all relative overflow-hidden">
                           <div className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                           <div className="w-3 h-3 bg-emerald-400 rounded-md opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                         </div>
                         <span className="text-white/80 font-medium group-hover:text-white transition-colors">{task}</span>
                       </label>
                     ))}
                   </div>
                </div>
             </div>

             <div className="p-5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50"></div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]"></div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Sync Active</span>
                </div>
                <p className="text-sm text-white/60 italic font-light leading-relaxed">
                  "Australia ranks as one of the world's healthiest nations—staying consistent is key."
                </p>
             </div>
          </div>
        )}
      </main>

      {/* Glassmorphism Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0a0a0e]/60 backdrop-blur-2xl border-t border-white/10 flex justify-around px-2 pb-6 pt-2 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <NavItem id="dashboard" icon={Activity} label="Status" />
        <NavItem id="calculator" icon={Calculator} label="Calc" />
        <NavItem id="checker" icon={ShieldCheck} label="Guard" />
      </nav>

      {/* --- Active Meditation Overlay --- */}
      {isMeditating && (
        <div className="absolute inset-0 z-50 bg-[#0a0a0e]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
          
          {/* Glassmorphism Panel */}
          <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/20 flex flex-col items-center w-full max-w-[320px] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Animated Glowing Orbs inside panel */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Title */}
            <h2 className="text-white/60 uppercase tracking-[0.3em] text-xs font-bold mb-10 relative z-10">Deep Focus</h2>

            {/* Floating Meditative Pose */}
            <div className="relative w-32 h-32 flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite] mb-10 z-10">
               <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl animate-ping" style={{ animationDuration: '3s' }}></div>
               <svg viewBox="0 0 100 100" className="w-28 h-28 text-purple-100 drop-shadow-[0_0_15px_rgba(216,180,254,0.8)]">
                 <circle cx="50" cy="25" r="12" fill="currentColor" />
                 <path d="M50 40 C 25 40, 15 65, 20 70 C 25 75, 40 70, 50 65 C 60 70, 75 75, 80 70 C 85 65, 75 40, 50 40 Z" fill="currentColor" opacity="0.9" />
                 <path d="M25 65 C 15 80, 35 90, 50 85 C 65 90, 85 80, 75 65 Z" fill="currentColor" opacity="0.75" />
               </svg>
            </div>

            {/* Timer Display */}
            <div className="text-6xl font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] mb-10 relative z-10 font-mono">
              {formatTime(timeRemaining)}
            </div>

            {/* Stop Button */}
            <button 
              onClick={stopMeditation}
              className="bg-white/5 border border-white/20 hover:bg-white/10 text-white/80 hover:text-white px-8 py-3 rounded-full font-bold tracking-widest text-sm uppercase transition-all flex items-center gap-2 relative z-10"
            >
              <Square fill="currentColor" size={14} /> End Session
            </button>
          </div>
        </div>
      )}

      {/* Hidden Audio Element pointing to uploaded asset */}
      <audio ref={audioRef} src="theta-4-to-8-hz-brainwave-entrainment-frequencies-290051 (1).mp3" loop preload="auto" />
    </div>
  );
};

export default App;
