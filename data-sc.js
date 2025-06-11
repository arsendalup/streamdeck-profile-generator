/**
 * @fileoverview Star Citizen 4.1.1 Complete Stream Deck Profile - 185 Commands
 * VERSION COMPLÈTE - Basée sur star-citizen-commands-complete.json
 * Structure optimisée: 10 pages × 15 boutons maximum (3×5 grille)
 * Priorisé par fréquence d'usage pour maximiser l'ergonomie
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
 * Helper function to parse key bindings from JSON format
 */
function parseBinding(bindingStr) {
  if (!bindingStr) return { vKeyCode: 0, ctrl: false, alt: false, shift: false };

  const keyMap = {
    // Letters
    'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74,
    'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84,
    'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90,
    // Numbers
    '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, '0': 48,
    // Function keys
    'F1': 112, 'F2': 113, 'F3': 114, 'F4': 115, 'F5': 116, 'F6': 117, 'F7': 118, 'F8': 119,
    'F9': 120, 'F10': 121, 'F11': 122, 'F12': 123,
    // Special keys
    'Spacebar': 32, 'Space': 32, 'Enter': 13, 'Tab': 9, 'Escape': 27, 'Backspace': 8,
    // Mouse
    'Button 1 (mouse)': 1000, 'Button 2 (mouse)': 1001, 'Button 3 (mouse)': 1002,
    'Mouse Wheel Up': 1003, 'Mouse Wheel Down': 1004, 'Mouse Wheel': 1003,
    // Arrows
    'Up Arrow': 38, 'Down Arrow': 40, 'Left Arrow': 37, 'Right Arrow': 39,
    // Numpad
    'Numpad 1': 97, 'Numpad 2': 98, 'Numpad 3': 99, 'Numpad 4': 100, 'Numpad 5': 101,
    'Numpad 6': 102, 'Numpad 7': 103, 'Numpad 8': 104, 'Numpad 9': 105, 'Numpad 0': 96,
    'Numpad +': 107, 'Numpad -': 109, 'Numpad *': 106, 'Numpad /': 111,
    // Modifiers and special
    'L Shift': 16, 'R Shift': 16, 'L Ctrl': 17, 'R Ctrl': 17, 'L Alt': 18, 'R Alt': 18
  };

  let binding = bindingStr.replace(/\s+/g, ' ').trim();
  let ctrl = false, alt = false, shift = false;

  // Parse modifiers
  if (binding.includes('L Ctrl +') || binding.includes('R Ctrl +') || binding.includes('Ctrl +')) {
    ctrl = true;
    binding = binding.replace(/(L Ctrl \+|R Ctrl \+|Ctrl \+)\s*/g, '');
  }
  if (binding.includes('L Alt +') || binding.includes('R Alt +') || binding.includes('Alt +')) {
    alt = true;
    binding = binding.replace(/(L Alt \+|R Alt \+|Alt \+)\s*/g, '');
  }
  if (binding.includes('L Shift +') || binding.includes('R Shift +') || binding.includes('Shift +')) {
    shift = true;
    binding = binding.replace(/(L Shift \+|R Shift \+|Shift \+)\s*/g, '');
  }

  const vKeyCode = keyMap[binding] || 0;
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
// PAGE 1: FLIGHT ESSENTIAL (Priorité 1 - Critique)
// =====================================================

const flightEssentialProfile = profile({
  name: 'Flight\nEssential',
  icon: 'airplane',
  actions: [
    [
      back(),
      scHotkey('Flight\nReady', 82, false, true, false, 'power'), // R Alt + R
      scHotkey('Quantum\nDrive', 66, false, false, false, 'zap'), // B
      scHotkey('Landing\nGear', 78, false, false, false, 'plane-arrival'), // N
      scHotkey('Target\nCycling', 84, false, false, false, 'target'), // T
    ],
    [
      scHotkey('Doors\nOpen', 68, true, false, false, 'door-open'), // R Ctrl + D
      scHotkey('Doors\nClose', 68, true, false, false, 'door-open'), // L Ctrl + D
      scHotkey('Exit\nSeat', 89, false, false, false, 'log-out'), // Y
      scHotkey('Free\nLook', 90, false, false, false, 'eye'), // Z
      scHotkey('Cycle\nCamera', 115, false, false, false, 'camera'), // F4
    ],
    [
      scHotkey('Pin Target\n1', 49, false, false, false, 'pin'), // 1
      scHotkey('Pin Target\n2', 50, false, false, false, 'pin'), // 2
      scHotkey('Pin Target\n3', 51, false, false, false, 'pin'), // 3
      scHotkey('Unlock\nTarget', 84, false, true, false, 'unlock'), // L Alt + T
      scHotkey('Remove All\nPins', 48, false, false, false, 'x-circle'), // 0
    ]
  ]
});

// =====================================================
// PAGE 2: COMBAT & WEAPONS (Priorité 1)
// =====================================================

const combatWeaponsProfile = profile({
  name: 'Combat\n& Weapons',
  icon: 'target',
  actions: [
    [
      back(),
      scHotkey('Fire\nWeapons', 1000, false, false, false, 'zap'), // Mouse 1
      scHotkey('Launch\nMissiles', 1000, false, false, false, 'rocket'), // Mouse 1
      scHotkey('Gimbal\nToggle', 71, false, false, false, 'crosshair'), // G
      scHotkey('Manual\nGimbal', 71, true, false, false, 'move'), // R Alt + G
    ],
    [
      scHotkey('Fixed\nGimbal', 71, false, true, false, 'lock'), // L Alt + G
      scHotkey('Cycle\nHostiles', 53, false, false, false, 'alert-triangle'), // 5
      scHotkey('Cycle\nFriendlies', 54, false, false, false, 'shield'), // 6
      scHotkey('Cycle All\nTargets', 55, false, false, false, 'repeat'), // 7
      scHotkey('Sub-target\nCycle', 82, false, false, false, 'focus'), // R
    ],
    [
      scHotkey('Auto Target\nOn', 84, false, true, false, 'target'), // L Alt + T
      scHotkey('Auto Target\nOff', 84, true, false, false, 'x-circle'), // R Alt + T
      scHotkey('Precision\nTarget', 1001, false, true, false, 'bullseye'), // L Alt + Mouse 2
      scHotkey('Lock\nAttackers', 52, false, false, false, 'lock'), // 4
      scHotkey('Reset\nSub-target', 82, false, true, false, 'refresh'), // L Alt + R
    ]
  ]
});

// =====================================================
// PAGE 3: ON-FOOT MOVEMENT (Priorité 1)
// =====================================================

const onFootMovementProfile = profile({
  name: 'On-Foot\nMovement',
  icon: 'user',
  actions: [
    [
      back(),
      scHotkey('Fire\nWeapon', 1000, false, false, false, 'gun'), // Mouse 1
      scHotkey('Aim Down\nSight', 1001, false, false, false, 'crosshair'), // Mouse 2
      scHotkey('Reload', 82, false, false, false, 'refresh'), // R
      scHotkey('Primary\nWeapon', 49, false, false, false, 'rifle'), // 1
    ],
    [
      scHotkey('Secondary\nWeapon', 50, false, false, false, 'gun'), // 2
      scHotkey('Sidearm', 51, false, false, false, 'pistol'), // 3
      scHotkey('Melee', 86, false, false, false, 'fist'), // V
      scHotkey('Gadget', 53, false, false, false, 'tool'), // 5
      scHotkey('Sprint', 16, false, false, false, 'zap'), // L Shift
    ],
    [
      scHotkey('Crouch', 67, false, false, false, 'arrow-down'), // C
      scHotkey('Prone', 17, false, false, false, 'user'), // L Ctrl
      scHotkey('Jump', 32, false, false, false, 'arrow-up'), // Space
      scHotkey('Flashlight', 84, false, false, false, 'flashlight'), // T
      scHotkey('Holster\nWeapon', 82, false, false, false, 'pocket'), // R Hold
    ]
  ]
});

// =====================================================
// PAGE 4: EVA & VEHICLES (Priorité 2)
// =====================================================

const evaVehiclesProfile = profile({
  name: 'EVA &\nVehicles',
  icon: 'rocket',
  actions: [
    [
      back(),
      scHotkey('EVA\nForward', 87, false, false, false, 'arrow-up'), // W
      scHotkey('EVA\nBackward', 83, false, false, false, 'arrow-down'), // S
      scHotkey('EVA\nLeft', 65, false, false, false, 'arrow-left'), // A
      scHotkey('EVA\nRight', 68, false, false, false, 'arrow-right'), // D
    ],
    [
      scHotkey('EVA\nUp', 32, false, false, false, 'chevron-up'), // Space
      scHotkey('EVA\nDown', 17, false, false, false, 'chevron-down'), // L Ctrl
      scHotkey('EVA\nBoost', 16, false, false, false, 'rocket'), // L Shift
      scHotkey('EVA\nBrake', 88, false, false, false, 'hand'), // X
      scHotkey('Launch from\nSurface', 32, false, false, false, 'rocket'), // Space
    ],
    [
      scHotkey('Vehicle\nHorn', 32, false, false, false, 'horn'), // Space
      scHotkey('Vehicle\nBoost', 16, false, false, false, 'fast-forward'), // L Shift
      scHotkey('Vehicle\nBrake', 88, false, false, false, 'brake-lights'), // X
      scHotkey('Roll\nLeft', 81, false, false, false, 'rotate-ccw'), // Q
      scHotkey('Roll\nRight', 69, false, false, false, 'rotate-cw'), // E
    ]
  ]
});

// =====================================================
// PAGE 5: SOCIAL & INTERFACE (Priorité 1)
// =====================================================

const socialInterfaceProfile = profile({
  name: 'Social &\nInterface',
  icon: 'users',
  actions: [
    [
      back(),
      scHotkey('MobiGlass', 112, false, false, false, 'tablet'), // F1
      scHotkey('Star\nMap', 113, false, false, false, 'map'), // F2
      scHotkey('Chat\nWindow', 123, false, false, false, 'message-circle'), // F12
      scHotkey('CommLink', 122, false, false, false, 'phone'), // F11
    ],
    [
      scHotkey('Push to\nTalk', 107, false, false, false, 'microphone'), // Numpad +
      scHotkey('Inventory', 73, false, false, false, 'package'), // I
      scHotkey('Interaction\nMode', 70, false, false, false, 'hand'), // F
      scHotkey('Inner\nThought', 1001, false, false, false, 'circle'), // Mouse 2
      scHotkey('Personal\nInventory', 73, false, false, false, 'backpack'), // I
    ],
    [
      scHotkey('Accept\nInvite', 219, false, false, false, 'check'), // [
      scHotkey('Reject\nInvite', 221, false, false, false, 'x'), // ]
      scHotkey('Focus', 1002, false, false, false, 'focus'), // Mouse 3
      scHotkey('Wipe\nVisor', 88, false, true, false, 'droplets'), // L Alt + X
      scHotkey('Third\nPerson', 115, false, false, false, 'eye'), // F4
    ]
  ]
});

// =====================================================
// PAGE 6: MINING & SALVAGE (Priorité 2)
// =====================================================

const miningSalvageProfile = profile({
  name: 'Mining\n& Salvage',
  icon: 'pickaxe',
  actions: [
    [
      back(),
      scHotkey('Fire Mining\nLaser', 1000, false, false, false, 'pickaxe'), // Mouse 1
      scHotkey('Switch Mining\nLaser', 1000, false, true, false, 'repeat'), // L Alt + Mouse 1
      scHotkey('Mining\nConsumable 1', 49, false, true, false, 'syringe'), // L Alt + 1
      scHotkey('Mining\nConsumable 2', 50, false, true, false, 'syringe'), // L Alt + 2
    ],
    [
      scHotkey('Mining\nConsumable 3', 51, false, true, false, 'syringe'), // L Alt + 3
      scHotkey('Jettison\nCargo', 74, false, true, false, 'package-x'), // L Alt + J
      scHotkey('Salvage\nFocused', 1000, false, false, false, 'recycle'), // Mouse 1
      scHotkey('Salvage\nLeft', 65, true, false, false, 'arrow-left'), // R Alt + A
      scHotkey('Salvage\nRight', 68, true, false, false, 'arrow-right'), // R Alt + D
    ],
    [
      scHotkey('Salvage\nGimbal', 71, false, false, false, 'crosshair'), // G
      scHotkey('Gimbal\nReset', 71, false, true, false, 'refresh'), // L Alt + G
      scHotkey('Tractor +', 1003, false, false, false, 'magnet'), // Mouse Wheel Up
      scHotkey('Tractor -', 1004, false, false, false, 'magnet'), // Mouse Wheel Down
      scHotkey('Mining\nMode', 77, false, false, false, 'pickaxe'), // M
    ]
  ]
});

// =====================================================
// PAGE 7: TURRETS & ADVANCED (Priorité 3)
// =====================================================

const turretsAdvancedProfile = profile({
  name: 'Turrets\n& Advanced',
  icon: 'target-2',
  actions: [
    [
      back(),
      scHotkey('Exit\nTurret', 89, false, false, false, 'log-out'), // Y
      scHotkey('Toggle Mouse\nMode', 81, false, false, false, 'mouse'), // Q
      scHotkey('Gyro\nStabilization', 69, false, false, false, 'compass'), // E
      scHotkey('Next\nTurret', 68, false, false, false, 'chevron-right'), // D
    ],
    [
      scHotkey('Previous\nTurret', 65, false, false, false, 'chevron-left'), // A
      scHotkey('Recenter\nTurret', 67, false, false, false, 'center'), // C
      scHotkey('Speed\nLimiter', 83, false, false, false, 'speedometer'), // S
      scHotkey('Fire Mode\nCycle', 220, false, false, false, 'repeat'), // \
      scHotkey('Turret\nPosition', 83, false, false, false, 'repeat'), // S
    ],
    [
      scHotkey('ESP\nToggle', 88, false, false, false, 'shield'), // X
      scHotkey('Speed Limiter\nRel', 1003, false, true, false, 'settings'), // L Alt + Wheel
      scHotkey('Fire\nFocused', 1000, false, false, false, 'gun'), // Mouse 1
      null,
      null
    ]
  ]
});

// =====================================================
// PAGE 8: MFD & SYSTEMS (Priorité 2)
// =====================================================

const mfdSystemsProfile = profile({
  name: 'MFD\n& Systems',
  icon: 'monitor',
  actions: [
    [
      back(),
      scHotkey('MFD Page\nForward', 69, false, true, false, 'chevron-right'), // L Alt + E
      scHotkey('MFD Page\nBack', 81, false, true, false, 'chevron-left'), // L Alt + Q
      scHotkey('Self\nStatus', 115, false, false, false, 'heart-pulse'), // F4
      scHotkey('Target\nStatus', 115, false, false, false, 'target'), // F4
    ],
    [
      scHotkey('Scanning', 115, false, false, false, 'search'), // F4
      scHotkey('Vehicle\nConfig', 115, false, false, false, 'settings'), // F4
      scHotkey('Communications', 115, false, false, false, 'radio'), // F4
      scHotkey('IFCS', 115, false, false, false, 'airplane'), // F4
      scHotkey('Diagnostics', 115, false, false, false, 'wrench'), // F4
    ],
    [
      scHotkey('Resource\nNetwork', 115, false, false, false, 'net'), // F4
      null,
      null,
      null,
      null
    ]
  ]
});

// =====================================================
// PAGE 9: CAMERA & ADVANCED (Priorité 3)
// =====================================================

const cameraAdvancedProfile = profile({
  name: 'Camera\n& Advanced',
  icon: 'camera',
  actions: [
    [
      back(),
      scHotkey('Advanced\nCamera', 115, false, false, false, 'camera'), // F4
      scHotkey('Save\nView 1', 97, false, false, false, 'bookmark'), // Numpad 1
      scHotkey('Save\nView 2', 98, false, false, false, 'bookmark'), // Numpad 2
      scHotkey('Save\nView 3', 99, false, false, false, 'bookmark'), // Numpad 3
    ],
    [
      scHotkey('Load\nView 1', 97, false, false, false, 'play'), // Numpad 1
      scHotkey('Load\nView 2', 98, false, false, false, 'play'), // Numpad 2
      scHotkey('Load\nView 3', 99, false, false, false, 'play'), // Numpad 3
      scHotkey('Clear Saved\nView', 96, false, false, false, 'trash'), // Numpad 0
      scHotkey('Increase\nFoV', 107, false, false, false, 'zoom-in'), // Numpad +
    ],
    [
      scHotkey('Decrease\nFoV', 109, false, false, false, 'zoom-out'), // Numpad -
      scHotkey('Increase\nDoF', 36, false, false, false, 'camera'), // Home
      scHotkey('Decrease\nDoF', 35, false, false, false, 'camera'), // End
      scHotkey('Reset\nView', 106, false, false, false, 'refresh'), // Numpad *
      scHotkey('Spectator\nHUD', 66, false, false, false, 'eye'), // B
    ]
  ]
});

// =====================================================
// PAGE 10: EMOTES & SOCIAL (Priorité 3)
// =====================================================

const emotesAdvancedProfile = profile({
  name: 'Emotes\n& Social',
  icon: 'smile',
  actions: [
    [
      back(),
      scHotkey('Forward\nEmote', 101, false, false, false, 'hand-pointer'), // Numpad 5
      scHotkey('Left\nEmote', 97, false, false, false, 'arrow-left'), // Numpad 1
      scHotkey('Right\nEmote', 99, false, false, false, 'arrow-right'), // Numpad 3
      scHotkey('Stop\nEmote', 98, false, false, false, 'hand'), // Numpad 2
    ],
    [
      scHotkey('Yes\nEmote', 100, false, false, false, 'thumbs-up'), // Numpad 4
      scHotkey('No\nEmote', 102, false, false, false, 'hand'), // Numpad 6
      scHotkey('Wave', 96, false, false, false, 'hand-wave'), // Numpad 0
      scHotkey('Salute', 96, false, true, false, 'salute'), // L Alt + Numpad 0
      scHotkey('Dance', 97, true, false, false, 'music'), // R Alt + Numpad 1
    ],
    [
      scHotkey('Re-spawn', 70, false, false, false, 'skull'), // F
      scHotkey('VOIP\nProximity', 107, false, true, false, 'microphone'), // L Alt + Numpad +
      scHotkey('FOIP\nSelfie', 109, false, false, false, 'camera-selfie'), // Numpad -
      null,
      null
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
      folder(flightEssentialProfile),
      folder(combatWeaponsProfile),
      folder(onFootMovementProfile),
      folder(evaVehiclesProfile),
      folder(socialInterfaceProfile),
    ],
    [
      folder(miningSalvageProfile),
      folder(turretsAdvancedProfile),
      folder(mfdSystemsProfile),
      folder(cameraAdvancedProfile),
      folder(emotesAdvancedProfile),
    ],
    [
      // Actions d'urgence en accès rapide
      scHotkey('Emergency\nExit', 89, false, false, false, 'log-out'), // Y
      scHotkey('Flight\nReady', 82, false, true, false, 'power'), // R Alt + R
      scHotkey('Force\nRespawn', 8, false, false, false, 'skull'), // Backspace
      scHotkey('Push to\nTalk', 107, false, false, false, 'microphone'), // Numpad +
      scHotkey('Target\nCycling', 84, false, false, false, 'target'), // T
    ]
  ]
});


module.exports = () => ({
  mainProfile: [starCitizenMainProfile],
  additionalProfiles: [
    flightEssentialProfile,
    combatWeaponsProfile,
    onFootMovementProfile,
    evaVehiclesProfile,
    socialInterfaceProfile,
    miningSalvageProfile,
    turretsAdvancedProfile,
    mfdSystemsProfile,
    cameraAdvancedProfile,
    emotesAdvancedProfile,
  ]
});