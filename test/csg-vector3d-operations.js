var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;
//import {CAG} from '../csg'
const {nearlyEqual} = require('./helpers/nearlyEqual')

function planeEquals (t, observed, expected) {
  t.equal(observed.w,expected.w)
  return t.deepEqual(observed.normal, expected.normal)
}

function vertexEquals (t, observed, expected) {
  const obs = [observed.pos._x, observed.pos._y, observed.pos._z]
  return t.deepEqual(obs, expected)
}

function vector3Equals (t, observed, expected) {
  const obs = [observed._x, observed._y, observed._z]
  return t.deepEqual(obs, expected)
}

it('CSG.Vector3 constructor', function () {
  const Vector3 = CSG.Vector3D

  let v1 = new Vector3([1,2,3])

  t.equal(v1._x, 1)
  t.equal(v1.x, 1)
  t.equal(v1._y, 2)
  t.equal(v1.y, 2)
  t.equal(v1._z, 3)
  t.equal(v1.z, 3)

  t.equal(v1.toString(),'(1.00000, 2.00000, 3.00000)')

  let v2 = CSG.Vector3D.Create(4, 5, 6)

  t.equal(v2._x, 4)
  t.equal(v2.x, 4)
  t.equal(v2._y, 5)
  t.equal(v2.y, 5)
  t.equal(v2._z, 6)
  t.equal(v2.z, 6)

// NOTE: We don't care about other other constructors as this class will change
})

it('CSG.Vector3 production operations', function () {
  const Vector3 = CSG.Vector3D

  let v1 = new Vector3([1,2,3])
  let p1 = v1.clone()

  t.equal(v1.x, p1.x)
  t.equal(v1.y, p1.y)
  t.equal(v1.z, p1.z)

  let v2 = new Vector3([4,5,6])
  let p2 = v2.negated()

  t.equal(- v2.x, p2.x)
  t.equal(- v2.y, p2.y)
  t.equal(- v2.z, p2.z)
  t.equal(v2.equals(p2),false)

  let p3 = p2.abs()

  t.equal(v2.x, p3.x)
  t.equal(v2.y, p3.y)
  t.equal(v2.z, p3.z)
  t.equal(v2.equals(p3),true)

  let v4 = new Vector3([7,8,6])
  let p4 = v4.randomNonParallelVector()

  t.equal(p4.x, 0)
  t.equal(p4.y, 0)
  t.equal(p4.z, 1)
})

it('CSG.Vector3 math operations', function () {
  const Vector3 = CSG.Vector3D

  let v1 = new Vector3([1,1,1])
  let v2 = new Vector3([2,2,2])
  let v3 = new Vector3([3,3,3])

  let m1 = v1.plus(v2)

  t.equal(m1.x, 3)
  t.equal(m1.y, 3)
  t.equal(m1.z, 3)

  let m2 = v1.minus(v2)

  t.equal(m2.x, -1)
  t.equal(m2.y, -1)
  t.equal(m2.z, -1)

  let m3 = v2.times(3)

  t.equal(m3.x, 6)
  t.equal(m3.y, 6)
  t.equal(m3.z, 6)

  let m4 = v2.dividedBy(4)

  t.equal(m4.x, 0.5)
  t.equal(m4.y, 0.5)
  t.equal(m4.z, 0.5)

  let d1 = v1.dot(v2)
  let d2 = v2.dot(v3)
  let d3 = v3.dot(v1)

  t.equal(d1, 6)
  t.equal(d2, 18)
  t.equal(d3, 9)

  let e1 = v3.lerp(v2,10)

  t.equal(e1.x, -7)
  t.equal(e1.y, -7)
  t.equal(e1.z, -7)

  let l1 = v1.lengthSquared()
  let l2 = v2.lengthSquared()
  let l3 = v3.lengthSquared()

  t.equal(l1, 3)
  t.equal(l2, 12)
  t.equal(l3, 27)

  l1 = v1.length()
  l2 = v2.length()
  l3 = v3.length()

  nearlyEqual(t, l1, 1.7320508075, 1e-10)
  nearlyEqual(t, l2, 3.4641016151, 1e-10)
  nearlyEqual(t, l3, 5.1961524227, 1e-10)

  let u1 = v3.unit()

  nearlyEqual(t, u1.x, 0.5773502691, 1e-10)
  nearlyEqual(t, u1.y, 0.5773502691, 1e-10)
  nearlyEqual(t, u1.z, 0.5773502691, 1e-10)

  let c1 = v1.cross(v2)
  let c2 = v1.cross(v3)

  t.equal(c1.x, 0)
  t.equal(c1.y, 0)
  t.equal(c1.z, 0)

  t.equal(c2.x, 0)
  t.equal(c2.y, 0)
  t.equal(c2.z, 0)

  l1 = v1.distanceTo(v3)
  l2 = v3.distanceTo(v1)

  nearlyEqual(t, l1, 3.4641016151, 1e-10)
  nearlyEqual(t, l2, 3.4641016151, 1e-10)

  l1 = v1.distanceToSquared(v3)
  l2 = v3.distanceToSquared(v1)

  nearlyEqual(t, l1, 12.0000000000, 1e-10)
  nearlyEqual(t, l2, 12.0000000000, 1e-10)

  let x1 = v1.min(v3)
  let x2 = v1.max(v3)

  t.equal(v1.equals(x1),true)
  t.equal(v3.equals(x2),true)

  var matrix = CSG.Matrix4x4.rotationX(45)
  let t1 = v3.transform(matrix)

  nearlyEqual(t, t1.x, 3.0000000000, 1e-10)
  // to small to compare nearlyEqual(t, t1.y, 0.0000000000000004, 1e-16)
  nearlyEqual(t, t1.z, 4.2426406871, 1e-10)

})

