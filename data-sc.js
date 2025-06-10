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
  name: 'Multi-Tool',
  icon: 'tool',
  actions: [
    [
      back(),
      scHotkey('Mining Beam', 1, false, false, false, 'laser'), // Left Mouse
      scHotkey('Extraction Beam', 2, false, false, false, 'magnet'), // Right Mouse
      scHotkey('Increase Power', 0, false, true, false, 'plus'), // Left Alt + Wheel Up
      scHotkey('Decrease Power', 0, false, true, false, 'minus') // Left Alt + Wheel Down
    ],
    [
      scHotkey('Equip Multi-Tool', 53, false, false, false, 'tool'), // 5
      scHotkey('Detach Mode', 2, false, false, false, 'x'), // Right Mouse
      scHotkey('Increase Distance', 0, false, false, false, 'arrow-up'), // Wheel Up
      scHotkey('Decrease Distance', 0, false, false, false, 'arrow-down'), // Wheel Down
      scHotkey('Salvage Scrape', 1, false, false, false, 'wrench') // Left Mouse
    ],
    [
      scHotkey('Tractor Mode', 1, false, false, false, 'magnet'), // Left Mouse
      scHotkey('Rotate Object', 82, false, false, false, 'rotate-cw'), // HOLD R & Move Mouse
      scHotkey('Repair Mode', 2, false, false, false, 'hammer'), // Right Mouse
      null,
      null
    ]
  ]
});

// SHIP MINING
const shipMiningProfile = profile({
  name: 'Ship Mining',
  icon: 'pickaxe',
  actions: [
    [
      back(),
      scHotkey('Mining Actions', 77, false, true, false, 'settings'), // Left Alt + M
      scHotkey('Fire Mining Laser', 1, false, false, false, 'laser'), // Left Mouse
      scHotkey('Switch Laser', 1, false, true, false, 'switch'), // Left Alt + Left Mouse
      scHotkey('Cycle Gimbal', 71, false, false, false, 'refresh') // G
    ],
    [
      scHotkey('Mining Mode', 77, false, false, false, 'pickaxe'), // M
      scHotkey('Decrease Power', 0, false, false, false, 'minus'), // Wheel Down
      scHotkey('Consumable 1', 49, false, true, false, '1'), // Left Alt + 1
      scHotkey('Consumable 2', 50, false, true, false, '2'), // Left Alt + 2
      scHotkey('Consumable 3', 51, false, true, false, '3') // Left Alt + 3
    ],
    [
      scHotkey('Increase Power', 0, false, false, false, 'plus'), // Wheel Up
      scHotkey('Equip FPS Tool', 53, false, false, false, 'tool'), // 5
      scHotkey('FPS Mining Laser', 1, false, false, false, 'laser'), // Left Mouse
      scHotkey('FPS Increase Power', 0, false, true, false, 'plus'), // Left Alt + Wheel Up
      scHotkey('Jettison Cargo', 74, false, true, false, 'trash') // Left Alt + J
    ]
  ]
});

// SALVAGE OPERATIONS
const salvageBasicProfile = profile({
  name: 'Salvage Basic',
  icon: 'wrench',
  actions: [
    [
      back(),
      scHotkey('Salvage Gimbal', 71, false, false, false, 'refresh'), // G
      scHotkey('Gimbal Reset', 71, false, true, false, 'rotate-ccw'), // Left Alt + G
      scHotkey('Fire Focused', 1, false, false, false, 'crosshair'), // Left Mouse
      scHotkey('Fire Left', 65, false, true, false, 'arrow-left') // Right Alt + A
    ],
    [
      scHotkey('Salvage Mode', 77, false, false, false, 'wrench'), // M
      scHotkey('Fire Fracture', 87, false, true, false, 'zap'), // Right Alt + W
      scHotkey('Fire Disintegrate', 83, false, true, false, 'trash'), // Right Alt + S
      scHotkey('Cycle Modifiers', 2, false, false, false, 'refresh'), // Right Mouse
      scHotkey('Beam Spacing', 0, false, false, false, 'arrows-horizontal') // Mouse Wheel
    ],
    [
      scHotkey('Fire Right', 68, false, true, false, 'arrow-right'), // Right Alt + D
      scHotkey('Decrease Distance', 0, false, false, false, 'arrow-down'), // Wheel Down
      scHotkey('Increase Distance', 0, false, false, false, 'arrow-up'), // Wheel Up
      null,
      null
    ]
  ]
});

