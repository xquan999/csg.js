var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;
var obj_store = require('./helpers/obj-store'); let OBJ = obj_store.OBJ;
var help = require('./helpers/asserts'); let assertSameGeometry = help.assertSameGeometry;

// Testing common shape generation can only be done by comparing
// with previously human validated shapes. It would be trivially
// rewriting the generation code to test it with code instead.

function isValid (t, name, observed) {
  const expected = OBJ.loadPrevious('csg-shapes.' + name, observed)
  assertSameGeometry(t, observed, expected)
}

it('CSG.cube creates a cube', function () {
  isValid(t, 'c1', CSG.cube(/* center:[0,0,0],radius:[1,1,1] */))
  isValid(t, 'c2', CSG.cube({center: [5, 5, 5], radius: 10}))
  isValid(t, 'c3', CSG.cube({'corner1': [-5, -5, -5], 'corner2': [5, 5, 5]}))

  let c4 = CSG.cube({center: [5, 5, 5], radius: [5, 10, 20]})
  let f1 = c4.getFeatures('volume')
  t.equal(f1, 8000)
  let f2 = c4.getFeatures('area')
  t.equal(f2, 2800)
  let f3 = c4.getFeatures(['volume', 'area'])
  t.equal(f3[0], 8000)
  t.equal(f3[1], 2800)
})

it('CSG.sphere creates a sphere', function () {
  isValid(t, 's1', CSG.sphere(/* center:[0,0,0],radius:1,resolution:CSG.defaultResolution2D */))
  isValid(t, 's2', CSG.sphere({center: [5, 5, 5], radius: 10}))
  // var s3 = CSG.sphere({center:[0,0,0],radius:10,resolution:36});
  // var xv = new CSG.Vector3D([1, 0, 0]);
  // var yv = new CSG.Vector3D([0,-1, 0]);
  // var zv = new CSG.Vector3D([0, 0, 1]);
  // var s4 = CSG.sphere({radius:10,axes:[xv,yv,zv]});
})

it('CSG.cylinder creates a cylinder', function () {
  isValid(t, 'cy1', CSG.cylinder(/* start:[0,-1,0],end:[0,1,0],radius:1,resolution:CSG.defaultResolution2D,sectorAngle:360 */))
  isValid(t, 'cy2', CSG.cylinder({start: [-5, -5, -5], end: [5, 5, 5], radius: 5}))
  isValid(t, 'cy3', CSG.cylinder({radiusStart: 10, radiusEnd: 5, resolution: 36}))
  isValid(t, 'cy4', CSG.cylinder({start: [0, 0, -50], end: [0, 0, 50], radius: 10, sectorAngle: 360}))
})

it('CSG should produce proper rounded cylinders', function () {
  isValid(t, 'rcy1', CSG.roundedCylinder())
  isValid(t, 'rcy2', CSG.roundedCylinder({start: [-5, -5, -5], end: [5, 5, 5], radius: 5, resolution: 36}))
})

it('CSG should produce proper rounded cube', function () {
  isValid(t, 'rc1', CSG.roundedCube())
  isValid(t, 'rc2', CSG.cube({center: [5, 5, 5], radius: 10, roundradius: 1.5, resolution: 36}))
  isValid(t, 'rc3', CSG.cube({'corner1': [-5, -5, -5], 'corner2': [5, 5, 5], roundradius: 0.5}))
})

it('CSG should produce proper polyhedrons', function () {
  let points = [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10]]
  let faces = [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ]
  isValid(t, 'pol1', CSG.polyhedron({points: points, faces: faces}))
})

it('CSG should produce proper elliptic cylinders', function () {
  isValid(t, 'ecy1', CSG.cylinderElliptic())
})

it('CSG should produce solids from slices', function () {
  const hex = CSG.Polygon.createFromPoints([
    [0, 0, 0],
    [0, 10, 0],
    [10, 10, 0]
  ])

  const observed = hex.solidFromSlices({
    numslices: 3,
    callback: function (t, slice) {
      return this.rotateZ(5 * slice)
    }
  })

  t.deepEqual(observed.polygons.length, 14)
})

function getSimpleSides (cag) {
  return cag.sides.map(function (side) {
    return [side.vertex0.pos._x, side.vertex0.pos._y]
  }).reduce((acc, cur) => {
    acc.positions.push(cur)
    return acc
  }, {positions: []})
}

it('Polygon2D can create ...2D polygons', function () {
  const points = [new CSG.Vector2D(0, 0), new CSG.Vector2D(0, 10), new CSG.Vector2D(10, 10)]
  const observed = getSimpleSides(new CSG.Polygon2D(points))
  const expected = { positions: [ [ 10, 10 ], [ 0, 10 ], [ 0, 0 ] ] }
  t.deepEqual(observed, expected)
})
