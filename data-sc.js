/**
 * @fileoverview Star Citizen 4.1.1/4.1.2 Complete Keybinds Profile for Stream Deck
 * VERSION COMPLÈTE - Basée sur data-sc-complete.js (144+ commandes officielles)
 * Source: Analyse complète des 11 fichiers HTML du dossier sc-bindings
 * Structure: 6 pages optimisées pour Stream Deck 3 lignes × 5 boutons (15 boutons/page)
 */

const { hotkey, action, back, nextPage, previousPage } = require('./lib/actions');
const { profileId } = require('./lib/ids');
const { profile } = require('./lib/profile');

/** @typedef {import('./lib/actions').Action} Action */
/** @typedef {import('./lib/profile').Profile} Profile */

/**
 * Helper function to create hotkey actions with Star Citizen settings
 */
function scHotkey(title, vKeyCode, ctrl = false, alt = false, shift = false, icon = 'star-citizen-key') {
  return hotkey({
    title,
    icon,
    hotkey: {
      "KeyCmd": false,
      "KeyCtrl": ctrl,
      "KeyModifiers": (ctrl ? 2 : 0) + (alt ? 1 : 0) + (shift ? 4 : 0),
      "KeyOption": alt,
      "KeyShift": shift,
      "NativeCode": vKeyCode,
      "QTKeyCode": vKeyCode,
      "VKeyCode": vKeyCode,
    },
  });
}

/**
 * Helper function to parse key bindings from data-sc-complete.js format
 */
function parseKeyBinding(keyString) {
  const keyMappings = {
    // Letters
    'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74,
    'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84,
    'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90,
    // Numbers
    '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, '0': 48,
    // Function keys
    'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115, 'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119,
    'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123,
    // Special keys
    'space': 32, 'enter': 13, 'tab': 9, 'escape': 27, 'backspace': 8,
    // Mouse
    'mouse1': 1000, 'mouse2': 1001, 'mouse3': 1002,
    'mousewheelup': 1003, 'mousewheeldown': 1004,
    // Arrows
    'up': 38, 'down': 40, 'left': 37, 'right': 39,
    // Numpad
    'numpad1': 97, 'numpad2': 98, 'numpad3': 99, 'numpad4': 100, 'numpad5': 101,
    'numpad6': 102, 'numpad7': 103, 'numpad8': 104, 'numpad9': 105, 'numpad0': 96,
    'numpad+': 107, 'numpad-': 109,
    // Brackets and special
    '[': 219, ']': 221, ';': 186
  };

  let key = keyString.toLowerCase().replace('hold+', '');
  let ctrl = false, alt = false, shift = false;

  // Parse modifiers
  if (key.includes('ctrl+') || key.includes('lctrl+') || key.includes('rctrl+')) {
    ctrl = true;
    key = key.replace(/(ctrl|lctrl|rctrl)\+/g, '');
  }
  if (key.includes('alt+') || key.includes('lalt+') || key.includes('ralt+')) {
    alt = true;
    key = key.replace(/(alt|lalt|ralt)\+/g, '');
  }
  if (key.includes('shift+') || key.includes('lshift+') || key.includes('rshift+')) {
    shift = true;
    key = key.replace(/(shift|lshift|rshift)\+/g, '');
  }

  const vKeyCode = keyMappings[key] || 0;
  return { vKeyCode, ctrl, alt, shift };
}

/**
 * @param {Profile} profile
 * @returns {Action}
 */
function folder(profile) {
  return action({
    name: 'Create Folder',
    title: profile.name,
    icon: profile.icon,
    uuid: 'com.elgato.streamdeck.profile.openchild',
    numStates: 1,
    state: 0,
    settings: {
      'ProfileUUID': profile.uuid,
    },
  });
}

// =====================================================
// PAGE 1: ESSENTIAL FLIGHT
// =====================================================

const essentialFlightProfile = profile({
  name: 'Essential\nFlight',
  icon: 'airplane',
  actions: [
    [
      back(),
      scHotkey('Flight\nReady', 82, false, true, false, 'power'), // ralt+r
      scHotkey('Quantum\nDrive', 66, false, false, false, 'zap'), // b
      scHotkey('Landing\nGear', 78, false, false, false, 'plane-arrival'), // n
      scHotkey('Target\nCycling', 84, false, false, false, 'target'), // t
    ],
    [
      scHotkey('Pin Target\n1', 49, false, false, false, 'pin'), // 1
      scHotkey('Pin Target\n2', 50, false, false, false, 'pin'), // 2
      scHotkey('Pin Target\n3', 51, false, false, false, 'pin'), // 3
      scHotkey('Open All\nDoors', 68, true, false, false, 'door-open'), // rctrl+d
      scHotkey('Close All\nDoors', 68, true, false, false, 'door-open'), // lctrl+d
    ],
    [
      scHotkey('Lock\nDoors', 68, false, true, false, 'lock'), // lalt+d
      scHotkey('Cycle\nCamera', 115, false, false, false, 'camera'), // f4
      scHotkey('Free\nLook', 90, false, false, false, 'eye'), // z
      scHotkey('Exit\nSeat', 89, false, false, false, 'log-out'), // y
      nextPage()
    ]
  ]
});

