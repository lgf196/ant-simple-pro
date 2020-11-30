/**
 *
 * @requires @types/webpack-env
 */
// export default ():void=>{
//     const requireAll = ((requireContext:__WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext));
//     const svgs = require.context("./svg", false, /\.svg$/);
//     requireAll(svgs);
// };
const requireAll = ((requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext));
const svgs = require.context("./svg", false, /\.svg$/);
requireAll(svgs);
export default requireAll;

