//========================================================================================
//=== TSR_FootSteps === A Plugin by The Northern Frog ====================================
//========================================================================================

var TSR = TSR || {};
TSR.footStep = TSR.footStep || {};
TSR.footStep.version = 1.40;

var Imported = Imported || {};
Imported.TSR_FootSteps = true;

//========================================================================================

/*:
 * @target MZ
 * @plugindesc v1.4.0 Add foot step prints to player, followers and events, when
 *        walking on map regions Id defined by Map Notetags. 
 * 
 * @author TSR, The Northern Frog, 2020      
 * @help 
 * =======================================================================================
 * == About this Plugin ==================================================================
 * =======================================================================================
 * The Plugin use the sprite sheet 'FootSteps.png' that must be imported in 
 * the /img/system folder of your game. You can download it on my itch.io
 * account, along with the Plugin file.
 *
 * The sprite sheet is divided into 8 sections, hereafter named Blocks.
 * Blocks are indexed as bellow:
 *
 *      ---------------------------------------------------
 *      |           |           |            |            |
 *      |           |           |            |            |
 *      |    0      |     1     |      2     |     3      |
 *      |           |           |            |            |
 *      |           |           |            |            |
 *      |-----------|-----------|------------|------------|
 *      |           |           |            |            |
 *      |           |           |            |            |
 *      |    4      |     5     |      6     |     7      |
 *      |           |           |            |            |
 *      |           |           |            |            |
 *      ---------------------------------------------------
 *
 * Each Block consist of 12 frames of 48x48px. A Block can be either 
 * 'Regular' or 'Animated'. All Blocks are 'Regular', but can be turned 
 * into 'Animated' Blocks using parameters.
 *
 *   Regular Blocks
 *   ==============
 *   The 12 frames of a Regular Block are arranged in 4 lines corresponding
 *   to the 4 directions of the characters. Each time a character prints a 
 *   step, it alternate between the 3 frames on the line corresponding to 
 *   its direction.
 *
 *   Animated Blocks
 *   ===============
 *   The 12 frames of an Animated Block are read one after the others,
 *   according to parameters settings. You can create various step animation
 *   effect using the parameters (see bellow). The Plugin comes with default
 *   animations settings for Blocks 4 and 5 (Water) and Block 6 (Bush). 
 *
 * 
 *   Adding more Blocks
 *   ==================
 *   The sprite sheet contains 8 Blocks, but more can be added if needed.
 *   To do so, expand the sprite sheet height. Each row of 144 px height
 *   will add 4 additional Blocks to the sheet.
 *
 *
 *
 * NOTETAGS
 * =======================================================================================
 * The Plugin works with Map Notetags that assign Map Region Id to specific
 * Blocks. 
 *
 * Map Notetags
 * ============
 *
 *         <FOOT STEP REGIONS: x, y, z>     
 *            When walking on region id x, y or z, the characters will prints
 *            steps from the default Block. 
 *
 *
 *         <WET STEP REGIONS: x, y, z>    
 *            When walking on region id x, y or z, the characters will prints
 *            steps from the default Block.    
 *
 *     
 *         <animation name REGIONS: x, y, z>
 *             These are the Notetags to mark Map Region Id that will print
 *             animated foot steps according to the 'animation name' set in 
 *             the parameters (see bellow).  
 *   
 *             But to serves as an example and template, the Plugin comes
 *             with default settings for 'Water' and 'Bush' step animations.
 *             Hence, you can use the following Notetags as Plug & Play.
 *            
 *                    <WATER REGIONS: x, y, z>
 *
 *                    <BUSH REGIONS: x, y, z>       
 *
 * 
 *    Wet Feet
 *    =======
 *    The 'Foot Step' and 'Wet Step' Notetags are the same. But when leaving a
 *    region marked as 'Wet Step', the characters will keep printing steps on 
 *    the 3 first tiles outside of the 'wet' area. This may comes useful for 
 *    damp areas like Snow or Mud. 
 *
 *
 *    Default Block
 *    =============
 *    The Default Block is the Block that will be printed whenever the Player,
 *    a Follower or an Event, walk on a map region Id marked as 'Foot Step' or
 *    'Wet Step'. The Default Block is index 0, but it can be changed with the
 *    corresponding Parameter.
 *
 *    But if you want an Actor or an Event to print a specific Block, use the
 *    following Notetags:
 *
 *
 *
 * Actors Notetags or Events Comment Tags
 * ======================================
 *
 *        <FOOT STEP: x>
 *           A character with this Notetag will print steps from Block x when
 *           walking on a map region Id marked as 'Foot Step' or 'Wet Step'.
 *
 *        <animation name STEP: x>
 *           A character with this Notetag will print steps from Block x when
 *           walking on a map region Id marked as 'animation name'.
 * 
 *        The Plug & Play default settings for 'Water' and 'Bush' animations
 *        provides the following Actors Notetags/Event Comment Tags:
 *
 *           <WATER STEP: x>
 *              A character with this Notetag will print steps from Block x when
 *              walking on a map region Id marked as 'Water'. 
 *              
 *           <BUSH STEP: x>
 *              A character with this Notetag will print steps from Block x when
 *              walking on a map region Id marked as 'Bush'. 
 *
 *
 *        <NO STEPS>
 *           A character with this Tag will never print steps, 
 *           no matter the region Id. This is useful for flying characters.
 *
 *        <4 LEGS STEPS>
 *           Use this Tag if the character is 4 legged (Ex: Cat). It will
 *           make the foot steps printed in a more aligned arrangement that
 *           fit better a 4 legged creature walking pattern.
 *
 *        <SMALL STEPS>
 *           Foot Steps are printed in their actual size by default. If a
 *           character have this Tag, its Foot Steps will be scaled at 0.5
 *           ratio. This is in the case the character is supposed to be a
 *           small creature that prints smaller foot steps.
 *
 *        <BIG STEPS>
 *           Foot Steps are printed in their actual size by default. If a
 *           character have this Tag, its Foot Steps will be scaled at 1.5
 *           ratio. This is in the case the character is supposed to be a
 *           big creature that prints bigger foot steps.
 *
 *        <STEP SOUNDS x: fileName, volume, pitch, pan>
 *           This Tag can be used to assign a specific step sound to
 *           a character when it walk on a region Id marked for Block x.
 *
 *              Example:
 *                      <STEP SOUND 4: Water3, 50, 100, 0>
 *
 *              A character with this Tag, will play the SE 'Water3' at
 *              volume 50, pitch 100 and pan 0, when it walk on a region
 *              Id marked for Block index 4. This Block is assigned to
 *              the 'Water' step animation through parameters. Hence, the
 *              character would play this sound when walking on Water areas,
 *              instead of the sound set in the Water step anim parameters.
 *
 *
 *
 * ANIMATED STEPS
 * =======================================================================================
 * The Plugin provides 8 parameter step animation sections. Each of them
 * can assign a Block from the sprite sheet and turn it into an Animated
 * Block.
 *
 * The various parameter settings for Animated Blocks are explained in the
 * Parameters section bellow. But the 2 main parameters for the Step Anim
 * are the 'Name' and 'Block' params.
 *
 * The 'Name' is what will be used in the Map, Actors and Events Notetags.
 * The 'Block' is the sprite sheet Block assigned for the animation.
 *
 *
 *   WATER
 *   =====
 *   The Plugin comes with a Plug & Play step animation for watery areas.
 *   It use the first and second Step Anim Parameters Section. The 'Name'
 *   is 'Water' so it provides the following Notetags as explained above.
 *
 *             Map Notetags:  <WATER REGIONS: x, y, z>
 *
 *                         * x, y, and z are Map Region Id
 * 
 *
 *      Actors Notetags or
 *      Events Comment Tags:  <WATER STEP: x>
 *
 *                         * x is sprite sheet Block replacing 
 *                           Water animation when walking on 
 *                           region Id marked as 'Water'
 *
 *
 *    The Water step animation use 2 Blocks from the sprite sheet. The
 *    first one use Block index 4 and is the main animation used for
 *    setting Map, Actors and Events Notetags. The second animation use
 *    Block index 5 and is automatically played as an overlay animation
 *    above the first one. This is defined by the first step animation 
 *    parameters, as explained bellow.
 *
 *
 *   BUSH
 *   =====
 *   The Plugin comes with a Plug & Play step animation for bush tiles.
 *   It use the third Step Anim Parameters Section. The 'Name' is 'Bush'
 *   so it provides the following Notetags as explained above.
 *
 *             Map Notetags:  <BUSH REGIONS: x, y, z>
 *
 *                         * x, y, and z are Map Region Id
 * 
 *
 *      Actors Notetags or
 *      Events Comment Tags:  <BUSH STEP: x>
 *
 *                         * x is the sprite sheet Block replacing 
 *                           Bush animation when walking on region
 *                           Id marked as 'Bush'
 *
 *
 *   HUE
 *   ===
 *   Step animations can be played at a defined hue value. This is
 *   specific to region Id. Hue values can be assigned to regions
 *   Id by adding the hue value between brackets, following the
 *   region Id in the Map Notetags.
 *
 *      Example:    
 *                  <BUSH REGIONS: x, y(310)>
 *
 *         The Bush animation will be played at normal hue when
 *         in region Id x, and at hue 310 when in regionId y.
 *         
 *   Try it for yourself. Place a regular (green) Bush tiles area
 *   on the map and mark it as region x. Then place another Bush
 *   area using the dry (brownish) Bush tiles, and mark it as 
 *   region y. Then place the above Notetags in the Map note box.
 *   The Bush step animation, which is green on the sprite sheet,
 *   will take a more yellow-brown color tone (hue 310) when Actors
 *   and Events walk on region y; to fit better the dry Bush tiles.
 *
 *
 *
 * PARAMETERS
 * =======================================================================================
 * 
 * Base Foot Steps
 * ===============
 * 
 *   -Base Steps Block
 *       This parameter set the sprite sheet default Block index 
 *       for 'Foot Steps' and 'Wet Steps' regions.
 *
 *   -Only Last Follower
 *       If this parameter is toggled ON, only the last follower
 *       of the party will print steps in addition to the player.
 *
 *   -Base Opacity
 *       Opacity of foot steps is decreased by this value each
 *       frames, until faded out. Set it to 0 to disable foot
 *       steps fading out.
 *
 *   -Base Duration
 *       This is the maximum duration in frames the foot steps
 *       can remains on screen.
 *
 *   -Foot Steps Sound
 *       This is the sound to be played along with base foot steps.
 *       It will affect all non animated foot steps, so it is more
 *       recommanded to set specific sound to actor and event using
 *       Notetags.
 * 
 *       Sounds must be imported in /audio/se in both ogg and mp4 
 *       format. Enter the file name (without extension), the volu-
 *       me, the pitch and the pan values, separated by commas.
 *
 *          Example: Attack2, 75, 100, 0
 *
 *            *only the SE file name is required. Other arguments
 *             can be omitted as they will receive a default value.
 *
 *
 *
 * Animated Steps
 * ==============
 * The animated steps parameters are separated in 8 sections. Each
 * section allow to turn a Block from the sprite sheet into a step
 * animation. The 3 first sections have default plugin parameters
 * to provide 'Water' and 'Bush' animations as Plug & Play.
 *
 * You can change the default animation settings or create your own
 * custom step animation by filling the parameters of a step anim
 * section, as described bellow.
 *
 *
 *   -Name
 *      This is the name of the animation. The Name define the note-
 *      tags that can be used.
 *
 *         Example:
 *                   Map Notetags:  <'name' regions: x, y, z>                              
 *
 *                    * x, y, and z are Map Region Id assigned
 *                      to the 'name' animation
 *
 *
 *                   Actor Notetags     <'name' step: x>
 *                   & Events comment
 *                   Tags
 *
 *                    * x is sprite sheet Block replacing 
 *                      'name' animation when walking on 
 *                      region Id marked as 'Name'
 *
 *
 *   -Block
 *      This is the sprite sheet Block index that will be used by the
 *      animation.
 *
 *
 *   -Duration
 *      This is the maximum duration of the step animation in frames.
 *
 *
 *   -Straight Steps
 *      When set to true, the step animation will be printed in a straight
 *      manner, similar to the effect of the <4 legs steps> notetag. This
 *      works well for the Bush animation, for instance.
 *
 *
 *   -Step Under
 *      This make the step animation appears directly under the character,
 *      rather than a little bit behind. Again, this works well for the
 *      Bush animation.
 *
 *
 *   -Start Index
 *      Normally, the step animation start at index 0 (top left frame in
 *      a Block), but it can be changed to accomodate specific needs.*
 *
 *
 *   -End Index
 *      Normally, the step animation end at index 11 (bottom right frame 
 *      in a Block), but it can be changed to accomodate specific needs.*
 *
 *         *This means you can theorically makes 2 step animations out
 *          of the same Block by assigning 2 step animations parameter
 *          sections to the same Block, but with different Start and
 *          End Index.
 *
 *            Example:
 *                     anim 1: startIndex = 0, EndIndex = 5
 *                     anim 2: startIndex = 6, EndIndex = 11
 *
 *
 *   -Frame Rate
 *      This is the frame rate of the step animation. Must be correlated
 *      with the step animation duration, otherwise part of the animation
 *      might be cut off.
 *
 *
 *   -Opacity Rate
 *      This is the rate at which the foot steps opacity fade out.
 *
 *
 *   -Loop Type
 *      You can choose between 3 loop type for your step animations:
 *
 *       1) no loop:        Step animation terminate when it reach the
 *                          last frame, no matter the duration left.
 *
 *       2) loop:           Step animation will keep looping until
 *                          duration is over.
 *  
 *       3) stay on last:   Step animation will stay on the last frame
 *                          until the duration is over.
 *
 *
 *   -Rotate
 *      When this parameter is toggled ON, the step animation will 
 *      rotate according to the character direction. The sprites of
 *      your step animation Block must be drawn facing up on the 
 *      sprite sheet, so the rotation fits the character direction.
 *      Good example of this is the default Bush animation.
 *
 *
 *   -Second Block
 *      This is to assign a second step animation Block to be played
 *      as an overlay animation. The second step anim will play over
 *      the current one, according to its own settings defined in the 
 *      corresponding step animation parameters section. Good example 
 *      of this is the default Water animation.      
 *
 *
 *   -Wet feet
 *      This is to set if the characters will leaves wet foot steps
 *      on 3 tiles after leaving the area that prints the animation.
 *      Good example of this is the default Water animation.
 *   
 *
 *   -Over Anim
 *      This parameter is only valid when the step animation is used
 *      as a second animation. In that case, you can decide if the
 *      second animation is played under OR above the characters.
 *
 *
 *   -Sound
 *      This is to set the sound effect that will be played along with
 *      the animation. Enter the file name without extension, and if
 *      needed, the volume, the pitch and the pan separated by commas.
 *      
 *         Example: Move1, 30, 130, 0
 *                  
 *            *only the SE file name is required. Other arguments
 *             can be omitted as they will receive a default value.
 * 
 *
 *
 * =======================================================================================
 * == Terms of usage =====================================================================
 * =======================================================================================
 * 
 * Use in any independant RPG Maker MZ or MV projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account: 
 * https://the-northern-frog.itch.io/
 * 
 * SPRITE SHEET
 * The FootSteps.png sprite sheet is free to download on my itchi.io 
 * account. Editing it to your liking is permited and no credit is asked  
 * for using it. But it shouldn't be used in games that don't use this 
 * plugin, nor in a game not made with RPG Maker MZ or MV.
 *
 * SPECIAL THANKS
 * Thanks to ShadowDragon for testing and bugs report.
 *
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 2020/09/18 Prototype version completed, v0.1.3
 * 2020/09/19 Add notetags object processing and adjust script accordingly, v0.2.3
 * 2020/09/20 Add step sounds and parameters, v0.3.4
 * 2020/09/21 Completed parameters, and add step scaling and sounds adjusting, v1.3.5
 * 2020/09/26 Add more parameters for step anim, v1.3.6
 * 2020/09/27 Add map scroll update to foot step sprites, v1.3.7
 * 2020/11/23 Conversion for RPG Maker MZ v1.3.8
 * 2021/02/19 Add reflection steps to work with TSR_Mirror and minor fixes v1.4.0
 *
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 *
 *@param ---Base Foot Steps---
 *
 * @param Base Steps Block
 * @parent ---Base Foot Steps---
 * @type number
 * @min 0
 * @desc The default block for base foot steps.
 * Default: 0
 * @default 0
 *
 * @param Only Last Follower
 * @parent ---Base Foot Steps---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc On the last follower prints steps?
 * OFF - false  ON - true
 * @default false
 *
 * @param Base Opacity
 * @parent ---Base Foot Steps---
 * @type number
 * @min 0
 * @desc The base opacity decrement of foot steps.
 * Default: 4
 * @default 4
 *
 * @param Base Duration
 * @parent ---Base Foot Steps---
 * @type number
 * @min 0
 * @desc The base duration of foot steps in frames.
 * Default: 60
 * @default 60
 *
 * @param Foot Steps Sound
 * @parent ---Base Foot Steps---
 * @desc Enter file name of the default foot step sound.
 * Default:
 * @default
 *
 *
 *@param ---Foot Step Anim 1---
 *
 * @param Anim 1 Name
 * @parent ---Foot Step Anim 1---
 * @desc Name of the Anim Step.
 * Default: Water
 * @default Water
 *
 * @param Anim 1 Block
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 4
 * @default 4
 *
 * @param Anim 1 Duration
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 1 Straight Steps
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 1 Step Under
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 1 Start Index
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 1 End Index
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 11
 * @default 11
 *
 * @param Anim 1 Frame Rate
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 4
 * @default 4
 *
 * @param Anim 1 Opacity Rate
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 4
 * @default 4
 *
 * @param Anim 1 Loop Type
 * @parent ---Foot Step Anim 1---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 1 Rotate
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 1 Wet Feet
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default true
 *
 * @param Anim 1 Second Block
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 5
 * @default 5
 *
 * @param Anim 1 Over Anim
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 1 Sound
 * @parent ---Foot Step Anim 1---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: Water2, 35, 130, 0
 * @default Water2, 35, 130, 0
 *
 *
 *@param ---Foot Step Anim 2---
 *
 * @param Anim 2 Name
 * @parent ---Foot Step Anim 2---
 * @desc Name of the Anim Step.
 * Default: Water Overlay
 * @default Water Overlay
 *
 * @param Anim 2 Block
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 5
 * @default 5
 *
 * @param Anim 2 Duration
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 2 Straight Steps
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 2 Step Under
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 2 Start Index
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 2 End Index
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 11
 * @default 11
 *
 * @param Anim 2 Frame Rate
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 4
 * @default 4
 *
 * @param Anim 2 Opacity Rate
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 4
 * @default 4
 *
 * @param Anim 2 Loop Type
 * @parent ---Foot Step Anim 2---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 2 Rotate
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 2 Wet Feet
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default true
 *
 * @param Anim 2 Second Block
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 2 Over Anim
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 2 Sound
 * @parent ---Foot Step Anim 2---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 3---
 *
 * @param Anim 3 Name
 * @parent ---Foot Step Anim 3---
 * @desc Name of the Anim Step.
 * Default: Bush
 * @default Bush
 *
 * @param Anim 3 Block
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 6
 * @default 6
 *
 * @param Anim 3 Duration
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 3 Straight Steps
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 3 Step Under
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 3 Start Index
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 3 End Index
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 11
 * @default 11
 *
 * @param Anim 3 Frame Rate
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 4
 * @default 4
 *
 * @param Anim 3 Opacity Rate
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 4
 * @default 4
 *
 * @param Anim 3 Loop Type
 * @parent ---Foot Step Anim 3---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 3 Rotate
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default true
 *
 * @param Anim 3 Wet Feet
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 3 Second Block
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 3 Over Anim
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default true
 *
 * @param Anim 3 Sound
 * @parent ---Foot Step Anim 3---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: Wind1, 35, 110, 0
 * @default Wind1, 35, 110, 0
 *
 *
 *@param ---Foot Step Anim 4---
 *
 * @param Anim 4 Name
 * @parent ---Foot Step Anim 4---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 4 Block
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Duration
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 4 Straight Steps
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Step Under
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Start Index
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 End Index
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Frame Rate
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Opacity Rate
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Loop Type
 * @parent ---Foot Step Anim 4---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 4 Rotate
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Wet Feet
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Second Block
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Over Anim
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Sound
 * @parent ---Foot Step Anim 4---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 5---
 *
 * @param Anim 5 Name
 * @parent ---Foot Step Anim 5---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 5 Block
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Duration
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 5 Straight Steps
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Step Under
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Start Index
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 End Index
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Frame Rate
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Opacity Rate
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Loop Type
 * @parent ---Foot Step Anim 5---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 5 Rotate
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Wet Feet
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Second Block
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Over Anim
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Sound
 * @parent ---Foot Step Anim 5---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 6---
 *
 * @param Anim 6 Name
 * @parent ---Foot Step Anim 6---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 6 Block
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Duration
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 6 Straight Steps
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Step Under
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Start Index
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 End Index
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Frame Rate
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Opacity Rate
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Loop Type
 * @parent ---Foot Step Anim 6---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 6 Rotate
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Wet Feet
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Second Block
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Over Anim
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Sound
 * @parent ---Foot Step Anim 6---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 7---
 *
 * @param Anim 7 Name
 * @parent ---Foot Step Anim 7---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 7 Block
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Duration
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 7 Straight Steps
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Step Under
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Start Index
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 End Index
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Frame Rate
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Opacity Rate
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Loop Type
 * @parent ---Foot Step Anim 7---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 7 Rotate
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Wet Feet
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Second Block
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Over Anim
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Sound
 * @parent ---Foot Step Anim 7---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 8---
 *
 * @param Anim 8 Name
 * @parent ---Foot Step Anim 8---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 8 Block
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Duration
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 8 Straight Steps
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Step Under
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Start Index
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 End Index
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Frame Rate
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Opacity Rate
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Loop Type
 * @parent ---Foot Step Anim 8---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 8 Rotate
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Wet Feet
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Second Block
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Over Anim
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Sound
 * @parent ---Foot Step Anim 8---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *
 */

