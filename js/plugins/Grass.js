var _shaz_sprite_character_createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
Sprite_Character.prototype.createHalfBodySprites = function() {
    _shaz_sprite_character_createHalfBodySprites.call(this);
    this._lowerBody.opacity = 70;
}

Game_CharacterBase.prototype.refreshBushDepth = function() {
    if (this.isNormalPriority() && !this.isObjectCharacter() &&
            this.isOnBush() && !this.isJumping()) {
        if (!this.isMoving()) {
            this._bushDepth = 18.5;
        }
    } else {
        this._bushDepth = 0;
    }
};