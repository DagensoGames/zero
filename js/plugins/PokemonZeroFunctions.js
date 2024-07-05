// #BASIC FUNCTIONS

function mapaVuelo(){
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    if (x >= 45 && y >= 59) return "Puerto";
    else if (x >= 26 && y >= 59) return "Ruta 01";
    else return "Ciudad Marítima";
}

function nombreAtaque(space){
   var name = $gameParty.allMembers()[$gameVariables.value(5000)._activePkmn].skills()[space].nombre;
   if ($gameVariables.value(14) == 0) name = $gameParty.allMembers()[$gameVariables.value(5000)._activePkmn].skills()[space].name;
   return name;
}

function tipoMovimiento(space){
    if ($gameParty.allMembers()[$gameVariables.value(5000)._activePkmn].skills().length > space) return $dataSkills[$gameParty.allMembers()[$gameVariables.value(5000)._activePkmn].skills()[space].id].damage.elementId;
    else return 0;
}

function movimientoAnim1(move){
    return (move == 1 || move == 33);
}

function checkWord(word){
    var batalla = $gameVariables.value(5000);
    console.log(batalla._activePkmn);
    var graphic = "$0Battler" + $dataPokemon[$gameParty.allMembers()[batalla._activePkmn].originalId()-1].Name + " %(";
    return word.includes(graphic);
}

function checkWord2(word){
    var index = $gameVariables.value(39);
    var graphic = "$0Battler" + $dataPokemon[$gameParty.allMembers()[index].originalId()-1].Name + " %(";
    return word.includes(graphic);
}

function checkWord3(word){
    var index = $gameVariables.value(3)+1;
    var graphic = "$0Battler" + $dataPokemon[$gameParty.allMembers()[index].originalId()-1].Name + " %(";
    return word.includes(graphic);
}

function checkWord4(word){
    var batalla = $gameVariables.value(5000);
    var graphic = "$0Battler" + $dataPokemon[$gameVariables.value(90 + batalla._activeRival).id].Name + " %(";
    return word.includes(graphic);
}

function checkWord5(word){
    var id = $gameVariables.value(38);
    var graphic = "$0Battler" + $dataPokemon[$gameActors.actor(id).originalId()-1].Name + " %(";
    return word.includes(graphic);
}

getBattlerChar = function(){
    var fs = require('fs');
    if ($gameTemp.isPlaytest()) var files = fs.readdirSync('d:/RRR/Pokemon Zero/Juego/Pokemon Zero/img/characters/');
    else var files = fs.readdirSync('./www/img/characters/');
    var name = files.filter(checkWord);
    var valor = name[0];
    valor = valor.replace('.png', '');
    return valor;
}

getRivalChar = function(){
    var fs = require('fs');
    if ($gameTemp.isPlaytest()) var files = fs.readdirSync('d:/RRR/Pokemon Zero/Juego/Pokemon Zero/img/characters/');
    else var files = fs.readdirSync('./www/img/characters/');
    var name = files.filter(checkWord4);
    var valor = name[0];
    valor = valor.replace('.png', '');
    return valor;
}

getPokeMenuChar = function(){
    var fs = require('fs');
    if ($gameTemp.isPlaytest()) var files = fs.readdirSync('d:/RRR/Pokemon Zero/Juego/Pokemon Zero/img/characters/');
    else var files = fs.readdirSync('./www/img/characters/');
    var name = files.filter(checkWord2);
    var valor = name[0];
    valor = valor.replace('.png', '');
    return valor;
}

getPokeFollower = function(){
    var fs = require('fs');
    if ($gameTemp.isPlaytest()) var files = fs.readdirSync('d:/RRR/Pokemon Zero/Juego/Pokemon Zero/img/characters/');
    else var files = fs.readdirSync('./www/img/characters/');
    var name = files.filter(checkWord5);
    var valor = name[0];
    valor = valor.replace('.png', '');
    return valor;
}

pokeMenuAlt = function(){
    var fs = require('fs');
    if ($gameTemp.isPlaytest()) var files = fs.readdirSync('d:/RRR/Pokemon Zero/Juego/Pokemon Zero/img/characters/');
    else var files = fs.readdirSync('./www/img/characters/');
    for (var i = 0; i < $gameVariables.value(70); ++i){
        $gameVariables.setValue(3, i);
        var name = files.filter(checkWord3);
        var valor = name[0];
        valor = valor.replace('.png', '');
        $gameMap.event(i+3).setImage(valor, 0);
        
    }
}

horaActual = function(){
    var hora = $gameVariables.value(25);
    if (hora < 10) hora = "0" + hora;
    var minutos = $gameVariables.value(24);
    if (minutos < 10) minutos = "0" + minutos;
    var horaActual = hora + ":" + minutos;
    return horaActual;
}

wildPokeLevel = function(){
    media = $gameVariables.value(58);
    var level = media;
    if (media >= 50){
        level = 50 - (Math.randomInt(11)+5);
    } 
    else if (media >= 30){
        level -= (Math.randomInt(5)+5);
    }
    else if (media >= 20){
        level -= (Math.randomInt(4)+4);
    }
    else if (media >= 10){
        level -= (Math.randomInt(3)+3);
    }
    else {
        level -= (Math.randomInt(2)+2);
    }

    if (level <= 0) level = 1;
    return level;
}

liberarPoke = function(poke){
    $gameParty.removeActor(poke);
}

levelEvolution = function(eventId, level){
    var event = $gameMap.event(eventId);
    event.level = level;
    if (event.level >= $dataPokemon[event.pokeId].EvolutionLv && $dataPokemon[event.pokeId].EvolutionLv > 0){
        var rand = Math.randomInt(100);
        if (rand < 50){
            event.pokeId = $dataPokemon[event.pokeId].EvolutionPoke;
            if (event.level >= $dataPokemon[event.pokeId].EvolutionLv && $dataPokemon[event.pokeId].EvolutionLv > 0) levelEvolution(eventId, event.level);
        }
    }
}

Game_Actor.prototype.currentExpPoints = function(){
    var exp = this.currentExp() - this.currentLevelExp();
    return exp;
}

Game_Actor.prototype.nextLevelExpPoints = function(){
    var exp = this.nextLevelExp() - this.currentLevelExp();
    return exp;
}

Game_Actor.prototype.hasToLearnMove = function(){
    var level = this.level;
    var pokeId = this.originalId()-1;
    return $dataPokemonMoveset[pokeId].LevelMoves[level].length > 0 || $dataPokemonMoveset[pokeId].LevelMoves[level] > 0;
};

Game_Actor.prototype.learnMove = function(moveId, position){
    this.learnSkill(moveId);
    this.pp[position] = $dataSkills[moveId].mpCost;
    this.ppmax[position] = $dataSkills[moveId].mpCost;

}

Game_Actor.prototype.modifyLevel = function(level) {
    this._level = level;
    this.changeExp(this.expForLevel(level), false);
};

Game_Actor.prototype.fallAsleep = function(turnos, battler){
    if (this.hp > 0){
        battler._dormido = turnos;
        this.estado = 5;
        $gameVariables.setValue(255, 15);
    }
}

Game_Actor.prototype.getPoisoned = function(){
    if (this.estado == 0 && !this.esTipo(4) && $gameVariables.value(3) < this.hp){
        this.estado = 4;
        $gameVariables.setValue(255, 14);
    }
}

Game_Actor.prototype.getIntoxicated = function(){
    if (this.estado == 0 && !this.esTipo(4) && $gameVariables.value(3) < this.hp){
        this.estado = 6;
        $gameVariables.setValue(255, 16);
    }
}

Game_Actor.prototype.getBurned = function(){
    if (this.estado == 0 && !this.esTipo(10) && $gameVariables.value(3) < this.hp){
        this.estado = 1;
        $gameVariables.setValue(255, 11);
    }
}

Game_Actor.prototype.getFrozen = function(){
    if (this.estado == 0 && !this.esTipo(15) && $gameVariables.value(3) < this.hp){
        this.estado = 2;
        $gameVariables.setValue(255, 12);
    }
}

Game_Actor.prototype.getParalysed = function(){
    if (this.estado == 0 && $gameVariables.value(3) < this.hp){
        this.estado = 3;
        $gameVariables.setValue(255, 13);
    }
}

function changeFollower(position){
    if ($gameParty.allMembers().length > position){
        var follower = $gameVariables.value(38);
        if (follower != 0){
            $gameParty.removeGuestActor($gameVariables.value(38));
            $gameVariables.setValue(38, $gameParty.allMembers()[position].actorId());
            $gameParty.addGuestActor($gameVariables.value(38));
        }
        else{
            $gameVariables.setValue(38, $gameParty.allMembers()[position].actorId());
            $gameParty.addGuestActor($gameVariables.value(38));
        }
    }
}

function swapPokemon(index1, index2){
    var temp = $gameParty._actors[index1];
    $gameParty._actors[index1] = $gameParty._actors[index2];
    $gameParty._actors[index2] = temp;
    var equipo = [];
    var long = $gameParty._actors.length;
    if (long > 6) long = 6;
    for (var i = 1; i < long; ++i){
    equipo.push($gameParty._actors[i])
    }
    $gameVariables.setValue(666, equipo);
    $gamePlayer.refresh();
}

function teclaPulsada(){
    return (Input.isPressed("down") || Input.isPressed("left") || Input.isPressed("up") || Input.isPressed("right")) && $gamePlayer.isMovementSucceeded($gamePlayer.x, $gamePlayer.y);

}

function dash(){
    if($gamePlayer.isDashing() && teclaPulsada()){
        $gameParty.removeActor(1);
        $gameParty.addActor(1000);
    }
    else {
        $gameParty.removeActor(1000);   
        $gameParty.addActor(1);
    }
}

function createPokemon(pokeId, ivs, level){
    var pokemon = new Game_Actor(pokeId);
    pokemon.name = $dataPokemon[pokeId].Name;
    pokemon.id = pokeId;
    pokemon.modifyLevel(level);
    var pokeinfo = $dataPokemon[pokeId];

    if (pokeinfo.MaleRate == 0 && pokeinfo.FemaleRate == 0){
        pokemon._gender = 0;
    } else{
        var g = Math.randomInt(1000) + 1;
        if (g <= pokeinfo.MaleRate) pokemon._gender = 1;
        else pokemon._gender = 2;
    }

    pokemon._happiness = pokeinfo.HappinessBase; //PKMN HAPPINESS
    pokemon.forma = 0; //PKMN FORM
    pokemon._nature = Math.randomInt(24); //NATURALEZA
    pokemon._IVS = [ivs[0], 0, ivs[2], ivs[3], ivs[4], ivs[5], ivs[6]];
    pokemon._EVS =  [0, 0, 0, 0,0,0,0];
    pokemon.addParam(0, Math.floor(10 + pokemon.level/100 * pokeinfo.BaseStats[0] * 2 + pokemon.level));
    pokemon.addParam(0, -1);
    for (var i = 1; i < 7; ++i){
        pokemon.addParam(i, Math.floor((2 * pokeinfo.BaseStats[i] * pokemon.level/100 + 5) * $dataNature[pokemon._nature].Stats[i]));
        pokemon.addParam(i, -1);
    }
    for (var i = 0; i < 7; ++i){
        pokemon.addParam(i, Math.floor(pokemon.level/100 * pokemon._IVS[i]));
    }
    pokemon.item = 0;
    var lvl = pokemon.level;
    var i = lvl;
    while (i > 0 & pokemon.skills().length < 4){
        if ($dataPokemonMoveset[pokeId].LevelMoves[i].length >= 2){
            for (var j = 0; j < $dataPokemonMoveset[pokeId].LevelMoves[i].length; ++j){
                if (pokemon.skills().length < 4)pokemon.learnSkill($dataPokemonMoveset[pokeId].LevelMoves[i][j]);
            }
        }
        else if ($dataPokemonMoveset[pokeId].LevelMoves[i] != 0) pokemon.learnSkill($dataPokemonMoveset[pokeId].LevelMoves[i]);
        --i;
    }
    var PPs = [0,0,0,0];
    for (var i = 0; i < pokemon.skills().length; ++i){
        PPs[i] = pokemon.skills()[i].mpCost;
    }
    pokemon.pp = pokemon.pp = [PPs[0], PPs[1], PPs[2], PPs[3]];
    pokemon.ppmax = PPs;

    pokemon.type1 = $dataPokemon[pokeId].Types[0];
    if ($dataPokemon[pokeId].Types.length == 2) pokemon.type2 = $dataPokemon[pokeId].Types[1];
    else pokemon.type2 = 0;

    pokemon.estado = 0;
    Game_Interpreter.prototype.changeHp(pokemon, 999, false);
    return pokemon;

}

function updateStats(pokeId, pokemonId){
    var pokemon = $gameActors.actor(pokemonId);
    var pokeinfo = $dataPokemon[pokeId];
    var hp = pokemon.hp;
    for (var i = 1; i < 7; ++i){
        pokemon.setParam(i, Math.trunc((2 * pokeinfo.BaseStats[i] * pokemon.level/100 + 5) * $dataNature[pokemon._nature].Stats[i]));
    }
    for (var i = 0; i < 7; ++i){
        pokemon.addParam(i, Math.trunc(pokemon.level/100 * pokemon._IVS[i]));
    }
    hp = pokemon.hp - hp;
    Game_Interpreter.prototype.changeHp(pokemon, hp, false);
}

function addPokemon(pokeId, level){
    Game_Interpreter.prototype.pluginCommand("CopyActor", [pokeId + 1, "4"]);
    var pokemonId = $gameVariables.value(4);
    var pokemon = $gameActors.actor(pokemonId);
    var pokeinfo = $dataPokemon[pokeId];

    //PKMN Level
    pokemon.changeLevel(level, false);
    //pokemon.modifyLevel(level, false);

    //PKMN GENDER
    if (pokeinfo.MaleRate == 0 && pokeinfo.FemaleRate == 0){
        pokemon._gender = 0;
    } else{
        var g = Math.randomInt(1000) + 1;
        if (g <= pokeinfo.MaleRate) pokemon._gender = 1;
        else pokemon._gender = 2;
    }

    pokemon._happiness = pokeinfo.HappinessBase; //PKMN HAPPINESS
    pokemon.forma = 0; //PKMN FORM
    pokemon._nature = Math.randomInt(24); //NATURALEZA
    pokemon._IVS = [Math.randomInt(32), 0, Math.randomInt(32), Math.randomInt(32), Math.randomInt(32), Math.randomInt(32), Math.randomInt(32)];
    pokemon._EVS =  [0, 0, 0, 0,0,0,0];
    pokemon.addParam(0, Math.floor(10 + pokemon.level/100 * pokeinfo.BaseStats[0] * 2 + pokemon.level));
    pokemon.addParam(0, -1);
    for (var i = 1; i < 7; ++i){
        pokemon.addParam(i, Math.floor((2 * pokeinfo.BaseStats[i] * pokemon.level/100 + 5) * $dataNature[pokemon._nature].Stats[i]));
        pokemon.addParam(i, -1);
    }
    for (var i = 0; i < 7; ++i){
        pokemon.addParam(i, Math.floor(pokemon.level/100 * pokemon._IVS[i]));
    }

    pokemon._trainer = $gameActors.actor(1).name();
    pokemon._idt = $gameActors.actor(1)._TID;
    pokemon.item = 0;
    var lvl = pokemon.level;
    var i = lvl;
    while (i > 0 & pokemon.skills().length < 4){
        if ($dataPokemonMoveset[pokeId].LevelMoves[i].length >= 2){
            for (var j = 0; j < $dataPokemonMoveset[pokeId].LevelMoves[i].length; ++j){
                if (pokemon.skills().length < 4)pokemon.learnSkill($dataPokemonMoveset[pokeId].LevelMoves[i][j]);
            }
        }
        else if ($dataPokemonMoveset[pokeId].LevelMoves[i] != 0) pokemon.learnSkill($dataPokemonMoveset[pokeId].LevelMoves[i]);
        --i;
    }
    var PPs = [0,0,0,0];
    for (var i = 0; i < pokemon.skills().length; ++i){
        PPs[i] = pokemon.skills()[i].mpCost;
    }
    pokemon.pp = [PPs[0], PPs[1], PPs[2], PPs[3]];
    pokemon.ppmax = PPs;

    pokemon.type1 = $dataPokemon[pokeId].Types[0];
    if ($dataPokemon[pokeId].Types.length == 2) pokemon.type2 = $dataPokemon[pokeId].Types[1];
    else pokemon.type2 = 0;

    pokemon.estado = 0;

    pokemon.levelmet = pokemon.level;
    pokemon.date = $gameVariables.value(31) + " " + $gameVariables.value(26) + ", " + $gameVariables.value(28);
    pokemon.local = $dataMapInfos[$gameMap._mapId].name;
    Game_Interpreter.prototype.changeHp(pokemon, 999, false);
    if ($gameVariables.value(70) < 6) $gameVariables.setValue(70, $gameVariables.value(70) + 1);
}

function pokeInTeam(id){
    var q = 0;
    for (var i = 0; i < $gameVariables.value(70); ++i){
        if ($gameParty.allMembers()[i+1].originalId()-1 == id) ++q;
    }
    return q;
}

function addWildPokemon(){
    var pokeId = $gameVariables.value(90).id;
    var level = $gameVariables.value(90).level;
    Game_Interpreter.prototype.pluginCommand("CopyActor", [pokeId + 1, "4"]);
    var pokemonId = $gameVariables.value(4);
    var pokemon = $gameActors.actor(pokemonId);
    var pokeinfo = $dataPokemon[pokeId];
    var wildPoke = $gameVariables.value(90);
    //PKMN Level
    pokemon.modifyLevel(level, false);

    //PKMN GENDER
    pokemon._gender = wildPoke._gender;

    pokemon._happiness = pokeinfo.HappinessBase; //PKMN HAPPINESS
    pokemon.forma = wildPoke.forma; //PKMN FORM
    pokemon._nature = wildPoke._nature; //NATURALEZA
    pokemon._IVS = [wildPoke._IVS[0], 0, wildPoke._IVS[2], wildPoke._IVS[3], wildPoke._IVS[4], wildPoke._IVS[5], wildPoke._IVS[6]];
    pokemon._EVS =  [0, 0, 0, 0,0,0,0];
    pokemon.addParam(0, Math.floor(10 + pokemon.level/100 * pokeinfo.BaseStats[0] * 2 + pokemon.level));
    pokemon.addParam(0, -1);
    for (var i = 1; i < 7; ++i){
        pokemon.addParam(i, Math.floor((2 * pokeinfo.BaseStats[i] * pokemon.level/100 + 5) * $dataNature[pokemon._nature].Stats[i]));
        pokemon.addParam(i, -1);
    }
    for (var i = 0; i < 7; ++i){
        pokemon.addParam(i, Math.floor(pokemon.level/100 * pokemon._IVS[i]));
    }

    pokemon._trainer = $gameActors.actor(1).name();
    pokemon._idt = $gameActors.actor(1)._TID;
    pokemon.item = wildPoke.item;
    for (var j = 0; j < wildPoke.skills().length; ++j){
        pokemon.learnSkill(wildPoke.skills()[j].id);
    }
    var PPs = [0,0,0,0];
    for (var i = 0; i < pokemon.skills().length; ++i){
        PPs[i] = pokemon.skills()[i].mpCost;
    }
    pokemon.pp = [PPs[0], PPs[1], PPs[2], PPs[3]];
    pokemon.ppmax = PPs;

    pokemon.type1 = $dataPokemon[pokeId].Types[0];
    if ($dataPokemon[pokeId].Types.length == 2) pokemon.type2 = $dataPokemon[pokeId].Types[1];
    else pokemon.type2 = 0;

    pokemon.estado = wildPoke.estado;

    pokemon.levelmet = pokemon.level;
    pokemon.date = $gameVariables.value(31) + " " + $gameVariables.value(26) + ", " + $gameVariables.value(28);
    pokemon.local = $dataMapInfos[$gameMap._mapId].name;
    Game_Interpreter.prototype.changeHp(pokemon, 999, false);
    if ($gameVariables.value(70) < 6) $gameVariables.setValue(70, $gameVariables.value(70) + 1);
}

// #BATTLE FUNCTIONS

function rellenarVariables(){
    var side = $gameVariables.value(254);
    var barra = 41, pos = 56, num = 1;
    if (side == 2) barra = 97, pos = 626, num = 2;
    $gameVariables.setValue(250, barra);
    $gameVariables.setValue(251, -1);
    $gameVariables.setValue(252, pos);
    $gameVariables.setValue(253, num);
    $gameVariables.setValue(254, side);
}

