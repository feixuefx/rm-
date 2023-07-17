//==========================================================================
// Eli_CustomParameter.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderBefore EliMZ_ClassCurves
@orderAfter EliMZ_EnemyClass

@plugindesc ♦5.0.1♦ Adds new custom parameters to battlers!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-custom-parameters-for-rpg-maker

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
特色功能
============================================================================

● 为角色和敌人添加新的自定义属性。
● 通过注释和脚本调用控制自定义属性。
● 为这些属性增加相应的buff和debuff，以及增长后的效果。

============================================================================
如何使用
============================================================================

♦ 插件参数 ♦

在本插件的"New parameters"项中增加你需要自定义的属性。

ShortName → 该自定义属性的缩写。注释和脚本调用均使用该名称。
FullName → 该自定义属性的全称。出现在战斗记录界面等。
HP/MP/TP type → 决定该属性是否和HP/MP/TP一样实时增减。

之后，可以设置该自定义属性的buff和Debuff图标序列。
其与原版默认属性相同，在图标栏中对应某一图标并按照序列顺延。
除特殊情况外，范围必须等同于你增加的自定义属性数量。
默认情况如下：

原版自带8个属性：hp, mp, atk……等等。
这些属性的buff图标序号是从32到48.
这表示32号图标对应Hp Buff L1,33号是 Hp buff L2，以此类推。
Debuff也相同，其分布自48至62号。
48号是 Hp Debuff L1，49号是 Hp Debuff L2，以此类推。 

因此必须按照这一逻辑设定自定义属性的buff和debuff图标。

♦ 注释部分 ♦

在道具和技能的注释栏内，依下列格式添加自定义属性的效果：

<AddCBuff: paramId/shortName:turns >
<RemoveCBuff: paramId/shortName >

<AddCDebuff: paramId/shortName:turns >
<RemoveCDebuff: paramId/shortName >

<GrowC:paramId/shortName:value >

若需要添加一个以上的自定义属性，请用逗号分隔。

为装备/职业/敌人添加自定义属性变化，请在注释栏中依以下格式添加:
（敌人注释栏的效果只对无职业的敌人生效，防止与Eli Enemy Classes插件冲突。)

<CParams:paramId/shortName:value, paramId/shortName:value>

也可以使用paramId或自定义属性的缩写。
ID默认从0开始，这表示0号自定义属性将成为你新设置的首个自定义属性。

示例:
<CParams: crm:23, 1:37> 
增加23点自定义属性crm，同时增加37点1号自定义属性。

此外还可以使用插件的自定义属性模板：
<CParams: TemplateName>

此两种方式下若不赋特定值，则默认为0。

         ***注意：注释区分大小写！***

♦ 脚本调用 ♦

对角色或敌人：
$gameActors.actor(ID).[script call] => 自机角色
$gameParty.members()[index].[script call] => 某类属性/全队？
$gameTroop.members()[index].[script call] => 敌人

.cparamBase(paramId)
.cparamPlus(paramId)
.cparam(paramId)
.addCParam(paramId, value)

示例:

$gameParty.members()[0].cparam(0) => 返回首个自定义属性的值。

也可以使用该自定义属性的缩写直接引用:
$gameParty.members()[0].crm => 返回自定义属性crm（charm）的值。

对于设定为如HP/MP/TP等即时变动的自定义属性，上述命令将返回其当前值。
若需要返回其最大值，则需要在缩写前增加"max"前缀：
$gameParty.members()[0].maxrep => 返回自定义属性rep的最大值。

如需改变此类自定义属性的当前值而非最大值，则用以下代码：
$gameParty.members()[0].changeCustomHpParam(paramId/shortName, value)

若需要直接设定某值，则用以下代码：
$gameParty.members()[0].setCustomHpParam(paramId/shortName, value)

对于非HP/MP/TP等即时变动类的自定义属性，则用以下代码：
$gameParty.members()[0].setCustomParam(paramId/shortName, value)

该指令非加减，而是将该自定义属性的值直接设定为特定值。

注¹: 游戏中的“完全恢复”效果也会把这些类HP的自定义属性一并完全恢复。

注²: 使用MZ时可以直接使用插件命令。
============================================================================
Update Log
============================================================================

https://tinyurl.com/customParameter

============================================================================

@param list
@text 新的属性
@type struct<stCustomParam>[]
@desc 在此设置你的自定义属性。
@default ["{\"shortName\":\"per\",\"name\":\"Perception\",\"isHp\":\"false\"}","{\"shortName\":\"crm\",\"name\":\"Charm\",\"isHp\":\"false\"}","{\"shortName\":\"wis\",\"name\":\"Wisdom\",\"isHp\":\"false\"}","{\"shortName\":\"rep\",\"name\":\"Reputation\",\"isHp\":\"true\"}"]

