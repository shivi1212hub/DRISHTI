import React from 'react';

export default function ClinicalProfile() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20 max-w-3xl mx-auto">
      {/* Editorial Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-primary mb-2">
          <span className="material-symbols-outlined text-sm">shield</span>
          <span className="text-sm font-semibold tracking-wider uppercase font-inter">Step 2 of 4</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-onSurface mb-3">Clinical Eye Profile</h2>
        <p className="text-onSurfaceVariant text-md leading-relaxed">
          Provide your baseline vision data to calibrate our AI diagnostics. This information is stored securely using medical-grade encryption.
        </p>
      </header>

      {/* Main Form Content */}
      <div className="space-y-6">
        
        {/* Question: Corrective Lenses */}
        <section className="bg-surfaceContainerLowest rounded-xl p-6 shadow-[0px_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">eyeglasses</span>
              </div>
              <div>
                <h3 className="font-bold text-onSurface">Do you wear glasses?</h3>
                <p className="text-xs text-onSurfaceVariant">Includes contact lenses or reading aids</p>
              </div>
            </div>
            {/* Custom Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox" />
              <div className="w-14 h-8 bg-surfaceContainerHighest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          {/* Conditional Power Input */}
          <div className="space-y-4 pt-4 border-t border-surfaceContainerLow">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-onSurfaceVariant">Prescription Power (Diopters)</label>
              <button className="text-primary text-xs flex items-center gap-1 font-medium bg-transparent border-none cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">info</span>
                How to read your Rx?
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-outline uppercase tracking-widest ml-1">OD (Right Eye)</span>
                <div className="relative">
                  <input className="w-full bg-surfaceContainerLow border-none rounded-xl px-4 py-3 text-onSurface focus:ring-2 focus:ring-primary/20 transition-all outline-none" type="text" defaultValue="-2.75" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline text-xs mt-[-2px]">SPH</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-outline uppercase tracking-widest ml-1">OS (Left Eye)</span>
                <div className="relative">
                  <input className="w-full bg-surfaceContainerLow border-none rounded-xl px-4 py-3 text-onSurface focus:ring-2 focus:ring-primary/20 transition-all outline-none" type="text" defaultValue="-2.50" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline text-xs mt-[-2px]">SPH</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Question: Medical Conditions */}
        <section className="bg-surfaceContainerLowest rounded-xl p-6 shadow-[0px_8px_32px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">clinical_notes</span>
              </div>
              <div>
                <h3 className="font-bold text-onSurface">Existing Conditions</h3>
                <p className="text-xs text-onSurfaceVariant">Select any that apply to your medical history</p>
              </div>
            </div>
            <button className="p-2 text-outline hover:bg-surfaceContainerLow rounded-full transition-colors border-none bg-transparent cursor-pointer">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
          
          {/* Tag Picker / Combobox */}
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline mt-[-2px]">search</span>
            <input className="w-full bg-surfaceContainerLow border-none rounded-xl pl-12 pr-4 py-3 text-onSurface focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Search conditions (e.g. Glaucoma...)" type="text" />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button className="px-4 py-2 rounded-full border-none cursor-pointer bg-primary text-white text-sm font-medium flex items-center gap-2">
              Myopia <span className="material-symbols-outlined text-xs">close</span>
            </button>
            <button className="px-4 py-2 rounded-full border-none cursor-pointer bg-primary text-white text-sm font-medium flex items-center gap-2">
              Dry Eye <span className="material-symbols-outlined text-xs">close</span>
            </button>
            <button className="px-4 py-2 rounded-full border-none cursor-pointer bg-surfaceContainerHigh text-onSurfaceVariant text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all">
              Astigmatism
            </button>
            <button className="px-4 py-2 rounded-full border-none cursor-pointer bg-surfaceContainerHigh text-onSurfaceVariant text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all">
              Glaucoma
            </button>
            <button className="px-4 py-2 rounded-full border-none cursor-pointer bg-surfaceContainerHigh text-onSurfaceVariant text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all">
              Cataracts
            </button>
          </div>
        </section>

        {/* Data Transparency Card */}
        <section className="bg-primary/5 rounded-xl p-6 flex gap-4 items-start border border-primary/10">
          <div className="text-primary mt-1">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-1">How is this data used?</h4>
            <p className="text-sm text-onSurfaceVariant leading-relaxed">
              Drishti AI uses these parameters to differentiate between pre-existing refractive errors and acute eye fatigue patterns. Your medical profile is never shared with third parties.
            </p>
            <button className="mt-3 text-sm font-bold text-primary underline decoration-2 underline-offset-4 bg-transparent border-none cursor-pointer p-0">
              Read Data Privacy Protocol
            </button>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg border-none cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
            Complete Profile
          </button>
          <button className="px-8 bg-surfaceContainerHigh text-onSurfaceVariant font-bold py-4 rounded-xl border-none cursor-pointer hover:bg-surfaceContainerHighest transition-all">
            Skip for Now
          </button>
        </div>
        
      </div>
    </div>
  );
}
