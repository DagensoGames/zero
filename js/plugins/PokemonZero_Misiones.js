//MISIONS

function initializeMisiones(){
    $gameActors.actor(1).misiones = [];
    $gameActors.actor(1).misionesComp = [];
}

function addMision(id){
    $gameActors.actor(1).misiones.push(id);
}

function misionEnProgreso(id){
    return $gameActors.actor(1).misiones.contains(id);
}

function completeMision(id){
    $gameActors.actor(1).misionesComp.push(id);
    var index = $gameActors.actor(1).misiones.indexOf(id);
    $gameActors.actor(1).misiones.splice(index,1);
    $gameVariables.setValue(108, $gameVariables.value(108)+1);
    if ($gameVariables.value(60) == id) $gameVariables.setValue(60, -1);
}


function tituloMisiones(){
    var idioma = $gameVariables.value(14);
    if (idioma == 1) return "MISIONES";
    else return "MISSIONS";
}

function menuMision(id){
    var idioma = $gameVariables.value(14);
    if (idioma == 1){
        if (id == 0) return "SIN COMPLETAR";
        else return "COMPLETADAS";
    } 
    else {
        if (id == 0) return "UNCOMPLETED";
        else return "COMPLETED";
    } 
}

function misionActiva(){
    var activa = $gameVariables.value(60);
    var idioma = $gameVariables.value(14);
    if (activa == -1){
        if (idioma == 1) return "Ninguna misión activa.";
        else return "No active mission.";
    }
    if (idioma == 1) return ("Misión activa: " + $dataMisiones[activa].Nombre);
    else return ("Active mission" + $dataMisiones[activa].Name);
}

function misionNavegada(){
    var idioma = $gameVariables.value(14);
    if (idioma == 1) return $dataMisiones[$gameActors.actor(1).misiones[$gameVariables.value(39)-1]].Nombre;
    else return $dataMisiones[$gameActors.actor(1).misiones[$gameVariables.value(39)-1]].Name;
}

function objetivoText(activa){
    var idioma = $gameVariables.value(14);
    if (activa == -1){
        if (idioma == 1) return "Ningún objetivo.";
        else return "No objective.";
    }
    if (idioma == 1) {
        if ($dataMisiones[activa].Goal.length > 1) return ($dataMisiones[activa].Objetivo[$gameVariables.value($dataMisiones[activa].ProgressVar)]);
        else return ($dataMisiones[activa].Objetivo);
    }
    
    else {
        if ($dataMisiones[activa].Goal.length > 1) return ($dataMisiones[activa].Goal[$gameVariables.value($dataMisiones[activa].ProgressVar)]);
        else return ($dataMisiones[activa].Goal);
    }
}

function progresoText(activa){
    var idioma = $gameVariables.value(14);
    var msg = "Progress: ";
    if (idioma == 1) msg = "Progreso: ";
    if ($dataMisiones[activa].Tipo != 3) msg += progresoObjetivos(activa) + "/" + progresoMaxObjetivo(activa);
    else msg += progresoObjetivos(activa) + "%"
    return msg;
}

function objetivoActual(){
    var activa = $gameVariables.value(60);
    return objetivoText(activa);
}

function progresoObjetivo(){
    var activa = $gameVariables.value(60);
    return progresoText(activa);
}

function objetivoNavegado(){
    var activa = $gameActors.actor(1).misiones[$gameVariables.value(39)-1];
    return objetivoText(activa);
}

function progresoObjetivoNavegado(){
    var activa = $gameActors.actor(1).misiones[$gameVariables.value(39)-1];
    return progresoText(activa);
}

function misionesTotales(){
    var idioma = $gameVariables.value(14);
    if (idioma == 1){
        return "Misiones completadas: " + $gameVariables.value(108);
    } else {
        return "Completed missions: " + $gameVariables.value(108);
    }
}

function misionesNumero(){
    return $dataMisiones.length;
}

function progresoTotal(){
    var idioma = $gameVariables.value(14);
    if (idioma == 1){
        return "Progreso total: " + $gameVariables.value(108) + "/" + misionesNumero() + " (" + (Math.floor(100*($gameVariables.value(108) / misionesNumero()))) + "%)";
    } else {
        return "Total Progress: " + $gameVariables.value(108) + "/" + misionesNumero() + " (" + (Math.floor(100*($gameVariables.value(108) / misionesNumero()))) + "%)";
    } 
}

function progresoObjetivos(id){
    if ($dataMisiones[id].Tipo == 0) return 0;
    else if ($dataMisiones[id].Tipo == 1) return (pokeInTeam($dataMisiones[id].Poke));
    else return $gameVariables.value($dataMisiones[id].ProgressVar);
}

function progresoMaxObjetivo(id){
    if ($dataMisiones[id].Tipo == 0 || $dataMisiones[id].Tipo == 1) return 1;
    else return $dataMisiones[id].ProgressMax;
    
}

function flechasMision(){
    var idioma = $gameVariables.value(14);
    if (idioma == 1) return "Anterior/Siguiente";
    else return "Previous/Next";
}

function enterMision(){
    var idioma = $gameVariables.value(14);
    if (idioma == 1) {
        if ($gameVariables.value(60) == $gameActors.actor(1).misiones[$gameVariables.value(39)-1]) return "No seguir";
        else return "Seguir";
    }
    else {
        if ($gameVariables.value(60) == $gameActors.actor(1).misiones[$gameVariables.value(39)-1]) return "Unfollow";
        else return "Follow";
    }
}

function finalMensaje(){
    var activa = $gameActors.actor(1).misiones[$gameVariables.value(39)-1];
    var idioma = $gameVariables.value(14);
    if (idioma == 1) return $dataMisiones[$gameActors.actor(1).misiones[$gameVariables.value(39)-1]].FinalEsp;
    else return $dataMisiones[$gameActors.actor(1).misiones[$gameVariables.value(39)-1]].FinalEng;
}


