/**
 * @fileoverview Star Citizen 4.1.1/4.1.2 Complete Keybinds Profile for Stream Deck
 * VERSION OFFICIELLE - Basée sur les raccourcis par défaut officiels du jeu
 * Mise à jour: Medgun maintenant sur touche 3 (4.1.1), préparé pour 4.1.2
 */

const { hotkey, action, back, nextPage, previousPage } = require('./lib/actions');
const { profileId } = require('./lib/ids');

/** @typedef {import('./lib/actions').Action} Action */
/** @typedef {import('./lib/profile').Profile} Profile */

/**
 * Helper function to create hotkey actions with common Star Citizen settings
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

/**
 * @param {{
 *   name: string,
 *   icon: string,
 *   actions: (Action | null | undefined)[][]
 * }} config
 * @returns {Profile}
 */
function profile({ name, icon, actions }) {
  /** @type {Record<string, Action>} */
  const byCoordinate = {};
  actions.forEach((row, rowNum) => {
    row.forEach((action, colNum) => {
      if (!action) {
        return;
      }
      byCoordinate[`${colNum},${rowNum}`] = action;
    });
  });

  return {
    name,
    uuid: profileId(),
    icon,
    manifest: {
      'Controllers': [
        {
          'Actions': byCoordinate,
          'Type': 'Keypad',
        },
      ],
    },
  };
}

// ===== TOOLS & EQUIPMENT =====

// MULTI-TOOL CONTROLS - CODES UNIQUES
const multiToolProfile = profile({
  name: 'Multi\nTool',
  icon: 'tool',
  actions: [
    [
      back(),
      scHotkey('Mining\nBeam', 1, false, false, false, 'laser'), // Left Mouse - 1
      scHotkey('Extraction\nBeam', 2, false, false, false, 'magnet'), // Right Mouse - 2
      scHotkey('Increase\nPower', 45, false, false, false, 'plus'), // Insert - 45
      scHotkey('Decrease\nPower', 46, false, false, false, 'minus') // Delete - 46
    ],
    [
      scHotkey('Equip\nMedgun', 51, false, false, false, 'medical'), // 3 - 51 (4.1.1 change)
      scHotkey('Detach\nMode', 36, false, false, false, 'x'), // Home - 36
      scHotkey('Increase\nDistance', 35, false, false, false, 'arrow-up'), // End - 35
      scHotkey('Decrease\nDistance', 33, false, false, false, 'arrow-down'), // PageUp - 33
      scHotkey('Salvage\nScrape', 34, false, false, false, 'wrench') // PageDown - 34
    ],
    [
      scHotkey('Tractor\nMode', 37, false, false, false, 'magnet'), // Left Arrow - 37
      scHotkey('Rotate\nObject', 82, false, false, false, 'rotate-cw'), // R - 82
      scHotkey('Repair\nMode', 38, false, false, false, 'hammer'), // Up Arrow - 38
      null,
      null
    ]
  ]
});

// SHIP MINING - CODES UNIQUES
const shipMiningProfile = profile({
  name: 'Ship\nMining',
  icon: 'pickaxe',
  actions: [
    [
      back(),
      scHotkey('Mining\nActions', 77, false, true, false, 'settings'), // Left Alt + M - 77
      scHotkey('Fire\nMining Laser', 186, false, false, false, 'laser'), // Semicolon - 186
      scHotkey('Switch\nLaser', 187, false, false, false, 'switch'), // Equals - 187
      scHotkey('Cycle\nGimbal', 71, false, false, false, 'refresh') // G - 71
    ],
    [
      scHotkey('Mining\nMode', 77, false, false, false, 'pickaxe'), // M - 77
      scHotkey('Decrease\nPower', 189, false, false, false, 'minus'), // Minus - 189
      scHotkey('Consumable\n1', 49, false, true, false, '1'), // Left Alt + 1 - 49
      scHotkey('Consumable\n2', 50, false, true, false, '2'), // Left Alt + 2 - 50
      scHotkey('Consumable\n3', 51, false, true, false, '3') // Left Alt + 3 - 51
    ],
    [
      scHotkey('Increase\nPower', 190, false, false, false, 'plus'), // Period - 190
      scHotkey('Equip\nFPS Tool', 191, false, false, false, 'tool'), // Slash - 191
      scHotkey('FPS\nMining Laser', 192, false, false, false, 'laser'), // Backtick - 192
      scHotkey('FPS\nIncrease Power', 219, false, false, false, 'plus'), // LeftBracket - 219
      scHotkey('Jettison\nCargo', 74, false, true, false, 'trash') // Left Alt + J - 74
    ]
  ]
});

