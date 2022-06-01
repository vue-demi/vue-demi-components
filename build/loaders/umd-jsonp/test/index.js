const { runLoaders } = require('loader-runner');
const path = require('path');
const fs = require('fs');

const outputPath = path.join(__dirname, './output.js');

runLoaders({
  resource: path.join(__dirname, './test.js'),

  loaders: [path.join(__dirname, '../index.js'), 'babel-loader'],

  readResource: fs.readFile.bind(fs)
  // 读取资源的函数

}, function(err, result) {
  err && console.log('runner: ', err);
  console.log(1111, result.result[0])
  fs.writeFileSync(outputPath, result.result[0]);
})