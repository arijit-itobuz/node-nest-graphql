import { build } from 'esbuild';

build({
  entryPoints: ['./dist/main.js'], // Point to the transpiled output
  outfile: './dist/bundle.js',
  bundle: true, // Bundle all dependencies
  platform: 'node',
  target: 'es2020',
  minify: false, // Optionally minify for smaller bundle size
  sourcemap: true, // Optional: generates sourcemaps for debugging
}).catch(() => process.exit(1));
