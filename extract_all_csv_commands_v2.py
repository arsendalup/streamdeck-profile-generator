#!/usr/bin/env python3
"""Extract all commands from Star Citizen CSV binding files - Version 2"""

import csv
import json
import os
from collections import defaultdict

def clean_command_name(command):
    """Clean and format command name"""
    if not command:
        return None
    
    # Remove common prefixes and clean up
    command = command.strip()
    command = command.replace(' - ', '_')
    command = command.replace(' (', '_')
    command = command.replace(')', '')
    command = command.replace('/', '_')
    command = command.replace('\\', '_')
    command = command.replace(':', '')
    command = command.replace(',', '')
    
    return command

def parse_binding(binding_str):
    """Parse binding string to determine key combination"""
    if not binding_str or binding_str.strip() == '':
        return None
    
    binding = binding_str.strip().upper()
    
    # Skip non-keyboard bindings
    if any(skip in binding for skip in ['MOUSE', 'JOYSTICK', 'GAMEPAD', 'BUTTON', 'WHEEL']):
        return None
    
    result = {
        'key': '',
        'ctrl': False,
        'alt': False,
        'shift': False
    }
    
    # Handle different modifier formats
    if '+' in binding:
        parts = binding.split('+')
        for part in parts[:-1]:
            part = part.strip()
            if 'CTRL' in part or 'CONTROL' in part:
                result['ctrl'] = True
            elif 'ALT' in part:
                result['alt'] = True
            elif 'SHIFT' in part:
                result['shift'] = True
        result['key'] = parts[-1].strip()
    else:
        result['key'] = binding.strip()
    
    return result

def extract_commands_from_csv(csv_path):
    """Extract commands from a single CSV file"""
    commands = []
    category = os.path.basename(csv_path).replace('.csv', '')
    
    try:
        with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
            # Read all lines
            lines = f.readlines()
            
            # Find the header line (contains "Activation Mode")
            header_index = -1
            for i, line in enumerate(lines):
                if 'Activation Mode' in line:
                    header_index = i
                    break
            
            if header_index == -1:
                print(f"  Warning: Could not find header in {csv_path}")
                return commands
            
            # Process CSV starting from header
            reader = csv.DictReader(lines[header_index:])
            
            for row in reader:
                # First column (empty key) contains the command name
                command_name = row.get('', '')
                
                if not command_name or command_name.strip() == '':
                    continue
                
                # Skip section headers (they usually don't have bindings)
                if row.get('Default Binding', '') == '' and row.get('Mine', '') == '' and row.get('Alt Mine', '') == '':
                    continue
                
                # Clean command name
                clean_name = clean_command_name(command_name)
                if not clean_name:
                    continue
                
                # Get bindings
                default_binding = row.get('Default Binding', '')
                mine_binding = row.get('Mine', '')
                alt_mine_binding = row.get('Alt Mine', '')
                
                # Collect all available bindings
                bindings = []
                if mine_binding and mine_binding.strip() and mine_binding.upper() != 'NONE':
                    parsed = parse_binding(mine_binding)
                    if parsed:
                        bindings.append({
                            'type': 'mine',
                            'binding': mine_binding,
                            'parsed': parsed
                        })
                
                if alt_mine_binding and alt_mine_binding.strip() and alt_mine_binding.upper() != 'NONE':
                    parsed = parse_binding(alt_mine_binding)
                    if parsed:
                        bindings.append({
                            'type': 'alt_mine',
                            'binding': alt_mine_binding,
                            'parsed': parsed
                        })
                
                if default_binding and default_binding.strip():
                    parsed = parse_binding(default_binding)
                    if parsed:
                        bindings.append({
                            'type': 'default',
                            'binding': default_binding,
                            'parsed': parsed
                        })
                
                # Add command if we have at least one valid binding
                if bindings:
                    commands.append({
                        'name': clean_name,
                        'category': category,
                        'bindings': bindings,
                        'original': command_name,
                        'activation_mode': row.get('Activation Mode', ''),
                        'note': row.get('Note', '')
                    })
    
    except Exception as e:
        print(f"Error processing {csv_path}: {e}")
        import traceback
        traceback.print_exc()
    
    return commands

def main():
    """Main function to extract all commands"""
    sc_bindings_dir = 'sc_bindings'
    all_commands = []
    
    # Process all CSV files
    csv_files = [
        'CAMERA.csv', 'FLIGHT.csv', 'GROUND.csv', 'INDUSTRY.csv',
        'MFD.csv', 'PERSONAL.csv', 'SOCIAL.csv', 'TARGETING.csv', 'TURRETS.csv'
    ]
    
    for csv_file in csv_files:
        csv_path = os.path.join(sc_bindings_dir, csv_file)
        if os.path.exists(csv_path):
            print(f"Processing {csv_file}...")
            commands = extract_commands_from_csv(csv_path)
            all_commands.extend(commands)
            print(f"  Found {len(commands)} commands with keyboard bindings")
    
    # Save to JSON
    with open('all_sc_commands.json', 'w', encoding='utf-8') as f:
        json.dump(all_commands, f, indent=2, ensure_ascii=False)
    
    print(f"\nTotal commands extracted: {len(all_commands)}")
    
    # Print summary by category
    by_category = defaultdict(int)
    for cmd in all_commands:
        by_category[cmd['category']] += 1
    
    print("\nCommands by category:")
    for cat, count in sorted(by_category.items()):
        print(f"  {cat}: {count}")

if __name__ == '__main__':
    main()