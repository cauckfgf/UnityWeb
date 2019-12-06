module.exports = {
	root: true,
	env: {
		node: true
	},
	"extends": [
		"plugin:vue/essential",
		"@vue/standard",
		"@vue/typescript"
	],
	rules: {
		"no-console": "off",
		"no-debugger": "off",
		"semi": ["error", "always"],
		"quotes": ["error", "double"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		indent: ["error", "tab"],
		"vue/script-indent": [
			"error", "tab",
			{
				baseIndent: 1
			}
		],
		"comma-spacing": ["error", { before: false, after: true }],
		"template-curly-spacing": ["error", "always"]
	},
	parserOptions: {
		parser: "@typescript-eslint/parser"
	},
	overrides: [
		{
			files: ["*.vue"],
			rules: {
				indent: "off"
			}
		}
	]
};
