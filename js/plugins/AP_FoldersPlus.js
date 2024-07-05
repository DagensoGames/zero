//=============================================================================
// Agu Plugins - Folders Plus
// AP_FoldersPlus.js
//=============================================================================

var Imported = Imported || {};
Imported.AP_FoldersPlus = true;

var Agu = Agu || {};
Agu.FoldersPlus = Agu.FoldersPlus || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 This plugin lets you have multiple folders for actors and enemies.
 * @author Agustin
 * 
 * @param --Notetag Setup--
 * @default 
 *
 * @param SV Actor Notetag
 * @desc The notetag used for naming an actor's SV battler image.
 * Default: Sideview Battler (no spaces)
 * @default Sideview Battler
 *
 * @param Character Notetag
 * @desc The notetag used for naming an event's or actor's character image.
 * Default: Character  (with a space to leave room for the index!)
 * @default Character 
 *
 * @param Enemy Notetag
 * @desc The notetag used for naming an enemy's battler image. (The static SV or FV image)
 * Default: Battler (no spaces on this either)
 * @default Battler
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * In order to have your enemies be loaded in a different folder, put the prefix
 * listed in the prefix parameter before the name of the image. For example, if 
 * my prefix is "[SV] " and my normal image name is "Slime", my new image name  
 * would be "[SV] Slime". Notice how the space isn't ignored. :) Then you would 
 * put it in the enemy folder listed in the parameters. Each prefix has a 
 * corresponding image folder.
 *
 * But what if you have one of those actors with that "$" or the "!"? You can 
 * just add that onto the prefix and it should work fine! :)
 *
 * If you are using this with Yanfly's Animated SV Enemies, just put this plugin
 * under it.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * If you are going to use a custom folder, you need to use a notetag to name
 * the image file of the enemy or actor...
 *
 * The basic structure of the notetag is: "<x: filename>" where x is the notetag
 * name which can be changed in the parameters. But for characters, the notetags
 * work like this "<xi: filename>" where x is the notetag name and i is the index.
 * You can put a space in the notetag name like the default does. The default
 * notetag name is "Character ". Harold's character notetag would be done like
 * so: "<Character 0: Actor1>". Hopefully, this clears everything up, if not
 * ask questions on the rpgmakerforums thread.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * For now just look at the rpgmakerforums thread, I'm sorry :(
 *
 * -Agustin
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * Version 1.03:
 * - Added face support and ChangeActorFace.
 * Version 1.02a:
 * - Fixed a bug that made loading sideview actors not work. :(
 * Version 1.02:
 * - Made prefixes optional and put those prefixes in another plugin so you can choose :).
 * - Added support for spacing in eval plugin commands, also made eval need return statements.
 * - Changed eval symbol into "@".
 * - Made the version numbers different because.
 * Version 1.01:
 * - Added the first two plugin commands... first of many :(
 * - Now requires Agu Core for global functions.
 * Version 1.00:
 * - Finished plugin.
*/
if(Imported.AP_Core) {
//=============================================================================
// Putting parameters in organized arrays :) and just parameters in general
//=============================================================================

Agu.Parameters = PluginManager.parameters('AP_FoldersPlus');
Agu.Param = Agu.Param || {};

Agu.Param.FPSVANote = Agu.Parameters['SV Actor Notetag']; //and some plain stuff
Agu.Param.FPANote = Agu.Parameters['Character Notetag'];
Agu.Param.FPENote = Agu.Parameters['Enemy Notetag'];

//=============================================================================
// Notetag Processing a la Yanfly
//=============================================================================
Agu.FoldersPlus.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Agu.FoldersPlus.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Agu._loaded_AP_FoldersPlus) {
  	this.processActorFPNotes($dataActors); //loading actor notes
  	this.processEnemyFPNotes($dataEnemies); //loading enemy notes
    Agu._loaded_AP_FoldersPlus = true;
  }
	return true;
};

