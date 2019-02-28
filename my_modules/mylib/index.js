	// NOTE: Should match syntheticDefaultExportPolyfill in LoaderAPI.ts
	function syntheticDefaultExportPolyfill(input) {
		if (
			input === null ||
			["function", "object", "array"].indexOf(typeof input) === -1 ||
			input.hasOwnProperty("default") // use hasOwnProperty to avoid triggering usage warnings from libraries like mobx
		) {
			return;
		}
		// to get around frozen input
		if (Object.isFrozen(input)) {
			input.default = input;
			return;
		}
		// free to define properties
		Object.defineProperty(input, "default", {
			value: input,
			writable: true,
			enumerable: false
		});
	}
	if (typeof global === "object") {
		global.require = require;
	}
	var _a5fe = {};
	_a5fe.f = {};
	// cached modules
	_a5fe.m = {};
	_a5fe.r = function(id) {
		var cached = _a5fe.m[id];
		// resolve if in cache
		if (cached) {
			return cached.m.exports;
		}
		var file = _a5fe.f[id];
		if (!file) return;
		cached = _a5fe.m[id] = {};
		cached.exports = {};
		cached.m = { exports: cached.exports };
		file.call(cached.exports, cached.m, cached.exports);
		syntheticDefaultExportPolyfill(cached.m.exports);
		return cached.m.exports;
	};
// default/index.js
_a5fe.f[0] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = require('react');
function fn1() {
    return 'fn1';
}
exports.fn1 = fn1;
function fn2() {
    return 'fn2';
}
exports.fn2 = fn2;
function fn3() {
    return Math.random();
}
exports.fn3 = fn3;
function fn4(from) {
    return react_1.default.createElement('p', null, `this is the fn4 from ${ from }`);
}
exports.fn4 = fn4;
}
module.exports = _a5fe.r(0)


//# sourceMappingURL=index_quantum.js.map