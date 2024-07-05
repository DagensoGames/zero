/*:

@plugindesc v0.03 Allows you to create clones of actors
@author Silva
@target MZ
@url https://forums.rpgmakerweb.com/index.php?threads/clone-actors.126263/

@help
<-------------------------------------------------------------------------->
< Description
<-------------------------------------------------------------------------->

This plugin allows you to add and remove clones of existing actors via
script or plugin command.

When cloning actors via plugin command you can choose to add them to the
party immediately. You also have the option to store the new actor's
ID to a variable. This will allow you to manipulate the cloned actor by
using event commands that reference the actor by variable.

Keep in mind that if you have saved a clone's actor ID to a variable, the
variable will not be reset when the clone is removed.

Clones are created based on the database version of the actor, not the actor
as they exist in the game. Clones are only added to $gameActors; $dataActors
will remain unaltered.

<-------------------------------------------------------------------------->
< Function Calls
<-------------------------------------------------------------------------->

- Game_Actor -

isClone()
Returns true if the actor is a clone.

originalId()
Returns the id of the actor that this actor is cloned from.

- Game_Actors -

cloneActor(actorId)
Creates a clone of the actor whose ID is actorId. Returns the new cloned
actor's ID.

deleteClone(actorId)
Deletes the clone whose actor ID is actorId. No effect on original actors.

<-------------------------------------------------------------------------->
< Version History
<-------------------------------------------------------------------------->

0.03 - Added methods for deleting clones.

0.02 - Slight change to cloning functions for compatibility with
       SilvaActorShop.

0.01 - Initial

<-------------------------------------------------------------------------->


@command clone
@text Clone Actor
@desc Creates a clone of the specified actor

@arg actorId
@text Actor ID
@type actor
@desc Actor ID to clone

@arg add
@text Add to Party
@type boolean
@desc ON = Adds the actor to the party
OFF = Actor will not be added to party

@arg variable
@text Variable
@type variable
@desc Store the new actor's ID to this game variable for referencing later.

@command deleteId
@text Delete Clone (ID)
@desc Deletes a cloned actor using its actor ID. No effect if used on original actors.

@arg actorId
@text Actor ID
@desc Actor ID of the cloned actor. Can use numbers or js eval.

@command deleteVariable
@text Delete Clone (Variable)
@desc Deletes a cloned actor using a variable. No effect if used on original actors.

@arg variable
@text Variable
@type variable
@desc Variable that contains the clone's actor ID.
*/

var Silva = Silva || {};
Silva.Clone = Silva.Clone || {};
Silva.Clone.version = 0.03;

var Imported = Imported || {};
Imported.SilvaCloneActor = true;

($ => {

    //PluginManager

    PluginManager.registerCommand("SilvaCloneActor", "clone", args => {
        const id = $gameActors.cloneActor(parseInt(args.actorId));
        if (args.add == "true") {
            $gameParty.addActor(id);
        }
        if (args.variable) {
            $gameVariables.setValue(parseInt(args.variable), id);
        }
    });

    PluginManager.registerCommand("SilvaCloneActor", "deleteId", args => {
        const id = eval(args.actorId);
        $gameActors.deleteClone(id);
    });

    PluginManager.registerCommand("SilvaCloneActor", "deleteVariable", args => {
        const id = $gameVariables.value(parseInt(args.variable));
        $gameActors.deleteClone(id);
    });

    //Game_Actor

    $.Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        this._originalId = actorId;
        $.Game_Actor_setup.call(this, actorId);
    };

    $.Game_Actor_actor = Game_Actor.prototype.actor;
    Game_Actor.prototype.actor = function() {
        if (this.isClone()) {
            return $dataActors[this._originalId];
        }
        return $.Game_Actor_actor.call(this);
    };

    Game_Actor.prototype.isClone = function() {
        return this.originalId() !== this.actorId();
    };

    Game_Actor.prototype.originalId = function() {
        return this._originalId;
    };

    //Game_Actors

    $.Game_Actors_actor = Game_Actors.prototype.actor;
    Game_Actors.prototype.actor = function(actorId) {
        const actor = $.Game_Actors_actor.call(this, actorId);
        if (actor) {
            return actor;
        } else if (this._data[actorId]) {
            return this._data[actorId];
        }
        return null;
    };

    Game_Actors.prototype.cloneActor = function(actorId) {
        const actor = new Game_Actor(actorId);
        return this.setupClone(actor);
    };

    Game_Actors.prototype.setupClone = function(actor) {
        const id = this.getCloneId();
        actor._actorId = id;
        $gameActors._data[id] = actor;
        return id;
    };

    Game_Actors.prototype.getCloneId = function() {
        const index = this._data.indexOf(null, $dataActors.length);
        if (index === -1) {
            if (this._data.length < $dataActors.length) {
                return $dataActors.length;
            } else {
                return this._data.length;
            }
        }
        return index;
    };

    Game_Actors.prototype.deleteClone = function(actorId) {
        const actor = this.actor(actorId);
        if (actor && actor.isClone()) {
            $gameParty.removeActor(actorId);
            this._data[actorId] = null;
        }
    };

    //Game_Party

    Game_Party.prototype.removeInvalidMembers = function() {
        this.allMembers().forEach(member => {
            if (!$dataActors[member.originalId()]) {
                this._actors.remove(member.actorId());
            }
        });
    };

    //Sprite_Actor

    $.Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
    Sprite_Actor.prototype.setBattler = function(battler) {
        if (!battler && this._actor) {
            this._battlerName = "";
        }
        $.Sprite_Actor_setBattler.call(this, battler);
    };

})(Silva.Clone)