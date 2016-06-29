
var verdict = require('verdict.js');
var compile = verdict.parse;

module.exports = Mana;

/**
 * Mana tree constructor
 */
function Mana() {
  if (!(this instanceof Mana)) {
    return new Mana();
  }
  // TODO: Auto id?
  this.id = null;
  this.children = [];
  this.ruleset = null;
  this.value = null;
}

/**
 * Evaluate ruleset on this node and return value
 */
Mana.prototype.evaluate = function evaluate(context) {
  if (!this.ruleset) {
    return true;
  }
  return this.ruleset.test(context);
};

/**
 * Execute the rulesets on all nodes and return the corresponding matches
 */
Mana.prototype.exec = function exec(context) {
  var results = [];

  (function iterate(node) {
    if (!node.evaluate(context)) {
      return;
    }
    if (node.isLeaf()) {
      results.push(node);
      return;
    }
    for (var i = 0, len = node.children.length; i < len; i++) {
      iterate(node.children[i]);
    }
  }(this));

  return results;
};

/**
 * Check if current tree is a leaf (no children)
 */
Mana.prototype.isLeaf = function isLeaf() {
  return !this.children.length;
};

/**
 * Apply given function to all nodes in the tree
 */
Mana.prototype.forEach =
Mana.prototype.each =
function forEach(fn) {
  var i = null;
  var len = null;

  fn(this);

  for (i = 0, len = this.children.length; i < len; ++i) {
    this.children[i].forEach(fn);
  }

  return this;
};

/**
 * Retrieve all leaves from the tree and return
 */
Mana.prototype.leaves = function leaves() {
  var res = [];

  this.forEach(function(node) {
    if (node.isLeaf()) {
      res.push(node);
    }
  });

  return res;
};

/**
 * Parse a plain JSON object into a Mana tree
 */
Mana.prototype.parse =
Mana.parse =
function parse(json) {
  var mana;
  var i;
  var len;

  if (!json) {
    throw new Error('JSON object cannot be empty');
  }

  // Simple little check to make sure these exist
  json.children = json.children || [];
  json.ruleset = json.ruleset || null;

  // Create an populate the new Mana tree
  mana = new Mana();
  mana.id = json.id;
  mana.value = json.value;

  if (json.ruleset) {
    mana.ruleset = compile(json.ruleset);
  }

  for (i = 0, len = json.children.length; i < len; ++i) {
    mana.children.push(Mana.parse(json.children[i]));
  }

  return mana;
};
