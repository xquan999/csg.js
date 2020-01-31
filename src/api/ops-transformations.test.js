var t = require('assert');
const { sideEquals } = require('./test-helpers')
const { cube, sphere } = require('./primitives3d-api')
const { square, circle } = require('./primitives2d-api')
const { translate, rotate, scale, transform, center, mirror, expand, contract, minkowski, hull, chain_hull } = require('./ops-transformations')

// TODO: since cube, sphere etc rely on some of the transformations, we should be creating csg objects 'from scratch' instead
// of using those since it is not a very good independant test otherwise


it('translate (single item, 3d)', function () {
  const op1 = cube()
  const obs = translate([0, 10, 0], op1)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
})

it('translate (multiple items, 3d)', function () {
  const op1 = cube()
  const op2 = sphere()
  const obs = translate([0, 10, 0], op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
})

it('translate (multiple items in array, 3d)', function () {
  const op1 = cube()
  const op2 = sphere()
  const obs = translate([0, 10, 0], [op1, op2])

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
})

it('translate (single item , 2d)', function () {
  const op1 = square()
  const obs = translate([0, 10, 0], op1)

  t.deepEqual(obs.sides[0], { vertex0: { pos: { _x: 0, _y: 11 } }, vertex1: { pos: { _x: 0, _y: 10 } } })
  t.deepEqual(obs.sides[obs.sides.length - 1], { vertex0: { pos: { _x: 1, _y: 11 } }, vertex1: { pos: { _x: 0, _y: 11 } } })
})

it('translate (multiple items, 2d)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = translate([0, 10, 0], op1, op2)

  sideEquals(t, obs.sides[0], [[1.9807852804032304, 10.804909677983872], [2, 11]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[0, 10], [0.9999999999999998, 10]])
})

it('translate (multiple items in array, 2d)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = translate([0, 10, 0], op1, op2)

  sideEquals(t, obs.sides[0], [[1.9807852804032304, 10.804909677983872], [2, 11]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[0, 10], [0.9999999999999998, 10]])
})

it('rotate (single item)', function () {
  const op1 = cube()
  const obs = rotate([0, Math.PI, 0], op1)
  t.deepEqual(obs.properties.cube.center, {_x: 0.5266504075063266, _y: 0.5, _z: 0.47184674235753715})
})

it('rotate (multiple items)', function () {
  const op1 = cube()
  const op2 = sphere({center: false})

  const obs = rotate([0, Math.PI, 0], op1, op2)
  t.deepEqual(obs.properties.cube.center, {_x: 0.5266504075063266, _y: 0.5, _z: 0.47184674235753715})
  t.deepEqual(obs.properties.sphere.center, {_x: 1.0533008150126533, _y: 1, _z: 0.9436934847150743})
})

it('rotate (multiple items in array)', function () {
  const op1 = cube()
  const op2 = sphere({center: false})

  const obs = rotate([0, Math.PI, 0], [op1, op2])
  t.deepEqual(obs.properties.cube.center, {_x: 0.5266504075063266, _y: 0.5, _z: 0.47184674235753715})
  t.deepEqual(obs.properties.sphere.center, {_x: 1.0533008150126533, _y: 1, _z: 0.9436934847150743})
})

it('rotate (single item angle axis style)', function () {
  const op1 = cube()
  const obs = rotate(Math.PI, [0, 1, 0], op1)
  t.deepEqual(obs.properties.cube.center, {_x: 0.5266504075063266, _y: 0.5, _z: 0.47184674235753715})
})

it('rotate (multiple items, 2d)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = rotate([0, 10, 0], op1, op2)

  sideEquals(t, obs.sides[0], [[1.9506927011935618, 0.8049096779838713], [1.969615506024416, 1]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[0, 0], [0.9848077530122078, 0]])
})

it('scale (single item)', function () {
  const op1 = cube()
  const obs = scale([2, 1, 1], op1)

  t.deepEqual(obs.properties.cube.center, {_x: 1, _y: 0.5, _z: 0.5})
})

it('center (single non-uniform item)', function () {
  const op1 = scale([10, 20, 40], cube() );
  const obs = center(true, op1);
  t.deepEqual(obs.properties.cube.center, {_x: 0, _y: 0, _z: 0});
})

it('scale (multiple items)', function () {
  const op1 = cube()
  const op2 = sphere({center: false})
  const obs = scale([2, 1, 1], op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 1, _y: 0.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 2, _y: 1, _z: 1})
})

it('scale (multiple items in array)', function () {
  const op1 = cube()
  const op2 = sphere({center: false})
  const obs = scale([2, 1, 1], [op1, op2])

  t.deepEqual(obs.properties.cube.center, {_x: 1, _y: 0.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 2, _y: 1, _z: 1})
})

it('scale (multiple items, 2d)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = scale([0, 10, 0], op1, op2)

  sideEquals(t, obs.sides[0], [[0, 8.049096779838713], [0, 10]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[0, 0], [0, 0]])
})

it('transform (single item, translation)', function () {
  const op1 = cube()
  // translate by [10, -5, 0]
  const obs = transform(
    [1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      10, -5, 0, 1], op1)

  t.deepEqual(obs.properties.cube.center, {_x: 10.5, _y: -4.5, _z: 0.5})
})

it('transform (multiple items, translation)', function () {
  const op1 = cube()
  const op2 = sphere({center: false})
  const obs = transform(
    [1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      10, -5, 0, 1], op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 10.5, _y: -4.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 11, _y: -4, _z: 1})
})

