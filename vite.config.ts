import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    styleImport({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `../es/${name}/style`
        }
      ]
    }),
  ],
  // vue3-vite热更新，解决笔记本热更新失效问题
  server: {
    host: 'localhost',
    cors: true,
    open: true,
    hmr: true,
  },
})
