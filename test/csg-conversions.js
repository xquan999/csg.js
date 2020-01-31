var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;
var help = require('./helpers/asserts'); let assertSameGeometry = help.assertSameGeometry;

it('CSG can be packed into and retrieved from a compact binary', function () {
  // test using simple default shapes. Compact binary do not provide however
  // perfect clones, only geometry identical objects, that's why we use here
  // assertSameGeometry which compares vertices one by one.
  const c1 = CSG.cube()
  assertSameGeometry(t, c1, CSG.fromCompactBinary(c1.toCompactBinary()))
  const c2 = CSG.sphere()
  assertSameGeometry(t, c2, CSG.fromCompactBinary(c2.toCompactBinary()))
  const c3 = CSG.cylinder()
  assertSameGeometry(t, c3, CSG.fromCompactBinary(c3.toCompactBinary()))
})
