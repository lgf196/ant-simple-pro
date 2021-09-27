import { defineConfig } from 'vite';
import path from 'path';
import { VITE_APP_CONSOLE, VITE_APP_BASE, VITE_APP_PORT, VITE_APP_OPEN } from './config';
import createVitePlugins from './config/plugins';
import cssOption from './config/style/idnex';
import proxy from './config/setupProxy';
export default defineConfig((configEnv) => {
  console.log(`config`, configEnv);
  const { command, mode } = configEnv;
  const isBuild = command === 'build';
  return {
    base: VITE_APP_BASE,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        src: path.resolve(__dirname, 'src'),
      },
    },
    plugins: createVitePlugins(),
    css: cssOption,
    server: {
      host: true,
      port: VITE_APP_PORT,
      open: VITE_APP_OPEN,
      proxy,
    },
    build: {
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_APP_CONSOLE,
        },
      },
    },
  };
});
