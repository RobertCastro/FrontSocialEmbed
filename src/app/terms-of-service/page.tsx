import Link from 'next/link'

export default function TermsOfService() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Términos de Servicio</h1>
        <p className="text-gray-600 mb-4 text-center">Última actualización: 8 de junio de 2024</p>
        <div className="space-y-6 text-gray-700 text-lg">
          <p>
            Bienvenido a <span className="font-semibold">EmbedSocial</span>. Al acceder o utilizar nuestra aplicación, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de los términos, no debe utilizar la aplicación.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Uso de la Aplicación</h2>
          <p>
            Nuestra aplicación permite a los usuarios conectarse a TikTok y visualizar publicaciones de cuentas seleccionadas. Usted acepta utilizar la aplicación solo para fines legales y de acuerdo con estos términos.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Cuentas de Usuario</h2>
          <p>
            Puede ser necesario crear una cuenta para acceder a ciertas funciones. Usted es responsable de mantener la confidencialidad de su información de acceso y de todas las actividades que ocurran bajo su cuenta.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Contenido de TikTok</h2>
          <p>
            El contenido mostrado a través de nuestra aplicación proviene de TikTok y está sujeto a los términos y políticas de TikTok. No reclamamos propiedad sobre dicho contenido.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Privacidad</h2>
          <p>
            El uso de la aplicación también se rige por nuestra <Link href="/privacy-policy" className="text-pink-600 underline">Política de Privacidad</Link>.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Cambios en los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Los cambios serán efectivos al ser publicados en esta página.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Contacto</h2>
          <p>
            Si tiene preguntas sobre estos Términos, contáctenos en <a href="mailto:soporte@ccpapp.xyz" className="text-pink-600 underline">soporte@ccpapp.xyz</a>.
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