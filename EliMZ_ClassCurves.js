//============================================================================
// EliMZ_ClassCurves.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.0.1♦ Make a custom growth stats for classes independent of the editor.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-class-curve-for-rpg-maker

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
============================================================================
特色功能
============================================================================
 
• 为每个原版属性添加状态曲线，完全可自定义和独立编辑。
• 增加固定成长值设定。
• 增加随机成长值设定。
• 增加区间成长值设定，可设置成长的最大值和最小值。
• 增加成长值公式设定。
• 适配EliMZ_EnemyClass.js插件，可设置敌人成长值。
• 适配EliMZ_CustomParameters.js插件，可设置自定义属性成长值。
• 增加成长几率值设定，使得人物属性成长具有概率（参考火焰纹章系列）。
• 可根据物品、装备、技能或状态改变成长几率。
• 决定某角色入队时是否为初始状态（取决于其等级）。

============================================================================
使用方法
============================================================================

♦ 插件属性 ♦

● 初始属性

设定的人物在0级时的最低属性值。可以保留也可以修改。

● 属性类别曲线预设

在这里设置自定义成长曲线。有以下5个参数：

• Name → 在注释中被引用的曲线名称。
• Growth Chance → 成长几率，即该属性在人物升级时发生增加的几率。
• Initial → 该属性的1级初始值。
• Min → 角色升级时属性增加的最小值。
• Max → 角色升级时属性增加的最大值。
• Cap → 角色属性上限。
• Bonus → 适配转职插件。

■ 作者的话:
注¹:默认情况下，增加几率始终为100%。即角色升级时，该属性必然出现成长，
成长值介于最小值（min）和最大值（max）之间。
如果设置了另一个大于100的值，则角色在升级时不会100%增加属性，依然为概率成长。
数值设置可以自定义。

♦ 注释区域格式 ♦

• 请在注释区域以以下格式填写内容。
<CustomCurve:Name>

此外，可以通过游戏内的道具、技能、状态和装备改变属性成长几率。
可使用以下注释标签：

<GrowthChanceParam: param:value, param:value>

将"param"替换为以下原版属性简称:
mhp, mmp, atk, def, mat, mdf, agi, luk

若使用了EliMZ_CustomParameters.js插件设置了自定义属性，则采用以下格式：
<GrowthChanceCParam: Cparam:value, Cparam:value>
将"Cparam"替换为自定义属性简称。

***注意：所有注释均区分大小写。***

■ 作者的话:
•默认情况下，如果角色入队时高于1级，本插件会自动计算其额外等级与属性。
但同时，也可以设置其加入时始终保持初始状态，无关其等级。
这一功能需要在该角色的注释栏添加标签：

<HoldCurve: Level>

该角色会保持初始状态直至特定等级（即Level）。

如果注释栏未设置自定义曲线，则它将采取插件参数中的首项作为默认值。

脚本调用:

• $gameActors.actor(ID).paramsHistory(classId)
返回一个数组，为某角色在某职业上全属性全等级的所有值。

• $gameActors.actor(ID).cparamsHistory(classId)
返回一个数组，为某角色在某职业上全自定义属性全等级的所有值。

• $gameActors.actor(ID).lastParamsGain() 
返回一个数组，为某角色上次升级时的各属性成长数值。

• $gameActors.actor(ID).lastCParamsGain()
返回一个数组，为某角色上次升级时的各自定义属性成长数值。

• $gameActors.actor(ID).paramBase(paramId) - 
返回一个数组，为某角色当前的某属性值。

• $gameActors.actor(ID).cparamBase(paramId) - 
返回一个数组，为某角色当前的某自定义属性值。

对于下面的脚本调用，这些参数可以这样理解:
• paramId - 替换为所需参数的ID。
• isCustom - 若要检测某属性是否为自定义，设置为true。默认为false。
• classId - 游戏内的职业检测。默认为当前职业。

• $gameActors.actor(ID).initialParamCurve(paramId, isCustom, classId)
返回给定属性的初始值。

• $gameActors.actor(ID).minParamCurve(paramId, isCustom, classId) 
返回给定属性曲线的最小成长值。

• $gameActors.actor(ID).maxParamCurve(paramId, isCustom, classId) 
返回给定属性曲线的最大成长值。

• $gameActors.actor(ID).capParamCurve(paramId, isCustom, classId) - 
返回给定属性的上限值。

• $gameActors.actor(ID).paramGrowthChance(paramId, isCustom, classId) - 
返回给定属性的成长几率。

============================================================================
Update Log
============================================================================

https://tinyurl.com/classCurves

============================================================================

@param levelZero
@text 全职业各属性最小值
@type struct<stNormalParamList>
@desc 在人物等级为0时，全职业通用的各属性最小值。
@default {"mhp":"1","mmp":"0","atk":"1","def":"1","mat":"1","mdf":"1","agi":"1","luk":"1"}

