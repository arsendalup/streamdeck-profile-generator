/**
 * @fileoverview Star Citizen 4.1.1 Optimized Stream Deck Profile
 * OPTIMIZED VERSION - Organized with separate profiles for intuitive navigation
 * Structure designed for 3x5 Stream Deck layout
 */

const { hotkey, action, back, nextPage, previousPage } = require('./lib/actions');
const { profile, folder } = require('./lib/profile');

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

// Quick Actions Profile
const QUICK_KEY_PROFILE = profile({
  name: '⚡ Quick',
  icon: 'lightning',
  actions: [
    [
      back(),
      scHotkey('Interact', 70, false, false, false, 'hand'),  // F
      scHotkey('MobiGlass', 112, false, false, false, 'display'),  // F1
      scHotkey('Map', 113, false, false, false, 'map'),  // F2
      scHotkey('Inventory', 73, false, false, false, 'backpack'),  // I
    ],
    [
      scHotkey('Exit Seat', 89, false, false, false, 'exit'),  // Y
      scHotkey('Flashlight', 84, false, false, false, 'flashlight'),  // T (placeholder)
      scHotkey('Torch', 84, false, false, false, 'torch'),  // T (placeholder)
      scHotkey('Helmet', 8, false, false, false, 'helmet'),  // Backspace
      scHotkey('Chat', 123, false, false, false, 'chat'),  // F12
    ],
  ]
});

// Flight Systems Profile
const FLIGHT_SYSTEMS_PROFILE = profile({
  name: '🔧 Systems',
  icon: 'gear',
  actions: [
    [
      back(),
      scHotkey('Power On', 85, true, false, false, 'power-on'),  // R Ctrl+U
      scHotkey('Power Off', 85, true, false, false, 'power-off'),  // L Ctrl+U
      scHotkey('Engines On', 73, true, false, false, 'engine-on'),  // R Ctrl+I
      scHotkey('Engines Off', 73, true, false, false, 'engine-off'),  // L Ctrl+I
    ],
    [
      scHotkey('Shields On', 79, true, false, false, 'shield-on'),  // R Ctrl+O
      scHotkey('Shields Off', 79, true, false, false, 'shield-off'),  // L Ctrl+O
      scHotkey('Weapons On', 80, true, false, false, 'weapon-on'),  // R Ctrl+P
      scHotkey('Weapons Off', 80, true, false, false, 'weapon-off'),  // L Ctrl+P
      scHotkey('Self Destruct', 8, false, false, false, 'explosion'),  // Backspace
    ]
  ]
});

// Flight Movement Profile
const FLIGHT_MOVEMENT_PROFILE = profile({
  name: '🚀 Movement',
  icon: 'arrows',
  actions: [
    [
      back(),
      scHotkey('Boost', 65, false, false, false, 'boost'),  // A
      scHotkey('Brake', 88, false, false, false, 'brake'),  // X
      scHotkey('Decouple', 67, false, false, false, 'decouple'),  // C
      scHotkey('Cruise', 67, false, false, false, 'cruise'),  // C DT
    ],
    [
      scHotkey('Landing', 76, false, false, false, 'landing'),  // L
      scHotkey('VTOL', 86, false, false, false, 'vtol'),  // V DT
      scHotkey('Quantum', 81, false, true, false, 'quantum'),  // L Alt+Q
      scHotkey('Jump', 74, false, false, false, 'jump'),  // J
      scHotkey('Autoland', 76, false, false, false, 'autoland'),  // L
    ],
    [
      null,
      scHotkey('Request Land', 57, false, false, false, 'landing-pad'),  // 9 DT
      null,
      null,
      null
    ]
  ]
});

// Combat Profile
const COMBAT_PROFILE = profile({
  name: '⚔️ Combat',
  icon: 'crosshair',
  actions: [
    [
      back(),
      scHotkey('Target', 84, false, false, false, 'target'),  // T
      scHotkey('Pin Target', 49, false, true, false, 'pin'),  // Alt+1
      scHotkey('Hostiles', 53, false, false, false, 'hostile'),  // 5
      scHotkey('Missiles+', 38, false, false, false, 'missile-up'),  // Up
    ],
    [
      scHotkey('Missiles-', 40, false, false, false, 'missile-down'),  // Down
      scHotkey('Gimbal', 71, false, false, false, 'gimbal'),  // G
      scHotkey('ESP', 88, false, false, false, 'esp'),  // X DT
      scHotkey('Precision', 56, false, false, false, 'precision'),  // 8 DT
      scHotkey('Decoy', 186, false, false, false, 'decoy'),  // Semicolon
    ],
    [
      null,
      scHotkey('Fire Mode', 220, false, false, false, 'fire-mode'),  // \ DT
      null,
      null,
      null
    ]
  ]
});

