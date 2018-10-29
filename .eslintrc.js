module.exports = {
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parserOptions": {
		"ecmaFeatures": {
				"jsx": true,
				"modules": true,
				"experimentalObjectRestSpread": true,
				"impliedStrict": true,
		},
		"ecmaVersion": 2016,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"babel"
	],
	"rules": {
		"indent": [
				"error",
				"tab"
		],
		"linebreak-style": [
				"error",
				"unix"
		],
		"quotes": [
				"error",
				"single"
		],
		"semi": "off",
		"react/jsx-uses-react":"error",
		"react/jsx-uses-vars":"error",
		"react/no-unescaped-entities": "off",
		"babel/semi":[
			"error",
			"always",
			{ "omitLastInOneBlock": true}
		]
	},
	"settings": {
		"react": {
			"pragma": "React",
			"version": "16.3.2"
		}
	}
};