@param levelZeroCustom
@text 全职业各自定义属性最小值
@type struct<stCustomParamList>[]
@desc 在人物等级为0时，全职业通用的各自定义属性最小值。
仅支持与插件 Eli Custom Parameters配套使用.
@default ["{\"name\":\"Charisma (crm)\",\"value\":\"1\"}","{\"name\":\"Perception (per)\",\"value\":\"1\"}","{\"name\":\"Wisdom (wis)\",\"value\":\"1\"}","{\"name\":\"Reputation (rep)\",\"value\":\"1\"}"]

@param preset
@text 各职业成长曲线预设
@type struct<stpreset>[]
@desc 在此处自定义不同职业各属性的成长曲线。
@default ["{\"name\":\"Default\",\"normalParameters\":\"{\\\"mhp\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mmp\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"atk\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"def\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mat\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mdf\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"agi\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"luk\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\"}\",\"customParameters\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Perception (per)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Charisma (crm)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Wisdom (wis)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Reputation (rep)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]

*/

/* ------------------------ MINIMUM NORMAL PARAMETERS ----------------------- */
{
/*~struct~stNormalParamList:

@param mhp
@text 最大生命值
@type text
@desc
@default 1

@param mmp
@text 最大灵力值
@type text
@desc
@default 0

@param atk
@text 物理攻击
@type text
@desc
@default 1

@param def
@text 物理防御
@type text
@desc
@default 1

@param mat
@text 魔法攻击
@type text
@desc
@default 1

@param mdf
@text 魔法防御
@type text
@desc
@default 1

@param agi
@text 敏捷
@type text
@desc
@default 1

@param luk
@text 幸运
@type text
@desc
@default 1

*/
}

/* ------------------------ MINIMUM CUSTOM PARAMETERS ----------------------- */
{

/*~struct~stCustomParamList:

@param name
@text 自定义属性名称
@type text
@desc 本名称仅供制作者区分各自定义属性，不影响代码，可随意命名。
@default

@param value
@text 最小值
@type text
@desc
@default 0

*/

}

/* --------------------------------- PRESETS -------------------------------- */
{
/*~struct~stpreset:

@param name
@text 成长曲线名称
@type text
@desc 在职业注释栏中输入的名称，用于引用该曲线设定作为各属性成长值。
@default NewClassCurve

@param normalParameters
@text 原版属性
@type struct<normalParametersSt>
@desc 设定原版各属性的成长曲线。
@default {"mhp":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mmp":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","atk":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","def":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mat":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mdf":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","agi":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","luk":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}"}

@param customParameters
@text 自定义属性
@type struct<customCurveSt>[]
@desc 仅支持与插件 Eli Custom Parameters配套使用。
设定自定义各属性的成长曲线。
@default ["{\"name\":\"Perception (per)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Charisma (crm)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Wisdom (wis)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Reputation (rep)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}"]

*/
}

/* ---------------------------- NORMAL PARAMETERS --------------------------- */
{
/*~struct~normalParametersSt:

@param mhp
@text 最大生命值
@type struct<defaultCurveSt>
@desc 本属性的成长曲线。
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mmp
@text 最大灵力值
@type struct<defaultCurveSt>
@desc 本属性的成长曲线。
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param atk
@text 物理攻击
@type struct<defaultCurveSt>
@desc 本属性的成长曲线。
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param def
@text 物理防御
@type struct<defaultCurveSt>
@desc 本属性的成长曲线。
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mat
@text 魔法攻击
@type struct<defaultCurveSt>
@desc 本属性的成长曲线。
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mdf
@text 魔法防御
@type struct<defaultCurveSt>
@desc 本属性的成长曲线。
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param agi
@text 敏捷
@type struct<defaultCurveSt>
@desc 本属性的成长曲线。
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param luk
@text 幸运
@type struct<defaultCurveSt>
@desc 本属性的成长曲线。
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

*/
}

/* ------------------------------ X PARAMETERS ------------------------------ */
{
/*~struct~xparametersSt:

@param hit
@text Hit rate
@type note
@desc Can use number or formulas.
@default 0

@param eva
@text Evasion
@type note
@desc Can use number or formulas.
@default 0

@param cri
@text Critical rate
@type note
@desc Can use number or formulas.
@default 0

@param cev
@text Critical evasion rate
@type note
@desc Can use number or formulas.
@default 0

@param mev
@text Magic evasion rate
@type note
@desc Can use number or formulas.
@default 0

@param mrf
@text Magic reflection rate
@type note
@desc Can use number or formulas.
@default 0

@param cnt
@text Counter attack rate
@type note
@desc Can use number or formulas.
@default 0

@param hrg
@text Hp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

@param mrg
@text Mp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

@param trg
@text Tp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

*/

}

/* ------------------------------ S PARAMETERS ------------------------------ */
{
/*~struct~sparametersSt:

@param tgr
@text Target rate
@type note
@desc Can use number or formulas.
@default 0

@param grd
@text Guard effect rate
@type note
@desc Can use number or formulas.
@default 0

@param rec
@text Recovery effect rate
@type note
@desc Can use number or formulas.
@default 0

@param pha
@text Pharmacology
@type note
@desc Can use number or formulas.
@default 0

@param mcr
@text Mp Cost Rate
@type note
@desc Can use number or formulas.
@default 0

@param tcr
@text Tp Charge Rate
@type note
@desc Can use number or formulas.
@default 0

@param pdr
@text Physical Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param mdr
@text Magic Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param fdr
@text Floor Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param exr
@text Experience Rate
@type note
@desc Can use number or formulas.
@default 0

*/

}

/* -------------------- DEFAULT PARAMETER CURVE SETTINGS -------------------- */
{
/*~struct~defaultCurveSt:

@param growthChance
@text 成长几率
@type text
@desc 升级时某属性的成长几率。范围为0~100。
@default 100

@param initial
@text 1级初始值
@type note
@desc 1级的数值。
@default 10

@param min
@text 最小成长值
@type note
@desc 升级随机成长的最低值。
@default 0

@param max
@text 最大成长值
@type note
@desc 升级随机成长的最高值。
@default 5

@param cap
@text 上限值
@type note
@desc 本属性最高能达到的数值。
@default 30

@param bonus
@text Promotion Bonus
@type note
@desc Only works with Eli Class Promotion.
The value applied to an actor when he promote to this class.
@default 0

*/
}

/* --------------------- CUSTOM PARAMETER CURVE SETTINGS -------------------- */
{
/*~struct~customCurveSt:

@param name
@text 自定义属性名称
@type text
@desc 本名称仅供制作者区分各自定义属性，不影响代码，可随意命名。
@default

@param growthChance
@text 成长几率
@type text
@desc 该属性在人物升级时发生增加的几率。范围为0~100。
@default 100

@param initial
@text 1级初始值
@type note
@desc 该属性的1级初始值。
@default 10

@param min
@text 最小成长值
@type note
@desc 角色升级时属性增加的最小值。
@default 0

@param max
@text 最大成长值
@type note
@desc 角色升级时属性增加的最大值。
@default 5

@param cap
@text 上限值
@type note
@desc 角色属性上限。
@default 30

@param bonus
@text Promotion Bonus
@type note
@desc Only works with Eli Class Promotion.
The value applied to an actor when he promote to this class.
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ClassCurves = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ClassCurves = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-class-curve-for-rpg-maker",
    parameters: {
        levelZero: {mhp: 0, mmp: 0, atk: 0, def: 0, mat: 0, mdf: 0, agi: 0, luk: 0},
        levelZeroCustom: [{name: '', value: 0}],
        preset: [{
            name: '',
            normalParameters: {
                mhp: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                mmp: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                atk: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                def: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                mat: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                mdf: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                agi: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                luk: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
            },
            customParameters: [{name: '', growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}],
        }]
    },
    alias: {},
    paramsCurve: {},
    cparamsCurve: {},
    maxGrowthChance: 100,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.formatLevelZeroParameters()
        this.generateCurves()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = []
        Eli.PluginManager.registerCommands(this, commands)
    },

    formatLevelZeroParameters(){
        const param = this.parameters
        param.levelZero = Object.values(param.levelZero)
        param.levelZeroCustom = param.levelZeroCustom.map(item => item.value)
    },

    param(){
        return this.parameters
    },

    generateCurves(){
        const presets = this.parameters.preset
        
        for(let i = 0, l = presets.length; i < l; i++){
            const curve = presets[i]
            const curveName = Eli.String.removeSpaces(curve.name)
            const normalParameters = curve.normalParameters
            const customParameters = curve.customParameters

            this.paramsCurve[curveName] = Object.values(normalParameters)
            this.cparamsCurve[curveName] = customParameters
        }
    },

    getClassCurve(classId, isCustom){
        if(classId > 0){
            const dataClass = $dataClasses[classId]
            const name = dataClass.meta.CustomCurve

            if(name){
                return this.getCurve(Eli.String.removeSpaces(name), isCustom)
            }else{
                return this.getDefaultCurve(isCustom)
            }
            
        }else{
            return this.getDefaultCurve(isCustom)
        }
        
    },

    getDefaultCurveName(){
        return this.parameters.preset[0].name
    },

    getDefaultCurve(isCustom){
        if(isCustom){
            return this.cparamsCurve[this.getDefaultCurveName()]
        }else{
            return this.paramsCurve[this.getDefaultCurveName()]
        }
    },

    getCurve(name, isCustom){
        if(isCustom){
            return this.cparamsCurve[name]
        }else{
            return this.paramsCurve[name]
        }
    },

    makeNewClassHistory(){
        const history = {
            params: new Array(8),
            level: 0,
        }

        return history
    },

    fillLevelZero(history){
        for(let i = 0, l = history.params.length; i < l; i++){
            const id = i
            history.params[id] = new Array(100).fill(0)
            history.params[id][0] = this.parameters.levelZero[id]
        }

        if(Imported.Eli_CustomParameter){
            const length = Eli.CustomParameter.cParamsLength()
            history.cparams = new Array(length)

            for(let i = 0, l = history.cparams.length; i < l; i++){
                const id = i
                history.cparams[id] = new Array(100).fill(0)
                history.cparams[id][0] = this.parameters.levelZeroCustom[id]
            }
        }
    },

    getNewClassHistory(){
        const history = this.makeNewClassHistory()

        this.fillLevelZero(history)

        return history
    },

}

const Plugin = Eli.ClassCurves
const Alias = Eli.ClassCurves.alias

Plugin.initialize()

const PARAMS = {
    mhp: 0, mmp: 1, atk: 2, def: 3, mat: 4, mdf: 5, agi: 6, luk: 7
}

/* ------------------------------- DATA MANAGER ------------------------------ */
{

Alias.DataManager_extractMetadata = DataManager.extractMetadata
DataManager.extractMetadata = function(data) {
    Alias.DataManager_extractMetadata.call(this, data)
    if(data){
        this.addGrowthChanceEffect(data)
        this.addGrowthChanceValue(data)
    }
}

DataManager.addGrowthChanceEffect = function(data){
    const isItemOrSkill = Eli.Utils.isDataItem(data) || Eli.Utils.isDataSkills(data)
    if(isItemOrSkill){

        if(data.meta.GrowthChanceParam){
            this.addGrowChanceEffectParam(data)
        }

        if(data.meta.GrowthChanceCParam){
            this.addGrowChanceEffectCParam(data)
        }
    }
}

DataManager.addGrowChanceEffectParam = function(data){
    Eli.String.removeSpaces(data.meta.GrowthChanceParam).toLowerCase().split(",").forEach(item => {
        let [paramId, value] = item.split(":")
        paramId = isNaN(paramId) ? PARAMS[paramId] : Number(paramId)
        const effect = {code: "Growth Chance Param", dataId: paramId, value1: Number(value), value2: 0}
        
        data.effects.push(effect)
    })
}

DataManager.addGrowChanceEffectCParam = function(data){
    Eli.String.removeSpaces(data.meta.GrowthChanceCParam).toLowerCase().split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Eli.CustomParameter.findCParamId(cparamId)
        const effect = {code: "Growth Chance Custom Param", dataId: cparamId, value1: Number(value), value2: 0}
        
        data.effects.push(effect)
    })
}

DataManager.createGrowthChanceForDataObject = function(data){
    data.growthChanceParam = [0, 0, 0, 0, 0, 0, 0, 0]

    if(Imported.Eli_CustomParameter){
        data.growthChanceCParam = new Array(Eli.CustomParameter.cParamsLength()).fill(0)
    }
}

DataManager.addGrowthChanceValue = function(data){
    const isValidData = Eli.Utils.isDataWeapon(data) || Eli.Utils.isDataArmor(data) || Eli.Utils.isDataStates(data)
    if(isValidData){
        this.createGrowthChanceForDataObject(data)

        if(data.meta.GrowthChanceParam){
            this.addGrowChanceValueParam(data)
        }

        if(data.meta.GrowthChanceCParam){
            this.addGrowChanceValueCParam(data)
        }
    }
}

DataManager.addGrowChanceValueParam = function(data){
    Eli.String.removeSpaces(data.meta.GrowthChanceParam).toLowerCase().split(",").forEach(item => {
        let [paramId, value] = item.split(":")
        paramId = isNaN(paramId) ? PARAMS[paramId] : Number(paramId)
        
        data.growthChanceParam[paramId] = Number(value)
    })
}

DataManager.addGrowChanceValueCParam = function(data){
    Eli.String.removeSpaces(data.meta.GrowthChanceCParam).toLowerCase().split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Eli.CustomParameter.findCParamId(cparamId)

        data.growthChanceCParam[cparamId] = Number(value)
    })
}

}

