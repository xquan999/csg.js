var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;
var helper = require('./helpers/nearlyEqual')

it('CSG.Vector2D creation', function () {
  // FAILS const v1 = new CSG.Vector2D()
  const v2 = new CSG.Vector2D(5, 5)
  t.equal(v2.x, 5)
  t.equal(v2.y, 5)

  const v3 = new CSG.Vector2D([-5, -5])
  t.equal(v3.x, -5)
  t.equal(v3.y, -5)

  const v4 = new CSG.Vector2D({x: 1, y: -1})
  t.equal(v4.x, 1)
  t.equal(v4.y, -1)

  const v5 = new CSG.Vector2D(v2)
  t.equal(v5.x, 5)
  t.equal(v5.y, 5)

  const v6 = CSG.Vector2D.Create(-5, 5)
  t.equal(v6.x, -5)
  t.equal(v6.y, 5)

  const v7 = CSG.Vector2D.fromAngleRadians(2)
  helper.nearlyEqual(t, v7.x, -0.4161468365, 1e-10)
  helper.nearlyEqual(t, v7.y, 0.9092974268, 1e-10)

  const v8 = CSG.Vector2D.fromAngle(-2)
  helper.nearlyEqual(t, v8.x, -0.4161468365, 1e-10)
  helper.nearlyEqual(t, v8.y, -0.9092974268, 1e-10)

  const v9 = CSG.Vector2D.fromAngleDegrees(45)
  helper.nearlyEqual(t, v9.x, 0.7071067811, 1e-10)
  helper.nearlyEqual(t, v9.y, 0.7071067811, 1e-10)
})

it('CSG.Vector2D operations', function () {
  const v1 = CSG.Vector2D.fromAngleDegrees(45)

  var v2 = v1.clone()
  helper.nearlyEqual(t, v2.x, 0.7071067811, 1e-10)
  helper.nearlyEqual(t, v2.y, 0.7071067811, 1e-10)

  var l = v2.length()
  t.equal(l, 1.0)
  l = v2.lengthSquared()
  t.equal(l, 1.0)

  var a = v2.angle()
  helper.nearlyEqual(t, a, 0.7853981633, 1e-10)
  a = v2.angleRadians()
  helper.nearlyEqual(t, a, 0.7853981633, 1e-10)
  a = v2.angleDegrees()
  helper.nearlyEqual(t, a, 45.0, 1e-10)

  var v3 = v2.negated()
  helper.nearlyEqual(t, v3.x, -0.7071067811, 1e-10)
  helper.nearlyEqual(t, v3.y, -0.7071067811, 1e-10)

  v3 = v2.unit()
  helper.nearlyEqual(t, v3.x, 0.7071067811, 1e-10)
  helper.nearlyEqual(t, v3.y, 0.7071067811, 1e-10)

  v3 = v3.negated().abs()
  helper.nearlyEqual(t, v3.x, 0.7071067811, 1e-10)
  helper.nearlyEqual(t, v3.y, 0.7071067811, 1e-10)

  v3 = v2.normal()
  helper.nearlyEqual(t, v3.x, 0.7071067811, 1e-10)
  helper.nearlyEqual(t, v3.y, -0.7071067811, 1e-10)

  t.equal(v1.equals(v2), true)

// use the 4 corners
  const c1 = new CSG.Vector2D(5, 0)
  const c2 = new CSG.Vector2D(0, 5)
  const c3 = new CSG.Vector2D(-5, 0)
  const c4 = new CSG.Vector2D(0, -5)

  v2 = c1.dividedBy(2)
  t.equal(v2.x, 2.5)
  t.equal(v2.y, 0.0)

  v2 = c1.times(5)
  t.equal(v2.x, 25.0)
  t.equal(v2.y, 0.0)

  v2 = c1.plus(c4)
  t.equal(v2.x, 5.0)
  t.equal(v2.y, -5.0)

  v2 = c1.minus(c4)
  t.equal(v2.x, 5.0)
  t.equal(v2.y, 5.0)

  v2 = c1.lerp(c2, 5)
  t.equal(v2.x, -20.0)
  t.equal(v2.y, 25.0)

  v2 = c1.min(c4)
  t.equal(v2.x, 0.0)
  t.equal(v2.y, -5.0)

  v2 = c1.max(c4)
  t.equal(v2.x, 5.0)
  t.equal(v2.y, 0.0)

  var d = c1.dot(c2)
  t.equal(d, 0)
  d = c1.dot(c3)
  t.equal(d, -25)
  d = c1.dot(c4)
  t.equal(d, 0)

  d = c1.distanceTo(c2)
  helper.nearlyEqual(t, d, 7.0710678118, 1e-10)
  d = c1.distanceTo(c3)
  helper.nearlyEqual(t, d, 10.0, 1e-10)
  d = c1.distanceTo(c4)
  helper.nearlyEqual(t, d, 7.0710678118, 1e-10)

  d = c1.distanceToSquared(c2)
  t.equal(d, 50.0)
  d = c1.distanceToSquared(c3)
  t.equal(d, 100.0)
  d = c1.distanceToSquared(c4)
  t.equal(d, 50.0)

  d = c1.cross(c2)
  t.equal(d, 25.0)
  d = c1.cross(c3)
  t.equal(d, 0.0)
  d = c1.cross(c4)
  t.equal(d, -25.0)

/*
  v2 = c1.multiply4x4(matrix4x4)
  v2 = c1.transform(matrix4x4)
 */
})

it('CSG.Vector2D conversions', function () {
  const v1 = new CSG.Vector2D({x: 1, y: -1})

  var s1 = v1.toString()
  t.equal(v1.toString(), '(1.00000, -1.00000)')

  var v3 = v1.toVector3D(5)
  t.equal(v3.x, 1)
  t.equal(v3.y, -1)
  t.equal(v3.z, 5)

  v3 = new CSG.Vector3D(v1)
  t.equal(v3.x, 1)
  t.equal(v3.y, -1)
  t.equal(v3.z, 0)
})