DataManager.processActorFPNotes = function(group) { //Actor note function
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/); //splits up the notetags into lines :)
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];

			var notetag = Agu.Param.FPSVANote; //SV Battler Notetag
			var reg = new RegExp("<(?:"+notetag+"):[ ](.*)>","i");
			if (line.match(reg)) {
				obj.battlerName = String(RegExp.$1);
			}

			var notetag = Agu.Param.FPANote; //Character Notetag
			var reg = new RegExp("<(?:"+notetag+"(\\d)):[ ](.*)>","i");
			if (line.match(reg)) {
				obj.characterIndex = String(RegExp.$1);
				obj.characterName = String(RegExp.$2);
			}

			var notetag = Agu.Param.FPANote; //Character Notetag
			var reg = new RegExp("<(?:"+"Face "+"(\\d)):[ ](.*)>","i");
			if (line.match(reg)) {
				obj.faceIndex = String(RegExp.$1);
				obj.faceName = String(RegExp.$2);
			}

			var notetag = Agu.Param.FPANote; //Path Notetag
			var reg = new RegExp("<(?:"+"Path"+"):[ ](.*)>","i");
			if (line.match(reg)) {
				obj.path = String(RegExp.$1);
			}

			var notetag = Agu.Param.FPANote; //Battler Path Notetag
			var reg = new RegExp("<(?:"+"Battler Path"+"):[ ](.*)>","i");
			if (line.match(reg)) {
				obj.battlerPath = String(RegExp.$1);
			}

			var notetag = Agu.Param.FPANote; //Battler Path Notetag
			var reg = new RegExp("<(?:"+"Face Path"+"):[ ](.*)>","i");
			if (line.match(reg)) {
				obj.facePath = String(RegExp.$1);
			}
		}
	}
};

DataManager.processEnemyFPNotes = function(group) { //Enemy note function
	for(var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		for(var i = 0; i < notedata.length; i++) {
			var line = notedata[i];

			var notetag = Agu.Param.FPENote; //Enemy Image Notetag
			var reg = new RegExp("<(?:"+notetag+"):[ ](.*)>","i");
			if (line.match(reg)) {
				obj.battlerName = String(RegExp.$1);
			}

			var notetag = Agu.Param.FPENote; //Enemy Image Notetag
			var reg = new RegExp("<(?:"+"Path"+"):[ ](.*)>","i");
			if (line.match(reg)) {
				obj.path = String(RegExp.$1);
			}

		}
	}
}

//=============================================================================
// Plugin Commands :)
//=============================================================================

