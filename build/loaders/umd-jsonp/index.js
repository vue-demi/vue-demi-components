const loaderUtils = require('loader-utils');
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const fs = require('fs');
const path = require('path');
const t = require('@babel/types');

function compile(code) {
  const outputPath = path.join(__dirname, './output.js');
  const ast = parser.parse(code);

  fs.writeFileSync(outputPath, '[');

  traverse.default(ast, {
    // MemberExpression(nodePath) {
    //   const outputSource = fs.readFileSync(outputPath, 'utf-8');
    //   fs.writeFileSync(outputPath, outputSource + (outputSource !== '[' ? ',' : '') + JSON.stringify(nodePath.node));
    //   const {object} = nodePath.node;
    //   if (object.object) {
    //     const { name: objectName } = object.object;
    //     const { name: propertyName } = object.property;
    //     if (objectName === 'window' && propertyName === 'echarts') {
    //       // fs.writeFileSync(outputPath, JSON.stringify(nodePath.node));
    //       console.log(`writeFile to ${outputPath}`)
    //       console.log(nodePath.parent);
    //     }
    //   }
    // }
    // Identifier(nodePath) {
    //   const outputSource = fs.readFileSync(outputPath, 'utf-8');
    //   fs.writeFileSync(outputPath, outputSource + (outputSource !== '[' ? ',' : '') + JSON.stringify(nodePath.node));
    //   if (nodePath.node.name === 'echarts') {
    //     console.log(nodePath.parent);
    //   }
    // }
  });

  fs.writeFileSync(outputPath, fs.readFileSync(outputPath, 'utf-8') + ']');

  return generator.default(ast, {}, code);
}

module.exports = function(source) {
  const options =  loaderUtils.getOptions(this);
  console.log('input:', source);
  console.log('===============================')
  const output = compile(source).code;
  console.log('===============================')
  console.log('output:', output);
  this.callback(null, output);
}