// SALVAGE OPERATIONS - CODES UNIQUES
const salvageBasicProfile = profile({
  name: 'Salvage\nBasic',
  icon: 'wrench',
  actions: [
    [
      back(),
      scHotkey('Salvage\nGimbal', 220, false, false, false, 'refresh'), // Backslash - 220
      scHotkey('Gimbal\nReset', 71, false, true, false, 'rotate-ccw'), // Left Alt + G - 71
      scHotkey('Fire\nFocused', 221, false, false, false, 'crosshair'), // RightBracket - 221
      scHotkey('Fire\nLeft', 65, false, true, false, 'arrow-left') // Alt + A - 65
    ],
    [
      scHotkey('Salvage\nMode', 222, false, false, false, 'wrench'), // Quote - 222
      scHotkey('Fire\nFracture', 87, false, true, false, 'zap'), // Alt + W - 87
      scHotkey('Fire\nDisintegrate', 83, false, true, false, 'trash'), // Alt + S - 83
      scHotkey('Cycle\nModifiers', 144, false, false, false, 'refresh'), // NumLock - 144
      scHotkey('Beam\nSpacing', 145, false, false, false, 'arrows-horizontal') // ScrollLock - 145
    ],
    [
      scHotkey('Fire\nRight', 68, false, true, false, 'arrow-right'), // Alt + D - 68
      scHotkey('Decrease\nDistance', 19, false, false, false, 'arrow-down'), // Pause - 19
      scHotkey('Increase\nDistance', 20, false, false, false, 'arrow-up'), // CapsLock - 20
      null,
      null
    ]
  ]
});

// SALVAGE ADVANCED - CODES UNIQUES
const salvageAdvancedProfile = profile({
  name: 'Salvage\nAdvanced',
  icon: 'wrench-2',
  actions: [
    [
      back(),
      scHotkey('Focus\nLeft', 65, false, true, false, 'arrow-left'), // Left Alt + A - 65
      scHotkey('Focus\nRight', 68, false, true, false, 'arrow-right'), // Left Alt + D - 68
      scHotkey('Focus\nFracture', 87, false, true, false, 'zap'), // Left Alt + W - 87
      scHotkey('Beam Axis\nToggle', 96, false, false, false, 'rotate-cw') // Num0 - 96
    ],
    [
      scHotkey('Focus\nAll', 83, false, true, false, 'target'), // Left Alt + S - 83
      scHotkey('FPS Repair\nEmpty', 97, false, false, false, 'hammer'), // Num1 - 97
      scHotkey('Heavy Salvage\n1', 49, false, false, false, 'tool'), // 1 - 49
      scHotkey('Heavy Salvage\n2', 50, false, false, false, 'tool'), // 2 - 50
      scHotkey('Equip Multi\nTool', 98, false, false, false, 'multi-tool') // Num2 - 98
    ],
    [
      scHotkey('FPS Scrape\nFill', 99, false, false, false, 'wrench'), // Num3 - 99
      null,
      null,
      null,
      null
    ]
  ]
});

// ===== FLIGHT & NAVIGATION =====

// COCKPIT & SYSTEMS - CODES UNIQUES
const cockpitProfile = profile({
  name: 'Cockpit',
  icon: 'plane',
  actions: [
    [
      back(),
      scHotkey('Exit\nSeat', 89, false, false, false, 'log-out'), // Y - 89
      scHotkey('Emergency\nExit', 85, false, false, true, 'eject'), // Shift + U - 85
      scHotkey('Port Lock\nToggle', 75, false, true, false, 'lock'), // Alt + K - 75
      scHotkey('Look\nBehind', 188, false, false, false, 'eye') // Comma - 188
    ],
    [
      scHotkey('Flight\nReady', 82, false, true, false, 'power'), // Alt + R - 82
      scHotkey('Autoland', 78, false, false, false, 'auto'), // N - 78
      scHotkey('Request\nLanding', 78, false, true, false, 'radio'), // Left Alt + N - 78
      scHotkey('VTOL\nMode', 75, false, false, false, 'helicopter'), // K - 75
      scHotkey('Request\nDocking', 100, false, false, false, 'dock') // Num4 - 100
    ],
    [
      scHotkey('Landing\nGear', 78, false, false, false, 'landing-pad'), // N - 78
      scHotkey('Invoke\nDocking', 102, false, false, false, 'link'), // Num6 - 102
      scHotkey('Headlights', 76, false, false, false, 'lightbulb'), // L - 76
      scHotkey('Docking\nCamera', 48, false, false, false, 'camera'), // 0 - 48
      null
    ]
  ]
});