@param templates
@text 自定义属性模板
@type struct<templateST>[]
@desc 为自定义属性的增减进行预设。
@default ["{\"name\":\"TemplateExample\",\"list\":\"[\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"rep\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"7\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"3\\\\\\\"}\\\"]\"}"]

@param buffIcon
@text Buff标志
@type text
@desc 选择图标序列中的减益起始图标。鼠标右键可视化插入图表索引。
@default 32

@param debuffIcon
@text Debuff标志
@type text
@desc 选择图标序列中的减益起始图标。鼠标右键可视化插入图表索引。
@default 48

@command changeParam
@text 增减自定义属性
@desc 如游戏中的事件一般对自定义属性进行增减。

    @arg battlerType
    @text 对象类型
    @type select
    @option actor
    @option party
    @option enemy
    @desc 对敌人/敌队的设置仅在战斗中生效。 
    角色或单个敌人对应数据库ID，队伍或敌队对应序列索引。
    Actor/Enemy = battler Id || Party/Troop = Member Index
    @default party

    @arg battlerId
    @text 对象ID
    @type text
    @desc 指定数据库中索引序列的队伍和敌队，或对应序号的角色或敌人。用","分隔每个对象。-1为全队。
    @default 1

    @arg id
    @text 自定义属性ID
    @type text
    @desc 选择需要修改的自定义属性ID或缩写。
    @default 0

    @arg value
    @text 增减的数值
    @type text
    @desc 需要增加或减少的数值。使用 \v[id] 引用变量值。
    @default 0

@command changeHpParam
@text 如HP般增减自定义属性
@desc 应用于设定为类HP/MP/TP的自定义属性。

    @arg battlerType
    @text 对象类别
    @type select
    @option actor
    @option party
    @option enemy
    @option troop
    @desc 对敌人/敌队的设置仅在战斗中生效。 
    角色或单个敌人对应数据库ID，队伍或敌队对应序列索引。
	Actor/Enemy = battler Id || Party/Troop = Member Index
    @default party

    @arg battlerId
    @text 对象ID
    @type text
    @desc 指定数据库中索引序列的队伍和敌队，或对应序号的角色或敌人。用","分隔每个对象。-1为全队。
    @default 1

    @arg id
    @text 自定义属性ID
    @type text
    @desc 选择需要修改的自定义属性ID或缩写。
    @default 0

    @arg value
    @text 增减的数值
    @type text
    @desc 需要增加或减少的数值。使用 \v[id] 引用变量值。
    @default 0

*/

/* ------------------------------ CUSTOM PARAM ------------------------------ */
{
/*~struct~stCustomParam:

@param shortName
@text 自定义属性缩写
@type text
@desc 用于指定变量对象和脚本引用。
@default per

@param name
@text 自定义属性全称
@type text
@desc 在菜单中显示的自定义属性全称。
@default Perception

@param isHp
@text 是否为类HP/MP/TP属性
@type boolean
@desc 若为true，则该属性将和HP/MP/TP一样实时增减。
@default false

*/
}

/* --------------------------- CHANGE CUSTOM PARAM -------------------------- */
{
/*~struct~changeCustomParamSt:

@param id
@text 自定义属性ID
@type text
@desc 需要变更的自定义属性ID或缩写。
@default 0

@param value
@text 增减的数值
@type text
@desc 需要增加或减少的数值。使用 \v[id] 引用变量值。
@default 0

@param battlerType
@text 对象类别
@type select
@option actor
@option party
@option enemy
@option troop
@desc 对敌人/敌队的设置仅在战斗中生效。 
角色或单个敌人对应数据库ID，队伍或敌队对应序列索引。
Actor/Enemy = battler Id || Party/Troop = Member Index
@default party

@param battlerId
@text 对象ID
@type text
@desc 指定数据库中索引序列的队伍和敌队，或对应序号的角色或敌人。用","分隔每个对象。-1为全队。
@default 1

*/
}

/* -------------------------------- TEMPLATE -------------------------------- */
{
/*~struct~templateST:

@param name
@text 范例名称
@type text
@desc 在注释中直接调用的预设模板名称。
@default 0

@param list
@text 自定义属性
@type struct<templateValueST>[]
@desc 增加到职业/装备的自定义属性列表。
@default []

*/
}

