/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta" />

// https://github.com/vitejs/vite/issues/4134
interface ImportMetaEnv {
  VITE_APP_MODE: 'dev' | 'alpha' | 'preprod' | 'prod'
}
