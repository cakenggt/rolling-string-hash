'use strict';
/*jshint expr: true*/
/*jslint node: true */
/*jslint mocha: true*/

var expect = require('chai').expect;
var RollingStringHash = require('./index');

describe('functions', function(){
  it('add and remove right', function(){
    var r1 = new RollingStringHash();
    r1.addRight('hello');
    var before = r1.getHash();
    r1.addRight('o');
    r1.removeRight();
    expect(before).to.equal(r1.getHash());
  });
  it('add left', function(){
    var r1 = new RollingStringHash();
    var r2 = new RollingStringHash();
    r1.addRight('hello');
    r2.addRight('ello');
    r2.addLeft('h');
    expect(r1.equals(r2)).to.be.true;
  });
  it('add and remove left', function(){
    var r1 = new RollingStringHash();
    r1.addRight('hello');
    var before = r1.getHash();
    r1.addLeft('o');
    r1.removeLeft();
    expect(before).to.equal(r1.getHash());
  });
});
describe('strings', function(){
  it('hello simple', function(){
    var r1 = new RollingStringHash();
    var r2 = new RollingStringHash();
    r1.addRight('hello');
    r2.addRight('hello');
    expect(r1.equals(r2)).to.be.true;
  });
  it('hello complex', function(){
    var r1 = new RollingStringHash();
    var r2 = new RollingStringHash();
    r1.addRight('hello');
    r2.addRight('bhell');
    r2.removeLeft();
    r2.addRight('o');
    expect(r1.equals(r2)).to.be.true;
    expect(r1.getString()).to.equal('hello');
  });
});
describe('correct direction', function(){
  it('adding', function(){
    var r1 = new RollingStringHash();
    var r2 = new RollingStringHash("hello");
    r1.addRight('lo');
    r1.addLeft('hel');
    expect(r1.equals(r2)).to.be.true;
  });
  it('removing', function(){
    var r1 = new RollingStringHash('hello');
    expect(r1.removeRight(2)).to.equal('lo');
    expect(r1.removeLeft(3)).to.equal('hel');
  });
});
