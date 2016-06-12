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
  });
});
