var t = require('assert');
const {comparePolygons} = require('./helpers/asserts')

it('comparePolygons on same single vertex', function () {
  let a = {vertices: [{_x: 0, _y: 0, _z: 0}]}
  t.equal(comparePolygons(a, a), true)
})

it('comparePolygons on different vertices', function () {
  let a = {vertices: [{_x: 0, _y: 0, _z: 0}]}, b = {vertices: [{_x: 1, _y: 1, _z: 1}]}
  t.equal(false, comparePolygons(a, b))
})

it('comparePolygons on same polygon', function () {
  let a = {vertices: [
        {_x: 0, _y: 0, _z: 0},
        {_x: 1, _y: 1, _z: 1},
        {_x: -1, _y: 1, _z: 1}
  ]}
  t.equal(comparePolygons(a, a), true)
})

it('comparePolygons on same polygon with different vertice order', function () {
  let a = {vertices: [
            {_x: 0, _y: 0, _z: 0},
            {_x: 1, _y: 1, _z: 1},
            {_x: -1, _y: 1, _z: 1}
    ]},
    b = {vertices: [
            {_x: -1, _y: 1, _z: 1},
            {_x: 0, _y: 0, _z: 0},
            {_x: 1, _y: 1, _z: 1}
    ]}
  t.equal(comparePolygons(a, b), true)
})

it('comparePolygons on different polygon with same vertice', function () {
  let a = {vertices: [
            {_x: 0, _y: 0, _z: 0},
            {_x: 1, _y: 1, _z: 1},
            {_x: -1, _y: 1, _z: 1}
    ]},
    b = {vertices: [
            {_x: 0, _y: 0, _z: 0},
            {_x: -1, _y: 1, _z: 1},
            {_x: 1, _y: 1, _z: 1}
    ]}
  t.equal(false, comparePolygons(a, b))
})
