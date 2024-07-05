//CHARACTERS

function Game_Personaje() {
    this.initialize.apply(this, arguments);
}

Game_Personaje.prototype.initialize = function() {
    this.initMembers();
};

Game_Personaje.prototype.initMembers = function() {
    this.id = 0;
    this.name = "";
    this.nivelCercania = 0;
};

addPersonaje = function(id, name){
    var char = new Game_Personaje();
    char.id = id;
    char.name = name;
    char.nivelCercania = 0;
    $gameActors.actor(1)._pjs.push(char);
}

changeCercania = function(id, valor){
    $gameActors.actor(1)._pjs[id].nivelCercania += valor;
}

charAdded = function(name){
    var added = false;
    for (var i = 0; i < $gameActors.actor(1)._pjs.length; ++i){
        added = $gameActors.actor(1)._pjs[i].name == name;
        if (added) break;
    }
    return added;
}

getCharIndex = function(name){
    var ind = -1;
    for (var i = 0; i < $gameActors.actor(1)._pjs.length; ++i){
        if ($gameActors.actor(1)._pjs[i].name == name) ind = i;
    }
    return ind;
}

