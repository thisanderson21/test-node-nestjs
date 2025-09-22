// {
//   "parser": "@typescript-eslint/parser",
//   "plugins": [
//     "@typescript-eslint"
//   ],
//   "parserOptions": {
//     "ecmaVersion": 6,
//     "sourceType": "module",
//     "ecmaFeatures": {
//       "modules": true
//     }
//   },
//   "rules": {
//     //Possible Errors
//     "no-console": [
//       "warn",
//       {
//         "allow": [
//           "warn",
//           "error"
//         ]
//       }
//     ],
//     "no-constant-condition": "error",
//     "no-debugger": "warn",
//     "no-dupe-args": "error",
//     "no-dupe-keys": "error",
//     "no-duplicate-case": "error",
//     "no-empty": [
//       "warn",
//       {
//         "allowEmptyCatch": true
//       }
//     ],
//     "no-ex-assign": "error",
//     "no-extra-boolean-cast": "error",
//     "no-extra-semi": "error",
//     "no-inner-declarations": "error",
//     "no-irregular-whitespace": "error",
//     "no-mixed-spaces-and-tabs": [
//       "error",
//       "smart-tabs"
//     ],
//     "no-obj-calls": "error",
//     "no-sparse-arrays": "error",
//     "use-isnan": "error",
//     "valid-typeof": "error",
//     //Best Practices
//     "accessor-pairs": "error",
//     "block-scoped-var": "error",
//     "curly": "error",
//     "default-case": "error",
//     "dot-location": [
//       "error",
//       "property"
//     ],
//     "eqeqeq": [
//       "error",
//       "always"
//     ],
//     // "no-alert": "warn",
//     "no-else-return": "error",
//     "no-empty-function": [
//       "warn",
//       {
//         "allow": [
//           "constructors"
//         ]
//       }
//     ],
//     "no-extra-bind": "error",
//     "no-eval": "error",
//     "no-floating-decimal": "error",
//     "no-implicit-coercion": "error",
//     "no-implied-eval": "error",
//     "no-lone-blocks": "error",
//     "no-multi-spaces": "error",
//     "no-multi-str": "error",
//     "no-new-func": "error",
//     "no-new-wrappers": "error",
//     "no-octal-escape": "error",
//     "no-octal": "error",
//     "no-param-reassign": "error",
//     "no-redeclare": "error",
//     "no-return-assign": "error",
//     "no-self-compare": "error",
//     "no-throw-literal": "error",
//     "no-useless-concat": "error",
//     // "no-useless-escape": "error",
//     "vars-on-top": "error",
//     //Variables
//     "no-shadow": "off",
//     "@typescript-eslint/no-shadow": "error",
//     "no-undef-init": "warn",
//     // "no-unused-vars": "warn",
//     "no-use-before-define": "off",
//     //Stylish
//     "array-bracket-spacing": [
//       "warn",
//       "never"
//     ],
//     "block-spacing": "warn",
//     "brace-style": [
//       "warn",
//       "1tbs"
//     ],
//     "comma-dangle": [
//       "warn",
//       "never"
//     ],
//     "comma-spacing": [
//       "warn",
//       {
//         "before": false,
//         "after": true
//       }
//     ],
//     "comma-style": [
//       "warn",
//       "last"
//     ],
//     "computed-property-spacing": [
//       "warn",
//       "never"
//     ],
//     "consistent-this": [
//       "warn",
//       "self"
//     ],
//     "eol-last": [
//       "warn",
//       "always"
//     ],
//     "func-call-spacing": [
//       "warn",
//       "never"
//     ],
//     "func-name-matching": [
//       "warn",
//       "always"
//     ],
//     "indent": [
//       "warn",
//       2,
//       {
//         "SwitchCase": 1
//       }
//     ],
//     "key-spacing": [
//       "warn",
//       {
//         "beforeColon": false
//       }
//     ],
//     "keyword-spacing": [
//       "warn",
//       {
//         "before": true,
//         "after": true
//       }
//     ],
//     "line-comment-position": [
//       "warn",
//       {
//         "position": "above"
//       }
//     ],
//     "lines-around-comment": [
//       "warn",
//       {
//         "beforeBlockComment": true,
//         "beforeLineComment": true,
//         "allowBlockStart": true,
//         "allowObjectStart": true,
//         "allowArrayStart": true
//       }
//     ],
//     "lines-around-directive": [
//       "warn",
//       {
//         "before": "never",
//         "after": "always"
//       }
//     ],
//     "max-depth": [
//       "warn",
//       5
//     ],
//     "max-len": [
//       "warn",
//       200,
//       {
//         "ignoreRegExpLiterals": true
//       }
//     ],
//     "max-lines": [
//       "warn",
//       {
//         "max": 700,
//         "skipComments": true,
//         "skipBlankLines": true
//       }
//     ],
//     "max-statements-per-line": [
//       "warn",
//       {
//         "max": 1
//       }
//     ],
//     "max-statements": [
//       "warn",
//       105
//     ],
//     "new-cap": [
//       "warn",
//       {
//         "newIsCap": true,
//         "capIsNew": false,
//         "properties": false,
//         "capIsNewExceptions": [
//           "Input",
//           "Output",
//           "ViewChild"
//         ]
//       }
//     ],
//     "new-parens": "warn",
//     "newline-after-var": [
//       "warn",
//       "always"
//     ],
//     "newline-before-return": "warn",
//     "no-inline-comments": "warn",
//     "no-lonely-if": "warn",
//     "no-mixed-operators": "warn",
//     "no-multi-assign": "warn",
//     "no-multiple-empty-lines": [
//       "warn",
//       {
//         "max": 1
//       }
//     ],
//     "no-negated-condition": "warn",
//     "no-new-object": "warn",
//     "no-trailing-spaces": "warn",
//     "no-whitespace-before-property": "warn",
//     "object-curly-newline": [
//       "warn",
//       {
//         "minProperties": 2
//       }
//     ],
//     "object-property-newline": "warn",
//     "one-var-declaration-per-line": [
//       "warn",
//       "always"
//     ],
//     "operator-linebreak": [
//       "warn",
//       "before"
//     ],
//     "padded-blocks": [
//       "warn",
//       "never"
//     ],
//     "quotes": [
//       "warn",
//       "single"
//     ],
//     "semi-spacing": [
//       "warn",
//       {
//         "before": false,
//         "after": true
//       }
//     ],
//     "semi": [
//       "warn",
//       "always"
//     ],
//     "sort-vars": [
//       "warn",
//       {
//         "ignoreCase": true
//       }
//     ],
//     "space-before-blocks": [
//       "warn",
//       {
//         "functions": "always",
//         "keywords": "always",
//         "classes": "always"
//       }
//     ],
//     "space-before-function-paren": [
//       "warn",
//       {
//         "anonymous": "always",
//         "named": "never",
//         "asyncArrow": "always"
//       }
//     ],
//     "space-in-parens": [
//       "warn",
//       "never"
//     ],
//     "space-infix-ops": "warn",
//     "space-unary-ops": "warn",
//     "spaced-comment": [
//       "warn",
//       "always"
//     ],
//     "wrap-regex": "warn",
//     "arrow-parens": [
//       "warn",
//       "as-needed"
//     ],
//     "arrow-spacing": [
//       "warn",
//       {
//         "before": true,
//         "after": true
//       }
//     ],
//     "constructor-super": "warn",
//     "generator-star-spacing": [
//       "warn",
//       {
//         "before": true,
//         "after": true
//       }
//     ],
//     "no-class-assign": "warn",
//     "no-confusing-arrow": [
//       "warn",
//       {
//         "allowParens": true
//       }
//     ],
//     "no-const-assign": "warn",
//     "no-dupe-class-members": "warn",
//     "no-duplicate-imports": "warn",
//     "no-new-symbol": "warn",
//     "no-this-before-super": "warn",
//     "no-useless-computed-key": "warn",
//     "no-useless-rename": "warn",
//     "no-var": "warn",
//     "prefer-const": "error",
//     "rest-spread-spacing": [
//       "warn",
//       "never"
//     ],
//     "sort-imports": [
//       "warn",
//       {
//         "ignoreCase": true,
//         "allowSeparatedGroups": true
//       }
//     ],
//     "symbol-description": "warn",
//     "template-curly-spacing": [
//       "warn",
//       "always"
//     ],
//     "yield-star-spacing": [
//       "warn",
//       "both"
//     ]
//   }
// }