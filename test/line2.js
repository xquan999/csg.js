var t = require('assert');
var csg = require("../csg"); let CSG = csg.CSG; let CAG = csg.CAG;

function planeEquals(t, observed, expected) {
    t.equal(observed.w, expected.w)
    return t.deepEqual(observed.normal, expected.normal)
}

function vertexEquals(t, observed, expected) {
    const obs = [observed.pos._x, observed.pos._y, observed.pos._z]
    return t.deepEqual(obs, expected)
}

function vector2Equals(t, observed, expected) {
    const obs = [observed._x, observed._y]
    return t.deepEqual(obs, expected)
}

it('CSG.Line2 constructors creates valid lines', function () {
    const Line2 = CSG.Line2D
    const Vector2 = CSG.Vector2D

    let l1 = Line2.fromPoints([0, 0], [10, -10])
    let l2 = new Line2(l1.normal, l1.w)

    t.deepEqual(l1, l2)
    t.equal(l1.equals(l2), true)

// test W calculations
    l1 = Line2.fromPoints([0, 0], [10, 0])
    t.equal(l1.w, 0)
    l1 = Line2.fromPoints([10, 0], [10, 10])
    t.equal(l1.w, -10)
    l1 = Line2.fromPoints([10, 10], [0, 10])
    t.equal(l1.w, -10)
    l1 = Line2.fromPoints([0, 10], [-10, 10])
    t.equal(l1.w, -10)
    l1 = Line2.fromPoints([-10, -10], [-10, 0])
    t.equal(l1.w, 10)
    l1 = Line2.fromPoints([-10, 0], [-10, -10])
    t.equal(l1.w, -10)
    l1 = Line2.fromPoints([-10, -10], [0, -10])
    t.equal(l1.w, -10)
    l1 = Line2.fromPoints([0, -10], [10, -10])
    t.equal(l1.w, -10)
    l1 = Line2.fromPoints([10, -10], [10, 0])

    t.equal(l1.w, -10)
    t.equal(l1.equals(l2), false)

    let o1 = l1.origin()
    vector2Equals(t, o1, [10, -0])

    let d1 = l1.direction()
    vector2Equals(t, d1, [0, 1])
})

it('CSG.Line2 transforms', function () {
    const Line2 = CSG.Line2D
    const Vector2 = CSG.Vector2D

    let matrix = CSG.Matrix4x4.rotationX(90)
    matrix = matrix.multiply(CSG.Matrix4x4.translation([-10, 0, -10]))

    let l1 = Line2.fromPoints([-10, -10], [-10, 0])
    vector2Equals(t, l1.normal, [-1, 0])
    t.equal(l1.w, 10)

    let t1 = l1.reverse()
    vector2Equals(t, t1.normal, [1, -0])
    t.equal(t1.w, -10)

    let t2 = l1.transform(matrix)
    vector2Equals(t, t2.normal, [-1, 0])
    t.equal(t2.w, 20)
})

it('CSG.Line2 geometry calculations', function () {
    const Line2 = CSG.Line2D
    const Vector2 = CSG.Vector2D

    let l1 = Line2.fromPoints([-10, -10], [-10, 0])
    vector2Equals(t, l1.normal, [-1, 0])
    t.equal(l1.w, 10)

    let x1 = l1.xAtY(0)
    t.equal(x1, -10)

    let d1 = l1.absDistanceToPoint([0, 0])
    t.equal(d1, 10)

    let l2 = Line2.fromPoints([0, -10], [0, 0]) // paralell
    // FIXME throws as solve2Linear() returns [NaN,Infinity]
    //let i2 = l1.intersectWithLine(l2)

    let l3 = Line2.fromPoints([0, 0], [10, 0])
    let i3 = l1.intersectWithLine(l3)
    vector2Equals(t, i3, [-10, 0])
})
