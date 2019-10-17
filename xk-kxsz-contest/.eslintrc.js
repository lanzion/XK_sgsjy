// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  globals: {
    '$': false,
    'WebUploader': false,
    'uploader': false,
    'WxLogin': false
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    // 'import/extensions': ['error', 'always', {
    //   'js': 'never',
    //   'vue': 'never'
    // }],
    'global-require': 0,
    'import/extensions': 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'arrow-body-style': 0,
    'indent': ['error', 4, {'SwitchCase': 1}],
    'linebreak-style': [0, 'windows'],
    'default-case': 0,
    'func-names': 0,
    'guard-for-in': 0,
    'max-len': [0, 200],
    'no-underscore-dangle': 0,
    'no-shadow': ['error', { 'allow': ['state'] }],
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': ['error', { 'props': false }],
    'no-plusplus': 0,
    'no-useless-return': 0,
    'no-continue': 0,
    'no-console': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'no-mutable-exports': 0,
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true
    }],
    'no-await-in-loop': 0,
    'no-mixed-operators': 0,
    'object-shorthand': 0,
    'prefer-arrow-callback': 0,
    'prefer-template': 0,
    'prefer-rest-params': 0,
    'array-bracket-spacing': ['error', 'never'],
    'no-unused-vars': 0,
    'prefer-spread': 0, // 首选展开运算
    'no-multi-assign': 0
  }
}
