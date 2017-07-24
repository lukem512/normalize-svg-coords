'use strict'

const assert = require('assert')
const isEqual = require('lodash.isequal');
const normalize = require('../index')

describe('Normalize SVG path', function() {
  it('should return normalized star', function() {
    const path = normalize({
      viewBox: '0 0 460 460',
      path: 'M150.883 169.12c11.06-.887 20.275-7.079 24.422-17.256l41.931-97.777c3.225-7.525 10.598-8.408 12.902-8.408 2.303 0 9.675.444 12.899 8.408l41.934 97.777c4.146 9.733 13.359 16.369 24.421 17.256l109.664 7.523c8.293.44 11.52 7.074 11.98 8.846.92 2.212 2.305 8.848-3.687 14.157l-85.704 67.695c-8.755 6.634-12.439 17.697-9.677 27.872l25.805 101.319c1.381 5.749-.922 9.731-2.765 11.945-2.765 3.095-6.452 4.864-10.137 4.864-2.301 0-4.606-.881-7.373-2.21l-93.537-55.304c-4.608-2.654-9.677-3.982-15.207-3.982-5.528 0-10.598 1.329-15.203 3.982l-92.618 55.304c-5.99 3.539-13.823 2.21-17.508-3.097-1.845-2.21-3.687-5.753-1.845-11.062l25.805-101.759c2.763-10.175-1.384-21.238-9.677-27.872l-84.783-67.253c-6.45-5.309-4.608-12.387-4.147-14.599.922-2.214 3.687-8.406 12.442-8.846l109.664-7.523zm-143.762 9.733c-5.07 14.157-.924 28.755 11.058 38.49l84.783 67.251c1.845 1.327 2.303 3.541 1.845 5.751l-25.803 101.319c-3.227 10.616-.922 21.676 5.988 30.086 6.912 8.846 17.97 14.157 29.03 14.157 6.91 0 13.823-2.212 19.351-5.753l92.618-55.304c1.843-.883 4.147-.883 5.99 0l93.537 55.304c5.99 3.982 12.902 5.753 19.813 5.753 10.598 0 21.199-4.867 28.11-13.274 6.91-8.406 9.674-19.466 7.371-30.528l-25.803-101.761c-.46-2.212.46-4.424 1.843-5.751l85.245-67.693c11.52-9.735 15.666-24.331 11.06-38.49-5.072-13.719-17.512-23.008-32.257-23.894l-109.666-7.521c-2.301 0-4.146-1.329-5.066-3.539l-41.931-97.335c-5.992-13.719-18.894-22.123-34.098-22.123-15.207 0-28.57 8.404-34.098 22.123l-41.932 97.775c-.922 1.77-2.763 3.099-5.068 3.541l-109.206 7.079c-14.743.885-27.646 10.175-32.713 24.335z'
    })
    const expected = 'M0.3280 0.3677c0.0240 -0.0019 0.0441 -0.0154 0.0531 -0.0375l0.0912 -0.2126c0.0070 -0.0164 0.0230 -0.0183 0.0280 -0.0183c0.0050 0.0000 0.0210 0.0010 0.0280 0.0183l0.0912 0.2126c0.0090 0.0212 0.0290 0.0356 0.0531 0.0375l0.2384 0.0164c0.0180 0.0010 0.0250 0.0154 0.0260 0.0192c0.0020 0.0048 0.0050 0.0192 -0.0080 0.0308l-0.1863 0.1472c-0.0190 0.0144 -0.0270 0.0385 -0.0210 0.0606l0.0561 0.2203c0.0030 0.0125 -0.0020 0.0212 -0.0060 0.0260c-0.0060 0.0067 -0.0140 0.0106 -0.0220 0.0106c-0.0050 0.0000 -0.0100 -0.0019 -0.0160 -0.0048l-0.2033 -0.1202c-0.0100 -0.0058 -0.0210 -0.0087 -0.0331 -0.0087c-0.0120 0.0000 -0.0230 0.0029 -0.0330 0.0087l-0.2013 0.1202c-0.0130 0.0077 -0.0301 0.0048 -0.0381 -0.0067c-0.0040 -0.0048 -0.0080 -0.0125 -0.0040 -0.0240l0.0561 -0.2212c0.0060 -0.0221 -0.0030 -0.0462 -0.0210 -0.0606l-0.1843 -0.1462c-0.0140 -0.0115 -0.0100 -0.0269 -0.0090 -0.0317c0.0020 -0.0048 0.0080 -0.0183 0.0270 -0.0192l0.2384 -0.0164zm-0.3125 0.0212c-0.0110 0.0308 -0.0020 0.0625 0.0240 0.0837l0.1843 0.1462c0.0040 0.0029 0.0050 0.0077 0.0040 0.0125l-0.0561 0.2203c-0.0070 0.0231 -0.0020 0.0471 0.0130 0.0654c0.0150 0.0192 0.0391 0.0308 0.0631 0.0308c0.0150 0.0000 0.0301 -0.0048 0.0421 -0.0125l0.2013 -0.1202c0.0040 -0.0019 0.0090 -0.0019 0.0130 0.0000l0.2033 0.1202c0.0130 0.0087 0.0280 0.0125 0.0431 0.0125c0.0230 0.0000 0.0461 -0.0106 0.0611 -0.0289c0.0150 -0.0183 0.0210 -0.0423 0.0160 -0.0664l-0.0561 -0.2212c-0.0010 -0.0048 0.0010 -0.0096 0.0040 -0.0125l0.1853 -0.1472c0.0250 -0.0212 0.0341 -0.0529 0.0240 -0.0837c-0.0110 -0.0298 -0.0381 -0.0500 -0.0701 -0.0519l-0.2384 -0.0163c-0.0050 0.0000 -0.0090 -0.0029 -0.0110 -0.0077l-0.0912 -0.2116c-0.0130 -0.0298 -0.0411 -0.0481 -0.0741 -0.0481c-0.0331 0.0000 -0.0621 0.0183 -0.0741 0.0481l-0.0912 0.2126c-0.0020 0.0038 -0.0060 0.0067 -0.0110 0.0077l-0.2374 0.0154c-0.0321 0.0019 -0.0601 0.0221 -0.0711 0.0529z'
    assert.equal(path, expected)
  })

  it('should return a line normalized between 1 and 2', function() {
    const path = normalize({
      viewBox: '0 0 197 1',
      min: 1,
      max: 2,
      path: 'M0.5,0.5 L196.5,0.5'
    })
    const expected = 'M1.0025 1.5000L1.9975 1.5000'
    assert.equal(path, expected)
  })

  it('should return a line sketched circle between 300 and 700', function() {
    const path = normalize({
      viewBox: '0 0 43 33',
      min: 300,
      max: 700,
      path: 'M33.5710827,0.932873528 C23.3209287,2.80681347 11.7955904,1.26061876 2.82062063,6.55469334 C-1.66824645,9.20254595 5.15109323,26.6306081 9.10099648,29.0999755 C16.3210203,33.6137295 39.9308866,32.9957424 41.6067156,21.8817373 C42.6694088,14.8340149 38.1630403,7.26781665 36.0384369,1.42902144 L33.5710827,0.932873528 Z'
    })
    const expected = 'M612.2891 311.3076C516.9389 334.0220 409.7264 315.2802 326.2383 379.4508C284.4814 411.5460 347.9171 622.7952 384.6604 652.7270C451.8234 707.4391 671.4501 699.9484 687.0392 565.2332C696.9247 479.8062 655.0050 388.0947 635.2413 317.3215L612.2891 311.3076Z'
    assert.equal(path, expected)
  })

  it('should return a normalized elliptic arcs', function() {
    const path = normalize({
      path: 'M 10 10A 15 15 0 1 0 25 5Z',
      min: 0,
      max: 1
    })
    const expected = 'M0.1474 0.1616A0.3064 0.3232 0 1 0 0.6244 -0.0000Z'
    assert.equal(path, expected)
  })

  it('should return a segmented list', function() {
    const path = normalize({
      viewBox: '0 0 400 460',
      path: 'M150.883 169.12c11.06-.887 20.275-7.079 24.422-17.256',
      min: 0,
      max: 1,
      asList: true
    })
    const expected = [['M', '0.3772', '0.3677'], ['c', '0.0277', '-0.0019', '0.0507', '-0.0154', '0.0611', '-0.0375']]
    assert(isEqual(path, expected))
  })

  it('should take any type of viewBox', function () {
    const path = 'M0 0H10V10Z';
    const expected = 'M0.0000 0.0000H1.0000V1.0000Z';

    let result = normalize({
      viewBox: '0,0,10,10',
      min: 0,
      max: 1,
      path: path
    })
    assert.equal(result, expected)

    result = normalize({
      viewBox: [0,0,10,10],
      min: 0,
      max: 1,
      path: path
    })
    assert.equal(result, expected)

    result = normalize({
      viewBox: '0 0 10 10',
      min: 0,
      max: 1,
      path: path
    })
    assert.equal(result, expected)

    result = normalize({
      viewBox: {xmin: 0, ymin: 0, xmax: 10, ymax: 10},
      min: 0,
      max: 1,
      path: path
    })
    assert.equal(result, expected)
  })

  it('should infer a viewBox if one is not specified', function() {
    const path = normalize({
      path: 'M33.5710827,0.932873528 C23.3209287,2.80681347 11.7955904,1.26061876 2.82062063,6.55469334 C-1.66824645,9.20254595 5.15109323,26.6306081 9.10099648,29.0999755 C16.3210203,33.6137295 39.9308866,32.9957424 41.6067156,21.8817373 C42.6694088,14.8340149 38.1630403,7.26781665 36.0384369,1.42902144 L33.5710827,0.932873528 Z'
    })
    const expected = 'M0.7948 0.0000C0.5636 0.0573 0.3037 0.0100 0.1012 0.1720C0.0000 0.2530 0.1538 0.7863 0.2429 0.8619C0.4057 1.0000 0.9382 0.9811 0.9760 0.6410C1.0000 0.4254 0.8984 0.1938 0.8504 0.0152L0.7948 0.0000Z'
    assert.equal(path, expected)
  })

  it('should handle commands with odd number of arguments', function () {
    const path = normalize({
      path: 'M0 187.5H187.5V346.4H93.8V533.8H187.5V687.5H0V875H562.5V687.5H375V533.8H466.1V346.4H375V187.5H562.5V0H0ZM1500 312.5V125H937.5V312.5H1125V468.8H1032.6V656.3H1125V812.5H937.5V1000H1500V812.5H1312.5V656.3H1404.9V468.8H1312.5V312.5Z',
      viewBox: [0, 0, 100, 100],
      min: 0,
      max: 1
    })
    const expected = 'M0.0000 1.8750H1.8750V3.4640H0.9380V5.3380H1.8750V6.8750H0.0000V8.7500H5.6250V6.8750H3.7500V5.3380H4.6610V3.4640H3.7500V1.8750H5.6250V0.0000H0.0000ZM15.0000 3.1250V1.2500H9.3750V3.1250H11.2500V4.6880H10.3260V6.5630H11.2500V8.1250H9.3750V10.0000H15.0000V8.1250H13.1250V6.5630H14.0490V4.6880H13.1250V3.1250Z'
    assert.equal(path, expected)
  })
})
