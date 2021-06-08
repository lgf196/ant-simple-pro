import initAnt from './ant'
// import initConstant from './constant'
import initMethod from './method'
import initGlobalComponent from './component'

export default function (app) {
  initAnt(app)
  // initConstant(app)
  initMethod(app)
  initGlobalComponent(app)
}