// =====================================================
// PAGE 2: COMBAT & WEAPONS
// =====================================================

const combatWeaponsProfile = profile({
  name: 'Combat\n& Weapons',
  icon: 'target',
  actions: [
    [
      back(),
      scHotkey('Fire\nWeapons', 1000, false, false, false, 'zap'), // mouse1
      scHotkey('Launch\nMissiles', 1000, false, false, false, 'rocket'), // mouse1
      scHotkey('Cycle\nMissiles', 1003, false, false, false, 'repeat'), // mousewheel
      scHotkey('Gimbal\nMode', 71, false, false, false, 'crosshair'), // g
    ],
    [
      scHotkey('Manual\nGimbal', 71, true, false, false, 'move'), // ralt+g
      scHotkey('Fixed\nGimbal', 71, false, true, false, 'lock'), // lalt+g
      scHotkey('Precision\nTarget', 1001, false, true, false, 'bullseye'), // lalt+mouse2
      scHotkey('Cycle\nHostiles', 53, false, false, false, 'alert-triangle'), // 5
      scHotkey('Cycle\nFriendlies', 54, false, false, false, 'shield'), // 6
    ],
    [
      scHotkey('Cycle All\nTargets', 55, false, false, false, 'repeat'), // 7
      scHotkey('Sub-target\nCycle', 82, false, false, false, 'focus'), // r
      scHotkey('Auto Target\nOn', 84, false, true, false, 'target'), // lalt+t
      scHotkey('Auto Target\nOff', 84, true, false, false, 'x-circle'), // ralt+t
      nextPage()
    ]
  ]
});

// =====================================================
// PAGE 3: ON FOOT COMBAT
// =====================================================

const onFootCombatProfile = profile({
  name: 'On Foot\nCombat',
  icon: 'user',
  actions: [
    [
      back(),
      scHotkey('Fire\nWeapon', 1000, false, false, false, 'gun'), // mouse1
      scHotkey('Aim Down\nSight', 1001, false, false, false, 'crosshair'), // mouse2
      scHotkey('Melee\nAttack', 1002, false, false, false, 'fist'), // mouse3
      scHotkey('Reload', 82, false, false, false, 'refresh'), // r
    ],
    [
      scHotkey('Primary\nWeapon', 49, false, false, false, 'rifle'), // 1
      scHotkey('Secondary\nWeapon', 50, false, false, false, 'gun'), // 2
      scHotkey('Sidearm', 51, false, false, false, 'pistol'), // 3
      scHotkey('Melee\nTool', 86, false, false, false, 'knife'), // v
      scHotkey('Gadget', 53, false, false, false, 'tool'), // 5
    ],
    [
      scHotkey('Sprint', 16, false, false, false, 'zap'), // lshift
      scHotkey('Crouch', 67, false, false, false, 'arrow-down'), // c
      scHotkey('Prone', 17, false, false, false, 'user'), // lctrl
      scHotkey('Jump', 32, false, false, false, 'arrow-up'), // space
      nextPage()
    ]
  ]
});

// =====================================================
// PAGE 4: EVA & GROUND VEHICLES
// =====================================================

const evaGroundProfile = profile({
  name: 'EVA &\nGround',
  icon: 'rocket',
  actions: [
    [
      back(),
      scHotkey('EVA\nForward', 87, false, false, false, 'arrow-up'), // w
      scHotkey('EVA\nBackward', 83, false, false, false, 'arrow-down'), // s
      scHotkey('EVA\nLeft', 65, false, false, false, 'arrow-left'), // a
      scHotkey('EVA\nRight', 68, false, false, false, 'arrow-right'), // d
    ],
    [
      scHotkey('EVA\nUp', 32, false, false, false, 'chevron-up'), // space
      scHotkey('EVA\nDown', 17, false, false, false, 'chevron-down'), // lctrl
      scHotkey('EVA\nBoost', 16, false, false, false, 'rocket'), // lshift
      scHotkey('EVA\nBrake', 88, false, false, false, 'hand'), // x
      scHotkey('Vehicle\nHorn', 32, false, false, false, 'horn'), // space
    ],
    [
      scHotkey('Vehicle\nBrake', 88, false, false, false, 'brake-lights'), // x
      scHotkey('Vehicle\nBoost', 16, false, false, false, 'fast-forward'), // lshift
      scHotkey('Mining\nLaser', 1000, false, false, false, 'pickaxe'), // mouse1
      scHotkey('Mining\nPower Up', 1003, false, false, false, 'plus'), // mousewheelup
      nextPage()
    ]
  ]
});