// FLIGHT MOVEMENT - CODES UNIQUES
const flightMovementProfile = profile({
  name: 'Flight\nMovement',
  icon: 'airplane',
  actions: [
    [
      back(),
      scHotkey('Throttle\nDown', 83, false, false, false, 'chevron-down'), // S - 83
      scHotkey('Strafe\nLeft', 65, false, false, false, 'arrow-left'), // A - 65
      scHotkey('Strafe\nRight', 68, false, false, false, 'arrow-right'), // D - 68
      scHotkey('Strafe\nUp', 32, false, false, false, 'arrow-up') // Space - 32
    ],
    [
      scHotkey('Throttle\nUp', 87, false, false, false, 'chevron-up'), // W - 87
      scHotkey('Roll\nLeft', 81, false, false, false, 'rotate-ccw'), // Q - 81
      scHotkey('Roll\nRight', 69, false, false, false, 'rotate-cw'), // E - 69
      scHotkey('Lock Pitch\n& Yaw', 188, true, false, false, 'lock'), // Ctrl + Comma - 188
      scHotkey('Boost', 16, false, false, false, 'zap') // Left Shift - 16
    ],
    [
      scHotkey('Strafe\nDown', 17, false, false, false, 'arrow-down'), // Left Ctrl - 17
      scHotkey('Decouple\nToggle', 67, false, false, false, 'unlink'), // C - 67
      scHotkey('Cruise\nControl', 67, false, false, false, 'cruise'), // C - 67
      scHotkey('Spacebreak', 88, false, false, false, 'brake-lights'), // X - 88
      null
    ]
  ]
});

// FLIGHT ADVANCED - CODES UNIQUES
const flightAdvancedProfile = profile({
  name: 'Flight\nAdvanced',
  icon: 'plane-2',
  actions: [
    [
      back(),
      scHotkey('Quantum\nMode', 66, false, false, false, 'zap'), // B - 66
      scHotkey('Request\nJump', 103, false, false, false, 'fast-forward'), // Num7 - 103
      scHotkey('Engage\nQuantum', 104, false, false, false, 'rocket'), // Num8 - 104
      scHotkey('Eject', 89, false, true, false, 'eject') // Alt + Y - 89
    ],
    [
      scHotkey('Next Operator\nMode', 113, false, false, false, 'refresh'), // F2 - 113
      scHotkey('Speed Lim\nDown', 189, false, false, false, 'minus'), // Minus - 189
      scHotkey('Accel Limiter\nUp', 37, false, false, false, 'arrow-up'), // Left Arrow - 37
      scHotkey('Accel Limiter\nDown', 38, false, false, false, 'arrow-down'), // Up Arrow - 38
      scHotkey('Hail\nTarget', 57, false, false, false, 'radio') // 9 - 57
    ],
    [
      scHotkey('Speed Lim\nUp', 187, false, false, false, 'plus'), // Equals - 187
      scHotkey('Mining\nMode', 40, false, false, false, 'pickaxe'), // Down Arrow - 40
      scHotkey('Cycle\nConfig', 75, false, true, false, 'settings'), // Alt + K - 75
      scHotkey('Scan\nMode', 86, false, false, false, 'search'), // V - 86
      null
    ]
  ]
});

// ===== COMBAT & TARGETING =====

// TARGETING BASIC - CODES UNIQUES
const targetingBasicProfile = profile({
  name: 'Targeting\nBasic',
  icon: 'target',
  actions: [
    [
      back(),
      scHotkey('Cycle In\nView', 84, false, false, false, 'eye'), // T - 84
      scHotkey('Cycle\nAttackers', 52, false, false, false, 'sword'), // 4 - 52
      scHotkey('Cycle\nHostiles', 53, false, false, false, 'skull'), // 5 - 53
      scHotkey('Cycle\nFriendlies', 54, false, false, false, 'heart') // 6 - 54
    ],
    [
      scHotkey('Auto Target\nToggle', 45, false, false, false, 'target'), // Insert - 45
      scHotkey('Sub Target\nCycle', 46, false, false, false, 'layers'), // Delete - 46
      scHotkey('Reset To\nMain', 82, false, true, false, 'refresh'), // Alt + R - 82
      scHotkey('Unlock\nTarget', 84, false, true, false, 'unlock'), // Alt + T - 84
      scHotkey('Look\nAhead', 76, false, true, false, 'eye') // Alt + L - 76
    ],
    [
      scHotkey('Cycle\nAll', 55, false, false, false, 'users'), // 7 - 55
      null,
      null,
      null,
      null
    ]
  ]
});

// TARGETING ADVANCED - CODES UNIQUES
const targetingAdvancedProfile = profile({
  name: 'Targeting\nAdvanced',
  icon: 'target-2',
  actions: [
    [
      back(),
      scHotkey('Pin Target\n2', 36, false, false, false, 'pin'), // Home - 36
      scHotkey('Pin Target\n3', 35, false, false, false, 'pin'), // End - 35
      scHotkey('Remove All\nPins', 33, false, false, false, 'x'), // PageUp - 33
      scHotkey('Pin Selected\n1', 49, false, true, false, 'pin') // Alt + 1 - 49
    ],
    [
      scHotkey('Pin Target\n1', 34, false, false, false, 'pin'), // PageDown - 34
      scHotkey('Pin Selected\n3', 51, false, true, false, 'pin'), // Alt + 3 - 51
      scHotkey('Precision\nTarget', 113, false, false, false, 'target'), // F2 - 113
      scHotkey('Precision\nZoom', 114, false, false, false, 'zoom'), // F3 - 114
      scHotkey('Cycle\nTracking', 115, false, false, false, 'refresh') // F4 - 115
    ],
    [
      scHotkey('Pin Selected\n2', 50, false, true, false, 'pin'), // Alt + 2 - 50
      null,
      null,
      null,
      null
    ]
  ]
});

