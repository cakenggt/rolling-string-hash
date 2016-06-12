# rolling-string-hash

**rolling-string-hash** is a node library that lets you use a rolling hash
on strings. Using a rolling hash allows you to do things such as string
search in O(n) time.

## Installation
If you are using node, you can install it with [npm](https://npmjs.org/)

`npm install rolling-string-hash`

Then include it in your project

`var RollingStringHash = require('rolling-string-hash');`

## Usage
Rolling String Hashes are best utilized when keeping the number of characters hashed constant, and moving the hash block forwards or backwards on the string.
### Constructor
To create a new Rolling String Hash, you can initialize it with no parameters or a string parameter which will represent the hash's initial contents.

`var rsh = new RollingStringHash('hello');`
### Methods
#### `addRight(string)`
Adds a string to the right side of the hash.
#### `addLeft(string)`
Adds a string to the left side of the hash. Keep in mind, adding a string of more than one character to the left side will reverse the added string, since it is added character-by-character.
#### `removeRight(number = 1)`
Removes a number of characters from the right side of the hash. If no number is specified, it removes one character.
#### `removeLeft(number = 1)`
Removes a number of characters from the left side of the hash. If no number is specified, it removes one character.
#### `getHash()`
Returns the JavaScript number representation of the hash value.
#### `equals(object)`
Used to see if two Rolling String Hashes are equal.