// SALVAGE ADVANCED
const salvageAdvancedProfile = profile({
  name: 'Salvage Advanced',
  icon: 'wrench-2',
  actions: [
    [
      back(),
      scHotkey('Focus Left', 65, false, true, false, 'arrow-left'), // Left Alt + A
      scHotkey('Focus Right', 68, false, true, false, 'arrow-right'), // Left Alt + D
      scHotkey('Focus Fracture', 87, false, true, false, 'zap'), // Left Alt + W
      scHotkey('Beam Axis Toggle', 2, false, true, false, 'rotate-cw') // Left Alt + Right Mouse
    ],
    [
      scHotkey('Focus All', 83, false, true, false, 'target'), // Left Alt + S
      scHotkey('FPS Repair Empty', 2, false, false, false, 'hammer'), // Right Mouse
      scHotkey('Heavy Salvage 1', 49, false, false, false, 'tool'), // 1
      scHotkey('Heavy Salvage 2', 50, false, false, false, 'tool'), // 2
      scHotkey('Equip Multi-Tool', 53, false, false, false, 'multi-tool') // 5
    ],
    [
      scHotkey('FPS Scrape Fill', 1, false, false, false, 'wrench'), // Left Mouse
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
      scHotkey('Exit Seat', 89, false, false, false, 'log-out'), // Y (HOLD)
      scHotkey('Emergency Exit', 85, false, false, true, 'eject'), // U + Left Shift
      scHotkey('Port Lock Toggle', 75, false, true, false, 'lock'), // Right Alt + K
      scHotkey('Look Behind', 188, false, false, false, 'eye') // Comma
    ],
    [
      scHotkey('Flight Ready', 82, false, true, false, 'power'), // Right Alt + R
      scHotkey('Autoland', 78, false, false, false, 'auto'), // N (HOLD)
      scHotkey('Request Landing', 78, false, true, false, 'radio'), // Left Alt + N
      scHotkey('VTOL Mode', 75, false, false, false, 'helicopter'), // K
      scHotkey('Request Docking', 78, false, false, false, 'dock') // N (After target)
    ],
    [
      scHotkey('Landing Gear', 78, false, false, false, 'landing-pad'), // N
      scHotkey('Invoke Docking', 78, false, false, false, 'link'), // N (HOLD)
      scHotkey('Headlights', 76, false, false, false, 'lightbulb'), // L
      scHotkey('Docking Camera', 48, false, false, false, 'camera'), // 0
      null
    ]
  ]
});

