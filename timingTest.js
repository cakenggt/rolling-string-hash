var RollingStringHash = require('./index');
var fs = require('fs');

var csv = '';
var multiplier = 100000;
var rh = new RollingStringHash();
for (var x = 1; x < 21; x++){
  var start = Date.now();
  for (var y = 0; y < multiplier; y++){
    rh.addRight('a');
    rh.addLeft('a');
  }
  var end = Date.now();
  csv += (x*multiplier) + ',' + (end-start) + '\n';
}

fs.writeFile('timingTestResult.csv', csv);