/* ---------------------------- GAME BATTLER BASE --------------------------- */
{

Alias.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
    Alias.Game_BattlerBase_initMembers.call(this)
    this.clearGrowthChanceParamPlus()
    if(Imported.Eli_CustomParameter){
        this.clearGrowthChanceCParamPlus()
    }
}

Game_BattlerBase.prototype.clearGrowthChanceParamPlus = function() {
    this.growthChanceParamPlus = [0, 0, 0, 0, 0, 0, 0, 0]
}

Game_BattlerBase.prototype.clearGrowthChanceCParamPlus = function() {
    this.growthChanceCParamPlus = new Array(Eli.CustomParameter.cParamsLength()).fill(0)
}

Game_BattlerBase.prototype.getGrowthChanceParamPlus = function(paramId) {
    const battlerChance = this.growthChanceParamPlus[paramId]
    const stateChance = this.states().reduce((accumulator, state) => {
        return state ? state.growthChanceParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + stateChance
}

Game_BattlerBase.prototype.getGrowthChanceCParamPlus = function(paramId) {
    const battlerChance = this.growthChanceCParamPlus[paramId]
    const stateChance = this.states().reduce((accumulator, state) => {
        return state ? state.growthChanceCParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + stateChance
}

Game_BattlerBase.prototype.addGrowthChanceParamPlus = function(paramId, value) {
    this.growthChanceParamPlus[paramId] = this.growthChanceParamPlus[paramId] + value
}

Game_BattlerBase.prototype.addGrowthChanceCParamPlus = function(paramId, value) {
    this.growthChanceCParamPlus[paramId] = this.growthChanceCParamPlus[paramId] + value
}

}

/* ------------------------------ GAME BATTLER ------------------------------ */
{

Alias.Game_Battler_initMembers = Game_Battler.prototype.initMembers
Game_Battler.prototype.initMembers = function(){
    Alias.Game_Battler_initMembers.call(this)
    this.hasFilledHoldLevels = false
    this._classHistory = {}
}

Game_Battler.prototype.paramMin = function(id, isCustom) {
    if(isCustom){
        return Plugin.param().levelZeroCustom[id]
    }else{
        return Plugin.param().levelZero[id]
    }
}

Game_Battler.prototype.subject = function(){
    // To be overwrited by Actor and Enemy
}

Game_Battler.prototype.canInitNewClassHistory = function(classId){
    return !this._classHistory.hasOwnProperty(classId)
}

Game_Battler.prototype.initParamHistory = function(classId = this._classId){
    const history = Plugin.getNewClassHistory(classId)

    this._lastParamsGain = new Array(8).fill(0)

    if(Imported.Eli_CustomParameter){
        const length = history.cparams.length
        this._lastCParamsGain = new Array(length).fill(0)
    }

    this._classHistory[classId] = history
}

Game_Battler.prototype.buildNewClassHistory = function(classId, targetLevel){
    if(this.canInitNewClassHistory(classId)){
        this.initParamHistory(classId)
        this.fillFirstLevelHistory(false, classId)
        
        if(Imported.Eli_CustomParameter){
            this.fillFirstLevelHistory(true, classId)
        }
    }


    for(let i = 2; i <= targetLevel; i++){
        this.levelUpHistory(classId, i)
    }
    
    if(Imported.Eli_CustomParameter){

        for(let i = 2; i <= targetLevel; i++){
            this.levelUpHistory(classId, i)
        }
    }
}

Game_Battler.prototype.holdInitialCurve = function(){
    if(this.canHoldInitialCurve() && !this.hasFilledHoldLevels){
        this.fillHistoryWithInitialCurve()
    }
}

Game_Battler.prototype.fillFirstLevelHistory = function(isCustom, classId){
    const history = this.getHistoryByType(isCustom, classId)
    
    for(let i = 0; i < history.length; i++){
        const id = i     
        const initialParam = this.initialParamCurve(id, isCustom, classId)
        const level = 1

        history[id][level] = initialParam
    }

    this._classHistory[classId].level = 1
}

Game_Battler.prototype.canHoldInitialCurve = function(){
    return this.subject().meta.hasOwnProperty('HoldCurve')
}

Game_Battler.prototype.getHoldCurveLevel = function(){
    const holdCurve = this.subject().meta.HoldCurve

    return Number(holdCurve)
}

Game_Battler.prototype.fillHistoryWithInitialCurve = function(classId){
    const levelToHold = this.getHoldCurveLevel()
    const stopFill = levelToHold + 1
    const startFill = (history) => {
        for(let i = 0, l = history.length; i < l; i++){
            const parameter = history[i]
            const value = parameter[1]
    
            parameter.fill(value, 2, stopFill)
        }
    }

    startFill(this.paramsHistory(classId))

    if(Imported.Eli_CustomParameter){
        startFill(this.cparamsHistory(classId))
    }

    this._level = levelToHold
    this.hasFilledHoldLevels = true
}

Game_Battler.prototype.setHistoryLevel = function(level, isCustom, classId){
    const isLevelUp = level > this._classHistory[classId].level
    const history = this.getHistoryByType(isCustom, classId)

    for(let i = 0; i < history.length; i++){
        const id = i
        const curveValue = this.getParamValueFromCustomCurve(id, isCustom, classId);
        const paramValue = this.setParamValueWithCustomCurve(history, id, isCustom, level, curveValue, classId)

        this.fillHistory(history, isCustom, level, id, curveValue, paramValue, isLevelUp)
    }
}

Game_Battler.prototype.levelUpHistory = function(classId, targetLevel){
    if(targetLevel <= this._classHistory[classId].level) return

    let isCustom = false
    this.setHistoryLevel(targetLevel, isCustom, classId)

    if(Imported.Eli_CustomParameter){
        isCustom = true
        this.setHistoryLevel(targetLevel, isCustom, classId)
    }
    this._classHistory[classId].level++
}

Game_Battler.prototype.levelDownHistory = function(classId, targetLevel){
    if(targetLevel >= this._classHistory[classId].level) return

    let isCustom = false
    this.setHistoryLevel(targetLevel, isCustom, classId)

    if(Imported.Eli_CustomParameter){
        isCustom = true
        this.setHistoryLevel(targetLevel, isCustom, classId)
    }
    this._classHistory[classId].level--
}

Game_Battler.prototype.hasParamGrowthChance = function(id, isCustom, classId){
    const failChance = Math.randomInt(101)
    const growthChance = this.paramGrowthChance(id, isCustom, classId)
    const hasChance = growthChance >= failChance
    
    return hasChance
}

Game_Battler.prototype.getParamValueFromCustomCurve = function(id, isCustom, classId){
    if(this.hasParamGrowthChance(id, isCustom, classId)){
        return this.generateParamValueFromCurve(id, isCustom, classId)
    }else{
        return 0
    }
}

Game_Battler.prototype.generateParamValueFromCurve = function(id, isCustom, classId){
    const minCurve = this.minParamCurve(id, isCustom, classId)
    const maxCurve = this.maxParamCurve(id, isCustom, classId)
    const curveValue = Math.randomInt(maxCurve + 1)

    return Math.max(minCurve, curveValue)
}

Game_Battler.prototype.setParamValueWithCustomCurve = function(history, id, isCustom, level, curveValue, classId){
    const capCurve = this.capParamCurve(id, isCustom, classId)
    const newParamValue = history[id][level-1] + curveValue

    return Math.min(capCurve, newParamValue)
}

Game_Battler.prototype.setLastParamsGain = function(paramId, isCustom, value, paramValue, classId){
    const capValue = this.capParamCurve(paramId, isCustom, classId)

    if(paramValue + value >= capValue){
        const lastParam = (paramValue + value) - capValue
        this._lastParamsGain[paramId] = lastParam
    }else{
        if(isCustom){
            this._lastCParamsGain[paramId] = value
        }else{
            this._lastParamsGain[paramId] = value
        }
    }
}

Game_Battler.prototype.fillHistory = function(history, isCustom, level, paramId, curveValue, paramValue, isLevelUp){
    if(isLevelUp){
        history[paramId][level] = paramValue
        this.setLastParamsGain(paramId, isCustom, curveValue, paramValue)
        
    }else{
        history[paramId][level + 1] = 0
        this.setLastParamsGain(paramId, isCustom, 0, paramValue)
    }
}

Game_Battler.prototype.getHistoryByType = function(isCustom, classId){
    if(isCustom){
        return this._classHistory[classId].cparams
    }else{
        return this._classHistory[classId].params
    }
}

Game_Battler.prototype.paramGrowthChance = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const classChance = curve[id]['growthChance']
    const battlerChance = isCustom ? this.getGrowthChanceCParamPlus(id) : this.getGrowthChanceParamPlus(id)

    return (classChance + battlerChance).clamp(0, Plugin.maxGrowthChance)
}

Game_Battler.prototype.initialParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['initial']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.minParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['min']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.maxParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['max']

    return this.evaluateParameter(param);
}

Game_Battler.prototype.capParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['cap']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.evaluateParameter = function(param){
    if(isNaN(param)){
        return eval(param)
    }else{
        return Number(param)
    }
}

Game_Battler.prototype.paramsHistory = function(classId = this._classId){
    return this._classHistory[classId].params
}

Game_Battler.prototype.cparamsHistory = function(classId = this._classId){
    return this._classHistory[classId].cparams
}

Game_Battler.prototype.lastParamsGain = function(){
    return this._lastParamsGain
}

Game_Battler.prototype.lastCParamsGain = function(){
    return this._lastCParamsGain
}

Game_Battler.prototype.changeEachLevel = function(level){
    const currentLevel = this._level;
    const levelDifference = Math.abs(currentLevel - level)

    if(currentLevel < level){

        for(let i = 0; i < levelDifference; i++){
            this.levelUp();
        }
    }else if(currentLevel > level){

        for(let i = 0; i < levelDifference; i++){
            this.levelDown();
        }
    }

}

Game_Battler.prototype.prepareClass = function(classId, keepExp){
    const targetLevel = keepExp ? this._level : 1
    this.buildNewClassHistory(classId, targetLevel)
}

}

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Alias.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    this.setupMainClass(actorId)
    Alias.Game_Actor_setup.call(this, actorId)
    this.fillMainClass(actorId)
}