Game_Actor.prototype.getDamage = function(side, damage, directDamage, robustez){
    var step = -1;
    var curacion = false;
    if (damage < 0){
        damage = damage * -1;
        if (damage > (this.mhp - this.hp)) damage = this.mhp - this.hp;
        step = 1;
        curacion = true;
    }
    var barra = 41, pos = 56, num = 1;
    if (side == 1) barra = 97, pos = 626, num = 2;
    if (damage > 0 && damage > this.hp && !curacion){
       damage = this.hp;
       if (directDamage && robustez) damage --; 
    }
    $gameSwitches.setValue(114, directDamage);
    if (!curacion){
        $gameVariables.setValue(3, damage);
        $gameVariables.setValue(250, barra);
        $gameVariables.setValue(251, step);
        $gameVariables.setValue(252, pos);
        $gameVariables.setValue(253, num);
        $gameVariables.setValue(254, side);
    } 
    else{
        $gameVariables.setValue(258, damage);
        var info = [barra, step, pos, num, side];
        $gameVariables.setValue(259, info);
        $gameSwitches.setValue(113, true);
    } 

    return damage;
}

Game_Actor.prototype.confusionDamage = function(side, battler){
    var def = battler._stats[2];
    var atk = battler._stats[1];
    var v = Math.floor(Math.random() * (100 - 85) + 85);
    var n = this._level;
    var daño = Math.floor(0.01*v*(((0.2*n+1)*atk*40)/(25*def)+2));
    this.getDamage(1 + (side == 1), daño, false, false);
}

Game_Actor.prototype.isFrozen = function(battler, movimiento){
    if (this.estado == 2 ){
        battler._congelamiento ++;
        if (movimiento == 172 || movimiento == 221 || ((Math.floor(Math.random()* 99 + 1)) <= (10 * battler._congelamiento)) ){
            this.estado = 0;
            $gameVariables.setValue(255, 1);
            battler._congelamiento = 0;
            return false;
        } else return true;
    } else return false;
}

Game_Actor.prototype.isAsleep = function(battler){
    if (this.estado == 5){
        battler._dormido --;
        if (battler._dormido == 0){
            this.estado = 0;
            $gameVariables.setValue(255, 4);
            battler._pesadillas = false;
            return false;
        } else return true;
    } else return false;
}

Game_Actor.prototype.isParalysed = function(battler){
    if (this.estado == 3){
        if ((Math.floor(Math.random() * 99 + 1)) <= 75) return false;
        else{
            if (battler._outrage > 0){
                battler._outrage = 0;
                battler._trapped = false;
            }
            $gameVariables.setValue(255, 3);
            return true;
        } 
    } else return false;
}

Game_Actor.prototype.esTipo = function(tipo){
    return (this.type1 == tipo || this.type2 == tipo);
}

Game_Actor.prototype.efectividad = function(movimiento, gravedad, user, target, poke){
    var arraigo = user._arraigo;
    var foresight = user._foresight;
    var granOjo = user._granOjo || target._granOjo;
    var arraigo = target._arraigo;
    var tipo = $dataSkills[movimiento].damage.elementId;
    if ($gameVariables.value(5000)._cortinaPlasma && tipo == 1){
        tipo = 13;
    }
    if (movimiento == 204){
        if ($gameVariables.value(5000)._weather == 4) tipo = 6;
        if ($gameVariables.value(5000)._weather == 3) tipo = 11;
        if ($gameVariables.value(5000)._weather == 2) tipo = 10;
        if ($gameVariables.value(5000)._weather == 1) tipo = 15;
    }
    if (movimiento == 449 && esTabla(poke.item)){
        tipo = tipoTabla(poke.item);
    }
    if (user._electrified) tipo = 13;
    var ef = $dataTablaTipos[tipo].Tabla[this.type1];
    if (movimiento == 573 && this.type1 == 11) ef = 2;
    if (movimiento == 573 && this.type2 == 11) ef = ef * 2;
    else if (this.type2 != 0) ef = ef * $dataTablaTipos[tipo].Tabla[this.type2];
    ef = ef * 100;
    if (tipo == 5 && target._leviton > 0) ef = 0;
    if (ef == 0){
        if (granOjo && this.esTipo(17)) ef = 100;
        if (foresight && this.esTipo(8)) ef = 100;
        if (gravedad > 0 && this.esTipo(3)) ef = 100;
        if (tipo == 5 && arraigo) ef = 100;
    }
    if (movimiento == 28) ef = 100;
    if (ef > 0 && (movimiento == 68 || movimiento == 149 || movimiento == 101 || movimiento == 69)) ef = 100;

    $gameVariables.setValue(256, ef);
    return ef;
}

Game_Actor.prototype.mismoDestino = function(){
    var info = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
    var daño = $gameVariables.value(3);
    this.getDamage(1 + ($gameVariables.value(254) == 1), this.hp, false, false);
    var datos = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
    $gameVariables.setValue(258, $gameVariables.value(3));
    $gameVariables.setValue(259, datos);
    $gameSwitches.setValue(113, true);
    for (var i = 0; i < 5; ++i){
        $gameVariables.setValue(250+i, info[i]);
    }
    $gameVariables.setValue(3, daño);
}

Game_Actor.prototype.grudge = function(){
    var side = $gameVariables.value(254);
    var move = $gameVariables.value(106);
    if (side == 1){
        var i = $gameVariables.value(39)-1;
        this.pp[i] = 0;
    } else {
        var i = 0;
        while (this.skills()[i].id != move) ++i;
        this.pp[i] = 0;
    }
    $gameSwitches.setValue(123, true);
}

//Pokémon variables temporales de batalla.

function Game_Fighter() {
    this.initialize.apply(this, arguments);
}


Game_Fighter.prototype.initialize = function() {
    this.initMembers();
};

Game_Fighter.prototype.initMembers = function() {
    this._usedMoves = [false, false, false, false];
    this._stats = [];
    this._weight = 0;
    this._boostStats = [];
    this._flinched = false;
    this._trapped = false;
    this._recharge = false;
    this._charging = false;
    this._confusion = 0;
    this._pesadillas = false;
    this._flying = false;
    this._diving = false;
    this._digging = false;
    this._minimized = false;
    this._target100 = false;
    this._outrage = 0;
    this._congelamiento = 0;
    this._dormido = 0;
    this._sustituto = 0;
    this._lastDamage = 0;
    this._lastMovement = 0;
    this._foresight = false;
    this._granOjo = false;
    this._proteccion = false;
    this._endure = false;
    this._mismoDestino = false;
    this._carga = false;
    this._veloAurora = false;
    this._reflect = 0;
    this._lightScreen = 0;
    this._criticInd = 0;
    this._bind = 0;
    this._wrap = 0;
    this._magicCoat = false;
    this._disabled = 0;
    this._turnosDisabled = 0;
    this._infected = false;
    this._veloSagrado = 0;
    this._mimicMove = 0;
    this._bide = 0;
    this._bideDamage = 0;
    this._clamp = 0;
    this._fireSpin = 0;
    this._sandTomb = 0;
    this._magmaStorm = 0;
    this._infestation = 0;
    this._snapTrap = 0;
    this._thousandWaves = 0;
    this._transformacionId = 0;
    this._rage = false;
    this._encored = 0;
    this._atrapado = false;
    this._cursed = false;
    this._protectSeguidas = 0;
    this._rollout = 0;
    this._defenseCurl = false;
    this._furyCutter = 0;
    this._futureDamage = 0;
    this._premonicion = 0;
    this._reservas = 0;
    this._taunted = 0;
    this._tailwind = 0;
    this._mist = 0;
    this._perishCount = 0;
    this._turnosIntoxicado = 0;
    this._nombrePremonicion = "";
    this._alboroto = false;
    this._preReserva = [];
    this._habilidadOriginal = 0;
    this._wish = 0;
    this._futuraCura = 0;
    this._nombreWish = "";
    this._arraigo = false;
    this._recycledItem = 0;
    this._yawn = 0;
    this._sellado = false;
    this._rabia = false;
    this._chapoteoLodo = false;
    this._hidrochorro = false;
    this._roost = false;
    this._embargo = false;
    this._autoDaño = false;
    this._healBlock = 0;
    this._bilis = false;
    this._conjuro = 0;
    this._yoPrimero = false;
    this._leviton = 0;
    this._whirlpool = 0;
    this._shadows = false;
    this._ecoVoz = 0;
    this._anticipios = 0;
    this._anticipio = false;
    this._trucoDefensa = false;
    this._trucoDefensas = 0;
    this._escudoReal = false;
    this._escudoReales = 0;
    this._electrified = false;
    this._barreraEspinosas = 0;
    this._barreraEspinosa = false;
    this._escudoTatami = false;
    this._powder = false;
    this._bunkers = 0;
    this._bunker = false;
    this._critic100 = false;
    this._mordaza = 0;
    this._abilityLock = false;
    this._lastMissed
};

Game_Fighter.prototype.boostStat = function(stat, level, poke){
    var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
    var limite = false;
    if (this._boostStats[stat] + level > 12 && level == 1){
        limite = true;
    } else {
        if (this._boostStats[stat] + level > 12 && level == 2 && this._boostStats[stat] + 1 <= 12) level = 1;
        else if (this._boostStats[stat] + level > 12 && level == 2){
            limite = true;
        }
        if (!limite){
            this._boostStats[stat] += level;
            var num = poke.atk;
            if (stat == 2) num = poke.def;
            else if (stat == 3) num = poke.mat;
            else if (stat == 4) num = poke.mdf;
            else if (stat == 5) num = poke.agi;
            this._stats[stat] = (stats[this._boostStats[stat]]/100) * num;
            $gameVariables.setValue(255, 20 + stat);
        }
    }
    if (limite) $gameVariables.setValue(255, 30 + stat);
}

Game_Fighter.prototype.reduceStat = function(stat, level, poke){
    var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
    var limite = false;
    if (this._boostStats[stat] - level < 0 && level == 1){
        limite = true;
    } else {
        if (this._boostStats[stat] - level < 0 && level == 2 && this._boostStats[stat] - level > 0) level = 1;
        else if (this._boostStats[stat] - level < 0 && level == 2) limite = true;
        if (!limite){
            this._boostStats[stat] -= level;
            var num = poke.atk;
            if (stat == 2) num = poke.def;
            else if (stat == 3) num = poke.mat;
            else if (stat == 4) num = poke.mdf;
            else if (stat == 5) num = poke.agi;
            this._stats[stat] = (stats[this._boostStats[stat]]/100) * num;
            $gameVariables.setValue(255, 40 + stat);
        }

    }
    if (limite)$gameVariables.setValue(255, 50 + stat);
}

Game_Fighter.prototype.reducePrecision = function(){
    var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
    var i = 6;
    while ((i >= 6 && i <= 12) || (i <= 6 && i >= 0)){
        if (stats[i] > this._precision) --i;
        else if (stats[i] < this._precision) ++i;
        else break;
    }
    if (i == 0){
        $gameVariables.setValue(255, 57);
    } else {
        this._precision = stats[i - 1];
        $gameVariables.setValue(255, 47);
    }
}

Game_Fighter.prototype.reduceEvasion = function(){
    var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
    var i = 6;
    while ((i >= 6 && i <= 12) || (i <= 6 && i >= 0)){
        if (stats[i] > this._evasion) --i;
        else if (stats[i] < this._evasion) ++i;
        else break;
    }
    if (i == 12){
        $gameVariables.setValue(255, 56);
    } else {
        this._evasion = stats[i + 1];
        $gameVariables.setValue(255, 46);
    }
}

Game_Fighter.prototype.precisionBoost = function(){
    var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
    var i = 6;
    while ((i >= 6 && i <= 12) || (i <= 6 && i >= 0)){
        if (stats[i] > this._precision) --i;
        else if (stats[i] < this._precision) ++i;
        else break;
    }
    if (i == 0){
        $gameVariables.setValue(255, 37);
    } else {
        this._precision = stats[i + 1];
        $gameVariables.setValue(255, 27);
    }
}

Game_Fighter.prototype.evasionBoost = function(){
    var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
    var i = 6;
    while ((i >= 6 && i <= 12) || (i <= 6 && i >= 0)){
        if (stats[i] > this._evasion) --i;
        else if (stats[i] < this._evasion) ++i;
        else break;
    }
    if (i == 0){
        $gameVariables.setValue(255, 36);
    } else {
        this._evasion = stats[i - 1];
        $gameVariables.setValue(255, 26);
    }
}

Game_Fighter.prototype.resetStats = function(poke){
    this._boostStats = [6, 6, 6, 6, 6, 6];
    this._stats[1] = poke.atk;
    this._stats[2] = poke.def;
    this._stats[3] = poke.mat;
    this._stats[4] = poke.mdf;
    this._stats[5] = poke.agi;
    this._evasion = 100;
    this._precision = 100;
}

Game_Fighter.prototype.transformarEn = function(target, rival, poke){
    this._stats = [target._stats[0], target._stats[1], target._stats[2], target._stats[3], target._stats[4], target._stats[5]];
    this._precision = target._precision;
    this._evasion = target._evasion;
    var skills = [];
    for (var i = 0; i < poke.skills().length; ++i){
        skills.push(poke.skills()[i].id);
    }

    if ($gameVariables.value(254) == 1){
        var datos = [poke.name(), poke.ppmax, poke.pp, poke._habilidad, poke._IVs, poke._EVs];
        var stats = [poke.mhp, poke.atk, poke.def, poke.mat, poke.mdf, poke.agi];
        $gameVariables.setValue(260, datos);
        $gameVariables.setValue(261, stats);
        $gameVariables.setValue(262, skills);
        poke._name = rival.name;
        poke._EVs = rival._EVs;
        poke._IVs = rival._IVs;
        $gameMap.event(1).setImage("$0Battler" + poke.name() + " %(9)", 0);

    } else {
        var datos = [poke.name(), poke.ppmax, poke.pp, poke._habilidad, poke._IVs, poke._EVs];
        var stats = [poke.mhp, poke.atk, poke.def, poke.mat, poke.mdf, poke.agi];
        poke.transformacion = datos;
        poke.transStats = stats;
        poke.transSkills = skills;
        poke.name = rival.name();
        poke._EVs = rival._EVs;
        poke._IVs = rival._IVs;
    }
    poke.ppmax = [5,5,5,5];
    poke.pp = [5,5,5,5];
    for (var i = 2; i < 7; ++i){
        poke.setParam(i, rival.param(i));
    }
    for (var i = 0; i < skills.length; ++i){
        poke.forgetSkill(skills[i]);
    }
    for (var i = 0; i < rival.skills().length; ++i){
        poke.learnSkill(rival.skills()[i].id);
    }
}

Game_BattlerBase.prototype.setParam = function(paramId, value) {
    this._paramPlus[paramId] = value - 1;
    this.refresh();
};

Game_Actor.prototype.retirarTransformacion = function(){
    var datos = $gameVariables.value(260);
    var skill = $gameVariables.value(262);
    var stats = $gameVariables.value(261);
    var skills = [];

    for (var i = 2; i < 7; ++i){
        this.setParam(i, stats[i-1]);
    }

    for (var i = 0; i < this.skills().length; ++i){
        skills.push(this.skills()[i].id);
    }

    for (var i = 0; i < skills.length; ++i){
        this.forgetSkill(skills[i]);
    }

    for (var i = 0; i < skill.length; ++i){
        this.learnSkill(skill[i]);
    }

    this._name = datos[0];
    this.ppmax = datos[1];
    this.pp = datos[2];
    this._habilidad = datos[3];
    this._IVs = datos[4];
    this._EVs = datos[5];

    for (var i = 0; i < 3; ++i){
        $gameVariables.setValue(260 + i, 0);
    }
}

Game_Actor.prototype.retirarMimic = function(battler){
    this.learnSkill(102);
    this.forgetSkill(battler._mimicMove);
}

Game_Fighter.prototype.rageEffect = function(poke){
    var aux = $gameVariables.value(255);
    this.boostStat(1, 1, poke);
    $gameVariables.setValue(255, aux);
    $gameSwitches.setValue(120, true);

}

Game_Fighter.prototype.hasFlinched = function(){
    if (this._flinched) $gameVariables.setValue(255, 6);
    return this._flinched;
}

Game_Fighter.prototype.switchFlinch = function(flinch){
    this._flinched = flinch;
}

Game_Fighter.prototype.mustRecharge = function(){
    return this._recharge;
}

Game_Fighter.prototype.switchRecharge = function(recharge){
    this._recharge = recharge;
    if (!recharge){
        switch($gameVariables.value(14)){
            case 0:
                //Ha retrocedido y no puede atacar.
                break;
            case 1:
                break;
        }
    
        this._trapped = false;
    }
}

Game_Fighter.prototype.getConfused = function(){
    this._confusion = Math.randomInt(3)+1;
    $gameVariables.setValue(255, 10);

}

Game_Fighter.prototype.isConfused = function(side, active){
    if (this._confusion > 0){
        if (Math.floor(Math.random()* (99) + 1) <= 50){
            if (this._outrage > 0){
                this._outrage = 0;
                this._trapped = false;
            }
            if (side == 1){
                $gameParty.allMembers()[active].confusionDamage(side, this);
            } else $gameVariables.value(90  + active).confusionDamage(side, this);
            return true;
        } else return false;
    }
    return false;
}

Game_Fighter.prototype.isLove = function(side, active){
    if (this._enamorado){
        if (Math.floor(Math.random() * 99 + 1) <= 50){
            return true;
        } else return false;
    } else return false;
}

Game_Fighter.prototype.ableToSelect = function(move, side){
    var rival = $gameVariables.value(90 + $gameVariables.value(5000)._activeRival);
    if (side == 2) rival = $gameParty.allMembers()[$gameVariables.value(5000)._activePkmn];
    return !((move != 117 && this._bide > 0) || (this._trapped && move != this._lastMovement) || (move == this._disabled) || (this._encored > 0 && move != this._lastMovement) || (this._tormento && move == this._lastMovement) || (this._taunted > 0 && $dataSkills[move].stypeId == 3) || (this._sellado && rival.hasSkill(move)) || (this._healBlock > 0 && healMove(move)) || (this._mordaza > 0 && soundMove(move)));
}

