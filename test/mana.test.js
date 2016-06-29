var should = require('should');
var mana = require('..');

/*global describe*/
/*global it*/

describe('Mana tree tests', function() {
  var treeJson = {
    id: 1,
    children: [
      {
        id: 2,
        children: [],
        ruleset: {
          composite: 'all',
          rules: [
            {
              path: 'name.first',
              comparator: 'eq',
              value: 'Guy'
            },
            {
              path: 'name.last',
              comparator: 'eq',
              value: 'Dude'
            }
          ]
        }
      },
      {
        id: 3,
        children: [],
        ruleset: {
          composite: 'all',
          rules: [{
            path: 'email',
            comparator: 'eq',
            value: 'wat@wut.com'
          }]
        }
      }
    ],
    ruleset: null
  };

  it('should create a tree correctly', function(done) {
    var tree = mana.parse(treeJson);
    tree.should.be.instanceof(mana);
    tree.should.have.property('id', 1);
    tree.should.have.property('children');
    tree.children.should.have.length(2);
    tree.children[0].should.have.property('id', 2);
    tree.children[0].should.have.property('children');
    tree.children[0].children.should.have.length(0);
    tree.children[0].should.have.property('ruleset');
    tree.children[0].ruleset.should.have.property('composite', 'all');
    tree.children[0].ruleset.should.have.property('rules');
    tree.children[0].ruleset.rules.should.have.length(2);
    tree.children[0].ruleset.rules[0].should.have.property(
      'path', 'name.first');
    tree.children[0].ruleset.rules[0].should.have.property('comparator', 'eq');
    tree.children[0].ruleset.rules[0].should.have.property('value', 'Guy');
    tree.children[0].ruleset.rules[1].should.have.property('path', 'name.last');
    tree.children[0].ruleset.rules[1].should.have.property('comparator', 'eq');
    tree.children[0].ruleset.rules[1].should.have.property('value', 'Dude');
    tree.children[1].should.have.property('id', 3);
    tree.children[1].should.have.property('children');
    tree.children[1].children.should.have.length(0);
    tree.children[1].should.have.property('ruleset');
    tree.children[1].ruleset.should.have.property('composite', 'all');
    tree.children[1].ruleset.should.have.property('rules');
    tree.children[1].ruleset.rules.should.have.length(1);
    tree.children[1].ruleset.rules[0].should.have.property('path', 'email');
    tree.children[1].ruleset.rules[0].should.have.property('comparator', 'eq');
    tree.children[1].ruleset.rules[0].should.have.property(
      'value', 'wat@wut.com');
    tree.should.have.property('ruleset');
    return done();
  });

  it('should test a leaf node correctly', function(done) {
    var tree = mana.parse(treeJson);
    tree.isLeaf().should.equal(false);
    tree.children[0].isLeaf().should.equal(true);
    tree.children[1].isLeaf().should.equal(true);
    return done();
  });

  it('should evaluate a node correctly', function(done) {
    var tree = mana.parse(treeJson);
    var context = {
      'email': 'wat@wut.com',
      'name': {
        'first': 'invalid',
        'last': 'Dude'
      }
    };
    tree.evaluate(context).should.equal(true);
    tree.children[0].evaluate(context).should.equal(false);
    tree.children[1].evaluate(context).should.equal(true);
    return done();
  });

  it('should exec a tree correctly', function(done) {
    var tree = mana.parse(treeJson);
    var context = {
      'email': 'wat@wut.com',
      'name': {
        'first': 'invalid',
        'last': 'Dude'
      }
    };
    var nodes = tree.exec(context);
    nodes.should.have.length(1);
    nodes[0].should.have.property('id', 3);
    return done();
  });
});
