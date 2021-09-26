import List from './List/template';
import News from './News/template';
import Banner from './Banner/template';

/**
 * @description 对基础组件进行归类
 */
export interface tempalteType {
  type: string;
  w: number;
  h: number;
  title: string;
  category?:string
}

const basicTemplate:tempalteType[] = [
  List,
  News,
  Banner
];
const BasicTemplate:tempalteType[] = basicTemplate.map(v => {
  return { ...v, category: 'base'};
});

export default BasicTemplate;
