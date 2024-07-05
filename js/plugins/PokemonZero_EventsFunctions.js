
Game_Event.prototype.playerVisibleAt = function(distance) {
    direction = this._direction;
    if (direction == 2) return ($gamePlayer._x == this._x && $gamePlayer._y > this._y && $gamePlayer._y <= (this._y + distance))
    if (direction == 8) return ($gamePlayer._x == this._x && $gamePlayer._y < this._y && $gamePlayer._y >= (this._y - distance))
    if (direction == 6) return ($gamePlayer._y == this._y && $gamePlayer._x > this._x && $gamePlayer._x <= (this._x + distance))
    if (direction == 4) return ($gamePlayer._y == this._y && $gamePlayer._x < this._x && $gamePlayer._x >= (this._x - distance))
}

Game_Event.prototype.pokemonVisibleAt = function(distance) {
    direction = this._direction;
    if ($gameVariables.value(38) > 0) pokemon = $gamePlayer._followers.guest($gameVariables.value(38));
    else return false;
    if (direction == 2) return (pokemon._x == this._x && pokemon._y > this._y && pokemon._y <= (this._y + distance))
    if (direction == 8) return (pokemon._x == this._x && pokemon._y < this._y && pokemon._y >= (this._y - distance))
    if (direction == 6) return (pokemon._y == this._y && pokemon._x > this._x && pokemon._x <= (this._x + distance))
    if (direction == 4) return (pokemon._y == this._y && pokemon._x < this._x && pokemon._x >= (this._x - distance))
}