function Game_PokeGuesser() {
    this.initialize.apply(this, arguments);
}


Game_PokeGuesser.prototype.initialize = function() {
    this.initMembers();
};

Game_PokeGuesser.prototype.initMembers = function() {
    
    this._type = "???";
    this._type2 = "???";
    this._pokedexNum1 = 1;
    this._pokedexNum2 = 801;
    this._discartedTypes = [];
    this._name = "???";
    this._evoState = "?";
    this._nEvolutions = "?";
    this._abilites = ["???"];
    this._ps = [1, 255];
    this._attack = [1, 255];
    this._defense = [1, 255];
    this._spattack = [1, 255];
    this._spdefense = [1, 255];
    this._speed = [1, 255];
    this._weight = ["0.1", "999.9"];
    this._height = ["0.1", "20"];
    this._eggGroups = ["???"];

};

Game_PokeGuesser.prototype.getName = function(){
    return this._name;
}

Game_PokeGuesser.prototype.getTypes = function(){
    var language = $gameVariables.value(14);
    text = "";
    if (language == 0){
        text = "Types: ";
    } else {
        text = "Tipos: ";
    }
    if (this._type2 == "NoType"){
        text += this._type;
    } else {
        text += this._type + ", " + this._type2;
    }
    return text;
}

Game_PokeGuesser.prototype.getPokeNum = function(){
    if (this._pokedexNum1 == this._pokedexNum2){
        return this._pokedexNum1;
    } else {
        return this._pokedexNum1 + "-" + this._pokedexNum2;
    }
}

Game_PokeGuesser.prototype.getHeight = function(){
    var language = $gameVariables.value(14);
    text = "";
    if (language == 0){
        text = "Height: ";
    } else {
        text = "Altura: ";
    }
    return text + this._height[0] + "-" + this._height[1] + " m";
}

Game_PokeGuesser.prototype.getWeight = function(){
    var language = $gameVariables.value(14);
    text = "";
    if (language == 0){
        text = "Weight: ";
    } else {
        text = "Peso: ";
    }
    return text + this._weight[0] + "-" + this._weight[1] + " kg";
}


Game_PokeGuesser.prototype.getPokeEvos = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        return "Evolution " + this._evoState + "/" + this._nEvolutions;
    } else return "Evolución " + this._evoState + "/" + this._nEvolutions; 

}

Game_PokeGuesser.prototype.getAbilities = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        text = "Ability(ies): ";
    } else text = "Habilidad(es): ";
    
    for (var i = 0; i < this._abilites.length; ++i){
        text += this._abilites[i];
        if (i < (this._abilites.length -1)) text + ", "; 
    }

    return text;
}

Game_PokeGuesser.prototype.getEggGroups = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        text = "Egg group(s): ";
    } else text = "Grupo(s) huevo: ";
    
    for (var i = 0; i < this._eggGroups.length; ++i){
        text += this._eggGroups[i];
        if (i < (this._eggGroups.length -1)) text + ", "; 
    }

    return text;
}

Game_PokeGuesser.prototype.getPS = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        text = "HP: ";
    } else text = "PS: ";
    if (this._ps[0] == this._ps[1]){
        return text + this._ps[0];
    } else {
        return text + this._ps[0] + "-" + this._ps[1];
    }
}

Game_PokeGuesser.prototype.getAttack = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        text = "Attack: ";
    } else text = "Ataque: ";
    if (this._attack[0] == this._attack[1]){
        return text + this._attack[0];
    } else {
        return text + this._attack[0] + "-" + this._attack[1];
    }
}

Game_PokeGuesser.prototype.getDefense = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        text = "Defense: ";
    } else text = "Defensa: ";
    if (this._defense[0] == this._defense[1]){
        return text + this._defense[0];
    } else {
        return text + this._defense[0] + "-" + this._defense[1];
    }
}

Game_PokeGuesser.prototype.getSpattack = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        text = "Sp. Attack: ";
    } else text = "Ataque Esp.: ";
    if (this._spattack[0] == this._spattack[1]){
        return text + this._spattack[0];
    } else {
        return text + this._spattack[0] + "-" + this._spattack[1];
    }
}

