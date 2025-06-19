window.preloadYamls = {
  'bin/preloads/imarket.yml': `
  # ================================
#        Main Asset     
# ================================
asset:
  id: default_asset
  category: ores
  isAvailable: true
  isHidden: true
  isSellable: true
  displayQuantity: true
  rarity: Common
  preview: ASSET_PREVIEW_2D
  quantity: -1
  showQuantity: true
  saleSettings:
    # THIS OPTION IS HERE BECAUSE SOME ASSETS WILL BE VERY VALUABLE AND ONLY ONE OR 2 can be up for sale at the same time.
    # Permission: imarket.selling.1 (The quantity will be set in LuckPerms )
    sale_limit: 2
    # show the time to remove something from the market
    unlist_delay: 5
    expiry_date: 15d
    gems:
      price: 50.0
      interest:
        every: 1d
        percent: 0.5
      priceCap: 10.5
      tax:
        amount: 13.0
        deductible: SELLER
    tickets:
      price: 0.0
      interest:
        every: 1d
        percent: 0.5
      priceCap: 10.5
      tax:
        amount: 13.0
        deductible: SELLER
  asset:
    type: Item
    glow: true
    material: PAPER
    name: '&eTest Paper Name'
    lore:
    - '&7Test lore line 1'
    - '&7Test lore line 2'
    footer:
      enable: true
      list:
      - ''
      - '%rarity%%type%'
      - '&7%previous_3_owners%'
    modeldata:
      main: 0
      alt:
      - 100
      - 200
      enlarged: '100'
    containerData:
      data:
      - plugin: imarket
        key: key
        value: value
    previous_owners:
      enable: true
      numbers: 3
    commands:
    - command a
    - command b
    stackable: true

  `,
  // #################################################################################################
  'bin/preloads/sem.yml': `
  #  _____           _           _      _____  ______   __  __
# |  __ \         (_)         | |    / ____||  ____| |  \/  |
# | |__) | __ ___  _  ___  ___| |_  | (___  | |__    | \  / |
# |  ___/ '__/ _ \| |/ _ \/ __| __|  \___ \ |  __|   | |\/| |
# | |   | | | (_) | |  __/ (__| |_   ____) || |____ _| |  | |_
# |_|   |_|  \___/| |\___|\___|\__| |_____(_)______(_)_|  |_(_)
#                _/ |
#               |__/
# ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
# ┃                 S.E.M. Config                 ┃
# ┃  Acts of Violation will initiate legal action ┃
# ┃  Property of (C) GENESIVERSE.INC              ┃
# ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
# ┣╸ Information: https://bit.ly/genesicraft-licenses
# ┣╸ Website: https://github.com/Genesiverse
# ┗╸ CEO: Jan Gigantino, Vanessa Persichitti





# ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
# ┃           P R O M P T S           ┃
# ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
prompts:
  
  # ┏━━━━━━━━━━━━━━━━━━━━━┓
  # ┃       METHODS       ┃
  # ┗┳━━━━━━━━━━━━━━━━━━━━┛
   # ┗━━━ Method= [SCHEDULE, SERVER, LOCAL]
  countdown_method: LOCAL
  # ┏━━━━━━━━━━━━━━━━━━━━━┓
  # ┃      COUNTDOWN      ┃
  # ┗┳━━━━━━━━━━━━━━━━━━━━┛
   # ┃ Format for => Countdown, Cooldown and Lock Module of the drop
   # ┃ Format for => Countdown, Cooldown and Lock Module of the drop
   # ┃ Available Formats:
   # ┃ '10s' 10 seconds
   # ┃ '10m' 10 minutes
   # ┃ '10h' 10 hours
   # ┃ '10d' 10 days
   # ┃ 
   # ┃ 
   # ┃ Specify the delay between each trigger of the drop
   # ┗━━━
  countdown: '10s'

  # ┏━━━━━━━━━━━━━━━━━━━━┓
  # ┃      COOLDOWN      ┃
  # ┗━━━━━━━━━━━━━━━━━━━━┛
    # Specify the cooldown which is the time when the drop is ended.
    # If the cooldown is '5s' which means 5 seconds, then the drop
    # once it ends, it will take countdown + cooldown seconds before
    # being started.
  cooldown: '5s'

  # Specify whether the drop should check if the player's inventory is full.
  # If check-inventory set to 'true', then the drop will proceed in checking
  # the player's inventory if he wins the drop.
  check-inventory: false

  # Specify the amount of the required users needed to activate the drop
  require_user_to_activate: 1

  # Specify the winning chance of each user
  chance: 100 # Decimal numbers are NOT allowed here.

  # Targets Module
  targets:

    # Type can be: [SET, PERCENTAGE]
    type: 'PERCENTAGE'
    # Decimal numbers are NOT allowed in targets module.
    percentage: 100
    # The values below are only valid if type is set to 'SET'
    min-set: 1
    max-set: 3

  # Lock Status Module.
  # This module is responsible for the locking system of drops
  lock:
    enabled: false
    time: '30s' # Time format is explained above.
    glow_settings:
      when_unlocking: false
      when_ready: false

  # ┏━━━━━━━━━━━━━━━━━━━━━━┓
  # ┃  SCHEDULE SETTINGS   ┃
  # ┣━━━━━━━━━━━━━━━━━━━━━━┛
  # ┃  Method= [FIX, INTERVAL]
  # ┃  Specify the schedule settings of the drop
  # ┃  This module is only valid when the countdown_method is set to 'SCHEDULE'
  # ┃  Otherwise, this module will be ignored.
  # ┃ 
  # ┃ Specify the schedule settings of the drop
  # ┃ This module is only valid when the countdown_method is set to 'SCHEDULE'
  # ┃ Otherwise, this module will be ignored.
  # ┗━━━ 
  schedule_settings:
    method: 'FIX' # method can be: [FIX, INTERVAL]
    # fix: [] # If you wish to have fix empty.
    # Fix means in a fixed times. So, for example if fix contains '15:00'
    # That means that when that time is reached based on the server's default
    # date-time, then if the drop is not activated, then the drop will start
    # the countdown time. Once countdown is finished, the next date-time will be
    # checked.
    fix:
      - '15:00'
      - '22:00'
      - '08:00'
    # Interval meaning a period in which the drop will be started and ended.
    interval: '08:00-10:00'

  # ┏━━━━━━━━━━━━━━━━━━━━━┓
  # ┃       REGION        ┃
  # ┗━━━━━━━━━━━━━━━━━━━━━┛
   # Specify the region settings
  region:
    enabled: false
    allowed-user-teleport: false
    regions: {} # regions: {} for empty hash of regions.
    #  example:
    #    max-capacity: 10
    #    fluctuate-chance: '=50' # Available Formats: [=50, +50, -50]
 



# ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
# ┃          S E T T I N G S          ┃
# ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
# Specify the icons of the drop in /vault
settings:
  # Specify the icons of the drop in /vault
  icons:
    locked:
      type: 'default'
      amount: 1
      material: LEATHER_HORSE_ARMOR
      model-data: 1773
      color: 255,255,255
      name: name
      hide-attributes: false
      hide-enchants: false
      hide-tooltip: false
      lore:
        - '&6 &6sᴛᴀʀᴛ ᴜɴʟᴏᴄᴋ'
    unlocking:
      type: 'default'
      amount: 1
      material: LEATHER_HORSE_ARMOR
      model-data: 1773
      color: 255,255,255
      name: name
      hide-attributes: false
      hide-enchants: false
      hide-tooltip: true
      lore:
      - '&6&lᴜɴʟᴏᴄᴋɪɴɢ ᴛᴀᴋᴇs:'
      - '&7%remaining-time%'
    unlocked:
      type: 'default'
      amount: 1
      material: LEATHER_HORSE_ARMOR
      model-data: 1773
      color: 255,255,255
      name: name
      hide-attributes: false
      hide-enchants: false
      hide-tooltip: true
      lore:
        - '&6 &e&lᴏᴘᴇɴ'
    unavailable:
      type: default
      amount: 1
      material: LEATHER_HORSE_ARMOR
      model-data: 1773
      color: 255,255,255
      name: name
      hide-attributes: false
      hide-enchants: false
      hide-tooltip: true
      lore:
      - '&cᴀɴᴏᴛʜᴇʀ ᴜɴʟᴏᴄᴋ ɪs'
      - '&csᴛɪʟʟ ɪɴ ᴘʀᴏɢʀᴇss!'
    in_queue:
      type: 'default'
      amount: 1
      material: LEATHER_HORSE_ARMOR
      model-data: 1773
      color: 255,255,255
      name: name
      hide-attributes: false
      hide-enchants: false
      hide-tooltip: true
      lore:
      - '&6 &e&lᴏᴘᴇɴ'
    empty:
      type: 'default'
      amount: 1
      material: LEATHER_HORSE_ARMOR
      model-data: 1773
      color: 255,255,255
      name: name
      hide-attributes: false
      hide-enchants: false
      hide-tooltip: true
      lore:
      - '&6 &e&lᴏᴘᴇɴ'

  # ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  # ┃      BROADCAST Modules    ┃
  # ┗┳━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   # ┃    PLAYER_HEAD
   # ┃    MATERIAL:PLAYER_HEAD:%tagget% %player%
   # ┗━━━ 
  broadcast:
    global_winner_announcement:
      global:
        toast:
          enabled: false
          text: "&aCongrats, %winner_1%! You are a true champion!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "逗镕敉殷"
            - "匑 &d&lʙᴇᴛᴀ ɪᴛᴇᴍs!"
            - "匑 &bCongratulations to:&d %no_winner% %winner_1% %winner_2%"
            - "匑 &8Next Beta Draw:&e 30Min global"
            - "匑"
          sound: []
      self:
        toast:
          enabled: false
          text: "&a%winner_1%, your skill is the talk of the town!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          owner: '%winner_1%'
          icon: def
          background: def
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "逗镕敉殷"
            - "匑 &d&lʙᴇᴛᴀ ɪᴛᴇᴍs!"
            - "匑 &bCongratulations to:&d %no_winner% %winner_1% %winner_2%"
            - "匑 &8Next Beta Draw:&e 30Min global"
            - "匑"
          sound: []

    region_winner_announcement:
      global:
        toast:
          enabled: false
          text: "&c%total_target_count% %winners%, you are the champs of this region!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:                      
            - "逗镕敉殷"
            - "匑 &d&lʙᴇᴛᴀ ɪᴛᴇᴍs! &8| &7ᴛᴏᴛᴀʟ ᴡɪɴɴᴇʀs: %total_target_count%"
            - "匑 &bCongratulations to:&d %no_winner% %winner_1%, %winner_2%"
            - "匑 &8Next Beta Draw:&e 30Min global"
            - "匑"
            # - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&d %total_target_count% of you can claim the reward at the near vault."
          sound: []
      self:
        toast:
          enabled: false
          text: "&aVictory! You've won a prize!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8» #fff500You are one of them so run forrest run!"
          sound:
            - "minecraft:ui.achievement.receive"

    region_join: # DONE TEST ONLY SEFT WORKING
      global:
        toast:
          enabled: false
          text: "&7Someone just stepped into the ring!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&7[&2+&7] &fDont be shy, say hi!"
          sound: []
      self:
        toast:
          enabled: false
          text: "#00AEE6Show them what you got, good luck!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: "minecraft:games.global.faction.join" 
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&r Welcome! Not a giveaway without you! %player% %status_bar%"
          sound:
            - "minecraft:effect.region.join"

    region_leave: # DONE TEST ONLY SEFT WORKING
      global:
        toast:
          enabled: false
          text: "&cOne less challenger."
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&7[&c-&7] &fOkay dont take it personally.."
          sound: []
      self:
        toast:
          enabled: false
          text: "&cCome back when you are ready for more"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message: []
            # - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&r Left the giveaway? The fun is still waiting for you!"
          sound: 
            - "minecraft:effect.region.leave"

    region_drop_start:
      global:
        toast:
          enabled: false
          text: "#00e677Pixels up, let the games begin!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&r Hold tight, the giveaway starts now."
          sound:
            - "minecraft:games.global.early.elimination"
      self:
        toast:
          enabled: false
          text: "#00e677Will the giveaway choose you? Let's see!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&r Hold tight, the giveaway start now."
          sound:
            - "minecraft:notification.announcement.1"

    region_drop_end: # DONE TEST NOT WORKING
      global:
        toast:
          enabled: false
          text: "&fThe giveaway is over!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            # - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&r #00e677Round over that's a wrap!"
            - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&r &dRound is over that's a wrap!"
          sound: []
      self:
        toast:
          enabled: false
          text: "&cThe drops over, but stick around cause more are coming!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&r #00e677Stay in to catch the next one!"
          sound:
            - "minecraft:effect.region.drop.end"

    region_drop_waiting: # DONE TEST NOT WORKING
      global:
        toast:
          enabled: false
          text: "#e6a500We are powering up... More players needed to start the fun!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "#e6a500Not enough players connected!"
            - "#e6a500Hang in there, were sooo close"
          sound: []
      self:
        toast:
          enabled: false
          text: "#e6a500Awaiting for additional players."
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "#e6a500Not enough players yet."
            - "#e6a500Chill for a sec."
          sound:
            - "minecraft:effect.region.waiting"

    region_full:
      global:
        toast:
          enabled: false
          text: "&cNo entry! This rooms packed to the max!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&cMaxed out! Check back in a bit."
          sound: []
      self:
        toast:
          enabled: false
          text: "&cLooks like you should have made a reso.."
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%winner_1%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "&cSorry, theres no room in the inn."
          sound:
            - "minecraft:effect.region.full"

    lock_countdown_start:
      self:
        toast:
          enabled: false
          text: "#e6a500System on hold, waiting for more players to join the fun!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%player%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "#e6a500Were not at full power yet!"
            - "#e6a500Hold tight and wait for backup!"
          sound: []

    lock_countdown_end:
      self:
        toast:
          enabled: false
          text: "#e6a500The lock.. its.. UNLOCKED!"
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%player%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "#e6a500No need to guess the combo"
            - "#e6a500its unlocked!"
          sound: []

    lock_countdown_collect:
      self:
        toast:
          enabled: false
          text: "#e6a500Collect from your vault, young one."
          type: 'TASK' # Available types: [TASK, GOAL, CHALLENGE]
          icon: def
          background: def
          owner: '%player%'
          sound: []
          material: 'LEATHER_HORSE_ARMOR'
          model-data: 1773
        chat:
          enabled: false
          message:
            - "#e6a500Hey you, yeah you.."
            - "#e6a500You deserve it."
          sound: []

  # Specify the sounds of this drop
  sounds:
    obtain_bundle:
      sound1:
        sound: ''
        delay: 3 # Decimals are NOT allowed here. The delay is in seconds.

  # Specify the placeholders of this drop
  placeholders:
    # %status_bar%, %no_target%
    # %winner% %winner_1,2,3%
    # %pay_in% %pay_out%
    # %drop_name% %total_target_count%
    status_bar:
      icon: "猱"
      1: "㕀"
      2: "㕂"
      3: "㕄"
      4: "㕆"
      5: "㕈"
      6: "㕊"
      7: "㕌"
      8: "㕎"
      9: "㕐"
      10: "㕒"
      11: "㕔"
      12: "㕖"
      13: "㕘"
      14: "㕚"
      15: "㕜"
      16: "㕞"
      17: "㕠"
      18: "㕢"
      19: "㕤"
      20: "㕦"
      21: "㕨"
      22: "㕪"
      23: "㕬"
      24: "㕮"
      25: "㕰"
      26: "㕲"
      27: "㕴"
      28: "㕶"
      29: "㕸"
      30: "㕺"
      31: "㕼"
      32: "㕾"
      33: "㖀"
      34: "㖂"
      35: "㖄"
      36: "㖆"
      37: "㖈"
      38: "㖊"
      39: "㖌"
      40: "㕁"
      41: "㕃"
      42: "㕅"
      43: "㕇"
      44: "㕉"
      45: "㕋"
      46: "㕍"
      47: "㕏"
      48: "㕑"
      49: "㕓"
      50: "㕕"
      51: "㕗"
      52: "㕙"
      53: "㕛"
      54: "㕝"
      55: "㕟"
      56: "㕡"
      57: "㕣"
      58: "㕥"
      59: "㕧"
      60: "㕩"
      61: "㕫"
      62: "㕭"
      63: "㕯"
      64: "㕱"
      65: "㕳"
      66: "㕵"
      67: "㕷"
      68: "㕹"
      69: "㕻"
      70: "㕽"
      71: "㕿"
      72: "㖁"
      73: "㖃"
      74: "㖅"
      75: "㖇"
      76: "㖉"
      77: "㖋"
      78: "㖍"
    # This is the placeholder if the drop has no winners.
    # This gets automatically replaced if there are winners so
    # You must contain it in the chat if you want to show the message
    # Once there are no winners in a drop.
    winners:
      no_target: '&4&lNo Winners'
    
  # Specify the permissions for this drop
  permissions:
    local: 'sem.drop.local.default'
    deny: 'sem.drop.deny.default'
    lock: 'sem.drop.lock.limit.<number>'
 



# ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
# ┃           B U N D L E             ┃
# ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
bundle:
  # ┏━━━━━━━━━━━━━━━━━━━━┓
  # ┃    AUTO COLLECT    ┃
  # ┗━━━━━━━━━━━━━━━━━━━━┛
  auto_collect: false
  # ┏━━━━━━━━━━━━━━━━━━━━┓
  # ┃    EXPIRE DATE     ┃
  # ┗━━━━━━━━━━━━━━━━━━━━┛
  expire_date: '12345678d'
  # ┏━━━━━━━━━━━━━━━━━━━━┓
  # ┃     UNLOCK FEE     ┃
  # ┗━━━━━━━━━━━━━━━━━━━━┛
  unlock_fee:
    currency: ruby
    multiplier: 20
  # ┏━━━━━━━━━━━━━━━━━━━━┓
  # ┃      ACTIONS       ┃
  # ┗━━━━━━━━━━━━━━━━━━━━┛
  actions:
    pay_in: 0
    currency_in: gems
    pay_out: 0
    currency_out: gems
    commands_fix: []
    commands_random: []
    commands_settings:
      minimum-random: 1
      maximum-random: 3
    messages: []
    # The name of the file in the text folder.
    # Do NOT add the .txt, only the name.
    # The format of your text file must be .txt
    text: []

    give: []
    # give:
      # 1:
        # material: 'LEATHER_HORSE_ARMOR'
        # name: ''
        # amount: 1
        # model-data: 1773
        # lore: []
        # hide-attributes: false
        # hide-enchants: false
        # hide-tooltip: false
        # color: ''
        # Specify the permissions of the bundle
        
        
        
  # ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  # ┃       P E R M I S S I O N S       ┃
  # ┗┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   # ┃ TIP:
   # ┣━━━ For instance, if "Test1 Drop" has two permissions,
   # ┗━━━ the permission with the lower number is chosen. 
   # permissions:
   # has0:
   # permission: "sem.debug"
   # auto_collect: true
   # actions:
   # pay_in: 0
   # pay_out: 0
   # has1:
   # permission: "sem.debug2"
   # auto_collect: true
   # actions:
   # pay_in: 0
   # pay_out: 0


  permissions:
    has0:
      permission: 'bundle.vip'
      bundle: {} 
 

# ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
# ┃   F A L L B A C K   B U N D L E   ┃
# ┗┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
#  ┃ Specify the permissions of the bundle
#  ┃ Specify the fallback bundle. This bundle is given when the user's /vault is full
#  ┃ fallback-bundle: {}
#  ┗━━
fallback-bundle:
  actions:
    currency_in: 'gems'
    pay_in: 10~25
    messages:
      - "&f&8◦ &8ꌄ섆&f魉眠&8뜆醭&f倷 ʀᴏᴀɴ &8»&r Something didn't go as planned.. heres a small reward for the inconvenience &8| &a+ %pay_in%"
  
  
  
  `
};