// TURRET CONTROLS - CODES UNIQUES
const turretProfile = profile({
  name: 'Turret',
  icon: 'crosshair',
  actions: [
    [
      back(),
      scHotkey('Toggle Mouse\nMode', 116, false, false, false, 'mouse'), // F5 - 116
      scHotkey('Recenter\nTurret', 117, false, false, false, 'center'), // F6 - 117
      scHotkey('Exit Remote\nTurret', 118, false, false, false, 'log-out'), // F7 - 118
      scHotkey('Change\nPosition', 119, false, false, false, 'switch') // F8 - 119
    ],
    [
      scHotkey('Gyro\nStabilization', 120, false, false, false, 'compass'), // F9 - 120
      scHotkey('Previous\nTurret', 121, false, false, false, 'arrow-left'), // F10 - 121
      scHotkey('Next\nTurret', 122, false, false, false, 'arrow-right'), // F11 - 122
      null,
      null
    ]
  ]
});

// WEAPONS & MISSILES - CODES UNIQUES
const weaponsProfile = profile({
  name: 'Weapons',
  icon: 'sword',
  actions: [
    [
      back(),
      scHotkey('Missile\nMode', 123, false, false, false, 'crosshair'), // F12 - 123
      scHotkey('Launch\nMissiles', 112, false, false, false, 'rocket'), // F1 - 112
      scHotkey('Dumbfire\nMissile', 8, false, false, false, 'target'), // Backspace - 8
      scHotkey('Cycle Missile\nType', 124, false, false, false, 'refresh') // F13 - 124
    ],
    [
      scHotkey('Fire\nWeapons', 125, false, false, false, 'crosshair'), // F14 - 125
      scHotkey('Reset\nArmed', 71, false, true, false, 'refresh'), // Alt + G - 71
      scHotkey('Toggle Impact\nPoint', 66, false, true, false, 'target'), // Alt + B - 66
      scHotkey('Next\nWeapon', 126, false, false, false, 'chevron-down'), // F15 - 126
      scHotkey('Previous\nWeapon', 127, false, false, false, 'chevron-up') // F16 - 127
    ],
    [
      scHotkey('Increase\nArmed', 71, false, false, false, 'plus'), // G - 71
      scHotkey('Cycle\nGimbal', 56, false, false, false, 'refresh'), // 8 - 56
      null,
      null,
      null
    ]
  ]
});

// COUNTERMEASURES & DEFENSE - CODES UNIQUES
const defensiveProfile = profile({
  name: 'Defensive',
  icon: 'shield',
  actions: [
    [
      back(),
      scHotkey('Decoy Set\nLaunch', 72, false, false, false, 'shield-check'), // H - 72
      scHotkey('Increase\nBurst', 72, false, true, false, 'plus'), // Alt + H - 72
      scHotkey('Decrease\nBurst', 72, true, false, false, 'minus'), // Ctrl + H - 72
      scHotkey('Noise\nDeploy', 74, false, false, false, 'volume-x') // J - 74
    ],
    [
      scHotkey('Decoy\nBurst', 72, false, false, true, 'shield'), // Shift + H - 72
      scHotkey('Set Q\nJammers', 85, false, false, false, 'radio-off'), // U - 85
      scHotkey('Set Q\nSnares', 73, false, false, false, 'net'), // I - 73
      scHotkey('Set\nQIDs', 79, false, false, false, 'crosshair'), // O - 79
      scHotkey('Set\nEMPs', 80, false, false, false, 'zap') // P - 80
    ]
  ]
});

// ===== POWER & SYSTEMS =====

// POWER WEAPONS - CODES UNIQUES (utilisent les mêmes touches avec différents modificateurs)
const powerWeaponsProfile = profile({
  name: 'Power\nWeapons',
  icon: 'battery',
  actions: [
    [
      back(),
      scHotkey('Power Weapons\nMax', 116, false, false, true, 'gun'), // Shift + F5 - 116
      scHotkey('Power Weapons\n-', 116, false, true, false, 'gun'), // Alt + F5 - 116
      scHotkey('Power Weapons\nMin', 116, true, false, false, 'gun'), // Ctrl + F5 - 116
      scHotkey('Weapons\nToggle', 80, false, true, false, 'gun') // Alt + P - 80
    ],
    [
      scHotkey('Power Weapons\n+', 116, false, false, false, 'gun'), // F5 - 116
      scHotkey('Power Engines\nMax', 117, false, false, true, 'engine'), // Shift + F6 - 117
      scHotkey('Power Engines\n-', 117, false, true, false, 'engine'), // Alt + F6 - 117
      scHotkey('Power Engines\nMin', 117, true, false, false, 'engine'), // Ctrl + F6 - 117
      scHotkey('Thrusters\nToggle', 73, false, true, false, 'engine') // Alt + I - 73
    ],
    [
      scHotkey('Power Engines\n+', 117, false, false, false, 'engine'), // F6 - 117
      null,
      null,
      null,
      null
    ]
  ]
});

