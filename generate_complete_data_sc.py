#!/usr/bin/env python3
"""Generate complete data-sc-optimized.js from all_sc_commands_v3.json"""

import json
import os

def get_vkey_code(key):
    """Convert key string to virtual key code"""
    key_map = {
        # Letters
        'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74,
        'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84,
        'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90,
        # Numbers
        '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, '0': 48,
        # Function keys
        'F1': 112, 'F2': 113, 'F3': 114, 'F4': 115, 'F5': 116, 'F6': 117, 'F7': 118, 'F8': 119,
        'F9': 120, 'F10': 121, 'F11': 122, 'F12': 123,
        # Special keys
        'SPACE': 32, 'SPACEBAR': 32, 'ENTER': 13, 'RETURN': 13, 'TAB': 9, 'ESCAPE': 27, 'ESC': 27,
        'BACKSPACE': 8, 'DELETE': 46, 'DEL': 46, 'INSERT': 45, 'INS': 45,
        'HOME': 36, 'END': 35, 'PAGEUP': 33, 'PAGEDOWN': 34, 'PGUP': 33, 'PGDN': 34,
        'UP': 38, 'DOWN': 40, 'LEFT': 37, 'RIGHT': 39,
        'CAPSLOCK': 20, 'CAPS': 20, 'NUMLOCK': 144,
        # Punctuation
        'COMMA': 188, ',': 188, 'PERIOD': 190, '.': 190, 'SLASH': 191, '/': 191,
        'SEMICOLON': 186, ';': 186, 'APOSTROPHE': 222, "'": 222, 'QUOTE': 222,
        'LEFTBRACKET': 219, '[': 219, 'RIGHTBRACKET': 221, ']': 221,
        'BACKSLASH': 220, '\\': 220, 'MINUS': 189, '-': 189, 'EQUALS': 187, '=': 187,
        'GRAVE': 192, '`': 192, 'TILDE': 192, '~': 192,
        # Numpad
        'NUMPAD 0': 96, 'NUMPAD 1': 97, 'NUMPAD 2': 98, 'NUMPAD 3': 99, 'NUMPAD 4': 100,
        'NUMPAD 5': 101, 'NUMPAD 6': 102, 'NUMPAD 7': 103, 'NUMPAD 8': 104, 'NUMPAD 9': 105,
        'NUMPAD MULTIPLY': 106, 'NUMPAD ADD': 107, 'NUMPAD SUBTRACT': 109, 
        'NUMPAD DECIMAL': 110, 'NUMPAD DIVIDE': 111,
        # Alternative numpad notations
        'NUMPAD0': 96, 'NUMPAD1': 97, 'NUMPAD2': 98, 'NUMPAD3': 99, 'NUMPAD4': 100,
        'NUMPAD5': 101, 'NUMPAD6': 102, 'NUMPAD7': 103, 'NUMPAD8': 104, 'NUMPAD9': 105,
        '*': 106, '+': 107
    }
    
    return key_map.get(key.upper(), 0)

def clean_title(name):
    """Clean command name for display on Stream Deck"""
    # Remove underscores and replace with spaces
    title = name.replace('_', ' ')
    # Remove common prefixes
    prefixes_to_remove = [
        'Vehicles ',
        'Ground Vehicle ',
        'Flight ',
        'Social ',
        'Personal ',
        'MFD ',
        'Spectator ',
        'Camera ',
        'VOIP ',
        'FOIP ',
        '@ui ',
        'CIUINotification',
        'CIUIChatCycleLobby',
        'CIInteractionLooting'
    ]
    
    for prefix in prefixes_to_remove:
        if title.startswith(prefix):
            title = title[len(prefix):]
    
    # Shorten long titles
    if len(title) > 12:
        # Common abbreviations
        title = title.replace('Toggle', 'Tgl')
        title = title.replace('Enable', 'En')
        title = title.replace('Disable', 'Dis')
        title = title.replace('Increase', '+')
        title = title.replace('Decrease', '-')
        title = title.replace('Forward', 'Fwd')
        title = title.replace('Backward', 'Back')
        title = title.replace('Configuration', 'Config')
        title = title.replace('Landing System', 'Landing')
        title = title.replace('Operator Mode', 'Mode')
        title = title.replace('Movement', 'Move')
        title = title.replace('Previous', 'Prev')
        title = title.replace('Next Page', 'Next')
        title = title.replace('Prev Page', 'Prev')
        
    # Final length check
    if len(title) > 12:
        title = title[:9] + '...'
    
    return title

