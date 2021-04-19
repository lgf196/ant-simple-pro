import List from './List/template';
import News from './News/template';
import Banner from './Banner/template';

/**
 * @description 对基础组件进行归类
 */
const basicTemplate = [
  List,
  News,
  Banner
];
const BasicTemplate = basicTemplate.map(v => {
  return { ...v, category: 'base'};
});

export default BasicTemplate;