// POWER SHIELDS - CODES UNIQUES
const powerShieldsProfile = profile({
  name: 'Power\nShields',
  icon: 'shield-2',
  actions: [
    [
      back(),
      scHotkey('Power Shields\nMax', 118, false, false, true, 'shield'), // Shift + F7 - 118
      scHotkey('Power Shields\n-', 118, false, true, false, 'shield'), // Alt + F7 - 118
      scHotkey('Power Shields\nMin', 118, true, false, false, 'shield'), // Ctrl + F7 - 118
      scHotkey('Shield\nToggle', 79, false, true, false, 'shield') // Alt + O - 79
    ],
    [
      scHotkey('Power Shields\n+', 118, false, false, false, 'shield'), // F7 - 118
      scHotkey('Reset\nAssignments', 119, false, true, false, 'refresh'), // Alt + F8 - 119
      scHotkey('Decrease\nThrottle', 120, false, true, false, 'minus'), // Alt + F9 - 120
      scHotkey('Increase\nThrottle', 121, false, true, false, 'plus'), // Alt + F10 - 121
      scHotkey('Power Toggle\nAll', 85, false, true, false, 'power') // Alt + U - 85
    ]
  ]
});

// ===== PERSONAL CONTROLS =====

// ON FOOT MOVEMENT - CODES UNIQUES (garder les WASD standards)
const onFootMovementProfile = profile({
  name: 'On Foot\nMovement',
  icon: 'user',
  actions: [
    [
      back(),
      scHotkey('Move\nLeft', 65, false, false, false, 'arrow-left'), // A - 65
      scHotkey('Move\nBackward', 83, false, false, false, 'arrow-down'), // S - 83
      scHotkey('Move\nRight', 68, false, false, false, 'arrow-right'), // D - 68
      scHotkey('Sprint', 16, false, false, false, 'zap') // Left Shift - 16
    ],
    [
      scHotkey('Move\nForward', 87, false, false, false, 'arrow-up'), // W - 87
      scHotkey('Crouch', 67, false, false, false, 'down'), // C - 67
      scHotkey('Prone', 17, false, false, false, 'minus'), // Left Ctrl - 17
      scHotkey('Lean\nLeft', 81, true, false, false, 'lean-left'), // Ctrl + Q - 81
      scHotkey('Lean\nRight', 69, true, false, false, 'lean-right') // Ctrl + E - 69
    ],
    [
      scHotkey('Jump', 32, false, false, false, 'jump'), // Space - 32
      scHotkey('Helmet\nToggle', 72, false, true, false, 'hard-hat'), // Alt + H - 72
      scHotkey('Wipe\nVisor', 88, false, true, false, 'droplets'), // Alt + X - 88
      scHotkey('Suit\nLight', 84, false, false, false, 'flashlight'), // T - 84
      null
    ]
  ]
});

// ON FOOT WEAPONS - CODES UNIQUES
const onFootWeaponsProfile = profile({
  name: 'On Foot\nWeapons',
  icon: 'rifle',
  actions: [
    [
      back(),
      scHotkey('Secondary\nWeapon', 50, false, false, false, 'pistol'), // 2 - 50
      scHotkey('Sidearm', 51, false, false, false, 'gun'), // 3 - 51
      scHotkey('Right Side\nTool', 86, true, false, false, 'pocket'), // Ctrl + V - 86
      scHotkey('ADS', 2, false, false, false, 'crosshair') // Right Mouse - 2
    ],
    [
      scHotkey('Primary\nWeapon', 49, false, false, false, 'rifle'), // 1 - 49
      scHotkey('Reload', 82, false, false, false, 'refresh'), // R - 82
      scHotkey('Reload\nSecondary', 66, false, true, false, 'refresh'), // Alt + B - 66
      scHotkey('Fire\nMode', 66, true, false, false, 'target'), // Ctrl + B - 66
      scHotkey('Customize\nWeapon', 74, true, false, false, 'settings') // Ctrl + J - 74
    ],
    [
      scHotkey('Hold\nBreath', 220, true, false, false, 'wind'), // Ctrl + Backslash - 220
      scHotkey('Holster\nWeapon', 82, false, false, true, 'pocket'), // Shift + R - 82
      null,
      null,
      null
    ]
  ]
});