Alias.Game_Actor_param = Game_Actor.prototype.param
Game_Actor.prototype.param = function(paramId) {
    const alias = Alias.Game_Actor_param.call(this, paramId)
    const maxValue = this.capParamCurve(paramId)
    const minValue = this.paramMin(paramId)
    const value = alias.clamp(minValue, maxValue)

    return value
}

Alias.Game_Actor_cparam = Game_Actor.prototype.cparam
Game_Actor.prototype.cparam = function(paramId) {
    const alias = Alias.Game_Actor_cparam.call(this, paramId)
    const maxValue = this.capParamCurve(paramId, true)
    const minValue = this.paramMin(paramId, true)
    const value = alias.clamp(minValue, maxValue)

    return value
}

Alias.Game_Actor_levelUp = Game_Actor.prototype.levelUp
Game_Actor.prototype.levelUp = function() {
    this.levelUpHistory(this._classId, this._level + 1)
    Alias.Game_Actor_levelUp.call(this)
}

Alias.Game_Actor_levelDown = Game_Actor.prototype.levelDown
Game_Actor.prototype.levelDown = function() {
    Alias.Game_Actor_levelDown.call(this)
    this.levelDownHistory(this._classId, this._level)
}

Alias.Game_Actor_changeLevel = Game_Actor.prototype.changeLevel
Game_Actor.prototype.changeLevel = function(level, show) {
    this.changeEachLevel(level)
    Alias.Game_Actor_changeLevel.call(this, level, show)
}