Game_PokeGuesser.prototype.getSpdefense = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        text = "Sp. Defense: ";
    } else text = "Defensa Esp.: ";
    if (this._spdefense[0] == this._spdefense[1]){
        return text + this._spdefense[0];
    } else {
        return text + this._spdefense[0] + "-" + this._spdefense[1];
    }
}

Game_PokeGuesser.prototype.getSpeed = function(){
    var language = $gameVariables.value(14);
    if (language == 0){
        text = "Speed: ";
    } else text = "Velocidad: ";
    if (this._speed[0] == this._speed[1]){
        return text + this._speed[0];
    } else {
        return text + this._speed[0] + "-" + this._speed[1];
    }
}

//MENSAJES DEL JUEGO

function PGgetMyPokeName(){
    return $dataPokemon[$gameVariables.value(144)].Name;
}

function PGgetOpponentPokeName(){
    return $gameVariables.value(141).getName()
}

function PGInfo(){
    var language = $gameVariables.value(14);
    if (language == 0){
        return "Basic info";
    } else return "Info básica"; 
}

function PGStats(){
    var language = $gameVariables.value(14);
    if (language == 0){
        return "Base stats";
    } else return "Stats base";
}

function PGMoves(){
    var language = $gameVariables.value(14);
    if (language == 0){
        return "Can learn";
    } else return "Puede aprender";
}

function PGMyTypes(){
    var language = $gameVariables.value(14);
    var poke = $dataPokemon[$gameVariables.value(144)];
    text = "";
    if (language == 0){
        text = "Types: " + $dataTablaTipos[poke.Types[0]].Name;
    } else {
        text = "Tipos: " + $dataTablaTipos[poke.Types[0]].Nombre;
    }
    if (poke.Types.length > 1){
        if (language == 0) text += ", " + $dataTablaTipos[poke.Types[1]].Name;
        else text += ", " + $dataTablaTipos[poke.Types[1]].Nombre;
    }
    return text;
}

function PGMyAbilities(){
    var language = $gameVariables.value(14);
    var poke = $dataPokemon[$gameVariables.value(144)];
    text = "";
    if (language == 0){
        text = "Ability(ies): " + $dataAbilities[poke.Ability[0]].name;
    } else {
        text = "Habilidad(es): " + $dataAbilities[poke.Ability[0]].nombre;
    }
    if (poke.Ability.length > 1){
        if (language == 0) text += ", " + $dataAbilities[poke.Ability[1]].name;
        else text += ", " + $dataAbilities[poke.Ability[1]].nombre;
    }
    return text;
}

function getPokeNEvos(pokeId){
    var evos = 1;
    if ($dataPokemon[pokeId].EvolutionPoke != 0) {
        evos += 1;
        if ($dataPokemon[$dataPokemon[pokeId].EvolutionPoke].EvolutionPoke != 0) ++evos;
    }
    for (i = 1; i < 802 && evos < 3; ++i){
        if ($dataPokemon[i].EvolutionPoke == pokeId) {
            ++evos;
           i=0;
        }
    }
    return evos;
}

function getPokeEtapa(pokeId, nevos){
    if ($dataPokemon[pokeId].EvolutionPoke == 0) return nevos;
    var hasPre = false;
    for (var i = 1; i < 802 && hasPre; ++i){
        hasPre = ($dataPokemon[i].EvolutionPoke == pokeId);
    }
    if (hasPre) return 2;
    else return 1;
}

function PGMyEvolutions(){
    var language = $gameVariables.value(14);
    var nevos = getPokeNEvos($gameVariables.value(144));
    var etapa = getPokeEtapa($gameVariables.value(144), nevos);
    text = "";
    if (language == 0){
        text = "Evolution: " + etapa + "/" + nevos;
    } else {
        text = "Evolución: " + etapa + "/" + nevos;
    }
 
    return text;   
}