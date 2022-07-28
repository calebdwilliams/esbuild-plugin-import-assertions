# esbuild-plugin-import-assert

The `esbuild-plugin-import-assert` plugin [import assertion behavior](https://github.com/tc39/proposal-import-assertions) for esbuild.

## Installation 

This package is available on npm under the name esbuild-plugin-import-assert and can be installed with npm, yarn or however else you consume dependencies.

### Example commands:

#### npm:
```zsh
npm i esbuild-plugin-import-assert
```

#### yarn:
```zsh
yarn add esbuild-plugin-import-assert
```

## Usage

To use the plugin you [must use the JavaScript API for running esbuild](https://github.com/evanw/esbuild/issues/884#issuecomment-786163584). An example configuration is below

```javascript
import { importAssertPlugin } from 'esbuild-plugin-import-assert';
import { build } from 'esbuild';

build({
  entryPoints: ['./app.ts'],
  bundle: true,
  outfile: './lib/out.js',
  plugins: [importAssertPlugin],
  target: ['chrome100']
}).catch(() => process.exit(1))
```

A current limitation of the plugin is that you must set esbuild's `bundle` option to `true`. Likewise, asynchronous imports are not currently supported. 