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
  Square,
  Ticket,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCircle,
  Gem,
  Award,
  Barcode
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [bmiData, setBmiData] = useState({ weight: '', height: '' });
  const [bmiResult, setBmiResult] = useState(null);
  
  // Hydration 5-Point Tracker State
  const [hydrationLog, setHydrationLog] = useState([
    { id: 1, time: '9 AM', period: '6am-9am', status: 'pending' },
    { id: 2, time: '12 PM', period: '9am-12pm', status: 'pending' },
    { id: 3, time: '3 PM', period: '12pm-3pm', status: 'pending' },
    { id: 4, time: '6 PM', period: '3pm-6pm', status: 'pending' },
    { id: 5, time: '9 PM', period: '6pm-9pm', status: 'pending' },
  ]);

  // Daily Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, label: '30m Exercise', completed: false },
    { id: 2, label: 'No processed sugar', completed: false },
    { id: 3, label: 'Mindfulness session', completed: false },
    { id: 4, label: 'Reading 20 pages', completed: false },
  ]);

  // Meditation State
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationMinutes, setMeditationMinutes] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [meditationSessions, setMeditationSessions] = useState(0);
  const audioRef = useRef(null);

  // Meditation Timer Logic
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
      audioRef.current.play().catch(e => console.log("Audio playback delayed until user interaction", e));
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

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const calculateBMI = () => {
    const w = parseFloat(bmiData.weight);
    const h = parseFloat(bmiData.height) / 100;
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
    <div className="min-h-screen bg-[#060608] text-white font-sans flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-20%] w-80 h-80 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-20%] w-96 h-96 bg-emerald-600/15 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <header className="bg-white/5 backdrop-blur-2xl px-6 py-5 border-b border-white/10 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3 text-emerald-400">
          <ShieldCheck size={28} strokeWidth={2.5} className="drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          <h1 className="text-xl font-bold tracking-widest uppercase text-white drop-shadow-md">HealthGuard</h1>
        </div>
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:bg-white/20 transition-all shadow-lg active:scale-90"
        >
          <User size={18} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 pb-28 relative z-10 space-y-8 no-scrollbar">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <section>
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Daily Status</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-lg p-5 rounded-3xl border border-white/10 shadow-xl group">
                  <div className="bg-blue-500/20 text-blue-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/30">
                    <Zap size={22} />
                  </div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Activity</p>
                  <p className="text-2xl font-bold tracking-tight">4,281 <span className="text-xs text-white/40 font-normal">steps</span></p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-lg p-5 rounded-3xl border border-white/10 shadow-xl group">
                  <div className="bg-rose-500/20 text-rose-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-rose-500/30">
                    <Heart size={22} className="animate-pulse" />
                  </div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Heart Rate</p>
                  <p className="text-2xl font-bold tracking-tight">72 <span className="text-xs text-white/40 font-normal">bpm</span></p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-emerald-500/20 to-emerald-900/30 backdrop-blur-xl rounded-[2.5rem] p-7 border border-emerald-400/20 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 bg-emerald-400/10 w-40 h-40 rounded-full blur-2xl"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Health Index</h3>
                  <p className="text-emerald-200/60 text-xs uppercase tracking-widest mt-2">Personal Score: 88/100</p>
                </div>
                <Award className="text-emerald-300 drop-shadow-[0_0_15px_rgba(110,231,183,0.6)]" size={32} />
              </div>
              <p className="text-sm text-emerald-50/70 leading-relaxed mb-6 relative z-10 font-light">
                Your performance is 12% higher than last week. Maintain your hydration levels to reach 95.
              </p>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 py-3 px-6 rounded-2xl text-sm font-semibold inline-flex items-center gap-2 w-full justify-center relative z-10">
                Detailed Analysis <ChevronRight size={16} />
              </button>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Quick Check</h2>
              <div className="space-y-4">
                {[
                  { label: 'Sleep Quality', value: '7.5 hrs', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/10' },
                  { 
                    label: 'Hydration', 
                    value: `${waterConsumed.toFixed(1)} / 2.5 L`, 
                    icon: waterConsumed >= 2.0 ? CheckCircle2 : AlertCircle, 
                    color: waterConsumed >= 2.0 ? 'text-emerald-400' : 'text-amber-400', 
                    bg: waterConsumed >= 2.0 ? 'bg-emerald-400/10' : 'bg-amber-400/10', 
                    border: waterConsumed >= 2.0 ? 'border-emerald-400/10' : 'border-amber-400/10' 
                  },
                  { label: 'Meditation', value: `${meditationSessions} sessions`, icon: Wind, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/10' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
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
              <h2 className="text-3xl font-bold tracking-tight mb-1 font-serif">Calculator</h2>
              <p className="text-white/50 text-sm">Measure your body metrics</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-7 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 text-emerald-400 mb-6 border-b border-white/10 pb-4">
                <Scale size={24} />
                <span className="font-bold text-lg tracking-wide text-white uppercase">Body Mass Index</span>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">Height (cm)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all text-white placeholder-white/20 text-lg"
                    placeholder="175"
                    value={bmiData.height}
                    onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">Weight (kg)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all text-white placeholder-white/20 text-lg"
                    placeholder="70"
                    value={bmiData.weight}
                    onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                  />
                </div>
                <button 
                  onClick={calculateBMI}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
                >
                  Calculate Results
                </button>
              </div>

              {bmiResult && (
                <div className="mt-8 pt-8 border-t border-white/10 text-center animate-in zoom-in duration-300">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Analysis</p>
                  <p className="text-7xl font-black my-2 drop-shadow-2xl">{bmiResult.value}</p>
                  <div className={`inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 mt-2`}>
                    <p className={`font-bold tracking-widest uppercase text-xs ${bmiResult.color} drop-shadow-[0_0_8px_currentColor]`}>
                      {bmiResult.category}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'checker' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <div>
               <h2 className="text-3xl font-bold tracking-tight mb-1 font-serif">Health Guard</h2>
               <p className="text-white/50 text-sm">Precision habit tracking</p>
             </div>

             <div className="space-y-5">
                {/* Body Temp */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold flex items-center gap-2 text-white/80">
                      <Thermometer size={18} className="text-orange-400"/> 
                      Body Temp
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-3 py-1 rounded-lg font-black tracking-widest uppercase">Normal</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black tracking-tighter">36.6</span>
                    <span className="text-white/30 pb-2 text-xl font-light">°C</span>
                  </div>
                </div>

                {/* Hydration Tracker */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-white/90">
                      <Droplets className="text-blue-400" size={20} />
                      Hydration
                    </h3>
                    <span className="text-[10px] text-white/40 font-black tracking-widest">{waterConsumed.toFixed(1)}L / 2.5L</span>
                  </div>
                  
                  <div className="relative mt-2">
                    <div className="absolute top-[1.35rem] left-6 right-6 h-0.5 bg-white/10 z-0"></div>
                    <div className="flex justify-between relative z-10">
                      {hydrationLog.map((log) => (
                        <div key={log.id} className="flex flex-col items-center gap-3">
                          <button 
                            onClick={() => toggleHydration(log.id)}
                            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              log.status === 'yes' ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]' :
                              log.status === 'no' ? 'bg-rose-500/10 border-rose-400 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]' :
                              'bg-black/60 border-white/10 text-white/20 hover:border-white/40'
                            }`}
                          >
                            {log.status === 'yes' && <Check size={20} strokeWidth={3} />}
                            {log.status === 'no' && <X size={20} strokeWidth={3} />}
                            {log.status === 'pending' && <BellRing size={14} className="opacity-30" />}
                          </button>
                          <p className="text-[9px] font-black text-white/40 tracking-tighter uppercase">{log.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Zen Timer Panel */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-white/90">
                      <Wind className="text-purple-400" size={20} />
                      Zen Timer
                    </h3>
                    <span className="text-purple-400 text-[10px] px-3 py-1 bg-purple-500/10 rounded-lg font-black tracking-widest">
                      {meditationSessions} SESSIONS
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center mb-6 px-4">
                    <span className="text-5xl font-black text-white mb-4">{meditationMinutes}<span className="text-xl text-white/20 ml-1 font-light">min</span></span>
                    <input 
                      type="range" 
                      min="1" max="60" 
                      value={meditationMinutes} 
                      onChange={(e) => setMeditationMinutes(parseInt(e.target.value))}
                      className="w-full accent-purple-500 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  <button 
                    onClick={startMeditation}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
                  >
                    <Play fill="currentColor" size={20} /> Deep Concentration
                  </button>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0a0a0e]/80 backdrop-blur-2xl border-t border-white/10 flex justify-around px-2 pb-8 pt-3 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <NavItem id="dashboard" icon={Activity} label="Status" />
        <NavItem id="calculator" icon={Calculator} label="Calc" />
        <NavItem id="checker" icon={ShieldCheck} label="Guard" />
      </nav>

      {/* --- Profile Glassmorphism Panel (Overlay) --- */}
      {isProfileOpen && (
        <div className="absolute inset-0 z-50 bg-black/95 animate-in fade-in duration-300 flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 pt-10 pb-10 no-scrollbar">
            
            {/* Header / Close */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black tracking-tighter uppercase font-serif">User Profile</h2>
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Info Cards (Glass Morphism) */}
            <div className="space-y-6">
              
              {/* Primary Identity Card */}
              <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-blue-500"></div>
                <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-blue-500 rounded-full flex items-center justify-center p-1 mb-6 shadow-2xl">
                  <div className="w-full h-full bg-[#0a0a0e] rounded-full flex items-center justify-center">
                    <User size={48} className="text-white/80" />
                  </div>
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-1">Venki Venom</h3>
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black tracking-[0.2em] uppercase bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                  <Gem size={12} /> Premium Active
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Gender', value: 'Male', icon: UserCircle },
                  { label: 'Age', value: '24', icon: Activity },
                  { label: 'Birthday', value: '26 Oct 2001', icon: Calendar },
                  { label: 'Country', value: 'Australia', icon: MapPin },
                  { label: 'City', value: 'Sydney', icon: MapPin },
                  { label: 'Contact', value: '+61 4XX XXX XXX', icon: Phone },
                  { label: 'Weight', value: '70 kg', icon: Scale },
                  { label: 'Height', value: '175 cm', icon: Ruler },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10">
                    <item.icon size={14} className="text-white/30 mb-2" />
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="font-bold text-white/90">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Extended Info Panel */}
              <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 space-y-5">
                <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                   <Mail size={18} className="text-purple-400 mt-1" />
                   <div>
                     <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Email Address</p>
                     <p className="text-sm font-bold">venkivenom@healthguard.au</p>
                   </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                   <Phone size={18} className="text-rose-400 mt-1" />
                   <div>
                     <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Emergency Contact</p>
                     <p className="text-sm font-bold">+61 000 000 000</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <Heart size={18} className="text-emerald-400 mt-1" />
                   <div>
                     <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Interests</p>
                     <p className="text-sm font-bold">Meditation, Bio-hacking, HIIT, Psychology</p>
                   </div>
                </div>
              </div>

              {/* Offers/Coupons Section - Styled after Ticket Screenshot */}
              <div className="mt-8 space-y-4">
                <h4 className="text-[10px] font-black text-white/40 tracking-widest uppercase px-2 mb-4">My Offers & Coupons</h4>
                
                {/* Glass Ticket Card */}
                <div className="relative overflow-hidden group">
                  <div className="bg-white/10 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/20 flex items-center justify-between shadow-2xl relative">
                    {/* Notch Cutouts for Ticket Effect */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border border-white/20"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border border-white/20"></div>
                    
                    <div className="flex-1 border-r border-dashed border-white/20 pr-6 mr-6">
                      <p className="text-[10px] font-black text-emerald-400 tracking-widest uppercase mb-1">Valid Until Oct 2026</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black tracking-tighter italic">30</span>
                        <span className="text-2xl font-black">% OFF</span>
                      </div>
                      <p className="text-xs font-bold text-white/60 mt-1 uppercase">Any Wellness Retreat</p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                       <Barcode size={40} className="text-white/40" />
                       <span className="text-[8px] font-mono tracking-widest text-white/20">#AU-HGUARD-26</span>
                    </div>
                  </div>
                </div>

                {/* Smaller Partner Offer */}
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Ticket size={24} className="text-blue-300" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">2-for-1 Gym Pass</h5>
                    <p className="text-[10px] font-medium text-white/40 uppercase">Partner: Fitness First AU</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-white/30" />
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meditation Overlay */}
      {isMeditating && (
        <div className="absolute inset-0 z-50 bg-[#060608]/98 backdrop-blur-3xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="bg-white/5 backdrop-blur-[40px] p-8 rounded-[4rem] border border-white/10 flex flex-col items-center w-full max-w-[320px] relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px] animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <h2 className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-black mb-10 relative z-10">Neural Alignment</h2>

            <div className="relative w-32 h-32 flex items-center justify-center animate-[bounce_5s_ease-in-out_infinite] mb-12 z-10">
               <div className="absolute inset-0 bg-purple-400/10 rounded-full blur-2xl animate-ping" style={{ animationDuration: '4s' }}></div>
               <Wind size={64} className="text-purple-200/80 drop-shadow-[0_0_20px_rgba(216,180,254,0.4)]" />
            </div>

            <div className="text-6xl font-black tracking-[0.1em] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-12 relative z-10 font-mono">
              {formatTime(timeRemaining)}
            </div>

            <button 
              onClick={stopMeditation}
              className="bg-white/5 border border-white/20 hover:bg-white/10 text-white/60 hover:text-white px-10 py-4 rounded-full font-black tracking-[0.2em] text-[10px] uppercase transition-all flex items-center gap-2 relative z-10"
            >
              <Square fill="currentColor" size={10} /> Disconnect
            </button>
          </div>
        </div>
      )}

      {/* --- Audio Element: Brainwave Entrainment Frequencies --- */}
      <audio 
        ref={audioRef} 
        src="theta-4-to-8-hz-brainwave-entrainment-frequencies-290051 (1).mp3" 
        loop 
        preload="auto" 
      />
    </div>
  );
};

const Ruler = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.3 15.3l-9.3-9.3c-.4-.4-1-.4-1.4 0l-4.3 4.2c-.4.4-.4 1 0 1.4l9.3 9.3c.4.4 1 .4 1.4 0l4.3-4.2c.4-.4.4-1 0-1.4z"/>
    <path d="M7 14l-1.5-1.5"/><path d="M10 11l-1.5-1.5"/><path d="M13 8l-1.5-1.5"/>
  </svg>
);

export default App;
