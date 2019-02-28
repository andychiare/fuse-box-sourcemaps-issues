module.exports = {
	"rules": {
		"no-undef": ["error"],
		"no-delete-var": ["error"],
		"no-const-assign": ["error"],
		"no-dupe-class-members": ["error"],
		"no-this-before-super": ["error"],
		"no-cond-assign": ["error"],
		"no-dupe-keys": ["error"],
		"no-unreachable": ["error"],
		"no-fallthrough": ["error"]
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": 10,
		"sourceType": "module",
		"allowImportExportEverywhere": true,
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"globals": {
		"WidgetModule": false
	}
};

//"extends": "eslint:recommended",