Agu.FoldersPlus.GameInterpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	Agu.FoldersPlus.GameInterpreter_PluginCommand.call(this, command, args);
	switch(command) {
		case "ChangeActorGraphic": //====================================================================================
			var id, filename, index;
			var argString = args.join(" ");
			if(args.length==3) {
				id = args[0];
				filename = args[1];
				index = args[2];
			}

			else if(args.length>3) { //If any spaces are used, checks the args in a different way...
				var array = argString.split('"'); //Splits the plugin args.
				array.clean(" "); array.clean("");
				
				array = array.clean(undefined); //Removes any null parts to the arrays.
				for(var i = 0; i < array.length; i++) {
					array[i] = array[i].trim(); //Trims away extra whitespaces.
				}

				array = array.join(" ").split('@'); //Splits the plugin args for evals.
				array.clean(" "); array.clean("");
				
				array = array.clean(undefined);
				for(var i = 0; i < array.length; i++) {
					array[i] = array[i].trim();
				}

				var originalId = String(args[0]);
				if(originalId.substring(0,1)=='"') { array[0] = '"'+array[0]+'"'; }
				if(originalId.substring(0,1)=='@') { array[0] = '@'+array[0]+'@'; }

				for(var i = 0; i < array.length; i++) {
					if(array[i].substring(0,1)!='@'&&array[i].substring(0,1)!='"') {
						array[i] = array[i].split(" ");
						array[i+1] = array[i][1];
						array[i] = array[i][0];
						i++;
					}
					if(typeof array[i]==Array) {

					}
				}

				id = array[0];
				filename = array[1];
				index = Number(array[2]);
			}

			if(id.substring(0,1)=="@") { 
				var expression = id.grab("@","@"); console.log(new Function(expression));
				id = new Function(expression)(); //Checks if the id is an eval, then changes the id. 
			}
			else if(id.substring(0,1)=='"') { //Checks if the id is a name.
				var name = id.grab('"','"');
				for(var i = 1; i < $dataActors.length; i++) {
					if($dataActors[i].name==name) {
						id = i; //Turns the id into the corresponding id for the name.
						break;
					}
				} 
			}
			if(filename.substring(0,1)=='"') { //Makes sure that the filename has no "". (at least at the beginning)
				filename = filename.grab('"','"');
			}
			if(typeof id == String) {
				id = id.grab('"','"');
			} 

			$gameActors._data[id]._characterName = filename;
			$gameActors._data[id]._characterIndex = index;
			$gamePlayer.refresh();
			break;

		case "ChangeActorBattler": //======================================================================================
			var id, filename, index;
			var argString = args.join(" ");
			if(args.length==3) {
				id = args[0];
				filename = args[1];
				index = args[2];
			}

			else if(args.length>3) { //If any spaces are used, checks the args in a different way...
				var array = argString.split('"'); //Splits the plugin args.
				array.clean(" "); array.clean("");
				
				array = array.clean(undefined); //Removes any null parts to the arrays.
				for(var i = 0; i < array.length; i++) {
					array[i] = array[i].trim(); //Trims away extra whitespaces.
				}

				array = array.join(" ").split('@'); //Splits the plugin args for evals.
				array.clean(" "); array.clean("");
				
				array = array.clean(undefined);
				for(var i = 0; i < array.length; i++) {
					array[i] = array[i].trim();
				}

				var originalId = String(args[0]);
				if(originalId.substring(0,1)=='"') { array[0] = '"'+array[0]+'"'; }
				if(originalId.substring(0,1)=='@') { array[0] = '@'+array[0]+'@'; }

				for(var i = 0; i < array.length; i++) {
					if(array[i].substring(0,1)!='@'&&array[i].substring(0,1)!='"') {
						array[i] = array[i].split(" ");
						array[i+1] = array[i][1];
						array[i] = array[i][0];
						i++;
					}
					if(typeof array[i]==Array) {

					}
				}

				id = array[0];
				filename = array[1];
				index = Number(array[2]);
			}

			if(id.substring(0,1)=="@") { 
				var expression = id.grab("@","@"); console.log(new Function(expression));
				id = new Function(expression)(); //Checks if the id is an eval, then changes the id. 
			}
			else if(id.substring(0,1)=='"') { //Checks if the id is a name.
				var name = id.grab('"','"');
				for(var i = 1; i < $dataActors.length; i++) {
					if($dataActors[i].name==name) {
						id = i; //Turns the id into the corresponding id for the name.
						break;
					}
				} 
			}
			if(filename.substring(0,1)=='"') { //Makes sure that the filename has no "". (at least at the beginning)
				filename = filename.grab('"','"');
			}
			if(typeof id == String) {
				id = id.grab('"','"');
			}

			$gameActors._data[id]._battlerName = filename;
			$gamePlayer.refresh();
			break;

		case "ChangeActorFace": //====================================================================================
			var id, filename, index;
			var argString = args.join(" ");
			if(args.length==3) {
				id = args[0];
				filename = args[1];
				index = args[2];
			}

			else if(args.length>3) { //If any spaces are used, checks the args in a different way...
				var array = argString.split('"'); //Splits the plugin args.
				array.clean(" "); array.clean("");
				
				array = array.clean(undefined); //Removes any null parts to the arrays.
				for(var i = 0; i < array.length; i++) {
					array[i] = array[i].trim(); //Trims away extra whitespaces.
				}

				array = array.join(" ").split('@'); //Splits the plugin args for evals.
				array.clean(" "); array.clean("");
				
				array = array.clean(undefined);
				for(var i = 0; i < array.length; i++) {
					array[i] = array[i].trim();
				}

				var originalId = String(args[0]);
				if(originalId.substring(0,1)=='"') { array[0] = '"'+array[0]+'"'; }
				if(originalId.substring(0,1)=='@') { array[0] = '@'+array[0]+'@'; }

				for(var i = 0; i < array.length; i++) {
					if(array[i].substring(0,1)!='@'&&array[i].substring(0,1)!='"') {
						array[i] = array[i].split(" ");
						array[i+1] = array[i][1];
						array[i] = array[i][0];
						i++;
					}
					if(typeof array[i]==Array) {

					}
				}

				id = array[0];
				filename = array[1];
				index = Number(array[2]);
			}

			if(id.substring(0,1)=="@") { 
				var expression = id.grab("@","@"); console.log(new Function(expression));
				id = new Function(expression)(); //Checks if the id is an eval, then changes the id. 
			}
			else if(id.substring(0,1)=='"') { //Checks if the id is a name.
				var name = id.grab('"','"');
				for(var i = 1; i < $dataActors.length; i++) {
					if($dataActors[i].name==name) {
						id = i; //Turns the id into the corresponding id for the name.
						break;
					}
				} 
			}
			if(filename.substring(0,1)=='"') { //Makes sure that the filename has no "". (at least at the beginning)
				filename = filename.grab('"','"');
			}
			if(typeof id == String) {
				id = id.grab('"','"');
			} 

			$gameActors._data[id]._faceName = filename;
			$gameActors._data[id]._faceIndex = index;
			$gamePlayer.refresh();
			break;
	}
}