// Doors Profile
const DOORS_PROFILE = profile({
  name: '🚪 Doors',
  icon: 'door',
  actions: [
    [
      back(),
      scHotkey('Toggle', 68, false, false, false, 'door'),  // D DT
      scHotkey('Open All', 68, true, false, false, 'door-open'),  // R Ctrl+D
      scHotkey('Close All', 68, true, false, false, 'door-close'),  // L Ctrl+D
      scHotkey('Lock', 68, false, true, false, 'lock'),  // L Alt+D
    ],
    [
      scHotkey('Unlock', 68, false, true, false, 'unlock'),  // R Alt+D
      null,
      null,
      null,
      null
    ]
  ]
});

// Flight Main Profile
const FLIGHT_PROFILE = profile({
  name: '🚀 Flight',
  icon: 'rocket',
  actions: [
    [
      back(),
      action({ title: 'Systems', icon: 'gear', profileName: '🔧 Systems' }),
      action({ title: 'Movement', icon: 'arrows', profileName: '🚀 Movement' }),
      action({ title: 'Combat', icon: 'crosshair', profileName: '⚔️ Combat' }),
      action({ title: 'Doors', icon: 'door', profileName: '🚪 Doors' })
    ],
    [
      scHotkey('Eject', 89, false, true, false, 'eject'),  // Alt+Y
      scHotkey('Lights', 78, false, false, false, 'light'),  // N
      scHotkey('Hail', 57, false, false, false, 'radio'),  // 9
      scHotkey('Scan Mode', 220, false, false, false, 'scan'),  // \
      scHotkey('Mining Mode', 77, false, false, false, 'mining'),  // M
    ],
    [
      null,
      scHotkey('Salvage Mode', 77, false, false, false, 'salvage'),  // M
      null,
      null,
      null
    ]
  ]
});

// Targeting Profile
const TARGETING_PROFILE = profile({
  name: '🎯 Target',
  icon: 'target',
  actions: [
    [
      back(),
      scHotkey('Lock', 84, false, false, false, 'lock-on'),  // T
      scHotkey('Unlock', 48, false, false, false, 'unlock'),  // 0
      scHotkey('Pin 1', 49, false, true, false, 'pin-1'),  // Alt+1
      scHotkey('Pin 2', 50, false, true, false, 'pin-2'),  // Alt+2
    ],
    [
      scHotkey('Pin 3', 51, false, true, false, 'pin-3'),  // Alt+3
      scHotkey('Hostiles', 53, false, false, false, 'hostile'),  // 5
      scHotkey('Friendlies', 54, false, false, false, 'friendly'),  // 6
      scHotkey('All', 55, false, false, false, 'all'),  // 7
      scHotkey('Attackers', 52, false, false, false, 'attacker'),  // 4
    ],
    [
      null,
      scHotkey('Sub Target', 56, false, false, false, 'sub-target'),  // 8
      null,
      null,
      null
    ]
  ]
});

// Mining Profile
const MINING_PROFILE = profile({
  name: '⛏️ Mining',
  icon: 'pickaxe',
  actions: [
    [
      back(),
      scHotkey('Toggle Mode', 77, false, false, false, 'mining'),  // M
      scHotkey('Laser Power+', 38, false, false, false, 'power-up'),  // Up (placeholder)
      scHotkey('Laser Power-', 40, false, false, false, 'power-down'),  // Down (placeholder)
      scHotkey('Consumable 1', 37, false, false, false, 'consumable-1'),  // Left
    ],
    [
      scHotkey('Consumable 2', 40, false, false, false, 'consumable-2'),  // Down
      scHotkey('Consumable 3', 39, false, false, false, 'consumable-3'),  // Right
      scHotkey('Fracture', 38, false, false, false, 'fracture'),  // Up DT
      scHotkey('Extract', 40, false, false, false, 'extract'),  // Down DT
      scHotkey('Jettison', 74, false, false, false, 'jettison'),  // J DT
    ]
  ]
});

