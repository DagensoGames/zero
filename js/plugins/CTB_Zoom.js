/*=============================================================================
 * CTB Zoom
 * By CT_Bolt
 * CTB_Zoom.js
 * Version: 0.92
 * Terms of Use:
 *   Must purchase a licence to use.
 *   No filesharing permited unless prior agreement made with author.
 *
 *  Copyright [2020] [N. Giem] (Aka. CT_Bolt)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
/*=============================================================================*/
var CTB = CTB || {}; CTB.Zoom  = CTB.Zoom || {};
var Imported = Imported || {}; Imported["CT_Bolt Zoom"] = 0.92;
//=============================================================================

/*~struct~point:
 *
 * @param X
 * @text X
 * @desc X
 * Default:
 * @default
 *
 * @param Y
 * @text Y
 * @desc Y
 * Default:
 * @default
 *
 */

/*:
 *
 * @plugindesc CT_Bolt's Zoom Plugin v0.92
 * @author CT_Bolt
 *
 * @param ---Main---
 * @text Main Settings
 *
 * @param Retain Zoom
 * @parent ---Main---
 * @type boolean
 * @desc Retain the Zoom when transfering maps?
 * Note: This is an eval statement.
 * @default true
 *
 * @param Default
 * @parent ---Main---
 * @type struct<point>
 * @desc Default Zoom (Default is [1, 1])
 * @default {"X":"1","Y":"1"}
 *
 * @param ---Picture---
 * @text Picture Settings
 *
 * @param Zoom Picture Tag
 * @parent ---Picture---
 * @desc Place in filename to determine if the picture gets zoomed.
 * Note: This is not case sensitive
 * @default [zoom]
 *
 * @param Zoom Pictures
 * @parent ---Picture---
 * @desc Determines if pictures with zoom tag are zoomed.
 * ex. !$gameSwitches.value(1) // zoomed when switch 1 is off
 * @default true
 *
 * @param ---Commands---
 * @text Command Settings
 *
 * @param Zoom Command
 * @parent ---Commands---
 * @desc The command used for Zoom
 * @default zoom
 *
 * @param Start Command
 * @parent ---Commands---
 * @desc The command used to start the Zoom
 * @default start
 *
 * @param Duration Command
 * @parent ---Commands---
 * @desc The command used for the Duration of Zoom
 * @default duration
 *
 * @param Player Command
 * @parent ---Commands---
 * @desc The command used to center on Player
 * @default player
 *
 * @param Event Command
 * @parent ---Commands---
 * @desc The command used to Center on Event
 * @default event
 *
 * @param Reset Command
 * @parent ---Commands---
 * @desc The command used to Reset the Zoom
 * @default reset
 *
 * @help
 * CT_Bolt's Zoom
 * Version 0.92
 * CT_Bolt
 *
 * ***************** Description **********************
 * Adds proper zooming to map
 *
 * **************** Compatibility *********************
 *
 *
 * **************** Plugin Commands *******************
 * *** START ZOOM ***
 * If using the default parameter values...
 *   Any of the following could be used to start a zoom
 *     zoom start x y duration n
 *     start zoom x y duration n
 *     zoomIt StArT x y duration n
 *
 *   Examples:
 *     start zoom 1.2
 *     startMy zoomyFunTime 1.2 1.5 DURATION 60
 *     zoom start 1.0 1.5
 *     zoom start 2.0 duration 120
 *
 *   Notes:
 *     1. The first two commands don't have to be in order
 *        (eg. can be "zoom start" or "start zoom")
 *     2. The first two commands don't even have to be exact.
*         As long as the command is in it anywhere it'll work.
 *        (eg. can be "ZoomyMcBoomyFunTime startGoDoItNow" or "sTarT zOOm", etc.)
 *     3. All Commands are not case sensitive
 *        (eg. can be "ZOOM start" or "sTarT zOOm", etc.)
 *     4. Commands can be adjusted via parameters in the Plugin Manager
 *        (eg. could be set to "Set MapZoom 1.0 Time 120" or "Begin TheZoom 2.0 1.5 For 60", etc.)
 *
 *
 * ***************** Extra Features *******************
 *
 * *** PICTURES *** 
 *  Can be zoomed to match along with the map, add "[zoom]" in the filename.
 *  (ex. "img/pictures/picture1[zoom].png")
 *
 *  Notes:
 *    1. The Zoom Tag can be changed in the parameters via the plugin manager.
 *    2. The Picture Zoom can be toggled via an eval condition in the parameters via plugin manager.
 *      ex. $gameSwitches.value(1)
 *          This would set switch #1 to toggle whether pictures with the tag will get zoomed.
 *
 *
 * History Log:
 * Version 0.1  Alpha Build (12/14/2019)
 * Version 0.2  Added many extra features (12/15/2019)
 * Version 0.3  Added yanfly patches, more features (12/15/2019)
 * Version 0.31 Bugfix setting X & Y didn't work... now it does (12/16/2019)
 * Version 0.4  Fixed the extra pixel issue when zooming to certain values (1/1/2020)
 * Version 0.5  Scrolling!!! Yay! (1/2/2020)
 * Version 0.6  Bugfix (1/3/2020)
 * Version 0.7  Added Features (1/5/2020)
 * Version 0.8  Much better :) (1/7/2020)
 * Version 0.9  Code cleaned up a few new features (2/4/2020)
 * Version 0.92 Major bugfix (2/4/2020)
 *
 */

