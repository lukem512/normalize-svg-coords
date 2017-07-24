# normalize-svg-coords

[![Build Status](https://travis-ci.org/lukem512/normalize-svg-coords.svg?branch=master)](https://travis-ci.org/lukem512/normalize-svg-coords) ![Dependency Status](https://david-dm.org/lukem512/normalize-svg-coords.svg) [![npm](https://img.shields.io/npm/l/normalize-svg-coords.svg)](https://www.npmjs.com/package/normalize-svg-coords) [![npm](https://img.shields.io/npm/v/normalize-svg-coords.svg)](https://www.npmjs.com/package/normalize-svg-coords) [![npm](https://img.shields.io/npm/dm/normalize-svg-coords.svg)](https://www.npmjs.com/package/normalize-svg-coords)

Normalize coordinates in an SVG path to a specified range.

## Install

```
npm i --save normalize-svg-coords
```

## Usage

```js
const normalize = require('normalize-svg-coords');

const normalizedPath = normalize({
  viewBox: '0 0 400 460',
  path: 'M150.883 169.12c11.06-.887 20.275-7.079 24.422-17.256',
  min: 0,
  max: 1,
  asList: false
})

console.log(normalizedPath) // M0.3772 0.3677c0.0277 -0.0019 0.0507 -0.0154 0.0611 -0.0375
```

Specify a range, `min` to `max`, and provide the `path` and the corresponding
`viewBox`. The coordinates of the resulting path will all be within the
specified range whilst maintaining the shape.

The `viewBox` parameter may be passed as a `string` of 4 integers in the order
`xmin ymin xmax ymax` with spaces (` `) or commas (`,`) as a delimiter. The
`viewBox` may also be passed as an `object` or an `array`. If no `viewBox` is specified then one is inferred using [`svg-path-bounds`](https://npmjs.com/package/svg-path-bounds).

Set the `asList` parameter to `true` to output the normalized path as a segmented list.

```js
console.log(normalizedPath) // ['M', '0.3772', '0.3677'], ['c', '0.0277', '-0.0019', '0.0507', '-0.0154', '0.0611', '-0.0375']]
```

## Related Modules

[extract-svg-viewbox](https://github.com/lukem512/extract-svg-viewbox)

## License

MIT © Luke Mitchell