def get_icon_for_command(cmd_name, category):
    """Get appropriate icon for command"""
    name_lower = cmd_name.lower()
    
    # Specific command icons
    if 'eject' in name_lower:
        return 'eject'
    elif 'exit' in name_lower or 'seat' in name_lower:
        return 'exit'
    elif 'power on' in name_lower:
        return 'power-on'
    elif 'power off' in name_lower:
        return 'power-off'
    elif 'door' in name_lower and 'open' in name_lower:
        return 'door-open'
    elif 'door' in name_lower and 'close' in name_lower:
        return 'door-close'
    elif 'door' in name_lower:
        return 'door'
    elif 'lock' in name_lower:
        return 'lock'
    elif 'unlock' in name_lower:
        return 'unlock'
    elif 'target' in name_lower and 'lock' in name_lower:
        return 'lock-on'
    elif 'pin' in name_lower and '1' in name_lower:
        return 'pin-1'
    elif 'pin' in name_lower and '2' in name_lower:
        return 'pin-2'
    elif 'pin' in name_lower and '3' in name_lower:
        return 'pin-3'
    elif 'missile' in name_lower and 'increase' in name_lower:
        return 'missile-up'
    elif 'missile' in name_lower and 'decrease' in name_lower:
        return 'missile-down'
    elif 'quantum' in name_lower:
        return 'quantum'
    elif 'boost' in name_lower:
        return 'boost'
    elif 'brake' in name_lower:
        return 'brake'
    elif 'landing' in name_lower:
        return 'landing'
    elif 'gimbal' in name_lower:
        return 'gimbal'
    elif 'esp' in name_lower:
        return 'esp'
    elif 'decoy' in name_lower:
        return 'decoy'
    elif 'hostiles' in name_lower:
        return 'hostile'
    elif 'friendly' in name_lower:
        return 'friendly'
    elif 'mining' in name_lower:
        return 'mining'
    elif 'salvage' in name_lower:
        return 'salvage'
    elif 'horn' in name_lower:
        return 'horn'
    elif 'lights' in name_lower or 'headlight' in name_lower:
        return 'light'
    elif 'chat' in name_lower:
        return 'chat'
    elif 'commlink' in name_lower:
        return 'phone'
    elif 'mobiglass' in name_lower:
        return 'display'
    elif 'map' in name_lower:
        return 'map'
    elif 'inventory' in name_lower:
        return 'backpack'
    elif 'interact' in name_lower:
        return 'hand'
    elif 'helmet' in name_lower or 'visor' in name_lower:
        return 'helmet'
    elif 'wave' in name_lower:
        return 'wave'
    elif 'salute' in name_lower:
        return 'salute'
    elif 'dance' in name_lower:
        return 'dance'
    elif 'clap' in name_lower:
        return 'clap'
    elif 'laugh' in name_lower:
        return 'laugh'
    elif 'point' in name_lower:
        return 'point'
    elif 'yes' in name_lower:
        return 'thumbs-up'
    elif 'no' in name_lower:
        return 'thumbs-down'
    elif 'agree' in name_lower:
        return 'nod'
    elif 'disagree' in name_lower:
        return 'shake'
    
    # Category default icons
    category_icons = {
        'CAMERA': 'camera',
        'FLIGHT': 'rocket',
        'GROUND': 'car',
        'INDUSTRY': 'wrench',
        'MFD': 'display',
        'PERSONAL': 'person',
        'SOCIAL': 'users',
        'TARGETING': 'target',
        'TURRETS': 'turret'
    }
    
    return category_icons.get(category, 'star-citizen-key')

