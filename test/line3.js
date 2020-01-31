var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;

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

it('CSG.Line3 constructors create valid lines', function () {
  const Line3 = CSG.Line3D
  const Vector3 = CSG.Vector3D
  const Plane = CSG.Plane

  let l1 = Line3.fromPoints([0,0,0],[10,-10,10])
  let l2 = new Line3(l1.point,l1.direction)

  t.deepEqual(l1, l2)
  t.equal(l1.equals(l2),true)

  let a = new Vector3(0,0,0)
  let b = new Vector3(10,10,0)
  let c = new Vector3(-10,10,0)
  let p1 = Plane.fromVector3Ds(a,b,c)
  a = new Vector3(10,0,0)
  b = new Vector3(10,10,0)
  c = new Vector3(10,10,10)
  let p2 = Plane.fromVector3Ds(a,b,c)
  let l3 = Line3.fromPlanes(p1,p2)

  vector3Equals(t,l3.point,[10,0,0])
  vector3Equals(t,l3.direction,[-0,1,0])

  let l4 = l1.clone()
  t.deepEqual(l4, l1)
})

it('CSG.Line3 transforms', function () {
  const Line3 = CSG.Line3D
  const Vector3 = CSG.Vector3D
  const Plane = CSG.Plane

  let l1 = Line3.fromPoints([0,0,0],[10,-10,10])
  vector3Equals(t,l1.point,[0,0,0])
  vector3Equals(t,l1.direction,[0.5773502691896257,-0.5773502691896257,0.5773502691896257])

  let l2 = l1.reverse()
  vector3Equals(t,l2.point,[0,0,0])
  vector3Equals(t,l2.direction,[-0.5773502691896257,0.5773502691896257,-0.5773502691896257])

  let matrix = CSG.Matrix4x4.rotationX(90)
  matrix = matrix.multiply(CSG.Matrix4x4.translation([-100,0,-100]))

  let l3 = l1.transform(matrix)
  vector3Equals(t,l3.point,[-100,0,-100])
  vector3Equals(t,l3.direction,[0.5773502691896247,-0.5773502691896278,-0.5773502691896247])
})

it('CSG.Line3 geometry calculations', function () {
  const Line3 = CSG.Line3D
  const Vector3 = CSG.Vector3D
  const Plane = CSG.Plane

  let l1 = Line3.fromPoints([-10,-10,-10],[0,0,0])
  vector3Equals(t,l1.point,[-10,-10,-10])
  vector3Equals(t,l1.direction,[0.5773502691896257,0.5773502691896257,0.5773502691896257])

  let a = new Vector3(0,0,0)
  let b = new Vector3(10,10,0)
  let c = new Vector3(-10,10,0)
  let p1 = Plane.fromVector3Ds(a,b,c)

  let i1 = l1.intersectWithPlane(p1)
  vector3Equals(t,i1,[0,0,0])

  let d1 = l1.distanceToPoint([1,1,0])
  t.equal(d1,0.816496580927726)

  let i2 = l1.closestPointOnLine([1,1,0])
  vector3Equals(t,i2,[0.6666666666666661,0.6666666666666661,0.6666666666666661])
})

