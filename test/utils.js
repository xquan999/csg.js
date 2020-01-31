var t = require('assert');
const {CSG, CAG, isCAG, isCSG} = require('../csg')

it('isCSG() is correctly determining if object is a CSG', function () {
  const emptyCSG = new CSG()
  t.equal(isCSG(emptyCSG), true)
})

it('isCAG() is correctly determining if object is a CAG', function () {
  const emptyCAG = new CAG()
  t.equal(isCAG(emptyCAG), true)
})