// Emotes Profile
const EMOTES_PROFILE = profile({
  name: '😊 Emotes',
  icon: 'smile',
  actions: [
    [
      back(),
      scHotkey('Wave', 48, false, false, false, 'wave'),  // Np 0
      scHotkey('Yes', 49, false, false, false, 'thumbs-up'),  // Np 1
      scHotkey('No', 51, false, false, false, 'thumbs-down'),  // Np 3
      scHotkey('Salute', 96, false, true, false, 'salute'),  // Alt+Np 0
    ],
    [
      scHotkey('Dance', 97, false, true, false, 'dance'),  // Alt+Np 1
      scHotkey('Clap', 103, false, true, false, 'clap'),  // Alt+Np 7
      scHotkey('Point', 101, false, true, false, 'point'),  // Alt+Np 5
      scHotkey('Come', 102, false, true, false, 'beckon'),  // Alt+Np 6
      scHotkey('Wait', 53, false, false, false, 'stop-hand'),  // Np 5
    ],
    [
      null,
      scHotkey('Laugh', 100, false, true, false, 'laugh'),  // Alt+Np 4
      nextPage({ title: 'More' }),
      null,
      null
    ]
  ]
});

// Communications Profile
const COMMS_PROFILE = profile({
  name: '📞 Comms',
  icon: 'headset',
  actions: [
    [
      back(),
      scHotkey('CommLink', 122, false, false, false, 'phone'),  // F11
      scHotkey('Chat', 123, false, false, false, 'chat'),  // F12
      scHotkey('Chat Focus', 13, false, false, false, 'keyboard'),  // Return
      scHotkey('Accept', 120, false, false, false, 'check'),  // F9
    ],
    [
      scHotkey('Reject', 121, false, false, false, 'x'),  // F10
      scHotkey('VOIP', 84, false, false, false, 'microphone'),  // T (placeholder)
      scHotkey('Channels', 190, false, false, false, 'channel'),  // Numpad .
      null,
      null
    ]
  ]
});

// Social Profile
const SOCIAL_PROFILE = profile({
  name: '💬 Social',
  icon: 'users',
  actions: [
    [
      back(),
      scHotkey('Forward', 56, false, false, false, 'arrow-up'),  // Np 8
      scHotkey('Stop', 50, false, false, false, 'stop'),  // Np 2
    ],
    [
      scHotkey('Left', 52, false, false, false, 'arrow-left'),  // Np 4
      scHotkey('Right', 54, false, false, false, 'arrow-right'),  // Np 6
      scHotkey('Agree', 55, false, false, false, 'nod'),  // Np 7
      scHotkey('Disagree', 57, false, false, false, 'shake'),  // Np 9
      null
    ]
  ]
});

// Ground Vehicle Profile
const GROUND_PROFILE = profile({
  name: '🚗 Ground',
  icon: 'car',
  actions: [
    [
      back(),
      scHotkey('Horn', 32, false, false, false, 'horn'),  // Spacebar
      scHotkey('Boost', 65, false, false, false, 'boost'),  // A
      scHotkey('Brake', 88, false, false, false, 'brake'),  // X
      scHotkey('Doors', 68, false, false, false, 'door')  // D
    ],
    [
      scHotkey('Lock', 68, false, true, false, 'lock'),  // Alt+D
      scHotkey('Unlock', 68, false, true, false, 'unlock'),  // Alt+D
      null,
      null,
      null
    ]
  ]
});

// Salvage Profile
const SALVAGE_PROFILE = profile({
  name: '🔧 Salvage',
  icon: 'wrench',
  actions: [
    [
      back(),
      scHotkey('Toggle Mode', 77, false, false, false, 'salvage'),  // M
      scHotkey('Gimbal', 71, false, false, false, 'gimbal'),  // G
      scHotkey('Reset', 82, false, false, false, 'reset'),  // R
      scHotkey('Beam Axis', 88, false, false, false, 'axis'),  // X
    ],
    [
      scHotkey('Modes', 191, false, false, false, 'cycle'),  // /
      scHotkey('Left Head', 37, false, false, false, 'left'),  // Left
      scHotkey('Right Head', 39, false, false, false, 'right'),  // Right
      scHotkey('Fracture', 38, false, false, false, 'fracture'),  // Up
      scHotkey('Disintegrate', 40, false, false, false, 'disintegrate'),  // Down
    ]
  ]
});