/* ----------------------- CUSTOM PARAM VALUE TEMPLATE ---------------------- */
{
/*~struct~templateValueST:

@param id
@text 自定义属性ID
@type text
@desc 需要变更的自定义属性ID或缩写。
@default 0

@param value
@text 增减的数值
@type number
@desc 本自定义属性需要增加或减少的数值。
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CustomParameter = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.CustomParameter = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-custom-parameters-for-rpg-maker",
    parameters: {
        list: [ {shortName: '', name:'', isHp: false} ],
        templates: [ {name: '', list: [{id: 0, value: 0}]} ],
        buffIcon: 0,
        debuffIcon: 0,

    },
    alias: {},
    hpTypeParams: [],

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.createParamPropertyOnBattlers()
        this.createHpTypeParams()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = ['changeParam', 'changeHpParam']
        Eli.PluginManager.registerCommands(this, commands)
    },

    createHpTypeParams(){
        for(const param of this.parameters.list){
            if(param.isHp){
                this.hpTypeParams.push(`_${param.shortName}`)
            }
        }
    },

    param(){
        return this.parameters
    },

    findCParamId(cparam){
        if(isNaN(cparam)){
            cparam = Eli.String.removeSpaces(cparam)
            cparam = this.parameters.list.findIndex(item => 
                item.name.includes(cparam) ||
                item.shortName.includes(cparam)
            )
        }

        return Number(cparam)
    },

    createParamPropertyOnBattlers(){
        const addToBattler = (param, id) => {
            if(param.isHp){
                const maxName = `max${param.shortName}`
                this.addParameterToBattler(param.shortName, id, maxName)
            }else{
                this.addParameterToBattler(param.shortName, id)
            }
        }
        this.parameters.list.forEach(addToBattler)
    },

    getShortName(id){
        return this.parameters.list[id].shortName
    },

    getFullName(id){
        return this.parameters.list[id].name
    },

    isHpType(id){
        return this.parameters.list[id].isHp
    },

    getMaxName(id){
        return `max${this.parameters.list[id].shortName}`
    },

    get_name(id){
        return `_${this.parameters.list[id].shortName}`
    },

    addParameterToBattler(name, id, maxName){
        if(maxName){
            Object.defineProperties(Game_BattlerBase.prototype, {
                [maxName]: { get: function() { return this.cparam(id); }, configurable: true },
                [name]: { get: function() { return this[`_${name}`] }, configurable: true },
            })
        }else{
            Object.defineProperties(Game_BattlerBase.prototype, {
                [name]: { get: function() { return this.cparam(id); }, configurable: true },
            })
        }

    },

    list(){
        return this.parameters.list
    },

    cParamsLength(){
        return this.parameters.list.length
    },

    getBattlerId(battlerId){
        if(battlerId.includes(",")){
            return battlerId.split(",").map(item => Number(item))
        }else{
            return [Number(battlerId)]
        }
    },

    getParsedArgsForChangeParam(args){
        let {battlerType, battlerId, id, value} = args
        battlerId = this.getBattlerId(battlerId)
        value = Number(Eli.Utils.convertEscapeVariablesOnly(value))
        id = this.findCParamId(id)

        return [battlerType, battlerId, id, value]
    },

    changeParam(args){
        var addParam = () => {}
        const [battlerType, battlerId, id, value] = this.getParsedArgsForChangeParam(args)
    
        if(battlerId[0] === -1){
            this.changeParamForAll(battlerType, value, id)
        }else{
            const isBattleScene = SceneManager._scene instanceof Scene_Battle

            if(battlerType === "troop" && isBattleScene){
                var addParam = memberIndex => {
                    $gameTroop.members()[memberIndex].addCParam(id, value)
                }
    
            }else if(battlerType === "party"){
                var addParam = memberIndex => {
                    $gameParty.members()[memberIndex].addCParam(id, value)
                }
    
            }else if(battlerType === "actor"){
                var addParam = actorId => {
                    const getActor = member => member.actorId() === actorId
                    const member = $gameParty.members().find(getActor)
    
                    if(member){
                        member.addCParam(id, value)
                    }
                }
    
            }else if(battlerType === "enemy" && isBattleScene){
                var addParam = enemyId => {
                    const getEnemy = member => member.enemyId() === enemyId
                    const member = $gameTroop.members().find(getEnemy)
    
                    if(member){
                        member.addCParam(id, value)
                    }
                }
            }
            battlerId.forEach(addParam) 
        }   
    },

    changeParamForAll(battlerType, value, id){
        const isBattleScene = SceneManager._scene instanceof Scene_Battle
        if(battlerType === "party" || battlerType === "actor"){
            $gameParty.members().forEach(member => {
                member.addCParam(id, value)
            })
        }else if(isBattleScene){
            $gameTroop.members().forEach(member => {
                member.addCParam(id, value)
            })
        }
    },

    changeHpParam(args){
        var addParam = () => {}
        const isBattleScene = SceneManager._scene instanceof Scene_Battle
        const [battlerType, battlerId, id, value] = this.getParsedArgsForChangeParam(args)
        const _param = this.get_name(id)
        
        if(battlerId[0] === -1){
            this.changeHpParamForAll(battlerType, value, id, _param)
        }else{
            if(battlerType === "troop" && isBattleScene){
                var addParam = memberIndex => {
                    const member = $gameTroop.members()[memberIndex]
                    member.changeCustomHpParam(id, value)
                }
    
            }else if(battlerType === "party"){
                var addParam = memberIndex => {
                    const member = $gameParty.members()[memberIndex]
                    member.changeCustomHpParam(id, value)
                }
    
            }else if(battlerType === "actor"){
                var addParam = actorId => {
                    const getActor = member => member.actorId() === actorId
                    const member = $gameParty.members().find(getActor)
    
                    if(member){
                        member.changeCustomHpParam(id, value)
                    }
                }
    
            }else if(battlerType === "enemy" && isBattleScene){
                var addParam = enemyId => {
                    const getEnemy = member => member.enemyId() === enemyId
                    const member = $gameTroop.members().find(getEnemy)
    
                    if(member){
                        member.changeCustomHpParam(id, value)
                    }
                }
            }
            battlerId.forEach(addParam) 
        }
        
    },

    changeHpParamForAll(battlerType, value, id, _param){
        const isBattleScene = SceneManager._scene instanceof Scene_Battle

        if(battlerType === "party" || battlerType === "actor"){
            $gameParty.members().forEach(member => {
                member.changeCustomHpParam(id, value)
            })

        }else if(isBattleScene){
            $gameTroop.members().forEach(member => {
                member.changeCustomHpParam(id, value)
            })
        }
    },

}

const Plugin = Eli.CustomParameter
const Alias = Eli.CustomParameter.alias

Plugin.initialize()

/* ------------------------------ DATA MANAGER ------------------------------ */
{

Alias.DataManager_extractMetadata = DataManager.extractMetadata
DataManager.extractMetadata = function(data) {
    Alias.DataManager_extractMetadata.call(this, data)
    this.addMetaEffects(data)
    this.addCParameterChanges(data)
}

DataManager.addMetaEffects = function(data){
    const isItemOrSkill = Eli.Utils.isDataItem(data) || Eli.Utils.isDataSkills(data)

    if(isItemOrSkill){

        if(data.meta.AddCBuff){
            this.addCBuffEffect(data)
        }

        if(data.meta.AddCDebuff){
            this.addCDebuffEffect(data)
        }

        if(data.meta.RemoveCBuff){
            this.removeCBuffEffect(data)
        }

        if(data.meta.RemoveCDebuff){
            this.removeCDebuffEffect(data)
        }

        if(data.meta.GrowC){
            this.addGrowC(data)
        }

    }
}

DataManager.addCBuffEffect = function(data){
    Eli.String.removeSpaces(data.meta.AddCBuff).split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Plugin.findCParamId(cparamId)
        const cEffect = {code: 100, dataId: cparamId, value1: Number(value), value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.addCDebuffEffect = function(data){
    Eli.String.removeSpaces(data.meta.AddCDebuff).split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Plugin.findCParamId(cparamId)
        const cEffect = {code: 101, dataId: cparamId, value1: Number(value), value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.removeCBuffEffect = function(data){
    Eli.String.removeSpaces(data.meta.RemoveCBuff).split(",").forEach(item => {
        const cparamId = Plugin.findCParamId(item)
        const cEffect = {code: 102, dataId: cparamId, value1: 1, value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.removeCDebuffEffect = function(data){
    Eli.String.removeSpaces(data.meta.RemoveCDebuff).split(",").forEach(item => {
        const cparamId = Plugin.findCParamId(item)
        const cEffect = {code: 103, dataId: cparamId, value1: 1, value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.addGrowC = function(data){
    Eli.String.removeSpaces(data.meta.GrowC).split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Plugin.findCParamId(cparamId)
        const cEffect = {code: 104, dataId: cparamId, value1: +value, value2: 0}
        
        data.effects.push(cEffect)
    })
}

DataManager.addCParameterChanges = function(data){
    const isValidData = Eli.Utils.isDataWeapon(data) || Eli.Utils.isDataArmor(data) || 
                        Eli.Utils.isDataClass(data) || Eli.Utils.isDataEnemy(data)

    if(isValidData){
        data.cparams = new Array(Plugin.cParamsLength()).fill(0)

        if(data.meta.hasOwnProperty("CParams")){

            if(data.meta.CParams.includes(":")){
                this.parseCParamNotesByString(data)
            }else{
                this.parseCParamNotesByTemplate(data)
            }

        }
    }
}

DataManager.parseCParamNotesByString = function(data){
    const customParameters = data.meta.CParams.split(",")

    for(const cparam of customParameters){
        let [id, value] = cparam.split(":")
        id = Plugin.findCParamId(id)
        data.cparams[Number(id)] = Number(value)
    }
}

DataManager.parseCParamNotesByTemplate = function(data){
    const templateName = Eli.String.removeSpaces(data.meta.CParams)
    const customParameters = Plugin.param().templates.find(item => item.name === templateName).list

    for(const cparam of customParameters){
        let {id, value} = cparam
        id = Plugin.findCParamId(id)
        data.cparams[Number(id)] = Number(value)
    }
}

}

/* ------------------------------- GAME ACTION ------------------------------ */
{

Game_Action.EFFECT_ADD_CBUFF        = 100
Game_Action.EFFECT_ADD_CDEBUFF      = 101
Game_Action.EFFECT_REMOVE_CBUFF     = 102
Game_Action.EFFECT_REMOVE_CDEBUFF   = 103
Game_Action.EFFECT_GROWC            = 104

Alias.Game_Action_testItemEffect = Game_Action.prototype.testItemEffect
Game_Action.prototype.testItemEffect = function(target, effect) {
    const alias = Alias.Game_Action_testItemEffect.call(this, target, effect)
    const effectc = this.testItemEffectC(target, effect)

    return effectc || alias
}

Alias.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect
Game_Action.prototype.applyItemEffect = function(target, effect) {
    Alias.Game_Action_applyItemEffect.call(this, target, effect)
    this.applyItemEffectC(target, effect)
}

Game_Action.prototype.testItemEffectC = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_ADD_CBUFF:
            return !target.isMaxCBuffAffected(effect.dataId)

        case Game_Action.EFFECT_ADD_CDEBUFF:
            return !target.isMaxCDebuffAffected(effect.dataId)

        case Game_Action.EFFECT_REMOVE_CBUFF:
            return target.isCBuffAffected(effect.dataId)

        case Game_Action.EFFECT_REMOVE_CDEBUFF:
            return target.isCDebuffAffected(effect.dataId)
    }
}

Game_Action.prototype.applyItemEffectC = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_ADD_CBUFF:
            this.itemEffectAddCBuff(target, effect)
            break
        case Game_Action.EFFECT_ADD_CDEBUFF:
            this.itemEffectAddCDebuff(target, effect)
            break
        case Game_Action.EFFECT_REMOVE_CBUFF:
            this.itemEffectRemoveCBuff(target, effect)
            break
        case Game_Action.EFFECT_REMOVE_CDEBUFF:
            this.itemEffectRemoveCDebuff(target, effect)
            break
        case Game_Action.EFFECT_GROWC:
            this.itemEffectGrowC(target, effect)
            break
        }
}

Game_Action.prototype.itemEffectAddCBuff = function(target, effect) {
    target.addCBuff(effect.dataId, effect.value1)
    this.makeSuccess(target)
}

Game_Action.prototype.itemEffectAddCDebuff = function(target, effect) {
    const chance = target.cdebuffRate(effect.dataId) * this.lukEffectRate(target)
    if (Math.random() < chance) {
        target.addCDebuff(effect.dataId, effect.value1)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectRemoveCBuff = function(target, effect) {
    if (target.isCBuffAffected(effect.dataId)) {
        target.removeCBuff(effect.dataId)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectRemoveCDebuff = function(target, effect) {
    if (target.isCDebuffAffected(effect.dataId)) {
        target.removeCBuff(effect.dataId)
        this.makeSuccess(target)
    }
}

Game_Action.prototype.itemEffectGrowC = function(target, effect) {
    target.addCParam(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

}

/* --------------------------- GAME ACTION RESULT --------------------------- */
{

Alias.Game_ActionResult_clear = Game_ActionResult.prototype.clear
Game_ActionResult.prototype.clear = function() {
    Alias.Game_ActionResult_clear.call(this)
    this.clearCBuffsAndDebuffs()
}

Alias.Game_ActionResult_isStatusAffected = Game_ActionResult.prototype.isStatusAffected;
Game_ActionResult.prototype.isStatusAffected = function() {
    const alias = Alias.Game_ActionResult_isStatusAffected
    const cStatus = this.addedCBuffs.length > 0 ||
                    this.addedCDebuffs.length > 0 ||
                    this.removedCBuffs.length > 0

    return alias || cStatus

}

Game_ActionResult.prototype.clearCBuffsAndDebuffs = function() {
    this.addedCBuffs = []
    this.addedCDebuffs = []
    this.removedCBuffs = []
}
 
Game_ActionResult.prototype.isCBuffAdded = function(paramId) {
    return this.addedCBuffs.includes(paramId)
}

Game_ActionResult.prototype.pushAddedCBuff = function(paramId) {
    if (!this.isCBuffAdded(paramId)) {
        this.addedCBuffs.push(paramId)
    }
}

Game_ActionResult.prototype.isCDebuffAdded = function(paramId) {
    return this.addedCDebuffs.includes(paramId)
}

Game_ActionResult.prototype.pushAddedCDebuff = function(paramId) {
    if (!this.isCDebuffAdded(paramId)) {
        this.addedCDebuffs.push(paramId)
    }
}

Game_ActionResult.prototype.isCBuffRemoved = function(paramId) {
    return this.removedCBuffs.includes(paramId)
}

Game_ActionResult.prototype.pushRemovedCBuff = function(paramId) {
    if (!this.isCBuffRemoved(paramId)) {
        this.removedCBuffs.push(paramId)
    }
}

}

/* ---------------------------- GAME BATTLER BASE --------------------------- */
{

Game_BattlerBase.ICON_CBUFF_START       = Plugin.param().buffIcon
Game_BattlerBase.ICON_CDEBUFF_START     = Plugin.param().debuffIcon
Game_BattlerBase.TRAIT_CPARAM           = 100
Game_BattlerBase.TRAIT_CDEBUFF_RATE     = 101

Alias.Game_BattlerBase_initialize = Game_BattlerBase.prototype.initialize
Game_BattlerBase.prototype.initialize = function() {
    this.initNewParameters()
    Alias.Game_BattlerBase_initialize.call(this)
    this.initCustomHpMpParameters()
}

Alias.Game_BattlerBase_clearParamPlus = Game_BattlerBase.prototype.clearParamPlus
Game_BattlerBase.prototype.clearParamPlus = function() {
    Alias.Game_BattlerBase_clearParamPlus.call(this)
    this.clearCParamPlus()
}

Alias.Game_BattlerBase_clearBuffs = Game_BattlerBase.prototype.clearBuffs
Game_BattlerBase.prototype.clearBuffs = function() {
    Alias.Game_BattlerBase_clearBuffs.call(this)
    this.clearCBuffs()
}

Alias.Game_BattlerBase_updateBuffTurns = Game_BattlerBase.prototype.updateBuffTurns;
Game_BattlerBase.prototype.updateBuffTurns = function() {
    Alias.Game_BattlerBase_updateBuffTurns.call(this);
    this.updateCBuffTurns();
}

Alias.Game_BattlerBase_allIcons = Game_BattlerBase.prototype.allIcons;
Game_BattlerBase.prototype.allIcons = function() {
    const allIcons = Alias.Game_BattlerBase_allIcons.call(this)
    return allIcons.concat(this.cbuffIcons())
}

Alias.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function() {
    Alias.Game_BattlerBase_refresh.call(this)
    this.refreshAllCustomParameters()
}

Alias.Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll
Game_BattlerBase.prototype.recoverAll = function() {
    Alias.Game_BattlerBase_recoverAll.call(this)
    this.recoverAllCustomParameters()
}

Game_BattlerBase.prototype.initCustomHpMpParameters = function(){
    const list = Plugin.param().list
    list.forEach(param => {
        if(param.isHp){
            this[`_${param.shortName}`] = 0
        }
    })
}

Game_BattlerBase.prototype.initNewParameters = function(){
    const length = Plugin.cParamsLength()

    this._cparamPlus = new Array(length)
    this._cbuffs = new Array(length)
    this._cbuffTurns = new Array(length)
}

Game_BattlerBase.prototype.clearCParamPlus = function() {
    this._cparamPlus.fill(0)
}

Game_BattlerBase.prototype.clearCBuffs = function() {
    this._cbuffs.fill(0)
    this._cbuffTurns.fill(0)
}

Game_BattlerBase.prototype.eraseCBuff = function(paramId){
    this._cbuffs[paramId] = 0
    this._cbuffTurns[paramId] = 0
}

Game_BattlerBase.prototype.cbuffLength = function() {
    return this._cbuffs.length
}

Game_BattlerBase.prototype.cbuff = function(paramId) {
    return this._cbuffs[paramId]
}

Game_BattlerBase.prototype.isCBuffAffected = function(paramId) {
    return this._cbuffs[paramId] > 0
}

Game_BattlerBase.prototype.isCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] < 0
}

Game_BattlerBase.prototype.isCBuffOrCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] !== 0
}

Game_BattlerBase.prototype.isMaxCBuffAffected = function(paramId) {
    return this._cbuffs[paramId] === 2
}

Game_BattlerBase.prototype.isMaxCDebuffAffected = function(paramId) {
    return this._cbuffs[paramId] === -2
}

Game_BattlerBase.prototype.increaseCBuff = function(paramId) {
    if (!this.isMaxCBuffAffected(paramId)) {
        this._cbuffs[paramId]++
    }
}

Game_BattlerBase.prototype.decreaseCBuff = function(paramId) {
    if (!this.isMaxCDebuffAffected(paramId)) {
        this._cbuffs[paramId]--
    }
}

Game_BattlerBase.prototype.overwriteCBuffTurns = function(paramId, turns) {
    if (this._cbuffTurns[paramId] < turns) {
        this._cbuffTurns[paramId] = turns
    }
}

Game_BattlerBase.prototype.isCBuffExpired = function(paramId) {
    return this._cbuffTurns[paramId] === 0
}

Game_BattlerBase.prototype.updateCBuffTurns = function() {
    for (let i = 0, l = this._cbuffTurns.length; i < l; i++) {
        if (this._cbuffTurns[i] > 0) {
            this._cbuffTurns[i]--
        }
    }
}

Game_BattlerBase.prototype.cbuffIcons = function() {
    const icons = [];
    for (let i = 0, l = this.cbuffLength(); i < l; i++) {
        if (this._cbuffs[i] !== 0) {
            icons.push(this.cbuffIconIndex(this._cbuffs[i], i))
        }
    }
    return icons
}

Game_BattlerBase.prototype.cbuffIconIndex = function(buffLevel, paramId) {
    const maxParams = Plugin.cParamsLength();
    if (buffLevel > 0) {
        return Game_BattlerBase.ICON_CBUFF_START + (buffLevel - 1) * maxParams + paramId
    } else if (buffLevel < 0) {
        return Game_BattlerBase.ICON_CDEBUFF_START + (-buffLevel - 1) * maxParams + paramId
    } else {
        return 0
    }
}

Game_BattlerBase.prototype.cparamBase = function(paramId) {
    return 0
}

Game_BattlerBase.prototype.cparamPlus = function(paramId) {
    return this._cparamPlus[paramId]
}

Game_BattlerBase.prototype.cparamBuffRate = function(paramId) {
    return this._cbuffs[paramId] * 0.25 + 1.0
}

Game_BattlerBase.prototype.cdebuffRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_CDEBUFF_RATE, paramId)
}

Game_BattlerBase.prototype.cparamRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_CPARAM, paramId)
}

Game_BattlerBase.prototype.cparam = function(paramId) {
    let value = this.cparamBase(paramId) + this.cparamPlus(paramId)
    value *= this.cparamRate(paramId) * this.cparamBuffRate(paramId)
    const result = Math.round( Math.max(0, value) )
    return result
}

Game_BattlerBase.prototype.addCParam = function(paramId, value) {
    paramId = Plugin.findCParamId(paramId)
    this._cparamPlus[paramId] += value
}

Game_BattlerBase.prototype.setCustomHpParam = function(paramId, value, isChanging) {
    paramId = Plugin.findCParamId(paramId)

    if(Plugin.isHpType(paramId)){
        const oldValue = isChanging ? this.cparam(paramId) : 0
        const _name = Plugin.get_name(paramId)
        this[_name] = oldValue + value
        this.refreshCustomParameter(_name)
    }
}

Game_BattlerBase.prototype.changeCustomHpParam = function(paramId, value) {
    this.setCustomHpParam(paramId, value, true)
}

Game_BattlerBase.prototype.setCustomParam = function(paramId, targetValue) {
    paramId = Plugin.findCParamId(paramId)
    const currentValue = this.cparam(paramId)
    const finalValue = targetValue - currentValue

    this.addCParam(paramId, finalValue)
}

Game_BattlerBase.prototype.changeCustomParam = function(paramId, value) {
    this.setCustomParam(paramId, value, true)
}

Game_BattlerBase.prototype.refreshCustomParameter = function(_paramName){
    const maxName = `max${_paramName.substring(1)}`
    this[_paramName] = this[_paramName].clamp(0, this[maxName])
}

Game_BattlerBase.prototype.refreshAllCustomParameters = function(){
    Plugin.hpTypeParams.forEach(this.refreshCustomParameter.bind(this))
}

Game_BattlerBase.prototype.recoverCustomParameter = function(paramId) {
    paramId = Plugin.findCParamId(paramId)

    if(Plugin.isHpType(paramId)){
        const _name = Plugin.get_name(paramId)
        const maxName = Plugin.getMaxName(paramId)
        this[_name] = this[maxName]
    }
}

Game_BattlerBase.prototype.recoverAllCustomParameters = function() {
    const cparamNames = Plugin.param().list.map(item => item.shortName)
    cparamNames.forEach(this.recoverCustomParameter.bind(this))
}

}

/* ------------------------------ GAME BATTLER ------------------------------ */
{

Alias.Game_Battler_removeAllBuffs = Game_Battler.prototype.removeAllBuffs
Game_Battler.prototype.removeAllBuffs = function() {
    Alias.Game_Battler_removeAllBuffs.call(this)
    this.removeAllCBuffs()
}

Alias.Game_Battler_removeBuffsAuto = Game_Battler.prototype.removeBuffsAuto
Game_Battler.prototype.removeBuffsAuto = function() {
    Alias.Game_Battler_removeBuffsAuto.call(this)
    this.removeCBuffsAuto()
}

Game_Battler.prototype.addCBuff = function(paramId, turns) {
    if (this.isAlive()) {
        this.increaseCBuff(paramId)
        if (this.isCBuffAffected(paramId)) {
            this.overwriteCBuffTurns(paramId, turns)
        }
        this._result.pushAddedCBuff(paramId)
        this.refresh()
    }
}

Game_Battler.prototype.addCDebuff = function(paramId, turns) {
    if (this.isAlive()) {
        this.decreaseCBuff(paramId);
        if (this.isCDebuffAffected(paramId)) {
            this.overwriteCBuffTurns(paramId, turns)
        }
        this._result.pushAddedCDebuff(paramId)
        this.refresh()
    }
}

Game_Battler.prototype.removeCBuff = function(paramId) {
    if (this.isAlive() && this.isCBuffOrCDebuffAffected(paramId)) {
        this.eraseCBuff(paramId)
        this._result.pushRemovedCBuff(paramId)
        this.refresh()
    }
}

Game_Battler.prototype.removeAllCBuffs = function() {
    for (var i = 0, l = this.cbuffLength(); i < l; i++) {
        this.removeCBuff(i)
    }
}

Game_Battler.prototype.removeCBuffsAuto = function() {
    for (var i = 0, l = this.cbuffLength(); i < l; i++) {
        if (this.isCBuffExpired(i)) {
            this.removeCBuff(i)
        }
    }
}

}

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Game_Actor.prototype.cparamBase = function(paramId) {
    return this.currentClass().cparams[paramId]
}

Game_Actor.prototype.cparamPlus = function(paramId) {
    let value = Game_Battler.prototype.cparamPlus.call(this, paramId)

    for(const equip of this.equips()){
        if(equip){
            value += equip.cparams[paramId]
        }
    }

    return value
}

}

/* ------------------------------- GAME ENEMY ------------------------------- */

if(Imported.Eli_EnemyClass){

Alias.Game_Enemy_cparamBase = Game_Enemy.prototype.cparamBase
Game_Enemy.prototype.cparamBase = function(paramId) {
    if(this._classId > 0){
        return this.getCParamBaseFromClass(paramId)
    }else{
        return Alias.Game_Enemy_cparamBase.call(this, paramId)
    }
}

Game_Enemy.prototype.getCParamBaseFromClass = function(paramId) {
    return this.currentClass().cparams[paramId][this._level]
}



Game_Enemy.prototype.getCParamPlusFromEquip = function(paramId){
    let value = 0

    for(const equip of this.equips()){
        if(equip){
            value += equip.cparams[paramId]
        }
    }

    return value
}

Game_Enemy.prototype.cparamPlus = function(paramId) {
    let value = Game_Battler.prototype.cparamPlus.call(this, paramId)

    if(this._classId > 0){
        value += this.getCParamPlusFromEquip(paramId)
    }

    return value
}

}else{ // If not imported Eli Enemy Class...

Game_Enemy.prototype.cparamBase = function(paramId) {
    return this.enemy().cparams[paramId] || 0
}

}

/* ---------------------------- WINDOW BATTLE LOG --------------------------- */
{

Alias.Window_BattleLog_displayChangedBuffs = Window_BattleLog.prototype.displayChangedBuffs
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
    Alias.Window_BattleLog_displayChangedBuffs.call(this, target)
    this.displayChangedCBuffs(target)
}

Window_BattleLog.prototype.displayChangedCBuffs = function(target) {
    const result = target.result();
    this.displayCBuffs(target, result.addedCBuffs, TextManager.buffAdd)
    this.displayCBuffs(target, result.addedCDebuffs, TextManager.debuffAdd)
    this.displayCBuffs(target, result.removedCBuffs, TextManager.buffRemove)
}

Window_BattleLog.prototype.displayCBuffs = function(target, buffs, fmt) {
    for (const paramId of buffs) {
        const text = fmt.format(target.name(), Plugin.list()[paramId][1])
        this.push("popBaseLine")
        this.push("pushBaseLine")
        this.push("addText", text)
    }
}

}

}