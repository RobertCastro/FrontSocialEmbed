# Minificación de social-widget

Este directorio contiene un script para minificar todos los archivos `.js` y `.css` (incluyendo subcarpetas) usando [esbuild](https://esbuild.github.io/).

## Uso

1. Instala las dependencias (solo la primera vez):

   ```bash
   npm install
   ```

2. Ejecuta la minificación:

   ```bash
   npm run minify
   ```

Los archivos minificados aparecerán en la carpeta `min/`, replicando la estructura de carpetas original y con extensión `.min.js` o `.min.css`. 