(() => {
const _0x3aec=['Anim\x204\x20Frame\x20Rate','_animDash','Anim\x208\x20Over\x20Anim','Foot\x20Steps\x20Sound','_anim2','_goLeft','Anim\x202\x20Rotate','_baseDuration','readActorsFootStepTag','anim6_Snd','Anim\x205\x20Duration','setSecondStepVpos','startIndex','Anim\x202\x20End\x20Index','Anim\x205\x20Block','_wetFeetCount','anim5_Snd','Anim\x201\x20Opacity\x20Rate','FootSteps','initMembers','initialize','Anim\x201\x20Block','_tilemap','Anim\x202\x20Opacity\x20Rate','height','region','setupPage','_dashing','footStepsId','Anim\x208\x20Sound','_stepHue','createStepOverAnim','Anim\x207\x20Duration','Anim\x208\x20Step\x20Under','leader','_4legs','playSe','Anim\x206\x20Loop\x20Type','124543kPaOmd','_lastDisplayX','Anim\x203\x20Start\x20Index','setFrame','_endFrame','rotate','rotation','Anim\x206\x20Step\x20Under','Anim\x207\x20Frame\x20Rate','isAnim','_animatedStep','anim8_Snd','_animRate','anim1_Snd','_character','loadSystemImages','checkFootStepTag','Anim\x201\x20Sound','Anim\x208\x20Loop\x20Type','Anim\x204\x20Block','Anim\x204\x20Name','footStep','setup','Anim\x208\x20Second\x20Block','Anim\x206\x20Opacity\x20Rate','Anim\x203\x20Block','adjustSound','anim2_Snd','_reflection','setSpritePos','Anim\x204\x20Second\x20Block','_baseBlock','Anim\x205\x20Opacity\x20Rate','fct','apply','_anim6','slice','contains','_loaded','foot\x20step','_anim3','Anim\x204\x20Start\x20Index','Parameters','1575624SOFuEP','_visible','sound','over','Anim\x202\x20Sound','Anim\x201\x20End\x20Index','prototype','_Scene_Boot_loadSystemImages','block_y','_tileWidth','_actorId','removeChild','Anim\x205\x20Loop\x20Type','stepFrameIndex','Anim\x207\x20Name','Anim\x203\x20Second\x20Block','Anim\x205\x20Wet\x20Feet','isLeavingUnwetAnim','step','loadBitmap','create','endIndex','_footStepSprite','Anim\x207\x20Step\x20Under','indexOf','4ZmTPbN','_wetRegion','noBlock','_Sprite_Character_update','_reflectionSteps','_overAnim','_anim','_stepdir','Anim\x201\x20Second\x20Block','inFrontOfMirror','_anim5','updateStepScroll','push','Anim\x201\x20Over\x20Anim','setStepBlock','tileWidth','abs','isPlaying','parameters','_displayX','test','shift','loadSystem','Anim\x207\x20Wet\x20Feet','Anim\x205\x20Sound','anchor','Anim\x205\x20Start\x20Index','scale','Anim\x203\x20Duration','setupFootSteps','Anim\x204\x20Over\x20Anim','Anim\x201\x20Straight\x20Steps','_noBlock','constructor','TSR_Mirror','_defaultBlock','Anim\x206\x20Rotate','Anim\x204\x20End\x20Index','_Orate','Anim\x201\x20Start\x20Index','isDatabaseLoaded','_anim7','_stepFrame','stepUnder','Anim\x208\x20Start\x20Index','update','_memberIndex','Anim\x207\x20Loop\x20Type','match','_animList','_animStep','Anim\x208\x20Rotate','Anim\x206\x20Sound','animBlock','_spriteOverAnim','Anim\x203\x20Name','_followers','_scene','call','Anim\x202\x20Block','57036SjDncB','Anim\x204\x20Opacity\x20Rate','makeBlock','baseBlock','isLeavingAnim','_firstDash','createStepSprite','Only\x20Last\x20Follower','addChild','distToBottomMirror','Anim\x208\x20End\x20Index','note','moveSpeed','Anim\x206\x20Name','165273tNpPNe','_duration','Anim\x207\x20Opacity\x20Rate','_anim8','tileHeight','loadStaticSe','anim7_Snd','603ZICfqp','_Game_Event_setupPage','updateFootSteps','getCombo','second','Anim\x201\x20Loop\x20Type','block','Anim\x205\x20End\x20Index','startFootSteps','Anim\x208\x20Opacity\x20Rate','Anim\x203\x20Loop\x20Type','_type','page','Anim\x205\x20Step\x20Under','_scale','455180ORSCuW','_animLoop','preloadStepSounds','_stepBlock','_lastDisplayY','_realY','_followerStep','createFootStepSprite','anim4_Snd','no\x20loop','isFootPrintRegionId','_opRate','Block','_baseSound','block_x','_stepUnder','Anim\x205\x20Over\x20Anim','length','Anim\x201\x20Frame\x20Rate','Anim\x203\x20Straight\x20Steps','Anim\x205\x20Straight\x20Steps','battleMembers','Base\x20Duration','Anim\x204\x20Rotate','size','_speed','distance','Anim\x206\x20Second\x20Block','regionId','getAngle','Anim\x205\x20Second\x20Block','Anim\x207\x20Start\x20Index','Anim\x204\x20Wet\x20Feet','_secondAnim','Anim\x203\x20Rotate','Anim\x201\x20Duration','Anim\x206\x20Block','Anim\x208\x20Name','_wetFeet','width','_Spriteset_Map_createLowerLayer','Anim\x203\x20Sound','updateFootStepAnim','Anim\x202\x20Step\x20Under','Anim\x208\x20Block','DataManager_isDatabaseLoaded','_anim1','Anim\x203\x20Frame\x20Rate','setSecondStepHpos','Anim\x202\x20Wet\x20Feet','_stepOverAnim','stepBlock','first','_reflectfirstDash','_anim4','622ucICen','cachePitch','Anim\x206\x20Straight\x20Steps','makeSoundObj','_displayY','Anim\x202\x20Start\x20Index','Anim\x208\x20Duration','Anim\x201\x20Name','getSpeedFactor','toLowerCase','split','_footStepsSprite','304790fyyRPA','_hasFadeIn','requestfootSteps','_stepFrameIndex','setStepAnimFrame','Anim\x206\x20Start\x20Index','list','_rate','trim','loop','Anim\x201\x20Rotate','Anim\x203\x20Over\x20Anim','Anim\x202\x20Frame\x20Rate','floor','Anim\x204\x20Sound','Anim\x207\x20End\x20Index','_stepWait','_sound','Anim\x204\x20Duration','createLowerLayer','loadStepSound','_spriteset','isNextBlockAnim','_Sprite_Character_initMembers','_realX','_baseOpacity','Base\x20Steps\x20Block','Anim\x202\x20Straight\x20Steps','Anim\x206\x20End\x20Index','bitmap','anim3_Snd','_footStepsId','volume','Anim\x202\x20Loop\x20Type','straight','Anim\x205\x20Name','Anim\x203\x20Opacity\x20Rate','_animationCount','animated','TSR_FootSteps','name','opacity','Anim\x201\x20Step\x20Under'];const _0x2912=function(_0x103cda,_0x20a455){_0x103cda=_0x103cda-0xf1;let _0x3aec69=_0x3aec[_0x103cda];return _0x3aec69;};const _0x159f74=_0x2912;(function(_0x30135e,_0x6b2ede){const _0xf7be70=_0x2912;while(!![]){try{const _0x3b5559=parseInt(_0xf7be70(0x1e8))+parseInt(_0xf7be70(0x109))+parseInt(_0xf7be70(0x1da))+-parseInt(_0xf7be70(0x1ef))*-parseInt(_0xf7be70(0xfd))+parseInt(_0xf7be70(0x1fe))+parseInt(_0xf7be70(0x15a))*parseInt(_0xf7be70(0x19e))+-parseInt(_0xf7be70(0x185));if(_0x3b5559===_0x6b2ede)break;else _0x30135e['push'](_0x30135e['shift']());}catch(_0x471e9d){_0x30135e['push'](_0x30135e['shift']());}}}(_0x3aec,0x44555),TSR['Parameters']=PluginManager[_0x159f74(0x1b0)](_0x159f74(0x130)),TSR[_0x159f74(0x16f)][_0x159f74(0x17b)]=Object['keys'],TSR['footStep'][_0x159f74(0x1c1)]=Number(TSR[_0x159f74(0x184)][_0x159f74(0x123)]),TSR[_0x159f74(0x16f)]['_onlyLastFollower']=eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x1e1)])),TSR[_0x159f74(0x16f)][_0x159f74(0x122)]=Number(TSR['Parameters']['Base\x20Opacity']),TSR[_0x159f74(0x16f)][_0x159f74(0x13b)]=Number(TSR[_0x159f74(0x184)][_0x159f74(0x214)]),TSR[_0x159f74(0x16f)]['_baseSound']=String(TSR[_0x159f74(0x184)][_0x159f74(0x137)])[_0x159f74(0x107)](','),TSR['footStep']['anim1_Snd']=String(TSR['Parameters'][_0x159f74(0x16b)])[_0x159f74(0x107)](','),TSR[_0x159f74(0x16f)][_0x159f74(0x175)]=String(TSR[_0x159f74(0x184)][_0x159f74(0x189)])[_0x159f74(0x107)](','),TSR[_0x159f74(0x16f)][_0x159f74(0x127)]=String(TSR[_0x159f74(0x184)][_0x159f74(0x227)])[_0x159f74(0x107)](','),TSR[_0x159f74(0x16f)]['anim4_Snd']=String(TSR[_0x159f74(0x184)][_0x159f74(0x117)])[_0x159f74(0x107)](','),TSR[_0x159f74(0x16f)]['anim5_Snd']=String(TSR[_0x159f74(0x184)][_0x159f74(0x1b6)])[_0x159f74(0x107)](','),TSR[_0x159f74(0x16f)][_0x159f74(0x13d)]=String(TSR[_0x159f74(0x184)][_0x159f74(0x1d2)])[_0x159f74(0x107)](','),TSR[_0x159f74(0x16f)][_0x159f74(0x1ee)]=String(TSR['Parameters']['Anim\x207\x20Sound'])[_0x159f74(0x107)](','),TSR[_0x159f74(0x16f)][_0x159f74(0x165)]=String(TSR[_0x159f74(0x184)][_0x159f74(0x151)])[_0x159f74(0x107)](','),TSR[_0x159f74(0x16f)][_0x159f74(0x100)]=_0x324405=>{const _0x3aa628=_0x159f74;let _0x2c9093=_0x324405[0x0][_0x3aa628(0x111)]()||![],_0x302a73=parseInt(_0x324405[0x1])||0x64,_0x43ca76=parseInt(_0x324405[0x2])||0x64,_0x181b57=parseInt(_0x324405[0x3])||0x0;if(_0x2c9093)return{'name':_0x2c9093,'volume':_0x302a73,'pitch':_0x43ca76,'pan':_0x181b57,'maxVol':_0x302a73,'cachePitch':_0x43ca76};return![];},TSR[_0x159f74(0x16f)][_0x159f74(0x20b)]=TSR[_0x159f74(0x16f)]['makeSoundObj'](TSR[_0x159f74(0x16f)]['_baseSound']),TSR[_0x159f74(0x16f)][_0x159f74(0x167)]=TSR['footStep'][_0x159f74(0x100)](TSR[_0x159f74(0x16f)]['anim1_Snd']),TSR['footStep'][_0x159f74(0x175)]=TSR[_0x159f74(0x16f)][_0x159f74(0x100)](TSR[_0x159f74(0x16f)][_0x159f74(0x175)]),TSR['footStep'][_0x159f74(0x127)]=TSR['footStep'][_0x159f74(0x100)](TSR[_0x159f74(0x16f)][_0x159f74(0x127)]),TSR[_0x159f74(0x16f)]['anim4_Snd']=TSR['footStep'][_0x159f74(0x100)](TSR[_0x159f74(0x16f)][_0x159f74(0x206)]),TSR[_0x159f74(0x16f)][_0x159f74(0x144)]=TSR[_0x159f74(0x16f)][_0x159f74(0x100)](TSR['footStep'][_0x159f74(0x144)]),TSR['footStep'][_0x159f74(0x13d)]=TSR[_0x159f74(0x16f)]['makeSoundObj'](TSR[_0x159f74(0x16f)][_0x159f74(0x13d)]),TSR[_0x159f74(0x16f)][_0x159f74(0x1ee)]=TSR['footStep'][_0x159f74(0x100)](TSR[_0x159f74(0x16f)][_0x159f74(0x1ee)]),TSR[_0x159f74(0x16f)][_0x159f74(0x165)]=TSR['footStep'][_0x159f74(0x100)](TSR[_0x159f74(0x16f)]['anim8_Snd']),TSR[_0x159f74(0x16f)][_0x159f74(0x1f2)]=_0x44c73e=>{const _0x3e19e3=_0x159f74;if(_0x44c73e===_0x3e19e3(0x112))return 0x1;else return _0x44c73e===_0x3e19e3(0x207)?0x0:0x2;},TSR[_0x159f74(0x16f)][_0x159f74(0xf4)]={'name':String(TSR['Parameters'][_0x159f74(0x104)]),'block':Number(TSR[_0x159f74(0x184)][_0x159f74(0x149)]),'animated':!![],'duration':Number(TSR[_0x159f74(0x184)][_0x159f74(0x221)]),'straight':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x1bd)])),'stepUnder':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x133)])),'startIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x1c5)]),'endIndex':Number(TSR['Parameters'][_0x159f74(0x18a)]),'frameRate':Number(TSR[_0x159f74(0x184)][_0x159f74(0x210)]),'opacity':Number(TSR[_0x159f74(0x184)][_0x159f74(0x145)]),'loop':TSR[_0x159f74(0x16f)][_0x159f74(0x1f2)](String(TSR[_0x159f74(0x184)][_0x159f74(0x1f4)])),'rotate':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x113)])),'second':Number(TSR[_0x159f74(0x184)][_0x159f74(0x1a6)]),'wet':eval(String(TSR[_0x159f74(0x184)]['Anim\x201\x20Wet\x20Feet'])),'over':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x1ab)])),'sound':TSR[_0x159f74(0x16f)]['anim1_Snd']},TSR[_0x159f74(0x16f)][_0x159f74(0x138)]={'name':String(TSR[_0x159f74(0x184)]['Anim\x202\x20Name']),'block':Number(TSR[_0x159f74(0x184)][_0x159f74(0x1d9)]),'animated':!![],'duration':Number(TSR[_0x159f74(0x184)]['Anim\x202\x20Duration']),'straight':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x124)])),'stepUnder':eval(String(TSR['Parameters'][_0x159f74(0xf1)])),'startIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x102)]),'endIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x141)]),'frameRate':Number(TSR[_0x159f74(0x184)][_0x159f74(0x115)]),'opacity':Number(TSR['Parameters'][_0x159f74(0x14b)]),'loop':TSR['footStep'][_0x159f74(0x1f2)](String(TSR[_0x159f74(0x184)][_0x159f74(0x12a)])),'rotate':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x13a)])),'second':Number(TSR[_0x159f74(0x184)]['Anim\x202\x20Second\x20Block']),'wet':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0xf7)])),'over':eval(String(TSR[_0x159f74(0x184)]['Anim\x202\x20Over\x20Anim'])),'sound':TSR[_0x159f74(0x16f)][_0x159f74(0x175)]},TSR['footStep']['_anim3']={'name':String(TSR[_0x159f74(0x184)][_0x159f74(0x1d5)]),'block':Number(TSR[_0x159f74(0x184)][_0x159f74(0x173)]),'animated':!![],'duration':Number(TSR[_0x159f74(0x184)][_0x159f74(0x1ba)]),'straight':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x211)])),'stepUnder':eval(String(TSR[_0x159f74(0x184)]['Anim\x203\x20Step\x20Under'])),'startIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x15c)]),'endIndex':Number(TSR[_0x159f74(0x184)]['Anim\x203\x20End\x20Index']),'frameRate':Number(TSR[_0x159f74(0x184)][_0x159f74(0xf5)]),'opacity':Number(TSR['Parameters'][_0x159f74(0x12d)]),'loop':TSR['footStep'][_0x159f74(0x1f2)](String(TSR[_0x159f74(0x184)][_0x159f74(0x1f9)])),'rotate':eval(String(TSR['Parameters'][_0x159f74(0x220)])),'second':Number(TSR['Parameters'][_0x159f74(0x194)]),'wet':eval(String(TSR['Parameters']['Anim\x203\x20Wet\x20Feet'])),'over':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x114)])),'sound':TSR[_0x159f74(0x16f)]['anim3_Snd']},TSR[_0x159f74(0x16f)][_0x159f74(0xfc)]={'name':String(TSR[_0x159f74(0x184)][_0x159f74(0x16e)]),'block':Number(TSR[_0x159f74(0x184)][_0x159f74(0x16d)]),'animated':!![],'duration':Number(TSR[_0x159f74(0x184)][_0x159f74(0x11b)]),'straight':eval(String(TSR[_0x159f74(0x184)]['Anim\x204\x20Straight\x20Steps'])),'stepUnder':eval(String(TSR[_0x159f74(0x184)]['Anim\x204\x20Step\x20Under'])),'startIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x183)]),'endIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x1c3)]),'frameRate':Number(TSR[_0x159f74(0x184)][_0x159f74(0x134)]),'opacity':Number(TSR['Parameters'][_0x159f74(0x1db)]),'loop':TSR['footStep'][_0x159f74(0x1f2)](String(TSR[_0x159f74(0x184)]['Anim\x204\x20Loop\x20Type'])),'rotate':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x215)])),'second':Number(TSR['Parameters'][_0x159f74(0x178)]),'wet':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x21e)])),'over':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x1bc)])),'sound':TSR['footStep'][_0x159f74(0x206)]},TSR['footStep']['_anim5']={'name':String(TSR[_0x159f74(0x184)][_0x159f74(0x12c)]),'block':Number(TSR[_0x159f74(0x184)][_0x159f74(0x142)]),'animated':!![],'duration':Number(TSR[_0x159f74(0x184)][_0x159f74(0x13e)]),'straight':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x212)])),'stepUnder':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x1fc)])),'startIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x1b8)]),'endIndex':Number(TSR['Parameters'][_0x159f74(0x1f6)]),'frameRate':Number(TSR['Parameters']['Anim\x205\x20Frame\x20Rate']),'opacity':Number(TSR['Parameters'][_0x159f74(0x17a)]),'loop':TSR[_0x159f74(0x16f)][_0x159f74(0x1f2)](String(TSR['Parameters'][_0x159f74(0x191)])),'rotate':eval(String(TSR[_0x159f74(0x184)]['Anim\x205\x20Rotate'])),'second':Number(TSR['Parameters'][_0x159f74(0x21c)]),'wet':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x195)])),'over':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x20e)])),'sound':TSR[_0x159f74(0x16f)]['anim5_Snd']},TSR[_0x159f74(0x16f)][_0x159f74(0x17d)]={'name':String(TSR['Parameters'][_0x159f74(0x1e7)]),'block':Number(TSR[_0x159f74(0x184)][_0x159f74(0x222)]),'animated':!![],'duration':Number(TSR[_0x159f74(0x184)]['Anim\x206\x20Duration']),'straight':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0xff)])),'stepUnder':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x161)])),'startIndex':Number(TSR['Parameters'][_0x159f74(0x10e)]),'endIndex':Number(TSR['Parameters'][_0x159f74(0x125)]),'frameRate':Number(TSR[_0x159f74(0x184)]['Anim\x206\x20Frame\x20Rate']),'opacity':Number(TSR[_0x159f74(0x184)][_0x159f74(0x172)]),'loop':TSR[_0x159f74(0x16f)]['getCombo'](String(TSR[_0x159f74(0x184)][_0x159f74(0x159)])),'rotate':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x1c2)])),'second':Number(TSR[_0x159f74(0x184)][_0x159f74(0x219)]),'wet':eval(String(TSR[_0x159f74(0x184)]['Anim\x206\x20Wet\x20Feet'])),'over':eval(String(TSR[_0x159f74(0x184)]['Anim\x206\x20Over\x20Anim'])),'sound':TSR[_0x159f74(0x16f)][_0x159f74(0x13d)]},TSR[_0x159f74(0x16f)][_0x159f74(0x1c7)]={'name':String(TSR[_0x159f74(0x184)][_0x159f74(0x193)]),'block':Number(TSR[_0x159f74(0x184)]['Anim\x207\x20Block']),'animated':!![],'duration':Number(TSR[_0x159f74(0x184)][_0x159f74(0x154)]),'straight':eval(String(TSR[_0x159f74(0x184)]['Anim\x207\x20Straight\x20Steps'])),'stepUnder':eval(String(TSR['Parameters'][_0x159f74(0x19c)])),'startIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x21d)]),'endIndex':Number(TSR[_0x159f74(0x184)][_0x159f74(0x118)]),'frameRate':Number(TSR[_0x159f74(0x184)][_0x159f74(0x162)]),'opacity':Number(TSR[_0x159f74(0x184)][_0x159f74(0x1ea)]),'loop':TSR[_0x159f74(0x16f)]['getCombo'](String(TSR[_0x159f74(0x184)][_0x159f74(0x1cd)])),'rotate':eval(String(TSR['Parameters']['Anim\x207\x20Rotate'])),'second':Number(TSR[_0x159f74(0x184)]['Anim\x207\x20Second\x20Block']),'wet':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x1b5)])),'over':eval(String(TSR['Parameters']['Anim\x207\x20Over\x20Anim'])),'sound':TSR[_0x159f74(0x16f)][_0x159f74(0x1ee)]},TSR['footStep'][_0x159f74(0x1eb)]={'name':String(TSR[_0x159f74(0x184)][_0x159f74(0x223)]),'block':Number(TSR['Parameters'][_0x159f74(0xf2)]),'animated':!![],'duration':Number(TSR[_0x159f74(0x184)][_0x159f74(0x103)]),'straight':eval(String(TSR[_0x159f74(0x184)]['Anim\x208\x20Straight\x20Steps'])),'stepUnder':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x155)])),'startIndex':Number(TSR['Parameters'][_0x159f74(0x1ca)]),'endIndex':Number(TSR['Parameters'][_0x159f74(0x1e4)]),'frameRate':Number(TSR['Parameters']['Anim\x208\x20Frame\x20Rate']),'opacity':Number(TSR[_0x159f74(0x184)][_0x159f74(0x1f8)]),'loop':TSR[_0x159f74(0x16f)][_0x159f74(0x1f2)](String(TSR['Parameters'][_0x159f74(0x16c)])),'rotate':eval(String(TSR['Parameters'][_0x159f74(0x1d1)])),'second':Number(TSR[_0x159f74(0x184)][_0x159f74(0x171)]),'wet':eval(String(TSR[_0x159f74(0x184)]['Anim\x208\x20Wet\x20Feet'])),'over':eval(String(TSR[_0x159f74(0x184)][_0x159f74(0x136)])),'sound':TSR[_0x159f74(0x16f)]['anim8_Snd']},TSR[_0x159f74(0x16f)][_0x159f74(0x1cf)]={},TSR[_0x159f74(0x16f)][_0x159f74(0x1cf)][TSR[_0x159f74(0x16f)]['_anim1'][_0x159f74(0x1f5)]]=TSR['footStep'][_0x159f74(0xf4)],TSR[_0x159f74(0x16f)]['_animList'][TSR['footStep'][_0x159f74(0x138)][_0x159f74(0x1f5)]]=TSR[_0x159f74(0x16f)][_0x159f74(0x138)],TSR[_0x159f74(0x16f)][_0x159f74(0x1cf)][TSR[_0x159f74(0x16f)]['_anim3'][_0x159f74(0x1f5)]]=TSR[_0x159f74(0x16f)][_0x159f74(0x182)],TSR[_0x159f74(0x16f)][_0x159f74(0x1cf)][TSR[_0x159f74(0x16f)]['_anim4'][_0x159f74(0x1f5)]]=TSR[_0x159f74(0x16f)]['_anim4'],TSR['footStep'][_0x159f74(0x1cf)][TSR['footStep'][_0x159f74(0x1a8)][_0x159f74(0x1f5)]]=TSR[_0x159f74(0x16f)]['_anim5'],TSR[_0x159f74(0x16f)]['_animList'][TSR[_0x159f74(0x16f)][_0x159f74(0x17d)][_0x159f74(0x1f5)]]=TSR[_0x159f74(0x16f)][_0x159f74(0x17d)],TSR[_0x159f74(0x16f)][_0x159f74(0x1cf)][TSR['footStep'][_0x159f74(0x1c7)][_0x159f74(0x1f5)]]=TSR['footStep'][_0x159f74(0x1c7)],TSR[_0x159f74(0x16f)][_0x159f74(0x1cf)][TSR[_0x159f74(0x16f)][_0x159f74(0x1eb)][_0x159f74(0x1f5)]]=TSR[_0x159f74(0x16f)][_0x159f74(0x1eb)],TSR[_0x159f74(0x16f)][_0x159f74(0xf3)]=DataManager[_0x159f74(0x1c6)],DataManager['isDatabaseLoaded']=function(){const _0x4d4acf=_0x159f74;if(!TSR[_0x4d4acf(0x16f)][_0x4d4acf(0xf3)]['call'](this))return![];return!TSR[_0x4d4acf(0x16f)][_0x4d4acf(0x180)]&&(this[_0x4d4acf(0x13c)]($dataActors),TSR[_0x4d4acf(0x16f)][_0x4d4acf(0x180)]=!![]),!![];},DataManager['readActorsFootStepTag']=function(_0x228081){const _0x4a4585=_0x159f74;for(let _0x2c936e=0x1;_0x2c936e<_0x228081[_0x4a4585(0x20f)];_0x2c936e++){let _0x1d4f86=/<(?:FOOT STEP|FOOT STEPS):[ ](\d+)>/i,_0x4c22a7=/<(.*)(?:STEP|STEPS):[ ](\d+)>/i,_0x17fc48=/<(?:NO STEP|NO STEPS)>/i,_0x55c58a=/<(?:BIG STEP|BIG STEPS)>/i,_0x56da86=/<(?:SMALL STEP|SMALL STEPS)>/i,_0x282fea=/<(?:STEP SOUND|STEPS SOUND)[ ](\d+):[ ]*(.*(?:\s*,\s*\d+)*)>/i,_0xd8aa9=/<(?:4 LEGS STEP|4 LEGS STEPS)>/i,_0x4293b9=/<(?:STEP DURATION|STEPS DURATION):[ ](\d+)>/i,_0x52f94b=_0x228081[_0x2c936e],_0x8cf221=_0x52f94b[_0x4a4585(0x1e5)][_0x4a4585(0x107)](/[\r\n]+/);_0x52f94b[_0x4a4585(0x179)]=null;for(let _0x41d5d7=0x0;_0x41d5d7<_0x8cf221['length'];_0x41d5d7++){let _0x5d72cc=_0x8cf221[_0x41d5d7];if(_0x5d72cc['match'](_0x1d4f86)){let _0x422d96=parseInt(RegExp['$1']);_0x52f94b[_0x4a4585(0x179)]=_0x422d96;}else{if(_0x5d72cc[_0x4a4585(0x1ce)](_0x4c22a7)){let _0x204088=_0x8cf221[_0x41d5d7]['toLowerCase'](),_0x556959=_0x204088[_0x4a4585(0x17e)](_0x204088[_0x4a4585(0x19d)]('<')+0x1,_0x204088['indexOf'](_0x4a4585(0x197)))[_0x4a4585(0x111)]();for(let _0x5e1544 in TSR['footStep'][_0x4a4585(0x1cf)]){if(_0x556959===TSR['footStep'][_0x4a4585(0x1cf)][_0x5e1544][_0x4a4585(0x131)]['toLowerCase']()){let _0x554537=parseInt(RegExp['$2']),_0x45e664='_'+TSR[_0x4a4585(0x16f)][_0x4a4585(0x1cf)][_0x5e1544][_0x4a4585(0x131)][_0x4a4585(0x106)]()+'Block';_0x52f94b[_0x45e664]=_0x554537;}}}else{if(_0x5d72cc[_0x4a4585(0x1ce)](_0x17fc48))_0x52f94b['_noBlock']=!![];else{if(_0x5d72cc[_0x4a4585(0x1ce)](_0x55c58a))_0x52f94b[_0x4a4585(0x1fd)]=1.5;else{if(_0x5d72cc['match'](_0x56da86))_0x52f94b['_scale']=0.5;else{if(_0x5d72cc[_0x4a4585(0x1ce)](_0x282fea)){let _0x1385eb=parseInt(RegExp['$1']),_0x119792=_0x5d72cc[_0x4a4585(0x106)](),_0x23e22d=_0x119792['slice'](_0x119792['indexOf'](':')+0x1);_0x23e22d=TSR['footStep'][_0x4a4585(0x100)](_0x23e22d[_0x4a4585(0x107)](',')),SoundManager[_0x4a4585(0x200)](_0x23e22d),_0x52f94b[_0x4a4585(0x11a)]=_0x52f94b[_0x4a4585(0x11a)]||{},_0x52f94b[_0x4a4585(0x11a)][_0x1385eb]=_0x23e22d;}else{if(_0x5d72cc[_0x4a4585(0x1ce)](_0xd8aa9))_0x52f94b[_0x4a4585(0x157)]=!![];else _0x5d72cc[_0x4a4585(0x1ce)](_0x4293b9)&&(_0x52f94b[_0x4a4585(0x1e9)]=parseInt(RegExp['$1']));}}}}}}}}},DataManager[_0x159f74(0x208)]=function(_0x567ccd){const _0xe4d36e=_0x159f74;if(!$dataMap)return 0x0;let _0x22efea=/<(?:FOOT STEP REGION|FOOT STEP REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x21d3cb=/<(?:WET STEP REGION|WET STEP REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x28f8c5=/<(.*)(?:REGION|REGIONS):[ ]*(\d+\s*\(*\d*\)*(?:\s*,\s*\d+\s*\(*\d*\)*)*)>/i,_0x2b5921=$dataMap[_0xe4d36e(0x1e5)]['split'](/[\r\n]+/);for(let _0x1ba0aa=0x0;_0x1ba0aa<_0x2b5921[_0xe4d36e(0x20f)];_0x1ba0aa++){let _0x5531d9=_0x2b5921[_0x1ba0aa];if(_0x5531d9[_0xe4d36e(0x1ce)](_0x22efea)||_0x5531d9['match'](_0x21d3cb)){let _0x2489a5=_0x2b5921[_0x1ba0aa][_0xe4d36e(0x106)](),_0x1a1038=_0x2489a5[_0xe4d36e(0x17e)](_0x2489a5[_0xe4d36e(0x19d)]('<')+0x1,_0x2489a5[_0xe4d36e(0x19d)](_0xe4d36e(0x14d)))[_0xe4d36e(0x111)](),_0x320f97=_0x2b5921[_0x1ba0aa]['slice'](_0x2b5921[_0x1ba0aa][_0xe4d36e(0x19d)](':')+0x1)[_0xe4d36e(0x107)](',');for(let _0x534bf5 in _0x320f97){if(parseInt(_0x320f97[_0x534bf5])===_0x567ccd)return[_0x1a1038[_0xe4d36e(0x106)](),0x0];}}else{if(_0x5531d9[_0xe4d36e(0x1ce)](_0x28f8c5)){let _0x49876b=_0x2b5921[_0x1ba0aa][_0xe4d36e(0x106)](),_0x3eee02=_0x49876b[_0xe4d36e(0x17e)](_0x49876b[_0xe4d36e(0x19d)]('<')+0x1,_0x49876b[_0xe4d36e(0x19d)](_0xe4d36e(0x14d)))[_0xe4d36e(0x111)](),_0x4890ec=_0x49876b[_0xe4d36e(0x17e)](_0x49876b['indexOf'](':')+0x1)[_0xe4d36e(0x107)](',');for(let _0xba0ad7 in TSR[_0xe4d36e(0x16f)]['_animList']){if(_0x3eee02===TSR['footStep'][_0xe4d36e(0x1cf)][_0xba0ad7][_0xe4d36e(0x131)][_0xe4d36e(0x106)]())for(let _0x1cd30d in _0x4890ec){if(/\(+\d+\)+/[_0xe4d36e(0x1b2)](_0x4890ec[_0x1cd30d])){let _0x1601d2=parseInt(_0x4890ec[_0x1cd30d][_0xe4d36e(0x17e)](0x0,_0x4890ec[_0x1cd30d][_0xe4d36e(0x19d)]('('))),_0x56875d=parseInt(_0x4890ec[_0x1cd30d][_0xe4d36e(0x17e)](_0x4890ec[_0x1cd30d]['indexOf']('(')+0x1));if(_0x1601d2===_0x567ccd)return[_0x3eee02[_0xe4d36e(0x106)](),_0x56875d];}else{if(parseInt(_0x4890ec[_0x1cd30d])===_0x567ccd)return[_0x3eee02[_0xe4d36e(0x106)](),0x0];}}}}}}return 0x0;},Game_Event[_0x159f74(0x18b)][_0x159f74(0x16a)]=function(){const _0x23b43a=_0x159f74;if(!this[_0x23b43a(0x1fb)]())return;let _0x41df45=/<(?:FOOT STEP|FOOT STEPS):[ ](\d+)>/i,_0x5de56b=/<(.*)(?:STEP|STEPS):[ ](\d+)>/i,_0x3d73f1=/<(?:NO STEP|NO STEPS)>/i,_0x446c6f=/<(?:BIG STEP|BIG STEPS)>/i,_0x1b3977=/<(?:SMALL STEP|SMALL STEPS)>/i,_0x52cd84=/<(?:STEP SOUND|STEPS SOUND)[ ](\d+):[ ]*(.*(?:\s*,\s*\d+)*)>/i,_0x33afc0=/<(?:4 LEGS STEP|4 LEGS STEPS)>/i,_0xe66365=/<(?:STEP SET|STEPS SET):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x2e6f03=this[_0x23b43a(0x10f)](),_0x5d321b=_0x2e6f03[_0x23b43a(0x20f)];for(let _0x4f87ca=0x0;_0x4f87ca<_0x5d321b;++_0x4f87ca){let _0x4e3c15=_0x2e6f03[_0x4f87ca];if([0x6c,0x198][_0x23b43a(0x17f)](_0x4e3c15['code'])){if(_0x4e3c15[_0x23b43a(0x1b0)][0x0][_0x23b43a(0x1ce)](_0x41df45)){let _0x26c0b4=parseInt(RegExp['$1']);this['_baseBlock']=_0x26c0b4;}else{if(_0x4e3c15[_0x23b43a(0x1b0)][0x0][_0x23b43a(0x1ce)](_0x5de56b)){let _0x33428c=_0x4e3c15[_0x23b43a(0x1b0)][0x0]['toLowerCase'](),_0x1b9e1a=_0x33428c['slice'](_0x33428c[_0x23b43a(0x19d)]('<')+0x1,_0x33428c['indexOf']('step'))[_0x23b43a(0x111)]();for(let _0x337995 in TSR[_0x23b43a(0x16f)][_0x23b43a(0x1cf)]){if(_0x1b9e1a===TSR['footStep']['_animList'][_0x337995][_0x23b43a(0x131)]['toLowerCase']()){let _0xef619=parseInt(RegExp['$2']),_0x4fbea2='_'+TSR[_0x23b43a(0x16f)][_0x23b43a(0x1cf)][_0x337995]['name'][_0x23b43a(0x106)]()+'Block';this[_0x4fbea2]=_0xef619;}}}else{if(_0x4e3c15[_0x23b43a(0x1b0)][0x0][_0x23b43a(0x1ce)](_0x3d73f1))this[_0x23b43a(0x1be)]=!![];else{if(_0x4e3c15[_0x23b43a(0x1b0)][0x0][_0x23b43a(0x1ce)](_0x446c6f))this['_scale']=1.5;else{if(_0x4e3c15[_0x23b43a(0x1b0)][0x0][_0x23b43a(0x1ce)](_0x1b3977))this[_0x23b43a(0x1fd)]=0.5;else{if(_0x4e3c15['parameters'][0x0][_0x23b43a(0x1ce)](_0x52cd84)){let _0x33cdcc=parseInt(RegExp['$1']),_0x34bc20=_0x4e3c15[_0x23b43a(0x1b0)][0x0],_0x56ab99=_0x34bc20[_0x23b43a(0x17e)](_0x34bc20['indexOf'](':')+0x1);_0x56ab99=TSR[_0x23b43a(0x16f)][_0x23b43a(0x100)](_0x56ab99[_0x23b43a(0x107)](',')),SoundManager[_0x23b43a(0x200)](_0x56ab99),this[_0x23b43a(0x11a)]=this[_0x23b43a(0x11a)]||{},this[_0x23b43a(0x11a)][_0x33cdcc]=_0x56ab99;}else{if(_0x4e3c15[_0x23b43a(0x1b0)][0x0][_0x23b43a(0x1ce)](_0x33afc0))this[_0x23b43a(0x157)]=!![];else{if(_0x4e3c15['parameters'][0x0]['match'](_0xe66365)){let _0x28dcef=_0x4e3c15[_0x23b43a(0x1b0)][0x0],_0x3f6937=_0x28dcef['slice'](_0x28dcef[_0x23b43a(0x19d)](':')+0x1)[_0x23b43a(0x107)](',');if(_0x3f6937[0x0])this['_duration']=parseInt(_0x3f6937[0x0]);if(_0x3f6937[0x1])this[_0x23b43a(0x110)]=parseInt(_0x3f6937[0x1]);if(_0x3f6937[0x2])this[_0x23b43a(0x1c4)]=parseInt(_0x3f6937[0x2]);}}}}}}}}}}},SoundManager['preloadStepSounds']=function(_0x125819){const _0x4222ea=_0x159f74;if(!_0x125819){let _0x258020=[];if(TSR[_0x4222ea(0x16f)]['_baseSound'])_0x258020[_0x4222ea(0x1aa)](TSR[_0x4222ea(0x16f)][_0x4222ea(0x20b)]);for(let _0x272343 in TSR[_0x4222ea(0x16f)][_0x4222ea(0x1cf)]){let _0x1fde80=TSR[_0x4222ea(0x16f)][_0x4222ea(0x1cf)][_0x272343];if(_0x1fde80[_0x4222ea(0x187)])_0x258020[_0x4222ea(0x1aa)](_0x1fde80[_0x4222ea(0x187)]);}for(let _0x58965e in _0x258020){this['loadStepSound'](_0x258020[_0x58965e]);}}else this[_0x4222ea(0x11d)](_0x125819);},SoundManager[_0x159f74(0x11d)]=function(_0xe970ce){const _0x47ef05=_0x159f74;if(!_0xe970ce)return;AudioManager[_0x47ef05(0x1ed)](_0xe970ce);},TSR['footStep'][_0x159f74(0x18c)]=Scene_Boot[_0x159f74(0x169)],Scene_Boot[_0x159f74(0x169)]=function(){const _0x13f9a3=_0x159f74;ImageManager['reserveSystem']('FootSteps'),SoundManager[_0x13f9a3(0x200)](),TSR['footStep'][_0x13f9a3(0x18c)][_0x13f9a3(0x1d8)](this);},Game_Map['prototype'][_0x159f74(0x174)]=function(_0x3db73d,_0x5e592f,_0x52180d,_0x56d8e1,_0x4eaaa8){const _0x19687e=_0x159f74;let _0x56140c=$gamePlayer['x'],_0x5534af=$gamePlayer['y'],_0x78f874=$gameMap[_0x19687e(0x218)](_0x5e592f,_0x52180d,_0x56140c,_0x5534af),_0x3c936a=_0x3db73d-_0x78f874*(_0x3db73d/0x19),_0x12d3ff=_0x4eaaa8?_0x56d8e1*Math[_0x19687e(0x1ae)](0x2-_0x4eaaa8):_0x56d8e1;return[_0x3c936a>0x0?_0x3c936a:0x0,_0x12d3ff];},TSR['footStep'][_0x159f74(0x1f0)]=Game_Event['prototype'][_0x159f74(0x14e)],Game_Event['prototype'][_0x159f74(0x14e)]=function(){const _0xfdbe2e=_0x159f74;TSR[_0xfdbe2e(0x16f)]['_Game_Event_setupPage']['call'](this),this[_0xfdbe2e(0x16a)]();},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0x1a0)]=function(){return this['_noBlock']||![];},Game_Player[_0x159f74(0x18b)]['noBlock']=function(){const _0x5bdcb6=_0x159f74;let _0x228b71=$gameParty[_0x5bdcb6(0x156)]()[_0x5bdcb6(0x18f)];return $dataActors[_0x228b71][_0x5bdcb6(0x1be)]||![];},Game_Follower[_0x159f74(0x18b)][_0x159f74(0x1a0)]=function(){const _0x453570=_0x159f74;let _0x2f8575;if(this[_0x453570(0x1cc)]<=$gameParty['size']()-0x1){let _0x90856e=$gameParty[_0x453570(0x213)]()[this['_memberIndex']][_0x453570(0x18f)];_0x2f8575=$dataActors[_0x90856e][_0x453570(0x1be)];}return _0x2f8575||![];},Game_CharacterBase[_0x159f74(0x18b)]['baseBlock']=function(){const _0x550fbc=_0x159f74;let _0x25f666=this[_0x550fbc(0x1dc)](0x0);return _0x25f666[_0x550fbc(0x1f5)]=this[_0x550fbc(0x179)]||TSR[_0x550fbc(0x16f)][_0x550fbc(0x1c1)],_0x25f666;},Game_Player['prototype'][_0x159f74(0x1dd)]=function(){const _0x1763f2=_0x159f74;let _0x48d9ad=$gameParty[_0x1763f2(0x156)]()[_0x1763f2(0x18f)],_0x460089=this['makeBlock'](0x0);return _0x460089[_0x1763f2(0x1f5)]=$dataActors[_0x48d9ad][_0x1763f2(0x179)]||TSR['footStep'][_0x1763f2(0x1c1)],_0x460089;},Game_Follower['prototype']['baseBlock']=function(){const _0x5709b8=_0x159f74;let _0x426b09;if(this['_memberIndex']<=$gameParty[_0x5709b8(0x216)]()-0x1){let _0x453f98=$gameParty[_0x5709b8(0x213)]()[this['_memberIndex']]['_actorId'];_0x426b09=$dataActors[_0x453f98][_0x5709b8(0x179)];}let _0x342f44=this[_0x5709b8(0x1dc)](0x0);return _0x342f44['block']=_0x426b09||TSR[_0x5709b8(0x16f)][_0x5709b8(0x1c1)],_0x342f44;},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0x1d3)]=function(_0x43d237){const _0x3d2881=_0x159f74;let _0x1b3503=this[_0x3d2881(0x1dc)](_0x43d237)||{},_0x49ab95='_'+_0x43d237+_0x3d2881(0x20a),_0x26e7dc=this[_0x49ab95];return _0x26e7dc?TSR['footStep'][_0x3d2881(0x1cf)][_0x26e7dc]||this['makeBlock'](0x0,_0x26e7dc):_0x1b3503;},Game_Player[_0x159f74(0x18b)][_0x159f74(0x1d3)]=function(_0x3bd05d){const _0x3dfce3=_0x159f74;let _0x578c5a=$gameParty[_0x3dfce3(0x156)]()[_0x3dfce3(0x18f)],_0x47345b=this[_0x3dfce3(0x1dc)](_0x3bd05d)||{},_0x392d75='_'+_0x3bd05d+_0x3dfce3(0x20a),_0x5eac63=$dataActors[_0x578c5a][_0x392d75];return _0x5eac63?TSR[_0x3dfce3(0x16f)][_0x3dfce3(0x1cf)][_0x5eac63]||this['makeBlock'](0x0,_0x5eac63):_0x47345b;},Game_Follower[_0x159f74(0x18b)][_0x159f74(0x1d3)]=function(_0x5c191c){const _0x5eae05=_0x159f74;let _0x2ba274;if(this[_0x5eae05(0x1cc)]<=$gameParty[_0x5eae05(0x216)]()-0x1){let _0x1843ee=$gameParty[_0x5eae05(0x213)]()[this['_memberIndex']][_0x5eae05(0x18f)],_0xcd6b41='_'+_0x5c191c+_0x5eae05(0x20a);_0x2ba274=$dataActors[_0x1843ee][_0xcd6b41];}let _0x48db3c=this[_0x5eae05(0x1dc)](_0x5c191c)||{};return _0x2ba274?TSR[_0x5eae05(0x16f)][_0x5eae05(0x1cf)][_0x2ba274]||this[_0x5eae05(0x1dc)](0x0,_0x2ba274):_0x48db3c;},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0x1dc)]=function(_0x1cf78e,_0x12cd84){const _0x542c3a=_0x159f74;if(!_0x1cf78e)return{'block':_0x12cd84||TSR['footStep'][_0x542c3a(0x1c1)],'animated':0x0,'duration':TSR['footStep']['_baseDuration'],'straight':0x0,'stepUnder':0x0,'startIndex':0x0,'endIndex':0x0,'frameRate':0x0,'opacity':TSR[_0x542c3a(0x16f)][_0x542c3a(0x122)],'loop':0x0,'rotate':0x0,'second':0x0,'wet':0x0,'over':0x0,'sound':TSR[_0x542c3a(0x16f)][_0x542c3a(0x20b)]};else for(let _0x1e00dd in TSR[_0x542c3a(0x16f)][_0x542c3a(0x1cf)]){if(_0x1cf78e===TSR[_0x542c3a(0x16f)][_0x542c3a(0x1cf)][_0x1e00dd]['name'][_0x542c3a(0x106)]())return TSR[_0x542c3a(0x16f)][_0x542c3a(0x1cf)][_0x1e00dd];}},Game_CharacterBase['prototype'][_0x159f74(0x187)]=function(){const _0x3519ce=_0x159f74;return this[_0x3519ce(0x11a)]||![];},Game_Player[_0x159f74(0x18b)][_0x159f74(0x187)]=function(){const _0x1985cc=_0x159f74;let _0x41377c=$gameParty['leader']()[_0x1985cc(0x18f)];return $dataActors[_0x41377c]['_sound']||![];},Game_Follower[_0x159f74(0x18b)][_0x159f74(0x187)]=function(){const _0x4efc69=_0x159f74;let _0x1ea3f8;if(this[_0x4efc69(0x1cc)]<=$gameParty[_0x4efc69(0x216)]()-0x1){let _0x3c4f8d=$gameParty[_0x4efc69(0x213)]()[this[_0x4efc69(0x1cc)]][_0x4efc69(0x18f)];_0x1ea3f8=$dataActors[_0x3c4f8d]['_sound'];}return _0x1ea3f8||![];},Game_CharacterBase['prototype']['requestfootSteps']=function(_0xa8030d){this['_footStepsId']=_0xa8030d;},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0x150)]=function(){const _0x1d3550=_0x159f74;return this[_0x1d3550(0x128)];},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0xf9)]=function(_0x2b6d98){const _0x4c6701=_0x159f74;let _0x1a2f76=_0x2b6d98===_0x4c6701(0x1f3);return this[_0x4c6701(0x1de)]()&&_0x1a2f76?this['baseBlock']():this[_0x4c6701(0x201)];},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0x1ac)]=function(_0x1bbbae,_0x476e0e){const _0x3e10f3=_0x159f74;let _0xdab67c=DataManager['isFootPrintRegionId']($gameMap[_0x3e10f3(0x21a)](_0x1bbbae,_0x476e0e));this[_0x3e10f3(0x152)]=_0xdab67c[0x1];if(_0xdab67c[0x0]===_0x3e10f3(0x181))return this['_wetRegion']=![],this[_0x3e10f3(0x1a4)]=![],this[_0x3e10f3(0x1dd)]();else{if(_0xdab67c[0x0]==='wet\x20step')return this['_wetRegion']=!![],this[_0x3e10f3(0x1a4)]=![],this[_0x3e10f3(0x1dd)]();else{if(_0xdab67c[0x0]){let _0x381e7d=this[_0x3e10f3(0x1d3)](_0xdab67c[0x0]);return this['_wetRegion']=_0x381e7d['wet'],this[_0x3e10f3(0x1a4)]=_0x381e7d[_0x3e10f3(0x12f)],_0x381e7d;}}}return 0x0;},Game_CharacterBase[_0x159f74(0x18b)]['isAnim']=function(){const _0x2e23dd=_0x159f74;return this[_0x2e23dd(0x1a4)];},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0x11f)]=function(){const _0x1a3b43=_0x159f74;let _0x5dd933=DataManager['isFootPrintRegionId']($gameMap[_0x1a3b43(0x21a)](this['_x'],this['_y'])),_0xb87e1f=this['animBlock'](_0x5dd933[0x0]);return _0xb87e1f['animated'];},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0x1de)]=function(){const _0x20e7ca=_0x159f74;return this[_0x20e7ca(0x163)]()&&!this['isNextBlockAnim']();},Game_CharacterBase[_0x159f74(0x18b)][_0x159f74(0x196)]=function(){const _0xb77b78=_0x159f74;return this[_0xb77b78(0x163)]()&&!this[_0xb77b78(0x11f)]()&&!this[_0xb77b78(0x19f)];},Game_CharacterBase[_0x159f74(0x18b)]['startFootSteps']=function(){const _0x9f4708=_0x159f74;this['_footStepsId']=0x0,this[_0x9f4708(0x204)]=0x0;},Game_Character[_0x159f74(0x18b)]['moveStraight']=function(_0x138907){const _0x35878a=_0x159f74;Game_CharacterBase[_0x35878a(0x18b)]['moveStraight'][_0x35878a(0x1d8)](this,_0x138907);let _0x15f580=this['setStepBlock'](this['_x'],this['_y']),_0x4268d3=this['_x']!==this[_0x35878a(0x121)],_0x32484a=this['_y']!==this[_0x35878a(0x203)],_0x34b543=_0x4268d3||_0x32484a,_0x35e0b=TSR[_0x35878a(0x16f)]['_onlyLastFollower']?this[_0x35878a(0x1cc)]===$gameParty[_0x35878a(0x216)]()-0x1:this[_0x35878a(0x1cc)]<=$gameParty[_0x35878a(0x216)]()-0x1;this[_0x35878a(0x201)]=this[_0x35878a(0x1ac)](this[_0x35878a(0x121)],this[_0x35878a(0x203)]),this['_animatedStep']=this[_0x35878a(0x201)][_0x35878a(0x12f)];this[_0x35878a(0x201)]&&!_0x15f580&&this['_wetRegion']&&(this[_0x35878a(0x224)]=!![],this[_0x35878a(0x143)]=0x0);if(this[_0x35878a(0x224)]&&this[_0x35878a(0x143)]<0x4){if(_0x34b543)this['_wetFeetCount']++;}else this[_0x35878a(0x143)]=0x0,this[_0x35878a(0x224)]=0x0;if(this['_wetFeet']&&this[_0x35878a(0x143)]>0x1&&!this[_0x35878a(0x164)])this[_0x35878a(0x201)]=this[_0x35878a(0x1dd)]();if(this['_stepBlock']&&_0x34b543&&!this[_0x35878a(0x1a0)]()){if(!this[_0x35878a(0x1cc)])this[_0x35878a(0x10b)](_0x138907);else _0x35e0b&&$gamePlayer[_0x35878a(0x1d6)][_0x35878a(0x186)]&&this[_0x35878a(0x10b)](_0x138907);}},TSR[_0x159f74(0x16f)][_0x159f74(0x120)]=Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x147)],Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x147)]=function(){const _0x2f6c87=_0x159f74;TSR[_0x2f6c87(0x16f)][_0x2f6c87(0x120)]['call'](this),this['_footStepsSprite']=[],this[_0x2f6c87(0xf8)]=[],this[_0x2f6c87(0x1a2)]=[],this[_0x2f6c87(0x10c)]=0x0;},TSR[_0x159f74(0x16f)][_0x159f74(0x1a1)]=Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x1cb)],Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x1cb)]=function(){const _0x2adde8=_0x159f74;TSR['footStep']['_Sprite_Character_update'][_0x2adde8(0x1d8)](this),this[_0x2adde8(0x1f1)]();},Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x1bb)]=function(){const _0x511e53=_0x159f74,_0x4cc65=this[_0x511e53(0x168)][_0x511e53(0x150)]();_0x4cc65>0x0&&(this[_0x511e53(0x1f7)](_0x4cc65),Imported[_0x511e53(0x1c0)]&&(this[_0x511e53(0x168)][_0x511e53(0x1a7)]()&&this['startFootSteps'](_0x4cc65,!![])),this[_0x511e53(0x168)][_0x511e53(0x1f7)]());},Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x1f7)]=function(_0x4b8fa8,_0x493b0b){const _0x23c6a9=_0x159f74;this['_secondAnim']=!this['_character'][_0x23c6a9(0x1de)]()?this[_0x23c6a9(0x168)]['_stepBlock'][_0x23c6a9(0x1f3)]:![];this['_character'][_0x23c6a9(0x201)][_0x23c6a9(0x1f3)]&&(this['_overAnim']=TSR[_0x23c6a9(0x16f)]['_animList'][this[_0x23c6a9(0x168)][_0x23c6a9(0x201)][_0x23c6a9(0x1f3)]][_0x23c6a9(0x188)]);let _0x1a3eae=this[_0x23c6a9(0x1e0)]('first',_0x4b8fa8,![],_0x493b0b);_0x493b0b?this['_reflectionSteps'][_0x23c6a9(0x1aa)](_0x1a3eae):this[_0x23c6a9(0x108)]['push'](_0x1a3eae);if(this[_0x23c6a9(0x21f)]){if(this['_overAnim']){let _0x349d2b=this[_0x23c6a9(0x153)](_0x23c6a9(0xfa),_0x4b8fa8,this[_0x23c6a9(0x21f)],_0x493b0b);_0x493b0b?this[_0x23c6a9(0x1a2)][_0x23c6a9(0x1aa)](_0x349d2b):this[_0x23c6a9(0xf8)][_0x23c6a9(0x1aa)](_0x349d2b);}else{let _0x174e9d=this[_0x23c6a9(0x1e0)](_0x23c6a9(0xfa),_0x4b8fa8,this['_secondAnim'],_0x493b0b);_0x493b0b?this[_0x23c6a9(0x1a2)][_0x23c6a9(0x1aa)](_0x174e9d):this['_footStepsSprite']['push'](_0x174e9d);}}if(!this[_0x23c6a9(0x168)][_0x23c6a9(0x14f)]){let _0x541883=this[_0x23c6a9(0x1e0)](_0x23c6a9(0x1f3),_0x4b8fa8,![],_0x493b0b);_0x493b0b?this[_0x23c6a9(0x1a2)][_0x23c6a9(0x1aa)](_0x541883):this[_0x23c6a9(0x108)][_0x23c6a9(0x1aa)](_0x541883);if(this[_0x23c6a9(0x21f)]){if(this[_0x23c6a9(0x1a3)]){let _0x450259=this['createStepOverAnim']('second',_0x4b8fa8,this['_secondAnim'],_0x493b0b);_0x493b0b?this['_reflectionSteps']['push'](_0x450259):this[_0x23c6a9(0xf8)]['push'](_0x450259);}else{let _0x3beca9=this[_0x23c6a9(0x1e0)](_0x23c6a9(0x1f3),_0x4b8fa8,this['_secondAnim'],_0x493b0b);_0x493b0b?this[_0x23c6a9(0x1a2)][_0x23c6a9(0x1aa)](_0x3beca9):this[_0x23c6a9(0x108)][_0x23c6a9(0x1aa)](_0x3beca9);}}}},Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x1e0)]=function(_0x554e6e,_0x4c24d9,_0x164229,_0x4345d5){const _0x1960d0=_0x159f74;let _0x52b119=new Sprite_FootSteps(this['_character'][_0x1960d0(0x152)]);_0x554e6e==='first'?(_0x52b119['x']=this['x'],_0x52b119['y']=this['y']):(_0x52b119['x']=this['x']+this[_0x1960d0(0xf6)](_0x4c24d9),_0x52b119['y']=this['y']+this[_0x1960d0(0x13f)](_0x4c24d9));let _0x2885f3=this[_0x1960d0(0x105)](this['_character']['moveSpeed']()),_0x542af0=TSR[_0x1960d0(0x16f)][_0x1960d0(0x1cf)][_0x164229],_0x2741a6=this[_0x1960d0(0x168)]['stepBlock'](_0x554e6e),_0x23d00e=_0x164229?_0x542af0:_0x2741a6;_0x23d00e[_0x1960d0(0x15f)]&&(_0x52b119['rotation']=this['getAngle'](_0x4c24d9)*0x5a*Math['PI']/0xb4);this[_0x1960d0(0x168)]['_scale']&&_0x23d00e[_0x1960d0(0x12f)]&&(_0x52b119[_0x1960d0(0x1b9)]['x']=this[_0x1960d0(0x168)]['_scale'],_0x52b119['scale']['y']=this[_0x1960d0(0x168)][_0x1960d0(0x1fd)]);!this[_0x1960d0(0x168)][_0x1960d0(0x157)]&&!_0x23d00e[_0x1960d0(0x12b)]&&this[_0x1960d0(0x177)](_0x52b119,_0x4c24d9,_0x554e6e,_0x164229,_0x4345d5);if(this['_character'][_0x1960d0(0x196)]())_0x52b119['visible']=![];return _0x52b119['setup'](_0x23d00e,_0x4c24d9,this[_0x1960d0(0x192)](),_0x23d00e['animated'],_0x554e6e,_0x2885f3,this[_0x1960d0(0x168)],_0x4345d5),_0x4345d5?SceneManager[_0x1960d0(0x1d7)][_0x1960d0(0x11e)]['_reflectionSteps'][_0x1960d0(0x1e2)](_0x52b119):SceneManager[_0x1960d0(0x1d7)][_0x1960d0(0x11e)]['_footStepSprite'][_0x1960d0(0x1e2)](_0x52b119),_0x52b119;},Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x153)]=function(_0x4a325a,_0x4f98c1,_0x57a746,_0x36bc76){const _0x1c4af2=_0x159f74;let _0xa00396=new Sprite_FootSteps(this[_0x1c4af2(0x168)][_0x1c4af2(0x152)]);_0x4a325a==='first'?(_0xa00396['x']=this['x'],_0xa00396['y']=this['y']):(_0xa00396['x']=this['x']+this[_0x1c4af2(0xf6)](_0x4f98c1),_0xa00396['y']=this['y']+this[_0x1c4af2(0x13f)](_0x4f98c1));let _0xa6a029=this[_0x1c4af2(0x105)](this[_0x1c4af2(0x168)][_0x1c4af2(0x1e6)]()),_0x473504=TSR[_0x1c4af2(0x16f)][_0x1c4af2(0x1cf)][_0x57a746],_0x24f065=this[_0x1c4af2(0x168)][_0x1c4af2(0xf9)](_0x4a325a),_0x262009=_0x57a746?_0x473504:_0x24f065;_0x262009[_0x1c4af2(0x15f)]&&(_0xa00396[_0x1c4af2(0x160)]=this[_0x1c4af2(0x21b)](_0x4f98c1)*0x5a*Math['PI']/0xb4);this['_character']['_scale']&&_0x262009[_0x1c4af2(0x12f)]&&(_0xa00396[_0x1c4af2(0x1b9)]['x']=this['_character'][_0x1c4af2(0x1fd)],_0xa00396[_0x1c4af2(0x1b9)]['y']=this['_character'][_0x1c4af2(0x1fd)]);!this[_0x1c4af2(0x168)][_0x1c4af2(0x157)]&&!_0x262009[_0x1c4af2(0x12b)]&&this[_0x1c4af2(0x177)](_0xa00396,_0x4f98c1,_0x4a325a,_0x57a746,_0x36bc76);if(this['_character'][_0x1c4af2(0x196)]())_0xa00396['visible']=![];return _0xa00396[_0x1c4af2(0x170)](_0x262009,_0x4f98c1,this[_0x1c4af2(0x192)](),_0x262009[_0x1c4af2(0x12f)],_0x4a325a,_0xa6a029,this[_0x1c4af2(0x168)],_0x36bc76),_0x36bc76?SceneManager['_scene']['_spriteset'][_0x1c4af2(0x1a2)][_0x1c4af2(0x1e2)](_0xa00396):SceneManager[_0x1c4af2(0x1d7)]['_spriteset'][_0x1c4af2(0x1d4)]['addChild'](_0xa00396),_0xa00396;},Sprite_Character['prototype'][_0x159f74(0x177)]=function(_0x5466b9,_0x377cc0,_0x4ac946,_0x72f772,_0x462ad4){const _0x544f4b=_0x159f74;let _0x51ce50=0x0,_0x2c3dd2=_0x462ad4?_0x544f4b(0xfb):_0x544f4b(0x1df),_0x374400=_0x462ad4?'_reflectAnimDash':_0x544f4b(0x135);_0x4ac946===_0x544f4b(0xfa)?!_0x72f772?this['_character']['_dashing']&&!this[_0x2c3dd2]?(_0x51ce50=!![],this[_0x2c3dd2]=!![]):(_0x51ce50=![],this[_0x2c3dd2]=![]):(this[_0x374400]=this[_0x2c3dd2]?0x0:0x1,this[_0x544f4b(0x168)][_0x544f4b(0x14f)]&&!this[_0x374400]?(_0x51ce50=!![],this[_0x374400]=!![]):(_0x51ce50=![],this[_0x374400]=![])):_0x51ce50=!![],_0x51ce50?_0x377cc0===0x2||_0x377cc0===0x8?_0x5466b9['x']+=0x4:_0x5466b9['y']+=0x4:_0x377cc0===0x2||_0x377cc0===0x8?_0x5466b9['x']-=0x4:_0x5466b9['y']-=0x4;},Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x192)]=function(){const _0x59dc74=_0x159f74;let _0x564d00=this[_0x59dc74(0x10c)];if(!this[_0x59dc74(0x139)]&&this[_0x59dc74(0x10c)]<0x2){this[_0x59dc74(0x10c)]++;if(this[_0x59dc74(0x10c)]===0x2)this[_0x59dc74(0x139)]=!![];}else{if(this['_goLeft']&&this[_0x59dc74(0x10c)]>0x0){this[_0x59dc74(0x10c)]--;if(this['_stepFrameIndex']===0x0)this[_0x59dc74(0x139)]=![];}}return _0x564d00;},Sprite_Character['prototype']['setSecondStepHpos']=function(_0x28475d){if(_0x28475d===0x2||_0x28475d===0x8)return 0x0;return _0x28475d===0x4?-0x18:0x18;},Sprite_Character['prototype'][_0x159f74(0x13f)]=function(_0x2cb379){if(_0x2cb379===0x4||_0x2cb379===0x6)return 0x0;return _0x2cb379===0x8?-0x18:0x18;},Sprite_Character['prototype'][_0x159f74(0x105)]=function(_0x2c22e9){switch(_0x2c22e9){case 0x1:return 0x3c;case 0x2:return 0x2c;case 0x3:return 0x1b;case 0x4:return 0xa;case 0x5:return 0x8;case 0x6:return 0x6;default:return 0xa;}},Sprite_Character[_0x159f74(0x18b)][_0x159f74(0x21b)]=function(_0x375c84){if(_0x375c84===0x2)return 0x2;else{if(_0x375c84===0x4)return 0x3;else return _0x375c84===0x6?0x1:0x0;}},Sprite_Character['prototype']['updateFootSteps']=function(){const _0x388b03=_0x159f74;this['setupFootSteps'](),this['_footStepsSprite'][_0x388b03(0x20f)]>0x0&&(!this[_0x388b03(0x108)][0x0][_0x388b03(0x1af)]()&&(SceneManager[_0x388b03(0x1d7)][_0x388b03(0x11e)][_0x388b03(0x19b)][_0x388b03(0x190)](this['_footStepsSprite'][0x0]),this[_0x388b03(0x108)][_0x388b03(0x1b3)]())),this[_0x388b03(0xf8)][_0x388b03(0x20f)]>0x0&&(!this[_0x388b03(0xf8)][0x0][_0x388b03(0x1af)]()&&(SceneManager[_0x388b03(0x1d7)][_0x388b03(0x11e)][_0x388b03(0x1d4)][_0x388b03(0x190)](this[_0x388b03(0xf8)][0x0]),this[_0x388b03(0xf8)][_0x388b03(0x1b3)]())),this['_reflectionSteps'][_0x388b03(0x20f)]>0x0&&(!this[_0x388b03(0x1a2)][0x0][_0x388b03(0x1af)]()&&(SceneManager[_0x388b03(0x1d7)][_0x388b03(0x11e)]['_reflectionSteps'][_0x388b03(0x190)](this[_0x388b03(0x1a2)][0x0]),this[_0x388b03(0x1a2)][_0x388b03(0x1b3)]()));},TSR['footStep'][_0x159f74(0x226)]=Spriteset_Map[_0x159f74(0x18b)][_0x159f74(0x11c)],Spriteset_Map['prototype'][_0x159f74(0x11c)]=function(){const _0x154532=_0x159f74;TSR[_0x154532(0x16f)][_0x154532(0x226)][_0x154532(0x1d8)](this),this[_0x154532(0x205)]();},Spriteset_Map[_0x159f74(0x18b)][_0x159f74(0x205)]=function(){const _0x4fe6e3=_0x159f74;this[_0x4fe6e3(0x19b)]=new Sprite(),this['_footStepSprite'][_0x4fe6e3(0x15d)](0x0,0x0,this[_0x4fe6e3(0x225)],this[_0x4fe6e3(0x14c)]),this[_0x4fe6e3(0x19b)]['z']=0x2,this[_0x4fe6e3(0x14a)][_0x4fe6e3(0x1e2)](this['_footStepSprite']),this[_0x4fe6e3(0x1d4)]=new Sprite(),this[_0x4fe6e3(0x1d4)][_0x4fe6e3(0x15d)](0x0,0x0,this['width'],this[_0x4fe6e3(0x14c)]),this['_spriteOverAnim']['z']=0x7,this[_0x4fe6e3(0x14a)]['addChild'](this['_spriteOverAnim']),this[_0x4fe6e3(0x1a2)]=new Sprite(),this[_0x4fe6e3(0x1a2)][_0x4fe6e3(0x15d)](0x0,0x0,this[_0x4fe6e3(0x225)],this[_0x4fe6e3(0x14c)]),this[_0x4fe6e3(0x1a2)]['z']=-0.5,this[_0x4fe6e3(0x14a)][_0x4fe6e3(0x1e2)](this[_0x4fe6e3(0x1a2)]);});function Sprite_FootSteps(){const _0x1ea341=_0x159f74;this[_0x1ea341(0x148)][_0x1ea341(0x17c)](this,arguments);}Sprite_FootSteps['prototype']=Object[_0x159f74(0x199)](Sprite['prototype']),Sprite_FootSteps[_0x159f74(0x18b)][_0x159f74(0x1bf)]=Sprite_FootSteps,Sprite_FootSteps[_0x159f74(0x18b)][_0x159f74(0x148)]=function(_0x2a695a){const _0x84da6b=_0x159f74;Sprite[_0x84da6b(0x18b)]['initialize']['call'](this),this[_0x84da6b(0x147)](),this[_0x84da6b(0x198)](_0x2a695a);},Sprite_FootSteps['prototype'][_0x159f74(0x147)]=function(){const _0x2cbb14=_0x159f74;this[_0x2cbb14(0x128)]=0x0,this['_duration']=0x0,this['_animStep']=0x0,this[_0x2cbb14(0x1b7)]['x']=0.5,this[_0x2cbb14(0x1b7)]['y']=0.5,this[_0x2cbb14(0x132)]=0x0,this[_0x2cbb14(0x119)]=0x0;},Sprite_FootSteps['prototype'][_0x159f74(0x198)]=function(_0x51c013){const _0x1f49e9=_0x159f74;this['bitmap']=ImageManager[_0x1f49e9(0x1b4)](_0x1f49e9(0x146),_0x51c013),this[_0x1f49e9(0x15d)](0x0,0x0,0x0,0x0);},Sprite_FootSteps['prototype'][_0x159f74(0x170)]=function(_0x255343,_0x1bea7f,_0x442821,_0x3785fe,_0x5c67d4,_0x36828d,_0x220b93,_0xd94b33){const _0x495bab=_0x159f74,_0x45b877=new Sprite(),_0x31752f=_0x220b93['_wetFeet'],_0x383a94=_0x220b93[_0x495bab(0x121)],_0x4f4907=_0x220b93[_0x495bab(0x203)],_0x2a7efb=_0x220b93['_scale'];if(_0x255343[_0x495bab(0x187)]||_0x220b93[_0x495bab(0x187)]()){const _0x4961bd=_0x220b93[_0x495bab(0x187)]()?_0x220b93[_0x495bab(0x187)]()[_0x255343[_0x495bab(0x1f5)]]||_0x255343[_0x495bab(0x187)]:_0x255343[_0x495bab(0x187)],_0x530d27=_0x4961bd['maxVol'],_0x51d849=_0x4961bd[_0x495bab(0xfe)],_0x376952=$gameMap[_0x495bab(0x174)](_0x530d27,_0x383a94,_0x4f4907,_0x51d849,_0x2a7efb);_0x4961bd[_0x495bab(0x129)]=_0x376952[0x0],_0x4961bd['pitch']=_0x376952[0x1];if(!_0x31752f)AudioManager[_0x495bab(0x158)](_0x4961bd);}_0x45b877[_0x495bab(0x126)]=this[_0x495bab(0x126)],this['_character']=_0x220b93,this[_0x495bab(0x1fa)]=_0x5c67d4,this[_0x495bab(0x217)]=_0x36828d,this[_0x495bab(0x1e9)]=_0x220b93[_0x495bab(0x1e9)]||_0x255343['duration'],this[_0x495bab(0x1e9)]+=_0x5c67d4===_0x495bab(0xfa)?_0x36828d:_0x36828d*0x2,this['_stepBlock']=_0x255343[_0x495bab(0x1f5)],this['_stepUnder']=_0x255343[_0x495bab(0x1c9)],this[_0x495bab(0x1a5)]=_0x1bea7f,this[_0x495bab(0x1c8)]=_0x3785fe?_0x255343[_0x495bab(0x140)]:_0x442821,this[_0x495bab(0x209)]=_0x220b93[_0x495bab(0x1c4)]||_0x255343[_0x495bab(0x132)],this[_0x495bab(0x1d0)]=_0x3785fe,this[_0x495bab(0x166)]=_0x220b93['_rate']||_0x255343['frameRate'],this[_0x495bab(0x15e)]=_0x255343[_0x495bab(0x19a)],this[_0x495bab(0x1ff)]=_0x255343[_0x495bab(0x112)],this[_0x495bab(0x12e)]=0x0,this[_0x495bab(0x176)]=_0xd94b33,this['_tileWidth']=$gameMap[_0x495bab(0x1ad)]();const _0x1af18e=_0x3785fe?Math[_0x495bab(0x116)](this[_0x495bab(0x1c8)]/0x3):(_0x1bea7f-0x2)/0x2,_0x4ac898=this[_0x495bab(0x18e)],_0x36a035=this['_tileWidth'],_0xb67595=(this[_0x495bab(0x20c)](this['_stepBlock'])+_0x442821)*_0x4ac898,_0x562824=(this[_0x495bab(0x18d)](this['_stepBlock'])+_0x1af18e)*_0x36a035;this[_0x495bab(0x15d)](_0xb67595,_0x562824,_0x4ac898,_0x36a035),this['_lastDisplayX']=$gameMap[_0x495bab(0x1b1)],this['_lastDisplayY']=$gameMap[_0x495bab(0x101)],_0xd94b33&&(this['y']-=0x2*(this['_character'][_0x495bab(0x1e3)]()*this[_0x495bab(0x18e)])-this['_tileWidth']);},Sprite_FootSteps[_0x159f74(0x18b)][_0x159f74(0x20c)]=function(_0xab40d){return _0xab40d%0x4*0x3;},Sprite_FootSteps[_0x159f74(0x18b)]['block_y']=function(_0x228009){const _0x207f0b=_0x159f74;return Math[_0x207f0b(0x116)](_0x228009/0x4)*0x4;},Sprite_FootSteps[_0x159f74(0x18b)][_0x159f74(0x1cb)]=function(){const _0x4a0899=_0x159f74;Sprite[_0x4a0899(0x18b)][_0x4a0899(0x1cb)]['call'](this),this[_0x4a0899(0x1a9)](),this['_duration']>0x0&&(this[_0x4a0899(0x20d)]&&(this[_0x4a0899(0x132)]=0xff,this[_0x4a0899(0x10a)]=!![],this[_0x4a0899(0x119)]=this[_0x4a0899(0x217)],this[_0x4a0899(0x20d)]=![]),this['_type']===_0x4a0899(0x1f3)&&this[_0x4a0899(0x119)]<this[_0x4a0899(0x217)]?this['_stepWait']++:this['opacity']<0xff&&!this[_0x4a0899(0x10a)]?(this[_0x4a0899(0x1e9)]--,this[_0x4a0899(0x132)]+=Math[_0x4a0899(0x116)](0xff/this[_0x4a0899(0x217)])):(this[_0x4a0899(0x10a)]=!![],this[_0x4a0899(0x1d0)]&&this['_animationCount']%this[_0x4a0899(0x166)]===0x0&&this[_0x4a0899(0x228)](),this[_0x4a0899(0x12e)]++,this['_duration']--,this[_0x4a0899(0x132)]-=this['_opRate']));},Sprite_FootSteps[_0x159f74(0x18b)]['updateStepScroll']=function(){const _0x3276e5=_0x159f74;let _0x325672=0x0,_0x700866=0x0;$gameMap[_0x3276e5(0x1b1)]!==this[_0x3276e5(0x15b)]&&(_0x325672=$gameMap['_displayX']-this[_0x3276e5(0x15b)]),$gameMap[_0x3276e5(0x101)]!==this[_0x3276e5(0x202)]&&(_0x700866=$gameMap[_0x3276e5(0x101)]-this[_0x3276e5(0x202)]),this['x']=this['x']-_0x325672*$gameMap[_0x3276e5(0x1ad)](),this['y']=this['y']-_0x700866*$gameMap[_0x3276e5(0x1ec)](),this[_0x3276e5(0x15b)]=$gameMap['_displayX'],this[_0x3276e5(0x202)]=$gameMap[_0x3276e5(0x101)];},Sprite_FootSteps[_0x159f74(0x18b)]['updateFootStepAnim']=function(){const _0x5cbfcc=_0x159f74,_0x18f2de=this[_0x5cbfcc(0x18e)],_0x5b2e09=this[_0x5cbfcc(0x1c8)],_0x3f4bc0=Math[_0x5cbfcc(0x116)](_0x5b2e09/0x3),_0x2e0824=_0x18f2de,_0x504bd4=_0x18f2de,_0x2d4f32=(this[_0x5cbfcc(0x20c)](this['_stepBlock'])+_0x5b2e09%0x3)*_0x2e0824,_0x5dd468=(this[_0x5cbfcc(0x18d)](this[_0x5cbfcc(0x201)])+_0x3f4bc0)*_0x504bd4;this[_0x5cbfcc(0x15d)](_0x2d4f32,_0x5dd468,_0x2e0824,_0x504bd4),this[_0x5cbfcc(0x1c8)]=this[_0x5cbfcc(0x10d)](_0x5b2e09);},Sprite_FootSteps['prototype'][_0x159f74(0x10d)]=function(_0x456f9e){const _0x4d0574=_0x159f74;if(_0x456f9e<this[_0x4d0574(0x15e)])_0x456f9e++;else{if(this[_0x4d0574(0x1ff)]===0x1)_0x456f9e=0x0;else this[_0x4d0574(0x1ff)]===0x2?_0x456f9e=this[_0x4d0574(0x15e)]:this[_0x4d0574(0x1e9)]=0x0;}return _0x456f9e;},Sprite_FootSteps[_0x159f74(0x18b)][_0x159f74(0x1af)]=function(){const _0xde7a2f=_0x159f74;return this[_0xde7a2f(0x1e9)]>0x0;};
})();

//== END =================================================================================
//========================================================================================