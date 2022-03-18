import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import SvgIconsPlugin from 'vite-plugin-svg-icons'
// import eslint from '@rollup/plugin-eslint'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
// import legacy from '@vitejs/plugin-legacy'
// import visualizer from 'rollup-plugin-visualizer'
// import vueI18n from '@intlify/vite-plugin-vue-i18n'
import dayjs from 'dayjs'

const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig(options => {
  const { command, mode } = options
  console.log('mode', mode)
  const isBuild = command === 'build'
  return {
    base: '/vue/',
    define: {
      // https://github.com/vitejs/vite/issues/2605#issuecomment-803276660
      __LAST_BUILD_TIME__: JSON.stringify(now)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'vue-emoji-mart': resolve('./src/components/emoji-mart'),
        // fix warnings: You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:8080/api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
        }
      }
    },
    plugins: [
      // eslint({
      //   fix: true
      // }),
      // https://bitbucket.org/unimorphic/vite-plugin-linter/src/master/
      !isBuild
        ? linterPlugin({
            include: ['./src/**/*.ts', './src/**/*.vue'],
            linters: [new EsLinter({ configEnv: options })]
          })
        : null,
      vue(),
      SvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        svgoOptions: isBuild,
        symbolId: 'icon-[dir]-[name]'
      }),
      vueJsx(),
      // isBuild ? legacy() : null,
      isBuild
        ? styleImport({
            libs: [
              {
                libraryName: 'ant-design-vue',
                esModule: true,
                resolveStyle: name => {
                  return `ant-design-vue/es/${name}/style/index`
                }
              }
            ]
          })
        : null
      // visualizer({
      //   filename: './node_modules/.cache/visualizer/stats.html',
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      // }) as Plugin,
      // https://github.com/intlify/vite-plugin-vue-i18n
      // vueI18n({
      //   // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      //   // compositionOnly: false,
      //   // you need to set i18n resource including paths !
      //   include: path.resolve(__dirname, './path/to/src/locales/**')
      // })
    ],
    css: {
      preprocessorOptions: {
        less: {
          // https://github.com/vitejs/vite/issues/832
          additionalData: '@import "./src/assets/styles/var.less";',
          modifyVars: {
            '@primary-color': '#1890FF',
            '@menu-collapsed-width': '80px',
            '@text-color': 'rgba(0, 0, 0, .85)'
          },
          javascriptEnabled: true
        }
      }
    },
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/zh-cn',
        'moment/dist/locale/eu'
      ]
    },
    build: {
      target: 'es2015',
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    }
  }
})
