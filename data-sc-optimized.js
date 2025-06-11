/**
 * @fileoverview Star Citizen 4.1.1 Complete Stream Deck Profile
 * COMPLETE VERSION - All commands from CSV files organized optimally
 * Total commands: 314
 * Organized by logical groupings for Stream Deck 3x5 layout
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

// ⚡ Quick Profile (14 commands)
const QUICK_PROFILE = profile({
  name: '⚡ Quick',
  icon: 'lightning',
  actions: [
    [
      back(), scHotkey('Emergency...', 89, false, true, false, 'exit'), scHotkey('MobiGlass...', 112, false, false, false, 'display'), scHotkey('Map', 113, false, false, false, 'map'), scHotkey('Wipe Helm...', 8, false, false, false, 'helmet')
      scHotkey('MobiGlass...', 112, false, false, false, 'display'), scHotkey('Map', 113, false, false, false, 'map'), scHotkey('Wipe Helm...', 8, false, false, false, 'helmet'), scHotkey('Interacti...', 70, false, false, false, 'hand'), scHotkey('Commodity...', 73, false, false, false, 'backpack')
      scHotkey('Commodity...', 73, false, false, false, 'backpack'), scHotkey('Exit Seat', 89, false, false, false, 'exit'), scHotkey('Chat Wind...', 123, false, false, false, 'chat'), scHotkey('', 9, false, false, false, 'chat'), scHotkey('Chat Wind...', 13, false, false, false, 'chat')
    ],
  ]
});

// 🔧 Systems Profile (34 commands)
const FLIGHT_SYS_PROFILE = profile({
  name: '🔧 Systems',
  icon: 'gear',
  actions: [
    [
      back(), scHotkey('Engines -...', 73, false, true, false, 'rocket'), scHotkey('Engines +...', 73, false, true, false, 'rocket'), scHotkey('Engines S...', 73, false, true, false, 'rocket'), scHotkey('Engines S...', 73, false, true, false, 'rocket')
      scHotkey('PIP Combi...', 191, false, false, false, 'rocket'), scHotkey('PIP Combi...', 191, false, false, false, 'rocket'), scHotkey('Self Dest...', 8, false, false, false, 'rocket'), scHotkey('Set Power...', 85, true, false, false, 'power-off'), scHotkey('Set Power On', 85, true, false, false, 'power-on')
      scHotkey('Set Shiel...', 79, true, false, false, 'power-off'), scHotkey('Set Shiel...', 79, true, false, false, 'power-on'), scHotkey('Set Thrus...', 73, true, false, false, 'power-off'), scHotkey('Set Thrus...', 73, true, false, false, 'power-on'), scHotkey('Set Weapo...', 80, true, false, false, 'power-off')
    ],
    [
      back(), scHotkey('Set Weapo...', 80, true, false, false, 'power-on'), scHotkey('Shield Ra...', 53, false, false, false, 'rocket'), scHotkey('Shield Ra...', 53, false, false, false, 'rocket'), scHotkey('Shield Ra...', 56, false, false, false, 'rocket')
      scHotkey('Shield Ra...', 52, false, false, false, 'rocket'), scHotkey('Shield Ra...', 54, false, false, false, 'rocket'), scHotkey('Shield Ra...', 56, false, false, false, 'rocket'), scHotkey('Shield Re...', 48, false, false, false, 'rocket'), scHotkey('Shields -...', 79, false, true, false, 'rocket')
      scHotkey('Shields +...', 79, false, true, false, 'rocket'), scHotkey('Shields S...', 79, false, true, false, 'rocket'), scHotkey('Shields S...', 79, false, true, false, 'rocket'), scHotkey('Tgl Power...', 50, false, false, false, 'rocket'), scHotkey('Tgl Power...', 49, false, false, false, 'rocket')
    ],
    [
      back(), scHotkey('Weapon Pr...', 87, false, true, false, 'rocket'), scHotkey('Weapon Pr...', 87, false, true, false, 'rocket'), scHotkey('Weapons -...', 80, false, true, false, 'rocket'), scHotkey('Weapons +...', 80, false, true, false, 'rocket')
      scHotkey('Weapons S...', 80, false, true, false, 'rocket'), scHotkey('Weapons S...', 80, false, true, false, 'rocket'), null, null, null
      null, null, null, null, null
    ],
  ]
});

// 🚀 Movement Profile (77 commands)
const FLIGHT_MOVE_PROFILE = profile({
  name: '🚀 Movement',
  icon: 'arrows',
  actions: [
    [
      back(), scHotkey('v ads toggle', 56, false, false, false, 'rocket'), scHotkey('v ads tog...', 56, false, false, false, 'rocket'), scHotkey('Accelerat...', 65, false, true, false, 'rocket'), scHotkey('Accelerat...', 65, false, true, false, 'rocket')
      scHotkey('Autoland', 76, false, false, false, 'rocket'), scHotkey('Bombs - H...', 40, false, false, false, 'rocket'), scHotkey('Bombs + H...', 38, false, false, false, 'rocket'), scHotkey('Bombs Res...', 82, false, false, false, 'rocket'), scHotkey('Bombs Tgl...', 84, false, false, false, 'point')
      scHotkey('Boost', 65, false, false, false, 'boost'), scHotkey('Cycle Config', 75, false, false, false, 'rocket'), scHotkey('Cycle Mas...', 66, false, false, false, 'rocket'), scHotkey('Cycle Mas...', 69, false, false, false, 'rocket'), scHotkey('Decouple ...', 67, false, false, false, 'rocket')
    ],
    [
      back(), scHotkey('- Cooler ...', 82, false, true, false, 'rocket'), scHotkey('- Throttle', 120, false, false, false, 'rocket'), scHotkey('- Throttl...', 120, false, false, false, 'rocket'), scHotkey('Dynamic Z...', 90, false, false, false, 'rocket')
      scHotkey('E.S.P Tgl...', 88, false, false, false, 'rocket'), scHotkey('Eject', 89, false, true, false, 'eject'), scHotkey('Emergency...', 89, false, true, false, 'exit'), scHotkey('Engage Qu...', 81, false, true, false, 'quantum'), scHotkey('Expand Co...', 75, true, false, false, 'rocket')
      scHotkey('Freelook ...', 90, false, false, false, 'rocket'), scHotkey('G-force s...', 71, true, false, false, 'rocket'), scHotkey('G-force s...', 71, true, false, false, 'rocket'), scHotkey('G-force s...', 71, false, false, false, 'rocket'), scHotkey('Gravity C...', 71, true, false, false, 'rocket')
    ],
    [
      back(), scHotkey('Gravity C...', 71, true, false, false, 'rocket'), scHotkey('Headlight...', 78, false, false, false, 'light'), scHotkey('+ Cooler ...', 82, false, true, false, 'rocket'), scHotkey('+ Throttle', 121, false, false, false, 'rocket')
      scHotkey('+ Throttl...', 121, false, false, false, 'rocket'), scHotkey('Invoke Do...', 68, false, false, false, 'rocket'), scHotkey('Jump Driv...', 74, false, false, false, 'rocket'), scHotkey('Landing D...', 76, true, false, false, 'landing'), scHotkey('Landing R...', 76, true, false, false, 'landing')
      scHotkey('Landing Tgl', 76, false, false, false, 'landing'), scHotkey('Look Behind', 188, false, false, false, 'rocket'), scHotkey('Map', 113, false, false, false, 'map'), scHotkey('MobiGlass...', 112, false, false, false, 'display'), scHotkey('PIP Fadin...', 188, false, false, false, 'rocket')
    ],
    [
      back(), scHotkey('PIP Fadin...', 190, false, false, false, 'rocket'), scHotkey('Request C...', 76, false, true, false, 'rocket'), scHotkey('Request L...', 57, false, false, false, 'landing'), scHotkey('Retract C...', 75, true, false, false, 'rocket')
      scHotkey('Roll Left', 81, false, false, false, 'rocket'), scHotkey('Roll Right', 69, false, false, false, 'rocket'), scHotkey('Scanning ...', 219, false, false, false, 'rocket'), scHotkey('Scanning ...', 221, false, false, false, 'rocket'), scHotkey('Scoreboard', 112, false, false, false, 'rocket')
      scHotkey('Set Fligh...', 86, false, true, false, 'rocket'), scHotkey('Set Lag PIPs', 88, false, true, false, 'rocket'), scHotkey('Set Lead ...', 88, false, true, false, 'rocket'), scHotkey('Set Maste...', 77, true, false, false, 'rocket'), scHotkey('Set Maste...', 77, true, false, false, 'rocket')
    ],
    [
      back(), scHotkey('Set Quant...', 86, false, true, false, 'quantum'), scHotkey('Spacebrake', 88, false, false, false, 'brake'), scHotkey('Speed Lim...', 83, false, false, false, 'rocket'), scHotkey('Strafe Do...', 83, false, true, false, 'rocket')
      scHotkey('Strafe Le...', 65, false, false, false, 'rocket'), scHotkey('Strafe Ri...', 68, false, false, false, 'rocket'), scHotkey('Strafe Up...', 83, false, true, false, 'rocket'), scHotkey('Throttle ...', 67, false, false, false, 'rocket'), scHotkey('Throttle -', 83, true, false, false, 'rocket')
      scHotkey('Throttle +', 83, true, false, false, 'rocket'), scHotkey('Throttle ...', 88, false, false, false, 'rocket'), scHotkey('Throttle ...', 88, false, false, false, 'rocket'), scHotkey('Throttle ...', 67, true, false, false, 'rocket'), scHotkey('Throttle ...', 67, true, false, false, 'rocket')
    ],
    [
      back(), scHotkey('Tgl Docki...', 68, false, false, false, 'rocket'), scHotkey('Tgl Fligh...', 81, false, true, false, 'rocket'), scHotkey('Tgl Minin...', 77, false, false, false, 'mining'), scHotkey('Tgl Salva...', 77, false, false, false, 'salvage')
      scHotkey('Tgl Scann...', 220, false, false, false, 'rocket'), scHotkey('Toggle VTOL', 86, false, false, false, 'rocket'), scHotkey('Wipe Helm...', 8, false, false, false, 'helmet'), null, null
      null, null, null, null, null
    ],
  ]
});

// ⚔️ Combat Profile (17 commands)
const FLIGHT_COMBAT_PROFILE = profile({
  name: '⚔️ Combat',
  icon: 'crosshair',
  actions: [
    [
      back(), scHotkey('Automatic...', 86, false, true, false, 'rocket'), scHotkey('Automatic...', 86, false, true, false, 'rocket'), scHotkey('Automatic...', 81, false, true, false, 'rocket'), scHotkey('Cycle Fir...', 220, false, false, false, 'rocket')
      scHotkey('Cycle Nex...', 39, false, false, false, 'rocket'), scHotkey('Cycle Pre...', 37, false, false, false, 'rocket'), scHotkey('Decoy Lau...', 186, false, false, false, 'decoy'), scHotkey('- Number ...', 40, false, false, false, 'missile-down'), scHotkey('Hail Target', 57, false, false, false, 'rocket')
      scHotkey('+ Number ...', 38, false, false, false, 'missile-up'), scHotkey('Manual Gi...', 71, false, true, false, 'gimbal'), scHotkey('Precision...', 56, false, false, false, 'rocket'), scHotkey('Precision...', 56, false, false, false, 'rocket'), scHotkey('Reset Num...', 82, false, false, false, 'rocket')
    ],
    [
      back(), scHotkey('Set Fixed...', 71, false, true, false, 'gimbal'), scHotkey('Set Manua...', 71, false, true, false, 'gimbal'), scHotkey('Tgl Missi...', 77, false, false, false, 'rocket'), null
      null, null, null, null, null
      null, null, null, null, null
    ],
  ]
});

// 🚪 Doors Profile (11 commands)
const FLIGHT_DOORS_PROFILE = profile({
  name: '🚪 Doors',
  icon: 'door',
  actions: [
    [
      back(), scHotkey('Close All...', 68, true, false, false, 'door-close'), scHotkey('Cycle Gim...', 71, false, false, false, 'lock'), scHotkey('Lock All ...', 68, false, true, false, 'door'), scHotkey('Lock   Un...', 68, false, true, false, 'door')
      scHotkey('Manual Gi...', 71, false, true, false, 'lock'), scHotkey('Open All ...', 68, true, false, false, 'door-open'), scHotkey('Open Clos...', 68, false, false, false, 'door-open'), scHotkey('Port Lock...', 75, false, true, false, 'lock'), scHotkey('Port Lock...', 75, false, true, false, 'lock')
      scHotkey('Port Unlo...', 75, false, true, false, 'lock'), scHotkey('Unlock Al...', 68, false, true, false, 'door'), null, null, null
    ],
  ]
});

// 🚗 Ground Profile (22 commands)
const GROUND_PROFILE = profile({
  name: '🚗 Ground',
  icon: 'car',
  actions: [
    [
      back(), scHotkey('CI MGV Tg...', 67, false, false, false, 'car'), scHotkey('Boost', 65, false, false, false, 'boost'), scHotkey('Brake', 88, false, false, false, 'brake'), scHotkey('Close All...', 68, true, false, false, 'door-close')
      scHotkey('Cycle Cam...', 115, false, false, false, 'car'), scHotkey('Drive Back', 83, true, false, false, 'car'), scHotkey('Drive Fwd', 83, true, false, false, 'car'), scHotkey('Free Look...', 90, false, false, false, 'car'), scHotkey('Horn', 32, false, false, false, 'horn')
      scHotkey('Lock All ...', 68, false, true, false, 'door'), scHotkey('Lock Unlo...', 68, false, true, false, 'door'), scHotkey('Map', 113, false, false, false, 'map'), scHotkey('MobiGlass...', 112, false, false, false, 'display'), scHotkey('Open All ...', 68, true, false, false, 'door-open')
    ],
    [
      back(), scHotkey('Open Clos...', 68, false, false, false, 'door-open'), scHotkey('Port Lock...', 75, false, true, false, 'lock'), scHotkey('Port Lock...', 75, false, true, false, 'lock'), scHotkey('Port Unlo...', 75, false, true, false, 'lock')
      scHotkey('Turn Left', 65, false, false, false, 'car'), scHotkey('Turn Right', 68, false, false, false, 'car'), scHotkey('Unlock Al...', 68, false, true, false, 'door'), scHotkey('Wipe Helm...', 8, false, false, false, 'helmet'), null
      null, null, null, null, null
    ],
  ]
});

// ⛏️ Mining Profile (4 commands)
const MINING_PROFILE = profile({
  name: '⛏️ Mining',
  icon: 'pickaxe',
  actions: [
    [
      back(), scHotkey('Activate ...', 37, false, false, false, 'mining'), scHotkey('Activate ...', 40, false, false, false, 'mining'), scHotkey('Activate ...', 39, false, false, false, 'mining'), scHotkey('Switch Mi...', 38, false, false, false, 'mining')
      null, null, null, null, null
      null, null, null, null, null
    ],
  ]
});

// 🔧 Salvage Profile (7 commands)
const SALVAGE_PROFILE = profile({
  name: '🔧 Salvage',
  icon: 'wrench',
  actions: [
    [
      back(), scHotkey('Cycle Foc...', 191, false, false, false, 'salvage'), scHotkey('Cycle Str...', 191, false, false, false, 'salvage'), scHotkey('Focus Lef...', 37, false, false, false, 'salvage'), scHotkey('Focus Rig...', 39, false, false, false, 'salvage')
      scHotkey('Salvage B...', 88, false, false, false, 'salvage'), scHotkey('Salvage M...', 82, false, false, false, 'gimbal'), scHotkey('Salvage M...', 71, false, false, false, 'gimbal'), null, null
      null, null, null, null, null
    ],
  ]
});

// 🏭 Industry Profile (7 commands)
const INDUSTRY_OTHER_PROFILE = profile({
  name: '🏭 Industry',
  icon: 'gear',
  actions: [
    [
      back(), scHotkey('Focus Dis...', 40, false, false, false, 'wrench'), scHotkey('Focus Fra...', 38, false, false, false, 'wrench'), scHotkey('Jettison ...', 74, false, false, false, 'wrench'), scHotkey('Tgl Fire ...', 40, false, false, false, 'wrench')
      scHotkey('Tgl Fire ...', 38, false, false, false, 'wrench'), scHotkey('Tgl Fire ...', 37, false, false, false, 'wrench'), scHotkey('Tgl Fire ...', 39, false, false, false, 'wrench'), null, null
      null, null, null, null, null
    ],
  ]
});

// 🎯 Target Profile (32 commands)
const TARGETING_PROFILE = profile({
  name: '🎯 Target',
  icon: 'target',
  actions: [
    [
      back(), scHotkey('Auto Targ...', 84, false, true, false, 'target'), scHotkey('Auto Targ...', 84, false, false, false, 'target'), scHotkey('Auto Targ...', 84, false, true, false, 'target'), scHotkey('Cycle Loc...', 55, false, true, false, 'lock')
      scHotkey('Cycle Loc...', 55, false, true, false, 'lock'), scHotkey('Cycle Loc...', 55, false, false, false, 'lock'), scHotkey('Cycle Loc...', 52, false, true, false, 'lock'), scHotkey('Cycle Loc...', 52, false, true, false, 'lock'), scHotkey('Cycle Loc...', 52, false, false, false, 'lock')
      scHotkey('Cycle Loc...', 54, false, true, false, 'lock'), scHotkey('Cycle Loc...', 54, false, true, false, 'lock'), scHotkey('Cycle Loc...', 54, false, false, false, 'lock'), scHotkey('Cycle Loc...', 53, false, true, false, 'lock'), scHotkey('Cycle Loc...', 53, false, true, false, 'lock')
    ],
    [
      back(), scHotkey('Cycle Loc...', 53, false, false, false, 'lock'), scHotkey('Cycle Loc...', 84, false, false, false, 'lock'), scHotkey('Cycle Loc...', 84, false, false, false, 'lock'), scHotkey('Cycle Loc...', 56, false, true, false, 'lock')
      scHotkey('Cycle Loc...', 56, false, true, false, 'lock'), scHotkey('Cycle Loc...', 56, false, false, false, 'lock'), scHotkey('En   Dis ...', 76, false, true, false, 'target'), scHotkey('Pin Index...', 49, false, false, false, 'lock'), scHotkey('Pin Index...', 49, false, true, false, 'pin-1')
      scHotkey('Pin Index...', 49, false, false, false, 'pin-1'), scHotkey('Pin Index...', 50, false, false, false, 'lock'), scHotkey('Pin Index...', 50, false, true, false, 'pin-2'), scHotkey('Pin Index...', 50, false, false, false, 'pin-2'), scHotkey('Pin Index...', 51, false, false, false, 'lock')
    ],
    [
      back(), scHotkey('Pin Index...', 51, false, true, false, 'pin-3'), scHotkey('Pin Index...', 51, false, false, false, 'pin-3'), scHotkey('Remove Al...', 48, false, false, false, 'target'), scHotkey('Unlock Lo...', 48, false, false, false, 'lock')
      null, null, null, null, null
      null, null, null, null, null
    ],
  ]
});

// 😊 Emotes Profile (23 commands)
const EMOTES_PROFILE = profile({
  name: '😊 Emotes',
  icon: 'smile',
  actions: [
    [
      back(), scHotkey('Accept', 120, false, false, false, 'thumbs-down'), scHotkey('Decline', 121, false, false, false, 'thumbs-down'), scHotkey('Agree', 55, false, false, false, 'nod'), scHotkey('Angry', 97, false, true, false, 'users')
      scHotkey('Bow', 100, false, true, false, 'users'), scHotkey('Cheer', 104, false, true, false, 'users'), scHotkey('Clap', 103, false, true, false, 'clap'), scHotkey('Cry', 101, false, true, false, 'users'), scHotkey('Dance', 97, false, true, false, 'dance')
      scHotkey('Disagree', 57, false, false, false, 'nod'), scHotkey('Flex', 97, false, true, false, 'users'), scHotkey('Forward', 56, false, false, false, 'users'), scHotkey('Gloat', 103, false, true, false, 'users'), scHotkey('Ignore In...', 121, false, false, false, 'thumbs-down')
    ],
    [
      back(), scHotkey('Laugh', 100, false, true, false, 'laugh'), scHotkey('Left', 52, false, false, false, 'users'), scHotkey('No', 51, false, false, false, 'thumbs-down'), scHotkey('Point', 101, false, true, false, 'point')
      scHotkey('Right', 54, false, false, false, 'users'), scHotkey('Salute', 96, false, true, false, 'salute'), scHotkey('Stop', 50, false, false, false, 'users'), scHotkey('Wave', 48, false, false, false, 'wave'), scHotkey('Yes', 49, false, false, false, 'thumbs-up')
      null, null, null, null, null
    ],
  ]
});

// 📞 Comms Profile (4 commands)
const COMMS_PROFILE = profile({
  name: '📞 Comms',
  icon: 'headset',
  actions: [
    [
      back(), scHotkey('', 9, false, false, false, 'chat'), scHotkey('Chat Wind...', 13, false, false, false, 'chat'), scHotkey('Chat Wind...', 123, false, false, false, 'chat'), scHotkey('CommLink ...', 122, false, false, false, 'phone')
      null, null, null, null, null
      null, null, null, null, null
    ],
  ]
});

// 💬 Social Profile (15 commands)
const SOCIAL_OTHER_PROFILE = profile({
  name: '💬 Social',
  icon: 'users',
  actions: [
    [
      back(), scHotkey('Accept In...', 120, false, false, false, 'users'), scHotkey('At Ease', 99, false, true, false, 'users'), scHotkey('Attention', 98, false, true, false, 'users'), scHotkey('Chicken', 99, false, true, false, 'users')
      scHotkey('Come', 102, false, true, false, 'users'), scHotkey('Confirm L...', 105, false, true, false, 'users'), scHotkey('Exit Seat', 89, false, false, false, 'exit'), scHotkey('Failure', 105, false, true, false, 'users'), scHotkey('Greet', 96, false, true, false, 'users')
      scHotkey('Re-spawn', 70, false, false, false, 'users'), scHotkey('Reject In...', 121, false, false, false, 'eject'), scHotkey('Smell', 104, false, true, false, 'users'), scHotkey('Taunt', 102, false, true, false, 'users'), scHotkey('Threaten', 98, false, true, false, 'users')
    ],
    [
      back(), scHotkey('Wait', 53, false, false, false, 'users'), null, null, null
      null, null, null, null, null
      null, null, null, null, null
    ],
  ]
});

// 📊 MFD Profile (2 commands)
const MFD_PROFILE = profile({
  name: '📊 MFD',
  icon: 'display',
  actions: [
    [
      back(), scHotkey('Cycle Pag...', 81, false, true, false, 'display'), scHotkey('Cycle Pag...', 69, false, true, false, 'display'), null, null
      null, null, null, null, null
      null, null, null, null, null
    ],
  ]
});

// 📷 Camera Profile (28 commands)
const CAMERA_PROFILE = profile({
  name: '📷 Camera',
  icon: 'camera',
  actions: [
    [
      back(), scHotkey('Advanced ...', 90, false, false, false, 'camera'), scHotkey('Decrease DoF', 35, false, false, false, 'camera'), scHotkey('Decrease FoV', 189, false, false, false, 'camera'), scHotkey('Increase DoF', 36, false, false, false, 'camera')
      scHotkey('Load View 1', 49, false, false, false, 'camera'), scHotkey('Load View 2', 50, false, false, false, 'camera'), scHotkey('Load View 3', 51, false, false, false, 'camera'), scHotkey('Load View 4', 52, false, false, false, 'camera'), scHotkey('Load View 5', 53, false, false, false, 'camera')
      scHotkey('Load View 6', 54, false, false, false, 'camera'), scHotkey('Load View 7', 55, false, false, false, 'camera'), scHotkey('Load View 8', 56, false, false, false, 'camera'), scHotkey('Load View 9', 57, false, false, false, 'camera'), scHotkey('Reset Cur...', 48, false, false, false, 'camera')
    ],
    [
      back(), scHotkey('Save View 1', 49, false, false, false, 'camera'), scHotkey('Save View 2', 50, false, false, false, 'camera'), scHotkey('Save View 3', 51, false, false, false, 'camera'), scHotkey('Save View 4', 52, false, false, false, 'camera')
      scHotkey('Save View 5', 53, false, false, false, 'camera'), scHotkey('Save View 6', 54, false, false, false, 'camera'), scHotkey('Save View 7', 55, false, false, false, 'camera'), scHotkey('Save View 8', 56, false, false, false, 'camera'), scHotkey('Save View 9', 57, false, false, false, 'camera')
      scHotkey('HUD Toggle', 66, false, false, false, 'camera'), scHotkey('Lock Target', 49, false, false, false, 'lock'), scHotkey('Mode Next', 115, false, false, false, 'camera'), scHotkey('Z Offset ...', 40, false, false, false, 'camera'), scHotkey('Z Offset ...', 38, false, false, false, 'camera')
    ],
  ]
});

// 👤 Personal Profile (20 commands)
const PERSONAL_PROFILE = profile({
  name: '👤 Personal',
  icon: 'person',
  actions: [
    [
      back(), scHotkey('ToggleView', 9, false, false, false, 'hand'), scHotkey('Consumabl...', 86, false, false, false, 'person'), scHotkey('Cycle Thr...', 190, false, false, false, 'person'), scHotkey('Exit', 48, false, false, false, 'exit')
      scHotkey('Recalibrate', 106, false, false, false, 'person'), scHotkey('Selfie Cam', 114, false, false, false, 'person'), scHotkey('Interacti...', 70, false, false, false, 'hand'), scHotkey('Looting T...', 81, false, false, false, 'person'), scHotkey('Down', 83, false, false, false, 'person')
      scHotkey('Left', 65, false, false, false, 'person'), scHotkey('Right', 68, false, false, false, 'person'), scHotkey('Up', 87, false, false, false, 'person'), scHotkey('Mining Mo...', 77, false, true, false, 'mining'), scHotkey('Commodity...', 73, false, false, false, 'backpack')
    ],
    [
      back(), scHotkey('Commodity...', 73, false, false, false, 'backpack'), scHotkey('Inner Tho...', 70, false, true, false, 'person'), scHotkey('Throwable...', 71, false, false, false, 'person'), scHotkey('Weapon Se...', 50, false, false, false, 'person')
      scHotkey('Weapon Se...', 49, false, false, false, 'person'), scHotkey('Weapon Se...', 49, false, false, false, 'person'), null, null, null
      null, null, null, null, null
    ],
  ]
});

// 🎮 Turret Profile (11 commands)
const TURRETS_PROFILE = profile({
  name: '🎮 Turret',
  icon: 'turret',
  actions: [
    [
      back(), scHotkey('turret mo...', 82, false, false, false, 'turret'), scHotkey('Cycle Fir...', 220, false, false, false, 'turret'), scHotkey('Exit Remo...', 89, false, false, false, 'exit'), scHotkey('Next Remo...', 68, false, false, false, 'turret')
      scHotkey('Prev Remo...', 65, false, false, false, 'turret'), scHotkey('Recenter ...', 67, false, false, false, 'turret'), scHotkey('Tgl Turre...', 82, false, false, false, 'turret'), scHotkey('Turret Ch...', 77, false, false, false, 'turret'), scHotkey('Turret E....', 88, false, false, false, 'turret')
      scHotkey('Turret Gy...', 71, false, false, false, 'turret'), scHotkey('Turret Sp...', 83, false, false, false, 'turret'), null, null, null
    ],
  ]
});

// Main Menu Profile
const MAIN_MENU_PROFILE = profile({
  name: 'Star Citizen Pro',
  icon: 'star-citizen',
  actions: [
    [folder(QUICK_PROFILE), folder(FLIGHT_SYS_PROFILE), folder(FLIGHT_MOVE_PROFILE), folder(FLIGHT_COMBAT_PROFILE), folder(FLIGHT_DOORS_PROFILE)],
    [folder(GROUND_PROFILE), folder(MINING_PROFILE), folder(SALVAGE_PROFILE), folder(INDUSTRY_OTHER_PROFILE), folder(TARGETING_PROFILE)],
    [folder(EMOTES_PROFILE), folder(COMMS_PROFILE), folder(SOCIAL_OTHER_PROFILE), folder(MFD_PROFILE), folder(CAMERA_PROFILE)],
  ]
});

console.log('Generated complete Star Citizen profile with all commands');

module.exports = () => ({
  mainProfile: [MAIN_MENU_PROFILE],
  additionalProfiles: [
    QUICK_PROFILE,
    FLIGHT_SYS_PROFILE,
    FLIGHT_MOVE_PROFILE,
    FLIGHT_COMBAT_PROFILE,
    FLIGHT_DOORS_PROFILE,
    GROUND_PROFILE,
    MINING_PROFILE,
    SALVAGE_PROFILE,
    INDUSTRY_OTHER_PROFILE,
    TARGETING_PROFILE,
    EMOTES_PROFILE,
    COMMS_PROFILE,
    SOCIAL_OTHER_PROFILE,
    MFD_PROFILE,
    CAMERA_PROFILE,
    PERSONAL_PROFILE,
    TURRETS_PROFILE,
  ]
});