//=============================================================================
//=============================================================================
"use strict";
(function ($) {
  function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $.Param = getPluginParameters();
  if ($.Param["Retain Zoom"].toLowerCase() === 'false') $.Param["Retain Zoom"] = false;
  if ($.Param["Zoom Pictures"].toLowerCase() === 'false' || $.Param["Zoom Pictures"] === '') $.Param["Zoom Pictures"] = false;
  $.Param["Default"] = $.Param["Default"] ? JSON.parse($.Param["Default"]) : {X:1,Y:1};

  // New
  Game_System.prototype.getArgValue = function(string) {if (string[0].toLowerCase() === "v") {var varId = Number(string.replace("v",""));return $gameVariables.value(varId);} else {return Number(string);};};

  // New
  Game_System.prototype.camControl = function(args) {
    var key = args[0].toLowerCase();
    var speed = 800;
    switch (key) {
      case "player":
	var target = $gamePlayer;
	if (args[1]) speed = this.getArgValue(args[1]);
	break;
      case "event":
	var eId = this.getArgValue(args[1])
	var target = $gameMap.event(eId);
	if (args[2]) speed = this.getArgValue(args[2]);
	break;
      case "disable":
        $gameMap.camTarget = $gamePlayer;
		$gameMap.camNorm = true;
		$gameMap.savedCamTarget = null;
  	return;
      default:
        var px = this.getArgValue(args[0]);
  	var py = this.getArgValue(args[1]);
  	if (args[2]) speed = this.getArgValue(args[2]);
  	var target = {
  		x: px,
  		y: py,
  		_realX: px,
  		_realY: py,
  		screenX: Game_CharacterBase.prototype.screenX,
  		screenY: function() {var th = $gameMap.tileHeight();return Math.round(this.scrolledY() * th + th);},
                scrolledX: Game_CharacterBase.prototype.scrolledX,
                scrolledY: Game_CharacterBase.prototype.scrolledY
  	};
    };
    $gameMap.camTargetSet(target,speed);
    $gameMap.savedCamTarget = args;
  };
  //=============================================================================
  //=============================================================================

  //=============================================================================
  // Game_Map
  //=============================================================================
  // New
  Game_Map.prototype.canvasToMapX = function(x) {
    var v = [(this.tileWidth() * this._zoomData.scale.x)];
     v[1] = this.displayX() * v[0];
     v[2] = Math.floor((v[1] + x) / v[0]);
     return this.roundX(v[2]);
  };

  // New
  Game_Map.prototype.canvasToMapY = function(y) {
    var v = [(this.tileHeight() * this._zoomData.scale.y)];
    v[1] = this.displayY() * v[0];
    v[2] = Math.floor((v[1] + y) / v[0]);
    return this.roundY(v[2]);
  };

  // Alias
  var _gm_i_ctb_zoom = Game_Map.prototype.initialize; Game_Map.prototype.initialize = function(){
    _gm_i_ctb_zoom.call(this); this._zoomData = this._zoomData || {}; this._zoomData.center = null; this._zoomData.destination = this._zoomData.destination || new PIXI.Point(0, 0); this._zoomData.duration = this._zoomData.duration || 0; this._zoomData.scale = this._zoomData.scale || new PIXI.Point(eval($.Param["Default"].X), eval($.Param["Default"].Y)); this._zoomData.time = 0;
  };


  // Alias
  var _gm_s_ctb_zoom = Game_Map.prototype.setup; Game_Map.prototype.setup = function(id){
    this.zoom = this.zoom || new PIXI.Point(1,1);
    if (!this.camNorm) {
      this.camTargetSet($gamePlayer,800);
      this.savedCamTarget = ["PLAYER"];
    };

    _gm_s_ctb_zoom.call(this, id);

    if (!eval($.Param["Retain Zoom"])){this._zoomData.scale = new PIXI.Point(eval($.Param["Default"].X), eval($.Param["Default"].Y));}
  };

  // New
  Game_Map.prototype.startZoom = function(x, y, d) {d = d || 60; d = Math.round(d <= 0 ? 1 : d) * 1.0; this._zoomData = this._zoomData || {}; this._zoomData.destination.x = this._zoomData.destination.y = x; if (y) {this._zoomData.destination.y = y;} this._zoomData.speed = new PIXI.Point((this._zoomData.destination.x - this._zoomData.scale.x) / d, (this._zoomData.destination.y - this._zoomData.scale.y) / d); this._zoomData.duration = d; this._zoomData.time = 0;};

  // New
  Game_Map.prototype.setZoomCenter = function(x, y, speed) {
    speed = speed || null;

    if (speed){
      this.zoomData.newCenterSpeed = speed;
      this.zoomData.newCenterTime = 0;

      if (y) {
        this.zoomData.newCenter = {_realX:x, _realY:y};
      }else{
        if (x){
          this.zoomData.newCenter = x;
        }else{
          this.zoomData.newCenter = null;
        }
      }
    }else{
      if (y) {
        $gameMap.zoomData.center = {_realX:x, _realY:y};
      }else{
        if (x){
          this.zoomData.center = x;
        }else{
          this.zoomData.center = $gamePlayer;
        }
      }
    }

    this.zoomData.center = this.zoomData.center || $gamePlayer
  };

  // Overwrite
  Game_Map.prototype.screenTileX = function() {return Graphics.width / this.tileWidth() / $gameMap._zoomData.scale.x;};

  // Overwrite
  Game_Map.prototype.screenTileY = function() {return Graphics.height / this.tileHeight() / $gameMap._zoomData.scale.y;};

  // Alias
  var _gm_u_ctb_zoom = Game_Map.prototype.update; Game_Map.prototype.update = function () { _gm_u_ctb_zoom.apply(this, arguments);
   if (this._zoomData.duration > this._zoomData.time) {
      this._zoomData.scale.x += this._zoomData.speed.x;
      this._zoomData.scale.y += this._zoomData.speed.y;
      this._zoomData.time++;

    } else if (this._zoomData.time > 0) {
      this._zoomData.time = 0;
      this._zoomData.duration = 0;
      this._zoomData.speed = new Point(0, 0);
    }
  };
/*
	$['Game_Event.prototype.findProperPageIndex'] = Game_Event.prototype.findProperPageIndex;
	Game_Event.prototype.findProperPageIndex = function() {
		if (this.event()){
			$['Game_Event.prototype.findProperPageIndex'].apply(this, arguments);
		}
		return -1;
	};
*/

  Game_Map.prototype.camTargetSet = function(target,speed) {
      this.camTarget = target;
      this.camNorm = false;
      this.camSpeed = speed || 200;
      
      this._zoomData = this._zoomData || {}; this._zoomData.scale = this._zoomData.scale || {x:1, y: 1};
      this.camSpeed = {x: this.camSpeed * this._zoomData.scale.x, y: this.camSpeed * this._zoomData.scale.y}
  };

  var _gm_us_zoom_patch = Game_Map.prototype.updateScroll;
  Game_Map.prototype.updateScroll = function() {
        if (this.camNorm) return _gm_us_zoom_patch.call(this);

        this._scrollRest = 0;

        var cw = (Graphics.boxWidth / 2);
        var ch = (Graphics.boxHeight / 2);

        this._zoomData = this._zoomData || {};
        this._zoomData.scale = this._zoomData.scale || {x:1, y: 1};

        var ex = this._zoomData.scale.x*this.zoom.x, ey = this._zoomData.scale.y*this.zoom.y;

        var screenX = Math.floor(this.camTarget.screenX()*ex);
        var screenY = Math.floor(this.camTarget.screenY()*ey);

        if (this.camSpeed.x && this.camSpeed.y){
          var cx = this.camSpeed.x;
          var cy = this.camSpeed.y;
          var sx = Math.abs(screenX - cw) / cx;
          var sy = Math.abs(screenY - ch) / cy;
        }else{
          var cx = this.camSpeed;
          var sx = Math.abs(screenX - cw) / cx;
          var sy = Math.abs(screenY - ch) / cx;
        }

        if (sx < 0.005) {sx = 0};
        if (sy < 0.005) {sy = 0};

        var x_pos = screenX;
        var y_pos = screenY;

        if (y_pos < ch) {
          this.scrollUp(sy);
        } else if (y_pos > ch) {
          this.scrollDown(sy);
        };

        if (x_pos < cw) {
          this.scrollLeft(sx);
        } else if (x_pos > cw) {
          this.scrollRight(sx);
        };
  };

  Game_Map.prototype.setNewCamTarget = function(v){
    this._hasLanded = false;

    v[1] = String(eval(v[1]));
    v[2] = String(eval(v[2]));
    $gameSystem.camControl(v);
  }

  // Jitter Fix
  Game_Map.prototype.displayX = function() {return Math.round(this._displayX * ($gameMap.tileWidth())) / ($gameMap.tileWidth())};
  Game_Map.prototype.displayY = function() {return Math.round(this._displayY * ($gameMap.tileHeight())) / ($gameMap.tileHeight())};

  //=============================================================================
  //=============================================================================

// Alias
var _gp_c_ctb_zoom = Game_Player.prototype.center;
Game_Player.prototype.center = function(x, y) {
  if ($gameMap.camTarget == $gamePlayer || $gameMap.camNorm) {
    return _gp_c_ctb_zoom.call(this,x,y);
  };
};

  // Overwrite
  Game_Player.prototype.centerX = function() {
    $gameMap.zoom.x = $gameMap.zoom.x || 1
    $gameMap._zoomData.scale.x = $gameMap._zoomData.scale.x || 1;
    return ((Graphics.boxWidth / $gameMap.tileWidth() - (1*$gameMap.zoom.x*$gameMap._zoomData.scale.x)) / 2.0)/($gameMap.zoom.x*$gameMap._zoomData.scale.x);
  };

  // Overwrite
  Game_Player.prototype.centerY = function() {
    $gameMap.zoom.y = $gameMap.zoom.y || 1
    $gameMap._zoomData.scale.y = $gameMap._zoomData.scale.y || 1;
    return ((Graphics.boxHeight / $gameMap.tileHeight() - 1.75*$gameMap.zoom.y*$gameMap._zoomData.scale.y) / 2.0)/($gameMap.zoom.y*$gameMap._zoomData.scale.y);
  };


  //=============================================================================
  // Game_Event
  //=============================================================================
  // Clone
  Game_Event.prototype.centerX = Game_Player.prototype.centerX;

  // Clone
  Game_Event.prototype.centerY = Game_Player.prototype.centerY;

  // Clone
  Game_Event.prototype.updateScroll = Game_Player.prototype.updateScroll;
  //=============================================================================
  //=============================================================================

  //=============================================================================
  // Game_System
  //=============================================================================
  // Patch
  var _gs_getMessagePositionX_ctb_zoom = Game_System.prototype.getMessagePositionX;  
  Game_System.prototype.getMessagePositionX = function() {
	if (this._msgWindowPositionX !== 'auto'){
		if (!$gameMap._zoomData.center || $gameMap._zoomData.center === $gamePlayer || !$gameMap.camTarget || $gameMap.camTarget === $gamePlayer){
		  if (this._msgWindowPositionX === undefined) this.initMessagePosition(); return (this._msgWindowPositionX*$gameMap._zoomData.scale.x);
		}else{
		  if (SceneManager._scene instanceof Scene_Map) {var x =SceneManager._scene._spriteset.x*$gameMap.tileWidth()*$gameMap._zoomData.scale.x};
		  if (this._msgWindowPositionX === undefined) this.initMessagePosition();
		  return (this._msgWindowPositionX);
		}
	}else{
		return _gs_getMessagePositionX_ctb_zoom.call(this);		
	}
  };

  
  // Patch
  var _gs_getMessagePositionY_ctb_zoom = Game_System.prototype.getMessagePositionY;
  Game_System.prototype.getMessagePositionY = function() {
	if (this._msgWindowPositionY !== 'auto'){
		if (!$gameMap._zoomData.center || $gameMap._zoomData.center === $gamePlayer || !$gameMap.camTarget || $gameMap.camTarget === $gamePlayer){
		  if (this._msgWindowPositionY === undefined) this.initMessagePosition(); return (this._msgWindowPositionY*$gameMap._zoomData.scale.y);
		}else{
		  if (this._msgWindowPositionY === undefined) this.initMessagePosition();
		  return (this._msgWindowPositionY);
		}
	}else{
		return _gs_getMessagePositionY_ctb_zoom.call(this);
	}
  };
  
  // Patch (Remove force stay on screen from messagebox)
  Window_Message.prototype.updatePositionPlacementX = function() {
    this.x = $gameSystem.getMessagePositionX() - Math.floor(this.width * $gameSystem.getMessageAnchorX())
  };

  // Patch (Remove force stay on screen from messagebox)
  Window_Message.prototype.updatePositionPlacementY = function() {
    this.y = $gameSystem.getMessagePositionY() - Math.floor(this.height * $gameSystem.getMessageAnchorY());
  };

  // Extra (Now allows the use of script to determine EventId)
  var _wm_cmp_ctb_zoom = Window_Message.prototype.convertMessagePositions;
  Window_Message.prototype.convertMessagePositions = function(text) {
      text = text.replace(/\x1bAUTOEVENT\[(.*?)\]/gi, function() {
        if (!$gameParty.inBattle() && !this._checkingWidth) {
          this._needsMessageReset = true;
          if (String(arguments[1]) === 'this'){arguments[1] = '$gameMap._interpreter._eventId';}
          var a = String(arguments[1]).replace('this', '$gameMap._interpreter');
          this.setMessagePositionEvent(eval(arguments[1]));
          this._checkingWidth = true;
          this.getFittedMessageRows(text);
          var value = this.getFittedMessageWidth(text);
          $gameSystem._messageWidth = value;
          this._checkingWidth = false;
        }
        return '';
      }.bind(this));
      text = text.replace(/\x1bMSGEVENT\[(.*?)\]/gi, function() {
        if (!$gameParty.inBattle()) {
          this._needsMessageReset = true;
          if (String(arguments[1]) === 'this'){arguments[1] = '$gameMap._interpreter._eventId';}
          var a = String(arguments[1]).replace('this', '$gameMap._interpreter');
          this.setMessagePositionEvent(eval(arguments[1]));
        }
        return '';
      }.bind(this));
      return _wm_cmp_ctb_zoom.call(this, text);
  };

  //=============================================================================
  // Spriteset_Map
  //=============================================================================
  // Alias
  var _ss_m_cll = Spriteset_Map.prototype.createLowerLayer; Spriteset_Map.prototype.createLowerLayer = function() {_ss_m_cll.apply(this, arguments);
    $gameMap.startZoom($gameMap._zoomData.scale.x, $gameMap._zoomData.scale.y, 1);
  };

  // New
  Spriteset_Map.prototype.updateMapAnimation = function() {
    var scale = $gameMap._zoomData.scale, screen = $gameScreen;

    this.x = Math.round(-$gameMap._zoomData.scale.x * (scale.x - 1));
    this.y = Math.round(-$gameMap._zoomData.scale.y * (scale.x - 1));

    this.x += Math.round(screen.shake());

    if (this.scale.x !== scale.x || this.scale.y !== scale.y) {

      var newScale = $gameMap._zoomData.destination;
      var sw = Graphics.width / newScale.x + this._tilemap._margin * 2;
      var sh = Graphics.height / newScale.y + this._tilemap._margin * 2;

      if ((this.scale.x > newScale.x || this.scale.y > newScale.y) && !(this.width === sw && this.height === sh)) {
        if (sw > this._tilemap.width || sh > this._tilemap.height) {this._tilemap.width = sw; this._tilemap.height = sh; this._tilemap.refresh();}
      }

      this.scale = new PIXI.Point(scale.x, scale.y);
      this._pictureContainer.scale = new PIXI.Point(1.0 / scale.x,  1.0 / scale.y);
      this._weather.scale = new PIXI.Point(1.0 / scale.x,  1.0 / scale.y);
      this._parallax.move(this._parallax.x, this._parallax.y, Graphics.width / scale.x, Graphics.height / scale.y);

      var scaleCharTest = false;
      if (scaleCharTest){
        this._characterSprites.forEach(function(v){
          if (this.scale.x >= 1) v.scale.x = .5;
          if (this.scale.y >= 1) v.scale.y = .5;
        }, this)
      }
    }
  };

  // Overwrite
  Spriteset_Map.prototype.updatePosition = function() {
    this.updateMapAnimation();
  };
  //=============================================================================
  //=============================================================================

  //=============================================================================
  // Tilemap
  //=============================================================================
  // Overwrite
  Tilemap.prototype._createLayers = function() {
    var width = this._width, height = this._height, margin = this._margin;
    var tileCols = Math.ceil(width / this._tileWidth) + 1, tileRows = Math.ceil(height / this._tileHeight) + 1;
    var layerWidth = tileCols * this._tileWidth, layerHeight = tileRows * this._tileHeight;
    if (this._lowerBitmap) {this._lowerBitmap.clear(); this._lowerBitmap.resize(layerWidth, layerHeight); }else{ this._lowerBitmap = new Bitmap(layerWidth, layerHeight);}
    if (this._upperBitmap) {this._upperBitmap.clear(); this._upperBitmap.resize(layerWidth, layerHeight); }else{ this._upperBitmap = new Bitmap(layerWidth, layerHeight);}
    this._layerWidth = layerWidth; this._layerHeight = layerHeight;
    this._lowerLayer = this._lowerLayer || new Sprite();
    this._lowerLayer.removeChildren();
    this._lowerLayer.move(-margin, -margin, width, height);
    this._lowerLayer.z = 0;
    this._upperLayer = this._upperLayer || new Sprite();
    this._upperLayer.removeChildren();
    this._upperLayer.move(-margin, -margin, width, height);
    this._upperLayer.z = 4;
    for (var i = 0; i < 4; i++){this._lowerLayer.addChild(new Sprite(this._lowerBitmap)); this._upperLayer.addChild(new Sprite(this._upperBitmap));}
    this.addChild(this._lowerLayer); this.addChild(this._upperLayer);
  };
  //=============================================================================
  //=============================================================================

  //=============================================================================
  // Game_Picture
  //=============================================================================
  // Alias
  var _gp_u_ctb_zoom = Game_Picture.prototype.update; Game_Picture.prototype.update = function() {_gp_u_ctb_zoom.apply(this, arguments); if (this.useZoom()) this.updateZoom();};

  // New
  Game_Picture.prototype.updateZoom = function() {
    var oldScaleX = oldScaleX || this._scaleX, oldScaleY = oldScaleY || this._scaleY;
    if (this._duration > 0) {
      var d = this._duration;
      this._scaleX = (this._scaleX  * (d - 1) + this._targetScaleX)  / d * $gameMap._zoomData.scale.x;
      this._scaleY = (this._scaleY  * (d - 1) + this._targetScaleY)  / d * $gameMap._zoomData.scale.y;
    }else{
      this._scaleX = this._targetScaleX * $gameMap._zoomData.scale.x;
      this._scaleY = this._targetScaleY * $gameMap._zoomData.scale.y;
    }
  };

  // New
  Game_Picture.prototype.useZoom = function() {var tag = $.Param["Zoom Picture Tag"] || "[zoom]"; return eval($.Param['Zoom Pictures']) ? !!this.name().toLowerCase().includes(tag) : false;};
  //=============================================================================
  //=============================================================================

  // TODO
  var _sm_onMapLoaded_ctb_zoom_patch = Scene_Map.prototype.onMapLoaded; Scene_Map.prototype.onMapLoaded = function() {
    _sm_onMapLoaded_ctb_zoom_patch.call(this);
   if (!$gameMap.camNorm) {
     $gameMap.savedCamTarget = $gameMap.savedCamTarget || ["PLAYER"]; $gameSystem.camControl($gameMap.savedCamTarget);
   }
  };

  //=============================================================================
  // Game_Interpreter
  //=============================================================================
  // Alias
  var _gi_pc_ctb_zoom = Game_Interpreter.prototype.pluginCommand; Game_Interpreter.prototype.pluginCommand = function (command, args) {_gi_pc_ctb_zoom.call(this, command, args);
    var v = {}, a = command;
    v['zoom']      = ($.Param["Zoom Command"]      ||      "Zoom").toLowerCase();
    v['start']     = ($.Param["Start Command"]     ||     "Start").toLowerCase();
    v['center']    = ($.Param["Center Command"]    ||    "Center").toLowerCase();
    v['player']    = ($.Param["Player Command"]    ||    "Player").toLowerCase();
    v['scroll']    = ($.Param["Scroll Command"]    ||     "Scroll").toLowerCase();
    v['event']     = ($.Param["Event Command"]     ||     "Event").toLowerCase();
    v['reset']     = ($.Param["Reset Command"]     ||     "Reset").toLowerCase();
    v['duration']  = ($.Param["Duration Command"]  ||  "Duration").toLowerCase();

    for (var i = 0; i < args.length; i++){
      if (String(args[i])[0] === ',') args[i] = String(args[i]).substring(1);
      if (String(args[i])[String(args[i]).length-1] === ',') args[i] = String(args[i]).substring(0,String(args[i]).length-1);
    }

    if (args[0]) a = (a + ' ' + args[0]).toLowerCase();
    if (a.includes(v['zoom']) && a.includes(v['start'])) {
  	if (args[1]) {
  	  if (args[2]) {
     	    if (args[2].toLowerCase() === v['duration'].toLowerCase()) {
	      args[3] = args[3] || 1;
              $gameMap.startZoom(eval(args[1]) * eval($.Param["Default"].X), eval(args[1]) * eval($.Param["Default"].Y), eval(args[3]));
	    }else{
			args[3] = args[3] || '';
            if (args[3].toLowerCase() === v['duration'].toLowerCase()) {
	          args[4] = args[4] || 1;
              $gameMap.startZoom(eval(args[1]) * eval($.Param["Default"].X), eval(args[2]) * eval($.Param["Default"].Y), eval(args[4]));
            }else{
              $gameMap.startZoom(eval(args[1]) * eval($.Param["Default"].X), eval(args[2]) * eval($.Param["Default"].Y));
            }
          }
        }else{
          $gameMap.startZoom(eval(args[1]));
        }
      }
      return 'zoom started';
    }

    if (a.includes(v['zoom']) && a.includes(v['reset'])) {
      (args[1]) ? $gameMap.startZoom(eval($.Param["Default"].X), eval($.Param["Default"].Y), eval(args[1])) :  $gameMap.startZoom(eval($.Param["Default"].X), eval($.Param["Default"].Y));
      $gameMap.setZoomCenter();
      return 'zoom reset';
    }

    if (a.includes(v['zoom']) && a.includes(v['center'])) {
      // todo
      return 'zoom center';
    }

    if (a.includes(v['zoom']) && a.includes(v['scroll'])) {
      // todo
      return 'zoom scroll';
    }
  };

//***********************************************************************************************************************************************************
  //=============================================================================
  // Define Properties
  //=============================================================================
  Object.defineProperty(Game_Map.prototype, 'zoomData', {
    get: function() {
      return this._zoomData;
    },
    set: function(value) {
      this._zoomData = value;
    },
    configurable: true
  });

  //=============================================================================
  //=============================================================================

  // More Patches
  if(Imported.YEP_CoreEngine){
    Sprite.prototype.updateTransform = function() {
		PIXI.Sprite.prototype.updateTransform.call(this);
		if (this._offset) {
			  this.worldTransform.tx += this._offset.x;
			  this.worldTransform.ty += this._offset.y;
		}
    };
  }
})(CTB.Zoom);