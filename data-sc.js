/**
 * @fileoverview Star Citizen 4.1.1 Complete Stream Deck Profile - All Commands
 * COMPLETE VERSION - Generated from CSV binding files
 * Total commands: 408
 * Organized by category with all available keyboard bindings
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
 * All Star Citizen commands organized by category
 */
const allCommands = {
  // CAMERA Commands (35 total)
  CAMERA: [
      scHotkey('Spectator Camera Lock Target', 49, false, false, false, 'camera'),  // 1
      scHotkey('Spectator Camera HUD Toggle', 66, false, false, false, 'camera'),  // B
      scHotkey('Spectator Camera Mode Next', 115, false, false, false, 'camera'),  // F4
      scHotkey('Advanced Camera Controls Modifier Hold', 90, false, false, false, 'camera'),  // Z
      scHotkey('Save View 1', 49, false, false, false, 'camera'),  // Numpad 1
      scHotkey('Save View 2', 50, false, false, false, 'camera'),  // Numpad 2
      scHotkey('Save View 3', 51, false, false, false, 'camera'),  // Numpad 3
      scHotkey('Save View 4', 52, false, false, false, 'camera'),  // Numpad 4
      scHotkey('Save View 5', 53, false, false, false, 'camera'),  // Numpad 5
      scHotkey('Save View 6', 54, false, false, false, 'camera'),  // Numpad 6
      scHotkey('Save View 7', 55, false, false, false, 'camera'),  // Numpad 7
      scHotkey('Save View 8', 56, false, false, false, 'camera'),  // Numpad 8
      scHotkey('Save View 9', 57, false, false, false, 'camera'),  // Numpad 9
      scHotkey('Load View 1', 49, false, false, false, 'camera'),  // Numpad 1
      scHotkey('Load View 2', 50, false, false, false, 'camera'),  // Numpad 2
      scHotkey('Load View 3', 51, false, false, false, 'camera'),  // Numpad 3
      scHotkey('Load View 4', 52, false, false, false, 'camera'),  // Numpad 4
      scHotkey('Load View 5', 53, false, false, false, 'camera'),  // Numpad 5
      scHotkey('Load View 6', 54, false, false, false, 'camera'),  // Numpad 6
      scHotkey('Load View 7', 55, false, false, false, 'camera'),  // Numpad 7
      scHotkey('Load View 8', 56, false, false, false, 'camera'),  // Numpad 8
      scHotkey('Load View 9', 57, false, false, false, 'camera'),  // Numpad 9
      scHotkey('Z Offset Positive', 38, false, false, false, 'camera'),  // Page Up
      scHotkey('Z Offset Negative', 40, false, false, false, 'camera'),  // Page Down
      scHotkey('Decrease FoV', 189, false, false, false, 'camera'),  // Numpad -
      scHotkey('Increase DoF', 36, false, false, false, 'camera'),  // Home
      scHotkey('Decrease DoF', 35, false, false, false, 'camera'),  // End
      scHotkey('Reset Current View', 48, false, false, false, 'camera')  // Np 0
  ],

  // FLIGHT Commands (156 total)
  FLIGHT: [
      scHotkey('Emergency Exit Seat', 89, false, true, false, 'flight'),  // R Alt+Y
      scHotkey('Eject', 89, false, true, false, 'flight'),  // L Alt+Y
      scHotkey('Look Behind', 188, false, false, false, 'flight'),  // Comma
      scHotkey('Toggle Mining Operator Mode', 77, false, false, false, 'flight'),  // M
      scHotkey('Toggle Salvage Operator Mode', 77, false, false, false, 'flight'),  // M
      scHotkey('Toggle Scanning Operator Mode', 220, false, false, false, 'flight'),  // \
      scHotkey('Toggle Missile Operator Mode', 77, false, false, false, 'flight'),  // M
      scHotkey('Toggle Flight Operator Mode', 81, false, true, false, 'flight'),  // R Alt+Q
      scHotkey('Set Quantum Operator Mode', 86, false, true, false, 'flight'),  // R Alt+V
      scHotkey('Set Flight Operator Mode', 86, false, true, false, 'flight'),  // L Alt+V
      scHotkey('Self Destruct', 8, false, false, false, 'flight'),  // Backspace
      scHotkey('Increase Cooler Rate', 82, false, true, false, 'flight'),  // R Alt+R
      scHotkey('Decrease Cooler Rate', 82, false, true, false, 'flight'),  // L Alt+R
      scHotkey('Open Close Doors Toggle', 68, false, false, false, 'flight'),  // D DT
      scHotkey('Open All Doors', 68, true, false, false, 'flight'),  // R Ctrl+D
      scHotkey('Close All Doors', 68, true, false, false, 'flight'),  // L Ctrl+D
      scHotkey('Lock   Unlock Doors Toggle', 68, false, true, false, 'flight'),  // L Alt+D
      scHotkey('Lock All Doors', 68, false, true, false, 'flight'),  // L Alt+D
      scHotkey('Unlock All Doors', 68, false, true, false, 'flight'),  // R Alt+D
      scHotkey('Port Lock Toggle All', 75, false, true, false, 'flight'),  // R Alt + K
      scHotkey('Port Lock All', 75, false, true, false, 'flight'),  // L Alt+K DT
      scHotkey('Port Unlock All', 75, false, true, false, 'flight'),  // R Alt+K DT
      scHotkey('Freelook Hold', 90, false, false, false, 'flight'),  // Z
      scHotkey('Dynamic Zoom Toggle abs', 90, false, false, false, 'flight'),  // Z
      scHotkey('@ui v ads toggle', 56, false, false, false, 'flight'),  // 8 DT
      scHotkey('@ui v ads toggle stable max zoom hold', 56, false, false, false, 'flight'),  // 8
      scHotkey('Roll Left', 81, false, false, false, 'flight'),  // Q
      scHotkey('Roll Right', 69, false, false, false, 'flight'),  // E
      scHotkey('Strafe Up abs', 83, false, true, false, 'flight'),  // R Alt+S
      scHotkey('Strafe Down abs', 83, false, true, false, 'flight'),  // L Alt+S
      scHotkey('Strafe Left abs', 65, false, false, false, 'flight'),  // A
      scHotkey('Strafe Right abs', 68, false, false, false, 'flight'),  // D
      scHotkey('Throttle Increase', 83, true, false, false, 'flight'),  // R Ctrl+S
      scHotkey('Throttle Decrease', 83, true, false, false, 'flight'),  // L Ctrl+S
      scHotkey('Throttle Cruise Mode Toggle', 67, false, false, false, 'flight'),  // C DT
      scHotkey('Throttle Trim Set To 100% Short Press', 67, true, false, false, 'flight'),  // R Ctrl+C
      scHotkey('Throttle Trim Set To 50% Short Press', 67, true, false, false, 'flight'),  // L Ctrl+C
      scHotkey('Throttle Trim Release Long Press', 88, false, false, false, 'flight'),  // X
      scHotkey('Throttle Trim Release Short Press', 88, false, false, false, 'flight'),  // X
      scHotkey('Decouple Mode Toggle Hold', 67, false, false, false, 'flight'),  // C
      scHotkey('Boost', 65, false, false, false, 'flight'),  // A
      scHotkey('Speed Limiter Enable Disable', 83, false, false, false, 'flight'),  // S
      scHotkey('Acceleration Limiter Step Up tap', 65, false, true, false, 'flight'),  // R Alt+A
      scHotkey('Acceleration Limiter Step Down tap', 65, false, true, false, 'flight'),  // L Alt+A
      scHotkey('Spacebrake', 88, false, false, false, 'flight'),  // X
      scHotkey('G-force safety On', 71, true, false, false, 'flight'),  // L Ctrl+G DT
      scHotkey('G-force safety Off', 71, true, false, false, 'flight'),  // R Ctrl+G DT
      scHotkey('G-force safety On   Off Toggle   Hold', 71, false, false, false, 'flight'),  // G DT
      scHotkey('E.S.P Toggle On   Off Press', 88, false, false, false, 'flight'),  // X DT
      scHotkey('Landing System Toggle', 76, false, false, false, 'flight'),  // L
      scHotkey('Landing System Deploy', 76, true, false, false, 'flight'),  // L Ctrl+L
      scHotkey('Landing System Retract', 76, true, false, false, 'flight'),  // R Ctrl+L
      scHotkey('Toggle VTOL', 86, false, false, false, 'flight'),  // V DT
      scHotkey('Expand Configuration', 75, true, false, false, 'flight'),  // L Ctrl+K
      scHotkey('Retract Configuration', 75, true, false, false, 'flight'),  // R Ctrl+K
      scHotkey('Cycle Configuration', 75, false, false, false, 'flight'),  // K
      scHotkey('Autoland', 76, false, false, false, 'flight'),  // L
      scHotkey('Request Landing', 57, false, false, false, 'flight'),  // 9 DT
      scHotkey('Request Cargo Loading', 76, false, true, false, 'flight'),  // R Alt+L
      scHotkey('Cycle Master Mode Short Press', 69, false, false, false, 'flight'),  // E
      scHotkey('Cycle Master Mode Long Press', 66, false, false, false, 'flight'),  // B
      scHotkey('Set Master Mode to Nav', 77, true, false, false, 'flight'),  // R Ctrl+M
      scHotkey('Set Master Mode to SCM', 77, true, false, false, 'flight'),  // L Ctrl+M
      scHotkey('Jump Drive Request Jump', 74, false, false, false, 'flight'),  // J
      scHotkey('Gravity Compensation Enable', 71, true, false, false, 'flight'),  // L Ctrl+G
      scHotkey('Gravity Compensation Disable', 71, true, false, false, 'flight'),  // R Ctrl+G
      scHotkey('Automatic Precision Mode Toggle', 81, false, true, false, 'flight'),  // R Alt+Q
      scHotkey('Automatic Precision Mode Enable', 86, false, true, false, 'flight'),  // L Alt+V
      scHotkey('Automatic Precision Mode Disable', 86, false, true, false, 'flight'),  // R Alt+V
      scHotkey('Engage Quantum Drive Hold', 81, false, true, false, 'flight'),  // L Alt+Q
      scHotkey('Toggle Docking Mode', 68, false, false, false, 'flight'),  // D
      scHotkey('Invoke Docking', 68, false, false, false, 'flight'),  // D
      scHotkey('Hail Target', 57, false, false, false, 'flight'),  // 9
      scHotkey('Scanning Increase Radar Angle', 221, false, false, false, 'flight'),  // ]
      scHotkey('Scanning Decrease Radar Angle', 219, false, false, false, 'flight'),  // [
      scHotkey('Manual Gimbal Mode Swap VJoy Look Direction Tog...', 71, false, true, false, 'flight'),  // R Alt+G DT
      scHotkey('Manual Gimbal Mode Lock Aim Vector', 71, false, true, false, 'flight'),  // L Alt+G DT
      scHotkey('Cycle Gimbal Assist   Standard Gimbal   Gimbal ...', 71, false, false, false, 'flight'),  // G
      scHotkey('Set Fixed Gimbal Mode Short Press', 71, false, true, false, 'flight'),  // L Alt+G
      scHotkey('Set Manual Gimbal Mode Short Press', 71, false, true, false, 'flight'),  // R Alt+G
      scHotkey('Cycle Fire Mode Staggered   Combined', 220, false, false, false, 'flight'),  // \ DT
      scHotkey('Set Lag PIPs', 88, false, true, false, 'flight'),  // L Alt+X
      scHotkey('Set Lead PIPs', 88, false, true, false, 'flight'),  // R Alt+X
      scHotkey('PIP Combination Type Set One PIP Per Weapon', 191, false, false, false, 'flight'),  // /
      scHotkey('PIP Combination Type Set One PIP Per Weapon Type', 191, false, false, false, 'flight'),  // / DT
      scHotkey('PIP Fading On', 190, false, false, false, 'flight'),  // Period
      scHotkey('PIP Fading Off', 188, false, false, false, 'flight'),  // Comma
      scHotkey('Weapon Presets Next', 87, false, true, false, 'flight'),  // R Alt+W
      scHotkey('Weapon Presets Previous', 87, false, true, false, 'flight'),  // L Alt+W
      scHotkey('Precision Targeting Toggle', 56, false, false, false, 'flight'),  // 8 DT
      scHotkey('Precision Targeting Max Zoom Hold', 56, false, false, false, 'flight'),  // 8
      scHotkey('Cycle Next Missile Type', 39, false, false, false, 'flight'),  // Right
      scHotkey('Cycle Previous Missile Type', 37, false, false, false, 'flight'),  // Left
      scHotkey('Increase Number Of Armed Missiles', 38, false, false, false, 'flight'),  // Up
      scHotkey('Decrease Number Of Armed Missiles', 40, false, false, false, 'flight'),  // Down
      scHotkey('Reset Number Of Armed Missiles', 82, false, false, false, 'flight'),  // R
      scHotkey('Bombs Toggle Desired Impact Point Tap', 84, false, false, false, 'flight'),  // T
      scHotkey('Bombs Increase HUD Range', 38, false, false, false, 'flight'),  // Up
      scHotkey('Bombs Decrease HUD Range', 40, false, false, false, 'flight'),  // Down
      scHotkey('Bombs Reset HUD Range', 82, false, false, false, 'flight'),  // R
      scHotkey('Decoy Launch Burst Tap Set And Launch Burst Hold', 186, false, false, false, 'flight'),  // Semicolon
      scHotkey('Shield Raise Level Front', 56, false, false, false, 'flight'),  // Numpad 8
      scHotkey('Shield Raise Level Back', 53, false, false, false, 'flight'),  // Numpad 5
      scHotkey('Shield Raise Level Left', 52, false, false, false, 'flight'),  // Numpad 4
      scHotkey('Shield Raise Level Right', 54, false, false, false, 'flight'),  // Numpad 6
      scHotkey('Shield Raise Level Top', 56, false, false, false, 'flight'),  // Numpad 8 DT
      scHotkey('Shield Raise Level Bottom', 53, false, false, false, 'flight'),  // Numpad 5 DT
      scHotkey('Shield Reset Levels', 48, false, false, false, 'flight'),  // Numpad 0
      scHotkey('Set Power On', 85, true, false, false, 'flight'),  // R Ctrl+U
      scHotkey('Set Power Off', 85, true, false, false, 'flight'),  // L Ctrl+U
      scHotkey('Toggle Power Thrusters', 49, false, false, false, 'flight'),  // Np 1
      scHotkey('Set Thrusters Power On', 73, true, false, false, 'flight'),  // R Ctrl+I
      scHotkey('Set Thrusters Power Off', 73, true, false, false, 'flight'),  // L Ctrl+I
      scHotkey('Toggle Power Shields', 50, false, false, false, 'flight'),  // Np 2
      scHotkey('Set Shields Power On', 79, true, false, false, 'flight'),  // R Ctrl+O
      scHotkey('Set Shields Power Off', 79, true, false, false, 'flight'),  // L Ctrl+O
      scHotkey('Set Weapons Power On', 80, true, false, false, 'flight'),  // R Ctrl+P
      scHotkey('Set Weapons Power Off', 80, true, false, false, 'flight'),  // L Ctrl+P
      scHotkey('Decrease Throttle', 120, false, false, false, 'flight'),  // F9
      scHotkey('Decrease Throttle To Min', 120, false, false, false, 'flight'),  // F9
      scHotkey('Increase Throttle', 121, false, false, false, 'flight'),  // F10
      scHotkey('Increase Throttle To Max', 121, false, false, false, 'flight'),  // F10
      scHotkey('Engines Increase Tap', 73, false, true, false, 'flight'),  // R Alt + I
      scHotkey('Engines Decrease Tap', 73, false, true, false, 'flight'),  // L Alt + I
      scHotkey('Engines Set To Max hold', 73, false, true, false, 'flight'),  // R Alt + I
      scHotkey('Engines Set To Min hold', 73, false, true, false, 'flight'),  // L Alt + I
      scHotkey('Shields Increase Tap', 79, false, true, false, 'flight'),  // R Alt + O
      scHotkey('Shields Decrease Tap', 79, false, true, false, 'flight'),  // L Alt + O
      scHotkey('Shields Set To Max hold', 79, false, true, false, 'flight'),  // R Alt + O
      scHotkey('Shields Set To Min hold', 79, false, true, false, 'flight'),  // L Alt + O
      scHotkey('Weapons Increase Tap', 80, false, true, false, 'flight'),  // R Alt + P
      scHotkey('Weapons Decrease Tap', 80, false, true, false, 'flight'),  // L Alt + P
      scHotkey('Weapons Set To Max hold', 80, false, true, false, 'flight'),  // R Alt + P
      scHotkey('Weapons Set To Min hold', 80, false, true, false, 'flight'),  // L Alt + P
      scHotkey('MobiGlass Toggle', 112, false, false, false, 'flight'),  // F1
      scHotkey('Scoreboard', 112, false, false, false, 'flight'),  // F1
      scHotkey('Map', 113, false, false, false, 'flight'),  // F2
      scHotkey('Wipe Helmet Visor', 8, false, false, false, 'flight'),  // Backspace
      scHotkey('Headlights Toggle', 78, false, false, false, 'flight')  // N
  ],

  // GROUND Commands (24 total)
  GROUND: [
      scHotkey('Horn', 32, false, false, false, 'ground-vehicle'),  // Spacebar
      scHotkey('Cycle Camera View', 115, false, false, false, 'ground-vehicle'),  // F4
      scHotkey('Free Look Hold', 90, false, false, false, 'ground-vehicle'),  // Z
      scHotkey('MobiGlass Toggle', 112, false, false, false, 'ground-vehicle'),  // F1
      scHotkey('Open Close Doors Toggle', 68, false, false, false, 'ground-vehicle'),  // D
      scHotkey('Open All Doors', 68, true, false, false, 'ground-vehicle'),  // R Ctrl+D
      scHotkey('Close All Doors', 68, true, false, false, 'ground-vehicle'),  // L Ctrl+D
      scHotkey('Lock Unlock Doors Toggle', 68, false, true, false, 'ground-vehicle'),  // L Alt+D
      scHotkey('Lock All Doors', 68, false, true, false, 'ground-vehicle'),  // L Alt+D
      scHotkey('Unlock All Doors', 68, false, true, false, 'ground-vehicle'),  // R Alt+D
      scHotkey('Port Lock Toggle All', 75, false, true, false, 'ground-vehicle'),  // L Alt+K
      scHotkey('Port Lock All', 75, false, true, false, 'ground-vehicle'),  // L Alt+K DT
      scHotkey('Port Unlock All', 75, false, true, false, 'ground-vehicle'),  // R Alt+K DT
      scHotkey('Map', 113, false, false, false, 'ground-vehicle'),  // F2
      scHotkey('Wipe Helmet Visor', 8, false, false, false, 'ground-vehicle'),  // Backspace
      scHotkey('Drive Forward', 83, true, false, false, 'ground-vehicle'),  // R Ctrl+S
      scHotkey('Drive Backward', 83, true, false, false, 'ground-vehicle'),  // L Ctrl+S
      scHotkey('Turn Left', 65, false, false, false, 'ground-vehicle'),  // A
      scHotkey('Turn Right', 68, false, false, false, 'ground-vehicle'),  // D
      scHotkey('Brake', 88, false, false, false, 'ground-vehicle'),  // X
      scHotkey('Boost', 65, false, false, false, 'ground-vehicle'),  // A
      scHotkey('@ui CI MGV Toggle Break On Idle', 67, false, false, false, 'ground-vehicle')  // C
  ],

  // INDUSTRY Commands (22 total)
  INDUSTRY: [
      scHotkey('Switch Mining Laser Toggle', 38, false, false, false, 'industry'),  // Up
      scHotkey('Activate Mining Consumable Slot 1', 37, false, false, false, 'industry'),  // Left
      scHotkey('Activate Mining Consumable Slot 2', 40, false, false, false, 'industry'),  // Down
      scHotkey('Activate Mining Consumable Slot 3', 39, false, false, false, 'industry'),  // Right
      scHotkey('Jettison Cargo', 74, false, false, false, 'industry'),  // J DT
      scHotkey('Toggle Fire Left', 37, false, false, false, 'industry'),  // Left DT
      scHotkey('Toggle Fire Right', 39, false, false, false, 'industry'),  // Right DT
      scHotkey('Toggle Fire Fracture', 38, false, false, false, 'industry'),  // Up DT
      scHotkey('Toggle Fire Disintegrate', 40, false, false, false, 'industry'),  // Down DT
      scHotkey('Salvage Mode Gimbal Toggle', 71, false, false, false, 'industry'),  // G
      scHotkey('Salvage Mode Gimbal Reset', 82, false, false, false, 'industry'),  // R
      scHotkey('Salvage Beam Axis Toggle', 88, false, false, false, 'industry'),  // X
      scHotkey('Cycle Focused Salvage Modifiers', 191, false, false, false, 'industry'),  // / DT
      scHotkey('Cycle Structural Salvage Modes', 191, false, false, false, 'industry'),  // /
      scHotkey('Focus Left Salvage Head', 37, false, false, false, 'industry'),  // Left
      scHotkey('Focus Right Salvage Head', 39, false, false, false, 'industry'),  // Right
      scHotkey('Focus Fracture Tool', 38, false, false, false, 'industry'),  // Up
      scHotkey('Focus Disintegration Tool', 40, false, false, false, 'industry')  // Down
  ],

  // MFD Commands (56 total)
  MFD: [
      scHotkey('MFD Cycle Page Forwards short press', 69, false, true, false, 'display'),  // L Alt + E
      scHotkey('MFD Cycle Page Backwards short press', 81, false, true, false, 'display')  // L Alt + Q
  ],

  // PERSONAL Commands (23 total)
  PERSONAL: [
      scHotkey('FOIP Selfie Cam', 114, false, false, false, 'person'),  // F3
      scHotkey('FOIP Recalibrate', 106, false, false, false, 'person'),  // Numpad *
      scHotkey('Cycle Through Audio Channels', 190, false, false, false, 'person'),  // Numpad .
      scHotkey('Interaction Mode', 70, false, false, false, 'person'),  // F
      scHotkey('MFD Left', 65, false, false, false, 'person'),  // A
      scHotkey('MFD Right', 68, false, false, false, 'person'),  // D
      scHotkey('MFD Up', 87, false, false, false, 'person'),  // W
      scHotkey('MFD Down', 83, false, false, false, 'person'),  // S
      scHotkey('Personal Inner Thought PIT', 70, false, true, false, 'person'),  // L Alt + F
      scHotkey('Exit', 48, false, false, false, 'person'),  // Numpad 0
      scHotkey('Personal Commodity Inventory Toggle', 73, false, false, false, 'person'),  // I
      scHotkey('Personal Commodity Inventory Toggle', 73, false, false, false, 'person'),  // I
      scHotkey('@ui CIInteractionLootingToggleView', 9, false, false, false, 'person'),  // Tab
      scHotkey('Looting Toggle Weapon Attachments', 81, false, false, false, 'person'),  // Q
      scHotkey('Mining Mode Actions PIT Category', 77, false, true, false, 'person'),  // L Alt + M
      scHotkey('Weapon Select Radial Menu', 50, false, false, false, 'person'),  // 2
      scHotkey('Weapon Select Radial Menu', 49, false, false, false, 'person'),  // 1
      scHotkey('Weapon Select Radial Menu', 49, false, false, false, 'person'),  // 1
      scHotkey('Throwable Select radial Menu', 71, false, false, false, 'person'),  // G
      scHotkey('@ui Consumable QuickSelectRadialMenu', 86, false, false, false, 'person')  // V
  ],

  // SOCIAL Commands (49 total)
  SOCIAL: [
      scHotkey('Re-spawn', 70, false, false, false, 'social'),  // F
      scHotkey('Exit Seat', 89, false, false, false, 'social'),  // Y
      scHotkey('@ui CIUINotificationAccept', 120, false, false, false, 'social'),  // F9
      scHotkey('@ui CIUINotificationDecline', 121, false, false, false, 'social'),  // F10
      scHotkey('CommLink App Toggle', 122, false, false, false, 'social'),  // F11
      scHotkey('Chat Window Toggle', 123, false, false, false, 'social'),  // F12
      scHotkey('@ui CIUIChatCycleLobby', 9, false, false, false, 'social'),  // Tab
      scHotkey('Chat Window Focus', 13, false, false, false, 'social'),  // Return
      scHotkey('Accept Invite', 120, false, false, false, 'social'),  // F9
      scHotkey('Reject Invite', 121, false, false, false, 'social'),  // F10
      scHotkey('Ignore Invite Hold', 121, false, false, false, 'social'),  // F10
      scHotkey('Forward', 56, false, false, false, 'social'),  // Np 8
      scHotkey('Left', 52, false, false, false, 'social'),  // Np 4
      scHotkey('Right', 54, false, false, false, 'social'),  // Np 6
      scHotkey('Stop', 50, false, false, false, 'social'),  // Np 2
      scHotkey('Yes', 49, false, false, false, 'social'),  // Np 1
      scHotkey('No', 51, false, false, false, 'social'),  // Np 3
      scHotkey('Agree', 55, false, false, false, 'social'),  // Np 7
      scHotkey('Angry', 97, false, true, false, 'social'),  // L Alt+Np 1 DT
      scHotkey('At Ease', 99, false, true, false, 'social'),  // R Alt+Np 3
      scHotkey('Attention', 98, false, true, false, 'social'),  // R Alt+Np 2
      scHotkey('Bow', 100, false, true, false, 'social'),  // R Alt+Np 4
      scHotkey('Cheer', 104, false, true, false, 'social'),  // R Alt+Np 8
      scHotkey('Chicken', 99, false, true, false, 'social'),  // L Alt+Np 3
      scHotkey('Clap', 103, false, true, false, 'social'),  // R Alt+Np 7
      scHotkey('Come', 102, false, true, false, 'social'),  // R Alt+Np 6
      scHotkey('Cry', 101, false, true, false, 'social'),  // L Alt+Np 5
      scHotkey('Dance', 97, false, true, false, 'social'),  // R Alt+Np 1
      scHotkey('Disagree', 57, false, false, false, 'social'),  // Np 9
      scHotkey('Failure', 105, false, true, false, 'social'),  // L Alt+Np 9
      scHotkey('Flex', 97, false, true, false, 'social'),  // L Alt+Np 1
      scHotkey('Gloat', 103, false, true, false, 'social'),  // L Alt+Np 7
      scHotkey('Greet', 96, false, true, false, 'social'),  // R Alt+Np 0
      scHotkey('Laugh', 100, false, true, false, 'social'),  // L Alt+Np 4
      scHotkey('Confirm Launch', 105, false, true, false, 'social'),  // R Alt+Np 9
      scHotkey('Point', 101, false, true, false, 'social'),  // R Alt+Np 5
      scHotkey('Salute', 96, false, true, false, 'social'),  // L Alt+Np 0
      scHotkey('Smell', 104, false, true, false, 'social'),  // L Alt+Np 8
      scHotkey('Taunt', 102, false, true, false, 'social'),  // L Alt+Np 6
      scHotkey('Threaten', 98, false, true, false, 'social'),  // L Alt+Np 2
      scHotkey('Wait', 53, false, false, false, 'social'),  // Np 5
      scHotkey('Wave', 48, false, false, false, 'social')  // Np 0
  ],

  // TARGETING Commands (32 total)
  TARGETING: [
      scHotkey('Auto Targeting Toggle On   Off Long Press', 84, false, false, false, 'target'),  // T
      scHotkey('Auto Targeting Toggle On Short Press', 84, false, true, false, 'target'),  // L Alt+T
      scHotkey('Auto Targeting Toggle Off Short Press', 84, false, true, false, 'target'),  // R Alt+T
      scHotkey('Pin Index 1 Lock Unlock Pinned Target', 49, false, false, false, 'target'),  // 1
      scHotkey('Pin Index 2 Lock Unlock Pinned Target', 50, false, false, false, 'target'),  // 2
      scHotkey('Pin Index 3 Lock Unlock Pinned Target', 51, false, false, false, 'target'),  // 3
      scHotkey('Pin Index 1 Pin Unpin Selected Target', 49, false, true, false, 'target'),  // Left Alt + 1
      scHotkey('Pin Index 2 Pin Unpin Selected Target', 50, false, true, false, 'target'),  // Left Alt + 2
      scHotkey('Pin Index 3 Pin Unpin Selected Target', 51, false, true, false, 'target'),  // Left Alt + 3
      scHotkey('Pin Index 1 Pin Unpin Selected Target Hold', 49, false, false, false, 'target'),  // 1
      scHotkey('Pin Index 2 Pin Unpin Selected Target Hold', 50, false, false, false, 'target'),  // 2
      scHotkey('Pin Index 3 Pin Unpin Selected Target Hold', 51, false, false, false, 'target'),  // 3
      scHotkey('Remove All Pinned Targets', 48, false, false, false, 'target'),  // 0 DT
      scHotkey('Unlock Locked Target', 48, false, false, false, 'target'),  // 0
      scHotkey('Enable   Disable Look Ahead', 76, false, true, false, 'target'),  // Left Alt + L
      scHotkey('Cycle Lock In View Forward', 84, false, false, false, 'target'),  // T
      scHotkey('Cycle Lock In View Under Reticle', 84, false, false, false, 'target'),  // T
      scHotkey('Cycle Lock Attackers Back', 52, false, true, false, 'target'),  // L Alt+4
      scHotkey('Cycle Lock Attackers Forward', 52, false, true, false, 'target'),  // R Alt+4
      scHotkey('Cycle Lock Attackers Reset to Closest', 52, false, false, false, 'target'),  // 4
      scHotkey('Cycle Lock Hostiles Back', 53, false, true, false, 'target'),  // L Alt+5
      scHotkey('Cycle Lock Hostiles Forward', 53, false, true, false, 'target'),  // R Alt+5
      scHotkey('Cycle Lock Hostiles Reset To Closest', 53, false, false, false, 'target'),  // 5
      scHotkey('Cycle Lock Friendlies Back', 54, false, true, false, 'target'),  // L Alt+6
      scHotkey('Cycle Lock Friendlies Forward', 54, false, true, false, 'target'),  // R Alt+6
      scHotkey('Cycle Lock Friendlies Reset to Closest', 54, false, false, false, 'target'),  // 6
      scHotkey('Cycle Lock All Back', 55, false, true, false, 'target'),  // L Alt+7
      scHotkey('Cycle Lock All Forward', 55, false, true, false, 'target'),  // R Alt+7
      scHotkey('Cycle Lock All Reset To Closest', 55, false, false, false, 'target'),  // 7
      scHotkey('Cycle Lock Sub Target Back', 56, false, true, false, 'target'),  // L Alt+8
      scHotkey('Cycle Lock Sub Target Forward', 56, false, true, false, 'target'),  // R Alt+8
      scHotkey('Cycle Lock Sub Target Reset to Main Target', 56, false, false, false, 'target')  // 8
  ],

  // TURRETS Commands (11 total)
  TURRETS: [
      scHotkey('Toggle Turret Mouse Movement VJoy FPS Style', 82, false, false, false, 'turret'),  // R
      scHotkey('@ui turret mouse mode cycle', 82, false, false, false, 'turret'),  // R
      scHotkey('Exit Remote Turret', 89, false, false, false, 'turret'),  // Y
      scHotkey('Turret Gyro Stabilization Toggle', 71, false, false, false, 'turret'),  // G DT
      scHotkey('Next Remote Turret', 68, false, false, false, 'turret'),  // D
      scHotkey('Previous Remote Turret', 65, false, false, false, 'turret'),  // A
      scHotkey('Turret E.S.P. Toggle On   Off', 88, false, false, false, 'turret'),  // X DT
      scHotkey('Recenter Turret Hold', 67, false, false, false, 'turret'),  // C
      scHotkey('Turret Speed Limiter On   Off Hold   Toggle', 83, false, false, false, 'turret'),  // S
      scHotkey('Cycle Fire Mode Staggered   Combined', 220, false, false, false, 'turret'),  // \ DT
      scHotkey('Turret Change Position', 77, false, false, false, 'turret')  // M
  ]

};

