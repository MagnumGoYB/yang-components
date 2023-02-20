import commonjs from '@rollup/plugin-commonjs'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import filesize from 'rollup-plugin-filesize'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es'
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: 'tsconfig.build.json' }),
    excludeDependenciesFromBundle(),
    postcss({
      config: { path: './postcss.config.js' },
      extract: true,
      minimize: true
    }),
    terser(),
    filesize()
  ]
}