// FLIGHT MOVEMENT
const flightMovementProfile = profile({
  name: 'Flight Movement',
  icon: 'airplane',
  actions: [
    [
      back(),
      scHotkey('Throttle Down', 83, false, false, false, 'chevron-down'), // S
      scHotkey('Strafe Left', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Strafe Right', 68, false, false, false, 'arrow-right'), // D
      scHotkey('Strafe Up', 32, false, false, false, 'arrow-up') // Spacebar
    ],
    [
      scHotkey('Throttle Up', 87, false, false, false, 'chevron-up'), // W
      scHotkey('Roll Left', 81, false, false, false, 'rotate-ccw'), // Q
      scHotkey('Roll Right', 69, false, false, false, 'rotate-cw'), // E
      scHotkey('Lock Pitch & Yaw', 16, true, false, false, 'lock'), // Right Shift
      scHotkey('Boost', 16, false, false, false, 'zap') // Left Shift (HOLD)
    ],
    [
      scHotkey('Strafe Down', 17, false, false, false, 'arrow-down'), // Left Ctrl
      scHotkey('Decouple Toggle', 67, false, false, false, 'unlink'), // C (HOLD)
      scHotkey('Cruise Toggle', 67, false, true, false, 'cruise'), // Left Alt + C
      scHotkey('Spacebreak', 88, false, false, false, 'brake-lights'), // X
      null
    ]
  ]
});

// FLIGHT ADVANCED
const flightAdvancedProfile = profile({
  name: 'Flight Advanced',
  icon: 'plane-2',
  actions: [
    [
      back(),
      scHotkey('Quantum Mode', 66, false, false, false, 'zap'), // B (HOLD)
      scHotkey('Request Jump', 1, false, false, false, 'fast-forward'), // Left Mouse (LONG)
      scHotkey('Engage Quantum', 1, false, false, false, 'rocket'), // Left Mouse (HOLD)
      scHotkey('Eject', 89, false, true, false, 'eject') // Right Alt + Y
    ],
    [
      scHotkey('Next Operator Mode', 4, false, false, false, 'refresh'), // Middle Mouse
      scHotkey('Speed Limiter Down', 0, false, true, false, 'minus'), // Left Alt + Wheel Down
      scHotkey('Accel Limiter Up', 0, false, true, false, 'arrow-up'), // Right Alt + Wheel Up
      scHotkey('Accel Limiter Down', 0, false, true, false, 'arrow-down'), // Right Alt + Wheel Down
      scHotkey('Hail Target', 57, false, false, false, 'radio') // 9
    ],
    [
      scHotkey('Speed Limiter Up', 0, false, true, false, 'plus'), // Left Alt + Wheel Up
      scHotkey('Mining Mode', 77, false, false, false, 'pickaxe'), // M
      scHotkey('Cycle Config', 75, false, true, false, 'settings'), // Alt + K
      scHotkey('Scan Mode', 86, false, false, false, 'search'), // V
      null
    ]
  ]
});

// ===== COMBAT & TARGETING =====

// TARGETING BASIC
const targetingBasicProfile = profile({
  name: 'Targeting Basic',
  icon: 'target',
  actions: [
    [
      back(),
      scHotkey('Cycle In View', 84, false, false, false, 'eye'), // T
      scHotkey('Cycle Attackers', 52, false, false, false, 'sword'), // 4
      scHotkey('Cycle Hostiles', 53, false, false, false, 'skull'), // 5
      scHotkey('Cycle Friendlies', 54, false, false, false, 'heart') // 6
    ],
    [
      scHotkey('Auto Target Toggle', 84, false, false, false, 'target'), // T (LONG)
      scHotkey('Sub Target Cycle', 82, false, false, false, 'layers'), // R
      scHotkey('Reset To Main', 82, false, true, false, 'refresh'), // Left Alt + R
      scHotkey('Unlock Target', 84, false, true, false, 'unlock'), // Left Alt + T
      scHotkey('Look Ahead', 76, false, true, false, 'eye') // Left Alt + L
    ],
    [
      scHotkey('Cycle All', 55, false, false, false, 'users'), // 7
      null,
      null,
      null,
      null
    ]
  ]
});

// TARGETING ADVANCED
const targetingAdvancedProfile = profile({
  name: 'Targeting Advanced',
  icon: 'target-2',
  actions: [
    [
      back(),
      scHotkey('Pin Target 2', 50, false, false, false, 'pin'), // 2
      scHotkey('Pin Target 3', 51, false, false, false, 'pin'), // 3
      scHotkey('Remove All Pins', 48, false, false, false, 'x'), // 0
      scHotkey('Pin Selected 1', 49, false, true, false, 'pin') // Left Alt + 1
    ],
    [
      scHotkey('Pin Target 1', 49, false, false, false, 'pin'), // 1
      scHotkey('Pin Selected 3', 51, false, true, false, 'pin'), // Left Alt + 3
      scHotkey('Precision Target', 2, false, false, false, 'target'), // Right Mouse
      scHotkey('Precision Zoom', 2, false, false, false, 'zoom'), // Right Mouse (HOLD)
      scHotkey('Cycle Tracking', 2, false, true, false, 'refresh') // Right Alt + Right Mouse
    ],
    [
      scHotkey('Pin Selected 2', 50, false, true, false, 'pin'), // Left Alt + 2
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
      scHotkey('Toggle Mouse Mode', 81, false, false, false, 'mouse'), // Q
      scHotkey('Recenter Turret', 67, false, false, false, 'center'), // C (HOLD)
      scHotkey('Exit Remote Turret', 89, false, false, false, 'log-out'), // Y (HOLD)
      scHotkey('Change Position', 83, false, false, false, 'switch') // S
    ],
    [
      scHotkey('Gyro Stabilization', 69, false, false, false, 'compass'), // E
      scHotkey('Previous Turret', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Next Turret', 68, false, false, false, 'arrow-right'), // D
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
      scHotkey('Missile Mode', 4, false, false, false, 'crosshair'), // Mouse Button 3
      scHotkey('Launch Missiles', 1, false, false, false, 'rocket'), // Left Mouse (TAP)
      scHotkey('Dumbfire Missile', 1, false, false, false, 'target'), // Left Mouse Click
      scHotkey('Cycle Missile Type', 0, false, false, false, 'refresh') // Scroll Wheel
    ],
    [
      scHotkey('Fire Weapons', 1, false, false, false, 'crosshair'), // Left Mouse
      scHotkey('Reset Armed', 71, false, true, false, 'refresh'), // Left Alt + G
      scHotkey('Toggle Impact Point', 66, false, true, false, 'target'), // Left Alt + B (TAP)
      scHotkey('Next Weapon', 0, false, false, false, 'chevron-down'), // Wheel Down
      scHotkey('Previous Weapon', 0, false, false, false, 'chevron-up') // Wheel Up
    ],
    [
      scHotkey('Increase Armed', 71, false, false, false, 'plus'), // G
      scHotkey('Cycle Gimbal', 71, false, false, false, 'refresh'), // G (Long Press)
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
      scHotkey('Decoy Set Launch', 72, false, false, false, 'shield-check'), // H (HOLD)
      scHotkey('Increase Burst', 72, false, true, false, 'plus'), // Right Alt + H
      scHotkey('Decrease Burst', 72, false, true, false, 'minus'), // Left Alt + H
      scHotkey('Noise Deploy', 74, false, false, false, 'volume-x') // J
    ],
    [
      scHotkey('Decoy Burst', 72, false, false, false, 'shield'), // H (TAP)
      scHotkey('Set Q Jammers', 0, false, false, false, 'radio-off'), // No Default
      scHotkey('Set Q Snares', 0, false, false, false, 'net'), // No Default
      scHotkey('Set QIDs', 0, false, false, false, 'crosshair'), // No Default
      scHotkey('Set EMPs', 0, false, false, false, 'zap') // No Default
    ]
  ]
});

// ===== POWER & SYSTEMS =====

// POWER WEAPONS
const powerWeaponsProfile = profile({
  name: 'Power Weapons',
  icon: 'battery',
  actions: [
    [
      back(),
      scHotkey('Power Weapons Max', 116, false, false, false, 'gun'), // F5 (HOLD)
      scHotkey('Power Weapons -', 116, false, true, false, 'gun'), // Left Alt + F5
      scHotkey('Power Weapons Min', 116, false, true, false, 'gun'), // Left Alt + F5 (HOLD)
      scHotkey('Weapons Toggle', 80, false, false, false, 'gun') // P
    ],
    [
      scHotkey('Power Weapons +', 116, false, false, false, 'gun'), // F5
      scHotkey('Power Engines Max', 117, false, false, false, 'engine'), // F6 (HOLD)
      scHotkey('Power Engines -', 117, false, true, false, 'engine'), // Left Alt + F6
      scHotkey('Power Engines Min', 117, false, true, false, 'engine'), // Left Alt + F6 (HOLD)
      scHotkey('Thrusters Toggle', 73, false, false, false, 'engine') // I
    ],
    [
      scHotkey('Power Engines +', 117, false, false, false, 'engine'), // F6
      null,
      null,
      null,
      null
    ]
  ]
});

// POWER SHIELDS
const powerShieldsProfile = profile({
  name: 'Power Shields',
  icon: 'shield-2',
  actions: [
    [
      back(),
      scHotkey('Power Shields Max', 118, false, false, false, 'shield'), // F7 (HOLD)
      scHotkey('Power Shields -', 118, false, true, false, 'shield'), // Left Alt + F7
      scHotkey('Power Shields Min', 118, false, true, false, 'shield'), // Left Alt + F7 (HOLD)
      scHotkey('Shield Toggle', 79, false, false, false, 'shield') // O
    ],
    [
      scHotkey('Power Shields +', 118, false, false, false, 'shield'), // F7
      scHotkey('Reset Assignments', 119, false, false, false, 'refresh'), // F8
      scHotkey('Decrease Throttle', 120, false, false, false, 'minus'), // F9
      scHotkey('Increase Throttle', 121, false, false, false, 'plus'), // F10
      scHotkey('Power Toggle All', 85, false, false, false, 'power') // U
    ]
  ]
});

// ===== PERSONAL CONTROLS =====

// ON FOOT MOVEMENT
const onFootMovementProfile = profile({
  name: 'On Foot Movement',
  icon: 'user',
  actions: [
    [
      back(),
      scHotkey('Move Left', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Move Backward', 83, false, false, false, 'arrow-down'), // S
      scHotkey('Move Right', 68, false, false, false, 'arrow-right'), // D
      scHotkey('Sprint', 16, false, false, false, 'zap') // Left Shift
    ],
    [
      scHotkey('Move Forward', 87, false, false, false, 'arrow-up'), // W
      scHotkey('Crouch', 67, false, false, false, 'down'), // C
      scHotkey('Prone', 17, false, false, false, 'minus'), // Left Ctrl
      scHotkey('Lean Left', 81, false, false, false, 'lean-left'), // Q
      scHotkey('Lean Right', 69, false, false, false, 'lean-right') // E
    ],
    [
      scHotkey('Jump', 32, false, false, false, 'jump'), // Spacebar
      scHotkey('Helmet Toggle', 72, false, true, false, 'hard-hat'), // Right Alt + H
      scHotkey('Wipe Visor', 88, false, true, false, 'droplets'), // Left Alt + X
      scHotkey('Suit Light', 84, false, false, false, 'flashlight'), // T
      null
    ]
  ]
});

// ON FOOT WEAPONS
const onFootWeaponsProfile = profile({
  name: 'On Foot Weapons',
  icon: 'rifle',
  actions: [
    [
      back(),
      scHotkey('Secondary Weapon', 50, false, false, false, 'pistol'), // 2
      scHotkey('Sidearm', 51, false, false, false, 'gun'), // 3
      scHotkey('Right Side Tool', 86, false, false, false, 'pocket'), // V
      scHotkey('ADS', 2, false, false, false, 'crosshair') // Right Mouse
    ],
    [
      scHotkey('Primary Weapon', 49, false, false, false, 'rifle'), // 1
      scHotkey('Reload Primary', 82, false, false, false, 'refresh'), // R
      scHotkey('Reload Secondary', 66, false, true, false, 'refresh'), // Left Alt + B
      scHotkey('Fire Mode', 66, false, false, false, 'target'), // B
      scHotkey('Customize Weapon', 74, false, false, false, 'settings') // J
    ],
    [
      scHotkey('Hold Breath', 16, false, false, false, 'wind'), // Left Shift
      scHotkey('Holster Weapon', 82, false, false, false, 'pocket'), // R (HOLD)
      null,
      null,
      null
    ]
  ]
});

// ON FOOT EQUIPMENT
const onFootEquipmentProfile = profile({
  name: 'On Foot Equipment',
  icon: 'backpack',
  actions: [
    [
      back(),
      scHotkey('Gadget/Tool', 53, false, false, false, 'tool'), // 5
      scHotkey('Utility Item', 54, false, false, false, 'package'), // 6
      scHotkey('Throwable Wheel', 71, false, false, false, 'bomb'), // G (HOLD)
      scHotkey('Personal Inventory', 73, false, false, false, 'backpack') // I
    ],
    [
      scHotkey('Med/Oxy Pen', 52, false, false, false, 'syringe'), // 4
      scHotkey('PIT Wheel Menu', 70, false, false, false, 'circle'), // F + Right Mouse
      scHotkey('Focus', 4, false, false, false, 'focus'), // Mouse Button 3
      scHotkey('Force Respawn', 8, false, false, false, 'refresh-cw'), // Backspace (HOLD)
      scHotkey('Request Rescue', 77, false, false, false, 'heart-pulse') // M (HOLD)
    ],
    [
      scHotkey('Interaction Mode', 70, false, false, false, 'hand'), // F
      null,
      null,
      null,
      null
    ]
  ]
});

// MELEE COMBAT
const meleeProfile = profile({
  name: 'Melee Combat',
  icon: 'sword',
  actions: [
    [
      back(),
      scHotkey('Select Knife', 86, false, false, false, 'knife'), // V
      scHotkey('Light Attack Left', 1, false, false, false, 'fist'), // Left Mouse
      scHotkey('Light Attack Right', 2, false, false, false, 'fist'), // Right Mouse
      scHotkey('Heavy Attack Left', 1, false, false, false, 'sword') // Left Mouse (HOLD)
    ],
    [
      scHotkey('Unarmed Combat', 54, false, false, false, 'hand'), // 6
      scHotkey('Takedown/Bunt', 4, false, false, false, 'skull'), // Middle Mouse (HOLD)
      scHotkey('Block', 0, false, false, false, 'shield'), // Both Mouse (HOLD)
      scHotkey('Dodge Left', 65, false, false, false, 'arrow-left'), // Double Tap A
      scHotkey('Dodge Right', 68, false, false, false, 'arrow-right') // Double Tap D
    ],
    [
      scHotkey('Heavy Attack Right', 2, false, false, false, 'sword'), // Right Mouse (HOLD)
      scHotkey('Dodge Back', 83, false, false, false, 'arrow-down'), // Double Tap S
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
      scHotkey('Drive Backward', 83, false, false, false, 'arrow-down'), // S
      scHotkey('Turn Left', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Turn Right', 68, false, false, false, 'arrow-right'), // D
      scHotkey('Break', 88, false, false, false, 'brake-lights') // X
    ],
    [
      scHotkey('Drive Forward', 87, false, false, false, 'arrow-up'), // W
      scHotkey('Vehicle Light', 76, false, false, false, 'lightbulb'), // L
      scHotkey('Vehicle Boost', 16, false, false, false, 'zap'), // Left Shift
      scHotkey('Toggle Break Idle', 67, false, false, false, 'brake-lights'), // C
      scHotkey('Systems Ready', 82, false, true, false, 'power') // Right Alt + R
    ],
    [
      scHotkey('Horn', 32, false, false, false, 'horn'), // Spacebar
      scHotkey('Roll Left', 81, false, false, false, 'rotate-ccw'), // Q
      scHotkey('Retract Turret', 80, false, false, false, 'arrow-down'), // P
      scHotkey('Roll Right', 69, false, false, false, 'rotate-cw'), // E
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
      scHotkey('EVA Break', 88, false, false, false, 'brake-lights'), // X
      scHotkey('Strafe Up', 32, false, false, false, 'arrow-up'), // Spacebar
      scHotkey('Strafe Down', 17, false, false, false, 'arrow-down'), // Ctrl
      scHotkey('Strafe Left', 65, false, false, false, 'arrow-left') // A
    ],
    [
      scHotkey('EVA Boost', 16, false, false, false, 'zap'), // Left Shift
      scHotkey('Strafe Forward', 87, false, false, false, 'arrow-up'), // W
      scHotkey('Strafe Backward', 83, false, false, false, 'arrow-down'), // S
      scHotkey('Roll Left', 81, false, false, false, 'rotate-ccw'), // Q
      scHotkey('Roll Right', 69, false, false, false, 'rotate-cw') // E
    ],
    [
      scHotkey('Strafe Right', 68, false, false, false, 'arrow-right'), // D
      scHotkey('Traversal Launch', 32, false, false, false, 'rocket'), // Spacebar
      scHotkey('Traversal Detach', 89, false, false, false, 'unlink'), // Y
      scHotkey('Freelook', 90, false, false, false, 'eye'), // Z
      null
    ]
  ]
});

// ===== UTILITIES & INTERFACE =====

// GENERAL INTERFACE
const generalProfile = profile({
  name: 'General Interface',
  icon: 'settings',
  actions: [
    [
      back(),
      scHotkey('Mobiglas', 112, false, false, false, 'tablet'), // F1
      scHotkey('Cycle Camera', 115, false, false, false, 'camera'), // F4
      scHotkey('CommLink', 122, false, false, false, 'message-circle'), // F11
      scHotkey('Chat', 123, false, false, false, 'message-square') // F12
    ],
    [
      scHotkey('Pause/Options', 27, false, false, false, 'menu'), // ESC
      scHotkey('Console', 192, false, false, false, 'terminal'), // ~ (TILDE)
      scHotkey('Activate Chat', 13, false, false, false, 'type'), // Enter
      scHotkey('3rd Person Camera', 115, false, false, false, 'camera'), // F4
      scHotkey('Freelook', 90, false, false, false, 'eye') // Z (HOLD)
    ],
    [
      scHotkey('Chat Cycle', 9, false, false, false, 'tab'), // TAB
      scHotkey('Self Destruct', 8, false, false, false, 'bomb'), // Backspace (HOLD)
      null,
      null,
      null
    ]
  ]
});

// FOIP & VOICE
const foipProfile = profile({
  name: 'FOIP & Voice',
  icon: 'camera-video',
  actions: [
    [
      back(),
      scHotkey('Selfie Mode', 109, false, false, false, 'camera-selfie'), // - (Numpad)
      scHotkey('Head Tracking', 111, false, false, false, 'user-check'), // / (Numpad)
      scHotkey('Audio Channels', 110, false, false, false, 'headphones'), // . (Numpad)
      scHotkey('Push To Talk', 107, false, false, false, 'microphone') // + (Numpad)
    ],
    [
      scHotkey('Camera Calibrate', 106, false, false, false, 'camera'), // * (Numpad)
      scHotkey('PTT Proximity', 107, false, true, false, 'microphone-off'), // Left Alt + + (Numpad)
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
      scHotkey('Activate Ping', 9, false, false, false, 'radio'), // TAB
      scHotkey('Activate Scanning', 1, false, false, false, 'scan'), // Left Mouse
      scHotkey('Increase Angle', 0, false, false, false, 'zoom-out'), // Wheel Up
      scHotkey('Decrease Angle', 0, false, false, false, 'zoom-in') // Wheel Down
    ],
    [
      scHotkey('Scanning Mode', 86, false, false, false, 'search'), // V
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
      scHotkey('Cycle Back', 81, false, true, false, 'chevron-left'), // Left Alt + Q
      scHotkey('Cycle Forward', 69, false, true, false, 'chevron-right'), // Left Alt + E
      null,
      null
    ]
  ]
});

// COMBAT EMOTES
const combatEmotesProfile = profile({
  name: 'Combat Emotes',
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
      scHotkey('Cancel Route', 67, false, false, false, 'x'), // C
      scHotkey('Step Back', 52, false, false, false, 'arrow-left'), // 4
      scHotkey('Go To Selection', 51, false, false, false, 'arrow-right'), // 3
      scHotkey('My Location', 50, false, false, false, 'map-pin') // 2
    ],
    [
      scHotkey('Set Route', 82, false, false, false, 'route'), // R (After click)
      scHotkey('Full/Cross View', 90, false, false, false, 'layers'), // Z
      scHotkey('Local Map', 49, false, false, false, 'map'), // 1
      null,
      null
    ]
  ]
});

// ARENA COMMANDER
const arenaProfile = profile({
  name: 'Arena Commander',
  icon: 'gamepad',
  actions: [
    [
      back(),
      scHotkey('Spec Cam Previous', 1, false, false, false, 'chevron-left'), // Left Mouse
      scHotkey('Spec Cam Lock', 49, false, false, false, 'lock'), // 1
      scHotkey('Spec Cam Zoom', 0, false, false, false, 'zoom'), // Mouse Wheel
      scHotkey('Spec Cam HUD', 66, false, false, false, 'monitor') // B
    ],
    [
      scHotkey('Spec Cam Next', 2, false, false, false, 'chevron-right'), // Right Mouse
      scHotkey('Spec Cam Mode', 115, false, false, false, 'camera'), // F4
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