Game_Fighter.prototype.finalTurno = function(poke){
    if (this._roost){
        if (poke.type1 == 0) poke.type1 = 3;
        else poke.type2 = 3;
        this._roost = false;
    }
    var batalla = $gameVariables.value(5000);
    var side = $gameVariables.value(254);
    var idioma = $gameVariables.value(14);
    var efectos = [];
    var mensajes = [];
    var daño = [];
    if (poke.estado == 1){
        efectos.push(1);
        var mensaje = "The foe " + poke.name + " is hurt by the burn!";
        if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se resiente de la quemadura!"
        if (side == 1){
            mensaje = poke.name() + " is hurt by the burn!";
            if (idioma == 1) mensaje = "¡" + poke.name() + " se resiente de la quemadura!"
        }
        mensajes.push(mensaje);
        var ps = Math.floor(poke.mhp * 0.125);
        if (ps > poke.hp) ps = poke.hp;
        daño.push(ps);
    }
    if (poke.estado == 4){
        efectos.push(2);
        var mensaje = "The foe " + poke.name + " is hurt by poison!";
        if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo sufre por el envenenamiento!"
        if (side == 1){
            mensaje = poke.name() + " is hurt by poison!";
            if (idioma == 1) mensaje = "¡" + poke.name() + " sufre por el envenenamiento!"
        }
        mensajes.push(mensaje);
        var ps = Math.floor(poke.mhp * 0.125);
        if (ps > poke.hp) ps = poke.hp;
        daño.push(ps);
    }
    if (poke.estado == 6){
        efectos.push(3);
        var mensaje = "The foe " + poke.name + " is hurt by poison!";
        if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo sufre por el envenenamiento!"
        if (side == 1){
            mensaje = poke.name() + " is hurt by poison!";
            if (idioma == 1) mensaje = "¡" + poke.name() + " sufre por el envenenamiento!"
        }
        mensajes.push(mensaje);
        this._turnosIntoxicado++;
        var ps = Math.floor(poke.mhp * (0.0625 * this._turnosIntoxicado));
        if (ps > poke.hp) ps = poke.hp;
        daño.push(ps);
    }
    if (this._bind > 0){
        this._bind--;
        if (this._bind == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Bind!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Atadura!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Bind!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Atadura!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(4);
            var mensaje = "The foe " + poke.name + " is hurt by Bind.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Atadura.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Bind.";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Atadura.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._wrap > 0){
        this._wrap--;
        if (this._wrap == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Wrap!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Constricción!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Wrap!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Constricción!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(5);
            var mensaje = "The foe " + poke.name + " is hurt by Wrap.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Constricción.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Wrap.";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Constricción.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._fireSpin > 0){
        this._fireSpin--;
        if (this._fireSpin == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Fire Spin!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Giro Fuego!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Fire Spin!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Giro Fuego!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(6);
            var mensaje = "The foe " + poke.name + " is hurt by Fire Spin.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Giro Fuego.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Fire Spin.";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Giro Fuego.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._whirlpool > 0){
        this._whirlpool--;
        if (this._whirlpool == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Whirlpool!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Giro Fuego!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Whirlpool!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Giro Fuego!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(6);
            var mensaje = "The foe " + poke.name + " is hurt by Whirlpool!";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Torbellino.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Whirlpool!";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Torbellino.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._clamp > 0){
        this._clamp--;
        if (this._clamp == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Clamp!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Tenaza!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Clamp!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Tenaza!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(7);
            var mensaje = "The foe " + poke.name + " is hurt by Clamp.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Tenaza.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Clamp.";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Tenaza.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._sandTomb > 0){
        this._sandTomb--;
        if (this._sandTomb == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Sand Tomb!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Bucle Arena!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Sand Tomb!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Bucle Arena!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(8);
            var mensaje = "The foe " + poke.name + " is hurt by Sand Tomb.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Bucle Arena.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Sand Tomb.";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Bucle Arena.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._magmaStorm > 0){
        this._magmaStorm--;
        if (this._magmaStorm == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Magma Storm!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Lluvia Ígnea!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Magma Storm!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Lluvia Ígnea!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(9);
            var mensaje = "The foe " + poke.name + " is hurt by Magma Storm.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Lluvia Ígnea.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Magma Storm.";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Lluvia Ígnea.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._infestation > 0){
        this._infestation--;
        if (this._infestation == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Infestation!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Acoso!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Infestation!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Acoso!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(10);
            var mensaje = "The foe " + poke.name + " is hurt by Infestation.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Acoso.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Infestation.";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Acoso.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._snapTrap > 0){
        this._snapTrap--;
        if (this._snapTrap == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " broke free from Thousand Waves!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo se libró de Mil Temblores!"
            if (side == 1){
                mensaje = poke.name() + " broke free from Thousand Waves!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se libró de Mil Temblores!";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } else {
            efectos.push(11);
            var mensaje = "The foe " + poke.name + " is hurt by Thousand Waves.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo es dañado por Mil Temblores.";
            if (side == 1){
                mensaje = poke.name() + " is hurt by Thousand Waves.";
                if (idioma == 1) mensaje = poke.name() + " es dañado por Mil Temblores.";
            }
            mensajes.push(mensaje);
            var ps = Math.floor(poke.mhp * 0.125);
            if (ps > poke.hp) ps = poke.hp;
            daño.push(ps);
        }
    }
    if (this._reflect > 0){
        this._reflect--;
        if (this._reflect == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + "'s Reflect effect ended.";
            if (idioma == 1) mensaje = "El efecto de Reflejo del " + poke.name + " enemigo se terminó."
            if (side == 1){
                mensaje = poke.name() + "'s Reflect effect ended.";
                if (idioma == 1) mensaje = "El efecto de Reflejo de " + poke.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._lightScreen > 0){
        this._lightScreen--;
        if (this._lightScreen == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + "'s Light Screen effect ended.";
            if (idioma == 1) mensaje = "El efecto de Pantalla Luz del " + poke.name + " enemigo se terminó."
            if (side == 1){
                mensaje = poke.name() + "'s Light Screen effect ended.";
                if (idioma == 1) mensaje = "El efecto de Pantalla Luz de " + poke.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._veloAurora > 0){
        this._veloAurora--;
        if (this._veloAurora == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + "'s Aurora Veil effect ended.";
            if (idioma == 1) mensaje = "El efecto de Velo Aurora del " + poke.name + " enemigo se terminó."
            if (side == 1){
                mensaje = poke.name() + "'s Aurora Veil effect ended.";
                if (idioma == 1) mensaje = "El efecto de Velo Aurora de " + poke.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._encored > 0){
        this._encored--;
        if (this._encored == 0){
            efectos.push(0);
            var rival = $gameVariables.value(90 + $gameVariables.value(5000)._activeRival);
            var mensaje = "The foe " + rival.name + "'s Encore effect ended.";
            if (idioma == 1) mensaje = "El efecto de Otra Vez del " + rival.name + " enemigo se terminó."
            if (side != 1){
                rival = $gameParty.allMembers()[$gameVariables.value(5000)._activePkmn];
                mensaje = rival.name() + "'s Encore effect ended.";
                if (idioma == 1) mensaje = "El efecto de Otra Vez de " + rival.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._turnosDisabled > 0){
        this._turnosDisabled--;
        if (this._turnosDisabled == 0){
            efectos.push(0);
            var rival = $gameVariables.value(90 + $gameVariables.value(5000)._activeRival);
            var mensaje = "The foe " + rival.name + "'s Disable effect ended.";
            if (idioma == 1) mensaje = "El efecto de Anulación del " + rival.name + " enemigo se terminó."
            if (side != 1){
                rival = $gameParty.allMembers()[$gameVariables.value(5000)._activePkmn];
                mensaje = rival.name() + "'s Disable effect ended.";
                if (idioma == 1) mensaje = "El efecto de Anulación de " + rival.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
            this._disabled = 0;
        } 
    }
    if (this._mist > 0){
        this._mist--;
        if (this._mist == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + "'s Mist effect ended.";
            if (idioma == 1) mensaje = "El efecto de Neblina del " + poke.name + " enemigo se terminó."
            if (side == 1){
                mensaje = poke.name() + "'s Mist effect ended.";
                if (idioma == 1) mensaje = "El efecto de Neblina de " + poke.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._pesadillas){
        efectos.push(12);
        var mensaje = "The foe " + poke.name + " has nightmares!";
        if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo tiene pesadillas!"
        if (side == 1){
            mensaje = poke.name() + " has nightmares!";
            if (idioma == 1) mensaje = "¡" + poke.name() + " tiene pesadillas!"
        }
        mensajes.push(mensaje);
        var ps = Math.floor(poke.mhp * 0.125);
        if (ps > poke.hp) ps = poke.hp;
        daño.push(ps);
    }
    if (this._cursed){
        efectos.push(13);
        var mensaje = "The foe " + poke.name + " takes damage because of the curse!";
        if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo sufre por la maldición!"
        if (side == 1){
            mensaje = poke.name() + " takes damage because of the curs!";
            if (idioma == 1) mensaje = "¡" + poke.name() + " sufre por la maldición!"
        }
        mensajes.push(mensaje);
        var ps = Math.floor(poke.mhp * 0.25);
        if (ps > poke.hp) ps = poke.hp;
        daño.push(ps);
    }
    if (this._perishCount > 0){
        this._perishCount--;
        efectos.push(0);
        var mensaje = "The foe " + poke.name + "'s perish count fell to " + this._perishCount + "!";
        if (idioma == 1) mensaje = "¡El contador de salud del " + poke.name + " enemigo bajó a " + this._perishCount + "!";
        if (side == 1){
            mensaje = poke.name() + "'s perish count fell to " + this._perishCount + "!";
            if (idioma == 1) mensaje = "¡El contador de salud de " + poke.name() + " bajó a " + this._perishCount + "!";
        }
        mensajes.push(mensaje);
        if (this._perishCount == 0){
            daño.push(poke.hp);
        } else {
            daño.push(0);
        }
    }
    if ($gameVariables.value(5000)._weather == 1 && !poke.esTipo(15) && !this._diving && !this._digging){
        efectos.push(0);
        var mensaje = "The foe " + poke.name + " is buffeted by the Hail!";
        if (idioma == 1) mensaje = "¡El granizo zarandea al " + poke.name + " enemigo!";
        if (side == 1){
            mensaje = poke.name() + " is buffeted by the Hail!";
            if (idioma == 1) mensaje = "¡El granizo zarandea a " + poke.name() + "!";
        }
        mensajes.push(mensaje);
        var ps = Math.floor(poke.mhp * 0.0625);
        if (ps > poke.hp) ps = poke.hp;
        daño.push(ps);
    }
    if ($gameVariables.value(5000)._weather == 4 && !poke.esTipo(5) && !poke.esTipo(6) && !poke.esTipo(9)){
        efectos.push(0);
        var mensaje = "The foe " + poke.name + " is buffeted by the Sandstorm!";
        if (idioma == 1) mensaje = "¡La tormenta zarandea al " + poke.name + " enemigo!";
        if (side == 1){
            mensaje = poke.name() + " is buffeted by the Sandstorm!";
            if (idioma == 1) mensaje = "¡La tormenta zarandea a " + poke.name() + "!";
        }
        mensajes.push(mensaje);
        var ps = Math.floor(poke.mhp * 0.0625);
        if (ps > poke.hp) ps = poke.hp;
        daño.push(ps);
    }
    if (this._veloSagrado > 0){
        this._veloSagrado--;
        if (this._veloSagrado == 0){
            efectos.push(0);
            var mensaje = "The foe team's Safeguard effect ended.";
            if (idioma == 1) mensaje = "El efecto de Velo Sagrado del equipo enemigo se terminó."
            if (side == 1){
                mensaje = "Your team's Safeguard effect ended.";
                if (idioma == 1) mensaje = "El efecto de Velo Sagrado de tu equipo se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._premonicion > 0){
        this._premonicion--;
        if (this._premonicion == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " took the " + this._nombrePremonicion + " attack!";
            if (idioma == 1) mensaje = "¡El " + poke.name + " enemgio recibió el ataque " + this._nombrePremonicion + "!";
            if (side == 1){
                mensaje = poke.name() + " took the " + this._nombrePremonicion + " attack!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " recibió el ataque " + this._nombrePremonicion + "!";
            }
            mensajes.push(mensaje);
            daño.push(this._futureDamage);
        } 
    }
    if (this._alboroto){
        efectos.push(0);
        daño.push(0);
        var mensaje = "The foe " + poke.name +  "is making an uproar!";
        if (idioma == 1) mensaje = "¡El " + poke.name + " enemgio está montando un alboroto!";
        if (side == 1){
            mensaje = poke.name() + " is making an uproar!" ;
            if (idioma == 1) mensaje = "¡" + poke.name() + " está montando un alboroto!";
        }
        mensajes.push(mensaje);
    }
    if (!this._alboroto && this._lastMovement == 253){
        efectos.push(0);
        daño.push(0);
        var mensaje = "The foe " + poke.name +  " calmed down";
        if (idioma == 1) mensaje = "El " + poke.name + " enemgio se ha tranquilizado.";
        if (side == 1){
            mensaje = poke.name() + " calmed down." ;
            if (idioma == 1) mensaje = poke.name() + " se ha tranquilizado.";
        }
        mensajes.push(mensaje);
    }
    if (this._taunted > 0){
        this._taunted--;
        if (this._taunted == 0){
            efectos.push(0);
            var rival = $gameVariables.value(90 + $gameVariables.value(5000)._activeRival);
            var mensaje = "The foe " + rival.name + "'s Taunt effect ended.";
            if (idioma == 1) mensaje = "El efecto de Mofa del " + rival.name + " enemigo se terminó."
            if (side != 1){
                rival = $gameParty.allMembers()[$gameVariables.value(5000)._activePkmn];
                mensaje = rival.name() + "'s Taunt effect ended.";
                if (idioma == 1) mensaje = "El efecto de Mofa de " + rival.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._wish > 0){
        this._wish--;
        if (this._wish == 0){
            efectos.push(0);
            var i = this._nombreWish;
            var mensaje = "The foe " + $gameVariables.value(90+i).name + "'s Wish became true!";
            if (idioma == 1) mensaje = "¡El deseo del " + $gameVariables.value(90+i).name + " enemgio se hizo realidad!";
            if (side == 1){
                mensaje = $gameParty.allMembers()[i].name() + "'s Wish became true!";
                if (idioma == 1) mensaje = "¡El deseo de " + $gameParty.allMembers()[i].name() + " se hizo realidad!";
            }
            mensajes.push(mensaje);
            daño.push(this._futuraCura);
        } 
    }
    if (this._arraigo){
        efectos.push(14);
        var i = this._nombreWish;
        var mensaje = "The foe " + poke.name + " absorbed nutrients with its roots!";
        if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo absorbió nutrientes con sus\nraíces!";
        if (side == 1){
            mensaje = poke.name() + " absorbed nutrients with its roots!";
            if (idioma == 1) mensaje = "¡" + poke.name() + " absorbió nutrientes con sus\nraíces!";
        }
        mensajes.push(mensaje);
        var curacion = -Math.floor(poke.mhp * 0.0625);
        if ((curacion * - 1) > poke.mhp - poke.hp) curacion = -(poke.mhp - poke.hp);
        daño.push(curacion);
    }
    if (this._yawn > 0){
        this._yawn--;
        if (this._yawn == 0 && batalla._terrain != 12 && batalla._terrain != 1){
            efectos.push(15);
            poke.fallAsleep(Math.randomInt(7)+1, this);
            var mensaje = "The foe " + poke.name + " fell asleep!";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo se durmió."
            if (side == 1){
                mensaje = poke.name() + " fell asleep!";
                if (idioma == 1) mensaje = "¡" + poke.name() + " se durmió.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._tailwind > 0){
        this._tailwind--;
        if (this._tailwind == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + "'s Tailwind effect ended.";
            if (idioma == 1) mensaje = "El efecto de Viento Afín del " + poke.name + " enemigo se terminó."
            if (side == 1){
                mensaje = poke.name() + "'s Tailwind effect ended.";
                if (idioma == 1) mensaje = "El efecto de Viento Afín de " + poke.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._healBlock > 0){
        this._healBlock--;
        if (this._healBlock == 0){
            efectos.push(0);
            var mensaje = "The opponent Heal Block effect ended.";
            if (idioma == 1) mensaje = "El efecto de Anticura del rival se terminó."
            if (side == 2){
                mensaje = "Heal Block effect ended.";
                if (idioma == 1) mensaje = "El efecto de Anticura se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._conjuro > 0){
        this._conjuro--;
        if (this._conjuro == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + "'s Lucky-Chant effect ended.";
            if (idioma == 1) mensaje = "El efecto de Conjuro del " + poke.name + " enemigo se terminó."
            if (side == 1){
                mensaje = poke.name() + "'s Lucky-Chant effect ended.";
                if (idioma == 1) mensaje = "El efecto de Conjuro de " + poke.name() + " se terminó.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (this._aquaRing){
        efectos.push(14);
        var i = this._nombreWish;
        var mensaje = "Aqua Ring restored the foe " + poke.name + "'s HP!";
        if (idioma == 1) mensaje = "¡Acua Aro restauró los PS del " + poke.name + " enemigo!";
        if (side == 1){
            mensaje = "Aqua Ring restored the " + poke.name() + "'s HP!";
            if (idioma == 1) mensaje = "¡Acua Aro restauró los PS de " + poke.name() + "!";
        }
        mensajes.push(mensaje);
        var curacion = -Math.floor(poke.mhp * 0.0625);
        if ((curacion * - 1) > poke.mhp - poke.hp) curacion = -(poke.mhp - poke.hp);
        daño.push(curacion);
    }
    if (this._leviton > 0){
        this._leviton--;
        if (this._leviton == 0){
            efectos.push(0);
            var mensaje = "The foe " + poke.name + " stopped levitating.";
            if (idioma == 1) mensaje = "El " + poke.name + " enemigo dejó de levitar."
            if (side == 1){
                mensaje = poke.name() + " stopped levitating.";
                if (idioma == 1) mensaje = poke.name() + " dejó de levitar.";
            }
            mensajes.push(mensaje);
            daño.push(0);
        } 
    }
    if (batalla._terrain == 2 && poke.esTipo(12)){
        efectos.push(15);
        var i = this._nombreWish;
        var mensaje = "The foe " + poke.name + " restored some HP due to Grass Terrain!";
        if (idioma == 1) mensaje = "¡El " + poke.name + " enemigo restauró algunos PS por el Campo de Hierba!";
        if (side == 1){
            mensaje = poke.name() + " restored some HP due to Grass Terrain!";
            if (idioma == 1) mensaje = "¡" + poke.name() + " restauró algunos PS por el Campo de Hierba!";
        }
        mensajes.push(mensaje);
        var curacion = -Math.floor(poke.mhp * 0.0625);
        if ((curacion * - 1) > poke.mhp - poke.hp) curacion = -(poke.mhp - poke.hp);
        daño.push(curacion);
    }
    if (this._mordaza > 0) this._mordaza -= 1;
    $gameVariables.setValue(263, efectos);
    $gameVariables.setValue(264, mensajes);
    $gameVariables.setValue(265, daño);
}

// Clase combate Pokémon.

function Game_Combat() {
    this.initialize.apply(this, arguments);
}


Game_Combat.prototype.initialize = function() {
    this.initMembers();
};

Game_Combat.prototype.initMembers = function() {
    this._activeFighter = new Game_Fighter();
    this._rivalFighter = new Game_Fighter();
    this._trainerId = 0;
    this._first = 0;
    this._activePkmn = 0;
    this._activeRival = 0;
    this._turns  = 0;
    this._terrain = 0;
    this._weather = 0;
    this._alboroto = 0;
    this._gravedad = 0;
    this._payDay = 0;
    this._doblePaga = true;
    this._actions = [0, 0, 0];
    this._spikesRival = 0;
    this._spikesUser = 0;
    this._stealthRockRival = false;
    this._stealthRockUser = false;
    this._toxicSpikesRival = 0;
    this._toxicSpikesUser = 0;
    this._stickyWebUser = false;
    this._stickyWebRival = false;
    this._lastMovement = 0;
    this._trickRoom = 0;
    this._wonderRoom = 0;
    this._cortinaPlasma = false;
    this._turnosTerreno = 0;
    this._criticIndex = [625, 1250, 2500, 3333, 5000];

};

Game_Combat.prototype.initializeStats = function(){
    var pokemon = $gameParty.allMembers()[1];
    var rival = $gameVariables.value(90);
    this._activeFighter._stats = [0, pokemon.atk, pokemon.def, pokemon.mat, pokemon.mdf, pokemon.agi];
    this._rivalFighter._stats = [0, rival.atk, rival.def, rival.mat, rival.mdf, rival.agi];
    this._activeFighter._boostStats = [6, 6, 6, 6, 6, 6];
    this._rivalFighter._boostStats = [6, 6, 6, 6, 6, 6];
    this._activePkmn = 1;
    this._activeRival = 0;
    this._activeFighter._precision = 100;
    this._activeFighter._evasion = 100;
    this._rivalFighter._precision = 100;
    this._rivalFighter._evasion = 100;
    this._activeFighter._usedMoves = [false, false, false, false];
    this._rivalFighter._usedMoves = [false, false, false, false];
    this._activeFighter._weight = parseFloat($dataPokemon[pokemon.originalId()-1].Weight);
    this._rivalFighter._weight = parseFloat($dataPokemon[rival.originalId()-1].Weight);
}

Game_Combat.prototype.switchPokemonBattle = function(newPoke){
    console.log(newPoke);
    this._activePkmn = newPoke;
    var pokemon = $gameParty.allMembers()[newPoke];
    this._activeFighter = new Game_Fighter();
    this._activeFighter._precision = 100;
    this._activeFighter._evasion = 100;
    this._activeFighter._usedMoves = [false, false, false, false];
    this._activeFighter._weight = parseFloat($dataPokemon[pokemon.originalId()-1].Weight);
    this._activeFighter._boostStats = [6, 6, 6, 6, 6, 6];
    this._activeFighter._stats = [0, pokemon.atk, pokemon.def, pokemon.mat, pokemon.mdf, pokemon.agi];
}

Game_Combat.prototype.firstMove = function(playerMoveType, rivalMoveType, playerMove, rivalMove){
    if (playerMoveType != rivalMoveType) return playerMoveType > rivalMoveType;
    var userFirst = false;
    var player = this._activeFighter;
    var rival = this._rivalFighter;
    var playerSpeed = player._stats[5] * (1 + (player._tailwind > 0));
    var rivalSpeed = rival._stats[5] * (1 + (rival._tailwind > 0));
    if ($gameParty.allMembers()[this._activePkmn].estado == 3) playerSpeed = $gameParty.allMembers()[this._activePkmn].agi / 2;
    if ($gameVariables.value(90 + this._activeRival).estado == 3) rivalSpeed = $gameVariables.value(90 + this._activeRival).agi / 2;
    if (playerMoveType == 1 && rivalMoveType == 1){
        userFirst = ($dataSkills[playerMove].speed > $dataSkills[rivalMove].speed) || ($dataSkills[playerMove].speed == $dataSkills[rivalMove].speed && (playerSpeed) > (rivalSpeed));
        if (playerSpeed == rivalSpeed && $dataSkills[playerMove].speed == $dataSkills[rivalMove].speed) userFirst = Math.randomInt(1);
    }
    if (this._trickRoom > 0) userFirst = !userFirst;
    this._first = 1 + (userFirst != 1);
    return userFirst;
}

Game_Combat.prototype.attack = function(user, target, movement, side){
    var daño = 0;
    if (side == 1) {
        var active = this._activePkmn;
        var poke = $gameParty.allMembers()[active];
        var rival = $gameVariables.value(90  + this._activeRival);
    }
    else{
        var active = this._activeRival;
        var poke = $gameVariables.value(90  + active);
        var rival = $gameParty.allMembers()[this._activePkmn];
    }
    if (this.itHits(user, target, movement, rival, poke)){
        if ($dataSkills[movement].damage.elementId == 10 && user._powder){
            poke.getDamage(1 + (side == 1), Math.floor(poke.mhp/4), false, false);
            user._autoDaño = true;
            $gameSwitches.setValue(113, true);
            $gameSwitches.setValue(40, true);

        }
        else this.useMove(user, target, movement, poke, rival, side);
        daño = $gameVariables.value(3);
        if (rival.hp <= daño && target._mismoDestino){
            poke.mismoDestino();
        }
        if (rival.hp <= daño && target._rabia){
            poke.grudge();
        }
        if (rival.hp <= daño && movement == 565){
            user.boostStat(1, 2, poke);
        }
        if ($dataSkills[movement].damage.elementId == 10 && rival.estado == 2){
            //Descongelar
        }
        if ((side == 1 && $gameVariables.value(106) == 690) || (side == 2 && $gameVariables.value(100) == 690)){
            var mensaje = $gameVariables.value(254);
            poke.getBurned();
            $gameVariables.setValue(254, mensaje);
            $gameSwitches.setValue(42, true);
        }

    } else {
        user._trapped = false;
        user._digging = false;
        user._diving = false;
        user._shadows = false;
        user._bouncing = false;
        user._alboroto = false;
        if (!target._alboroto) this._alboroto = false;
        user._outrage = 0;
        user._furyCutter = 0;
        user._lastMissed = true;
        $gameSwitches.setValue(111, true);
    }
     
    target._mismoDestino = false;
    target._endure = false;
    target._rabia = false;
    target._robo = false;
    target._proteccion = false;
    target._anticipio = false;
    target._escudoTatami = false;
    target._escudoReal = false;
    target._bunker = false;
    target._trucoDefensa = false;
    target._barreraEspinosa = false;
    target._magicCoat = false;
    target._autoDaño = false;
    user._electrified = false;
    user._powder = false;
    target._lastMissed = false;
    if (movement != 497) user._ecoVoz = 0;
    if (movement != 382) user._yoPrimero = false;
    if (user._rage && movement != 99) user._rage = false;
    if (target._bide > 0) target._bideDamage += daño;
    if (user._protectSeguidas >= 1 && $dataSkills[movement].effectId != 112 && $dataSkills[movement].effectId != 117) user._protectSeguidas = 0;
    if (user._anticipios >= 1 && movement != 501) user._anticipios = 0;
    if (user._escudoReales >= 1 && movement != 588) user._escudoReales = 0;
    if (user._trucoDefensas >= 1 && movement != 578) user._trucoDefensas = 0;
    if (user._barreraEspinosas >= 1 && movement != 596) user._barreraEspinosas = 0;
    if (user._bunkers >= 1 && movement != 588) user._bunkers = 0;
    if (user._carga && movement != 268) user._carga = false;
    user._lastMovement = movement;
    user._lastDamage = daño;
    this._lastMovement = movement;
    //console.log(daño);
    var pos = 0;
    while (pos < poke.skills().length && poke.skills()[pos].id != movement) ++pos;
    if (pos < poke.skills().length){
        poke.pp[pos] -= 1;
        user._usedMoves[pos] = true;
    }
    return daño;
}

function finCadena(side){
    var battler = $gameVariables.value(5000)._rivalFighter;
    if (side == 1) battler = $gameVariables.value(5000)._activeFighter;
    battler._trapped = false;
    battler._outrage = 0;
    battler._furyCutter = 0;

}

Game_Combat.prototype.normalDamage = function(user, target, movement, poke, rival, side){
    var daño = 0;
    var pot = parseInt($dataSkills[movement].damage.formula);
    var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
    if (target._sustituto > 0) this.dañoSustituto(damage, target);
    else {
        daño = rival.getDamage(side, damage, true, target._endure);
        if (target._rage) target.rageEffect(rival);
    }
    return daño;
}

Game_Combat.prototype.useMove = function(user, target, movement, poke, rival, side){
    var daño = 0;
    if (target._robo && this.movimientoRobo(movement)){
        $gameSwitches.setValue(124, true);
        this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
        $gameVariables.setValue(254, 1 + (side == 1));
    }
    else{
        switch ($dataSkills[movement].effectId){
            case 1:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 2:
                if (rival.estado == 0 && this._terrain != 12 && this._terrain != 1){
                    if (!target._magicCoat) {
                        if (target._veloSagrado == 0) rival.fallAsleep(Math.randomInt(7)+1, target);
                        else $gameVariables.setValue(255, 96);
                    }
                    else {
                        this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                        this.magicCoatEffect(side);
                    } 
                } else{
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }

                break;

            case 3:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getPoisoned();
                }
                break;

            case 4:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                poke.getDamage(1 + (side == 1), -(daño/2), false, false);
                break;
            
            case 5:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                }
                break;
            
            case 6:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getFrozen();
                }
                break;
            
            case 7:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto) {
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getParalysed();
                }
                break;
            
            case 8:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;
            
            case 9:
                if (rival.estado == 5){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    poke.getDamage(1 + (side == 1), -(daño/2), false, false);
                } else{
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 10:
                if (this.movimientoEspejo(target._lastMovement) && target._lastMovement != 0){
                    if (side == 1) $gameVariables.setValue(100, target._lastMovement);
                    else $gameVariables.setValue(106, target._lastMovement);
                    $gameSwitches.setValue(115, true);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;
            
            case 11:
                user.boostStat(1, 1, poke);
                break;

            case 12:
                user.boostStat(2, 1, poke);
                break;

            case 17:
                user.evasionBoost();
                break;
            
            case 18:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;
            
            case 19:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(1, 1, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;
            
            case 20:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(2, 1, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 21:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(5, 1, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 24:
                if (!target._magicCoat){
                    if (!target._mist) target.reducePrecision();
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 25:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceEvasion();
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;
            
            case 26:
                user.resetStats(poke);
                target.resetStats(rival);
                //this.itemBoosts(poke, rival);
                $gameVariables.setValue(255, 60);
                break;
            
            case 27:
                if (user._bide == 0){
                    user._bide = 2;
                    $gameVariables.setValue(255, 61);
                } else {
                    user._bide --;
                    if (user._bide == 0){
                        if (target._sustituto > 0) this.dañoSustituto(user._bideDamage * 2, target);
                        else {
                            rival.getDamage(side, user._bideDamage * 2, true, target._endure);
                            if (target._rage) target.rageEffect(rival);
                        }
                        user._bideDamage = 0;
                        $gameVariables.setValue(255, 62);
                    } else $gameVariables.setValue(255, 61);
                    
                }
                break;

            case 28:
                if (user._outrage == 0){
                    user._outrage = Math.randomInt(1) + 2;
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._outrage --;
                    user._trapped = true;
                } else{
                    user._outrage --;
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    if (user._outrage == 0){
                        user.getConfused();
                        $gameSwitches.setValue(116, true);
                        user._trapped = false;
                    }
                }
                break;

            case 29:
                this.forceSwitch((1 + (side == 1)));
                break;

            case 30:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 31:
                user._conversion = true;
                var rand = Math.randomInt(4);
                poke.type1 =  $dataSkills[poke.skills()[rand].id].damage.elementId;
                poke.type2 = 0;
                $gameVariables.setValue(255, 63);
                break;

            case 32:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if ((Math.randomInt(100)+1) <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true); 
                }    
                break;

            case 33:
                poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp/2), false, false);
                break;

            case 34:
                if (!target._magicCoat) {
                    if (rival.estado == 0 && this._terrain != 12){
                        if (target._veloSagrado == 0) rival.getIntoxicated();
                        else $gameVariables.setValue(255, 96);
                    }else{
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                }
                else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 35:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (side == 1) this._payDay += 1;
                break;

            case 36:
                if (user._lightScreen == 0) {
                    user._lightScreen = 5;
                    $gameVariables.setValue(255, 64);
                }  
                else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;

            case 37:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if ((Math.randomInt(100)+1 <= $dataSkills[movement].effectChance) && !sustituto){
                    var rand = Math.randomInt(3);
                    if (rand == 0) rival.getFrozen();
                    else if (rand == 1) rival.getBurned();
                    else rival.getParalysed();
                }
                break;

            case 38:
                if (poke.estado != 5){
                    poke.fallAsleep(3, user);
                    poke.getDamage(1 + (side == 1), -(poke.mhp), false, false);
                    $gameSwitches.setValue(116, true);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;

            case 39:
                var damage = rival.hp;
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    $gameVariables.setValue(255, 65);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 40:
                if (user._trapped){
                    var max = user._criticInd >= 4;
                    if (!max) user._criticInd = user._criticInd + 1;
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    if (!max) user._criticInd = user._criticInd - 1;
                    user._trapped = false;
                } else {
                    user._trapped = true;
                    $gameVariables.setValue(256, 100);
                    $gameVariables.setValue(255, 66);
                }
                break;

            case 41:
                var damage = rival.hp/2;
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                $gameVariables.setValue(256, 100);
                break;

            case 42:
                var damage = 40;
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                $gameVariables.setValue(256, 100);
                break;

            case 43:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (movement == 20) target._bind = Math.randomInt(1) + 5;
                if (movement == 35) target._wrap = Math.randomInt(1) + 5;
                if (movement == 83) target._fireSpin = Math.randomInt(1) + 5;
                if (movement == 128) target._clamp = Math.randomInt(1) + 5;
                if (movement == 328) target._sandTomb = Math.randomInt(1) + 5;
                if (movement == 463) target._magmaStorm = Math.randomInt(1) + 5;
                if (movement == 611) target._infestation = Math.randomInt(1) + 5;
                if (movement == 615) target._snapTrap = Math.randomInt(1) + 5;
                $gameVariables.setValue(255, 67);
                break;

            case 44:
                var max = user._criticInd >= 4;
                if (!max) user._criticInd = user._criticInd + 1;
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (!max) user._criticInd = user._criticInd - 1;
                break;

            case 45:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;
                
            case 46:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 47:
                if (user._mist == 0){
                    user._mist = 5;
                    $gameVariables.setValue(255, 68);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;

            case 48:
                var max = user._criticInd >= 4;
                if (!max) user._criticInd += 2;
                $gameVariables.setValue(255, 70);
                break;

            case 49:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var info = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                var daño = $gameVariables.value(3);
                poke.getDamage(1 + (side == 1), Math.floor(daño/4), false, false);
                $gameVariables.setValue(258, $gameVariables.value(3));
                var datos = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                $gameVariables.setValue(259, datos);
                $gameSwitches.setValue(113, true);
                for (var i = 0; i < 5; ++i){
                    $gameVariables.setValue(250+i, info[i]);
                }
                $gameVariables.setValue(3, daño);
                user._autoDaño = true;
                break;

            case 50:
                if (!target._magicCoat) {
                    if (target._veloSagrado == 0) target.getConfused();
                    else $gameVariables.setValue(255, 96);
                }
                else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 51:
                user.boostStat(1, 2, poke);
                break;

            case 52:
                user.boostStat(2, 2, poke);
                break;

            case 53:
                user.boostStat(5, 2, poke);
                break;

            case 54:
                user.boostStat(3, 2, poke);
                break;

            case 55:
                user.boostStat(4, 2, poke);
                break;
                
            case 58:
                user.transformarEn(target, rival, poke);
                $gameVariables.setValue(255, 71);
                break;

            case 59:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(1, 2, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 60:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(2, 2, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 61:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(5, 2, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 62:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(3, 2, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 63:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(4, 2, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;
            
            case 66:
                if (user._reflect == 0) {
                    user._reflect = 5;
                    $gameVariables.setValue(255, 72);
                }  
                else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;


            case 67:
                if (rival.estado == 0 && this._terrain != 12){
                    if (!target._magicCoat) {
                        if (target._veloSagrado == 0) rival.getPoisoned();
                        else $gameVariables.setValue(255, 96);
                    }
                    else {
                        this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                        this.magicCoatEffect(side);
                    } 
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;

            case 68:
                if (rival.estado == 0 && this._terrain != 12){
                    if (!target._magicCoat) {
                        if (target._veloSagrado == 0) rival.getParalysed();
                        else $gameVariables.setValue(255, 96);
                    }
                    else {
                        this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                        this.magicCoatEffect(side);
                    } 
                }else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;
                

            case 69:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (!target._mist) target.reduceStat(1, 1, rival);   
                }    
                break;

            case 70:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (!target._mist) target.reduceStat(2, 1, rival);   
                }    
                break;

            case 71:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (!target._mist) target.reduceStat(5, 1, rival);   
                }    
                break;

            case 72:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (!target._mist) target.reduceStat(3, 1, rival);   
                }    
                break;

            case 73:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (!target._mist) target.reduceStat(4, 1, rival);   
                }    
                break;

            case 74:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (!target._mist) target.reducePrecision();  
                }    
                break;
            
            case 76:
                if (user._trapped == false) {
                    user._trapped = true;
                    $gameVariables.setValue(256, 100);
                    $gameVariables.setValue(255, 73);

                } else {
                    var sustituto = (target._sustituto > 0);
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    if ((Math.randomInt(100)+1 <= $dataSkills[movement].effectChance) && !sustituto){
                        if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                    }    
                    user._trapped  = false;
                }
                break;

            case 77:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) target.getConfused();
                }
                break;

            case 78:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getPoisoned();
                }
                break;

            case 79:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 80:
                if (user._sustituto <= 0 && poke.hp > (Math.floor(poke.mhp * 0.25))){
                    var vida = Math.floor(poke.mhp * 0.25);
                    user._sustituto = vida;
                    poke.getDamage(1 + (side == 1), vida, false, false);
                    $gameVariables.setValue(258, $gameVariables.value(3));
                    var datos = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                    $gameVariables.setValue(259, datos);
                    $gameVariables.setValue(3, 0);
                    $gameSwitches.setValue(113, true);

                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;

            case 81:
                if (!user._trapped){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._trapped = true;
                } else {
                    $gameVariables.setValue(255, 75);
                    user._trapped = false;
                }
                break;

            case 82:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                user._rage = true;
                break;

            case 83:
                if (target._lastMovement != 0){
                    user._mimicMove = target._lastMovement;
                    poke.forgetSkill(102);
                    poke.learnSkill(target._lastMovement);
                    $gameVariables.setValue(255, 76);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;

            case 84:
                var movimiento = Math.randomInt(694)+1;
                if (this.movimientoMetronomo(movimiento)){
                    //this.attack(user, target, movimiento, side);
                    $gameSwitches.setValue(115, true);
                    if (side == 1) $gameVariables.setValue(100, movimiento);
                    else $gameVariables.setValue(106, movimiento);
                } else {
                    this.useMove(user, target, movement, poke, rival, side);
                }
                break;

            case 85:
                if (target._magicCoat == false){
                    if (!rival.esTipo(12) && target._infected == false){
                        target._infected = true;
                        $gameVariables.setValue(255, 77);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 86:
                $gameVariables.setValue(255, 78);
                break;

            case 87:
                if (target._disabled == 0 && target._lastMovement != 0){
                    target._disabled = target._lastMovement;
                    target._turnosDisabled = Math.randomInt(4) + 4;
                    $gameVariables.setValue(255, 79);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 88:
                var damage = poke._level;
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 89:
                var R = 1 + Math.randomInt(10);
                var damage = (R + 5)/10 * poke._level;
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 90:
                if (this._first != side && $dataSkills[target._lastMovement].stypeId == 1){
                    damage = target._lastDamage * 2;
                    if (target._sustituto > 0) this.dañoSustituto(daño, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 91:
                if (target._encored == 0){
                    target._encored = 3;
                    $gameVariables.setValue(255, 80);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 92:
                var media = Math.floor((rival.hp + poke.hp)/2);
                var vidaR = media - rival.hp;
                var vidaU = media - poke.hp;

                if (vidaR > 0){
                    rival.getDamage(side, -vidaR, false, false);
                    poke.getDamage(1 + (side ==1), -vidaU, false, false);

                } else {
                    poke.getDamage(1 + (side == 1), -vidaU, false, false);
                    rival.getDamage(side, -vidaR, false, false);
                    
                }
                break;

            case 93:
                if (poke.estado == 5){
                    var sustituto = (target._sustituto > 0);
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    if ((Math.randomInt(100)+1 <= $dataSkills[movement].effectChance) && !sustituto){
                        if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                    }    
                }else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 94:
                if (this._first != side && target._lastMovement != 0){
                    user._conversion = true;
                    tipor = $dataSkills[target._lastMovement].damage.elementId;
                    var i = 1 + Math.randomInt(18);
                    while ($dataTablaTipos[tipor].Tabla[i] != 0 && $dataTablaTipos[tipor].Tabla[i] != 0.5){
                    if (i == 18) i = 1;
                    else ++i;
                    }
                    poke.type1 = i;
                    poke.type2 = 0;
                }
                $gameVariables.setValue(255, 63);
                break;

            case 95:
                user._target100 = true;
                $gameVariables.setValue(255, 81);
                break;

            case 96:
                if (target._lastMovement != 0){
                    poke.forgetSkill(166);
                    poke.learnSkill(target._lastMovement);
                    user._mimicMove = target._lastMovement;
                    $gameVariables.setValue(255, 76);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 98:
                if (poke.estado == 5){
                    var i = Math.randomInt(4);
                    while (poke.skills()[i].id == movement) i = Math.randomInt(4);
                    $gameSwitches.setValue(115, true);
                    if (side == 1) $gameVariables.setValue(100, poke.skills()[i].id);
                    else $gameVariables.setValue(106, poke.skills()[i].id);
                    //this.attack(user, target, poke.skills()[i].id, side);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 99:
                user._mismoDestino = true;
                $gameVariables.setValue(255, 82);
                break;

            case 100:
                var pot = 20;
                var life = (poke.hp/poke.mhp)*100;
                if (life <= 4.16) pot = 200;
                else if (life <= 10.41) pot = 150;
                else if (life <= 20.83) pot = 100;
                else if (life <= 35.41) pot = 80;
                else if (life <= 68.75) pot = 40;
                else if (life <= 100) pot = 20; 
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 101:
                if (target._lastMovement != 0 && target._lastMovement != 165){
                    if (!target._magicCoat){
                        var i = 0;
                        while (rival.skills()[i].id != target._lastMovement) ++i;
                        if (rival.pp[i] < 4) rival.pp[i] = 0;
                        else rival.pp[i] = rival.pp[i] - 4;
                        $gameVariables.setValue(255, 83);
                    } else {
                        this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                        this.magicCoatEffect(side);
                    } 
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 102:
                var pot = parseInt($dataSkills[movement].damage.formula);
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (damage >= rival.hp) damage = rival.hp - 1;
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 103:
                if (side == 1){
                    for (var i = 1; i <= $gameVariables.value(70); ++i){
                        $gameParty.allMembers()[i].estado = 0;
                    }
                } else {
                    for (var i = 0; i < 1; ++i){
                        $gameVariables.value(90 + i).estado = 0;
                    }
                }
                user._turnosIntoxicado = 0;
                user._dormido = 0;
                user._congelamiento = 0;
                $gameVariables.setValue(255, 84);
                //$dataTrainers[this._trainerId].pokeTeam.length
                break;

            case 104:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 105:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 106:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (poke.item == 0 && rival.item != 0){
                    poke.item = rival.item;
                    rival.item = 0;
                    $gameVariables.setValue(255, 85);
                }
                break;

            case 107:
                if (!target._atrapado) {
                    $gameVariables.setValue(255, 86);
                    target._atrapado = true;
                }
                else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 108:
                if (!target._pesadillas && rival.estado == 5){
                    target._pesadillas = true;
                    $gameVariables.setValue(255, 87);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 109:
                user.evasionBoost();
                user._minimized = true;
                break;

            case 110:
                if (poke.esTipo(8)){
                    if (poke.hp > Math.floor(poke.mhp/2)){
                        target._cursed = true;
                        poke.getDamage(1 + (side == 1), Math.floor(poke.mhp/2), false, false);
                        $gameSwitches.setValue(113, true);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    var sides = [];
                    var mensaje = [];
                    user.boostStat(1, 1, poke);
                    sides.push(side);
                    mensaje.push($gameVariables.value(255));
                    user.boostStat(2, 1, poke);
                    sides.push(side);
                    mensaje.push($gameVariables.value(255));
                    user.reduceStat(5, 2, poke);
                    sides.push(1 + (side == 1));
                    mensaje.push($gameVariables.value(255));
                    $gameVariables.setValue(267, sides);
                    $gameVariables.setValue(264, mensaje);
                }
                break;

            case 112:
                user._protectSeguidas += 1;
                var hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= ((100 / user._protectSeguidas));
                if (hit){
                    user._proteccion = true;
                    $gameVariables.setValue(255, 88);
                } else {
                    user._protectSeguidas = 0;
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 113:
                if (side == 1){
                    if (this._spikesRival < 3){
                        this._spikesRival += 1;
                        $gameVariables.setValue(255, 89);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    if (this._spikesUser < 3){
                    this._spikesUser += 1; 
                    $gameVariables.setValue(255, 89);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                }
                break;

            case 114:
                if (!user._foresight){
                user._foresight = true; 
                $gameVariables.setValue(255, 90);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 115:
                if (user._perishCount == 0){
                    user._perishCount = 4;
                    target._perishCount = 4;
                    $gameVariables.setValue(255, 91);
                    
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 116:
                if (this._weather != 4){
                    this._weather = 4;
                    $gameVariables.setValue(255, 92);
                }else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 117:
                user._protectSeguidas += 1;
                var hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= ((100 / user._protectSeguidas));
                if (hit){
                    user._endure = true;
                    $gameVariables.setValue(255, 93);
                } else {
                    user._protectSeguidas = 0;
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                user._endure = true;
                $gameVariables.setValue(255, 93);
                break;

            case 118:
                if (!user._trapped) user._trapped = true;
                user._rollout += 1;
                var pot = parseInt($dataSkills[movement].damage.formula) * (user._rollout + user._defenseCurl);
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                if (user._rollout == 5) user._trapped = false;
                break;

            case 119:
                if (!target._magicCoat) {
                    var mensaje = [];
                    if (target._veloSagrado == 0){
                        target.getConfused();
                        mensaje.push($gameVariables.value(255));
                    } else $gameVariables.setValue(255, 96);
                    target.boostStat(1, 1, rival);
                    mensaje.push($gameVariables.value(255));
                    $gameVariables.setValue(264, mensaje);
                    $gameSwitches.setValue(116, true);
                    $gameVariables.setValue(254, 1 + (side == 1));
                }
                else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 120:
                if (user._furyCutter < 4) user._furyCutter += 1;
                var pot = Math.pow(2, user._furyCutter)*10;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 121:
                if (rival._gender != poke._gender && rival._gender != 0 && target._enamorado == false){
                    target._enamorado = true;
                    $gameVariables.setValue(255, 94);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 122:
                var pot = pot = poke._happiness * 10/25;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 123:
                var random = Math.randomInt(10);
                if (random <= 3){
                    var pot = 40;
                    var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                    if (target._sustituto > 0) this.dañoSustituto(damage, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                }
                else if (random <= 6){
                    var pot = 80;
                    var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                    if (target._sustituto > 0) this.dañoSustituto(damage, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                }
                else if (random <= 8){
                    $gameSwitches.setValue(113, true);
                    $gameVariables.setValue(254, 1 + (side == 1));
                    rival.getDamage(1 + (side == 1), -80, false, false);
                }
                else {
                    var pot = 120;
                    var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                    if (target._sustituto > 0) this.dañoSustituto(damage, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                }
                break;

            case 124:
                var pot = (255 - poke._happiness) * 10/25;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 125:
                if (user._veloSagrado == 0){
                    user._veloSagrado = 5;
                    $gameVariables.setValue(255, 95);

                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 126:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                }
                break;

            case 127:
                var pot = 70;
                var magnitud = 0;
                var random = Math.randomInt(100);
                if (random < 5) pot = 10, magnitud = 4;
                else if (random < 15) pot = 30, magnitud = 5;
                else if (random < 35) pot = 50, magnitud = 6;
                else if (random < 65) pot = 70, magnitud = 7;
                else if (random < 85) pot = 90, magnitud = 8;
                else if (random < 95) pot = 110, magnitud = 9;
                else pot = 150, magnitud = 10;
                $gameVariables.setValue(112, magnitud);
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 128:
                //Relevo
                break;

            case 129:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;
            
            case 130:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (side == 1){
                    this._spikesUser = 0;
                    this._toxicSpikesUser = 0;
                    this._stealthRockUser = false;
                }
                else {
                    this._spikesRival = 0;
                    this._toxicSpikesRival = 0;
                    this._stealthRockRival = false;   
                }
                user._bind = false;
                user._fireSpin = false;
                user._infected = false;
                user._wrap = false;
                user._clamp = false;
                user._magmaStorm = false;
                user._sandTomb = false;
                user._snapTrap = false;
                break;

            case 131:
                var damage = 20;
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 133:
                if (this._weather == 2){
                    poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp*2/3), false, false);
                } else if (this._weather == 0){
                    poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp/2), false, false);
                } else {
                    poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp/4), false, false);
                }
                break;

            case 136:
                var tipo = tipoPoderOculto(poke);
                var pot = parseInt($dataSkills[movement].damage.formula);
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, tipo);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 137:
                if (this._weather != 3) {
                    $gameVariables.setValue(255, 97);
                    this._weather = 3;
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 138:
                if (this._weather != 2){
                    this._weather = 2;
                    $gameVariables.setValue(255, 98);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;
                
            case 139:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance){
                    user.boostStat(2, 1, poke);
                }
                break;

            case 140:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance){
                    user.boostStat(1, 1, poke);
                }
                break;

            case 141:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance){
                    var mensaje = [];
                    for(var i = 1; i <6; ++i){
                        user.boostStat(i, 1, poke);
                        mensaje.push($gameVariables.value(255));
                    } 
                    $gameVariables.setValue(264, mensaje);
                }
                break;

            case 143:
                if (poke.hp > (poke.mhp/2)){
                    poke.getDamage(1 + (side == 1), Math.floor(poke.mhp/2), false, false);
                    user.boostStat(1, 6, poke);
                    $gameSwitches.setValue(113, true);
                    $gameVariables.setValue(255, 0);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 144:
                user._boostStats = target._boostStats;
                for(var i = 1; i <6; ++i){
                    user.boostStat(i, 0, poke);
                } 
                $gameVariables.setValue(255, 99);
                break;

            case 145:
                if (this._first != side && $dataSkills[target._lastMovement].stypeId == 2 && target._lastDamage > 0){
                    var damage = 2 * target._lastDamage;
                    if (target._sustituto > 0) this.dañoSustituto(damage, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                }else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 146:
                if (user._trapped){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._trapped = false;
                } else {
                    user.boostStat(2, 1, poke);
                    user._trapped = true;
                }
                break;

            case 147:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if ((Math.randomInt(100)+1 <= $dataSkills[movement].effectChance) && !sustituto){
                    if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                }    
                break;

            case 148:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 149:
                if (target._premonicion == 0){
                    target._futureDamage = this.normalDamage(user, target, movement, poke, rival, side);
                    $gameVariables.setValue(3, 0);
                    target._premonicion = 3;
                    var idioma = $gameVariables.value(14);
                    if (idioma == 1) target._nombrePremonicion = $dataSkills[movement].nombre;
                    else target._nombrePremonicion = $dataSkills[movement].name;
                    $gameVariables.setValue(255, 100);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 150:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 151:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if ((Math.randomInt(100)+1 <= $dataSkills[movement].effectChance) && !sustituto){
                    if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                }    
                break;

            case 152:
                if (this._weather == 2){
                    user._trapped = true;
                    if (this.itHits(user, target, movement, rival, poke)){
                        daño = this.normalDamage(user, target, movement, poke, rival, side);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                    user._trapped = false;
                } else {
                    if (user._trapped){
                        daño = this.normalDamage(user, target, movement, poke, rival, side);
                        user._trapped = false;
                    } else {
                        $gameVariables.setValue(255, 101);
                        user._trapped = true;
                    }
                }
                break;

            case 153:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 154:
                //teleport
                break;

            case 155:
                if (side == 1){
                    var daños = [];
                    var mensajes = [];
                    for (var i = 1; i <= $gameVariables.value(70); ++i){
                        if ($gameParty.allMembers()[i].estado == 0 && $gameParty.allMembers()[i].hp > 0){
                            var pot = 5 + $gameParty.allMembers()[i].atk/10;
                            var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                            if (target._sustituto > 0){
                            this.dañoSustituto(damage, target);
                            daños.push(0); 
                            } 
                            else {
                                daño = rival.getDamage(side, damage, true, target._endure);
                                if (target._rage) target.rageEffect(rival);
                                daños.push(damage);
                            }
                            mensajes.push(102);
                        }
                    }
                    $gameVariables.setValue(3, 0);
                    $gameVariables.setValue(265, daños);
                    $gameVariables.setValue(264, mensajes);
                }
            break;

            case 156:
                if (user._flying){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._flying = false;
                    user._trapped = false;
                } else {
                    $gameVariables.setValue(255, 103);
                    user._flying = true;
                    user._trapped = true;
                }
                break;

            case 157:
                user.boostStat(2, 1, poke);
                user._defenseCurl = true;
                break;

            case 159:
                if (user._lastMovement == 0){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 160:
                if (user._outrage == 0){
                    var mensajes = [];
                    var sides = [];
                    if (poke.estado == 5) {
                        user._pesadillas = false;
                        user._dormido = 0;
                        poke.estado = 0;
                        sides.push(side);
                        mensajes.push(4);
                    }
                    if (rival.estado == 5) {
                        target._pesadillas = false;
                        target._dormido = 0;
                        rival.estado = 0;
                        sides.push(1 + (side == 1));
                        mensajes.push(4);
                    }
                    $gameVariables.setValue(267, sides);
                    user._outrage = 2;
                    user._trapped = true;
                    this._alboroto = true;
                    user._alboroto = true;
                    $gameVariables.setValue(264, mensajes);
                } else user._outrage -= 1;

                if (user._outrage == 0){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._trapped = false;
                    this._alboroto = false;
                    user._alboroto = false;
                } else {
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                }
                break;

            case 161:
                if (user._reservas < 3){
                    if (user._reservas == 0) user._preReserva = [user._stats[2], user._stats[4], user._boostStats[2], user._boostStats[4]];
                    user._reservas++;
                    user.boostStat(2, 1, poke);
                    user.boostStat(4, 1, poke);
                    $gameVariables.setValue(255, 104);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 162:
                if (user._reservas > 0){
                    var pot = 100 * user._reservas;
                    var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                    if (target._sustituto > 0) this.dañoSustituto(damage, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                    user._boostStats[2] = user._preReserva[2];
                    user._boostStats[4] = user._preReserva[3];
                    user._stats[2] = user._preReserva[0];
                    user._stats[4] = user._preReserva[1];
                    user._reservas = 0;
                    $gameVariables.setValue(255, 105);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 163:
                if (user._reservas > 0){
                    if (user._reservas == 1) cura = -Math.floor(poke.mhp/4);
                    else if (user._reservas == 2) cura = -Math.floor(poke.mhp/2);
                    else cura = -poke.mhp;
                    poke.getDamage(1 + (side == 1), cura, false, false);
                    user._boostStats[2] = user._preReserva[2];
                    user._boostStats[4] = user._preReserva[3];
                    user._stats[2] = user._preReserva[0];
                    user._stats[4] = user._preReserva[1];
                    user._reservas = 0;
                    $gameVariables.setValue(255, 105);
                    $gameSwitches.setValue(113, true);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 165:
                if (this._weather != 1){
                    this._weather = 1;
                    $gameVariables.setValue(255, 106);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 166:
                if (!target._tormento){
                    target._tormento = true;
                    $gameVariables.setValue(255, 107);
                }else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                
                break;

            case 167:
                if (!target._magicCoat) {
                    var mensaje = [];
                    if (target._veloSagrado == 0){
                        target.getConfused();
                        mensaje.push($gameVariables.value(255));
                    } else $gameVariables.setValue(255, 96);
                    target.boostStat(3, 1, rival);
                    mensaje.push($gameVariables.value(255));
                    $gameVariables.setValue(264, mensaje);
                    $gameSwitches.setValue(116, true);
                    $gameVariables.setValue(254, 1 + (side == 1));
                }
                else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 168:
                if (rival.estado == 0 && this._terrain != 12){
                    if (!target._magicCoat) {
                        if (target._veloSagrado == 0) rival.getBurned();
                        else $gameVariables.setValue(255, 96);
                    }
                    else {
                        this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                        this.magicCoatEffect(side);
                    } 
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }

                break;

            case 169:
                if (!target._magicCoat){
                    if (!target._mist){
                        var mensaje = [];
                        target.reduceStat(1, 2, rival);
                        mensaje.push($gameVariables.value(255));
                        target.reduceStat(3, 2, rival);
                        mensaje.push($gameVariables.value(255));  
                        $gameVariables.setValue(264, mensaje);
                        poke.getDamage(1 +(side == 1), poke.mhp, false, false);  
                    } else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 170:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 171:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 172:
                if (rival.estado == 3) $gameVariables.setValue(255, 9);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 173:
                break;

            case 174:
                var move = 161;
                if (this._terrain == 2) move = 402;
                else if (this._terrain == 3) move = 56;
                else if (this._terrain == 4) move = 157;
                else if (this._terrain == 5) move = 89;
                else if (this._terrain == 6) move = 59;
                else if (this._terrain == 7) move = 126;
                else if (this._terrain == 8) move = 247;
                else if (this._terrain == 9) move = 314;
                else if (this._terrain == 10) move = 434;
                else if (this._terrain == 11) move = 435;
                else if (this._terrain == 12) move = 584;
                $gameSwitches.setValue(115, true);
                if (side == 1) $gameVariables.setValue(100, move);
                else $gameVariables.setValue(106, move);
                break;

            case 175:
                user._carga = true;
                user.boostStat(4, 1, poke);
                break;

            case 176:
                if (target._taunted == 0){
                    target._taunted = 3;
                    $gameVariables.setValue(255, 108);

                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                
                break;

            case 177:
                break;
            
            case 178:
                if (poke.item != 0 && rival.item != 0){
                    var item = rival.item;
                    rival.item = poke.item;
                    poke.item = item;
                    $gameVariables.setValue(255, 109);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 179:
                if (user._habilidadOriginal == 0) user._habilidadOriginal = poke._habilidad;
                poke._habilidad = rival._habilidad;
                $gameVariables.setValue(255, 110);
                break;

            case 180:
                if (user._wish == 0){
                    user._futuraCura = Math.floor(-poke.mhp/2);
                    $gameVariables.setValue(3, 0);
                    user._wish = 2;
                    user._nombreWish = this._activePkmn;
                    if (side == 2) user._nombreWish = this._activeRival;
                    $gameVariables.setValue(255, 111);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 181:
                if (side == 1){
                    var pokemon = Math.randomInt($gameVariables.value(70))+1;
                    while (pokemon == this._activePkmn) pokemon = Math.randomInt($gameVariables.value(70))+1;
                    var ataque = Math.randomInt($gameParty.allMembers()[pokemon].skills().length);
                    while (!this.movimientoAyuda(ataque)) ataque = Math.randomInt($gameParty.allMembers()[pokemon].skills().length) + 1;
                    console.log($gameParty.allMembers()[pokemon].skills()[ataque].nombre);
                    $gameVariables.setValue(100, $gameParty.allMembers()[pokemon].skills()[ataque].id);
                    $gameSwitches.setValue(115, true);
                }
                break;

            case 182:
                if (!user._arraigo){
                    user._arraigo = true;
                    $gameVariables.setValue(255, 112);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 183:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var mensajes = [];
                var sides = [];
                user.reduceStat(1, 1, poke);
                mensajes.push($gameVariables.value(255));
                user.reduceStat(2, 1, poke);
                mensajes.push($gameVariables.value(255));
                sides.push(1 + (side == 1));
                sides.push(1 + (side == 1));
                $gameVariables.setValue(267, sides);
                $gameVariables.setValue(264, mensajes);
                break;

            case 184:
                if (!user._magicCoat){
                    user._magicCoat = true;
                    $gameVariables.setValue(255, 113);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 185:
                if (user._recycledItem > 0 && poke.item == 0){
                    $gameVariables.setValue(255, 114);
                    poke.item = user._recycledItem;
                    user._recycledItem = 0;

                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 186:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 187:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 188:
                if (target._yawn == 0 && rival.estado == 0){
                    target._yawn = 2;
                    $gameVariables.setValue(255, 115);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;
            
            case 189:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (rival.item > 0) $gameVariables.setValue(255, 116);
                break;

            case 190:
                var diferencia = rival.hp - poke.hp;
                if (diferencia > 0){
                    daño = rival.getDamage(side, diferencia, true, target._endure);

                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 191:
                var pot = Math.floor(150 * (poke.hp / poke.mhp));
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 192:
                break;

            case 193:
                if (!target._sellado){
                    target._sellado = true;
                    $gameVariables.setValue(255, 117);

                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 194:
                if (poke.estado == 1 || poke.estado == 3 || poke.estado == 4){
                    poke.estado = 0;
                    $gameVariables.setValue(255, 118);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 195:
                user._rabia = true;
                $gameVariables.setValue(255, 119);
                break;

            case 196:
                user._robo = true;
                $gameVariables.setValue(255, 120);
                break;

            case 197:
                var peso = user._weight;
                var pot = 20;
                if (peso >= 0 & peso <= 9.9) pot = 20;
                if (peso >= 10 & peso <= 24.9) pot = 40;
                if (peso >= 25 & peso <= 49.9) pot = 60;
                if (peso >= 50 & peso <= 99.9) pot = 80;
                if (peso >= 100 & peso <= 199.9) pot = 100;
                if (peso >= 200) pot = 120;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 198:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    switch (this._terrain){
                        case 1:
                            if (target._veloSagrado == 0 && this._terrain != 12) rival.getParalysed();
                            break;
                        case 2:
                            if (target._veloSagrado == 0 && this._terrain != 12 && this._terrain != 1) rival.fallAsleep(Math.randomInt(7)+1, target);
                            break;
                        case 3:
                            if (!target._mist) target.reduceStat(1, 1, rival);
                            break;
                        case 4:
                            if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                            break;
                        case 5:
                            if (!target._mist) target.reducePrecision();
                            break;
                        case 6:
                            if (target._veloSagrado == 0 && this._terrain != 12) rival.getFrozen();
                            break;
                        case 7:
                            if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                            break;
                        case 8:
                            if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                            break;
                        case 9:
                            if (!target._mist) target.reduceStat(5, 1, rival);
                            break;
                        case 10:
                            if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                            break;
                        case 11:
                            if (target._veloSagrado == 0 && this._terrain != 12) rival.getParalysed();
                            break;
                        case 12:
                            if (!target._mist) target.reduceStat(3, 1, rival);
                            break;
                    }
                }
                break;
            
            case 199:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var info = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                var daño = $gameVariables.value(3);
                poke.getDamage(1 + (side == 1), Math.floor(daño/3), false, false);
                $gameVariables.setValue(258, $gameVariables.value(3));
                var datos = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                $gameVariables.setValue(259, datos);
                $gameSwitches.setValue(113, true);
                for (var i = 0; i < 5; ++i){
                    $gameVariables.setValue(250+i, info[i]);
                }
                $gameVariables.setValue(3, daño);
                user._autoDaño = true;
                break;

            case 200:
                if (target._veloSagrado == 0) target.getConfused();
                else $gameVariables.setValue(255, 96);
                break;
            
            case 201:
                var sustituto = (target._sustituto > 0);
                var max = user._criticInd >= 4;
                if (!max) user._criticInd = user._criticInd + 1;
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (!max) user._criticInd = user._criticInd - 1;
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                }
                break;

            case 202:
                user._chapoteoLodo = true;
                $gameVariables.setValue(255, 121);
                break;

            case 203:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getIntoxicated();
                }
                break;

            case 204:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 205:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                user.reduceStat(3, 2, poke);
                $gameSwitches.setValue(116, true);
                break;

            case 206:
                if (!target._mist){
                    var mensaje = [];
                    target.reduceStat(1, 2, rival);
                    mensaje.push($gameVariables.value(255));
                    target.reduceStat(2, 2, rival);
                    mensaje.push($gameVariables.value(255));  
                    $gameVariables.setValue(264, mensaje); 
                } else $gameVariables.setValue(255, 69);
                break;

            case 207:
                var mensaje = [];
                user.boostStat(4, 2, poke);
                mensaje.push($gameVariables.value(255));
                user.boostStat(2, 2, poke);
                mensaje.push($gameVariables.value(255));  
                $gameVariables.setValue(264, mensaje); 
                break;

            case 208:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;
            
            case 209:
                var mensaje = [];
                user.boostStat(2, 2, poke);
                mensaje.push($gameVariables.value(255));
                user.boostStat(1, 2, poke);
                mensaje.push($gameVariables.value(255));  
                $gameVariables.setValue(264, mensaje); 
                break;

            case 210:
                var sustituto = (target._sustituto > 0);
                var max = user._criticInd >= 4;
                if (!max) user._criticInd = user._criticInd + 1;
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (!max) user._criticInd = user._criticInd - 1;
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getPoisoned();
                }
                break;

            case 211:
                user._hidrochorro = true;
                $gameVariables.setValue(255, 122);
                break;

            case 212:
                var mensaje = [];
                user.boostStat(4, 2, poke);
                mensaje.push($gameVariables.value(255));
                user.boostStat(3, 2, poke);
                mensaje.push($gameVariables.value(255));  
                $gameVariables.setValue(264, mensaje); 
                break;

            case 213:
                var mensaje = [];
                user.boostStat(5, 2, poke);
                mensaje.push($gameVariables.value(255));
                user.boostStat(1, 2, poke);
                mensaje.push($gameVariables.value(255));  
                $gameVariables.setValue(264, mensaje); 
                break;

            case 214:
                user._conversion = true;
                var tipo = 0;
                switch (this._terrain){
                    case 1:
                        tipo = 1;
                        break;
                    case 2:
                        tipo = 12;
                        break;
                    case 3:
                        tipo = 11;
                        break;
                    case 4:
                        tipo = 6;
                        break;
                    case 5:
                        tipo = 5;
                        break;
                    case 6:
                        tipo = 15;
                        break;
                    case 7:
                        tipo = 10;
                        break;
                    case 8:
                        tipo = 8;
                        break;
                    case 9:
                        tipo = 3;
                        break;
                    case 10:
                        tipo = 16;
                        break;
                    case 11:
                        tipo = 13;
                        break;
                    case 12:
                        tipo = 18;
                        break;
                }
                poke.type1 = tipo;
                poke.type2 = 0;
                $gameVariables.setValue(255, 63);
                break;

            case 215:
                poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp/2), false, false);
                if (poke.esTipo(3)) user._roost = true;
                if (poke.type1 == 3) poke.type1 = 0;
                if (poke.type2 == 3) poke.type2 = 0;
                break;

            case 216:
                $gameVariables.setValue(255, 123);
                this._gravedad = 5;
                break;

            case 217:
                if (user._granOjo == false){
                    user._granOjo = true;
                    $gameVariables.setValue(255, 124);
                }  else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 218:
                if (rival.estado == 5){
                    $gameVariables.setValue(255, 125);
                } 
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 219:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                user.reduceStat(5, 1, poke);
                $gameSwitches.setValue(116, true);
                break;

            case 220:
                var pot = 1 + ((target._stats[5])/(user._stats[5]))*25;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 221:
                break;

            case 222:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 223:
                var item = poke.item;
                var pot = 0;
                if ((item >= 149 & item <= 164) || (item >= 184 & item <= 200) || item == 660) pot = 80;
                else if (item >= 165 & item <= 180) pot = 90;
                else if ((item >= 181 & item <= 183) || (item >= 201 & item <= 212) || (item >= 661 & item <= 662)) pot = 100;
                if (pot > 0){   
                    var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                    if (target._sustituto > 0) this.dañoSustituto(damage, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 224:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 225:
                //si el rival tiene baya la roba + efecto
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 226:
                if (user._tailwind == 0){
                    user._tailwind = 4;
                    $gameVariables.setValue(255, 126);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 227:
                user.boostStat(Math.randomInt(5)+1, 2, poke);
                break;

            case 228:
                if (this._first != side && target._lastDamage > 0){
                    var damage = Math.floor(target._lastDamage * 1.5);
                    if (target._sustituto > 0) this.dañoSustituto(damage, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                    $gameVariables.setValue(256, 100);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 229:
                break;

            case 230:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var mensajes = [];
                var sides = [];
                user.reduceStat(4, 1, poke);
                mensajes.push($gameVariables.value(255));
                user.reduceStat(2, 1, poke);
                mensajes.push($gameVariables.value(255));
                sides.push(1 + (side == 1));
                sides.push(1 + (side == 1));
                $gameVariables.setValue(267, sides);
                $gameVariables.setValue(264, mensajes);
                break;

            case 231:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 232:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 233:
                if (target._embargo == false){
                    target._embargo = true;
                    $gameVariables.setValue(255, 127);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 234:
                if (poke.item > 0 && !user._embargo){
                    var sustituto = (target._sustituto > 0);
                    var item = poke.item;
                    var pot = 30;
                    if (item == 255) pot = 130;
                    else if (esFosil(item) || item == 215 || item == 106) pot = 100;
                    else if (esTabla(item) || item == 203 || item == 263 || item == 235) pot = 90;
                    else if ((item <= 111 && item >= 107) || (item <= 300 && item >= 298) || item == 194 || item == 303 || item == 265) pot = 80;
                    else if (esROM(item) || item == 227 || (item <= 271 && item >= 266)) pot = 70;
                    else if (item == 112 || item == 262 || item == 442 || item == 261 || item == 113 || item == 192 || item == 583) pot = 60;
                    else if (item == 301 || item == 221) pot = 50;
                    else if (item == 581 || item == 259 || item == 233) pot = 40;
                    else if (item <= 612 && item >= 606) pot = 20;
                    else if (esIncienso(item) || esPanuelo(item) || esBaya(item) || (item <= 590 && item >= 584) || (item <= 274 && item >= 272) || item == 190 || item == 191 || item == 256 || item == 257 || item == 207 || (item <= 253 && item >= 251) || item == 211 || item == 196 || (item <= 245 && item >= 242) || item == 302 || item == 228 || item == 199 || item == 260 || item == 214 || item == 195) pot = 10;
                    var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                    if (target._sustituto > 0) this.dañoSustituto(damage, target);
                    else {
                        daño = rival.getDamage(side, damage, true, target._endure);
                        if (target._rage) target.rageEffect(rival);
                    }
                    if (esBaya(item)) //efecto baya
                    if (item == 250){
                        if (!sustituto) 
                            if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                    }
                    if (item == 249){
                        if (!sustituto) 
                            if (target._veloSagrado == 0 && this._terrain != 12) rival.getIntoxicated();
                    }
                    if (item == 198 || item == 304){
                        if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true);  
                    }
                    if (item == 213){
                        if (!sustituto) 
                            if (target._veloSagrado == 0 && this._terrain != 12) rival.getParalysed();
                    }
                    if (item == 196){
                        if (target._enamorado == true){
                            target._enamorado = false;
                            $gameVariables.setValue(255, 128);
                        }
                    }
                    if (item == 222){
                        if (!sustituto) 
                            if (target._veloSagrado == 0 && this._terrain != 12) rival.getPoisoned();
                    }
                    if (item == 191){
                        //efecto white herb en rival.
                    }

                    $gameSwitches.setValue(125, true);

                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 235:
                if (poke.estado > 0 && target._veloSagrado == 0 && this._terrain != 12 && !(poke.estado == 5 && this._terrain != 1)){
                    if (poke.estado == 1) rival.getBurned();
                    if (poke.estado == 2) rival.getFrozen();
                    if (poke.estado == 3) rival.getParalysed();
                    if (poke.estado == 4) rival.getPoisoned();
                    if (poke.estado == 5) rival.fallAsleep(Math.randomInt(7)+1, target);
                    if (poke.estado == 6) rival.getIntoxicated();
                    poke.estado = 0;
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 236:
                var pot = 40;
                var i = 0;
                while (poke.skills()[i].id != movement) ++i;
                if (poke.pp[i] == 4) pot = 50;
                else if (poke.pp[i] == 3) pot = 60;
                else if (poke.pp[i] == 2) pot = 80;
                else if (poke.pp[i] == 1) pot = 100;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 237:
                if (target._healBlock == 0){
                    target._healBlock = 5;
                    $gameVariables.setValue(255, 129);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 238:
                var pot = 1 + Math.floor(rival.hp/rival.mhp)*120
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 239:
                if (!user._powerTrick){
                    user._powerTrick = true;
                    var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
                    user._stats[1] = (stats[user._boostStats[1]]/100) * poke.def;
                    user._stats[2] = (stats[user._boostStats[2]]/100) * poke.atk;
                } else {
                    user._powerTrick = false;
                    var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
                    user._stats[1] = (stats[user._boostStats[1]]/100) * poke.atk;
                    user._stats[2] = (stats[user._boostStats[2]]/100) * poke.def;
                }
                $gameVariables.setValue(255, 130);
                break;

            case 240:
                if (!target._bilis){
                    target._bilis = true;
                    $gameVariables.setValue(255, 131);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 241:
                if (user._conjuro == 0){
                    user._conjuro = 5;
                    $gameVariables.setValue(255, 132);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 242:
                var move2 = $gameVariables.value(106);
                if (side == 2) move2 = $gameVariables.value(100);
                if (this._first == side && $dataSkills[move2].stypeId != 3){
                    $gameSwitches.setValue(115, true);
                    if (side == 1) $gameVariables.setValue(100, move2);
                    else $gameVariables.setValue(106, move2);
                    user._yoPrimero = true;
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 243:
                if (this._lastMovement != 383 && this._lastMovement != 119 && this._lastMovement != 0){
                    $gameSwitches.setValue(115, true);
                    if (side == 1) $gameVariables.setValue(100, this._lastMovement);
                    else $gameVariables.setValue(106, this._lastMovement);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;
            
            case 244:
                var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
                var aux = target._boostStats[1];
                var aux2 = target._boostStats[3];
                target._boostStats[1] = user._boostStats[1];
                target._boostStats[3] = user._boostStats[3];
                user._boostStats[1] = aux;
                user._boostStats[3] = aux2;
                user._stats[1] = (stats[user._boostStats[1]]/100) * poke.atk;
                user._stats[3] = (stats[user._boostStats[3]]/100) * poke.mat;
                target._stats[1] = (stats[target._boostStats[1]]/100) * rival.atk;
                target._stats[3] = (stats[target._boostStats[3]]/100) * rival.mat;
                $gameVariables.setValue(255, 133);
                break;

            case 245:
                var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
                var aux = target._boostStats[2];
                var aux2 = target._boostStats[4];
                target._boostStats[2] = user._boostStats[2];
                target._boostStats[4] = user._boostStats[4];
                user._boostStats[2] = aux;
                user._boostStats[4] = aux2;
                user._stats[2] = (stats[user._boostStats[2]]/100) * poke.def;
                user._stats[4] = (stats[user._boostStats[4]]/100) * poke.mdf;
                target._stats[2] = (stats[target._boostStats[2]]/100) * rival.def;
                target._stats[4] = (stats[target._boostStats[4]]/100) * rival.mdf;
                $gameVariables.setValue(255, 134);
                break;

            case 246:
                var n = 0;
                for (var i = 1; i < 6; ++i){
                    if (target._boostStats[i] > 6) n += 1;
                }
                if (target._evasion > 100) n += 1;
                if (target._precision > 100) n+= 1;
                var pot = 60 + (n*20);
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 247:
                var usados = 0;
                for (var i = 0; i < poke.skills().length; ++i){
                    if (poke.skills()[i].id != 387) usados += user._usedMoves[i];
                }
                if (usados == poke.skills().length - 1 && poke.skills().length >= 2){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 248:
                if (target._changedAbility){
                    target._changedAbility = rival._ability;
                    $gameVariables.setValue(255, 135);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;
                
            case 249:
                var move2 = $gameVariables.value(106);
                if (side == 2) move2 = $gameVariables.value(100);
                if (this._first == side && $dataSkills[move2].stypeId != 3){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 250:
                if (side == 1){
                    if (this._toxicSpikesRival < 3){
                        this._toxicSpikesRival += 1;
                        $gameVariables.setValue(255, 136);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    if (this._toxicSpikesUser < 3){
                    this._toxicSpikesUser += 1; 
                    $gameVariables.setValue(255, 136);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                }
                break;

            case 251:
                var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
                var aux = target._boostStats[1];
                var aux2 = target._boostStats[2];
                var aux3 = target._boostStats[3];
                var aux4 = target._boostStats[4];
                var aux5 = target._boostStats[5];
                target._boostStats[1] = user._boostStats[1];
                target._boostStats[2] = user._boostStats[2];
                target._boostStats[3] = user._boostStats[3];
                target._boostStats[4] = user._boostStats[4];
                target._boostStats[5] = user._boostStats[5];
                user._boostStats[1] = aux1;
                user._boostStats[2] = aux2;
                user._boostStats[3] = aux3;
                user._boostStats[4] = aux4;
                user._boostStats[5] = aux5;
                user._stats[1] = (stats[user._boostStats[1]]/100) * poke.atk;
                user._stats[2] = (stats[user._boostStats[2]]/100) * poke.def;
                user._stats[3] = (stats[user._boostStats[2]]/100) * poke.mat;
                user._stats[4] = (stats[user._boostStats[4]]/100) * poke.mdf;
                user._stats[5] = (stats[user._boostStats[5]]/100) * poke.agi;
                target._stats[1] = (stats[target._boostStats[1]]/100) * rival.atk;
                target._stats[2] = (stats[target._boostStats[2]]/100) * rival.def;
                target._stats[3] = (stats[target._boostStats[3]]/100) * rival.mat;
                target._stats[4] = (stats[target._boostStats[4]]/100) * rival.mdf;
                target._stats[5] = (stats[target._boostStats[5]]/100) * rival.agi;
                $gameVariables.setValue(255, 137);
                break;

            case 252:
                if (!user._aquaRing){
                    user._aquaRing = true;
                    $gameVariables.setValue(255, 138);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 253:
                if (user._leviton == 0){
                    target._leviton = 5;
                    $gameVariables.setValue(255, 139);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 254:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var info = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                var daño = $gameVariables.value(3);
                poke.getDamage(1 + (side == 1), Math.floor(daño/3), false, false);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                }
                $gameVariables.setValue(258, $gameVariables.value(3));
                var datos = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                $gameVariables.setValue(259, datos);
                $gameSwitches.setValue(113, true);
                for (var i = 0; i < 5; ++i){
                    $gameVariables.setValue(250+i, info[i]);
                }
                $gameVariables.setValue(3, daño);
                user._autoDaño = true;
                break;

            case 255:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var info = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                var daño = $gameVariables.value(3);
                poke.getDamage(1 + (side == 1), Math.floor(daño/4), false, false);
                $gameVariables.setValue(258, $gameVariables.value(3));
                var datos = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                $gameVariables.setValue(259, datos);
                $gameSwitches.setValue(113, true);
                for (var i = 0; i < 5; ++i){
                    $gameVariables.setValue(250+i, info[i]);
                }
                $gameVariables.setValue(3, daño);
                user._autoDaño = true;
                break;

            case 256:
                if (user._diving){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._diving = false;
                    user._trapped = false;
                } else {
                    $gameVariables.setValue(255, 140);
                    user._diving = true;
                    user._trapped = true;
                }
                break;
            
            case 257:
                if (user._digging){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._digging = false;
                    user._trapped = false;
                } else {
                    $gameVariables.setValue(255, 141);
                    user._digging = true;
                    user._trapped = true;
                }
                break;

            case 258:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 259:
                target._reflect = 0;
                target._lightScreen = 0;
                target._veloSagrado = 0;
                target._mist = 0;
                //faltan cosas
                break;

            case 260:
                if (this._trickRoom == 0){
                    this._trickRoom = 5;
                } else {
                    this._trickRoom = 0;
                }
                $gameVariables.setValue(255, 142);
                break;

            case 261:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getFrozen();
                }
                break;

            case 262:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                target._whirlpool = Math.randomInt(1) + 5;
                $gameVariables.setValue(255, 67);
                break;

            case 263:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var info = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                var daño = $gameVariables.value(3);
                poke.getDamage(1 + (side == 1), Math.floor(daño/3), false, false);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getParalysed();
                }
                $gameVariables.setValue(258, $gameVariables.value(3));
                var datos = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                $gameVariables.setValue(259, datos);
                $gameSwitches.setValue(113, true);
                for (var i = 0; i < 5; ++i){
                    $gameVariables.setValue(250+i, info[i]);
                }
                $gameVariables.setValue(3, daño);
                user._autoDaño = true;
                break;

            case 264:
                if (user._bouncing){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._bouncing = false;
                    user._trapped = false;
                } else {
                    $gameVariables.setValue(255, 143);
                    user._bouncing = true;
                    user._trapped = true;
                }
                break;

            case 266:
                if (!target._magicCoat){
                    if (rival._gender != poke._gender && rival._gender != 0){
                        if (!target._mist) target.reduceStat(3, 2, rival);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 267:
                if (side == 1){
                    if (!this._stealthRockRival){
                        this._stealthRockRival = true;;
                        $gameVariables.setValue(255, 144);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    if (!this._stealthRockUser){
                    this._stealthRockUser = true; 
                    $gameVariables.setValue(255, 144);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                }
                break;

            case 268:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (!sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) target.getConfused();
                }
                break;

            case 269:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 270:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var info = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                var daño = $gameVariables.value(3);
                poke.getDamage(1 + (side == 1), Math.floor(daño/2), false, false);
                $gameVariables.setValue(258, $gameVariables.value(3));
                var datos = [$gameVariables.value(250), $gameVariables.value(251), $gameVariables.value(252), $gameVariables.value(253), $gameVariables.value(254)];
                $gameVariables.setValue(259, datos);
                $gameSwitches.setValue(113, true);
                for (var i = 0; i < 5; ++i){
                    $gameVariables.setValue(250+i, info[i]);
                }
                $gameVariables.setValue(3, daño);
                user._autoDaño = true;
                break;

            case 271:
                //cambios
                break;

            case 272:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (!target._mist) target.reduceStat(3, 2, rival);   
                }    
                break;

            case 273:
                if (user._shadows){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._shadows = false;
                    user._trapped = false;
                } else {
                    $gameVariables.setValue(255, 145);
                    user._shadows = true;
                    user._trapped = true;
                }
                break;

            case 274:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                }
                if ((Math.randomInt(100)+1) <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true); 
                }    
                break;

            case 275:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getFrozen();
                }
                if ((Math.randomInt(100)+1) <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true); 
                }    
                break;

            case 276:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getParalysed();
                }
                if ((Math.randomInt(100)+1) <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._sustituto <= 0 && this._first == side) target.switchFlinch(true); 
                }    
                break;

            case 277:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance){
                    user.boostStat(3, 1, poke);
                }
                break;

            case 278:
                var mensaje = [];
                user.precisionBoost();
                mensaje.push($gameVariables.value(255));
                user.boostStat(1, 1, poke);
                mensaje.push($gameVariables.value(255));  
                $gameVariables.setValue(264, mensaje); 
                break;

            case 279:
                break;

            case 280:
                var def = Math.floor((user._stats[2] + target._stats[2])/2);
                var espDef = Math.floor((user._stats[4] + target._stats[4])/2);
                target._stats[2] = def;
                target._stats[4] = espDef;
                user._stats[2] = def;
                user._stats[4] = espDef;
                $gameVariables.setValue(255, 146);
                break;

            case 281:
                var def = Math.floor((user._stats[1] + target._stats[1])/2);
                var espDef = Math.floor((user._stats[3] + target._stats[3])/2);
                target._stats[1] = def;
                target._stats[3] = espDef;
                user._stats[1] = def;
                user._stats[3] = espDef;
                $gameVariables.setValue(255, 147);
                break;

            case 282:
                if (this._wonderRoom == 0){
                    this._wonderRoom = 5;
                    $gameVariables.setValue(255, 148);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 283:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 284:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 285:
                user.boostStat(5, 2, poke);
                user._weight -= 100;
                if (user._weight < 0) user._weight = 0.1;
                break;

            case 286:
                if (this._gravedad == 0){
                    target._leviton = 3;
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 287:
                if (this._magicRoom == 0){
                    this._magicRoom = 5;
                    $gameVariables.setValue(255, 149);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 288:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (target._leviton > 0) target._leviton = 1;
                break;

            case 289:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 290:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;
                
            case 291:
                var mensaje = [];
                user.boostStat(5, 1, poke);
                mensaje.push($gameVariables.value(255));
                user.boostStat(4, 1, poke);
                mensaje.push($gameVariables.value(255));  
                user.boostStat(3, 1, poke);
                mensaje.push($gameVariables.value(255));  
                $gameVariables.setValue(264, mensaje); 
                break;

            case 292:
                var pot = 0;
                var ratio = Math.floor((target._weight/user._weight)*100);
                if (ratio >= 50) pot = 40;
                else if (ratio >= 33) pot = 60;
                else if (ratio >= 25) pot = 80;
                else if (rtio >= 20) pot = 100;
                else pot = 120;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 293:
                if (rival.esTipo(poke.tipo1) || (poke.tipo2 != 0 && rival.esTipo(2))){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 294:
                var pot = 0;
                var ratio = Math.floor((target._stats[5]/user._stats[5])*100);
                if (ratio >= 50) pot = 60;
                else if (ratio >= 34) pot = 80;
                else if (ratio >= 25) pot = 100;
                else pot = 120;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 295:
                if (!rival.esTipo(11)){
                    target._conversion = true;
                    rival.tipo1 = 11;
                    rival.tipo2 = 0;
                    $gameVariables.setValue(255, 150);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 296:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                user.boostStat(5, 1, poke);
                break;

            case 297:
                if (!target._mist){
                    var mensaje = [];
                    target.reducePrecision();
                    mensaje.push($gameVariables.value(255));
                    target.reduceStat(2, 1, rival);
                    mensaje.push($gameVariables.value(255));  
                    target.reduceStat(1, 1, rival);
                    mensaje.push($gameVariables.value(255)); 
                    $gameVariables.setValue(264, mensaje);
                    poke.getDamage(1 +(side == 1), poke.mhp, false, false);  
                } else $gameVariables.setValue(255, 69);
                break;

            case 298:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;
            
            case 299:
                //habilidad a simple
                break;

            case 300:
                //habilidad a habilidad del usuario
                break;

            case 301:

                break;

            case 302:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 303:
                var pot = (user._ecoVoz + 1) * 40;
                if (pot > 200) pot = 200;
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                user._ecoVoz++;
                break;

            case 304:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 305:
                target._boostStats = [6, 6, 6, 6, 6, 6];
                $gameVariables.setValue(255, 151);
                break;

            case 306:
                var mod = 0;
                for (var i = 0; i < 6; ++i){
                    var vent = user._boostStats[i] - 6;
                    if (vent > 0) mod += vent;
                }
                pot = 20 + (20*mod);
                var damage = this.calcularDaño(user, target, movement, poke, rival, side, pot, $dataSkills[movement].damage.elementId);
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                break;

            case 307:
                user._anticipios += 1;
                var hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= ((100 / user._anticipios));
                if (hit){
                    user._anticipio = true;
                    $gameVariables.setValue(255, 152);
                } else {
                    user._anticipios = 0;
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 308:
                $gameVariables.setValue(255, 0);
                $gameSwitches.setValue(111, true);
                $gameSwitches.setValue(110, false);
                break;

            case 309:
                var mensaje = [];
                user.reduceStat(4, 1, poke);
                mensaje.push($gameVariables.value(255));
                user.reduceStat(2, 1, poke);
                mensaje.push($gameVariables.value(255));
                user.boostStat(1, 2, poke);
                mensaje.push($gameVariables.value(255));
                user.boostStat(3, 2, poke);
                mensaje.push($gameVariables.value(255));  
                user.boostStat(5, 2, poke);
                mensaje.push($gameVariables.value(255)); 
                $gameVariables.setValue(264, mensaje); 
                $gameSwitches.setValue(116, true);
                break;

            case 310:
                poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp/2), false, false);
                break;

            case 311:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 312:
                if (user._flying){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    user._flying = false;
                    user._trapped = false;
                    target._trapped = false;
                } else {
                    $gameVariables.setValue(255, 153);
                    user._flying = true;
                    user._trapped = true;
                    target._trapped = true;
                    if (target._outrage > 0) target._outrage = 1;
                }
                break;

            case 313:
                var mensaje = [];
                user.boostStat(1, 1, poke);
                mensaje.push($gameVariables.value(255));  
                user.boostStat(5, 2, poke);
                mensaje.push($gameVariables.value(255)); 
                $gameVariables.setValue(264, mensaje); 
                break;

            case 314:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                //forzar cambio
                break;

            case 315:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (esBaya(rival.item)){
                    rival.item = 0;
                }
                break;

            case 316:
                $gameVariables.setValue(255, 0);
                $gameSwitches.setValue(111, true);
                $gameSwitches.setValue(110, false);
                break;

            case 317:
                var nivel = 1 + (this._weather == 2);
                var mensaje = [];
                user.boostStat(1, nivel, poke);
                mensaje.push($gameVariables.value(255));  
                user.boostStat(3, nivel, poke);
                mensaje.push($gameVariables.value(255)); 
                $gameVariables.setValue(264, mensaje); 
                break;

            case 318:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 319:
                user._conversion = true;
                poke.tipo1 = rival.tipo1;
                poke.tipo2 = rival.tipo2;
                $gameVariables.setValue(255, 154);
                break;

            case 320:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 321:
                var damage = poke.hp;
                if (target._sustituto > 0) this.dañoSustituto(damage, target);
                else {
                    daño = rival.getDamage(side, damage, true, target._endure);
                    if (target._rage) target.rageEffect(rival);
                }
                $gameVariables.setValue(256, 100);
                break;

            case 322:
                user.boostStat(3, 2, poke);
                user.boostStat(3, 1, poke);
                mensaje.push($gameVariables.value(255));  
                break;

            case 323:
                var mensaje = [];
                user.precisionBoost();
                mensaje.push($gameVariables.value(255));  
                user.boostStat(2, 1, poke);
                mensaje.push($gameVariables.value(255));  
                user.boostStat(1, 2, poke);
                mensaje.push($gameVariables.value(255)); 
                $gameVariables.setValue(264, mensaje); 
                break;

            case 324:
                if (rival.item == 0 && poke.item != 0){
                    rival.item = poke.item;
                    poke.item = 0;
                    $gameVariables.setValue(255, 155);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 325:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 326:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 327:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 328:
                var mensaje = [];  
                user.boostStat(1, 1, poke);
                mensaje.push($gameVariables.value(255));  
                user.boostStat(3, 1, poke);
                mensaje.push($gameVariables.value(255)); 
                $gameVariables.setValue(264, mensaje); 
                break;

            case 329:
                user.boostStat(2, 1, poke);
                user.boostStat(2, 2, poke);
                break;

            case 330:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12 && this._terrain != 1) rival.fallAsleep(Math.randomInt(7)+1, target);
                }
                break;

            case 331:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (!target._mist) target.reduceStat(5, 1, rival);   
                }    
                break;

            case 332:
                if (user._trapped){
                    var sustituto = (target._sustituto > 0);
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                        if (target._veloSagrado == 0 && this._terrain != 12) rival.getParalysed();
                    }
                    user._trapped = false;
                } else {
                    user._trapped = true;
                    $gameVariables.setValue(256, 100);
                    $gameVariables.setValue(255, 156);
                }
                break;

            case 333:
                if (user._trapped){
                    var sustituto = (target._sustituto > 0);
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                    if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                        if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                    }
                    user._trapped = false;
                } else {
                    user._trapped = true;
                    $gameVariables.setValue(256, 100);
                    $gameVariables.setValue(255, 157);
                }
                break;

            case 334:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) target.getConfused();
                }
                break;

            case 335:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                var mensajes = [];
                var sides = [];
                user.reduceStat(5, 1, poke);
                mensajes.push($gameVariables.value(255));
                user.reduceStat(4, 1, poke);
                mensajes.push($gameVariables.value(255));
                user.reduceStat(2, 1, poke);
                mensajes.push($gameVariables.value(255));
                sides.push(1 + (side == 1));
                sides.push(1 + (side == 1));
                sides.push(1 + (side == 1));
                $gameVariables.setValue(267, sides);
                $gameVariables.setValue(264, mensajes);
                break;

            case 336:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 337:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 338:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 339:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 340:
                if (poke.esTipo(12) || rival.esTipo(12)){
                    var mensajes = [];
                    var sides = [];
                    if (rival.esTipo(12)){
                        target.boostStat(3, 1, rival);
                        mensajes.push($gameVariables.value(255));
                        target.boostStat(1, 1, rival);
                        mensajes.push($gameVariables.value(255));
                        sides.push(1 + (side == 1));
                        sides.push(1 + (side == 1));
                    }
                    if (poke.esTipo(12)){
                        user.boostStat(3, 1, poke);
                        mensajes.push($gameVariables.value(255));
                        user.boostStat(1, 1, poke);
                        mensajes.push($gameVariables.value(255));
                        sides.push(side);
                        sides.push(side);
                    }
                    $gameVariables.setValue(267, sides);
                    $gameVariables.setValue(264, mensajes);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 341:
                if (side == 1){
                    if (!this._stickyWebRival){
                        this._stickyWebRival = true;
                        $gameVariables.setValue(255, 158);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    if (!this._stickyWebUser){
                    this._stickyWebUser = true; 
                    $gameVariables.setValue(255, 158);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                }
                break;

            case 342:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 343:
                $gameVariables.setValue(255, 0);
                $gameSwitches.setValue(111, true);
                $gameSwitches.setValue(110, false);
                break;

            case 344:
                if (!target._mist){
                    var mensaje = [];
                    target.reduceStat(3, 1, rival);
                    mensaje.push($gameVariables.value(255));  
                    target.reduceStat(1, 1, rival);
                    mensaje.push($gameVariables.value(255)); 
                    $gameVariables.setValue(264, mensaje); 
                } else $gameVariables.setValue(255, 69);
                break;

            case 345:
                if (!this._cortinaPlasma){
                    this._cortinaPlasma = true;
                    $gameVariables.setValue(255, 159);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 346:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                poke.getDamage(1 + (side == 1), -(daño/2), false, false);
                break;

            case 347:
                if (!target._mist){
                    var mensaje = [];
                    target.reduceStat(3, 1, rival);
                    mensaje.push($gameVariables.value(255));  
                    target.reduceStat(1, 1, rival);
                    mensaje.push($gameVariables.value(255)); 
                    $gameVariables.setValue(264, mensaje); 
                    //intercambiar pokemon
                } else $gameVariables.setValue(255, 69);
                break;

            case 348:
                var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
                for (var i = 0; i < 6; ++i){
                    var cambio = target._boostStats[i] - 6;
                    target._boostStats[i] = 6 - cambio;
                    var num = rival.atk;
                    if (i == 2) num = rival.def;
                    else if (i == 3) num = rival.mat;
                    else if (i == 4) num = rival.mdf;
                    else if (i == 5) num = rival.agi;
                    target._stats[i] = (stats[target._boostStats[i]]/100) * num;
                }
                $gameVariables.setValue(255, 160);
                break;

            case 349:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                poke.getDamage(1 + (side == 1), -Math.floor(daño*2/3), false, false);
                break;

            case 350:
                user._trucoDefensas += 1;
                var hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= ((100 / user._trucoDefensas));
                if (hit){
                    user._trucoDefensa = true;
                    $gameVariables.setValue(255, 161);
                } else {
                    user._trucoDefensas = 0;
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 351:
                if (poke.esTipo(12) || rival.esTipo(12)){
                    var mensajes = [];
                    var sides = [];
                    if (rival.esTipo(12)){
                        target.boostStat(2, 1, rival);
                        mensajes.push($gameVariables.value(255));
                        sides.push(1 + (side == 1));
                    }
                    if (poke.esTipo(12)){
                        user.boostStat(2, 1, poke);
                        mensajes.push($gameVariables.value(255));
                        sides.push(side);
                    }
                    $gameVariables.setValue(267, sides);
                    $gameVariables.setValue(264, mensajes);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 352:
                if (this._terrain != 2){
                    this._terrain = 2;
                    this._turnosTerreno = 5;
                    $gameVariables.setValue(255, 162);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 353:
                if (this._terrain != 12){
                    this._terrain = 12;
                    this._turnosTerreno = 5;
                    $gameVariables.setValue(255, 163);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 354:
                if (this._first == side){
                    target._electrified = true;
                    $gameVariables.setValue(255, 164);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 355:
                if (!target._atrapado) {
                    $gameVariables.setValue(255, 86);
                    target._atrapado = true;
                }
                else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 356:
                if (this._first == side){
                    user._escudoReales += 1;
                    var hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= ((100 / user._escudoReales));
                    if (hit){
                        user._escudoReal = true;
                        $gameVariables.setValue(255, 165);
                    } else {
                        user._escudoReales = 0;
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 357:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(1, 1, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 358:
                if (!target._magicCoat){
                    if (!target._mist) target.reduceStat(3, 1, rival);
                    else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 359:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance){
                    user.boostStat(2, 2, poke);
                }
                break;

            case 360:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getBurned();
                }
                break;

            case 362:
                if (this._first == side){
                    user._barreraEspinosas += 1;
                    var hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= ((100 / user._barreraEspinosas));
                    if (hit){
                        user._barreraEspinosa = true;
                        $gameVariables.setValue(255, 166);
                    } else {
                        user._barreraEspinosas = 0;
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 363:
                user.boostStat(4, 1, poke);
                break;

            case 364:
                if (poke.estado == 4 || poke.estado == 6){
                    if (!target._mist){
                        var mensaje = [];
                        target.reduceStat(5, 1, rival);
                        mensaje.push($gameVariables.value(255)); 
                        target.reduceStat(3, 1, rival);
                        mensaje.push($gameVariables.value(255));  
                        target.reduceStat(1, 1, rival);
                        mensaje.push($gameVariables.value(255)); 
                        $gameVariables.setValue(264, mensaje); 
                        //intercambiar pokemon
                    } else $gameVariables.setValue(255, 69);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 365:
                target.reduceStat(1, 1, rival);
                break;

            case 366:
                if (user._trapped){
                    var mensaje = [];
                    user.boostStat(5, 2, poke);
                    mensaje.push($gameVariables.value(255));
                    user.boostStat(4, 2, poke);
                    mensaje.push($gameVariables.value(255));
                    user.boostStat(3, 2, poke);
                    mensaje.push($gameVariables.value(255));
                    $gameVariables.setValue(264, mensaje);
                    user._trapped = false;
                } else {
                    user._trapped = true;
                    $gameVariables.setValue(256, 100);
                    $gameVariables.setValue(255, 167);
                }
                break;

            case 367:
                if (poke._ability == 57 || poke._ability == 58){
                    var mensaje = [];
                    user.boostStat(4, 1, poke);
                    mensaje.push($gameVariables.value(255));
                    user.boostStat(2, 1, poke);
                    mensaje.push($gameVariables.value(255));
                    $gameVariables.setValue(264, mensaje);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 368:
                if (!this._doblePaga){
                    this._doblePaga = true;
                    $gameVariables.setValue(255, 168);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 369:
                if (this._terrain != 1){
                    this._terrain = 1;
                    this._turnosTerreno = 5;
                    $gameVariables.setValue(255, 169);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 370:
                $gameVariables.setValue(255, 78);
                break;

            case 371:
                $gameVariables.setValue(255, 0);
                $gameSwitches.setValue(111, true);
                $gameSwitches.setValue(110, false);
                break;

            case 372:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto) {
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getParalysed();
                }
                break;

            case 373:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (target._leviton && !sustituto) target._leviton = false; 
                break;

            case 375:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                user.boostStat(1, 1, poke);
                break;

            case 376:
                $gameVariables.setValue(255, 0);
                $gameSwitches.setValue(111, true);
                $gameSwitches.setValue(110, false);
                break;

            case 377:
                if (user._lastMovement == 0){
                    user._escudoTatami = true;
                    $gameVariables.setValue(255, 170);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 378:
                target._powder = true;
                $gameVariables.setValue(255, 171);
                break;

            case 379:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 380:
                var sustituto = (target._sustituto > 0);
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (Math.randomInt(100)+1 <= $dataSkills[movement].effectChance && !sustituto){
                    if (target._veloSagrado == 0 && this._terrain != 12) rival.getFrozen();
                }
                break;

            case 381:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 382:
                if (this._weather == 1){
                    poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp*2/3), false, false);
                } else {
                    poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp/2), false, false);
                }
                break;

            case 383:
                if (user._lastMovement == 0){
                    daño = this.normalDamage(user, target, movement, poke, rival, side); 
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 384:
                if (this._first == side){
                    user._bunkers += 1;
                    var hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= ((100 / user._bunkers));
                    if (hit){
                        user._bunker = true;
                        $gameVariables.setValue(255, 172);
                    } else {
                        user._bunkers = 0;
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 385:
                if (!target._atrapado) {
                    $gameVariables.setValue(255, 86);
                    target._atrapado = true;
                }
                else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 386:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (rival.estado == 1) rival.estado = 0;
                break;

            case 387:
                if (this._terrain == 2){
                    poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp*2/3), false, false);
                } else {
                    poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp/2), false, false);
                }
                break;

            case 388:
                poke.getDamage(1 + (side == 1), -target._stats[1], false, false);
                target.reduceStat(1,1,rival);
                break;

            case 389:
                $gameVariables.setValue(255, 0);
                $gameSwitches.setValue(111, true);
                $gameSwitches.setValue(110, false);
                break;

            case 390:
                if (rival.estado == 0 && this._terrain != 12){
                    if (!target._magicCoat) {
                        var mensaje = [];
                        if (target._veloSagrado == 0) rival.getPoisoned();
                        else $gameVariables.setValue(255, 96);
                        mensaje.push($gameVariables.value(255));
                        if (!target._mist) target.reduceStat(5, 1, rival);
                        else $gameVariables.setValue(255, 69);
                        mensaje.push($gameVariables.value(255));
                        $gameVariables.setValue(264, mensaje);
                    }
                    else {
                        this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                        this.magicCoatEffect(side);
                    } 
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);  
                }
                break;

            case 391:
                $gameVariables.setValue(255, 173);
                user._critic100 = true;
                break;

            case 392:
                if (poke._ability == 57 || poke._ability == 58){
                    var mensaje = [];
                    user.boostStat(3, 1, poke);
                    mensaje.push($gameVariables.value(255));
                    user.boostStat(1, 1, poke);
                    mensaje.push($gameVariables.value(255));
                    $gameVariables.setValue(264, mensaje);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 393:
                target._mordaza = 2;
                if (this._first != side) target._mordaza = 3;
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 394:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 395:
                if (this._terrain != 9){
                    this._terrain = 9;
                    this._turnosTerreno = 5;
                    $gameVariables.setValue(255, 174);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 396:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (!target._mist) target.reduceStat(1, 1, rival);
                break;

            case 397:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (!target._mist) target.reduceStat(2, 1, rival);
                break;

            case 398:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (poke.esTipo(10)){
                  user._conversion = true; 
                  if (poke.type1 == 10) poke.type1 = 0;
                  else poke.type2 = 0; 
                }
                break;

            case 399:
                var velocidad = user._stats[5];
                user._stats[5] = target._stats[5];
                target._stats[5] = velocidad;
                $gameVariables.setValue(255, 175);
                break;

            case 400:
                if (rival.estado != 0){
                    rival.estado = 0;
                    poke.getDamage(1 + (side == 1), -Math.floor(poke.mhp/2), false, false);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 401:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 402:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (this._first != side) target._abilityLock = true;
                break;

            case 403:
                $gameVariables.setValue(255, 176);
                if (this._first == side){
                    if (target._lastMovement != 0){
                        if (side == 2) $gameVariables.setValue(100, target._lastMovement);
                        else $gameVariables.setValue(106, target._lastMovement);
                    } else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                } else $gameSwitches.setValue(41, true);
                break;

            case 404:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 405:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                user.reduceStat(2, 1, poke);
                $gameSwitches.setValue(116, true);
                break;

            case 406:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 407:
                if (user._veloAurora == 0 && this._weather == 1){
                    user._veloAurora = 5;
                    $gameVariables.setValue(255, 176);
                }else {
                        $gameVariables.setValue(255, 0);
                        $gameSwitches.setValue(111, true);
                        $gameSwitches.setValue(110, false);
                    }
                break;

            case 408:
                if ($dataSkills[target._lastMovement].stypeId == 1){
                    daño = this.normalDamage(user, target, movement, poke, rival, side);
                } else {
                    $gameVariables.setValue(255, 0);
                    $gameSwitches.setValue(111, true);
                    $gameSwitches.setValue(110, false);
                }
                break;

            case 409:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 410:
                var stats = [25, 29, 33, 40, 50, 67, 100, 150, 200, 250, 300, 350, 400];
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                for (var i = 0; i < 6; ++i){
                    var cambio = target._boostStats[i] - 6;
                    if (cambio > 0) user._boostStats[i] = 6 + cambio;
                    var num = poke.atk;
                    if (i == 2) num = poke.def;
                    else if (i == 3) num = poke.mat;
                    else if (i == 4) num = poke.mdf;
                    else if (i == 5) num = poke.agi;
                    user._stats[i] = (stats[user._boostStats[i]]/100) * num;
                }
                break;

            case 411:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 412:
                if (!target._magicCoat){
                    if (!target._mist){
                        var mensaje = [];
                        target.reduceStat(3, 1, rival);
                        mensaje.push($gameVariables.value(255));
                        target.reduceStat(1, 1, rival);
                        mensaje.push($gameVariables.value(255));  
                        $gameVariables.setValue(264, mensaje);
                        poke.getDamage(1 +(side == 1), poke.mhp, false, false);  
                    } else $gameVariables.setValue(255, 69);
                } else {
                    this.useMove(target, user, movement, rival, poke, 1 + (side == 1));
                    this.magicCoatEffect(side);
                } 
                break;

            case 413:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 414:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                break;

            case 415:
                daño = this.normalDamage(user, target, movement, poke, rival, side);
                if (this._terrain != 9){
                    this._terrain = 9;
                    this._turnosTerreno = 5;
                    $gameVariables.setValue(255, 174);
                }
                break;

            default:
                break;

        }
    }
    return daño;
}

Game_Combat.prototype.calcularDaño = function(user, target, movement, poke, rival, side, pot, tipo){
    //var tipo = $dataSkills[movement].damage.elementId;
    //POTENCIA

    if (this._cortinaPlasma && tipo == 1){
        tipo = 13;
    }

    if (movement == 204){
        if ($gameVariables.value(5000)._weather == 4) tipo = 6, pot = pot*2;
        if ($gameVariables.value(5000)._weather == 3) tipo = 11, pot = pot*2;
        if ($gameVariables.value(5000)._weather == 2) tipo = 10, pot = pot*2;
        if ($gameVariables.value(5000)._weather == 1) tipo = 15, pot = pot*2;
    }
    if (movement == 449 && esTabla(poke.item)){
        tipo = tipoTabla(poke.item);
    }
    if (movement == 546 && esROM(poke.item)){
        tipo = tipoROM(poke.item);
    }
    if (movement == 718 && esROM(poke.item)){
        tipo = tipoTabla(poke.item);
    }
    if (movement == 686) tipo = poke.type1;
    if (user._electrified) tipo = 13;
    if (this._terrain == 1 && tipo == 13) pot = pot * 1.5;
    if (this._terrain == 2 && tipo == 12) pot = pot * 1.5;
    if (this._terrain == 9 && tipo == 14) pot = pot * 1.5;
    if (this._terrain == 2 && (movement == 89 || movement == 222 || movement == 523)) pot = pot/2;
    if (this._terrain == 12 && tipo == 16) pot = pot/2;
    if (user._yoPrimero) pot = pot * 1.5;
    if (target._lastMissed && movement == 707) pot = pot*2;
    if (target._diving && user._whirlpool > 0) pot = pot*2;
    if (user._carga && tipo == 13) pot = pot*2;
    if (tipo == 10 && (user._hidrchorro || target._hidrochorro)) pot = pot/3;
    if (tipo == 13 && (user._chapoteoLodo || target._chapoteoLodo)) pot = pot/2;
    if ($dataSkills[movement].stypeId < 3 && target._veloAurora > 0) pot = pot/2;
    if ($dataSkills[movement].stypeId == 1 && target._reflect > 0) pot = pot/2;
    if ($dataSkills[movement].stypeId == 1 && poke.estado == 1 && movement != 263) pot = pot/2;
    if ($dataSkills[movement].stypeId == 2 && target._lightScreen > 0) pot = pot/2;
    if ((movement == 76 || movement == 669) && this._weather > 0 && this._weather != 2) pot = pot/2;
    if (movement == 506 && rival.estado > 0) pot = pot * 2;
    if (this._weather == 2 && tipo == 10) pot = pot * 1.5;
    if (this._weather == 2 && tipo == 11) pot = pot/2;
    if (this._weather == 3 && tipo == 10) pot = pot/2;
    if (this._weather == 3 && tipo == 11) pot = pot * 1.5;
    if (target._flying && ($dataSkills[movement].effectId == 150 || $dataSkills[movement].effectId == 147)) pot = pot*2;
    if (movement == 362 && rival.hp < (rival.mhp/2)) pot = pot*2;
    if (movement == 512 && poke.item == 0) pot = pot * 2;
    if (movement == 371 && this._first != side) pot = pot*2;
    if (movement == 372 && target._autoDaño) pot = pot*2;
    if (movement == 263 && poke.estado > 0) pot = pot*2;
    if (movement == 474 && rival.estado == 4) pot = pot*2;
    if (movement == 358 && rival.estado == 5){
        pot = pot*2;
        rival.estado = 0;
    }
    if (movement == 265 && rival.estado == 3){
        pot = pot*2;
        rival.estado = 0;       
    }
    if (movement == 279 && this._first != side && target._lastDamage > 0){
        if ($dataSkills[target._lastMovement].stypeId < 3) pot = pot*2;
    }
    if (movement == 89 && target._digging) pot = pot*2;
    if ((movement == 57 || movement == 250) && target._diving) pot = pot*2;
    if (target._minimized && movement == 23) pot = pot*2;

    if (movement == 167){
        if ($gameVariables.value(257) == 1) pot = pot*3;
        else if ($gameVariables.value(257) == 2) pot = pot*2;
    }
    
    //VALOR ALEATORIO
    var v = Math.floor(Math.random() * (100 - 85) + 85);

    //NIVEL
    var n = poke._level;

    //STAB
    var bon = 100;
    if (poke.esTipo(tipo)) bon = 150;
    bon = bon/100;

    //EFECTIVIDAD
    var ef = rival.efectividad(movement, this._gravedad, user, target, poke) / 100;
    if (movement == 560){
        ef = (rival.efectividad(movement, this._gravedad, user, target, poke) / 100) * (rival.efectividad(314, this._gravedad, user, target, poke) / 100)
    }

    //ATAQUE Y DEFENSA
    if ($dataSkills[movement].stypeId == 1){
        var atk = user._stats[1];
        if (movement == 492) atk = target._stats[1];
        var def = target._stats[2];
        if ($dataSkills[movement].effectId == 304) def = rival.def;
        if (this._wonderRoom > 0){
           def = target._stats[4]; 
           if (movement == 498) def = rival.mdf;
        } 
    }
    else if ($dataSkills[movement].stypeId == 2){
        var atk = user._stats[3];
        var def = target._stats[4];
        if (this._wonderRoom > 0 || $dataSkills[movement].effectId == 283) def = target._stats[2];
        if (this._wonderRoom > 0 && $dataSkills[movement].effectId == 283) def = target._stats[4];
    }
    
    console.log("bon = " + bon + " ef = " + ef + " v = " + v + " n = " + n + " atk = " + atk + " pot = " + pot + " def = " + def );
    //DAÑO
    var daño = Math.floor(0.01*bon*ef*v*(((0.2*n+1)*atk*pot)/(25*def)+2));

    //CRÍTICO
    var random = Math.randomInt(10000);
    if ($dataSkills[movement].effectId == 289 || user._critic100) random = this._criticIndex[user._criticInd] - 1;
    user._critic100 = false;
    if ((random < this._criticIndex[user._criticInd]) && target._conjuro == 0) {
        $gameSwitches.setValue(112, true);
        daño = daño*2;
    }
    return daño;
}

Game_Combat.prototype.dañoSustituto = function(daño, target){
    if (daño > target._sustituto) daño = target._sustituto;
    target._sustituto = target._sustituto - daño;
    $gameVariables.setValue(255, 74);
}

Game_Combat.prototype.itHits = function(user, target, movement, rival, poke){
    if ($dataSkills[movement].scope != 11){
        if (rival.hp == 0) return false;
        if ($dataSkills[movement].speed > 0 && target._anticipio){
            $gameSwitches.setValue(33, true);
            return false;
        }
        if ($dataSkills[movement].stypeId == 3 && target._trucoDefensa){
            $gameSwitches.setValue(34, true);
            return false;
        }
        if ($dataSkills[movement].stypeId < 3 && target._escudoReal){
            $gameSwitches.setValue(35, true);
            return false;
        }
        if (target._barreraEspinosa & movement != 589 && movement != 590){
            $gameSwitches.setValue(36, true);
            return false;
        }
        if ($dataSkills[movement].stypeId < 3 && target._escudoTatami){
            $gameSwitches.setValue(37, true);
            return false;
        }
        if ($dataSkills[movement].stypeId < 3 && target._bunker){
            $gameSwitches.setValue(38, true);
            return false;
        }
        if (this._terrain == 9 && !rival.esTipo(3) && !target._leviton && rival.item != 584 && $dataSkills[movement].speed > 0 && movement != 228) return false;
        if (movimientoDeCarga(movement, user, this._weather)) return true; 
        if ((movement == 156 || movement == 281) && (this._terrain == 12 || this._terrain != 1)) return false;
        if ((movement == 19 || movement == 13 || movement == 130 || movement == 143 || movement == 553 || movement == 554 || movement == 601 || movement == 507 || movement == 340) && user._trapped == false) return true;
        if ((user._bide == 0 || user._bide == 1 || user._bide == 2) && movement == 117) return true;
        if (!target._proteccion || (movement == 590 ||movement == 589 || movement == 364 || $dataSkills[movement].effectId == 273)){
            if (target._bouncing && movement != 479 && movement != 542 && movement != 614) return false;
            if (target._shadows) return false;
            if (target._diving && movement != 57 && movement != 250) return false;
            if (target._flying && movement != 16 && movement != 18 && movement != 87 && movement != 239 && movement != 327 && movement != 479 && movement != 542 && movement != 614) return false;
            if (target._digging && movement != 89 && movement != 222) return false; 
            if (movement == 562 && !esBaya(user._recycledItem)) return false;
            if (rival.efectividad(movement, this._gravedad, user, target, poke) > 0){
                var hit = false;
                var precision = user._precision/100;
                var evasion = target._evasion/100;
                if (user._granOjo || target._granOjo){
                    precision = 100;
                    evasion = 100;
                }
                hit = (Math.floor(Math.random(100) + 1)) <= ($dataSkills[movement].successRate * (precision) * (evasion));
                if (this._weather == 1 && movement == 59) hit = true;
                if (this._weather == 2 && (movement == 87 || movement == 542)) hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= (50 * (user._precision/100) * (target._evasion/100));
                if (this._weather == 3 && (movement == 87 || movement == 542)) hit = true;
                if ($dataSkills[movement].effectId == 18 || $dataSkills[movement].effectId == 79 || movement == 102 || movement == 574) hit = true;
                if (target._minimized && movement == 23) hit = (Math.floor(Math.random() * (100 - 1) + 1)) <= ($dataSkills[movement].successRate * (user._precision/100));
                if (user._target100){
                    hit = true;
                    user._target100 = false;
                }
                if (movement == 264 && target._lastDamage > 0) hit = false;
                if (target._sustituto && $dataSkills[movement].scope != 11 && $dataSkills[movement].stypeId == 3) hit = false;
                return hit;
    
            } else{
                $gameVariables.setValue(255, 8);
                return false;
            }

        } else{
            $gameSwitches.setValue(32, true);
            return false;
        }

    } else return true;
}

Game_Combat.prototype.ableToAttack = function(user, target){
    return !(user.hasFlinched());
}

Game_Combat.prototype.ableToMove = function(side, move){
    var pokemon = $gameVariables.value(90 + this._activeRival);
    var battler = this._rivalFighter;
    if (side == 1) {
        pokemon = $gameParty.allMembers()[this._activePkmn];
        battler = this._activeFighter;
    }
    var mensaje = 0;
    if (battler.hasFlinched()){
        mensaje = 6;
    }
    else {
        if (pokemon.isFrozen(battler, move)) mensaje = 2;
        if (pokemon.isParalysed(battler)) mensaje = 3;
        if (pokemon.isAsleep(battler)) mensaje = 5;
    }
    if ($gameVariables.value(255) == 0) $gameVariables.setValue(255, mensaje);
    if (mensaje > 0){
        battler._trapped = false;
        battler._outrage = 0;
        battler._furyCutter = 0;
    }
    return (mensaje == 0);
}

Game_Combat.prototype.magicCoatEffect = function(side){
    $gameVariables.setValue(254, 1 + (side == 1));
    $gameSwitches.setValue(121, true);
}

Game_Combat.prototype.movimientoMetronomo = function(movement){
    return (movement != 203 & movement != 364 & movement != 343 & movement != 274 & movement != 448 & movement != 165 & movement != 68 & movement != 383 & movement != 197 & movement != 166 & movement != 243 & movement != 102 & movement != 194 & movement != 119 & movement != 182 & movement != 264 & movement != 270 & movement != 289 & movement != 266 & movement != 214 & movement != 415 & movement != 271 & movement != 382);
}

Game_Combat.prototype.movimientoEspejo = function(movement){
    return (movement != 119 && movement != 367 && movement != 267 && movement != 364 && movement != 274 && movement != 195 && movement != 277 && movement != 286 && movement != 244 && movement != 243 && movement != 118 && movement != 102 && movement != 227 && movement != 113 && movement != 248 && movement != 191 && movement != 390 && movement != 264 && movement != 115 && movement != 270 && movement != 289 && movement != 214 && movement != 201 && movement != 446 && movement != 144 && movement != 219 && movement != 382);
}

Game_Combat.prototype.movimientoAyuda = function(movement){
    return (movement != 203 & movement != 364 & movement != 343 & movement != 274 & movement != 448 & movement != 165 & movement != 68 & movement != 383 & movement != 197 & movement != 166 & movement != 243 & movement != 102 & movement != 194 & movement != 119 & movement != 182 & movement != 264 & movement != 270 & movement != 289 & movement != 266 & movement != 214 & movement != 415 & movement != 271 & movement != 382);
}

Game_Combat.prototype.movimientoRobo = function(move){
    return (move == 14 || move == 54 || move == 74 || move == 96 || move == 97 || move == 104 || move == 105 || move == 106 || move == 107 || move == 110 || move == 111 || move == 112 || move == 113 || move == 115 || move == 116 || move == 133 || move == 135 || move == 151 || move == 156 || move == 159 || move == 164 || move == 187 || move == 208 || move == 215 || move == 219 || move == 234 || move == 235 || move == 236 || move == 244 || move == 254 || move == 256 || move == 268 || move == 275 || move == 287 || move == 293 || move == 294 || move == 303 || move == 312 || move == 322 || move == 334 || move == 336 || move == 339 || move == 347 || move == 349 || move == 355 || move == 366 || move == 367 || move == 397 || move == 417 || move == 455 || move == 456 || move == 160 || move == 273 || move == 278 || move == 286 || move == 361 || move == 379 || move == 381 || move == 392 || move == 393 || move == 461 || move == 468 || move == 561 || move == 602);
}


Game_Combat.prototype.efecto187 = function(side){
    var mensajes = [];
    var idioma = $gameVariables.value(14);
    if (side == 1){
        var target = this._rivalFighter;
        if (target._reflect > 0) {
            target._reflect = 0;
            var mensaje = "It destroyed the foe " + $gameVariables.value(90 + this._activeRival).name + "'s Reflect!";
            if (idioma == 1) mensaje = "Destruyó el Reflejo del " + $gameVariables.value(90 + this._activeRival).name + " enemigo!";
            mensajes.push(mensaje);
        }
        if (target._lightScreen > 0) {
            target._lightScreen = 0;
            var mensaje = "It destroyed the foe " + $gameVariables.value(90 + this._activeRival).name + "'s Light Screen!";
            if (idioma == 1) mensaje = "Destruyó la Pantalla Luz del " + $gameVariables.value(90 + this._activeRival).name + " enemigo!";
            mensajes.push(mensaje);
        }
        if (target._veloAurora > 0) {
            target._veloAurora = 0;
            var mensaje = "It destroyed the foe " + $gameVariables.value(90 + this._activeRival).name + "'s Aurora Veil!";
            if (idioma == 1) mensaje = "Destruyó el Velo Aurora del " + $gameVariables.value(90 + this._activeRival).name + " enemigo!";
            mensajes.push(mensaje);
        }
    } else {
        var target = this._activeFighter;
        if (target._reflect > 0) {
            target._reflect = 0;
            var mensaje = "It destroyed " + $gameParty.allMembers()[this._activePkmn].name() + "'s Reflect!";
            if (idioma == 1) mensaje = "Destruyó el Reflejo de " + $gameParty.allMembers()[this._activePkmn].name() + " !";
            mensajes.push(mensaje);
        }
        if (target._lightScreen > 0) {
            target._lightScreen = 0;
            var mensaje = "It destroyed " + $gameParty.allMembers()[this._activePkmn].name() + "'s Light Screen!";
            if (idioma == 1) mensaje = "Destruyó la Pantalla Luz de " + $gameParty.allMembers()[this._activePkmn].name() + "!";
            mensajes.push(mensaje);
        }
        if (target._veloAurora > 0) {
            target._veloAurora = 0;
            var mensaje = "It destroyed " + $gameParty.allMembers()[this._activePkmn].name() + "'s Aurora Veil!";
            if (idioma == 1) mensaje = "Destruyó el Velo Aurora de " + $gameParty.allMembers()[this._activePkmn].name() + "!";
            mensajes.push(mensaje);
        }
    }
    $gameVariables.setValue(264, mensajes);
}

pokemonDisponibles = function(){
    var disponible = false;
    for (var i = 1; i <= $gameVariables.value(70); ++i){
        disponible = disponible || ($gameParty.allMembers()[i].hp > 0);
    }
    return disponible;
}

rivalesDisponibles = function(){
    var disponible = false;
    for (var i = 0; i < 6; ++i){
        if ($gameVariables.value(90+i) != 0){
            disponible = disponible || $gameVariables.value(90+i).hp > 0;
        } else disponible = disponible || false;
    }
    return disponible;
}

finalCombate = function(){
    var activo = $gameVariables.value(5000)._activePkmn;
    if ($gameVariables.value(90).hp == 0 && !rivalesDisponibles()) return 1;
    if ($gameParty.allMembers()[activo].hp == 0 && !pokemonDisponibles()) return 2;
    if ($gameVariables.value(90).hp == 0 && rivalesDisponibles()) return 3;
    if ($gameParty.allMembers()[activo].hp == 0 && pokemonDisponibles()) return 4;
    else return 0;
}

formulaExp = function(){
    var E = $dataPokemon[$gameVariables.value(90 + $gameVariables.value(5000)._activeRival).originalId()-1].BaseEXP;
    var nv = $gameVariables.value(90 + $gameVariables.value(5000)._activeRival).level;
    var nvu = $gameParty.allMembers()[$gameVariables.value(5000)._activePkmn].level;
    var base = E*nv/2/5;
    var correctorA = Math.pow((2 * nv + 10), 2.5);
    var correctorB = Math.pow((nvu + nv + 10), 2.5);
    var exp = (base * correctorA / correctorB + 1);
    return Math.floor(exp);
}

tipoPoderOculto = function(poke){
    var tipo = (poke._IVS[0] % 2 != 0);
    if (poke._IVS[2] % 2 != 0) tipo += 2; 
    if (poke._IVS[3] % 2 != 0) tipo += 4;
    if (poke._IVS[4] % 2 != 0) tipo += 16;
    if (poke._IVS[5] % 2 != 0) tipo += 32;
    if (poke._IVS[6] % 2 != 0) tipo += 8;
    tipo = (15*tipo)/63;
    return tipo;
}

esFosil = function(item){
    objeto = $dataItems[item];
    var fosil = "Fósil";
    var nombre = objeto.nombre;
    var i = 0;
    var compara = true;
    while (i < 5 && compara){
        compara = (fosil[i] == nombre[i]);
        ++i;
    }
    return compara;
}

esTabla = function(item){
    return (item >= 275 && item <= 290);
}

esROM = function(item){
    return (item >= 563 && item <= 566);
}

esIncienso = function(item){
    objeto = $dataItems[item];
    var incienso = "Incienso";
    var nombre = objeto.nombre;
    var i = 0;
    var compara = true;
    while (i < 8 && compara){
        compara = (incienso[i] == nombre[i]);
        ++i;
    }
    return compara;
}

esPanuelo = function(item){
    objeto = $dataItems[item];
    var pañuelo = "Pañuelo";
    var nombre = objeto.nombre;
    var i = 0;
    var compara = true;
    while (i < 7 && compara){
        compara = (pañuelo[i] == nombre[i]);
        ++i;
    }
    return compara;
}

esBaya = function(item){
    if (item == 0) return false;
    objeto = $dataItems[item];
    var baya = "Baya";
    var nombre = objeto.nombre;
    var i = 0;
    var compara = true;
    while (i < 4 && compara){
        compara = (baya[i] == nombre[i]);
        ++i;
    }
    return compara;
}

tipoTabla = function(item){
    tipo = 0;
    if (item == 275) tipo = 10;
    if (item == 276) tipo = 11;
    if (item == 277) tipo = 13;
    if (item == 278) tipo = 12;
    if (item == 279) tipo = 15;
    if (item == 280) tipo = 2;
    if (item == 281) tipo = 4;
    if (item == 282) tipo = 5;
    if (item == 283) tipo = 3;
    if (item == 284) tipo = 14;
    if (item == 285) tipo = 7;
    if (item == 286) tipo = 6;
    if (item == 287) tipo = 8;
    if (item == 288) tipo = 16;
    if (item == 289) tipo = 17;
    if (item == 290) tipo = 9;
    return tipo;
}

tipoROM = function(item){
    tipo = 0;
    if (item == 563) tipo = 11;
    if (item == 564) tipo = 13;
    if (item == 565) tipo = 10;
    if (item == 566) tipo = 15;
    return tipo;
}

healMove = function(move){
    var efecto = $dataSkills[move].effectId;
    return (efecto == 133 || efecto == 33 || efecto == 215 || efecto == 180);
}

movimientoDeCarga = function(move, user, clima){
    if (user._trapped) return false;
    else {
        return ((move == 13) || ($dataSkills[move].effectId == 152 && clima != 2) || (move == 19 && !user._flying) || (move == 291 && !user._diving) || (move == 91 && !user._digging) || (move == 340 && !user._digging) || ($dataSkills[move].effectId == 273 && !user._shadows) || (move == 366) || (move == 554));
    }
}

soundMove = function(move){
    return (move == 555 || move == 253 || move == 496 || move == 47 || move == 547 || move == 195 || move == 448 || move == 103 || move == 590 || move == 319 || move == 497 || move == 586 || move == 45 || move == 173 || move == 46 || move == 568 || move == 320 || move == 48 || move == 575 || move == 304 || move == 574 || move == 405)
}




