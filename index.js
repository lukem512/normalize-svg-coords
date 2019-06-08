'use strict'

const parse = require('parse-svg-path')
const getBounds = require('svg-path-bounds')

// Taken from the SVG specification: https://www.w3.org/TR/SVG/paths.html
// Uppercase instructions refer to absolute coordinates whilst lowercase
// instructions use coordinates relative to the last instruction.
const INSTRUCTIONS = [
  'M', 'm',
  'L', 'l',
  'H', 'h',
  'V', 'v',
  'C', 'c',
  'S', 's',
  'Q', 'q',
  'T', 't',
  'A', 'a',
  'Z', 'z'
]

const XMIN = 0
const YMIN = 1
const XMAX = 2
const YMAX = 3

// The viewBox string may be specified using spaces or commas as delimiters.
// The order is: xmin, ymin, xmax, ymax
const extractViewBox = function(viewBoxStr) {
  const parts = viewBoxStr.split(/\s*,\s*|\s+/)
  return [
    parseFloat(parts[0]),
    parseFloat(parts[1]),
    parseFloat(parts[2]),
    parseFloat(parts[3])
  ]
}

// Normalize an SVG path to between a specified min and max.
// Throws an error on invalid parameters.
const normalize = function({viewBox, path, min = 0, max = 1, precision = 4, asList}) {
  let bounds
  switch (typeof viewBox) {
    case 'string':
      bounds = extractViewBox(viewBox)
      break

    case 'object':
      bounds = viewBox
      if (!Array.isArray(bounds)) {
        bounds = [bounds.xmin, bounds.ymin, bounds.xmax, bounds.ymax]
      }
      break

    case 'undefined':
      bounds = getBounds(path)
      break

    default:
      throw Error('Unknown viewBox format')
      break
  }

  const normalized = parse(path).map(feature => {
    const instruction = feature[0]
    if (INSTRUCTIONS.indexOf(instruction) === -1) {
      throw Error(`Unknown instruction ${instruction} in path`)
    }

    const remaining = feature.slice(1)

    // Transform into IR
    let intermediates = [];
    if (instruction === 'A' || instruction === 'a') {
      const [rx, ry, xrot, largearc, sweep, x, y] = remaining
      intermediates = [
        {value: rx, x: true},
        {value: ry},
        {value: xrot, skip: true},
        {value: largearc, skip: true},
        {value: sweep, skip: true},
        {value: x, x: true},
        {value: y}
      ]
    } else if (instruction === 'H' || instruction === 'h') {
      const [xplus] = remaining
      intermediates = [{value: xplus, x: true}]
    } else if (instruction === 'V' || instruction === 'v') {
      const [yplus] = remaining
      intermediates = [{value: yplus}]
    } else {
      // X coordinates are at even positions whilst Y coordinates are at odd.
      intermediates = remaining.map((value, i) => ({
        value,
        x: i % 2 === 0,
      }))
    }

    // Normalize the values of each coordinate.
    const coords = intermediates.reduce((processed, {value, skip, x}) => {
      if (skip) {
        return processed.concat(value)
      }

      const norm = normalizeCoord({
        value,
        min,
        max,
        bounds,
        x
      }).toFixed(precision)
      return processed.concat(norm)
    }, [])

    // Return as segmented list?
    if (asList) {
      coords.unshift(instruction)
      return coords
    }
    return instruction + coords.join(' ')
  })
  return asList ? normalized : normalized.join('')
}

const normalizeCoord = function({value, x, bounds, min, max}) {
  const float = parseFloat(value)
  if (isNaN(float)) {
    throw Error(`Invalid coordinate ${value} in path`)
  }
  const oldMax = x ? bounds[XMAX] : bounds[YMAX]
  const oldMin = x ? bounds[XMIN] : bounds[YMIN]
  return scale(max, min, oldMax, oldMin, float)
}

// Scale a value in range [oldMin, oldMax] to the scale
// [newMin, newMax].
// See https://stackoverflow.com/a/5295202/6413814
const scale = function(newMax, newMin, oldMax, oldMin, x) {
  const scalar = newMax - newMin
  const diff = oldMax - oldMin
  if (diff == 0) {
    return newMin
  }
  return ((scalar * (x - oldMin)) / diff) + newMin
}

module.exports = normalize;
