import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from "@rollup/plugin-inject";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    build: {
      // https://rollupjs.org/configuration-options/
      rollupOptions: {
        output: {
          strict: false,
        },
      },
      sourcemap: true,
    },
    plugins: [
      nodePolyfills(),
      vue({}),
      inject({
        exclude: [
          'node_modules/**'
        ],
        include: [
          '**/*.js',
          '**/*.vue'
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      }
    },
    test: {
      include: [
        'tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'
      ]
    }
  })
}
