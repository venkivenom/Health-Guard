import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Activity, 
  Calculator, 
  ShieldCheck, 
  User, 
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
  MapPin, 
  Calendar, 
  Gem, 
  Award, 
  Barcode, 
  Quote, 
  Pencil,
  Smartphone,
  ScanLine,
  Loader2
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  
  // Permissions State
  const [showPermission, setShowPermission] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  // Profile State
  const [profile, setProfile] = useState({
    name: 'Venki Venom',
    age: '24',
    country: 'Australia',
    city: 'Sydney',
    email: 'venkivenom@healthguard.au',
    screenTime: 6.4 
  });

  // Body Temperature Logic
  const [bodyTemp, setBodyTemp] = useState('36.6');
  const [isScanningTemp, setIsScanningTemp] = useState(false);

  const scanTemperature = () => {
    setIsScanningTemp(true);
    setTimeout(() => {
      // Simulate reading a slight fluctuation
      const newTemp = (36.1 + Math.random() * 1.1).toFixed(1);
      setBodyTemp(newTemp);
      setIsScanningTemp(false);
    }, 2000);
  };

  // BMI Calculator State
  const [bmiData, setBmiData] = useState({ weight: '70', height: '175' });
  const [bmiResult, setBmiResult] = useState(null);
  
  // Protocol Logic
  const [dailyProtocol, setDailyProtocol] = useState("");
  const protocolPool = [
    "Cellular regeneration protocol: Prioritize deep sleep phase to optimize mitochondrial health.",
    "System override: Reduce ocular screen exposure by 15% to increase melatonin secretion.",
    "Baseline calibration: Integrated hydration levels currently dictate a 0.5L intake within 60 minutes.",
    "Metabolic loop: Circadian rhythm alignment achieved via morning solar exposure.",
    "Neuro-optimization: 5-minute theta-wave meditation required to stabilize cortisol levels.",
    "Vitality check: Heart rate variability indicates a need for low-impact recovery today.",
    "Digital Detox: Screen time threshold reached. Initiate 20-minute ocular rest cycle."
  ];

  useEffect(() => {
    const randomProtocol = protocolPool[Math.floor(Math.random() * protocolPool.length)];
    setDailyProtocol(randomProtocol);
  }, []);

  // Sleep Quality calculation based on permissions and screen time
  const sleepQuality = permissionGranted ? (9.5 - (profile.screenTime * 0.35)).toFixed(1) : "—";

  // Hydration Tracker State
  const [hydrationLog, setHydrationLog] = useState([
    { id: 1, time: '9 AM', status: 'pending' },
    { id: 2, time: '12 PM', status: 'pending' },
    { id: 3, time: '3 PM', status: 'pending' },
    { id: 4, time: '6 PM', status: 'pending' },
    { id: 5, time: '9 PM', status: 'pending' },
  ]);

  // Meditation State
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationMinutes, setMeditationMinutes] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [meditationSessions, setMeditationSessions] = useState(0);

  useEffect(() => {
    let interval;
    if (isMeditating && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isMeditating && timeRemaining === 0) {
      setIsMeditating(false);
      setMeditationSessions((prev) => prev + 1);
    }
    return () => clearInterval(interval);
  }, [isMeditating, timeRemaining]);

  const startMeditation = () => {
    setTimeRemaining(meditationMinutes * 60);
    setIsMeditating(true);
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

  const calculateBMI = () => {
    const w = parseFloat(bmiData.weight);
    const h = parseFloat(bmiData.height) / 100;
    if (w > 0 && h > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      let category = '';
      let color = '';
      if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-400 bg-blue-400/10 border-blue-400/20'; }
      else if (bmi < 25) { category = 'Healthy'; color = 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'; }
      else if (bmi < 30) { category = 'Overweight'; color = 'text-amber-400 bg-amber-400/10 border-amber-400/20'; }
      else { category = 'Obese'; color = 'text-rose-400 bg-rose-400/10 border-rose-400/20'; }
      setBmiResult({ value: bmi, category, color });
    }
  };

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setIsEditing(null);
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center justify-center w-full py-4 transition-all duration-300 ${
        activeTab === id 
          ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]' 
          : 'text-white/40 hover:text-white/80'
      }`}
    >
      <Icon size={24} className={activeTab === id ? 'scale-110' : ''} strokeWidth={activeTab === id ? 2.5 : 2} />
      <span className="text-[10px] mt-2 font-medium tracking-widest uppercase">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl">
      
      {/* Background Deep Glows */}
      <div className="absolute top-[-5%] left-[-15%] w-96 h-96 bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Permission Modal */}
      {showPermission && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] w-full text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <Smartphone size={32} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold mb-3 tracking-tight">Screen Time Access</h2>
            <p className="text-sm text-white/60 mb-8 leading-relaxed">
              Health Guard requires access to your screen time data to accurately calculate your sleep quality and provide personalized recovery protocols.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => { setPermissionGranted(false); setShowPermission(false); }} 
                className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-medium hover:bg-white/10 transition-colors"
              >
                Deny
              </button>
              <button 
                onClick={() => { setPermissionGranted(true); setShowPermission(false); }} 
                className="flex-1 py-3.5 rounded-2xl bg-emerald-500 text-black font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 transition-all"
              >
                Allow Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl px-6 py-6 border-b border-white/10 flex justify-between items-center sticky top-0 z-40">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <ShieldCheck size={18} strokeWidth={2.5} />
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">Health Guard</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome, {profile.name.split(' ')[0]}</h1>
        </div>
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white shadow-lg active:scale-90 transition-all hover:bg-white/20"
        >
          <User size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 pb-40 relative z-10 space-y-8 no-scrollbar scroll-smooth">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            
            {/* Daily Protocol Glass Card */}
            <section className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-6 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
                    <Zap size={16} className="animate-pulse" />
                  </div>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/60">Active Protocol</h3>
               </div>
               <div className="flex gap-4 items-start">
                 <Quote size={20} className="text-emerald-400/40 flex-shrink-0 mt-1" />
                 <p className="text-sm text-white/90 leading-relaxed font-medium">
                   {dailyProtocol}
                 </p>
               </div>
            </section>

            <section>
              <h2 className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-4 ml-1">Live Biometrics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-[1.5rem] border border-white/10 shadow-lg">
                  <div className="bg-blue-500/20 text-blue-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/20">
                    <Activity size={22} />
                  </div>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Steps</p>
                  <p className="text-2xl font-semibold tracking-tight text-white">4,281</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-[1.5rem] border border-white/10 shadow-lg">
                  <div className="bg-rose-500/20 text-rose-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-rose-500/20">
                    <Heart size={22} className="animate-[pulse_1.5s_infinite]" />
                  </div>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Resting HR</p>
                  <p className="text-2xl font-semibold tracking-tight text-white">72 <span className="text-sm text-white/40 font-normal">bpm</span></p>
                </div>
              </div>
            </section>

            <section className="bg-emerald-900/20 backdrop-blur-xl rounded-[2.5rem] p-8 border border-emerald-500/20 shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">Health Index</h3>
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mt-2">Efficiency: 88%</p>
                </div>
                <Award className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" size={32} />
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[88%] shadow-[0_0_10px_rgba(52,211,153,0.8)] rounded-full"></div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Your cellular recovery loop is functioning optimally today. Maintain current metrics.
              </p>
            </section>

            <section>
              <h2 className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-4 ml-1">Daily Log</h2>
              <div className="space-y-4">
                {[
                  { label: 'Sleep Quality', value: permissionGranted ? `${sleepQuality}h` : 'Locked', icon: Wind, color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/20' },
                  { label: 'Screen Time', value: `${profile.screenTime}h`, icon: Smartphone, color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500/20' },
                  { label: 'Hydration', value: `${waterConsumed.toFixed(1)}/2.5L`, icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/20' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-lg p-4 rounded-2xl border border-white/10 flex justify-between items-center transition-all hover:bg-white/10">
                    <div className="flex items-center gap-4">
                      <div className={`${item.bg} p-3 rounded-xl border`}>
                        <item.icon className={item.color} size={20} />
                      </div>
                      <span className="text-sm font-medium text-white/90">{item.label}</span>
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-2 text-white">Calculator</h2>
              <p className="text-white/50 text-sm">Measure biometrics for system calibration</p>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] space-y-8">
              <div className="flex items-center gap-3 text-emerald-400 mb-6 border-b border-white/10 pb-6">
                <Scale size={24} />
                <span className="font-bold text-[11px] tracking-widest text-white uppercase">Body Mass Index</span>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3 ml-1">Height (cm)</label>
                    <input 
                      type="number" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all text-white font-semibold text-lg"
                      placeholder="175"
                      value={bmiData.height}
                      onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3 ml-1">Weight (kg)</label>
                    <input 
                      type="number" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all text-white font-semibold text-lg"
                      placeholder="70"
                      value={bmiData.weight}
                      onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  onClick={calculateBMI}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-widest py-5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 transition-all"
                >
                  Calculate BMI
                </button>
              </div>

              {bmiResult && (
                <div className="mt-8 pt-8 border-t border-white/10 text-center animate-in zoom-in duration-300">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Your Result</p>
                  <p className="text-7xl font-bold mb-4 text-white tracking-tighter">{bmiResult.value}</p>
                  <div className={`inline-block px-6 py-2 rounded-full border ${bmiResult.color}`}>
                    <p className="font-bold tracking-widest uppercase text-[11px]">
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
               <h2 className="text-3xl font-semibold tracking-tight mb-2 text-white">Health Guard</h2>
               <p className="text-white/50 text-sm">Habit loops and precision tracking</p>
             </div>

             <div className="space-y-6">
                {/* Body Temp with Scanner Logic */}
                <div className="bg-white/10 backdrop-blur-2xl p-7 rounded-[2.5rem] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-5">
                    <span className="font-bold flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/60">
                      <Thermometer size={18} className="text-orange-400"/> 
                      Body Temperature
                    </span>
                    <button 
                      onClick={scanTemperature}
                      disabled={isScanningTemp}
                      className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 text-[10px] px-4 py-1.5 rounded-xl font-bold tracking-widest uppercase transition-all disabled:opacity-50"
                    >
                      {isScanningTemp ? <Loader2 size={12} className="animate-spin" /> : <ScanLine size={12} />}
                      {isScanningTemp ? 'Scanning' : 'Measure'}
                    </button>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className={`text-6xl font-semibold tracking-tighter transition-all duration-500 ${isScanningTemp ? 'opacity-30 blur-sm' : 'opacity-100 blur-0'}`}>
                      {bodyTemp}
                    </span>
                    <span className="text-white/40 pb-2 text-2xl font-light">°C</span>
                  </div>
                </div>

                {/* Hydration Tracker */}
                <div className="bg-white/10 backdrop-blur-2xl p-7 rounded-[2.5rem] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 text-white/60">
                      <Droplets className="text-blue-400" size={18} />
                      Intake Tracker
                    </h3>
                    <span className="text-[11px] text-emerald-400 font-bold tracking-widest">{waterConsumed.toFixed(1)}L / 2.5L</span>
                  </div>
                  
                  <div className="flex justify-between items-center px-1">
                    {hydrationLog.map((log) => (
                      <div key={log.id} className="flex flex-col items-center gap-4">
                        <button 
                          onClick={() => toggleHydration(log.id)}
                          className={`w-12 h-12 rounded-2xl border-2 transition-all duration-300 shadow-lg ${
                            log.status === 'yes' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' :
                            log.status === 'no' ? 'bg-rose-500/20 border-rose-400 text-rose-400' :
                            'bg-black/40 border-white/10 text-white/20 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center justify-center h-full">
                            {log.status === 'yes' && <Check size={22} strokeWidth={3} />}
                            {log.status === 'no' && <X size={22} strokeWidth={3} />}
                            {log.status === 'pending' && <BellRing size={16} className="opacity-40" />}
                          </div>
                        </button>
                        <p className="text-[9px] font-bold text-white/40 tracking-widest uppercase">{log.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zen Timer Panel */}
                <div className="bg-white/10 backdrop-blur-2xl p-7 rounded-[2.5rem] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 text-white/60">
                      <Wind className="text-purple-400" size={18} />
                      Focus Loop
                    </h3>
                    <span className="text-purple-300 text-[10px] px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg font-bold tracking-widest uppercase">
                      {meditationSessions} Active
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center mb-8 px-4">
                    <span className="text-5xl font-semibold text-white mb-6 tracking-tight">{meditationMinutes}<span className="text-xl text-white/40 ml-2 font-normal">min</span></span>
                    <input 
                      type="range" 
                      min="1" max="60" 
                      value={meditationMinutes} 
                      onChange={(e) => setMeditationMinutes(parseInt(e.target.value))}
                      className="w-full accent-emerald-400 bg-white/10 h-2 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  <button 
                    onClick={startMeditation}
                    className="w-full bg-emerald-500 text-black font-bold text-[12px] uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all"
                  >
                    <Play fill="currentColor" size={16} /> Synchronize
                  </button>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/70 backdrop-blur-2xl border-t border-white/10 flex justify-around px-2 pb-10 pt-4 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        <NavItem id="dashboard" icon={Activity} label="Status" />
        <NavItem id="calculator" icon={Scale} label="Calc" />
        <NavItem id="checker" icon={ShieldCheck} label="Guard" />
      </nav>

      {/* Profile Overlay */}
      {isProfileOpen && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-3xl animate-in slide-in-from-bottom duration-500 flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 pt-12 pb-16 no-scrollbar">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold tracking-widest uppercase text-white">User Profile</h2>
              <button 
                onClick={() => { setIsProfileOpen(false); setIsEditing(null); }} 
                className="p-3 bg-white/10 border border-white/20 rounded-2xl text-white/80 active:scale-90 shadow-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Main Card */}
              <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/20 flex flex-col items-center text-center relative shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
                
                <div className="relative mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center p-1 shadow-xl">
                    <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center overflow-hidden">
                      <User size={48} className="text-white/80" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-center mb-4">
                  {isEditing === 'name' ? (
                    <input 
                      className="bg-black/50 border-b-2 border-emerald-400 text-2xl font-bold text-center w-full focus:outline-none py-1 rounded-none text-white"
                      value={profile.name}
                      autoFocus
                      onChange={(e) => handleProfileUpdate('name', e.target.value)}
                      onBlur={() => setIsEditing(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditing(null)}
                    />
                  ) : (
                    <>
                      <h3 className="text-3xl font-semibold tracking-tight text-white">{profile.name}</h3>
                      <button onClick={() => setIsEditing('name')} className="text-white/40 hover:text-emerald-400 transition-colors p-1">
                        <Pencil size={18} />
                      </button>
                    </>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold tracking-widest uppercase bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20">
                  <Gem size={14} className="fill-current" /> Premium Sync
                </div>
              </div>

              {/* Data Grid with Edit Icons */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Age (Years)', value: profile.age, field: 'age', icon: Activity },
                  { label: 'Screen Log', value: `${profile.screenTime} h`, field: 'screenTime', icon: Smartphone },
                  { label: 'Location', value: profile.city, field: 'city', icon: MapPin },
                  { label: 'Country', value: profile.country, field: 'country', icon: MapPin },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/20 relative shadow-lg">
                    <item.icon size={18} className="text-white/40 mb-3" />
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-semibold text-white text-lg">{item.value}</p>
                    <button 
                      className="absolute top-5 right-5 p-2 bg-white/5 rounded-full text-white/40 hover:text-emerald-400 hover:bg-white/10 transition-colors"
                      onClick={() => {
                        const val = prompt(`Update ${item.label}:`, item.value.toString().replace(' h', ''));
                        if (val) {
                          const parsed = item.field === 'screenTime' ? parseFloat(val) || 0 : val;
                          handleProfileUpdate(item.field, parsed);
                        }
                      }}
                    >
                      <Pencil size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Empty Marketplace */}
              <div className="mt-8">
                <h4 className="text-[11px] font-bold text-white/40 tracking-widest uppercase px-2 mb-4">Marketplace</h4>
                <div className="bg-white/5 backdrop-blur-lg border border-dashed border-white/20 p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                  <Barcode size={40} className="mb-4 text-white/20" />
                  <p className="text-sm font-semibold text-white/60">No Coupons Active</p>
                  <p className="text-[10px] mt-2 text-white/30 uppercase tracking-widest">Protocol achievements required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meditation Loop Overlay */}
      {isMeditating && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
          <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-[4rem] border border-white/20 flex flex-col items-center w-full max-w-[340px] relative shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]">
            <h2 className="text-emerald-400 text-[11px] uppercase tracking-widest font-bold mb-12">Focus Synchronization</h2>
            <div className="relative w-36 h-36 flex items-center justify-center animate-pulse mb-12">
               <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping duration-[3000ms]"></div>
               <Wind size={64} className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]" />
            </div>
            
            <p className="mb-10 text-[11px] font-medium text-center text-white/60 leading-relaxed">
              Disconnect from external stimuli. Calibrate breathing to internal rhythm.
            </p>

            <div className="text-7xl font-semibold tracking-tight text-white mb-12 font-mono drop-shadow-md">
              {formatTime(timeRemaining)}
            </div>
            <button 
              onClick={() => setIsMeditating(false)}
              className="bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white px-10 py-5 rounded-2xl font-bold tracking-widest text-[11px] uppercase transition-all flex items-center gap-3 active:scale-95 shadow-lg"
            >
              <Square fill="currentColor" size={12} /> De-Sync
            </button>
          </div>
        </div>
      )}

      {/* OS Variations: iOS/Android Safe Area Handle */}
      <div className="h-8 w-full bg-[#050505] shrink-0 relative flex justify-center items-end pb-2">
        <div className="w-32 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
