
function npcFrases1(nivel){
    var language = $gameVariables.value(14);
    if (language == 1) {
        var random = Math.randomInt(10)+1;
        random += nivel;
        switch (random){
            case 1:
                return "Si te gusta pescar te encantará Ciudad Marítima.";
            case 2:
                return "Mi zona favorita de la isla es la Zona Lúdica, me encantan los juegos.";
            case 3:
                return "Algunos sitios se llenan más según el momento el día, o la época del año.";
            case 4:
                return "No me gusta salir por la noche, hay mediums y brujas por todas partes...";
            case 5:
                return "¿Has ido al videoclub de Ciudad Central? ¡Es una pasada!";
            case 6:
                return "Me gustaría tener un Vaporeon.";
            case 7:
                return "En la Zona Safari puedes capturar Pokémon exóticos.";
            case 8:
                return "Graduarte en la Universidad Pokémon tiene muchas ventajas.";
            case 9:
                return "¿Qué Pokémon dirías que está sobrevalorado? Para mí, " + $gameParty.allMembers()[1].name() + ".";
            case 10:
                return "¿Quieres un consejo? No vayas a la cabaña del puerto de noche.";
        }
    }
}

function esHoy (dia, mes, año){
    var diaA = $gameVariables.value(26);
    var mesA = $gameVariables.value(27);
    var añoA = $gameVariables.value(28);
    return (dia == diaA) && (mes == mesA) && (año == añoA);
}