//=============================================================================
// ImageManager stuff, actually pretty simple.
//=============================================================================
ImageManager.loadSvEnemy = function(filename, hue) {
	var path = 'img/sv_enemies/';
	for(var i = 1; i < $dataEnemies.length; i++) {
		var obj = $dataEnemies[i];
		if(filename==obj.battlerName) {
			path = obj.path || path;
			break;
		}
	}
	return this.loadBitmap(path, filename, hue, true);
};

ImageManager.loadEnemy = function(filename, hue) {
	var path = 'img/enemies/';
	for(var i = 1; i < $dataEnemies.length; i++) {
		var obj = $dataEnemies[i];
		if(filename==obj.battlerName) {
			path = obj.path || path;
			break;
		}
	}
	return this.loadBitmap(path, filename, hue, true);
};

ImageManager.loadCharacter = function(filename, hue) {
	var path = 'img/characters/';
	for(var i = 1; i < $dataActors.length; i++) {
		var obj = $dataActors[i];
		if(filename==obj.characterName) {
			path = obj.path || path;
			break;
		}
	}
	return this.loadBitmap(path, filename, hue, true);
};

ImageManager.loadSvActor = function(filename, hue) {
	var path = 'img/sv_actors/';
	for(var i = 1; i < $dataActors.length; i++) {
		var obj = $dataActors[i];
		if(filename==obj.battlerName) {
			path = obj.battlerPath || path;
		}
	}
	if(Imported.YEP_X_AnimatedSVEnemies) {
		for(var i = 1; i < $dataEnemies.length; i++) {
			var obj = $dataEnemies[i];
			for(var n = 0; n < obj.sideviewBattler.length; n++) {
				if(filename==obj.sideviewBattler[n]) {
					path = obj.path || path;
				}
			}
		}
	}
	return this.loadBitmap(path, filename, hue, true);
};

ImageManager.loadFace = function(filename, hue) {
	var path = 'img/faces/';
	for(var i = 1; i < $dataActors.length; i++) {
		var obj = $dataActors[i];
		if(filename==obj.faceName) {
			path = obj.facePath || path;
		}
	}
	return this.loadBitmap(path, filename, hue, true);
}

//=============================================================================
//Sound Manager stuff, this is slightly weirder, cuz some notetags SUCK (like animation sounds)
//=============================================================================

//COMING SOON (hey me remember AudioManager.createBuffer)

//=============================================================================
// End of File
//=============================================================================

}