# Support for optional catch binding in Acorn

[![NPM version](https://img.shields.io/npm/v/acorn-optional-catch-binding.svg)](https://www.npmjs.org/package/acorn-optional-catch-binding)

This is a plugin for [Acorn](http://marijnhaverbeke.nl/acorn/) - a tiny, fast JavaScript parser, written completely in JavaScript.

It implements support for optional catch bindings as defined in the stage 3 proposal [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding). The emitted AST follows [ESTree](https://github.com/estree/estree/blob/master/experimental/optional-catch-binding.md).

## Usage

You can use this module directly in order to get an Acorn instance with the plugin installed:

```javascript
var acorn = require('acorn-optional-catch-binding');
```

Or you can use `inject.js` for injecting the plugin into your own version of Acorn like this:

```javascript
var acorn = require('acorn-optional-catch-binding/inject')(require('./custom-acorn'));
```

Then, use the `plugins` option to enable the plugiin:

```javascript
var ast = acorn.parse(code, {
  plugins: { optionalCatchBinding: true }
});
```

## License

This plugin is released under the [GNU Affero General Public License](./LICENSE).
