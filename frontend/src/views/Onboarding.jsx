import React from 'react';

export default function Onboarding({ onLogin }) {
  const [name, setName] = React.useState('');

  return (
    <div className="bg-surface text-onSurface min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-inter w-full">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondaryContainer/20 blur-[120px] pointer-events-none"></div>
      
      {/* Main Onboarding Container */}
      <main className="w-full max-w-md z-10">
        {/* Top Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-4xl">visibility</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-onSurface mb-2">Drishti AI</h1>
          <p className="text-onSurfaceVariant font-medium">Your sanctuary for digital eye wellness.</p>
        </div>
        
        {/* Elevate Mica Card */}
        <div className="backdrop-blur-[20px] bg-white/70 rounded-[2rem] shadow-[0px_8px_32px_rgba(0,0,0,0.04)] p-8 md:p-10 border border-white/40">
          <header className="mb-8">
            <h2 className="text-xl font-bold text-onSurface">Secure Onboarding</h2>
            <p className="text-sm text-onSurfaceVariant mt-1">Start your journey to better vision.</p>
          </header>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(name); }}>
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-onSurface block px-1" htmlFor="name">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">person</span>
                </div>
                <input 
                  className="w-full h-14 bg-surfaceContainerLow border-none rounded-xl pl-12 pr-4 text-onSurface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:bg-surfaceContainerHighest transition-all outline-none" 
                  id="name" 
                  name="name" 
                  placeholder="e.g. Alex Rivera" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Email Address Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-onSurface block px-1" htmlFor="email">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">mail</span>
                </div>
                <input 
                  className="w-full h-14 bg-surfaceContainerLow border-none rounded-xl pl-12 pr-4 text-onSurface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:bg-surfaceContainerHighest transition-all outline-none" 
                  id="email" 
                  name="email" 
                  placeholder="name@example.com" 
                  type="email"
                  required
                />
              </div>
            </div>
            
            {/* Primary Action */}
            <div className="pt-2">
              <button 
                className="w-full h-14 bg-gradient-to-r from-primary to-primaryContainer text-white font-bold rounded-xl shadow-[0px_4px_16px_rgba(0,95,170,0.25)] hover:shadow-[0px_8px_24px_rgba(0,95,170,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
                type="submit"
              >
                Get Started
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>
          
          <footer className="mt-8 pt-6 border-t border-surfaceContainerHighest text-center">
            <p className="text-xs text-onSurfaceVariant leading-relaxed">
              By continuing, you agree to Drishti AI's 
              <a className="text-primary font-semibold hover:underline bg-transparent px-1" href="#/">Privacy Policy</a> and 
              <a className="text-primary font-semibold hover:underline bg-transparent px-1" href="#/">Terms of Service</a>.
            </p>
          </footer>
        </div>
        
        {/* Secondary Navigation/Links */}
        <div className="mt-8 text-center flex flex-col gap-4">
          <p className="text-sm text-onSurfaceVariant">
            Already have an account? 
            <button type="button" onClick={onLogin} className="text-primary font-bold hover:underline bg-transparent px-1 border-none cursor-pointer">Sign In</button>
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="w-10 h-10 rounded-full bg-surfaceContainerHighest flex items-center justify-center cursor-pointer hover:bg-surfaceDim transition-colors">
              <span className="material-symbols-outlined text-lg">key</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surfaceContainerHighest flex items-center justify-center cursor-pointer hover:bg-surfaceDim transition-colors">
              <span className="material-symbols-outlined text-lg">fingerprint</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Bottom Decorative Image/Visual */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl opacity-20 pointer-events-none px-6 mb-[-40px]">
        <img 
          alt="Cybersecurity and vision tech" 
          className="w-full h-32 object-cover rounded-[3rem] grayscale" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuARB_ZZ3SiVFmsOdzDxzb2b3Pb19Wn2-kCRB_A6zWD0E87GqVCFQ2Z-cB56dqUrWE3keiomFK6vCJ662Vqu_7uY7EC4somTcUxUKD-zWx5gUFeZ0uTz2j1QXR37rcAr_i5fUYHA3UNMqDQ6QkK2mOmYKm-UuLp0Ie2G6aCENQ3st9W3JKoFlqhGAFMDhkzke8OY0KyWJ1_fejc0KGRY1xxb_jmEYh7zRtaeAJOhEZRABDLWYhLUwM4pYVAtWGgc9QPE67M_grLDXarf"
        />
      </div>
    </div>
  );
}
