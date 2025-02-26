import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return {
    base: './', // 👈 Set base to relative for XAMPP
    plugins: [react(), tailwindcss()],
    define: {
      __APP_ENV__: env, // Use a custom variable instead of process.env
    },
  };
});
