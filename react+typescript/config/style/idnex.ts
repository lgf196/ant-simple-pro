import { CSSOptions } from 'vite';
/**
 * @description css样式配置
 */
const cssOption: CSSOptions = {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
    },
    scss: {
      additionalData: '@import "./src/assets/scss/varible.scss";',
    },
  },
};
export default cssOption;
