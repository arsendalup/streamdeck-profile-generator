/**
 * @fileoverview Star Citizen 4.1.1 Complete Keybinds Profile for Stream Deck
 * Reorganized with max 14 elements per sub-profile (+ 1 back button)
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

// MULTI-TOOL CONTROLS
const multiToolProfile = profile({
  name: 'Multi\nTool',
  icon: 'tool',
  actions: [
    [
      back(),
      scHotkey('Mining\nBeam', 1, false, false, false, 'laser'), // Left Mouse
      scHotkey('Extraction\nBeam', 2, false, false, false, 'magnet'), // Right Mouse
      scHotkey('Increase\nPower', 0, false, true, false, 'plus'), // Left Alt + Wheel Up
      scHotkey('Decrease\nPower', 0, false, true, false, 'minus') // Left Alt + Wheel Down
    ],
    [
      scHotkey('Equip\nMulti-Tool', 53, false, false, false, 'tool'), // 5
      scHotkey('Detach\nMode', 2, false, false, false, 'x'), // Right Mouse
      scHotkey('Increase\nDistance', 0, false, false, false, 'arrow-up'), // Wheel Up
      scHotkey('Decrease\nDistance', 0, false, false, false, 'arrow-down'), // Wheel Down
      scHotkey('Salvage\nScrape', 1, false, false, false, 'wrench') // Left Mouse
    ],
    [
      scHotkey('Tractor\nMode', 1, false, false, false, 'magnet'), // Left Mouse
      scHotkey('Rotate\nObject', 82, false, false, false, 'rotate-cw'), // HOLD R & Move Mouse
      scHotkey('Repair\nMode', 2, false, false, false, 'hammer'), // Right Mouse
      null,
      null
    ]
  ]
});

// SHIP MINING
const shipMiningProfile = profile({
  name: 'Ship\nMining',
  icon: 'pickaxe',
  actions: [
    [
      back(),
      scHotkey('Mining\nActions', 77, false, true, false, 'settings'), // Left Alt + M
      scHotkey('Fire\nMining Laser', 1, false, false, false, 'laser'), // Left Mouse
      scHotkey('Switch\nLaser', 1, false, true, false, 'switch'), // Left Alt + Left Mouse
      scHotkey('Cycle\nGimbal', 71, false, false, false, 'refresh') // G
    ],
    [
      scHotkey('Mining\nMode', 77, false, false, false, 'pickaxe'), // M
      scHotkey('Decrease\nPower', 0, false, false, false, 'minus'), // Wheel Down
      scHotkey('Consumable', 49, false, true, false, '1'), // Left Alt + 1
      scHotkey('Consumable', 50, false, true, false, '2'), // Left Alt + 2
      scHotkey('Consumable', 51, false, true, false, '3') // Left Alt + 3
    ],
    [
      scHotkey('Increase\nPower', 0, false, false, false, 'plus'), // Wheel Up
      scHotkey('Equip\nFPS Tool', 53, false, false, false, 'tool'), // 5
      scHotkey('FPS\nMining Laser', 1, false, false, false, 'laser'), // Left Mouse
      scHotkey('FPS\nIncrease Power', 0, false, true, false, 'plus'), // Left Alt + Wheel Up
      scHotkey('Jettison\nCargo', 74, false, true, false, 'trash') // Left Alt + J
    ]
  ]
});

// SALVAGE OPERATIONS
const salvageBasicProfile = profile({
  name: 'Salvage\nBasic',
  icon: 'wrench',
  actions: [
    [
      back(),
      scHotkey('Salvage\nGimbal', 71, false, false, false, 'refresh'), // G
      scHotkey('Gimbal\nReset', 71, false, true, false, 'rotate-ccw'), // Left Alt + G
      scHotkey('Fire\nFocused', 1, false, false, false, 'crosshair'), // Left Mouse
      scHotkey('Fire\nLeft', 65, false, true, false, 'arrow-left') // Right Alt + A
    ],
    [
      scHotkey('Salvage\nMode', 77, false, false, false, 'wrench'), // M
      scHotkey('Fire\nFracture', 87, false, true, false, 'zap'), // Right Alt + W
      scHotkey('Fire\nDisintegrate', 83, false, true, false, 'trash'), // Right Alt + S
      scHotkey('Cycle\nModifiers', 2, false, false, false, 'refresh'), // Right Mouse
      scHotkey('Beam\nSpacing', 0, false, false, false, 'arrows-horizontal') // Mouse Wheel
    ],
    [
      scHotkey('Fire\nRight', 68, false, true, false, 'arrow-right'), // Right Alt + D
      scHotkey('Decrease\nDistance', 0, false, false, false, 'arrow-down'), // Wheel Down
      scHotkey('Increase\nDistance', 0, false, false, false, 'arrow-up'), // Wheel Up
      null,
      null
    ]
  ]
});

// SALVAGE ADVANCED
const salvageAdvancedProfile = profile({
  name: 'Salvage\nAdvanced',
  icon: 'wrench-2',
  actions: [
    [
      back(),
      scHotkey('Focus\nLeft', 65, false, true, false, 'arrow-left'), // Left Alt + A
      scHotkey('Focus\nRight', 68, false, true, false, 'arrow-right'), // Left Alt + D
      scHotkey('Focus\nFracture', 87, false, true, false, 'zap'), // Left Alt + W
      scHotkey('Beam Axis\nToggle', 2, false, true, false, 'rotate-cw') // Left Alt + Right Mouse
    ],
    [
      scHotkey('Focus\nAll', 83, false, true, false, 'target'), // Left Alt + S
      scHotkey('FPS Repair\nEmpty', 2, false, false, false, 'hammer'), // Right Mouse
      scHotkey('Heavy Salvage\n1', 49, false, false, false, 'tool'), // 1
      scHotkey('Heavy Salvage\n2', 50, false, false, false, 'tool'), // 2
      scHotkey('Equip Multi\nTool', 53, false, false, false, 'multi-tool') // 5
    ],
    [
      scHotkey('FPS Scrape\nFill', 1, false, false, false, 'wrench'), // Left Mouse
      null,
      null,
      null,
      null
    ]
  ]
});

// ===== FLIGHT & NAVIGATION =====

// COCKPIT & SYSTEMS
const cockpitProfile = profile({
  name: 'Cockpit',
  icon: 'plane',
  actions: [
    [
      back(),
      scHotkey('Exit\nSeat', 89, false, false, false, 'log-out'), // Y (HOLD)
      scHotkey('Emergency\nExit', 85, false, false, true, 'eject'), // U + Left Shift
      scHotkey('Port Lock\nToggle', 75, false, true, false, 'lock'), // Right Alt + K
      scHotkey('Look\nBehind', 188, false, false, false, 'eye') // Comma
    ],
    [
      scHotkey('Flight\nReady', 82, false, true, false, 'power'), // Right Alt + R
      scHotkey('Autoland', 78, false, false, false, 'auto'), // N (HOLD)
      scHotkey('Request\nLanding', 78, false, true, false, 'radio'), // Left Alt + N
      scHotkey('VTOL\nMode', 75, false, false, false, 'helicopter'), // K
      scHotkey('Request\nDocking', 78, false, false, false, 'dock') // N (After target)
    ],
    [
      scHotkey('Landing\nGear', 78, false, false, false, 'landing-pad'), // N
      scHotkey('Invoke\nDocking', 78, false, false, false, 'link'), // N (HOLD)
      scHotkey('Headlights', 76, false, false, false, 'lightbulb'), // L
      scHotkey('Docking\nCamera', 48, false, false, false, 'camera'), // 0
      null
    ]
  ]
});

// FLIGHT MOVEMENT
const flightMovementProfile = profile({
  name: 'Flight\nMovement',
  icon: 'airplane',
  actions: [
    [
      back(),
      scHotkey('Throttle\nDown', 83, false, false, false, 'chevron-down'), // S
      scHotkey('Strafe\nLeft', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Strafe\nRight', 68, false, false, false, 'arrow-right'), // D
      scHotkey('Strafe\nUp', 32, false, false, false, 'arrow-up') // Spacebar
    ],
    [
      scHotkey('Throttle\nUp', 87, false, false, false, 'chevron-up'), // W
      scHotkey('Roll\nLeft', 81, false, false, false, 'rotate-ccw'), // Q
      scHotkey('Roll\nRight', 69, false, false, false, 'rotate-cw'), // E
      scHotkey('Lock Pitch\n& Yaw', 16, true, false, false, 'lock'), // Right Shift
      scHotkey('Boost', 16, false, false, false, 'zap') // Left Shift (HOLD)
    ],
    [
      scHotkey('Strafe\nDown', 17, false, false, false, 'arrow-down'), // Left Ctrl
      scHotkey('Decouple\nToggle', 67, false, false, false, 'unlink'), // C (HOLD)
      scHotkey('Cruise\nToggle', 67, false, true, false, 'cruise'), // Left Alt + C
      scHotkey('Spacebreak', 88, false, false, false, 'brake-lights'), // X
      null
    ]
  ]
});

// FLIGHT ADVANCED
const flightAdvancedProfile = profile({
  name: 'Flight\nAdvanced',
  icon: 'plane-2',
  actions: [
    [
      back(),
      scHotkey('Quantum\nMode', 66, false, false, false, 'zap'), // B (HOLD)
      scHotkey('Request\nJump', 1, false, false, false, 'fast-forward'), // Left Mouse (LONG)
      scHotkey('Engage\nQuantum', 1, false, false, false, 'rocket'), // Left Mouse (HOLD)
      scHotkey('Eject', 89, false, true, false, 'eject') // Right Alt + Y
    ],
    [
      scHotkey('Next Operator\nMode', 4, false, false, false, 'refresh'), // Middle Mouse
      scHotkey('Speed Limiter\nDown', 0, false, true, false, 'minus'), // Left Alt + Wheel Down
      scHotkey('Accel Limiter\nUp', 0, false, true, false, 'arrow-up'), // Right Alt + Wheel Up
      scHotkey('Accel Limiter\nDown', 0, false, true, false, 'arrow-down'), // Right Alt + Wheel Down
      scHotkey('Hail\nTarget', 57, false, false, false, 'radio') // 9
    ],
    [
      scHotkey('Speed Limiter\nUp', 0, false, true, false, 'plus'), // Left Alt + Wheel Up
      scHotkey('Mining\nMode', 77, false, false, false, 'pickaxe'), // M
      scHotkey('Cycle\nConfig', 75, false, true, false, 'settings'), // Alt + K
      scHotkey('Scan\nMode', 86, false, false, false, 'search'), // V
      null
    ]
  ]
});

// ===== COMBAT & TARGETING =====

// TARGETING BASIC
const targetingBasicProfile = profile({
  name: 'Targeting\nBasic',
  icon: 'target',
  actions: [
    [
      back(),
      scHotkey('Cycle In\nView', 84, false, false, false, 'eye'), // T
      scHotkey('Cycle\nAttackers', 52, false, false, false, 'sword'), // 4
      scHotkey('Cycle\nHostiles', 53, false, false, false, 'skull'), // 5
      scHotkey('Cycle\nFriendlies', 54, false, false, false, 'heart') // 6
    ],
    [
      scHotkey('Auto Target\nToggle', 84, false, false, false, 'target'), // T (LONG)
      scHotkey('Sub Target\nCycle', 82, false, false, false, 'layers'), // R
      scHotkey('Reset To\nMain', 82, false, true, false, 'refresh'), // Left Alt + R
      scHotkey('Unlock\nTarget', 84, false, true, false, 'unlock'), // Left Alt + T
      scHotkey('Look\nAhead', 76, false, true, false, 'eye') // Left Alt + L
    ],
    [
      scHotkey('Cycle\nAll', 55, false, false, false, 'users'), // 7
      null,
      null,
      null,
      null
    ]
  ]
});

// TARGETING ADVANCED
const targetingAdvancedProfile = profile({
  name: 'Targeting\nAdvanced',
  icon: 'target-2',
  actions: [
    [
      back(),
      scHotkey('Pin Target\n2', 50, false, false, false, 'pin'), // 2
      scHotkey('Pin Target\n3', 51, false, false, false, 'pin'), // 3
      scHotkey('Remove All\nPins', 48, false, false, false, 'x'), // 0
      scHotkey('Pin Selected\n1', 49, false, true, false, 'pin') // Left Alt + 1
    ],
    [
      scHotkey('Pin Target\n1', 49, false, false, false, 'pin'), // 1
      scHotkey('Pin Selected\n3', 51, false, true, false, 'pin'), // Left Alt + 3
      scHotkey('Precision\nTarget', 2, false, false, false, 'target'), // Right Mouse
      scHotkey('Precision\nZoom', 2, false, false, false, 'zoom'), // Right Mouse (HOLD)
      scHotkey('Cycle\nTracking', 2, false, true, false, 'refresh') // Right Alt + Right Mouse
    ],
    [
      scHotkey('Pin Selected\n2', 50, false, true, false, 'pin'), // Left Alt + 2
      null,
      null,
      null,
      null
    ]
  ]
});

// TURRET CONTROLS
const turretProfile = profile({
  name: 'Turret',
  icon: 'crosshair',
  actions: [
    [
      back(),
      scHotkey('Toggle Mouse\nMode', 81, false, false, false, 'mouse'), // Q
      scHotkey('Recenter\nTurret', 67, false, false, false, 'center'), // C (HOLD)
      scHotkey('Exit Remote\nTurret', 89, false, false, false, 'log-out'), // Y (HOLD)
      scHotkey('Change\nPosition', 83, false, false, false, 'switch') // S
    ],
    [
      scHotkey('Gyro\nStabilization', 69, false, false, false, 'compass'), // E
      scHotkey('Previous\nTurret', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Next\nTurret', 68, false, false, false, 'arrow-right'), // D
      null,
      null
    ]
  ]
});

// WEAPONS & MISSILES
const weaponsProfile = profile({
  name: 'Weapons',
  icon: 'sword',
  actions: [
    [
      back(),
      scHotkey('Missile\nMode', 4, false, false, false, 'crosshair'), // Mouse Button 3
      scHotkey('Launch\nMissiles', 1, false, false, false, 'rocket'), // Left Mouse (TAP)
      scHotkey('Dumbfire\nMissile', 1, false, false, false, 'target'), // Left Mouse Click
      scHotkey('Cycle Missile\nType', 0, false, false, false, 'refresh') // Scroll Wheel
    ],
    [
      scHotkey('Fire\nWeapons', 1, false, false, false, 'crosshair'), // Left Mouse
      scHotkey('Reset\nArmed', 71, false, true, false, 'refresh'), // Left Alt + G
      scHotkey('Toggle Impact\nPoint', 66, false, true, false, 'target'), // Left Alt + B (TAP)
      scHotkey('Next\nWeapon', 0, false, false, false, 'chevron-down'), // Wheel Down
      scHotkey('Previous\nWeapon', 0, false, false, false, 'chevron-up') // Wheel Up
    ],
    [
      scHotkey('Increase\nArmed', 71, false, false, false, 'plus'), // G
      scHotkey('Cycle\nGimbal', 71, false, false, false, 'refresh'), // G (Long Press)
      null,
      null,
      null
    ]
  ]
});

// COUNTERMEASURES & DEFENSE
const defensiveProfile = profile({
  name: 'Defensive',
  icon: 'shield',
  actions: [
    [
      back(),
      scHotkey('Decoy Set\nLaunch', 72, false, false, false, 'shield-check'), // H (HOLD)
      scHotkey('Increase\nBurst', 72, false, true, false, 'plus'), // Right Alt + H
      scHotkey('Decrease\nBurst', 72, false, true, false, 'minus'), // Left Alt + H
      scHotkey('Noise\nDeploy', 74, false, false, false, 'volume-x') // J
    ],
    [
      scHotkey('Decoy\nBurst', 72, false, false, false, 'shield'), // H (TAP)
      scHotkey('Set Q\nJammers', 0, false, false, false, 'radio-off'), // No Default
      scHotkey('Set Q\nSnares', 0, false, false, false, 'net'), // No Default
      scHotkey('Set\nQIDs', 0, false, false, false, 'crosshair'), // No Default
      scHotkey('Set\nEMPs', 0, false, false, false, 'zap') // No Default
    ]
  ]
});

// ===== POWER & SYSTEMS =====

// POWER WEAPONS
const powerWeaponsProfile = profile({
  name: 'Power\nWeapons',
  icon: 'battery',
  actions: [
    [
      back(),
      scHotkey('Power Weapons\nMax', 116, false, false, false, 'gun'), // F5 (HOLD)
      scHotkey('Power Weapons\n-', 116, false, true, false, 'gun'), // Left Alt + F5
      scHotkey('Power Weapons\nMin', 116, false, true, false, 'gun'), // Left Alt + F5 (HOLD)
      scHotkey('Weapons\nToggle', 80, false, false, false, 'gun') // P
    ],
    [
      scHotkey('Power Weapons\n+', 116, false, false, false, 'gun'), // F5
      scHotkey('Power Engines\nMax', 117, false, false, false, 'engine'), // F6 (HOLD)
      scHotkey('Power Engines\n-', 117, false, true, false, 'engine'), // Left Alt + F6
      scHotkey('Power Engines\nMin', 117, false, true, false, 'engine'), // Left Alt + F6 (HOLD)
      scHotkey('Thrusters\nToggle', 73, false, false, false, 'engine') // I
    ],
    [
      scHotkey('Power Engines\n+', 117, false, false, false, 'engine'), // F6
      null,
      null,
      null,
      null
    ]
  ]
});

// POWER SHIELDS
const powerShieldsProfile = profile({
  name: 'Power\nShields',
  icon: 'shield-2',
  actions: [
    [
      back(),
      scHotkey('Power Shields\nMax', 118, false, false, false, 'shield'), // F7 (HOLD)
      scHotkey('Power Shields\n-', 118, false, true, false, 'shield'), // Left Alt + F7
      scHotkey('Power Shields\nMin', 118, false, true, false, 'shield'), // Left Alt + F7 (HOLD)
      scHotkey('Shield\nToggle', 79, false, false, false, 'shield') // O
    ],
    [
      scHotkey('Power Shields\n+', 118, false, false, false, 'shield'), // F7
      scHotkey('Reset\nAssignments', 119, false, false, false, 'refresh'), // F8
      scHotkey('Decrease\nThrottle', 120, false, false, false, 'minus'), // F9
      scHotkey('Increase\nThrottle', 121, false, false, false, 'plus'), // F10
      scHotkey('Power Toggle\nAll', 85, false, false, false, 'power') // U
    ]
  ]
});

// ===== PERSONAL CONTROLS =====

// ON FOOT MOVEMENT
const onFootMovementProfile = profile({
  name: 'On Foot\nMovement',
  icon: 'user',
  actions: [
    [
      back(),
      scHotkey('Move\nLeft', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Move\nBackward', 83, false, false, false, 'arrow-down'), // S
      scHotkey('Move\nRight', 68, false, false, false, 'arrow-right'), // D
      scHotkey('Sprint', 16, false, false, false, 'zap') // Left Shift
    ],
    [
      scHotkey('Move\nForward', 87, false, false, false, 'arrow-up'), // W
      scHotkey('Crouch', 67, false, false, false, 'down'), // C
      scHotkey('Prone', 17, false, false, false, 'minus'), // Left Ctrl
      scHotkey('Lean\nLeft', 81, false, false, false, 'lean-left'), // Q
      scHotkey('Lean\nRight', 69, false, false, false, 'lean-right') // E
    ],
    [
      scHotkey('Jump', 32, false, false, false, 'jump'), // Spacebar
      scHotkey('Helmet\nToggle', 72, false, true, false, 'hard-hat'), // Right Alt + H
      scHotkey('Wipe\nVisor', 88, false, true, false, 'droplets'), // Left Alt + X
      scHotkey('Suit\nLight', 84, false, false, false, 'flashlight'), // T
      null
    ]
  ]
});

// ON FOOT WEAPONS
const onFootWeaponsProfile = profile({
  name: 'On Foot\nWeapons',
  icon: 'rifle',
  actions: [
    [
      back(),
      scHotkey('Secondary\nWeapon', 50, false, false, false, 'pistol'), // 2
      scHotkey('Sidearm', 51, false, false, false, 'gun'), // 3
      scHotkey('Right Side\nTool', 86, false, false, false, 'pocket'), // V
      scHotkey('ADS', 2, false, false, false, 'crosshair') // Right Mouse
    ],
    [
      scHotkey('Primary\nWeapon', 49, false, false, false, 'rifle'), // 1
      scHotkey('Reload\nPrimary', 82, false, false, false, 'refresh'), // R
      scHotkey('Reload\nSecondary', 66, false, true, false, 'refresh'), // Left Alt + B
      scHotkey('Fire\nMode', 66, false, false, false, 'target'), // B
      scHotkey('Customize\nWeapon', 74, false, false, false, 'settings') // J
    ],
    [
      scHotkey('Hold\nBreath', 16, false, false, false, 'wind'), // Left Shift
      scHotkey('Holster\nWeapon', 82, false, false, false, 'pocket'), // R (HOLD)
      null,
      null,
      null
    ]
  ]
});

// ON FOOT EQUIPMENT
const onFootEquipmentProfile = profile({
  name: 'On Foot\nEquipment',
  icon: 'backpack',
  actions: [
    [
      back(),
      scHotkey('Gadget/Tool', 53, false, false, false, 'tool'), // 5
      scHotkey('Utility\nItem', 54, false, false, false, 'package'), // 6
      scHotkey('Throwable\nWheel', 71, false, false, false, 'bomb'), // G (HOLD)
      scHotkey('Personal\nInventory', 73, false, false, false, 'backpack') // I
    ],
    [
      scHotkey('Med/Oxy\nPen', 52, false, false, false, 'syringe'), // 4
      scHotkey('PIT Wheel\nMenu', 70, false, false, false, 'circle'), // F + Right Mouse
      scHotkey('Focus', 4, false, false, false, 'focus'), // Mouse Button 3
      scHotkey('Force\nRespawn', 8, false, false, false, 'refresh-cw'), // Backspace (HOLD)
      scHotkey('Request\nRescue', 77, false, false, false, 'heart-pulse') // M (HOLD)
    ],
    [
      scHotkey('Interaction\nMode', 70, false, false, false, 'hand'), // F
      null,
      null,
      null,
      null
    ]
  ]
});

// MELEE COMBAT
const meleeProfile = profile({
  name: 'Melee\nCombat',
  icon: 'sword',
  actions: [
    [
      back(),
      scHotkey('Select\nKnife', 86, false, false, false, 'knife'), // V
      scHotkey('Light Attack\nLeft', 1, false, false, false, 'fist'), // Left Mouse
      scHotkey('Light Attack\nRight', 2, false, false, false, 'fist'), // Right Mouse
      scHotkey('Heavy Attack\nLeft', 1, false, false, false, 'sword') // Left Mouse (HOLD)
    ],
    [
      scHotkey('Unarmed\nCombat', 54, false, false, false, 'hand'), // 6
      scHotkey('Takedown/\nBunt', 4, false, false, false, 'skull'), // Middle Mouse (HOLD)
      scHotkey('Block', 0, false, false, false, 'shield'), // Both Mouse (HOLD)
      scHotkey('Dodge\nLeft', 65, false, false, false, 'arrow-left'), // Double Tap A
      scHotkey('Dodge\nRight', 68, false, false, false, 'arrow-right') // Double Tap D
    ],
    [
      scHotkey('Heavy Attack\nRight', 2, false, false, false, 'sword'), // Right Mouse (HOLD)
      scHotkey('Dodge\nBack', 83, false, false, false, 'arrow-down'), // Double Tap S
      null,
      null,
      null
    ]
  ]
});

// ===== VEHICLE & GROUND =====

// VEHICLE CONTROLS
const vehicleProfile = profile({
  name: 'Vehicle',
  icon: 'car',
  actions: [
    [
      back(),
      scHotkey('Drive\nBackward', 83, false, false, false, 'arrow-down'), // S
      scHotkey('Turn\nLeft', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Turn\nRight', 68, false, false, false, 'arrow-right'), // D
      scHotkey('Break', 88, false, false, false, 'brake-lights') // X
    ],
    [
      scHotkey('Drive\nForward', 87, false, false, false, 'arrow-up'), // W
      scHotkey('Vehicle\nLight', 76, false, false, false, 'lightbulb'), // L
      scHotkey('Vehicle\nBoost', 16, false, false, false, 'zap'), // Left Shift
      scHotkey('Toggle Break\nIdle', 67, false, false, false, 'brake-lights'), // C
      scHotkey('Systems\nReady', 82, false, true, false, 'power') // Right Alt + R
    ],
    [
      scHotkey('Horn', 32, false, false, false, 'horn'), // Spacebar
      scHotkey('Roll\nLeft', 81, false, false, false, 'rotate-ccw'), // Q
      scHotkey('Retract\nTurret', 80, false, false, false, 'arrow-down'), // P
      scHotkey('Roll\nRight', 69, false, false, false, 'rotate-cw'), // E
      null
    ]
  ]
});

// EVA CONTROLS
const evaProfile = profile({
  name: 'EVA',
  icon: 'rocket',
  actions: [
    [
      back(),
      scHotkey('EVA\nBreak', 88, false, false, false, 'brake-lights'), // X
      scHotkey('Strafe\nUp', 32, false, false, false, 'arrow-up'), // Spacebar
      scHotkey('Strafe\nDown', 17, false, false, false, 'arrow-down'), // Ctrl
      scHotkey('Strafe\nLeft', 65, false, false, false, 'arrow-left') // A
    ],
    [
      scHotkey('EVA\nBoost', 16, false, false, false, 'zap'), // Left Shift
      scHotkey('Strafe\nForward', 87, false, false, false, 'arrow-up'), // W
      scHotkey('Strafe\nBackward', 83, false, false, false, 'arrow-down'), // S
      scHotkey('Roll\nLeft', 81, false, false, false, 'rotate-ccw'), // Q
      scHotkey('Roll\nRight', 69, false, false, false, 'rotate-cw') // E
    ],
    [
      scHotkey('Strafe\nRight', 68, false, false, false, 'arrow-right'), // D
      scHotkey('Traversal\nLaunch', 32, false, false, false, 'rocket'), // Spacebar
      scHotkey('Traversal\nDetach', 89, false, false, false, 'unlink'), // Y
      scHotkey('Freelook', 90, false, false, false, 'eye'), // Z
      null
    ]
  ]
});

// ===== UTILITIES & INTERFACE =====

// GENERAL INTERFACE
const generalProfile = profile({
  name: 'General\nInterface',
  icon: 'settings',
  actions: [
    [
      back(),
      scHotkey('Mobiglas', 112, false, false, false, 'tablet'), // F1
      scHotkey('Cycle\nCamera', 115, false, false, false, 'camera'), // F4
      scHotkey('CommLink', 122, false, false, false, 'message-circle'), // F11
      scHotkey('Chat', 123, false, false, false, 'message-square') // F12
    ],
    [
      scHotkey('Pause/\nOptions', 27, false, false, false, 'menu'), // ESC
      scHotkey('Console', 192, false, false, false, 'terminal'), // ~ (TILDE)
      scHotkey('Activate\nChat', 13, false, false, false, 'type'), // Enter
      scHotkey('3rd Person\nCamera', 115, false, false, false, 'camera'), // F4
      scHotkey('Freelook', 90, false, false, false, 'eye') // Z (HOLD)
    ],
    [
      scHotkey('Chat\nCycle', 9, false, false, false, 'tab'), // TAB
      scHotkey('Self\nDestruct', 8, false, false, false, 'bomb'), // Backspace (HOLD)
      null,
      null,
      null
    ]
  ]
});

// FOIP & VOICE
const foipProfile = profile({
  name: 'FOIP &\nVoice',
  icon: 'camera-video',
  actions: [
    [
      back(),
      scHotkey('Selfie\nMode', 109, false, false, false, 'camera-selfie'), // - (Numpad)
      scHotkey('Head\nTracking', 111, false, false, false, 'user-check'), // / (Numpad)
      scHotkey('Audio\nChannels', 110, false, false, false, 'headphones'), // . (Numpad)
      scHotkey('Push To\nTalk', 107, false, false, false, 'microphone') // + (Numpad)
    ],
    [
      scHotkey('Camera\nCalibrate', 106, false, false, false, 'camera'), // * (Numpad)
      scHotkey('PTT\nProximity', 107, false, true, false, 'microphone-off'), // Left Alt + + (Numpad)
      null,
      null,
      null
    ]
  ]
});

// SCANNING & RADAR
const scanningProfile = profile({
  name: 'Scanning',
  icon: 'radar',
  actions: [
    [
      back(),
      scHotkey('Activate\nPing', 9, false, false, false, 'radio'), // TAB
      scHotkey('Activate\nScanning', 1, false, false, false, 'scan'), // Left Mouse
      scHotkey('Increase\nAngle', 0, false, false, false, 'zoom-out'), // Wheel Up
      scHotkey('Decrease\nAngle', 0, false, false, false, 'zoom-in') // Wheel Down
    ],
    [
      scHotkey('Scanning\nMode', 86, false, false, false, 'search'), // V
      null,
      null,
      null,
      null
    ]
  ]
});

// MFD CONTROLS
const mfdProfile = profile({
  name: 'MFD',
  icon: 'monitor',
  actions: [
    [
      back(),
      scHotkey('Cycle\nBack', 81, false, true, false, 'chevron-left'), // Left Alt + Q
      scHotkey('Cycle\nForward', 69, false, true, false, 'chevron-right'), // Left Alt + E
      null,
      null
    ]
  ]
});

// COMBAT EMOTES
const combatEmotesProfile = profile({
  name: 'Combat\nEmotes',
  icon: 'hand-peace',
  actions: [
    [
      back(),
      scHotkey('Stop', 98, false, false, false, 'hand'), // Keypad 2
      scHotkey('Right', 99, false, false, false, 'arrow-right'), // Keypad 3
      scHotkey('Yes', 100, false, false, false, 'check'), // Keypad 4
      scHotkey('Forward', 101, false, false, false, 'arrow-up') // Keypad 5
    ],
    [
      scHotkey('Left', 97, false, false, false, 'arrow-left'), // Keypad 1
      scHotkey('No', 102, false, false, false, 'x'), // Keypad 6
      null,
      null,
      null
    ]
  ]
});

// STARMAP CONTROLS
const starmapProfile = profile({
  name: 'Starmap',
  icon: 'map',
  actions: [
    [
      back(),
      scHotkey('Cancel\nRoute', 67, false, false, false, 'x'), // C
      scHotkey('Step\nBack', 52, false, false, false, 'arrow-left'), // 4
      scHotkey('Go To\nSelection', 51, false, false, false, 'arrow-right'), // 3
      scHotkey('My\nLocation', 50, false, false, false, 'map-pin') // 2
    ],
    [
      scHotkey('Set\nRoute', 82, false, false, false, 'route'), // R (After click)
      scHotkey('Full/Cross\nView', 90, false, false, false, 'layers'), // Z
      scHotkey('Local\nMap', 49, false, false, false, 'map'), // 1
      null,
      null
    ]
  ]
});

// ARENA COMMANDER
const arenaProfile = profile({
  name: 'Arena\nCommander',
  icon: 'gamepad',
  actions: [
    [
      back(),
      scHotkey('Spec Cam\nPrevious', 1, false, false, false, 'chevron-left'), // Left Mouse
      scHotkey('Spec Cam\nLock', 49, false, false, false, 'lock'), // 1
      scHotkey('Spec Cam\nZoom', 0, false, false, false, 'zoom'), // Mouse Wheel
      scHotkey('Spec Cam\nHUD', 66, false, false, false, 'monitor') // B
    ],
    [
      scHotkey('Spec Cam\nNext', 2, false, false, false, 'chevron-right'), // Right Mouse
      scHotkey('Spec Cam\nMode', 115, false, false, false, 'camera'), // F4
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