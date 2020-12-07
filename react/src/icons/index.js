/**
 *
 * @requires @types/webpack-env
 */

const requireAll = ((requireContext) => requireContext.keys().map(requireContext));
const svgs = require.context("./svg", false, /\.svg$/);
requireAll(svgs);


