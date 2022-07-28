import { importAssertPlugin } from './lib/plugin.js';
import { build } from 'esbuild';

build({
  entryPoints: ['./demo/app.ts'],
  bundle: true,
  outfile: './lib/out.js',
  plugins: [importAssertPlugin],
  target: ['chrome100']
}).catch(() => process.exit(1))
