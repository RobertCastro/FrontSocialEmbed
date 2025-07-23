// Minifica todos los .js y .css recursivamente usando esbuild y guarda en min/ replicando estructura
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const SRC_DIR = __dirname;
const OUT_DIR = path.join(__dirname, 'min');

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const relPath = path.relative(SRC_DIR, filepath);
    if (
      fs.statSync(filepath).isDirectory() &&
      file !== 'node_modules' &&
      file !== 'min'
    ) {
      filelist = walk(filepath, filelist);
    } else if (
      (file.endsWith('.js') || file.endsWith('.css')) &&
      !relPath.startsWith('node_modules' + path.sep) &&
      !relPath.startsWith('min' + path.sep) &&
      file !== 'minify.js'
    ) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

function outPath(srcPath) {
  const rel = path.relative(SRC_DIR, srcPath);
  const ext = path.extname(srcPath);
  const base = rel.slice(0, -ext.length);
  const minExt = ext === '.js' ? '.min.js' : '.min.css';
  return path.join(OUT_DIR, base + minExt);
}

async function minifyFile(src) {
  const dest = outPath(src);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const ext = path.extname(src);
  console.log(`Minificando: ${src} (ext: ${ext})`);
  const buildOptions = {
    entryPoints: [src],
    outfile: dest,
    minify: true,
    bundle: false,
    logLevel: 'silent',
    write: true,
  };
  try {
    await esbuild.build(buildOptions);
    console.log(`Minificado: ${src} -> ${dest}`);
  } catch (e) {
    console.warn(`\x1b[33m[WARNING]\x1b[0m Error minificando ${src}: ${e.message}`);
  }
}

async function main() {
  const files = walk(SRC_DIR)
    .filter(f => !f.includes('/min/'))
    .filter(f => path.basename(f) !== 'minify.js');
  return Promise.all(files.map(minifyFile));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 