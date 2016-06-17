var fs = require('fs');

var createNumTable = function(){
  var nums = [];
  for (var x = 0; x < 65535; x++){
    nums.push(x);
  }
  for (var y = 0; y < nums.length; y++){
    var s = Math.floor(Math.random()*(nums.length-y))+y;
    var a = nums[y];
    nums[y] = nums[s];
    nums[s] = a;
  }
  return nums;
};

fs.writeFile('numTable.js', `exports.createNumTable = ${createNumTable.toString()};
exports.numTable = ${JSON.stringify(createNumTable())};`);