Alias.Game_Actor_changeClass = Game_Actor.prototype.changeClass
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    this.prepareClass(classId, keepExp)
    Alias.Game_Actor_changeClass.call(this, classId, keepExp)
}

// Overwrite, since we do not use the params from $dataClasses anymore.
Game_Actor.prototype.paramBase = function(paramId) {
    return this.paramsHistory()[paramId][this._level]
}

Game_Actor.prototype.cparamBase = function(paramId) {
    return this.cparamsHistory()[paramId][this._level]
}

Game_Actor.prototype.subject = function(){
    return this.actor()
}

Game_Actor.prototype.setupMainClass = function(actorId){
    const actor = $dataActors[actorId]
    this._classId = actor.classId

    if(this.canInitNewClassHistory(this._classId)){
        this.initParamHistory(this._classId)
        this._classHistory[this._classId].isPromoted = true
    }
}

Game_Actor.prototype.fillMainClass = function(actorId){
    this._level = 1
    this.fillFirstLevelHistory(false, this._classId)

    if(Imported.Eli_CustomParameter){
        this.fillFirstLevelHistory(true, this._classId)
    }
    this.holdInitialCurve()
    this.changeLevel($dataActors[actorId].initialLevel)
    this._classHistory[this._classId].level = $dataActors[actorId].initialLevel
    this.recoverAll()
}

