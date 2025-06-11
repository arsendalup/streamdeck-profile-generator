#!/usr/bin/env python3
"""
Star Citizen Commands Extractor (Simple Version)
Extracts ALL commands from HTML binding files using regex patterns
"""

import os
import json
import re
from datetime import datetime

def clean_text(text):
    """Clean and normalize text content"""
    if not text:
        return ""
    # Remove HTML tags and normalize whitespace
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text.strip())
    return text

def extract_commands_from_html(filepath, category_name):
    """Extract commands from an HTML file using regex patterns"""
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    commands = []
    current_subcategory = None
    
    # Find all table rows
    row_pattern = r'<tr[^>]*>(.*?)</tr>'
    rows = re.findall(row_pattern, content, re.DOTALL)
    
    for row in rows:
        # Extract cells from each row
        cell_pattern = r'<t[dh][^>]*>(.*?)</t[dh]>'
        cells = re.findall(cell_pattern, row, re.DOTALL)
        
        if len(cells) < 3:
            continue
            
        # Clean cell contents
        cell_texts = [clean_text(cell) for cell in cells]
        
        # Skip header rows and empty rows
        if not cell_texts[0] or cell_texts[0] in ['', 'Activation Mode', 'Default Binding']:
            continue
            
        # Check if this is a category header (contains class s1 which indicates green background)
        if 's1' in row and len(cell_texts[0]) > 3:
            current_subcategory = cell_texts[0]
            continue
            
        # Extract command information
        if len(cell_texts) >= 3:
            command_name = cell_texts[0]
            activation_mode = cell_texts[1] if len(cell_texts) > 1 else ""
            default_binding = cell_texts[2] if len(cell_texts) > 2 else ""
            mine_binding = cell_texts[3] if len(cell_texts) > 3 else ""
            alt_mine_binding = cell_texts[4] if len(cell_texts) > 4 else ""
            note = cell_texts[5] if len(cell_texts) > 5 else ""
            
            # Skip if command name is empty or looks like a header
            if not command_name or command_name.strip() == "" or len(command_name) < 2:
                continue
                
            # Skip rows that don't look like commands
            if command_name in ['DT= Double Tap', 'Activation Mode', 'Default Binding']:
                continue
                
            # Determine action type
            action_type = "press"
            if "hold" in activation_mode.lower():
                action_type = "hold"
            elif "double tap" in activation_mode.lower() or "dt" in activation_mode.lower():
                action_type = "double_tap"
            elif "toggle" in command_name.lower():
                action_type = "toggle"
                
            command = {
                "name": command_name,
                "defaultBinding": default_binding if default_binding else None,
                "alternativeBinding": mine_binding if mine_binding else None,
                "altMineBinding": alt_mine_binding if alt_mine_binding else None,
                "description": note if note else None,
                "actionType": action_type,
                "activationMode": activation_mode if activation_mode else None,
                "subcategory": current_subcategory if current_subcategory else "General"
            }
            
            commands.append(command)
    
    print(f"Extracted {len(commands)} commands from {category_name}")
    return commands

def main():
    """Main extraction function"""
    sc_bindings_dir = "/home/arsendalup/streamdeck-profile-generator/sc-bindings"
    
    # Define all HTML files to process
    html_files = [
        ("AVAIL KEYS.html", "Available Keys"),
        ("CAMERA.html", "Camera"),
        ("FLIGHT.html", "Flight"),
        ("GROUND.html", "Ground Vehicle"),
        ("INDUSTRY.html", "Industry & Mining"),
        ("MFD.html", "Multi Function Displays"),
        ("ON FOOT   EVA.html", "On Foot & EVA"),
        ("PERSONAL.html", "Personal & Social"),
        ("SOCIAL.html", "Social & Communication"),
        ("TARGETING.html", "Targeting & Combat"),
        ("TURRETS.html", "Turret Controls")
    ]
    
    all_categories = {}
    total_commands = 0
    
    # Process each HTML file
    for filename, category_display_name in html_files:
        filepath = os.path.join(sc_bindings_dir, filename)
        
        if not os.path.exists(filepath):
            print(f"Warning: File not found: {filepath}")
            continue
            
        try:
            commands = extract_commands_from_html(filepath, category_display_name)
            
            if commands:
                # Group commands by subcategory
                subcategories = {}
                for cmd in commands:
                    subcat = cmd.get('subcategory', 'General')
                    if subcat not in subcategories:
                        subcategories[subcat] = []
                    subcategories[subcat].append(cmd)
                
                all_categories[category_display_name] = {
                    "description": f"{category_display_name} controls and functions",
                    "subcategories": subcategories,
                    "totalCommands": len(commands)
                }
                total_commands += len(commands)
            
        except Exception as e:
            print(f"Error processing {filepath}: {str(e)}")
            continue
    
    # Create the comprehensive JSON structure
    output_data = {
        "metadata": {
            "source": "Star Citizen HTML binding files (sc-bindings directory)",
            "version": "4.1.1",
            "extractedDate": datetime.now().strftime("%Y-%m-%d"),
            "totalCommands": total_commands,
            "totalCategories": len(all_categories),
            "description": "Comprehensive extraction of ALL Star Citizen commands from official HTML documentation"
        },
        "categories": all_categories
    }
    
    # Save to JSON file
    output_file = "/home/arsendalup/streamdeck-profile-generator/star-citizen-commands-complete.json"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n=== EXTRACTION COMPLETE ===")
    print(f"Total categories processed: {len(all_categories)}")
    print(f"Total commands extracted: {total_commands}")
    print(f"Output saved to: {output_file}")
    
    # Print summary by category
    print(f"\nCommands by category:")
    for category, data in all_categories.items():
        print(f"  {category}: {data['totalCommands']} commands")
        
    # Print a few sample commands for verification
    print(f"\nSample commands from first category:")
    first_category = list(all_categories.values())[0]
    first_subcategory = list(first_category['subcategories'].values())[0]
    for i, cmd in enumerate(first_subcategory[:3]):
        print(f"  {i+1}. {cmd['name']} -> {cmd['defaultBinding']}")

if __name__ == "__main__":
    main()