module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'airbnb',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	rules: {
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'import/no-absolute-path': 0,
		'no-plusplus': 0,
		'prefer-spread': 0,
		'prefer-rest-params': 0,
		'class-methods-use-this': 0,
		'consistent-return': 0,
		'prefer-template': 0,
		'no-bitwise': 0,
		'no-underscore-dangle': [
			'warn',
			{
				allowAfterThis: true,
				allow: ['__', '_read', '_write', '__dirname', '__filename']
			}
		],
		'max-classes-per-file': 0,
		'func-names': 0,
		'no-param-reassign': 0,
		'no-prototype-builtins': 0,
		'no-restricted-syntax': [
			'error',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement'
		],
		'no-new': 0,
		'no-await-in-loop': 0,
		'no-continue': 0,
		'no-ex-assign': 0,
		'default-param-last': 0,
		'no-restricted-exports': 0,
		'import/no-unresolved': 0,
		'import/prefer-default-export': 0,
		'import/extensions': 0,
		'import/no-named-as-default-member': 0,
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: ['vite.config.js']
			}
		],
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/label-has-associated-control': 0,
		'jsx-a11y/role-supports-aria-props': 0,
		'jsx-a11y/control-has-associated-label': 0,
		'jsx-a11y/no-noninteractive-element-interactions': 0,
		'react/prop-types': 0,
		'react/no-array-index-key': 0,
		'react/react-in-jsx-scope': 0,
		'react/destructuring-assignment': 0,
		'react/forbid-prop-types': 0,
		'react/require-default-props': 0,
		'react/jsx-props-no-spreading': 0,
		'react/jsx-no-bind': 0
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@', './src'],
					['', './public'],
					[
						'react-compare-slider',
						'./node_modules/react-compare-slider/dist/index.mjs'
					]
				],
				extensions: ['.js', '.jsx', '.json', 'svg']
			}
		}
	},
	overrides: [
		{
			files: ['./*.js'],
			env: {
				node: true
			}
		}
	]
};
