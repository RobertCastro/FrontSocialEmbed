import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900">EmbedSocial</h1>
            </Link>
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
            <Link href="/politica-eliminacion-datos" className="text-sm text-gray-500 hover:text-gray-700">
              Datos
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 