Game_Actor.prototype.getGrowthChanceParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceParamPlus.call(this, paramId)
    const equipChance = this.equips().reduce((accumulator, equip) => {
        return equip ? equip.growthChanceParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + equipChance
}

Game_Actor.prototype.getGrowthChanceCParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceCParamPlus.call(this, paramId)
    const equipChance = this.equips().reduce((accumulator, equip) => {
        return equip ? equip.growthChanceCParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + equipChance
}

}

/* ------------------------------- GAME ENEMY ------------------------------- */
if(Imported.Eli_EnemyClass){

Alias.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    this.setupMainClass(enemyId)
    Alias.Game_Enemy_setup.call(this, enemyId, x, y)
    this.fillMainClass()
}

Alias.Game_Enemy_cparamBase = Game_Enemy.prototype.cparamBase
Game_Enemy.prototype.cparamBase = function(paramId) {
    if(this._classId > 0){
        return this.cparamsHistory()[paramId][this._level]
    }else{
        return Alias.Game_Enemy_cparamBase.call(this, paramId)
    }
}

Alias.Game_Enemy_param = Game_Enemy.prototype.param
Game_Enemy.prototype.param = function(paramId) {
    let value = Alias.Game_Enemy_param.call(this, paramId)

    if(this._classId > 0){
        const maxValue = this.capParamCurve(paramId)
        const minValue = this.paramMin(paramId)
        value = value.clamp(minValue, maxValue)
    }

    return value
}

Alias.Game_Enemy_cparam = Game_Enemy.prototype.cparam
Game_Enemy.prototype.cparam = function(paramId) {
    let value = Alias.Game_Enemy_cparam.call(this, paramId)

    if(this._classId > 0){
        const maxValue = this.capParamCurve(paramId, true)
        const minValue = this.paramMin(paramId, true)
        value = value.clamp(minValue, maxValue)
    }

    return value
}

// Alias from Enemy Class
Alias.Game_Enemy_levelUp = Game_Enemy.prototype.levelUp
Game_Enemy.prototype.levelUp = function() {
    this.levelUpHistory(this._classId, this._level + 1)
    Alias.Game_Enemy_levelUp.call(this)
}

// Alias from Enemy Class
Alias.Game_Enemy_levelDown = Game_Enemy.prototype.levelDown
Game_Enemy.prototype.levelDown = function() {
    Alias.Game_Enemy_levelDown.call(this)
    this.levelDownHistory(this._classId, this._level)
}

// Alias from Enemy Class
Alias.Game_Enemy_changeLevel = Game_Enemy.prototype.changeLevel
Game_Enemy.prototype.changeLevel = function(level, show) {
    this.changeEachLevel(level)
    Alias.Game_Enemy_changeLevel.call(this, level, show)
}

// Alias from Enemy Class
Alias.Game_Enemy_changeClass = Game_Enemy.prototype.changeClass
Game_Enemy.prototype.changeClass = function(classId, keepExp) {
    this.prepareClass(classId, keepExp)
    Alias.Game_Enemy_changeClass.call(this, classId, keepExp)
}

Game_Enemy.prototype.hasInitialLevel = function(){
    return this.enemy().meta.hasOwnProperty('InitialLevel')
}

// Overwrite from Enemy Class. We do not use the params from $dataClasses anymore.
Game_Enemy.prototype.getParamBaseFromClass = function(paramId) {
    return this.paramsHistory()[paramId][this._level]
}

Game_Enemy.prototype.subject = function(){
    return this.enemy()
}

Game_Enemy.prototype.setupMainClass = function(enemyId){
    const enemy = $dataEnemies[enemyId]
    const meta = enemy.meta
    this._classId = Number(meta.ClassId) || 0
    
    if(this._classId > 0){
        if(this.canInitNewClassHistory(this._classId)){
            this.initParamHistory(this._classId)
            this._classHistory[this._classId].isPromoted = true
        }
    }
}

Game_Enemy.prototype.fillMainClass = function(){
    if(this._classId > 0){
        this.fillFirstLevelHistory(false, this._classId)

        if(Imported.Eli_CustomParameter){
            this.fillFirstLevelHistory(true, this._classId)
        }

        this.holdInitialCurve()
        this.changeLevel(this._initialLevel)
        this._classHistory[this._classId].level = this._initialLevel
    }

    this.recoverAll()
}

Game_Enemy.prototype.getGrowthChanceParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceParamPlus.call(this, paramId)
    const equipChance = this.equips().reduce((accumulator, equip) => {
        return equip ? equip.growthChanceParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + equipChance
}

Game_Enemy.prototype.getGrowthChanceCParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceCParamPlus.call(this, paramId)
    const equipChance = this.equips().reduce((accumulator, equip) => {
        return equip ? equip.growthChanceCParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + equipChance
}

}

/* ------------------------------- GAME ACTION ------------------------------ */
{

Game_Action.EFFECT_GROWTH_CHANCE_PARAM            = "Growth Chance Param"
Game_Action.EFFECT_GROWTH_CHANCE_CPARAM           = "Growth Chance Custom Param"

Alias.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect
Game_Action.prototype.applyItemEffect = function(target, effect) {
    Alias.Game_Action_applyItemEffect.call(this, target, effect)
    this.applyItemEffectGrowthChance(target, effect)
}

Game_Action.prototype.applyItemEffectGrowthChance = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_GROWTH_CHANCE_PARAM:
            this.itemEffectGrowChanceParam(target, effect)
        break
        case Game_Action.EFFECT_GROWTH_CHANCE_CPARAM:
            this.itemEffectGrowChanceCParam(target, effect)
        break
    }
}

Game_Action.prototype.itemEffectGrowChanceParam = function(target, effect) {
    target.addGrowthChanceParamPlus(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

Game_Action.prototype.itemEffectGrowChanceCParam = function(target, effect) {
    target.addGrowthChanceCParamPlus(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

}

}