'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/bind-context');
var getMapIterator = require('../internals/get-map-iterator');

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  find: function find(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var step, entry, value;
    while (!(step = iterator.next()).done) {
      entry = step.value;
      if (boundFunction(value = entry[1], entry[0], map)) return value;
    }
  }
});
