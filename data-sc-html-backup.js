/**
 * @fileoverview Star Citizen 4.1.1/4.1.2 Complete Keybinds Profile for Stream Deck
 * VERSION OFFICIELLE - Basée sur sc-binding.csv (102 commandes avec bindings par défaut)
 * Mise à jour: Généré automatiquement depuis les bindings officiels
 */

const { hotkey, action, back, nextPage, previousPage } = require('./lib/actions');
const { profileId } = require('./lib/ids');
const { profile } = require('./lib/profile');

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

// =====================================================
// FLIGHT CONTROL PROFILES
// =====================================================

const flightMovementProfile = profile({
  name: 'Flight\nMovement',
  icon: 'airplane',
  actions: [
    [
      back(),
      scHotkey('Throttle\nUp', 87, false, false, false, 'chevron-up'), // W
      scHotkey('Throttle\nDown', 83, false, false, false, 'chevron-down'), // S
      scHotkey('Strafe\nLeft', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Strafe\nRight', 68, false, false, false, 'arrow-right'), // D
    ],
    [
      nextPage(),
      scHotkey('Strafe\nUp', 32, false, false, false, 'arrow-up'), // Spacebar
      scHotkey('Strafe\nDown', 17, false, false, false, 'arrow-down'), // L Ctrl
      scHotkey('Roll\nLeft', 81, false, false, false, 'rotate-left'), // Q
      scHotkey('Roll\nRight', 69, false, false, false, 'rotate-right'), // E
    ],
    [
      scHotkey('Boost', 16, false, false, false, 'rocket'), // L Shift
      scHotkey('Spacebrake', 88, false, false, false, 'hand'), // X
      scHotkey('Decouple\nMode', 67, false, false, false, 'unlink'), // C
      scHotkey('Cruise\nMode', 67, false, true, false, 'cruise-control'), // L Alt + C
      scHotkey('Landing\nSystem', 78, false, false, false, 'plane-arrival'), // N
    ]
  ]
});

const flightAssistsProfile = profile({
  name: 'Flight\nAssists',
  icon: 'shield-check',
  actions: [
    [
      back(),
      scHotkey('G-Force\nSafety', 71, false, false, false, 'gauge'), // G (DT)
      scHotkey('ESP\nToggle', 88, false, false, false, 'shield'), // X (DT)
      scHotkey('VTOL\nToggle', 75, false, false, false, 'helicopter'), // K
      scHotkey('Configuration\nCycle', 75, false, true, false, 'settings'), // L Alt + K
    ],
    [
      scHotkey('Master Mode\nCycle', 66, false, false, false, 'toggle-switch'), // B
      scHotkey('Request\nLanding', 78, false, true, false, 'tower-control'), // L Alt + N
      scHotkey('Autoland', 78, false, false, false, 'plane-arrival'), // N (Hold)
      scHotkey('Request\nCargo', 78, true, false, false, 'package'), // R Alt + N
      scHotkey('Flight\nReady', 82, true, false, false, 'checkmark'), // R Alt + R
    ],
    [
      scHotkey('Gimbal\nCycle', 71, false, false, false, 'target'), // G
      null,
      null,
      null,
      null
    ]
  ]
});

// =====================================================
// WEAPONS & TARGETING PROFILES
// =====================================================

const weaponsProfile = profile({
  name: 'Weapons\n& Targeting',
  icon: 'target',
  actions: [
    [
      back(),
      scHotkey('Fire\nWeapons', 1000, false, false, false, 'zap'), // LMB
      scHotkey('ADS\nToggle', 1001, false, false, false, 'eye'), // RMB
      scHotkey('Gimbal\nCycle', 71, false, false, false, 'crosshairs'), // G
      scHotkey('Weapon\nNext', 1003, false, false, false, 'chevron-right'), // Mouse Wheel Down
    ],
    [
      scHotkey('Weapon\nPrevious', 1004, false, false, false, 'chevron-left'), // Mouse Wheel Up
      scHotkey('Lead/Lag\nPIPs', 88, false, true, false, 'bullseye'), // L/R Alt + X
      scHotkey('PIP\nCombination', 191, false, false, false, 'circle-dot'), // /
      scHotkey('PIP\nPrecision', 190, false, false, false, 'circle'), // Period
      scHotkey('PIP\nFading', 188, false, false, false, 'fade'), // Comma
    ],
    [
      scHotkey('Manual\nGimbal', 71, false, true, false, 'move'), // L Alt + G
      scHotkey('Lock Aim\nVector', 71, true, false, false, 'lock'), // R Alt + G
      null,
      null,
      null
    ]
  ]
});

const missilesProfile = profile({
  name: 'Missiles\n& Ordnance',
  icon: 'rocket',
  actions: [
    [
      back(),
      scHotkey('Launch\nMissiles', 1000, false, false, false, 'rocket'), // LMB
      scHotkey('Missile\nNext', 1003, false, false, false, 'chevron-right'), // Mouse Wheel Down
      scHotkey('Missile\nPrevious', 1004, false, false, false, 'chevron-left'), // Mouse Wheel Up
      scHotkey('Armed\nIncrease', 71, false, false, false, 'plus'), // G
    ],
    [
      scHotkey('Armed\nReset', 71, false, true, false, 'refresh'), // L Alt + G
      scHotkey('Bomb\nTarget', 66, false, true, false, 'target'), // L Alt + B
      scHotkey('Cinematic\nCamera', 17, false, false, true, 'video'), // L Ctrl
      null,
      null
    ]
  ]
});

// =====================================================
// POWER & SYSTEMS PROFILES
// =====================================================

const powerManagementProfile = profile({
  name: 'Power\nManagement',
  icon: 'battery',
  actions: [
    [
      back(),
      scHotkey('Power\nAll', 85, false, false, false, 'power'), // U
      scHotkey('Thrusters\nPower', 73, false, false, false, 'rocket'), // I
      scHotkey('Shields\nPower', 79, false, false, false, 'shield'), // O
      scHotkey('Weapons\nPower', 80, false, false, false, 'zap'), // P
    ],
    [
      scHotkey('Engines\nIncrease', 118, false, false, false, 'chevron-up'), // F6
      scHotkey('Engines\nDecrease', 118, false, true, false, 'chevron-down'), // F6 + L Alt
      scHotkey('Shields\nIncrease', 119, false, false, false, 'shield-plus'), // F7
      scHotkey('Shields\nDecrease', 119, false, true, false, 'shield-minus'), // F7 + L Alt
      scHotkey('Weapons\nIncrease', 117, false, false, false, 'zap-plus'), // F5
    ],
    [
      scHotkey('Weapons\nDecrease', 117, false, true, false, 'zap-minus'), // F5 + L Alt
      scHotkey('Reset\nAssignments', 120, false, false, false, 'refresh'), // F8
      null,
      null,
      null
    ]
  ]
});

const shieldsProfile = profile({
  name: 'Shields\n& Defense',
  icon: 'shield',
  actions: [
    [
      back(),
      scHotkey('Decoy\nLaunch', 72, false, false, false, 'sparkles'), // H
      scHotkey('Decoy\nIncrease', 72, true, false, false, 'plus'), // R Alt + H
      scHotkey('Decoy\nDecrease', 72, false, true, false, 'minus'), // L Alt + H
      scHotkey('Noise\nDeploy', 74, false, false, false, 'radio'), // J
    ],
    [
      scHotkey('Shield\nReset', 96, false, false, false, 'refresh'), // Numpad 0
      null,
      null,
      null,
      null
    ]
  ]
});

// =====================================================
// SHIP OPERATIONS PROFILES
// =====================================================

const shipOperationsProfile = profile({
  name: 'Ship\nOperations',
  icon: 'cog',
  actions: [
    [
      back(),
      scHotkey('Emergency\nExit', 85, false, false, true, 'log-out'), // U + L Shift
      scHotkey('Eject', 89, true, false, false, 'eject'), // R Alt + Y
      scHotkey('Mining\nMode', 77, false, false, false, 'pickaxe'), // M
      scHotkey('Salvage\nMode', 77, false, false, false, 'recycle'), // M
    ],
    [
      scHotkey('Scanning\nMode', 86, false, false, false, 'search'), // V
      scHotkey('Next\nOperator', 1001, false, false, false, 'chevron-right'), // Button 3
      scHotkey('Self\nDestruct', 8, false, false, false, 'bomb'), // Backspace
      null,
      null
    ]
  ]
});

const cockpitProfile = profile({
  name: 'Cockpit\n& Doors',
  icon: 'door-open',
  actions: [
    [
      back(),
      scHotkey('Port Lock\nToggle', 75, true, false, false, 'lock'), // R Alt + K
      scHotkey('Cooler Rate\nIncrease', 82, true, false, false, 'snowflake'), // R Alt + R
      scHotkey('Cooler Rate\nDecrease', 82, false, true, false, 'snowflake'), // L Alt + R
      null
    ]
  ]
});

// =====================================================
// INTERFACE & HUD PROFILES
// =====================================================

const hudInterfaceProfile = profile({
  name: 'HUD\n& Interface',
  icon: 'monitor',
  actions: [
    [
      back(),
      scHotkey('MobiGlass', 112, false, false, false, 'tablet'), // F1
      scHotkey('Scoreboard', 112, false, false, false, 'list'), // F1
      scHotkey('Map', 113, false, false, false, 'map'), // F2
      scHotkey('Wipe\nVisor', 88, false, true, false, 'droplet'), // L Alt + X
    ],
    [
      scHotkey('Headlights', 76, false, false, false, 'lightbulb'), // L
      scHotkey('Freelook', 90, false, false, false, 'eye'), // Z (Hold)
      scHotkey('Zoom In', 1003, false, false, false, 'zoom-in'), // Mouse Wheel Up
      null,
      null
    ]
  ]
});

const cameraViewProfile = profile({
  name: 'Camera\n& View',
  icon: 'camera',
  actions: [
    [
      back(),
      scHotkey('Cycle\nCamera', 115, false, false, false, 'camera'), // F4
      scHotkey('Zoom In', 1003, false, false, false, 'zoom-in'), // Mouse Wheel Up
      scHotkey('Zoom Out', 1004, false, false, false, 'zoom-out'), // Mouse Wheel Down
      scHotkey('Freelook', 90, false, false, false, 'eye'), // Z (Hold)
    ],
    [
      scHotkey('Dynamic\nZoom', 90, false, false, false, 'search'), // Z
      scHotkey('ADS\nToggle', 1001, false, false, false, 'crosshairs'), // RMB
      scHotkey('ADS Max\nZoom', 1001, false, false, false, 'zoom-in'), // RMB (Hold)
      scHotkey('ADS\nTracking', 1001, true, false, false, 'move'), // R Alt + RMB
      scHotkey('Look\nBehind', 188, false, false, false, 'eye-slash'), // Comma
    ]
  ]
});

// =====================================================
// GROUND/FPS PROFILES
// =====================================================

const groundMovementProfile = profile({
  name: 'Ground\nMovement',
  icon: 'user',
  actions: [
    [
      back(),
      scHotkey('Forward', 87, false, false, false, 'arrow-up'), // W
      scHotkey('Backward', 83, false, false, false, 'arrow-down'), // S
      scHotkey('Strafe Left', 65, false, false, false, 'arrow-left'), // A
      scHotkey('Strafe Right', 68, false, false, false, 'arrow-right'), // D
    ],
    [
      scHotkey('Jump', 32, false, false, false, 'arrow-up'), // Spacebar
      scHotkey('Crouch', 67, false, false, false, 'arrow-down'), // C
      scHotkey('Prone', 88, false, false, false, 'user-minus'), // X
      scHotkey('Sprint', 16, false, false, false, 'zap'), // L Shift
      scHotkey('Walk', 18, false, false, false, 'user'), // L Alt
    ]
  ]
});

const socialProfile = profile({
  name: 'Social\n& Comm',
  icon: 'users',
  actions: [
    [
      back(),
      scHotkey('Accept\nYes', 89, false, false, false, 'check'), // Y
      scHotkey('Decline\nNo', 78, false, false, false, 'x'), // N
      scHotkey('Chat\nGeneral', 13, false, false, false, 'message-circle'), // Enter
      scHotkey('Push to\nTalk', 84, false, false, false, 'mic'), // T
    ],
    [
      scHotkey('Salute', 116, false, false, false, 'salute'), // F5
      scHotkey('Wave', 117, false, false, false, 'hand-wave'), // F6
      scHotkey('Thumbs Up', 118, false, false, false, 'thumbs-up'), // F7
      scHotkey('Point', 119, false, false, false, 'hand-pointer'), // F8
      scHotkey('Sit', 120, false, false, false, 'chair'), // F9
    ]
  ]
});

const mfdProfile = profile({
  name: 'MFD\nControls',
  icon: 'monitor',
  actions: [
    [
      back(),
      scHotkey('MFD Power', 112, false, false, false, 'power'), // F1
      scHotkey('MFD 1', 113, false, false, false, 'monitor'), // F2
      scHotkey('MFD 2', 114, false, false, false, 'monitor'), // F3
      scHotkey('MFD 3', 115, false, false, false, 'monitor'), // F4
    ],
    [
      scHotkey('Interact\nMode', 70, false, false, false, 'hand'), // F
      scHotkey('Inner\nThought', 70, false, true, false, 'circle'), // Alt + F
      scHotkey('Use Item', 71, false, false, false, 'tool'), // G
      scHotkey('Holster', 82, false, false, false, 'pocket'), // R
      scHotkey('Inventory', 73, false, false, false, 'package'), // I
    ]
  ]
});

const industryProfile = profile({
  name: 'Industry\n& Mining',
  icon: 'pickaxe',
  actions: [
    [
      back(),
      scHotkey('Mining\nMode', 77, false, false, false, 'pickaxe'), // M
      scHotkey('Mining\nLaser', 1000, false, false, false, 'zap'), // LMB
      scHotkey('Extract\nMode', 69, false, false, false, 'download'), // E
      scHotkey('Tractor\nBeam', 84, false, false, false, 'magnet'), // T
    ],
    [
      scHotkey('Salvage\nMode', 77, false, false, false, 'recycle'), // M
      scHotkey('Salvage\nBeam', 1000, false, false, false, 'zap'), // LMB
      scHotkey('Cargo\nLoad', 78, true, false, false, 'package'), // R Alt + N
      scHotkey('Cargo\nDrop', 71, false, false, false, 'package-x'), // G
      scHotkey('Refinery', 82, false, false, false, 'flask'), // R
    ]
  ]
});

const targetingProfile = profile({
  name: 'Targeting\nSystem',
  icon: 'crosshairs',
  actions: [
    [
      back(),
      scHotkey('Target\nAhead', 84, false, false, false, 'target'), // T
      scHotkey('Pin Target', 80, false, false, false, 'pin'), // P
      scHotkey('Cycle\nTargets', 84, false, false, false, 'repeat'), // T
      scHotkey('Target\nNearest', 89, false, false, false, 'crosshairs'), // Y
    ],
    [
      scHotkey('Sub Target', 85, false, false, false, 'focus'), // U
      scHotkey('Lock Target', 76, false, false, false, 'lock'), // L
      scHotkey('Clear\nTarget', 27, false, false, false, 'x-circle'), // Escape
      scHotkey('Target\nHostile', 72, false, false, false, 'alert-triangle'), // H
      scHotkey('Target\nFriendly', 70, false, false, false, 'shield'), // F
    ]
  ]
});

// =====================================================
// SPECIALIZED OPERATIONS PROFILES
// =====================================================

const scanningProfile = profile({
  name: 'Scanning\n& Radar',
  icon: 'radar',
  actions: [
    [
      back(),
      scHotkey('Activate\nPing', 9, false, false, false, 'wifi'), // Tab (Hold)
      scHotkey('Activate\nScanning', 1000, false, false, false, 'search'), // LMB
      scHotkey('Radar\nIncrease', 1003, false, false, false, 'plus'), // Mouse Wheel Up
      scHotkey('Radar\nDecrease', 1004, false, false, false, 'minus'), // Mouse Wheel Down
    ]
  ]
});

const dockingProfile = profile({
  name: 'Docking\n& Quantum',
  icon: 'link',
  actions: [
    [
      back(),
      scHotkey('Docking\nMode', 78, false, false, false, 'link'), // N
      scHotkey('Invoke\nDocking', 78, false, false, false, 'anchor'), // N (Hold)
      scHotkey('Docking\nCamera', 48, false, false, false, 'camera'), // 0
      scHotkey('Engage\nQuantum', 1000, false, false, false, 'zap'), // LMB (Hold)
    ],
    [
      scHotkey('Hail\nTarget', 57, false, false, false, 'phone'), // 9
      null,
      null,
      null,
      null
    ]
  ]
});

// =====================================================
// MAIN PROFILE STRUCTURE
// =====================================================

const starCitizenProfileP1 = profile({
  name: 'Star Citizen 4.1.1',
  icon: 'star-citizen',
  actions: [
    [
      folder(flightMovementProfile),
      folder(flightAssistsProfile),
      folder(weaponsProfile),
      folder(missilesProfile),
      folder(powerManagementProfile),
    ],
    [
      folder(shieldsProfile),
      folder(shipOperationsProfile),
      folder(cockpitProfile),
      folder(hudInterfaceProfile),
      folder(cameraViewProfile),
    ],
    [
      folder(scanningProfile),
      folder(dockingProfile),
      folder(groundMovementProfile),
      folder(socialProfile),
      nextPage()
    ],

  ]
});

const starCitizenProfilePage2 = profile({
  name: 'Star Citizen 4.1.1',
  icon: 'star-citizen',
  actions: [
    [
      previousPage(),
      folder(mfdProfile),
      folder(industryProfile),
      folder(targetingProfile),
      scHotkey('Emergency\nExit', 85, false, false, true, 'log-out'), // U + L Shift
    ],
    [
      scHotkey('Self\nDestruct', 8, false, false, false, 'bomb'), // Backspace
      scHotkey('Flight\nReady', 82, true, false, false, 'checkmark'), // R Alt + R
      scHotkey('MobiGlass', 112, false, false, false, 'tablet'), // F1
      scHotkey('Accept\nYes', 89, false, false, false, 'check'), // Y
      scHotkey('Decline\nNo', 78, false, false, false, 'x'), // N
    ]
  ]
})

module.exports = () => ({
  mainProfile: [starCitizenProfileP1, starCitizenProfilePage2],
  additionalProfiles: [
    starCitizenProfilePage2,
    flightMovementProfile,
    flightAssistsProfile,
    weaponsProfile,
    missilesProfile,
    powerManagementProfile,
    shieldsProfile,
    shipOperationsProfile,
    cockpitProfile,
    hudInterfaceProfile,
    cameraViewProfile,
    scanningProfile,
    dockingProfile,
    groundMovementProfile,
    socialProfile,
    mfdProfile,
    industryProfile,
    targetingProfile,
  ]
});