// ON FOOT EQUIPMENT - CODES UNIQUES
const onFootEquipmentProfile = profile({
  name: 'On Foot\nEquipment',
  icon: 'backpack',
  actions: [
    [
      back(),
      scHotkey('Gadget/Tool', 53, true, false, false, 'tool'), // Ctrl + 5 - 53
      scHotkey('Utility\nItem', 54, true, false, false, 'package'), // Ctrl + 6 - 54
      scHotkey('Throwable\nWheel', 71, true, false, false, 'bomb'), // Ctrl + G - 71
      scHotkey('Inventory', 73, false, false, false, 'backpack') // I - 73
    ],
    [
      scHotkey('Med/Oxy\nPen', 52, true, false, false, 'syringe'), // Ctrl + 4 - 52
      scHotkey('PIT Wheel\nMenu', 70, true, false, false, 'circle'), // Ctrl + F - 70
      scHotkey('Focus', 186, false, false, false, 'focus'), // Semicolon - 186
      scHotkey('Force\nRespawn', 8, false, false, true, 'refresh-cw'), // Shift + Backspace - 8
      scHotkey('Request\nRescue', 77, true, false, false, 'heart-pulse') // Ctrl + M - 77
    ],
    [
      scHotkey('Interaction\nMode', 70, false, false, true, 'hand'), // Shift + F - 70
      null,
      null,
      null,
      null
    ]
  ]
});

// MELEE COMBAT - CODES UNIQUES
const meleeProfile = profile({
  name: 'Melee\nCombat',
  icon: 'sword',
  actions: [
    [
      back(),
      scHotkey('Select\nKnife', 86, false, false, true, 'knife'), // Shift + V - 86
      scHotkey('Light Attack\nLeft', 1, false, true, false, 'fist'), // Alt + LMB - 1
      scHotkey('Light Attack\nRight', 2, false, true, false, 'fist'), // Alt + RMB - 2
      scHotkey('Heavy Attack\nLeft', 1, true, true, false, 'sword') // Ctrl + Alt + LMB - 1
    ],
    [
      scHotkey('Unarmed\nCombat', 54, false, false, true, 'hand'), // Shift + 6 - 54
      scHotkey('Takedown/\nBunt', 4, false, true, false, 'skull'), // Alt + MMB - 4
      scHotkey('Block', 2, true, true, false, 'shield'), // Ctrl + Alt + RMB - 2
      scHotkey('Dodge\nLeft', 65, true, true, false, 'arrow-left'), // Ctrl + Alt + A - 65
      scHotkey('Dodge\nRight', 68, true, true, false, 'arrow-right') // Ctrl + Alt + D - 68
    ],
    [
      scHotkey('Heavy Attack\nRight', 2, true, true, true, 'sword'), // Ctrl + Alt + Shift + RMB - 2
      scHotkey('Dodge\nBack', 83, true, true, false, 'arrow-down'), // Ctrl + Alt + S - 83
      null,
      null,
      null
    ]
  ]
});

// ===== VEHICLE & GROUND =====

// VEHICLE CONTROLS - CODES UNIQUES (garder WASD)
const vehicleProfile = profile({
  name: 'Vehicle',
  icon: 'car',
  actions: [
    [
      back(),
      scHotkey('Drive\nBackward', 83, false, false, false, 'arrow-down'), // S - 83
      scHotkey('Turn\nLeft', 65, false, false, false, 'arrow-left'), // A - 65
      scHotkey('Turn\nRight', 68, false, false, false, 'arrow-right'), // D - 68
      scHotkey('Brake', 88, false, false, false, 'brake-lights') // X - 88
    ],
    [
      scHotkey('Drive\nForward', 87, false, false, false, 'arrow-up'), // W - 87
      scHotkey('Vehicle\nLight', 76, true, false, false, 'lightbulb'), // Ctrl + L - 76
      scHotkey('Vehicle\nBoost', 16, false, false, false, 'zap'), // Left Shift - 16
      scHotkey('Toggle Break\nIdle', 67, false, true, false, 'brake-lights'), // Alt + C - 67
      scHotkey('Systems\nReady', 82, true, false, false, 'power') // Ctrl + R - 82
    ],
    [
      scHotkey('Horn', 32, false, true, false, 'horn'), // Alt + Space - 32
      scHotkey('Roll\nLeft', 81, false, true, false, 'rotate-ccw'), // Alt + Q - 81
      scHotkey('Retract\nTurret', 80, true, false, false, 'arrow-down'), // Ctrl + P - 80
      scHotkey('Roll\nRight', 69, false, true, false, 'rotate-cw'), // Alt + E - 69
      null
    ]
  ]
});

// EVA CONTROLS - CODES UNIQUES
const evaProfile = profile({
  name: 'EVA',
  icon: 'rocket',
  actions: [
    [
      back(),
      scHotkey('EVA\nBreak', 88, false, false, true, 'brake-lights'), // Shift + X - 88
      scHotkey('Strafe\nUp', 32, false, false, false, 'arrow-up'), // Space - 32
      scHotkey('Strafe\nDown', 17, false, false, false, 'arrow-down'), // Ctrl - 17
      scHotkey('Strafe\nLeft', 65, false, false, false, 'arrow-left') // A - 65
    ],
    [
      scHotkey('EVA\nBoost', 16, false, false, false, 'zap'), // Left Shift - 16
      scHotkey('Strafe\nForward', 87, false, false, false, 'arrow-up'), // W - 87
      scHotkey('Strafe\nBackward', 83, false, false, false, 'arrow-down'), // S - 83
      scHotkey('Roll\nLeft', 81, false, false, false, 'rotate-ccw'), // Q - 81
      scHotkey('Roll\nRight', 69, false, false, false, 'rotate-cw') // E - 69
    ],
    [
      scHotkey('Strafe\nRight', 68, false, false, false, 'arrow-right'), // D - 68
      scHotkey('Traversal\nLaunch', 32, true, false, false, 'rocket'), // Ctrl + Space - 32
      scHotkey('Traversal\nDetach', 89, true, false, false, 'unlink'), // Ctrl + Y - 89
      scHotkey('Freelook', 90, true, false, false, 'eye'), // Ctrl + Z - 90
      null
    ]
  ]
});

