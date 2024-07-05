//=============================================================================
// Agu Plugins Core
// AP_Core.js
//=============================================================================

var Imported = Imported || {};
Imported.AP_Core = true;

var Agu = Agu || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 This plugin contains some basic functions needed in most Agu plugins.
 * @author Agustin
 *
 * @help
 * ============================================================================
 * Changelog
 * ============================================================================
 * Version 1.00:
 *   - Created plugin with functions: indexesOf, grab, clean, and isAlpha.
 */
//=============================================================================

//=============================================================================
// Array-Based Functions :)
//=============================================================================

//Array.indexesOf(letter)
//Allows you to get more results from .indexOf()
//Ex: [1,3,5,1,2].indexesOf(1) would return [0, 4] which are the points in the array where "1" shows.
Array.prototype.indexesOf = function(letter) { 
    var array = this;
    this.result = [];
    for(var i = 0; i < array.length; i++) {
        if(array[i]===letter) {
            this.result.push(i);
        }
    }
    return this.result;
};

//Look at the String.grab, it's pretty much the same thing but array-based.
Array.prototype.grab = function(start, end) {
	var array = this;
	this.result = [];

	var startLocation = array.indexOf(start) + 1;
	var endLocation = array.slice(startLocation, stringArray.length).indexOf(end) + 1;

	this.result = array.slice(startLocation, endLocation);
	return this.result;
};

//Array.clean(deleteValue)
//Deletes whatever value from the array.
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

//=============================================================================
// String-Based Functions :)
//=============================================================================

//String.grab(start, end);
//Allows you to grab a part of a string in between to start and end points.
//Ex: "{Hey} 1 2 3".grab("{","}") would return "Hey".
String.prototype.grab = function(start, end) {
    var string = this;
    var stringArray = string.split("");

	var startLocation = stringArray.indexOf(start) + 1;
	var endLocation = stringArray.slice(startLocation, stringArray.length).indexOf(end) + 1;

    this.result = string.substring(startLocation, endLocation);
	return this.result;
};

String.prototype.isAlpha = function() {
	if(name.search(/[^A-Za-z\s]/) != -1) {
		return false
	}
	else {
		return true;
	}
};