// eslint configuring
// see http://eslint.cn/docs/user-guide/configuring
module.exports = {
    root: true,
    parser: 'babel-eslint', // 解析器
    parserOptions: {
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    // https://github.com/feross/eslint-config-standard
    extends: 'standard',
    // This ESLint plugin extracts and lints scripts from HTML files.
    // Only script tags with no type attribute or with a type containing text/javascript will be linted.
    // see https://github.com/greggman/eslint-plugin-html
    plugins: [
        'html'
    ],
    // add your custom rules here
    // http://eslint.cn/docs/rules/
    rules: {
        'indent': ['warn', 4],
        'eol-last': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
