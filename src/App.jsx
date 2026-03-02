import React, { useState, useEffect } from 'react'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <div className={`relative h-screen w-screen overflow-hidden transition-all duration-700 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className={`absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-3xl animate-pulse transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-r from-brand-yellow/30 to-crown-yellow/20'
            : 'bg-gradient-to-r from-yellow-300/40 to-orange-300/30'
        }`}></div>
        <div className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
            : 'bg-gradient-to-r from-blue-400/30 to-purple-400/30'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl animate-pulse delay-500 transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10'
            : 'bg-gradient-to-r from-purple-300/20 to-pink-300/20'
        }`}></div>

        {/* Grid Pattern Overlay */}
        <div className={`absolute inset-0 bg-[size:64px_64px] transition-opacity duration-700 ${
          isDark
            ? 'bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] opacity-100'
            : 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] opacity-50'
        }`}></div>

        {/* Radial Gradient Vignette */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-100'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] opacity-100'
        }`}></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo & Title with Glass Effect + Theme Toggle */}
        <div className="flex items-center justify-between pt-8 pb-6 px-8 max-w-7xl mx-auto w-full">
          <div className={`flex items-center space-x-3 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl transition-all duration-500 ${
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/70 border border-gray-200/50'
          }`}>
            <img src="/crown-logo.svg" alt="Promotiemeester Crown" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(253,185,19,0.5)]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-yellow via-crown-yellow to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
              Promotiemeester
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`relative w-16 h-8 rounded-full backdrop-blur-xl transition-all duration-500 shadow-lg ${
              isDark
                ? 'bg-slate-700/50 border border-white/10'
                : 'bg-blue-200/50 border border-gray-300/50'
            }`}
            aria-label="Toggle theme"
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center ${
              isDark
                ? 'left-1 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg'
                : 'left-9 bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg'
            }`}>
              {isDark ? (
                <span className="text-xs">🌙</span>
              ) : (
                <span className="text-xs">☀️</span>
              )}
            </div>
          </button>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-7xl w-full">
            {/* Two Product Cards with Glass Morphism */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

              {/* SEO Meester Product */}
              <div className={`group relative backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
                isDark
                  ? 'bg-white/10 border border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:border-blue-400/50'
                  : 'bg-white/70 border border-gray-200/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:border-blue-400/70'
              }`}>
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="relative z-10">
                  <div className={`p-4 aspect-video flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-500 ${
                    isDark
                      ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/30'
                      : 'bg-gradient-to-br from-blue-100 to-indigo-200'
                  }`}>
                    <img
                      src="/seo-meester-screenshot.png"
                      alt="SEO Meester Dashboard"
                      className="w-full h-full object-contain rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${
                      isDark
                        ? 'from-blue-300 to-cyan-300'
                        : 'from-blue-600 to-cyan-600'
                    }`}>SEO Meester</h3>
                    <p className={`mb-4 text-sm leading-relaxed transition-colors duration-500 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Kom bovenaan in AI-zoekmachines zoals ChatGPT, Perplexity en Google.
                    </p>
                    <ul className={`space-y-2 mb-6 text-sm transition-colors duration-500 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <li className="flex items-start transition-all duration-300 hover:translate-x-1">
                        <span className="text-crown-yellow mr-2 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">✓</span>
                        <span>AI-geoptimaliseerde content strategie</span>
                      </li>
                      <li className="flex items-start transition-all duration-300 hover:translate-x-1">
                        <span className="text-crown-yellow mr-2 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">✓</span>
                        <span>Real-time ranking monitoring</span>
                      </li>
                      <li className="flex items-start transition-all duration-300 hover:translate-x-1">
                        <span className="text-crown-yellow mr-2 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">✓</span>
                        <span>Geautomatiseerde keyword research</span>
                      </li>
                      <li className="flex items-start transition-all duration-300 hover:translate-x-1">
                        <span className="text-crown-yellow mr-2 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">✓</span>
                        <span>Concurrent analyse & insights</span>
                      </li>
                    </ul>
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-500 hover:to-cyan-500">
                      Start met SEO Meester →
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media Meester Product */}
              <div className={`group relative backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
                isDark
                  ? 'bg-white/10 border border-white/20 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:border-pink-400/50'
                  : 'bg-white/70 border border-gray-200/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.2)] hover:border-pink-400/70'
              }`}>
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="relative z-10">
                  <div className={`p-4 aspect-video flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-500 ${
                    isDark
                      ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/30'
                      : 'bg-gradient-to-br from-pink-100 to-purple-200'
                  }`}>
                    <img
                      src="/social-media-meester-screenshot.png"
                      alt="Social Media Meester Dashboard"
                      className="w-full h-full object-contain rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${
                      isDark
                        ? 'from-pink-300 to-purple-300'
                        : 'from-pink-600 to-purple-600'
                    }`}>Social Media Meester</h3>
                    <p className={`mb-4 text-sm leading-relaxed transition-colors duration-500 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Automatiseer je social media strategie met AI. Plan, creëer en publiceer content.
                    </p>
                    <ul className={`space-y-2 mb-6 text-sm transition-colors duration-500 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <li className="flex items-start transition-all duration-300 hover:translate-x-1">
                        <span className="text-crown-yellow mr-2 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">✓</span>
                        <span>AI content generatie & planning</span>
                      </li>
                      <li className="flex items-start transition-all duration-300 hover:translate-x-1">
                        <span className="text-crown-yellow mr-2 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">✓</span>
                        <span>Multi-platform scheduling</span>
                      </li>
                      <li className="flex items-start transition-all duration-300 hover:translate-x-1">
                        <span className="text-crown-yellow mr-2 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">✓</span>
                        <span>Engagement tracking & analytics</span>
                      </li>
                      <li className="flex items-start transition-all duration-300 hover:translate-x-1">
                        <span className="text-crown-yellow mr-2 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">✓</span>
                        <span>Trend detection & recommendations</span>
                      </li>
                    </ul>
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transform hover:-translate-y-1 transition-all duration-300 hover:from-pink-500 hover:to-purple-500">
                      Start met Social Media Meester →
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer with Glass Effect */}
        <div className="text-center py-4">
          <div className={`inline-block backdrop-blur-xl px-6 py-2 rounded-full transition-all duration-500 ${
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/50 border border-gray-200/50'
          }`}>
            <p className={`text-sm transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>© 2026 Promotiemeester. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
