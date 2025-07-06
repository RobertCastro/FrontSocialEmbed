import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">EmbedSocial</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Inicio</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-gray-700">Términos</Link>
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">Privacidad</Link>
              <Link href="/politica-de-eliminacion-de-datos-de-usuario" className="text-sm text-gray-500 hover:text-gray-700">Datos</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Política de Privacidad</h1>
        <p className="text-gray-600 mb-4 text-center">Última actualización: 8 de junio de 2024</p>
        <div className="space-y-6 text-gray-700 text-lg">
          <p>
            En <span className="font-semibold">EmbedSocial</span>, valoramos su privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información cuando utiliza nuestra aplicación.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Información que Recopilamos</h2>
          <p>
            Podemos recopilar información personal que usted nos proporciona directamente, como su nombre, correo electrónico y datos de acceso a TikTok, solo cuando sea necesario para el funcionamiento de la aplicación.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Uso de la Información</h2>
          <p>
            Utilizamos su información para proporcionar y mejorar nuestros servicios, autenticar usuarios y cumplir con los requisitos legales y de TikTok.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Compartir Información</h2>
          <p>
            No compartimos su información personal con terceros, excepto cuando sea necesario para operar la aplicación, cumplir con la ley o proteger nuestros derechos.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Seguridad</h2>
          <p>
            Implementamos medidas de seguridad razonables para proteger su información. Sin embargo, ningún sistema es completamente seguro.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Derechos del Usuario</h2>
          <p>
            Usted puede solicitar acceso, corrección o eliminación de su información personal contactándonos en <a href="mailto:soporte@ccpapp.xyz" className="text-pink-600 underline">soporte@ccpapp.xyz</a>.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Cambios en la Política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente. Publicaremos cualquier cambio en esta página.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">7. Contacto</h2>
          <p>
            Si tiene preguntas sobre esta Política de Privacidad, contáctenos en <a href="mailto:soporte@ccpapp.xyz" className="text-pink-600 underline">soporte@ccpapp.xyz</a>.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EmbedSocial</h3>
              <p className="text-gray-400">Conecta tu aplicación con TikTok de manera fácil y profesional.</p>
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
    </div>
  )
} 