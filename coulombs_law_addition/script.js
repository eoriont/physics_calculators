var lastOutput = [0, 0]

function calculateForce() {
  let fdata = serializeForm("form")
  let outputBox = document.getElementById("output")

  let a = angle(fdata.xdist/100, fdata.ydist/100)
  let dist = magnitude(fdata.xdist/100, fdata.ydist/100)
  let r = coulombsLaw(fdata.charge1, fdata.charge2, dist)

  let [fmag, fang] = addVectors(fdata.force1, fdata.angle1*Math.PI/180, r, a)
  fang *= 180/Math.PI
  if (fang < 0) fang += 360

  lastOutput = [fmag, fang]

  outputBox.innerHTML = `Magnitude: ${Math.round(fmag*100)/100} N, Angle: ${Math.round(fang*100)/100} °`
}

function moveLastOutput() {
  let form = document.forms["form"]
  form["force1"].value = lastOutput[0]
  form["angle1"].value = lastOutput[1]
  form["xdist"].value = 0
  form["ydist"].value = 0
  form["charge2"].value = 0
}

function coulombsLaw(c1, c2, r) {
  return -9e-3 * c1 * c2 / r**2
}

function magnitude(x, y) {
  return (x**2 + y**2)**0.5
}

function distance(x1, y1, x2, y2) {
  return magnitude(x1-x2, y1-y2)
}

function angle(x, y) {
  return Math.atan2(y, x)
}

function addVectors(r1, t1, r2, t2) {
  let p1 = [r1*Math.cos(t1), r1*Math.sin(t1)]
  let p2 = [r2*Math.cos(t2), r2*Math.sin(t2)]

  let p3 = [p1[0] + p2[0], p1[1] + p2[1]]
  let r3 = magnitude(p3[0], p3[1])
  let t3 = angle(p3[0], p3[1])
  return [r3, t3]
}

function serializeForm(form) {
  let obj = {}
  let formdata = new FormData(document.forms[form])
  for (let [key, val] of formdata) {
    obj[key] = parseFloat(val)
  }
  return obj
}
