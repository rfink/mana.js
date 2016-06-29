mana.js
=======

Creator of decision trees.

Mana was written to break out the nested decision tree logic from
[verdict.js](https://github.com/rfink/verdict.js).  It uses verdict.js
as the rule evaluator.  This allows "nodes" on the decision tree to contain
"children", which implicitly inherit the rules of the parent node.

Installation
============

```
npm install mana.js
```

Usage
=====

```
var mana = require('mana.js');
var context = {
  var: {
    one: 1
  }
};
var payload = {
  id: 'root',
  children: [
    {
      id: 'Level 1',
      ruleset: {
        composite: 'all',
        rules: [{
          path: 'var.one',
          comparator: 'eq',
          value: 1
        }]
      },
      children: [
        {
          id: 'Level 1.1',
          composite: 'all',
          ruleset: [{
            path: '',
            comparator: 'eq',
            value: ''
          }],
          value: 'I am 1.1'
        },
        {
          id: 'Level 1.2',
          composite: 'any',
          ruleset: [{
            path: '',
            comparator: 'eq',
            value: ''
          }],
          value: 'I am 1.2'
        }
      ]
    }
  ]
};
var tree = mana.parse(payload);
var node = mana.evaluate(context);
console.log(node && node.value);
```

License
==========

MIT license, whatever
