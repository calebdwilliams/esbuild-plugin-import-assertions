import { OnLoadArgs, OnLoadOptions, OnLoadResult, OnResolveArgs, OnResolveOptions, OnResolveResult } from 'esbuild';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';

type OnResolveCallback = (args: OnResolveArgs) => OnResolveResult;
type OnLoadCallback = (args: OnLoadArgs) => OnLoadResult;
type Transformer = (fileData: unknown) => string;

interface ContentType {
  namespace: string;
  filter: RegExp;
}

export const css: ContentType = {
  namespace: 'assert-css',
  filter: /\.css$/
};

export const json: ContentType = {
  namespace: 'assert-json',
  filter: /\.json$/
};

export function onResolveFactory(contentType: ContentType): [OnResolveOptions, OnResolveCallback] {
  return [{ filter: contentType.filter }, (args: OnResolveArgs) => {
    return {
      path: resolve(dirname(args.importer), args.path),
      namespace: contentType.namespace
    };
  }];
}

export function onLoadFactory(contentType: ContentType, transformer: Transformer): [OnLoadOptions, OnLoadCallback] {
  return [{ filter: contentType.filter, namespace: contentType.namespace }, (args) => {
    const data = readFileSync(args.path, 'utf-8');
    return {
      contents: transformer(data),
      loader: 'ts',
    }
  }];
}
