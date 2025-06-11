#!/usr/bin/env python3
"""Generate data-sc.js file with all commands from CSV files"""

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
        'NUMPAD0': 96, 'NUMPAD1': 97, 'NUMPAD2': 98, 'NUMPAD3': 99, 'NUMPAD4': 100,
        'NUMPAD5': 101, 'NUMPAD6': 102, 'NUMPAD7': 103, 'NUMPAD8': 104, 'NUMPAD9': 105,
        'MULTIPLY': 106, '*': 106, 'ADD': 107, '+': 107, 'SUBTRACT': 109, 'DECIMAL': 110, 'DIVIDE': 111
    }
    
    return key_map.get(key.upper(), 0)

def generate_hotkey_call(cmd, binding):
    """Generate scHotkey function call for a command"""
    parsed = binding['parsed']
    key = parsed['key']
    vkey = get_vkey_code(key)
    
    if vkey == 0:
        print(f"  Warning: Unknown key '{key}' for command '{cmd['name']}'")
        return None
    
    # Format the title
    title = cmd['name'].replace('_', ' ')
    if len(title) > 50:
        title = title[:47] + '...'
    
    # Generate the function call
    ctrl = 'true' if parsed['ctrl'] else 'false'
    alt = 'true' if parsed['alt'] else 'false'
    shift = 'true' if parsed['shift'] else 'false'
    
    # Choose icon based on category
    icon_map = {
        'FLIGHT': 'flight',
        'CAMERA': 'camera',
        'GROUND': 'ground-vehicle',
        'INDUSTRY': 'industry',
        'MFD': 'display',
        'PERSONAL': 'person',
        'SOCIAL': 'social',
        'TARGETING': 'target',
        'TURRETS': 'turret'
    }
    icon = icon_map.get(cmd['category'], 'star-citizen-key')
    
    return f"      scHotkey('{title}', {vkey}, {ctrl}, {alt}, {shift}, '{icon}')"

def main():
    """Generate data-sc.js file"""
    # Load commands from JSON
    with open('all_sc_commands.json', 'r', encoding='utf-8') as f:
        commands = json.load(f)
    
    print(f"Loaded {len(commands)} commands")
    
    # Start building the JS file content
    js_content = '''/**
 * @fileoverview Star Citizen 4.1.1 Complete Stream Deck Profile - All Commands
 * COMPLETE VERSION - Generated from CSV binding files
 * Total commands: ''' + str(len(commands)) + '''
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
'''
    
    # Group commands by category
    categories = {}
    for cmd in commands:
        cat = cmd['category']
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(cmd)
    
    # Generate commands for each category
    for i, (category, cat_commands) in enumerate(sorted(categories.items())):
        js_content += f"  // {category} Commands ({len(cat_commands)} total)\n"
        js_content += f"  {category}: [\n"
        
        valid_commands = 0
        for cmd in cat_commands:
            # Use the first available binding
            if cmd['bindings']:
                binding = cmd['bindings'][0]
                hotkey_call = generate_hotkey_call(cmd, binding)
                if hotkey_call:
                    js_content += hotkey_call
                    if valid_commands < len(cat_commands) - 1:
                        js_content += ","
                    js_content += f"  // {binding['binding']}\n"
                    valid_commands += 1
        
        js_content += "  ]"
        if i < len(categories) - 1:
            js_content += ","
        js_content += "\n\n"
    
    js_content += '''};

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
'''
    
    # Write the file
    with open('data-sc.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Generated data-sc.js with {len(commands)} commands")
    
    # Print summary
    total_valid = 0
    for category, cat_commands in categories.items():
        valid = sum(1 for cmd in cat_commands if cmd['bindings'] and get_vkey_code(cmd['bindings'][0]['parsed']['key']) != 0)
        total_valid += valid
        print(f"  {category}: {valid}/{len(cat_commands)} commands with valid keyboard bindings")
    
    print(f"\nTotal valid keyboard commands: {total_valid}")

if __name__ == '__main__':
    main()