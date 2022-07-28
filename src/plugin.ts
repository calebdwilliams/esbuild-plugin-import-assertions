import { css, json, onLoadFactory, onResolveFactory } from './utilities.js';
import convert from 'string-to-template-literal';
import type { Plugin, PluginBuild } from 'esbuild';

export const importAssertPlugin: Plugin = {
  name: 'import-assert',
  setup(build: PluginBuild): void {
    /** If the build is set to bundle the files together, parse the imports as the proper type */
    if (build.initialOptions.bundle) {
      /**
       * Intercept import paths to CSS and JSON files using the
       * onResolveFactory. This will queue up the files for the onLoad
       * phase of esbuild's bundle function
       */
      build.onResolve(...onResolveFactory(css));
      build.onResolve(...onResolveFactory(json));

      /**
       * Load the paths tagged with the assert-<contentType> namespace
       * and evaluate them as if they had been added via
       * import assertion
       */
      build.onLoad(...onLoadFactory(css, data => {
        return `const sheet = new CSSStyleSheet(); sheet.replace(${convert(data as string)});export default sheet;`
      }));

      build.onLoad(...onLoadFactory(json, data => {
        return `const data = ${data}; export default data;`
      }));
    } else {
      console.warn('\x1b[1m', '⚠️ You must set esbuild\'s bundle option to `true` when using esbuild-plugin-import-assert');
    }
  }
};
