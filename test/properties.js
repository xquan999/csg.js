var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;

it('CSG.Properties exists', function () {
  t.equal('Properties' in CSG, true)
})