it('transform should fail if provided with anything but a flat array of numbers', function () {
  t.throws(() => {
    transform(['1', 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, -5, 0, 1], cube())
  }, 'you can only use a flat array of valid, finite numbers (float and integers)')

  t.throws(() => {
    transform([[0, 0, 0, 0], [ 0, 1, 0, 0], [0, 0, 1, 0], [10, -5, 0, 1]], cube())
  }, 'you can only use a flat array of valid, finite numbers (float and integers)')
  /* const obs =
  t.th
  t.deepEqual(obs.properties.cube.center, {_x: 10.5, _y: -4.5, _z: 0.5}) */
})

it('transform (multiple items, 2d , translation)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = transform(
    [1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      10, -5, 0, 1], op1, op2)

  sideEquals(t, obs.sides[0], [[11.98078528040323, -4.195090322016129], [12, -4]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[10, -5], [11, -5]])
})

it('center (single item)', function () {
  const op1 = cube()
  const obs = center(true, op1)
  t.deepEqual(obs.properties.cube.center, {_x: 0, _y: 0, _z: 0})
})

it('center (multiple item)', function () {
  const op1 = cube()
  const op2 = sphere()
  const obs = center(true, op1, op2)
  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 0.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
})

it('center (multiple items, 2d)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = center(true, op1, op2)

  sideEquals(t, obs.sides[0], [[0.9807852804032304, -0.19509032201612875], [1, 0]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[-1, -1], [-2.220446049250313e-16, -1]])
})

it('mirror (single item)', function () {
  const op1 = cube()
  const obs = mirror([10, 20, 90], op1)
  t.deepEqual(obs.properties.cube.center, {_x: 0.36046511627906974, _y: 0.2209302325581396, _z: -0.7558139534883721})
})

it('mirror (multiple item)', function () {
  const op1 = cube()
  const op2 = sphere()
  const obs = mirror([10, 20, 90], op1, op2)
  t.deepEqual(obs.properties.cube.center, {_x: 0.36046511627906974, _y: 0.2209302325581396, _z: -0.7558139534883721})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
})

// test.failing('mirror (multiple items, 2d)', function () {
//   const op1 = square().translate([0, 5])
//   const op2 = circle().translate([5, 2])
//   const obs = mirror(true, op1, op2)
//
//   t.deepEqual(obs.sides[0].vertex0, 0)
// })

it('expand (single item)', function () {
  const op1 = cube()
  const obs = expand(10, 5, op1)

  t.deepEqual(obs.polygons[0].vertices[0].pos, {_x: -10, _y: 0, _z: 0})
})

// test.failing('expand (multiple items)', function () {
//   const op1 = cube()
//   const op2 = sphere()
//   const obs = expand(10, 5, op1, op2)
//
//   t.deepEqual(obs.polygons[0].vertices[0], {pos: {_x: -10, _y: 0, _z: 0}})
//   t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
// })

it('expand (multiple items, 2d)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = expand(10, 5, op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 11, _y: 0}}, vertex1: {pos: {_x: 11, _y: 1}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: -1.8369701987210296e-15, _y: -10}}, vertex1: {pos: {_x: 0.9999999999999981, _y: -10}}})
})

// // FIXME: I have NO idea why this one is failing, it is only a very thin wrapper over contract
// // which means contract itself is likely broken
// // seems to work for 2d shapes?
// test.failing('contract (single item)', function () {
//   const op1 = cube({size: 10})
//   const obs = contract(5, 1, op1)
//   console.log('obs', obs)
//
//   t.deepEqual(obs.polygons[0].vertices[0], {pos: {_x: -10, _y: 0, _z: 0}})
// })
//
// test.failing('contract (multiple items, 3d)', function () {
//   const op1 = cube()
//   const op2 = sphere()
//   const obs = contract(5, 1, op1, op2)
//
//   t.deepEqual(obs.polygons[0].vertices[0], {pos: {_x: -10, _y: 0, _z: 0}})
//   t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
// })
//
// test.failing('contract (multiple items, 2d)', function () {
//   const op1 = square()
//   const op2 = circle()
//   const obs = contract(10, 5, op1, op2)
//
//   // FIXME: these are fake values, but it does not work either way
//   t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 11, _y: 0}}, vertex1: {pos: {_x: 11, _y: 1}}})
//   t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: -1.8369701987210296e-15, _y: -10}}, vertex1: {pos: {_x: 0.9999999999999981, _y: -10}}})
// })
//
// test.failing('minkowski (multiple items)', function () {
//   const op1 = cube()
//   const op2 = sphere({center: true})
//   const obs = minkowski(op1, op2)
//
//   t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
//   t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
// })
//
// test.failing('hull (multiple items, 3d)', function () {
//   const op1 = cube()
//   const op2 = sphere()
//   const obs = hull(op1, op2)
//
//   t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
//   t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
// })

it('hull (multiple items, 2d)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = hull(op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 0, _y: 1.0000000000000002}}, vertex1: {pos: {_x: 0, _y: 0}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: 0.01921471959676957, _y: 1.1950903220161286}}, vertex1: {pos: {_x: 0, _y: 1.0000000000000002}}})
})

// test.failing('chain_hull (multiple items 3d)', function () {
//   const op1 = cube()
//   const op2 = sphere()
//   const obs = chain_hull(op1, op2)
//
//   t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
//   t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
// })

it('chain_hull (multiple items, 2d)', function () {
  const op1 = square()
  const op2 = circle()
  const obs = chain_hull(op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 0, _y: 1.0000000000000002}}, vertex1: {pos: {_x: 0, _y: 0}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: 0.01921471959676957, _y: 1.1950903220161286}}, vertex1: {pos: {_x: 0, _y: 1.0000000000000002}}})
})
