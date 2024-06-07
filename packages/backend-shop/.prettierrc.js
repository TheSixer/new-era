const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "printWidth": 160,
  "proseWrap": "preserve",
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none"
};