// =====================================================
// PAGE 5: SOCIAL & INTERFACE
// =====================================================

const socialInterfaceProfile = profile({
  name: 'Social &\nInterface',
  icon: 'users',
  actions: [
    [
      back(),
      scHotkey('MobiGlass', 112, false, false, false, 'tablet'), // f1
      scHotkey('Star\nMap', 113, false, false, false, 'map'), // f2
      scHotkey('Chat\nWindow', 123, false, false, false, 'message-circle'), // f12
      scHotkey('CommLink', 122, false, false, false, 'phone'), // f11
    ],
    [
      scHotkey('Push to\nTalk', 107, false, false, false, 'microphone'), // numpad+
      scHotkey('Inventory', 73, false, false, false, 'package'), // i
      scHotkey('Interaction\nMode', 70, false, false, false, 'hand'), // f
      scHotkey('Inner\nThought', 1001, false, false, false, 'circle'), // mouse2
      scHotkey('Accept\nInvite', 219, false, false, false, 'check'), // [
    ],
    [
      scHotkey('Reject\nInvite', 221, false, false, false, 'x'), // ]
      scHotkey('Forward\nEmote', 101, false, false, false, 'hand-pointer'), // numpad5
      scHotkey('Yes\nEmote', 100, false, false, false, 'thumbs-up'), // numpad4
      scHotkey('No\nEmote', 102, false, false, false, 'hand'), // numpad6
      nextPage()
    ]
  ]
});

// =====================================================
// PAGE 6: ADVANCED & SPECIALIST
// =====================================================

const advancedSpecialistProfile = profile({
  name: 'Advanced\n& Specialist',
  icon: 'settings',
  actions: [
    [
      back(),
      scHotkey('Mining\nMode', 77, false, false, false, 'pickaxe'), // m
      scHotkey('Salvage\nMode', 77, false, false, false, 'recycle'), // m
      scHotkey('Scanning\nMode', 86, false, false, false, 'search'), // v
      scHotkey('Remote\nTurret 1', 38, false, false, false, 'target'), // up
    ],
    [
      scHotkey('Remote\nTurret 2', 37, false, false, false, 'target'), // left
      scHotkey('Remote\nTurret 3', 39, false, false, false, 'target'), // right
      scHotkey('Turret Mouse\nMode', 81, false, false, false, 'mouse'), // q
      scHotkey('Gyro\nStabilization', 69, false, false, false, 'compass'), // e
      scHotkey('Exit\nTurret', 89, false, false, false, 'log-out'), // y
    ],
    [
      scHotkey('MFD Page\nForward', 69, false, true, false, 'chevron-right'), // lalt+e
      scHotkey('MFD Page\nBack', 81, false, true, false, 'chevron-left'), // lalt+q
      scHotkey('Advanced\nCamera', 115, false, false, false, 'camera'), // f4
      scHotkey('Force\nRespawn', 8, false, false, false, 'skull'), // backspace
      previousPage()
    ]
  ]
});

// =====================================================
// MAIN PROFILE STRUCTURE (PAGE SELECTOR)
// =====================================================

const starCitizenMainProfile = profile({
  name: 'Star Citizen 4.1.1',
  icon: 'star-citizen',
  actions: [
    [
      folder(essentialFlightProfile),
      folder(combatWeaponsProfile),
      folder(onFootCombatProfile),
      folder(evaGroundProfile),
      folder(socialInterfaceProfile),
    ],
    [
      folder(advancedSpecialistProfile),
      // Quick access emergency commands
      scHotkey('Flight\nReady', 82, false, true, false, 'power'), // ralt+r
      scHotkey('Force\nRespawn', 8, false, false, false, 'skull'), // backspace
      scHotkey('Exit\nSeat', 89, false, false, false, 'log-out'), // y
      scHotkey('MobiGlass', 112, false, false, false, 'tablet'), // f1
    ],
    [
      // Quick communication & essentials
      scHotkey('Push to\nTalk', 107, false, false, false, 'microphone'), // numpad+
      scHotkey('Accept\nInvite', 219, false, false, false, 'check'), // [
      scHotkey('Reject\nInvite', 221, false, false, false, 'x'), // ]
      scHotkey('Target\nCycling', 84, false, false, false, 'target'), // t
      scHotkey('Free\nLook', 90, false, false, false, 'eye'), // z
    ]
  ]
});

module.exports = () => ({
  mainProfile: [starCitizenMainProfile],
  additionalProfiles: [
    essentialFlightProfile,
    combatWeaponsProfile,
    onFootCombatProfile,
    evaGroundProfile,
    socialInterfaceProfile,
    advancedSpecialistProfile,
  ]
});

module.exports = {
  name: 'Star Citizen 4.1.1/4.1.2 - Configuration Complète HTML',
  profiles: [
  ],
};