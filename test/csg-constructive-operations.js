var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;
var help = require('./helpers/asserts'); let assertSameGeometry = help.assertSameGeometry;

function createOperands () {
  const a = CSG.cube({
    center: [0, 0, 0],
    radius: [1, 1, 1]
  })
  const b = CSG.cube({
    center: [2, 0, 0],
    radius: [1, 1, 1]
  })
  const c = CSG.cube({
    center: [1, 0, 0],
    radius: [2, 1, 1]
  })
  return {a, b, c}
}

// Constructive operations
it('CSG.union', function () {
  const {a, b, c} = createOperands()
  assertSameGeometry(t, a.union(b), c)
})
it('CSG.intersect', function () {
  const {a, b, c} = createOperands()
  assertSameGeometry(t, c.intersect(b), b)
})
it('CSG.subtract', function () {
  const {a, b, c} = createOperands()
  assertSameGeometry(t, c.subtract(a), b)
})
