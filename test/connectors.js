var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;

it('CSG.Connector exists', function () {
  t.equal('Connector' in CSG, true)
})

it('CSG.connectorslist can be instanciated', function () {
  const observed = new CSG.ConnectorList()

  t.deepEqual(observed, {connectors_: []})
})
