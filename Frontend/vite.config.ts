import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // server: {
  //   proxy: {
  //     '/api/v1': 'http://localhost:4000',
  // '/src/main': 'http://localhost'
  // '/api': 'http://localhost:4000',
  // '/api': {
  // 	'/api': 'http://localhost:4000',
  // 	target: 'http://jsonplaceholder.typicode.com',
  // 	changeOrigin: true,
  // 	rewrite: (path) => path.replace(/^\/api/, ''),
  //   },
  //   },
  // },
});
