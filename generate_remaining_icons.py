#!/usr/bin/env python3
"""Generate all remaining SVG icons for Star Citizen Stream Deck profile"""

import os

# Define all missing icons with their SVG content
missing_icons = {
    'torch.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="45" y="60" width="10" height="25" fill="#8B4513" stroke="#654321" stroke-width="2"/>
  <path d="M50 20 Q45 30 50 40 Q55 30 50 20" fill="#FF4500" stroke="#DC143C" stroke-width="2"/>
  <path d="M40 25 Q50 35 60 25" fill="#FFA500" opacity="0.7"/>
  <path d="M42 30 Q50 40 58 30" fill="#FFD700" opacity="0.5"/>
</svg>''',

    'decouple.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="35" cy="50" r="20" fill="none" stroke="#00CED1" stroke-width="3"/>
  <circle cx="65" cy="50" r="20" fill="none" stroke="#00CED1" stroke-width="3"/>
  <path d="M55 50 L45 50" stroke="#FF0000" stroke-width="4" stroke-dasharray="5,5"/>
  <text x="50" y="85" text-anchor="middle" font-size="12" fill="#00CED1" font-weight="bold">DECOUPLE</text>
</svg>''',

    'vtol.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="35" y="40" width="30" height="20" rx="5" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <circle cx="25" cy="35" r="8" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
  <circle cx="75" cy="35" r="8" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
  <circle cx="25" cy="65" r="8" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
  <circle cx="75" cy="65" r="8" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
  <path d="M20 30 L20 25 M80 30 L80 25 M20 70 L20 75 M80 70 L80 75" stroke="#32CD32" stroke-width="3"/>
</svg>''',

    'autoland.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 40 L50 20 L70 40 L70 50 L60 50 L60 60 L40 60 L40 50 L30 50 Z" fill="#32CD32" stroke="#228B22" stroke-width="2"/>
  <rect x="35" y="60" width="10" height="10" fill="#696969"/>
  <rect x="55" y="60" width="10" height="10" fill="#696969"/>
  <path d="M20 75 L80 75" stroke="#32CD32" stroke-width="4"/>
  <path d="M35 75 L50 65 L65 75" stroke="#32CD32" stroke-width="3" fill="none"/>
  <text x="50" y="90" text-anchor="middle" font-size="10" fill="#228B22">AUTO</text>
</svg>''',

    'pin-1.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 Q30 20 30 40 Q30 50 50 70 Q70 50 70 40 Q70 20 50 20 Z" fill="#FF0000" stroke="#8B0000" stroke-width="3"/>
  <text x="50" y="48" text-anchor="middle" font-size="20" font-weight="bold" fill="white">1</text>
</svg>''',

    'pin-2.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 Q30 20 30 40 Q30 50 50 70 Q70 50 70 40 Q70 20 50 20 Z" fill="#FF0000" stroke="#8B0000" stroke-width="3"/>
  <text x="50" y="48" text-anchor="middle" font-size="20" font-weight="bold" fill="white">2</text>
</svg>''',

    'pin-3.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 Q30 20 30 40 Q30 50 50 70 Q70 50 70 40 Q70 20 50 20 Z" fill="#FF0000" stroke="#8B0000" stroke-width="3"/>
  <text x="50" y="48" text-anchor="middle" font-size="20" font-weight="bold" fill="white">3</text>
</svg>''',

    'friendly.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,20 65,45 90,45 70,60 80,85 50,65 20,85 30,60 10,45 35,45" fill="#00FF00" stroke="#228B22" stroke-width="3"/>
</svg>''',

    'all.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#FFD700" stroke-width="4"/>
  <circle cx="35" cy="35" r="8" fill="#FF0000"/>
  <circle cx="65" cy="35" r="8" fill="#00FF00"/>
  <circle cx="35" cy="65" r="8" fill="#0000FF"/>
  <circle cx="65" cy="65" r="8" fill="#FF00FF"/>
  <circle cx="50" cy="50" r="5" fill="#FFD700"/>
</svg>''',

    'attacker.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,20 65,45 90,45 70,60 80,85 50,65 20,85 30,60 10,45 35,45" fill="#FF4500" stroke="#DC143C" stroke-width="3"/>
  <path d="M40 40 L60 60 M60 40 L40 60" stroke="#8B0000" stroke-width="3"/>
</svg>''',

    'sub-target.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="25" fill="none" stroke="#FF0000" stroke-width="3"/>
  <circle cx="50" cy="50" r="15" fill="none" stroke="#FF0000" stroke-width="2"/>
  <circle cx="50" cy="50" r="5" fill="#FF0000"/>
  <rect x="30" y="30" width="40" height="40" fill="none" stroke="#00FF00" stroke-width="2" stroke-dasharray="5,5"/>
</svg>''',

    'stop.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="25" width="50" height="50" fill="#DC143C" stroke="#8B0000" stroke-width="3"/>
  <text x="50" y="55" text-anchor="middle" font-size="16" font-weight="bold" fill="white">STOP</text>
</svg>''',

    'nod.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="40" r="20" fill="#FFE4B5" stroke="#DEB887" stroke-width="2"/>
  <circle cx="43" cy="35" r="3" fill="#000"/>
  <circle cx="57" cy="35" r="3" fill="#000"/>
  <path d="M40 45 Q50 50 60 45" fill="none" stroke="#000" stroke-width="2"/>
  <path d="M30 60 Q50 70 70 60" stroke="#32CD32" stroke-width="4" fill="none"/>
  <path d="M45 55 L50 65 L55 55" stroke="#32CD32" stroke-width="3" fill="none"/>
</svg>''',

    'shake.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="40" r="20" fill="#FFE4B5" stroke="#DEB887" stroke-width="2"/>
  <circle cx="43" cy="35" r="3" fill="#000"/>
  <circle cx="57" cy="35" r="3" fill="#000"/>
  <path d="M40 50 Q50 45 60 50" fill="none" stroke="#000" stroke-width="2"/>
  <path d="M25 65 L35 55 L45 65 L55 55 L65 65 L75 55" stroke="#DC143C" stroke-width="4" fill="none"/>
</svg>''',

    'power-down.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="#DC143C" stroke="#8B0000" stroke-width="3"/>
  <path d="M50 65 L35 50 L45 50 L45 35 L55 35 L55 50 L65 50 Z" fill="white"/>
</svg>''',

    'consumable-1.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="25" width="40" height="50" rx="5" fill="#FFD700" stroke="#B8860B" stroke-width="3"/>
  <text x="50" y="55" text-anchor="middle" font-size="24" font-weight="bold" fill="#8B4513">1</text>
  <circle cx="50" cy="20" r="8" fill="#32CD32" stroke="#228B22" stroke-width="2"/>
</svg>''',

    'consumable-2.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="25" width="40" height="50" rx="5" fill="#FFD700" stroke="#B8860B" stroke-width="3"/>
  <text x="50" y="55" text-anchor="middle" font-size="24" font-weight="bold" fill="#8B4513">2</text>
  <circle cx="50" cy="20" r="8" fill="#32CD32" stroke="#228B22" stroke-width="2"/>
</svg>''',

    'consumable-3.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="25" width="40" height="50" rx="5" fill="#FFD700" stroke="#B8860B" stroke-width="3"/>
  <text x="50" y="55" text-anchor="middle" font-size="24" font-weight="bold" fill="#8B4513">3</text>
  <circle cx="50" cy="20" r="8" fill="#32CD32" stroke="#228B22" stroke-width="2"/>
</svg>''',

    'fracture.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="30" width="60" height="40" fill="#8B4513" stroke="#654321" stroke-width="3"/>
  <path d="M25 35 L35 65 M40 30 L50 70 M55 35 L65 60 M70 40 L75 65" stroke="#FFD700" stroke-width="3"/>
  <path d="M30 50 L70 50" stroke="#FF0000" stroke-width="4" stroke-dasharray="3,3"/>
</svg>''',

    'extract.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="40" width="60" height="30" fill="#8B4513" stroke="#654321" stroke-width="3"/>
  <path d="M30 25 L50 40 L70 25" stroke="#32CD32" stroke-width="4" fill="none"/>
  <circle cx="35" cy="55" r="4" fill="#FFD700"/>
  <circle cx="50" cy="55" r="4" fill="#FFD700"/>
  <circle cx="65" cy="55" r="4" fill="#FFD700"/>
  <path d="M30 70 L35 80 M50 70 L50 80 M70 70 L65 80" stroke="#32CD32" stroke-width="3"/>
</svg>''',

    'jettison.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="35" y="30" width="30" height="20" fill="#8B4513" stroke="#654321" stroke-width="2"/>
  <path d="M20 60 L40 50 L60 50 L80 60" stroke="#FF4500" stroke-width="4" fill="none"/>
  <circle cx="25" cy="70" r="5" fill="#FF4500"/>
  <circle cx="50" cy="75" r="5" fill="#FF4500"/>
  <circle cx="75" cy="70" r="5" fill="#FF4500"/>
  <text x="50" y="90" text-anchor="middle" font-size="10" fill="#DC143C">JETTISON</text>
</svg>''',

    'reset.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#4169E1" stroke-width="3"/>
  <path d="M30 30 L40 40 M30 30 L40 20" stroke="#4169E1" stroke-width="3"/>
  <path d="M70 70 L60 60 M70 70 L60 80" stroke="#4169E1" stroke-width="3"/>
  <text x="50" y="85" text-anchor="middle" font-size="10" fill="#4169E1">RESET</text>
</svg>''',

    'axis.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 50 L80 50 M50 20 L50 80" stroke="#4169E1" stroke-width="4"/>
  <path d="M70 40 L80 50 L70 60" stroke="#4169E1" stroke-width="3" fill="none"/>
  <path d="M40 30 L50 20 L60 30" stroke="#4169E1" stroke-width="3" fill="none"/>
  <circle cx="50" cy="50" r="8" fill="#87CEEB" stroke="#4169E1" stroke-width="2"/>
</svg>''',

    'cycle.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="25" fill="none" stroke="#32CD32" stroke-width="4"/>
  <path d="M70 35 L80 40 L75 50" stroke="#32CD32" stroke-width="3" fill="#32CD32"/>
  <path d="M30 65 L20 60 L25 50" stroke="#32CD32" stroke-width="3" fill="#32CD32"/>
</svg>''',

    'left.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M70 20 L30 50 L70 80" stroke="#4169E1" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>''',

    'right.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 20 L70 50 L30 80" stroke="#4169E1" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>''',

    'disintegrate.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="30" width="40" height="40" fill="#8B4513" stroke="#654321" stroke-width="2"/>
  <circle cx="35" cy="35" r="3" fill="#FF0000"/>
  <circle cx="50" cy="40" r="3" fill="#FF0000"/>
  <circle cx="65" cy="35" r="3" fill="#FF0000"/>
  <circle cx="40" cy="55" r="3" fill="#FF0000"/>
  <circle cx="60" cy="65" r="3" fill="#FF0000"/>
  <path d="M25 75 L30 80 M45 75 L50 85 M65 75 L70 85 M75 75 L80 80" stroke="#FF4500" stroke-width="3"/>
</svg>''',

    'next.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M25 25 L50 50 L25 75" stroke="#32CD32" stroke-width="5" fill="none"/>
  <path d="M50 25 L75 50 L50 75" stroke="#32CD32" stroke-width="5" fill="none"/>
</svg>''',

    'previous.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M75 25 L50 50 L75 75" stroke="#32CD32" stroke-width="5" fill="none"/>
  <path d="M50 25 L25 50 L50 75" stroke="#32CD32" stroke-width="5" fill="none"/>
</svg>''',

    'gyro.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#4169E1" stroke-width="3"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="#87CEEB" stroke-width="2"/>
  <circle cx="50" cy="50" r="10" fill="none" stroke="#4169E1" stroke-width="2"/>
  <circle cx="50" cy="50" r="5" fill="#4169E1"/>
  <path d="M20 50 L30 50 M70 50 L80 50 M50 20 L50 30 M50 70 L50 80" stroke="#4169E1" stroke-width="2"/>
</svg>''',

    'speed.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 70 Q50 30 80 70" fill="none" stroke="#32CD32" stroke-width="4"/>
  <circle cx="25" cy="65" r="3" fill="#32CD32"/>
  <circle cx="40" cy="50" r="3" fill="#FFD700"/>
  <circle cx="60" cy="50" r="3" fill="#FFA500"/>
  <circle cx="75" cy="65" r="3" fill="#FF0000"/>
  <path d="M55 45 L70 40 L65 55" stroke="#FF0000" stroke-width="3" fill="#FF0000"/>
</svg>''',

    'position.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="25" fill="none" stroke="#4169E1" stroke-width="3"/>
  <path d="M50 25 L50 75 M25 50 L75 50" stroke="#4169E1" stroke-width="2"/>
  <circle cx="50" cy="50" r="8" fill="#87CEEB" stroke="#4169E1" stroke-width="2"/>
  <circle cx="50" cy="30" r="4" fill="#FF0000"/>
  <circle cx="70" cy="50" r="4" fill="#FF0000"/>
  <circle cx="50" cy="70" r="4" fill="#FF0000"/>
  <circle cx="30" cy="50" r="4" fill="#FF0000"/>
</svg>''',

    'page-next.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="20" width="30" height="40" fill="none" stroke="#4169E1" stroke-width="3"/>
  <rect x="40" y="30" width="30" height="40" fill="none" stroke="#4169E1" stroke-width="3"/>
  <path d="M60 40 L75 50 L60 60" stroke="#32CD32" stroke-width="4" fill="none"/>
</svg>''',

    'page-prev.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="20" width="30" height="40" fill="none" stroke="#4169E1" stroke-width="3"/>
  <rect x="30" y="30" width="30" height="40" fill="none" stroke="#4169E1" stroke-width="3"/>
  <path d="M40 40 L25 50 L40 60" stroke="#32CD32" stroke-width="4" fill="none"/>
</svg>''',

    'display-1.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="60" height="45" rx="5" fill="#000080" stroke="#00008B" stroke-width="3"/>
  <rect x="25" y="25" width="50" height="35" fill="#1E90FF"/>
  <text x="50" y="50" text-anchor="middle" font-size="24" font-weight="bold" fill="white">1</text>
  <rect x="40" y="65" width="20" height="10" fill="#696969"/>
</svg>''',

    'display-2.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="60" height="45" rx="5" fill="#000080" stroke="#00008B" stroke-width="3"/>
  <rect x="25" y="25" width="50" height="35" fill="#1E90FF"/>
  <text x="50" y="50" text-anchor="middle" font-size="24" font-weight="bold" fill="white">2</text>
  <rect x="40" y="65" width="20" height="10" fill="#696969"/>
</svg>''',

    'display-3.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="60" height="45" rx="5" fill="#000080" stroke="#00008B" stroke-width="3"/>
  <rect x="25" y="25" width="50" height="35" fill="#1E90FF"/>
  <text x="50" y="50" text-anchor="middle" font-size="24" font-weight="bold" fill="white">3</text>
  <rect x="40" y="65" width="20" height="10" fill="#696969"/>
</svg>''',

    'status.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="30" r="15" fill="#FFE4B5" stroke="#DEB887" stroke-width="2"/>
  <rect x="40" y="45" width="20" height="30" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <rect x="25" y="55" width="50" height="20" fill="#32CD32" stroke="#228B22" stroke-width="2"/>
  <circle cx="35" cy="60" r="3" fill="#FF0000"/>
  <circle cx="50" cy="60" r="3" fill="#FFD700"/>
  <circle cx="65" cy="60" r="3" fill="#00FF00"/>
</svg>''',

    'target-info.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="25" fill="none" stroke="#FF0000" stroke-width="3"/>
  <circle cx="50" cy="50" r="15" fill="none" stroke="#FF0000" stroke-width="2"/>
  <circle cx="50" cy="50" r="5" fill="#FF0000"/>
  <text x="30" y="25" font-size="10" fill="#FF0000">TGT</text>
  <text x="30" y="85" font-size="8" fill="#FF0000">HOSTILE</text>
  <rect x="75" y="20" width="20" height="60" fill="none" stroke="#00FF00" stroke-width="2"/>
</svg>''',

    'config.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="25" width="60" height="50" fill="none" stroke="#4169E1" stroke-width="3"/>
  <rect x="25" y="30" width="20" height="15" fill="#87CEEB"/>
  <rect x="55" y="30" width="20" height="15" fill="#87CEEB"/>
  <rect x="25" y="55" width="20" height="15" fill="#87CEEB"/>
  <rect x="55" y="55" width="20" height="15" fill="#87CEEB"/>
  <circle cx="50" cy="50" r="5" fill="#FFD700"/>
</svg>''',

    '3rd-person.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="30" r="12" fill="#FFE4B5" stroke="#DEB887" stroke-width="2"/>
  <rect x="45" y="42" width="10" height="25" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <rect x="40" y="67" width="20" height="15" fill="#8B4513" stroke="#654321" stroke-width="2"/>
  <path d="M20 20 Q30 30 20 40 Q30 50 20 60" stroke="#32CD32" stroke-width="3" fill="none"/>
  <circle cx="15" cy="40" r="3" fill="#32CD32"/>
</svg>''',

    'save-1.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="25" width="50" height="50" fill="#4169E1" stroke="#191970" stroke-width="3"/>
  <rect x="30" y="30" width="40" height="5" fill="#87CEEB"/>
  <rect x="30" y="40" width="40" height="30" fill="#87CEEB"/>
  <text x="50" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#191970">1</text>
  <path d="M70 20 L75 25 L70 30" stroke="#32CD32" stroke-width="3" fill="none"/>
</svg>''',

    'load-1.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="25" width="50" height="50" fill="#32CD32" stroke="#228B22" stroke-width="3"/>
  <rect x="30" y="30" width="40" height="5" fill="#90EE90"/>
  <rect x="30" y="40" width="40" height="30" fill="#90EE90"/>
  <text x="50" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#228B22">1</text>
  <path d="M25 20 L30 25 L25 30" stroke="#FF4500" stroke-width="3" fill="none"/>
</svg>''',

    'save-2.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="25" width="50" height="50" fill="#4169E1" stroke="#191970" stroke-width="3"/>
  <rect x="30" y="30" width="40" height="5" fill="#87CEEB"/>
  <rect x="30" y="40" width="40" height="30" fill="#87CEEB"/>
  <text x="50" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#191970">2</text>
  <path d="M70 20 L75 25 L70 30" stroke="#32CD32" stroke-width="3" fill="none"/>
</svg>''',

    'load-2.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="25" width="50" height="50" fill="#32CD32" stroke="#228B22" stroke-width="3"/>
  <rect x="30" y="30" width="40" height="5" fill="#90EE90"/>
  <rect x="30" y="40" width="40" height="30" fill="#90EE90"/>
  <text x="50" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#228B22">2</text>
  <path d="M25 20 L30 25 L25 30" stroke="#FF4500" stroke-width="3" fill="none"/>
</svg>''',

    'dof-plus.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#4169E1" stroke-width="3"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="#87CEEB" stroke-width="2" stroke-dasharray="3,3"/>
  <circle cx="50" cy="50" r="10" fill="none" stroke="#4169E1" stroke-width="2" stroke-dasharray="3,3"/>
  <path d="M40 50 L60 50 M50 40 L50 60" stroke="#32CD32" stroke-width="4"/>
  <text x="50" y="85" text-anchor="middle" font-size="10" fill="#4169E1">DOF+</text>
</svg>''',

    'dof-minus.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#4169E1" stroke-width="3"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="#87CEEB" stroke-width="2" stroke-dasharray="3,3"/>
  <circle cx="50" cy="50" r="10" fill="none" stroke="#4169E1" stroke-width="2" stroke-dasharray="3,3"/>
  <path d="M40 50 L60 50" stroke="#DC143C" stroke-width="4"/>
  <text x="50" y="85" text-anchor="middle" font-size="10" fill="#4169E1">DOF-</text>
</svg>''',

    'mouse.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 25 Q50 20 60 25 L60 65 Q60 75 50 75 Q40 75 40 65 Z" fill="#696969" stroke="#2F4F4F" stroke-width="3"/>
  <rect x="48" y="30" width="4" height="15" fill="#87CEEB" stroke="#4682B4" stroke-width="1"/>
  <circle cx="45" cy="55" r="3" fill="#FF0000"/>
  <circle cx="55" cy="55" r="3" fill="#32CD32"/>
</svg>''',

    'precision.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#FF0000" stroke-width="2"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="#FF0000" stroke-width="2"/>
  <circle cx="50" cy="50" r="10" fill="none" stroke="#FF0000" stroke-width="2"/>
  <circle cx="50" cy="50" r="3" fill="#FF0000"/>
  <path d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50" stroke="#FF0000" stroke-width="2"/>
  <text x="50" y="92" text-anchor="middle" font-size="8" fill="#FF0000">PRECISION</text>
</svg>''',

    'jump.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="25" fill="none" stroke="#00FFFF" stroke-width="4" stroke-dasharray="5,5"/>
  <circle cx="50" cy="50" r="15" fill="none" stroke="#00CED1" stroke-width="3" stroke-dasharray="3,3"/>
  <circle cx="50" cy="50" r="8" fill="#00FFFF"/>
  <path d="M30 30 L70 70 M70 30 L30 70" stroke="#00FFFF" stroke-width="2" opacity="0.7"/>
  <text x="50" y="90" text-anchor="middle" font-size="10" fill="#00FFFF">JUMP</text>
</svg>''',

    'cruise.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 50 L35 40 L50 50 L65 40 L80 50" stroke="#32CD32" stroke-width="4" fill="none"/>
  <circle cx="35" cy="40" r="5" fill="#32CD32"/>
  <circle cx="50" cy="50" r="5" fill="#FFD700"/>
  <circle cx="65" cy="40" r="5" fill="#32CD32"/>
  <text x="50" y="75" text-anchor="middle" font-size="12" fill="#32CD32" font-weight="bold">CRUISE</text>
</svg>''',

    'missile-down.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 80 L45 70 L45 40 L40 30 L50 25 L60 30 L55 40 L55 70 Z" fill="#B22222" stroke="#8B0000" stroke-width="2"/>
  <path d="M60 70 L65 60 L60 60 Z M40 70 L35 60 L40 60 Z" fill="#DC143C"/>
  <path d="M50 90 L45 80 L55 80 Z" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
</svg>''',

    'landing-pad.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="60" width="60" height="20" rx="5" fill="#696969" stroke="#2F4F4F" stroke-width="3"/>
  <path d="M30 40 L50 20 L70 40 L70 50 L60 50 L60 60 L40 60 L40 50 L30 50 Z" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <circle cx="30" cy="70" r="5" fill="#FF0000"/>
  <circle cx="50" cy="70" r="5" fill="#FF0000"/>
  <circle cx="70" cy="70" r="5" fill="#FF0000"/>
  <text x="50" y="95" text-anchor="middle" font-size="8" fill="#696969">LANDING</text>
</svg>''',

    'thumbs-down.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 30 L40 60 L35 60 L35 70 L40 70 L45 80 L50 80 L50 60 L70 60 L70 30 L40 30 Z" fill="#DC143C" stroke="#8B0000" stroke-width="3"/>
  <rect x="25" y="60" width="10" height="30" fill="#8B0000"/>
</svg>''',

    'beckon.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 60 L40 40 L35 35 L35 30 L40 30 L40 35 L45 35 L45 30 L50 30 L50 35 L55 35 L55 30 L60 30 L60 35 L65 35 L65 40 L60 45 L60 60 Q60 70 50 70 Q40 70 40 60 Z" fill="#FDBCB4" stroke="#CD853F" stroke-width="2"/>
  <path d="M75 45 Q70 40 70 45 Q70 50 75 45" stroke="#4169E1" stroke-width="3" fill="none"/>
  <path d="M80 50 Q75 45 75 50 Q75 55 80 50" stroke="#4169E1" stroke-width="3" fill="none"/>
</svg>''',

    'stop-hand.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 C45 20 40 25 40 30 L40 45 L35 45 C30 45 25 50 25 55 L25 70 C25 80 33 88 43 88 L57 88 C67 88 75 80 75 70 L75 30 C75 25 70 20 65 20 L60 20 L60 15 C60 10 55 5 50 5 C45 5 40 10 40 15 L40 20 Z" fill="#FDBCB4" stroke="#CD853F" stroke-width="2"/>
  <rect x="30" y="40" width="40" height="30" fill="#DC143C" opacity="0.8"/>
  <text x="50" y="60" text-anchor="middle" font-size="16" font-weight="bold" fill="white">STOP</text>
</svg>''',

    'dance.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="25" r="10" fill="#FFE4B5" stroke="#DEB887" stroke-width="2"/>
  <path d="M50 35 Q45 45 50 55 Q55 45 50 35" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <path d="M35 50 Q30 55 35 60" stroke="#CD853F" stroke-width="3" fill="none"/>
  <path d="M65 50 Q70 55 65 60" stroke="#CD853F" stroke-width="3" fill="none"/>
  <path d="M45 55 Q40 70 45 75" stroke="#8B4513" stroke-width="3" fill="none"/>
  <path d="M55 55 Q60 70 55 75" stroke="#8B4513" stroke-width="3" fill="none"/>
  <path d="M25 40 Q30 35 35 40" stroke="#FFD700" stroke-width="2" fill="none"/>
  <path d="M75 40 Q70 35 65 40" stroke="#FFD700" stroke-width="2" fill="none"/>
</svg>''',

    'clap.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M35 50 L35 40 L30 35 L30 30 L35 30 L35 35 L40 35 L40 30 L45 30 L45 35 L45 50 Q45 60 35 60 Q25 60 35 50 Z" fill="#FDBCB4" stroke="#CD853F" stroke-width="2"/>
  <path d="M65 50 L65 40 L70 35 L70 30 L65 30 L65 35 L60 35 L60 30 L55 30 L55 35 L55 50 Q55 60 65 60 Q75 60 65 50 Z" fill="#FDBCB4" stroke="#CD853F" stroke-width="2"/>
  <path d="M45 45 L55 45" stroke="#FFD700" stroke-width="4"/>
  <circle cx="50" cy="40" r="3" fill="#FFD700"/>
  <circle cx="50" cy="50" r="3" fill="#FFD700"/>
</svg>''',

    'point.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 60 L30 40 L25 35 L25 30 L30 30 L30 35 L35 35 L35 30 L40 30 L40 35 L45 35 L45 40 L50 40 L55 35 L70 35 L70 45 L55 45 L45 50 L45 60 Q45 70 35 70 Q25 70 30 60 Z" fill="#FDBCB4" stroke="#CD853F" stroke-width="2"/>
  <path d="M70 35 L80 30 L85 35 L80 40 L70 35" fill="#FDBCB4" stroke="#CD853F" stroke-width="2"/>
</svg>''',

    'laugh.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="40" r="20" fill="#FFE4B5" stroke="#DEB887" stroke-width="2"/>
  <circle cx="43" cy="35" r="2" fill="#000"/>
  <circle cx="57" cy="35" r="2" fill="#000"/>
  <path d="M40 45 Q50 55 60 45" fill="none" stroke="#000" stroke-width="3"/>
  <path d="M35 60 Q40 65 45 60" stroke="#4169E1" stroke-width="3" fill="none"/>
  <path d="M55 60 Q60 65 65 60" stroke="#4169E1" stroke-width="3" fill="none"/>
  <text x="50" y="85" text-anchor="middle" font-size="12" fill="#4169E1">HA HA</text>
</svg>''',

    'salute.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="30" r="12" fill="#FFE4B5" stroke="#DEB887" stroke-width="2"/>
  <rect x="45" y="42" width="10" height="25" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <path d="M35 35 L35 25 L30 20 L30 15 L35 15 L35 20 L40 20 L40 15 L45 15 L45 20 L45 25 L40 30" fill="#FDBCB4" stroke="#CD853F" stroke-width="2"/>
  <rect x="40" y="67" width="20" height="15" fill="#8B4513" stroke="#654321" stroke-width="2"/>
</svg>''',

    'channel.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="30" width="60" height="40" rx="10" fill="#4169E1" stroke="#191970" stroke-width="3"/>
  <circle cx="35" cy="50" r="8" fill="#87CEEB" stroke="#4682B4" stroke-width="2"/>
  <circle cx="50" cy="50" r="8" fill="#87CEEB" stroke="#4682B4" stroke-width="2"/>
  <circle cx="65" cy="50" r="8" fill="#87CEEB" stroke="#4682B4" stroke-width="2"/>
  <text x="50" y="85" text-anchor="middle" font-size="10" fill="#4169E1">CHANNEL</text>
</svg>''',

    'check.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="#32CD32" stroke="#228B22" stroke-width="3"/>
  <path d="M35 50 L45 60 L65 40" stroke="white" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>''',

    'x.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="#DC143C" stroke="#8B0000" stroke-width="3"/>
  <path d="M35 35 L65 65 M65 35 L35 65" stroke="white" stroke-width="6" stroke-linecap="round"/>
</svg>''',

    'phone.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 20 Q20 20 20 30 L20 70 Q20 80 30 80 L70 80 Q80 80 80 70 L80 30 Q80 20 70 20 Z" fill="#2F4F4F" stroke="#000" stroke-width="3"/>
  <rect x="25" y="25" width="50" height="35" rx="5" fill="#87CEEB"/>
  <rect x="30" y="65" width="40" height="10" rx="5" fill="#4169E1"/>
  <circle cx="50" cy="70" r="3" fill="white"/>
</svg>''',

    'keyboard.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="40" width="70" height="30" rx="5" fill="#2F4F4F" stroke="#000" stroke-width="3"/>
  <rect x="20" y="45" width="8" height="6" rx="2" fill="#87CEEB"/>
  <rect x="32" y="45" width="8" height="6" rx="2" fill="#87CEEB"/>
  <rect x="44" y="45" width="8" height="6" rx="2" fill="#87CEEB"/>
  <rect x="56" y="45" width="8" height="6" rx="2" fill="#87CEEB"/>
  <rect x="68" y="45" width="8" height="6" rx="2" fill="#87CEEB"/>
  <rect x="25" y="55" width="50" height="6" rx="3" fill="#87CEEB"/>
</svg>''',

    'eye.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="50" rx="35" ry="20" fill="none" stroke="#4169E1" stroke-width="3"/>
  <circle cx="50" cy="50" r="15" fill="#87CEEB" stroke="#4682B4" stroke-width="2"/>
  <circle cx="50" cy="50" r="8" fill="#000"/>
  <circle cx="53" cy="47" r="3" fill="white"/>
</svg>'''
}

# Create icons directory if it doesn't exist
icons_dir = 'icons'
if not os.path.exists(icons_dir):
    os.makedirs(icons_dir)

# Generate each missing icon
generated = 0
for filename, svg_content in missing_icons.items():
    filepath = os.path.join(icons_dir, filename)
    # Only create if it doesn't exist
    if not os.path.exists(filepath):
        with open(filepath, 'w') as f:
            f.write(svg_content)
        generated += 1
        print(f"Generated: {filename}")
    else:
        print(f"Skipped (exists): {filename}")

print(f"\nGenerated {generated} new icons in the '{icons_dir}' directory")
print(f"Total icons needed: {len(missing_icons)}")

# List any icons that might still be missing
existing_icons = set(os.listdir(icons_dir))
requested_icons = set(missing_icons.keys())
still_missing = requested_icons - existing_icons

if still_missing:
    print(f"\nStill missing: {list(still_missing)}")
else:
    print("\n✅ All requested icons have been generated!")