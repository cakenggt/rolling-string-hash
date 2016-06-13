'use strict';

var LinkedList = require('linkedlist');
var BigInteger = require('big-integer');

var a = BigInteger(48271);
var n = BigInteger(Math.pow(2, 31)-1);
var ai = xgcd(a, n)[0];

module.exports = class RollingStringHash{

  constructor(string){
    //hash = c1a^(0)+c2a^(1)+c3a^(2)+...+cka(k)
    this.hash = BigInteger();
    //Found in C++11's minstd_rand entry of https://en.wikipedia.org/wiki/Linear_congruential_generator

    this.length = 0;
    this.list = new LinkedList();

    if (string){
      this.addRight(string);
    }
  }
  /* shifting to right requires multiplying by a
    shifting to left requires dividing by a*/

  //adding right will add a^length*charCode
  addRight(str){
    for (var i = 0; i < str.length; i++){
      this.list.push(str[i]);
      this.hash = this.hash.plus(a.pow(this.length).multiply(str.charCodeAt(i)));
      this.hash = mod(this.hash, n);
      this.length++;
    }
  }

  //shift right and then add charCode
  addLeft(str){
    for (var i = str.length-1; i >= 0; i--){
      this.list.unshift(str[i]);
      this.hash = this.hash.multiply(a);
      this.hash = this.hash.plus(str.charCodeAt(i));
      this.hash = mod(this.hash, n);
      this.length++;
    }
  }

  removeRight(x){
    if (!x){
      x = 1;
    }
    var removed = '';
    for (var i = 0; i < x; i++){
      if (this.length > 0){
        this.length--;
        var char = this.list.pop();
        this.hash = this.hash.minus(a.pow(this.length).multiply(char.charCodeAt(0)));
        this.hash = mod(this.hash, n);
        removed = char + removed;
      }
    }
    return removed;
  }

  removeLeft(x){
    if (!x){
      x = 1;
    }
    var removed = '';
    for (var i = 0; i < x; i++){
      if (this.length > 0){
        this.length--;
        var char = this.list.shift();
        this.hash = this.hash.minus(char.charCodeAt(0));
        this.hash = mod(this.hash, n);
        this.hash = this.hash.multiply(ai);
        this.hash = mod(this.hash, n);
        removed += char;
      }
    }
    return removed;
  }

  getLength(){
    return this.length;
  }

  getHash(){
    return this.hash.toJSNumber();
  }

  getString(){
    var result = '';
    while (this.list.next()){
      result += this.list.current;
    }
    this.list.resetCursor();
    return result;
  }

  equals(other){
    if (other && other instanceof RollingStringHash){
      return this.hash.eq(other.hash);
    }
    return false;
  }

};

function mod(num, m){
  var r = num.mod(m);
  if (r.lt(0))
  {
      r = r.add(m);
  }
  return r;
}

//found in http://stackoverflow.com/a/26986636/3528026
function xgcd(a, b) {

  if (b.equals(0)) {
    return [BigInteger(1), BigInteger(0), a];
  }

  var temp = xgcd(b, a.mod(b));
  var x = temp[0];
  var y = temp[1];
  var d = temp[2];
  return [y, x.minus(y.multiply(a.divide(b))), d];
}
