var t = require('assert');
const CSG = require('../csg')

// NOTE: these are kept for now as a way to make sure the root
// exported object from csg.js has all these helpers

it('root csg objects provides parseOption', function () {
  t.equal(CSG.hasOwnProperty('parseOptionAsFloat'), true)
})

it('root csg objects provides parseOptionAsFloat', function () {
  t.equal(CSG.hasOwnProperty('parseOptionAsFloat'), true)
})

it('root csg objects provides parseOptionAsInt', function () {
  t.equal(CSG.hasOwnProperty('parseOptionAsInt'), true)
})

it('root csg objects provides parseOptionAsBool', function () {
  t.equal(CSG.hasOwnProperty('parseOptionAsBool'), true)
})

it('root csg objects provides parseOptionAs2DVector', function () {
  t.equal(CSG.hasOwnProperty('parseOptionAs2DVector'), true)
})

it('root csg objects provides parseOptionAs3DVector', function () {
  t.equal(CSG.hasOwnProperty('parseOptionAs3DVector'), true)
})

it('root csg objects provides parseOptionAs3DVectorList', function () {
  t.equal(CSG.hasOwnProperty('parseOptionAs3DVectorList'), true)
})
