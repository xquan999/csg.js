var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;

it('expand() CSG objects', function () {
  const observed = CSG.cube({center: [0, 0, 0], radius: [1, 1, 1]}).expand(0.2, 8)
  // const expected = ''
  t.deepEqual(observed.polygons.length, 94)
})


it('expand() CSG objects', function () {
  const observed = CSG.cube({center: [0, 0, 0], radius: [1, 1, 1]}).expand(0.2, 8)
  // const expected = ''
  t.deepEqual(observed.polygons.length, 94)
})
