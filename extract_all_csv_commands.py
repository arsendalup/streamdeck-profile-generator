#!/usr/bin/env python3
"""Extract all commands from Star Citizen CSV binding files"""

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
    if any(skip in binding for skip in ['MOUSE', 'JOYSTICK', 'GAMEPAD', 'BUTTON']):
        return None
    
    result = {
        'key': '',
        'ctrl': False,
        'alt': False,
        'shift': False
    }
    
    # Check for modifiers
    if 'CTRL+' in binding or 'CONTROL+' in binding:
        result['ctrl'] = True
        binding = binding.replace('CTRL+', '').replace('CONTROL+', '')
    
    if 'ALT+' in binding:
        result['alt'] = True
        binding = binding.replace('ALT+', '')
    
    if 'SHIFT+' in binding:
        result['shift'] = True
        binding = binding.replace('SHIFT+', '')
    
    # Extract the key
    result['key'] = binding.strip()
    
    return result

def extract_commands_from_csv(csv_path):
    """Extract commands from a single CSV file"""
    commands = []
    category = os.path.basename(csv_path).replace('.csv', '')
    
    try:
        with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
            # Skip header lines
            for _ in range(5):
                f.readline()
            
            reader = csv.DictReader(f)
            for row in reader:
                # Get command name from first column
                command_name = None
                for key in row.keys():
                    if row[key] and key != 'Activation Mode' and key != 'Note':
                        command_name = row[key]
                        break
                
                if not command_name:
                    continue
                
                # Clean command name
                clean_name = clean_command_name(command_name)
                if not clean_name:
                    continue
                
                # Get bindings
                default_binding = row.get('Default Binding', '')
                mine_binding = row.get('Mine', '')
                alt_mine_binding = row.get('Alt Mine', '')
                
                # Use 'Mine' binding if available, otherwise use default
                binding_to_use = mine_binding if mine_binding else default_binding
                
                if binding_to_use:
                    parsed = parse_binding(binding_to_use)
                    if parsed:
                        commands.append({
                            'name': clean_name,
                            'category': category,
                            'binding': binding_to_use,
                            'parsed': parsed,
                            'original': command_name
                        })
    
    except Exception as e:
        print(f"Error processing {csv_path}: {e}")
    
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
            print(f"  Found {len(commands)} commands")
    
    # Remove duplicates based on command name
    unique_commands = {}
    for cmd in all_commands:
        if cmd['name'] not in unique_commands:
            unique_commands[cmd['name']] = cmd
    
    # Convert to list and sort by category then name
    final_commands = list(unique_commands.values())
    final_commands.sort(key=lambda x: (x['category'], x['name']))
    
    # Save to JSON
    with open('all_sc_commands.json', 'w', encoding='utf-8') as f:
        json.dump(final_commands, f, indent=2, ensure_ascii=False)
    
    print(f"\nTotal unique commands extracted: {len(final_commands)}")
    
    # Print summary by category
    by_category = defaultdict(int)
    for cmd in final_commands:
        by_category[cmd['category']] += 1
    
    print("\nCommands by category:")
    for cat, count in sorted(by_category.items()):
        print(f"  {cat}: {count}")

if __name__ == '__main__':
    main()