def create_profile_pages(commands, profile_name, items_per_page=10):
    """Create pages for a profile, handling pagination"""
    if not commands:
        return []
    
    pages = []
    total_pages = (len(commands) + items_per_page - 1) // items_per_page
    
    for page_num in range(total_pages):
        start_idx = page_num * items_per_page
        end_idx = min(start_idx + items_per_page, len(commands))
        page_commands = commands[start_idx:end_idx]
        
        # Create page actions in 3x5 grid
        actions = []
        for row in range(3):
            row_actions = []
            for col in range(5):
                if row == 0 and col == 0:
                    # First position is always back button
                    row_actions.append('back()')
                else:
                    cmd_idx = (row * 5 + col) - 1  # -1 because first slot is back button
                    if cmd_idx < len(page_commands):
                        cmd = page_commands[cmd_idx]
                        if cmd['bindings']:
                            binding = cmd['bindings'][0]
                            parsed = binding['parsed']
                            vkey = get_vkey_code(parsed['key'])
                            if vkey > 0:
                                title = clean_title(cmd['name'])
                                icon = get_icon_for_command(cmd['name'], cmd['category'])
                                ctrl = 'true' if parsed['ctrl'] else 'false'
                                alt = 'true' if parsed['alt'] else 'false'
                                shift = 'true' if parsed['shift'] else 'false'
                                
                                row_actions.append(f"scHotkey('{title}', {vkey}, {ctrl}, {alt}, {shift}, '{icon}')")
                            else:
                                row_actions.append('null')
                        else:
                            row_actions.append('null')
                    else:
                        row_actions.append('null')
            actions.append(row_actions)
        
        page_name = f"{profile_name}"
        if total_pages > 1:
            page_name += f" {page_num + 1}/{total_pages}"
        
        pages.append({
            'name': page_name,
            'actions': actions
        })
    
    return pages