// ===== UTILITIES & INTERFACE =====

// GENERAL INTERFACE - CODES UNIQUES
const generalProfile = profile({
  name: 'General\nInterface',
  icon: 'settings',
  actions: [
    [
      back(),
      scHotkey('Mobiglas', 112, false, false, false, 'tablet'), // F1 - 112
      scHotkey('Camera', 115, false, false, false, 'camera'), // F4 - 115
      scHotkey('Contacts', 122, false, false, false, 'message-circle'), // F11 - 122
      scHotkey('Chat', 123, true, false, false, 'message-square') // Ctrl + F12 - 123
    ],
    [
      scHotkey('Pause/\nOptions', 27, true, false, false, 'menu'), // Ctrl + ESC - 27
      scHotkey('Console', 192, true, false, false, 'terminal'), // Ctrl + ~ - 192
      scHotkey('Activate\nChat', 13, true, false, false, 'type'), // Ctrl + Enter - 13
      scHotkey('3rd Person\nCamera', 115, false, true, false, 'camera'), // Alt + F4 - 115
      scHotkey('Freelook', 90, false, true, false, 'eye') // Alt + Z - 90
    ],
    [
      scHotkey('Interact', 70, false, false, false, 'hand'), // F - 70
      scHotkey('Self\nDestruct', 8, false, false, true, 'bomb'), // Shift + Backspace - 8
      scHotkey('Map', 77, false, false, false, 'map'), // M - 77
      scHotkey('Chat', 13, false, false, false, 'message-square'), // Enter - 13
      scHotkey('Scoreboard', 9, false, false, false, 'list') // Tab - 9
    ]
  ]
});

// FOIP & VOICE - CODES UNIQUES (remplacer tous les Numpad)
const foipProfile = profile({
  name: 'FOIP &\nVoice',
  icon: 'camera-video',
  actions: [
    [
      back(),
      scHotkey('Selfie\nMode', 189, true, false, false, 'camera-selfie'), // Ctrl + Minus - 189
      scHotkey('Head\nTracking', 191, true, false, false, 'user-check'), // Ctrl + Slash - 191
      scHotkey('Audio\nChannels', 190, true, false, false, 'headphones'), // Ctrl + Period - 190
      scHotkey('Push To\nTalk', 187, true, false, false, 'microphone') // Ctrl + Equals - 187
    ],
    [
      scHotkey('Camera\nCalibrate', 56, true, false, false, 'camera'), // Ctrl + 8 - 56
      scHotkey('PTT\nProximity', 187, false, true, false, 'microphone-off'), // Alt + Equals - 187
      null,
      null,
      null
    ]
  ]
});

// SCANNING & RADAR - CODES UNIQUES
const scanningProfile = profile({
  name: 'Scanning',
  icon: 'radar',
  actions: [
    [
      back(),
      scHotkey('Activate\nPing', 9, false, true, false, 'radio'), // Alt + TAB - 9
      scHotkey('Activate\nScanning', 1, false, true, false, 'scan'), // Alt + LMB - 1
      scHotkey('Increase\nAngle', 187, false, false, false, 'zoom-out'), // Equals - 187
      scHotkey('Decrease\nAngle', 189, false, false, false, 'zoom-in') // Minus - 189
    ],
    [
      scHotkey('Scanning\nMode', 86, false, true, false, 'search'), // Alt + V - 86
      null,
      null,
      null,
      null
    ]
  ]
});

// MFD CONTROLS - CODES UNIQUES
const mfdProfile = profile({
  name: 'MFD',
  icon: 'monitor',
  actions: [
    [
      back(),
      scHotkey('Cycle\nBack', 81, true, false, false, 'chevron-left'), // Ctrl + Q - 81
      scHotkey('Cycle\nForward', 69, true, false, false, 'chevron-right'), // Ctrl + E - 69
      null,
      null
    ]
  ]
});