// Turret Profile
const TURRET_PROFILE = profile({
  name: '🎮 Turret',
  icon: 'turret',
  actions: [
    [
      back(),
      scHotkey('Exit', 89, false, false, false, 'exit'),  // Y
      scHotkey('Next', 68, false, false, false, 'next'),  // D
      scHotkey('Previous', 65, false, false, false, 'previous'),  // A
      scHotkey('Recenter', 67, false, false, false, 'center'),  // C
    ],
    [
      scHotkey('Gyro', 71, false, false, false, 'gyro'),  // G DT
      scHotkey('ESP', 88, false, false, false, 'esp'),  // X DT
      scHotkey('Speed Limit', 83, false, false, false, 'speed'),  // S
      scHotkey('Fire Mode', 220, false, false, false, 'fire-mode'),  // \ DT
      scHotkey('Position', 77, false, false, false, 'position'),  // M
    ],
    [
      scHotkey('Mouse Mode', 82, false, false, false, 'mouse'),  // R
      null,
      null,
      null,
      null
    ]
  ]
});

// MFD Profile
const MFD_PROFILE = profile({
  name: '📊 MFD',
  icon: 'display',
  actions: [
    [
      back(),
      scHotkey('Next Page', 69, false, true, false, 'page-next'),  // Alt+E
      scHotkey('Prev Page', 81, false, true, false, 'page-prev'),  // Alt+Q
      scHotkey('MFD 1', 49, false, false, false, 'display-1'),  // 1 (placeholder)
      scHotkey('MFD 2', 50, false, false, false, 'display-2'),  // 2 (placeholder)
    ],
    [
      scHotkey('MFD 3', 51, false, false, false, 'display-3'),  // 3 (placeholder)
      scHotkey('Self Status', 49, false, false, false, 'status'),  // 1 (placeholder)
      scHotkey('Target', 50, false, false, false, 'target-info'),  // 2 (placeholder)
      scHotkey('Scanning', 51, false, false, false, 'scan'),  // 3 (placeholder)
      scHotkey('Config', 52, false, false, false, 'config'),  // 4 (placeholder)
    ],
    [
      scHotkey('Comms', 53, false, false, false, 'radio'),  // 5 (placeholder)
      null,
      null,
      null,
      null
    ]
  ]
});

// Camera Profile
const CAMERA_PROFILE = profile({
  name: '📷 Camera',
  icon: 'camera',
  actions: [
    [
      back(),
      scHotkey('Free Look', 90, false, false, false, 'eye'),  // Z
      scHotkey('Cycle View', 115, false, false, false, 'cycle'),  // F4
      scHotkey('3rd Person', 115, false, false, false, '3rd-person'),  // F4
      scHotkey('Save 1', 49, false, false, false, 'save-1'),  // Numpad 1
    ],
    [
      scHotkey('Load 1', 49, false, false, false, 'load-1'),  // Numpad 1
      scHotkey('Save 2', 50, false, false, false, 'save-2'),  // Numpad 2
      scHotkey('Load 2', 50, false, false, false, 'load-2'),  // Numpad 2
      scHotkey('DOF+', 36, false, false, false, 'dof-plus'),  // Home
      scHotkey('DOF-', 35, false, false, false, 'dof-minus'),  // End
    ],
    [
      scHotkey('Reset', 48, false, false, false, 'reset'),  // Np 0
      null,
      null,
      null,
      null
    ]
  ]
});

// Main Menu Profile
const MAIN_MENU_PROFILE = profile({
  name: 'Star Citizen Pro',
  icon: 'star-citizen',
  actions: [
    [
      folder(QUICK_KEY_PROFILE),
      folder(FLIGHT_MOVEMENT_PROFILE),
      folder(TARGETING_PROFILE),
      folder(SOCIAL_PROFILE),
      folder(MINING_PROFILE),
    ],
    [
      folder(GROUND_PROFILE),
      folder(SALVAGE_PROFILE),
      folder(TURRET_PROFILE),
      folder(MFD_PROFILE),
      folder(CAMERA_PROFILE)
    ]
  ]
});

console.log('Generated optimized Star Citizen profile with separate profiles structure');

module.exports = () => ({
  mainProfile: [MAIN_MENU_PROFILE],
  additionalProfiles: [
    QUICK_KEY_PROFILE,
    FLIGHT_MOVEMENT_PROFILE,
    TARGETING_PROFILE,
    SOCIAL_PROFILE,
    MINING_PROFILE,
    GROUND_PROFILE,
    SALVAGE_PROFILE,
    TURRET_PROFILE,
    MFD_PROFILE,
    CAMERA_PROFILE
  ]
});