#!/usr/bin/env python3
"""
Star Citizen Commands Extractor (Improved Version)
Extracts ALL commands from HTML binding files with better parsing
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
    # Remove common artifacts
    text = re.sub(r'&nbsp;|&amp;|&lt;|&gt;', ' ', text)
    return text.strip()

def extract_commands_from_html(filepath, category_name):
    """Extract commands from an HTML file with improved parsing"""
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    commands = []
    current_subcategory = "General"
    
    # Find all table rows with better pattern
    row_pattern = r'<tr[^>]*?style="height:\s*20px"[^>]*?>(.*?)</tr>'
    rows = re.findall(row_pattern, content, re.DOTALL)
    
    for row in rows:
        # Extract cells - look for both td and th elements
        cell_pattern = r'<t[dh][^>]*?>(.*?)</t[dh]>'
        cells = re.findall(cell_pattern, row, re.DOTALL)
        
        if len(cells) < 4:  # Need at least command name and some binding info
            continue
            
        # Clean cell contents and extract meaningful data
        cell_texts = []
        for cell in cells:
            cleaned = clean_text(cell)
            cell_texts.append(cleaned)
        
        # Skip empty rows or header-like rows
        if not cell_texts or len(cell_texts) < 2:
            continue
            
        # Check for category headers (background color s1 indicates section headers)
        if 's1' in row and cell_texts[0] and len(cell_texts[0]) > 2:
            # This is a subcategory header
            potential_subcat = cell_texts[0]
            # Skip if it looks like data rather than a category
            if not any(char.isdigit() for char in potential_subcat[:3]) and len(potential_subcat) > 5:
                current_subcategory = potential_subcat
                continue
        
        # Extract the actual command data
        # Column structure appears to be: [Command Name] [Activation Mode] [Default Binding] [Mine] [Alt Mine] [Note]
        command_name = cell_texts[0] if len(cell_texts) > 0 else ""
        activation_mode = cell_texts[1] if len(cell_texts) > 1 else ""
        default_binding = cell_texts[2] if len(cell_texts) > 2 else ""
        mine_binding = cell_texts[3] if len(cell_texts) > 3 else ""
        alt_mine_binding = cell_texts[4] if len(cell_texts) > 4 else ""
        note = cell_texts[5] if len(cell_texts) > 5 else ""
        
        # Filter out non-command rows
        if not command_name or len(command_name) < 2:
            continue
            
        # Skip header rows and non-meaningful entries
        skip_patterns = [
            r'^\d+$',  # Just numbers
            r'^[A-Z]$',  # Single letters
            r'^Activation Mode$',
            r'^Default Binding$',
            r'^Mine$',
            r'^Alt Mine$',
            r'^Note$',
            r'^DT=',
            r'I tend to think'
        ]
        
        if any(re.match(pattern, command_name, re.IGNORECASE) for pattern in skip_patterns):
            continue
            
        # Skip if command name is too short or looks like metadata
        if len(command_name.strip()) < 3:
            continue
            
        # Determine action type from various sources
        action_type = "press"
        combined_text = f"{activation_mode} {command_name}".lower()
        
        if "hold" in combined_text:
            action_type = "hold"
        elif "double tap" in combined_text or " dt" in combined_text or "dt=" in combined_text:
            action_type = "double_tap"
        elif "toggle" in combined_text:
            action_type = "toggle"
        elif "continuous" in combined_text:
            action_type = "continuous"
            
        # Clean up the binding values
        def clean_binding(binding):
            if not binding or binding.lower() in ['none', '', 'null']:
                return None
            return binding.strip()
            
        command = {
            "name": command_name.strip(),
            "defaultBinding": clean_binding(default_binding),
            "alternativeBinding": clean_binding(mine_binding),
            "altMineBinding": clean_binding(alt_mine_binding),
            "description": clean_binding(note),
            "actionType": action_type,
            "activationMode": clean_binding(activation_mode),
            "subcategory": current_subcategory
        }
        
        commands.append(command)
    
    print(f"Extracted {len(commands)} commands from {category_name}")
    return commands

def main():
    """Main extraction function"""
    sc_bindings_dir = "/home/arsendalup/streamdeck-profile-generator/sc-bindings"
    
    # Define all HTML files to process
    html_files = [
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
        # Note: Skipping AVAIL KEYS.html as it appears to be a reference table rather than command bindings
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
            
            # Filter out meaningless commands
            filtered_commands = []
            for cmd in commands:
                # Keep commands that have either a name that makes sense or a binding
                if (len(cmd['name']) > 2 and 
                    not cmd['name'].isdigit() and 
                    (cmd['defaultBinding'] or cmd['alternativeBinding'] or len(cmd['name']) > 5)):
                    filtered_commands.append(cmd)
            
            if filtered_commands:
                # Group commands by subcategory
                subcategories = {}
                for cmd in filtered_commands:
                    subcat = cmd.get('subcategory', 'General')
                    if subcat not in subcategories:
                        subcategories[subcat] = []
                    subcategories[subcat].append(cmd)
                
                all_categories[category_display_name] = {
                    "description": f"{category_display_name} controls and functions",
                    "subcategories": subcategories,
                    "totalCommands": len(filtered_commands)
                }
                total_commands += len(filtered_commands)
            
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
            "description": "Comprehensive extraction of ALL Star Citizen commands from official HTML documentation",
            "notes": "Excludes AVAIL KEYS.html as it appears to be a key reference rather than command bindings"
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
    print(f"\nSample commands for verification:")
    for category_name, category_data in list(all_categories.items())[:3]:
        print(f"\n{category_name}:")
        first_subcategory = list(category_data['subcategories'].values())[0]
        for i, cmd in enumerate(first_subcategory[:3]):
            binding = cmd['defaultBinding'] or cmd['alternativeBinding'] or 'No binding'
            print(f"  - {cmd['name']} -> {binding}")

if __name__ == "__main__":
    main()