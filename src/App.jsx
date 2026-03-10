import React, { useState, useEffect } from 'react'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('') // Bot trap
  const [timestamp, setTimestamp] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleSignup = (productName) => {
    setSelectedProduct(productName)
    setShowModal(true)
    setShowSuccess(false)
    setEmail('')
    setHoneypot('')
    setErrorMessage('')
    setTimestamp(Math.floor(Date.now() / 1000)) // Record when form opened
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          product: selectedProduct,
          website: honeypot, // Honeypot field
          timestamp, // Anti-bot timestamp
        }),
      })

      const data = await response.json()

      if (data.success) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowModal(false)
          setShowSuccess(false)
          setEmail('')
        }, 3000)
      } else {
        setErrorMessage(data.message || 'Er is iets misgegaan. Probeer het later opnieuw.')
      }
    } catch (error) {
      setErrorMessage('Netwerkfout. Controleer je internetverbinding.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        {/* Logo + Theme Toggle */}
        <div className="relative pt-8 pb-6 px-8 max-w-7xl mx-auto w-full">
          {/* Centered Logo */}
          <div className="flex items-center justify-center">
            <img
              src={isDark ? '/promotiemeester_white.png' : '/promotiemeester.png'}
              alt="PromotieMeester"
              className="h-24 w-auto drop-shadow-lg transition-all duration-700"
            />
          </div>

          {/* Theme Toggle - Absolute positioned top right */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`absolute top-8 right-8 w-16 h-8 rounded-full backdrop-blur-xl transition-all duration-500 shadow-lg ${
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
                  <div className={`aspect-video flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-500 ${
                    isDark
                      ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/30'
                      : 'bg-gradient-to-br from-blue-100 to-indigo-200'
                  }`}>
                    <img
                      src="/seo-meester-screenshot.png"
                      alt="SEO Meester Dashboard"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                    <button
                      onClick={() => handleSignup('SEO Meester')}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-500 hover:to-cyan-500"
                    >
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
                  <div className={`aspect-video flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-500 ${
                    isDark
                      ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/30'
                      : 'bg-gradient-to-br from-pink-100 to-purple-200'
                  }`}>
                    <img
                      src="/social-media-meester-screenshot.png"
                      alt="Social Media Meester Dashboard"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                    <button
                      onClick={() => handleSignup('Social Media Meester')}
                      className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transform hover:-translate-y-1 transition-all duration-300 hover:from-pink-500 hover:to-purple-500"
                    >
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

      {/* Signup Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className={`relative max-w-md w-full backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500 animate-scaleIn ${
              isDark
                ? 'bg-slate-900/90 border border-white/20'
                : 'bg-white/90 border border-gray-200/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-200/50 hover:bg-gray-300/50 text-gray-700'
              }`}
            >
              ✕
            </button>

            {!showSuccess ? (
              <>
                <h2 className={`text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Early Access</h2>
                <p className={`mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Meld je aan voor vroege toegang tot <span className="font-semibold text-crown-yellow">{selectedProduct}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field - hidden from users, visible to bots */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute opacity-0 pointer-events-none"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email adres
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jouw@email.nl"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                        isDark
                          ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-cyan-400'
                          : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-400'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isDark ? 'focus:ring-cyan-400' : 'focus:ring-blue-400'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>

                  {errorMessage && (
                    <div className="px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-xl">
                      <p className="text-red-300 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 font-semibold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 ${
                      selectedProduct === 'SEO Meester'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                        : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]'
                    } text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    {isSubmitting ? 'Bezig met aanmelden...' : 'Aanmelden voor early access'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✓</span>
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Gelukt!
                </h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  U bent toegevoegd aan de lijst
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