def main():
    """Generate complete data-sc-optimized.js"""
    # Load commands
    with open('all_sc_commands_v3.json', 'r', encoding='utf-8') as f:
        all_commands = json.load(f)
    
    print(f"Loaded {len(all_commands)} total commands")
    
    # Filter commands with valid keyboard bindings
    valid_commands = []
    for cmd in all_commands:
        if cmd['bindings']:
            binding = cmd['bindings'][0]
            if binding['parsed'] and get_vkey_code(binding['parsed']['key']) > 0:
                valid_commands.append(cmd)
    
    print(f"Found {len(valid_commands)} commands with valid keyboard bindings")
    
    # Group by category
    categories = {}
    for cmd in valid_commands:
        cat = cmd['category']
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(cmd)
    
    # Sort commands within each category by name
    for cat in categories:
        categories[cat].sort(key=lambda x: x['name'])
    
    # Create optimized category groupings for Stream Deck
    optimized_categories = {
        # Essential Quick Actions
        'QUICK': [
            # Extract most common commands from various categories
        ],
        
        # Flight Controls
        'FLIGHT_SYS': [],     # Power, engines, shields
        'FLIGHT_MOVE': [],    # Movement, quantum, landing
        'FLIGHT_COMBAT': [],  # Weapons, gimbal, missiles
        'FLIGHT_DOORS': [],   # Door controls
        
        # Ground & Vehicles
        'GROUND': categories.get('GROUND', []),
        
        # Industry
        'MINING': [],         # Mining specific
        'SALVAGE': [],        # Salvage specific
        'INDUSTRY_OTHER': [], # Other industry
        
        # Targeting
        'TARGETING': categories.get('TARGETING', []),
        
        # Social & Communication
        'EMOTES': [],         # All emotes
        'COMMS': [],          # Chat, VOIP, etc.
        'SOCIAL_OTHER': [],   # Other social
        
        # Interface
        'MFD': categories.get('MFD', []),
        'CAMERA': categories.get('CAMERA', []),
        'PERSONAL': categories.get('PERSONAL', []),
        
        # Turrets
        'TURRETS': categories.get('TURRETS', [])
    }
    
    # Categorize FLIGHT commands
    flight_commands = categories.get('FLIGHT', [])
    for cmd in flight_commands:
        name_lower = cmd['name'].lower()
        if any(word in name_lower for word in ['power', 'engine', 'shield', 'weapon', 'destruct']):
            optimized_categories['FLIGHT_SYS'].append(cmd)
        elif any(word in name_lower for word in ['door', 'lock', 'unlock']):
            optimized_categories['FLIGHT_DOORS'].append(cmd)
        elif any(word in name_lower for word in ['gimbal', 'missile', 'target', 'fire', 'esp', 'decoy', 'precision']):
            optimized_categories['FLIGHT_COMBAT'].append(cmd)
        elif any(word in name_lower for word in ['boost', 'brake', 'quantum', 'landing', 'vtol', 'cruise', 'decouple']):
            optimized_categories['FLIGHT_MOVE'].append(cmd)
        else:
            optimized_categories['FLIGHT_MOVE'].append(cmd)  # Default to movement
    
    # Categorize INDUSTRY commands
    industry_commands = categories.get('INDUSTRY', [])
    for cmd in industry_commands:
        name_lower = cmd['name'].lower()
        if 'mining' in name_lower:
            optimized_categories['MINING'].append(cmd)
        elif 'salvage' in name_lower:
            optimized_categories['SALVAGE'].append(cmd)
        else:
            optimized_categories['INDUSTRY_OTHER'].append(cmd)
    
    # Categorize SOCIAL commands
    social_commands = categories.get('SOCIAL', [])
    emote_keywords = ['wave', 'dance', 'salute', 'clap', 'laugh', 'point', 'yes', 'no', 'agree', 'disagree', 
                      'forward', 'left', 'right', 'stop', 'angry', 'bow', 'cheer', 'cry', 'flex', 'gloat']
    for cmd in social_commands:
        name_lower = cmd['name'].lower()
        if any(keyword in name_lower for keyword in emote_keywords):
            optimized_categories['EMOTES'].append(cmd)
        elif any(word in name_lower for word in ['chat', 'commlink', 'voip', 'foip', 'notification']):
            optimized_categories['COMMS'].append(cmd)
        else:
            optimized_categories['SOCIAL_OTHER'].append(cmd)
    
    # Add essential quick actions
    quick_commands = []
    essential_names = ['interaction mode', 'mobiglass', 'map', 'inventory', 'exit seat', 'chat', 'helmet']
    for cmd in valid_commands:
        name_lower = cmd['name'].lower()
        if any(essential in name_lower for essential in essential_names):
            quick_commands.append(cmd)
    optimized_categories['QUICK'] = quick_commands
    
    # Start generating the JavaScript file
    js_content = '''/**
 * @fileoverview Star Citizen 4.1.1 Complete Stream Deck Profile
 * COMPLETE VERSION - All commands from CSV files organized optimally
 * Total commands: ''' + str(len(valid_commands)) + '''
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

'''
    
    # Generate profile constants
    profile_constants = []
    
    for cat_name, commands in optimized_categories.items():
        if not commands:
            continue
            
        # Create user-friendly profile names
        profile_names = {
            'QUICK': '⚡ Quick',
            'FLIGHT_SYS': '🔧 Systems',
            'FLIGHT_MOVE': '🚀 Movement', 
            'FLIGHT_COMBAT': '⚔️ Combat',
            'FLIGHT_DOORS': '🚪 Doors',
            'GROUND': '🚗 Ground',
            'MINING': '⛏️ Mining',
            'SALVAGE': '🔧 Salvage',
            'INDUSTRY_OTHER': '🏭 Industry',
            'TARGETING': '🎯 Target',
            'EMOTES': '😊 Emotes',
            'COMMS': '📞 Comms',
            'SOCIAL_OTHER': '💬 Social',
            'MFD': '📊 MFD',
            'CAMERA': '📷 Camera',
            'PERSONAL': '👤 Personal',
            'TURRETS': '🎮 Turret'
        }
        
        profile_name = profile_names.get(cat_name, cat_name)
        const_name = f"{cat_name}_PROFILE"
        
        # Create pages for this profile
        pages = create_profile_pages(commands, profile_name, 14)  # 14 commands per page (15 - 1 for back button)
        
        # Generate profile constant
        js_content += f"// {profile_name} Profile ({len(commands)} commands)\n"
        js_content += f"const {const_name} = profile({{\n"
        js_content += f"  name: '{profile_name}',\n"
        
        # Set icon based on category
        icons = {
            'QUICK': 'lightning', 'FLIGHT_SYS': 'gear', 'FLIGHT_MOVE': 'arrows', 
            'FLIGHT_COMBAT': 'crosshair', 'FLIGHT_DOORS': 'door', 'GROUND': 'car',
            'MINING': 'pickaxe', 'SALVAGE': 'wrench', 'INDUSTRY_OTHER': 'gear',
            'TARGETING': 'target', 'EMOTES': 'smile', 'COMMS': 'headset',
            'SOCIAL_OTHER': 'users', 'MFD': 'display', 'CAMERA': 'camera',
            'PERSONAL': 'person', 'TURRETS': 'turret'
        }
        icon = icons.get(cat_name, 'star-citizen-key')
        js_content += f"  icon: '{icon}',\n"
        js_content += f"  actions: [\n"
        
        # Add pages
        for page in pages:
            js_content += f"    [\n"
            for row in page['actions']:
                js_content += f"      {', '.join(row)}\n"
            js_content += f"    ],\n" if len(pages) == 1 else f"    ],\n"
        
        js_content += f"  ]\n"
        js_content += f"}});\n\n"
        
        profile_constants.append(const_name)
    
    # Create main menu
    js_content += "// Main Menu Profile\n"
    js_content += "const MAIN_MENU_PROFILE = profile({\n"
    js_content += "  name: 'Star Citizen Pro',\n"
    js_content += "  icon: 'star-citizen',\n"
    js_content += "  actions: [\n"
    
    # Main menu layout (3x5 grid)
    main_menu_profiles = []
    for const_name in profile_constants[:15]:  # Max 15 profiles for main menu
        profile_name = const_name.replace('_PROFILE', '').replace('_', ' ').title()
        main_menu_profiles.append(f"folder({const_name})")
    
    # Pad with nulls if needed
    while len(main_menu_profiles) < 15:
        main_menu_profiles.append('null')
    
    # Arrange in 3x5 grid
    for row in range(3):
        row_profiles = main_menu_profiles[row*5:(row+1)*5]
        js_content += f"    [{', '.join(row_profiles)}],\n"
    
    js_content += "  ]\n"
    js_content += "});\n\n"
    
    # Add export
    js_content += "console.log('Generated complete Star Citizen profile with all commands');\n\n"
    js_content += "module.exports = () => ({\n"
    js_content += "  mainProfile: [MAIN_MENU_PROFILE],\n"
    js_content += "  additionalProfiles: [\n"
    
    for const_name in profile_constants:
        js_content += f"    {const_name},\n"
    
    js_content += "  ]\n"
    js_content += "});\n"
    
    # Write the file
    with open('data-sc-optimized.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Generated data-sc-optimized.js with {len(profile_constants)} profiles")
    print(f"Categories: {list(optimized_categories.keys())}")
    
    # Print summary
    for cat_name, commands in optimized_categories.items():
        if commands:
            print(f"  {cat_name}: {len(commands)} commands")

if __name__ == '__main__':
    main()