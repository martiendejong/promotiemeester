import React from 'react'
import heroPattern from './assets/hero-pattern.svg'

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header met geel kroontje SVG logo */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <img src="/crown-logo.svg" alt="Promotiemeester Crown" className="w-12 h-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-yellow to-crown-yellow bg-clip-text text-transparent">
              Promotiemeester
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section met achtergrond */}
      <section
        className="pt-32 pb-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Jouw online succes begint hier
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Domineer zoekresultaten en social media met onze geavanceerde AI-tools
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">

            {/* SEO Meester Product */}
            <div className="product-card">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 aspect-video flex items-center justify-center overflow-hidden">
                <img
                  src="/seo-meester-screenshot.png"
                  alt="SEO Meester Dashboard - AI-gedreven SEO optimalisatie"
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4">SEO Meester</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Kom bovenaan in AI-zoekmachines zoals ChatGPT, Perplexity en Google.
                  Onze AI analyseert en optimaliseert je content voor maximale zichtbaarheid.
                </p>
                <ul className="space-y-3 mb-8 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-crown-yellow mr-2">✓</span>
                    <span>AI-geoptimaliseerde content strategie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-crown-yellow mr-2">✓</span>
                    <span>Real-time ranking monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-crown-yellow mr-2">✓</span>
                    <span>Geautomatiseerde keyword research</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-crown-yellow mr-2">✓</span>
                    <span>Concurrent analyse & insights</span>
                  </li>
                </ul>
                <button className="btn-primary w-full">
                  Start met SEO Meester →
                </button>
              </div>
            </div>

            {/* Social Media Meester Product */}
            <div className="product-card">
              <div className="bg-gradient-to-br from-pink-50 to-purple-100 p-4 aspect-video flex items-center justify-center overflow-hidden">
                <img
                  src="/social-media-meester-screenshot.png"
                  alt="Social Media Meester Dashboard - Intelligente social promotie"
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4">Social Media Meester</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Automatiseer je social media strategie met AI. Plan, creëer en publiceer
                  content die resoneert met je doelgroep op alle platforms.
                </p>
                <ul className="space-y-3 mb-8 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-crown-yellow mr-2">✓</span>
                    <span>AI content generatie & planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-crown-yellow mr-2">✓</span>
                    <span>Multi-platform scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-crown-yellow mr-2">✓</span>
                    <span>Engagement tracking & analytics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-crown-yellow mr-2">✓</span>
                    <span>Trend detection & recommendations</span>
                  </li>
                </ul>
                <button className="btn-primary w-full">
                  Start met Social Media Meester →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-brand-yellow to-crown-yellow relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <img src="/crown-logo.svg" alt="Crown" className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Klaar om te domineren?
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Join duizenden ondernemers die hun online aanwezigheid hebben getransformeerd
          </p>
          <button className="bg-gray-900 text-white px-12 py-5 rounded-lg text-xl font-bold
                           shadow-2xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-200">
            Start Gratis Trial →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/crown-logo.svg" alt="Crown" className="w-10 h-10" />
            <span className="text-2xl font-bold text-white">Promotiemeester</span>
          </div>
          <p className="text-gray-400 mb-6">
            SEO & Social Media Excellence
          </p>
          <p className="text-sm text-gray-500">
            © 2026 Promotiemeester. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