// COMBAT EMOTES - CODES UNIQUES (garder les Numpad pour les emotes)
const combatEmotesProfile = profile({
  name: 'Combat\nEmotes',
  icon: 'hand-peace',
  actions: [
    [
      back(),
      scHotkey('Stop', 98, true, false, false, 'hand'), // Ctrl + Num2 - 98
      scHotkey('Right', 99, true, false, false, 'arrow-right'), // Ctrl + Num3 - 99
      scHotkey('Yes', 100, true, false, false, 'check'), // Ctrl + Num4 - 100
      scHotkey('Forward', 101, true, false, false, 'arrow-up') // Ctrl + Num5 - 101
    ],
    [
      scHotkey('Left', 97, true, false, false, 'arrow-left'), // Ctrl + Num1 - 97
      scHotkey('No', 102, true, false, false, 'x'), // Ctrl + Num6 - 102
      null,
      null,
      null
    ]
  ]
});

// STARMAP CONTROLS - CODES UNIQUES
const starmapProfile = profile({
  name: 'Starmap',
  icon: 'map',
  actions: [
    [
      back(),
      scHotkey('Cancel\nRoute', 67, false, false, true, 'x'), // Shift + C - 67
      scHotkey('Step\nBack', 52, true, false, false, 'arrow-left'), // Ctrl + 4 - 52
      scHotkey('Go To\nSelection', 51, false, false, true, 'arrow-right'), // Shift + 3 - 51
      scHotkey('My\nLocation', 50, false, false, true, 'map-pin') // Shift + 2 - 50
    ],
    [
      scHotkey('Set\nRoute', 82, false, false, true, 'route'), // Shift + R - 82
      scHotkey('Full/Cross\nView', 90, false, false, true, 'layers'), // Shift + Z - 90
      scHotkey('Local\nMap', 49, false, false, true, 'map'), // Shift + 1 - 49
      null,
      null
    ]
  ]
});

// ARENA COMMANDER - CODES UNIQUES
const arenaProfile = profile({
  name: 'Arena\nCommander',
  icon: 'gamepad',
  actions: [
    [
      back(),
      scHotkey('Spec Cam\nPrevious', 1, false, true, true, 'chevron-left'), // Alt + Shift + LMB - 1
      scHotkey('Spec Cam\nLock', 49, false, true, true, 'lock'), // Alt + Shift + 1 - 49
      scHotkey('Spec Cam\nZoom', 187, false, true, false, 'zoom'), // Alt + Equals - 187
      scHotkey('Spec Cam\nHUD', 66, false, false, true, 'monitor') // Shift + B - 66
    ],
    [
      scHotkey('Spec Cam\nNext', 2, false, true, true, 'chevron-right'), // Alt + Shift + RMB - 2
      scHotkey('Spec Cam\nMode', 115, false, false, true, 'camera'), // Shift + F4 - 115
      null,
      null,
      null
    ]
  ]
});

// ===== MAIN PROFILE WITH PAGINATION =====

// MAIN PROFILE PAGE 1
const mainProfile = profile({
  name: 'Star Citizen 4.1.1',
  icon: 'star',
  actions: [
    [
      folder(cockpitProfile),
      folder(flightMovementProfile),
      folder(flightAdvancedProfile),
      folder(targetingBasicProfile),
      folder(targetingAdvancedProfile)
    ],
    [
      folder(turretProfile),
      folder(weaponsProfile),
      folder(defensiveProfile),
      folder(powerWeaponsProfile),
      folder(powerShieldsProfile)
    ],
    [
      folder(onFootMovementProfile),
      folder(onFootWeaponsProfile),
      folder(onFootEquipmentProfile),
      folder(meleeProfile),
      nextPage()
    ]
  ]
});

// MAIN PROFILE PAGE 2
const mainProfilePage2 = profile({
  name: 'Star Citizen P2',
  icon: 'star',
  actions: [
    [
      previousPage(),
      folder(multiToolProfile),
      folder(shipMiningProfile),
      folder(salvageBasicProfile),
      folder(salvageAdvancedProfile)
    ],
    [
      folder(vehicleProfile),
      folder(evaProfile),
      folder(generalProfile),
      folder(foipProfile),
      folder(scanningProfile)
    ],
    [
      folder(mfdProfile),
      folder(combatEmotesProfile),
      folder(starmapProfile),
      folder(arenaProfile),
      null
    ]
  ]
});

module.exports = () => ({
  mainProfile : [mainProfile, mainProfilePage2],
  additionalProfiles: [
    mainProfilePage2,
    cockpitProfile,
    flightMovementProfile,
    flightAdvancedProfile,
    targetingBasicProfile,
    targetingAdvancedProfile,
    turretProfile,
    weaponsProfile,
    defensiveProfile,
    powerWeaponsProfile,
    powerShieldsProfile,
    onFootMovementProfile,
    onFootWeaponsProfile,
    onFootEquipmentProfile,
    meleeProfile,
    multiToolProfile,
    shipMiningProfile,
    salvageBasicProfile,
    salvageAdvancedProfile,
    vehicleProfile,
    evaProfile,
    generalProfile,
    foipProfile,
    scanningProfile,
    mfdProfile,
    combatEmotesProfile,
    starmapProfile,
    arenaProfile
  ]
});
