'use strict';

var LinkedList = require('linkedlist');

//bits chosen from common characters in unicode
var bits = 16;//number of bits in the buzhash number
var rollover = 1<<bits;//the rollover bit after a left shift

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
    if (!x){
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
    if (!x){
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
  var r = num.mod(m);
  if (r.lt(0))
  {
      r = r.add(m);
  }
  return r;
}

function shift(num, k){
  if (k === undefined){
    k = 1;
  }
  for (var x = 0; x < Math.abs(k); x++){
    if (k < 0){
      //rotate right
      if (num & 1){
        num = num | 1<<bits;
      }
      num = Math.floor(num/2);
    }
    else{
      //rotate left
      num *= 2;//shift to left
      if (num & rollover){//a bit has rolled over
        num = num | 1;//set the first bit to 1
        num = num & (rollover-1);//remove the last bit
      }
    }
  }
  return num;
}
