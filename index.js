'use strict';

var LinkedList = require('linkedlist');

//bits chosen from common characters in unicode
var bits = 16;//number of bits in the buzhash number
var validBitMask = (1<<bits)-1;//the bitmask of the valid range

module.exports = class RollingStringHash{

  constructor(string){
    this.hash = 0;
    this.length = 0;
    this.list = new LinkedList();

    if (string){
      this.addRight(string);
    }
  }

  addRight(str){
    for (var i = 0; i < str.length; i++){
      this.list.push(str[i]);
      this.hash = shift(this.hash)^str.charCodeAt(i);
      this.length++;
    }
  }

  //shift right and then add charCode
  addLeft(str){
    for (var i = str.length-1; i >= 0; i--){
      this.list.unshift(str[i]);
      this.hash = this.hash^shift(str.charCodeAt(i), this.length);
      this.length++;
    }
  }

  removeRight(x){
    if (x === undefined){
      x = 1;
    }
    var removed = '';
    for (var i = 0; i < x; i++){
      if (this.length > 0){
        this.length--;
        var char = this.list.pop();
        this.hash = shift(this.hash^char.charCodeAt(0), -1);
        removed = char + removed;
      }
    }
    return removed;
  }

  removeLeft(x){
    if (x === undefined){
      x = 1;
    }
    var removed = '';
    for (var i = 0; i < x; i++){
      if (this.length > 0){
        this.length--;
        var char = this.list.shift();
        this.hash = this.hash^shift(char.charCodeAt(0), this.length);
        removed += char;
      }
    }
    return removed;
  }

  getLength(){
    return this.length;
  }

  getHash(){
    return this.hash;
  }

  getString(){
    this.list.resetCursor();
    var result = '';
    while (this.list.next()){
      result += this.list.current;
    }
    return result;
  }

  equals(other){
    if (other && other instanceof RollingStringHash){
      return this.hash === other.hash;
    }
    return false;
  }

};

function mod(num, m){
  var r = num%m;
  if (r < 0)
  {
      r += m;
  }
  return r;
}

function shift(num, k){
  if (k === undefined){
    k = 1;
  }
  k = mod(k, bits);
  //rotate left
  num *= Math.pow(2, k);//shift to left k times
  var rolloverBits = Math.floor(num/Math.pow(2, bits));//bits in places greater than 16
  num = num & validBitMask;//removes all bits over place 16
  num = num | rolloverBits;//add the extra bits to the beginning
  return num;
}