/**
 * Create pages from all commands
 * Since we have many commands, we'll create multiple pages per category
 */
function createPages() {
  const pages = [];
  const ITEMS_PER_PAGE = 15; // 3x5 grid
  
  // Create pages for each category
  Object.entries(allCommands).forEach(([category, commands]) => {
    const pageCount = Math.ceil(commands.length / ITEMS_PER_PAGE);
    
    for (let i = 0; i < pageCount; i++) {
      const pageCommands = commands.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE);
      const pageNumber = pages.length + 1;
      const pageName = pageCount > 1 ? `${category} ${i + 1}/${pageCount}` : category;
      
      const items = [...pageCommands];
      
      // Add navigation buttons at the bottom
      while (items.length < 12) {
        items.push(action({ icon: 'blank' }));
      }
      
      // Navigation row (positions 12, 13, 14)
      items.push(previousPage({ title: 'Previous' }));
      items.push(back({ title: 'Main Menu' }));
      items.push(nextPage({ title: 'Next' }));
      
      pages.push({
        name: pageName,
        items: items
      });
    }
  });
  
  return pages;
}

const pages = createPages();

/**
 * Main profile configuration
 */
const starCitizenProfile = profile({
  name: 'Star Citizen Complete',
  id: profileId(),
  pages: pages,
});

console.log(`Generated Star Citizen profile with ${pages.length} pages and ${Object.values(allCommands).flat().length} total commands`);

module.exports = {
  profiles: [starCitizenProfile],
};
