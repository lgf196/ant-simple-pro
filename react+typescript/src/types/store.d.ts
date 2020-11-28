import { userStore, oherStore } from '../redux/reduce/interfaces'
/**
 * @description 该声明负责导出所有的reduce中的store类型，这样在全局就可以共用
 */
declare global {
  interface reduceStoreType {  //所有reduce模块中的store类型
    user: userStore; //对应userReduce
    other: oherStore //reduce-other
  }
}
