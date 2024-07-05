
function MochilaTitle(){
    var idioma = $gameVariables.value(14);
    if (idioma == 1) return "MOCHILA";
    else return "BAG";
}

function SubMenuTitle(){
    var idioma = $gameVariables.value(14);
    var menu = $gameVariables.value(73);
    switch (menu){
        case 1:
            if (idioma == 1) return "Objetos";
            else return "Items";
        
        case 2:
            if (idioma == 1) return "Botiquín";
            else return "Medicine";
        
        case 3:
            if (idioma == 1) return "PokéBalls";
            else return "Poké Balls";

        case 4:
            if (idioma == 1) return "MTs";
            else return "TMs";

        case 5:
            if (idioma == 1) return "Bayas";
            else return "Berries";

        case 6:
            if (idioma == 1) return "Objetos de combate";
            else return "Battle items";

        case 7:
            if (idioma == 1) return "Objetos clave";
            else return "Key items";
    }
}

function BAGleftArrow(){
    var menu = $gameVariables.value(73);
    if (menu > 1) menu--;
    $gameVariables.setValue(73, menu);
    $gameVariables.setValue(39, 0);
    $gameVariables.setValue(319, 0);
}

function BAGrightArrow(){
    var menu = $gameVariables.value(73);
    if (menu < 7) menu++;
    $gameVariables.setValue(73, menu);
    $gameVariables.setValue(39, 0);
    $gameVariables.setValue(319, 0);
}

function BAGupArrow(){
    var cursor = $gameVariables.value(39);
    if (cursor == 0){
        if ($gameVariables.value(319) > 0) $gameVariables.setValue(319, $gameVariables.value(319) - 1);
    }
    else $gameVariables.setValue(39, cursor - 1);
}

function BAGdownArrow(){
    var cursor = $gameVariables.value(39);
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (cursor == 3){
        if ($gameVariables.value(319) < (items.length-4)) $gameVariables.setValue(319, $gameVariables.value(319) + 1);
    }
    else {
        if (items.length > (cursor+1)) $gameVariables.setValue(39, cursor + 1);
    }
}

function createListsBag(){
    for (var i = 1; i < 8; ++i){
        var itemList = itemsList(i);
        $gameVariables.setValue(73+i, itemList);
    }
}

function itemsList(id){
    var items = $gameParty.items();
    var itemsList = [];
    for (var i = 0; i < items.length; ++i){
        if ($dataItemsCat[items[i].id].pocketId == id) itemsList.push(items[i]);
    }
    return itemsList;
}

function mochilaPos1(){
    var idioma = $gameVariables.value(14);
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (items.length > 0){
        if (idioma == 1){
            return $dataItems[items[$gameVariables.value(319)].id].nombre;
        } else return items[$gameVariables.value(319)].name;
    } else return "";
}

function mochilaCant1(){
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (items.length > 0){
        return "x" + $gameParty.numItems($dataItems[items[$gameVariables.value(319)].id]);

    } else return "";
}

function mochilaPos2(){
    var idioma = $gameVariables.value(14);
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (items.length > 1){
        if (idioma == 1){
            return $dataItems[items[$gameVariables.value(319) + 1].id].nombre;
        } else return items[$gameVariables.value(319) + 1].name;
    } else return "";
}

function mochilaCant2(){
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (items.length > 1){
        return "x" + $gameParty.numItems($dataItems[items[$gameVariables.value(319)+1].id]);

    } else return "";
}

function mochilaPos3(){
    var idioma = $gameVariables.value(14);
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (items.length > 2){
        if (idioma == 1){
            return $dataItems[items[$gameVariables.value(319) + 2].id].nombre;
        } else return items[$gameVariables.value(319) + 2].name;
    } else return "";
}

function mochilaCant3(){
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (items.length > 2){
        return "x" + $gameParty.numItems($dataItems[items[$gameVariables.value(319)+2].id]);

    } else return "";
}

function mochilaPos4(){
    var idioma = $gameVariables.value(14);
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (items.length > 3){
        if (idioma == 1){
            return $dataItems[items[$gameVariables.value(319) + 3].id].nombre;
        } else return items[$gameVariables.value(319) + 3].name;
    } else return "";
}

function mochilaCant4(){
    var menu = $gameVariables.value(73);
    var items = $gameVariables.value(73+menu);
    if (items.length > 3){
        return "x" + $gameParty.numItems($dataItems[items[$gameVariables.value(319)+3].id]);

    } else return "";
}