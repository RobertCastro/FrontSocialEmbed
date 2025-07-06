import Link from 'next/link'

export default function DataDeletionPolicy() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Política de Eliminación de Datos de Usuario</h1>
        <p className="text-gray-600 mb-4 text-center">Última actualización: 8 de junio de 2024</p>
        <div className="space-y-6 text-gray-700 text-lg">
          <p>
            En <span className="font-semibold">EmbedSocial</span>, respetamos su derecho a controlar sus datos personales. Esta Política de Eliminación de Datos describe cómo puede solicitar la eliminación de su información y cómo procesamos estas solicitudes.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Derecho a la Eliminación de Datos</h2>
          <p>
            Usted tiene el derecho de solicitar la eliminación de sus datos personales que hemos recopilado y procesado. Este derecho está protegido por regulaciones de privacidad como el GDPR y las políticas de Meta.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Datos que Podemos Eliminar</h2>
          <p>
            Podemos eliminar los siguientes tipos de datos que hayamos recopilado:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Información de cuenta de usuario (nombre, correo electrónico)</li>
            <li>Tokens de acceso a TikTok</li>
            <li>Datos de configuración del widget</li>
            <li>Logs de actividad de la aplicación</li>
            <li>Datos de sesión almacenados</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Datos que No Podemos Eliminar</h2>
          <p>
            Algunos datos pueden no ser eliminables debido a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Obligaciones legales de retención</li>
            <li>Datos necesarios para prevenir fraudes</li>
            <li>Información requerida para cumplir con términos de servicio</li>
            <li>Datos anonimizados utilizados para análisis</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Cómo Solicitar la Eliminación</h2>
          <p>
            Para solicitar la eliminación de sus datos, puede:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enviar un correo electrónico a <a href="mailto:soporte@ccpapp.xyz" className="text-pink-600 underline">soporte@ccpapp.xyz</a></li>
            <li>Incluir "Solicitud de Eliminación de Datos" en el asunto</li>
            <li>Proporcionar su dirección de correo electrónico registrada</li>
            <li>Especificar qué datos desea eliminar</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Proceso de Eliminación</h2>
          <p>
            Una vez recibida su solicitud:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Verificaremos su identidad dentro de las 24 horas</li>
            <li>Procesaremos su solicitud en un plazo máximo de 30 días</li>
            <li>Eliminaremos permanentemente los datos solicitados</li>
            <li>Le confirmaremos la eliminación por correo electrónico</li>
            <li>Mantendremos un registro de la solicitud por obligaciones legales</li>
          </ol>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Eliminación de Datos de Meta/TikTok</h2>
          <p>
            Para datos relacionados con Meta (Facebook, Instagram) o TikTok:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Revocaremos inmediatamente los tokens de acceso</li>
            <li>Eliminaremos las credenciales almacenadas</li>
            <li>Desconectaremos la integración con estas plataformas</li>
            <li>No tendremos acceso a datos futuros de estas cuentas</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">7. Confirmación y Seguimiento</h2>
          <p>
            Después de la eliminación:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Recibirá una confirmación detallada de los datos eliminados</li>
            <li>Se le informará sobre cualquier dato que no se pudo eliminar</li>
            <li>Puede solicitar una verificación adicional si es necesario</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">8. Excepciones y Limitaciones</h2>
          <p>
            Podemos rechazar una solicitud de eliminación si:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No podemos verificar su identidad</li>
            <li>Los datos son necesarios para cumplir obligaciones legales</li>
            <li>La eliminación afectaría los derechos de otros usuarios</li>
            <li>Los datos están siendo utilizados en investigaciones legales</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">9. Contacto</h2>
          <p>
            Si tiene preguntas sobre esta política o necesita ayuda con su solicitud, contáctenos en <a href="mailto:soporte@ccpapp.xyz" className="text-pink-600 underline">soporte@ccpapp.xyz</a>.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8">10. Actualizaciones de la Política</h2>
          <p>
            Esta política puede actualizarse para reflejar cambios en nuestras prácticas o requisitos legales. Publicaremos cualquier cambio en esta página.
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