'use client';
import Link from 'next/link'
import Script from 'next/script'

export default function SocialWidget() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">EmbedSocial</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Características
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Precios
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contacto
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-gray-700">
                Términos
              </Link>
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - 100% screen height */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Social Widget
              <span className="text-pink-600"> Tool</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Una herramienta poderosa para incrustar contenido social en tu sitio web. 
              Muestra feeds de TikTok, Instagram y otras redes sociales de manera elegante y profesional.
              Personaliza el diseño, controla el contenido y mejora la engagement de tus visitantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                onClick={() => {
                  document.getElementById('widget-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Probar Widget
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Ver Documentación
              </button>
              <button 
                className="border border-pink-600 text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
                onClick={() => {
                  // Manual widget initialization for testing
                  if (typeof window !== 'undefined' && (window as any).SocialWidget) {
                    (window as any).SocialWidget.render(1, '#manual-widget-test', {
                      layout: 'grid'
                    });
                  }
                }}
              >
                Configurar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Widget Section */}
      <section id="widget-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Social Widget Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {/* Aquí puedes ver el widget social en acción, conectando con datos reales desde ccpapp.xyz */}
            </p>
            
            {/* Debug Controls */}
            <div className="flex flex-wrap gap-4 justify-center mb-8 p-4 bg-gray-50 rounded-lg">
              {/* <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).SocialWidget) {
                    console.log('SocialWidget available:', (window as any).SocialWidget);
                    (window as any).SocialWidget.init();
                  } else {
                    console.log('SocialWidget not loaded yet');
                  }
                }}
              >
                🔄 Reinicializar
              </button>
              
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).SocialWidget) {
                    (window as any).SocialWidget.render(1, '#manual-widget-test');
                  }
                }}
              >
                🎨 Render Manual
              </button>
              
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).SocialWidget) {
                    (window as any).SocialWidget.destroy('#auto-widget-test');
                    (window as any).SocialWidget.destroy('#manual-widget-test');
                  }
                }}
              >
                🗑️ Limpiar
              </button> */}
              
              {/* <button 
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
                onClick={() => {
                  // Test API directly
                  fetch('https://app.ccpapp.xyz/social-widgets/render/1')
                    .then(res => res.json())
                    .then(data => {
                      console.log('API Response:', data);
                      alert('Check console for API response');
                    })
                    .catch(err => {
                      console.error('API Error:', err);
                      alert('API Error - check console');
                    });
                }}
              >
                🔍 Test API
              </button> */}
            </div>
          </div>

          {/* Auto-discovery Widget */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {/* 🤖 Auto-Discovery Mode (como EmbedSocial) */}
            </h3>
            <div className="max-w-4xl mx-auto">
              <div 
                id="auto-widget-test"
                className="social-widget border-2 border-dashed border-gray-300 min-h-[300px] rounded-lg p-4"
                data-widget-id="1"
              >
                {/* Widget will auto-initialize here */}
                <div className="text-center text-gray-500 py-8">
                  <p>🔄 Auto-discovery widget loading...</p>
                  <small>Should initialize automatically when script loads</small>
                </div>
              </div>
            </div>
          </div>

          {/* Manual Render Widget */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              ⚙️ Manual Render Mode
            </h3>
            <div className="max-w-4xl mx-auto">
              <div 
                id="manual-widget-test"
                className="border-2 border-dashed border-gray-300 min-h-[300px] rounded-lg p-4"
              >
                <div className="text-center text-gray-500 py-8">
                  <p>🎯 Manual render widget</p>
                  <small>Use the &quot;Render Manual&quot; button above to initialize</small>
                </div>
              </div>
            </div>
          </div>

          {/* API Status Check */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                🔗 API Status
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Backend:</span>
                  <span className="font-mono text-blue-600">https://app.ccpapp.xyz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Endpoint:</span>
                  <span className="font-mono text-blue-600">/social-widgets/render/1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Health Check:</span>
                  <a 
                    href="https://app.ccpapp.xyz/social-widgets/health" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-green-600 hover:underline"
                  >
                    /social-widgets/health
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EmbedSocial</h3>
              <p className="text-gray-400">
                Conecta tu aplicación con TikTok de manera fácil y profesional.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Estado</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Términos de Servicio</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EmbedSocial. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Load Social Widget Script */}
      <Script 
        src="/social-widget/social-widget.js" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Social Widget script loaded');
          // Script should auto-initialize via auto-discovery
        }}
        onError={(e) => {
          console.error('Failed to load Social Widget script:', e);
        }}
      />
      
      {/* Load Social Widget CSS */}
      <link rel="stylesheet" href="/social-widget/social-widget.css" />
    </div>
  )
}