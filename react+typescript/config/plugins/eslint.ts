import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';
/**
 * @description 对eslint的支持，在开发模式下，自动会开启检测
 */
export default function configEslint() {
  return [
    // eslint({ include: ['./src/**/*.ts', './src/**/*.tsx'] }),
    // 在 Vite HMR 叠加层和终端控制台中提示错误
    checker({
      typescript: true,
      eslint: {
        files: ['./src'],

        extensions: ['.ts', '.tsx', '.jsx'],
      },
    }),
  ];
}
