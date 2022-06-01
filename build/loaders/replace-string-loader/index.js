const loaderUtils = require('loader-utils');
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");

function compile(code, replaceMap) {
  const ast = parser.parse(code);
  console.log('replaceMap: ', replaceMap);
  traverse.default(ast, {
    StringLiteral(path) {
      const { node } = path;
      if (node && node.value) {
        for (const key in replaceMap) {
          if (replaceMap.hasOwnProperty(key)) {
            const value = replaceMap[key];
            path.replaceWith(t.stringLiteral(node.value.replace(key, value)))
            path.stop();
          }
        }
      }
    }
  });

  return generator.default(ast, {}, code);
}

module.exports = function(source) {
  console.log('111111=============');
  const options =  loaderUtils.getOptions(this);
  const { code } = compile(source, options);
  this.callback(null, 111 + code);
}
