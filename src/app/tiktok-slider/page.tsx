'use client';
import Link from 'next/link'
import Script from 'next/script'
import Header from '../../components/Header'
import '/public/social-widget/social-widget.css'

export default function SocialWidget() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

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
                className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Probar Widget
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Ver Documentación
              </button>
              <button 
                className="border border-pink-600 text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
                Configurar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Widget Section */}
      <section id="widget-section" className="py-20 sw-widget-wrappe" >
        <div className="w-full mx-auto px-4 sm:px-6 ">
          <div className="mb-16">
            <div className="max-w-7xl mx-auto">
              <div 
                className="social-widget"
                data-widget-id="17"
              >
                {/* Widget will auto-initialize here */}
                <div className="text-center py-8">
                  
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
                <li><Link href="/politica-de-eliminacion-de-datos-de-usuario" className="hover:text-white transition-colors">Eliminación de Datos</Link></li>
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
    </div>
  )
}