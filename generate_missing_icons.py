#!/usr/bin/env python3
"""Generate missing SVG icons for Star Citizen Stream Deck profile"""

import os

# Define icons to generate with their SVG content
icons_to_generate = {
    'lightning.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M55 10 L30 50 L45 50 L40 90 L70 40 L55 40 Z" fill="#FFD700" stroke="#FFA500" stroke-width="3"/>
</svg>''',

    'hand.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 C45 20 40 25 40 30 L40 45 L35 45 C30 45 25 50 25 55 L25 70 C25 80 33 88 43 88 L57 88 C67 88 75 80 75 70 L75 30 C75 25 70 20 65 20 L60 20 L60 15 C60 10 55 5 50 5 C45 5 40 10 40 15 L40 20 Z" fill="#87CEEB" stroke="#4682B4" stroke-width="2"/>
</svg>''',

    'map.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 20 L40 25 L60 20 L80 25 L80 75 L60 70 L40 75 L20 70 Z" fill="none" stroke="#4169E1" stroke-width="3"/>
  <line x1="40" y1="25" x2="40" y2="75" stroke="#4169E1" stroke-width="2"/>
  <line x1="60" y1="20" x2="60" y2="70" stroke="#4169E1" stroke-width="2"/>
</svg>''',

    'backpack.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="30" width="40" height="50" rx="5" fill="#8B4513" stroke="#654321" stroke-width="2"/>
  <path d="M40 30 L40 20 C40 15 45 10 50 10 C55 10 60 15 60 20 L60 30" fill="none" stroke="#654321" stroke-width="2"/>
  <rect x="35" y="40" width="30" height="20" rx="3" fill="#D2691E"/>
</svg>''',

    'exit.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="20" width="50" height="60" fill="none" stroke="#DC143C" stroke-width="3"/>
  <path d="M45 50 L70 50 M60 40 L70 50 L60 60" stroke="#DC143C" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>''',

    'flashlight.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="35" y="40" width="30" height="40" rx="3" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
  <rect x="38" y="35" width="24" height="10" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
  <path d="M25 20 L50 35 L75 20" fill="none" stroke="#FFD700" stroke-width="3" opacity="0.6"/>
</svg>''',

    'helmet.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="50" rx="35" ry="40" fill="#4682B4" stroke="#191970" stroke-width="3"/>
  <ellipse cx="50" cy="45" rx="25" ry="20" fill="#87CEFA" opacity="0.6"/>
  <rect x="35" y="70" width="30" height="15" rx="5" fill="#696969"/>
</svg>''',

    'chat.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 20 L80 20 Q85 20 85 25 L85 55 Q85 60 80 60 L40 60 L25 75 L25 60 L20 60 Q15 60 15 55 L15 25 Q15 20 20 20 Z" fill="#00CED1" stroke="#008B8B" stroke-width="2"/>
  <circle cx="35" cy="40" r="3" fill="#008B8B"/>
  <circle cx="50" cy="40" r="3" fill="#008B8B"/>
  <circle cx="65" cy="40" r="3" fill="#008B8B"/>
</svg>''',

    'rocket.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 10 C40 20 35 35 35 50 L35 70 L45 80 L50 70 L55 80 L65 70 L65 50 C65 35 60 20 50 10 Z" fill="#FF6347" stroke="#DC143C" stroke-width="2"/>
  <circle cx="50" cy="35" r="8" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <path d="M35 65 L30 85 L40 75 M65 65 L70 85 L60 75" fill="#FFA500" stroke="#FF8C00" stroke-width="2"/>
</svg>''',

    'gear.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 30 L55 20 L60 25 L70 20 L70 30 L80 35 L75 40 L80 50 L75 55 L80 65 L70 70 L70 80 L60 75 L55 80 L50 70 L45 80 L40 75 L30 80 L30 70 L20 65 L25 60 L20 50 L25 45 L20 35 L30 30 L30 20 L40 25 L45 20 Z" fill="#708090" stroke="#2F4F4F" stroke-width="2"/>
  <circle cx="50" cy="50" r="15" fill="#4682B4" stroke="#191970" stroke-width="2"/>
</svg>''',

    'arrows.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 L50 80 M30 60 L50 80 L70 60" stroke="#32CD32" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M20 50 L80 50 M60 30 L80 50 L60 70" stroke="#32CD32" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>''',

    'boost.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 50 L35 30 L35 40 L60 20 L60 35 L80 15 L65 50 L65 35 L50 55 L50 40 L35 60 Z" fill="#FF4500" stroke="#DC143C" stroke-width="2"/>
  <path d="M25 65 L30 70 L25 75 M35 60 L40 65 L35 70 M45 65 L50 70 L45 75" stroke="#FFA500" stroke-width="3" fill="none"/>
</svg>''',

    'brake.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="40" width="60" height="20" rx="10" fill="#DC143C" stroke="#8B0000" stroke-width="3"/>
  <text x="50" y="55" text-anchor="middle" font-size="14" fill="white" font-weight="bold">STOP</text>
</svg>''',

    'landing.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 50 L50 30 L70 50 L70 60 L60 60 L60 70 L40 70 L40 60 L30 60 Z" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <rect x="35" y="70" width="10" height="10" fill="#696969"/>
  <rect x="55" y="70" width="10" height="10" fill="#696969"/>
  <path d="M20 80 L80 80" stroke="#32CD32" stroke-width="4" stroke-dasharray="5,5"/>
</svg>''',

    'quantum.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#00FFFF" stroke-width="3"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="#00CED1" stroke-width="2"/>
  <circle cx="50" cy="50" r="10" fill="#00FFFF"/>
  <path d="M20 50 L30 50 M70 50 L80 50 M50 20 L50 30 M50 70 L50 80" stroke="#00FFFF" stroke-width="3"/>
</svg>''',

    'target.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="35" fill="none" stroke="#FF0000" stroke-width="3"/>
  <circle cx="50" cy="50" r="25" fill="none" stroke="#FF0000" stroke-width="2"/>
  <circle cx="50" cy="50" r="15" fill="none" stroke="#FF0000" stroke-width="2"/>
  <circle cx="50" cy="50" r="5" fill="#FF0000"/>
  <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50" stroke="#FF0000" stroke-width="3"/>
</svg>''',

    'missile-up.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 L55 30 L55 60 L60 70 L50 75 L40 70 L45 60 L45 30 Z" fill="#B22222" stroke="#8B0000" stroke-width="2"/>
  <path d="M40 30 L35 40 L40 40 Z M60 30 L65 40 L60 40 Z" fill="#DC143C"/>
  <path d="M50 10 L55 20 L45 20 Z" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
</svg>''',

    'door.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="20" width="50" height="60" fill="#8B4513" stroke="#654321" stroke-width="3"/>
  <rect x="30" y="25" width="20" height="25" fill="#D2691E" stroke="#A0522D" stroke-width="2"/>
  <rect x="55" y="25" width="15" height="25" fill="#D2691E" stroke="#A0522D" stroke-width="2"/>
  <circle cx="65" cy="50" r="3" fill="#FFD700"/>
</svg>''',

    'lock.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="45" width="40" height="35" rx="5" fill="#FFD700" stroke="#B8860B" stroke-width="3"/>
  <path d="M40 45 L40 35 Q40 20 50 20 Q60 20 60 35 L60 45" fill="none" stroke="#B8860B" stroke-width="3"/>
  <circle cx="50" cy="60" r="4" fill="#8B4513"/>
  <rect x="48" y="60" width="4" height="10" fill="#8B4513"/>
</svg>''',

    'pickaxe.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="45" y="30" width="10" height="50" fill="#8B4513" stroke="#654321" stroke-width="2"/>
  <path d="M20 20 L40 30 L40 40 L20 35 Q15 30 20 20 Z" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
  <path d="M80 20 L60 30 L60 40 L80 35 Q85 30 80 20 Z" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
</svg>''',

    'power-up.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="#32CD32" stroke="#228B22" stroke-width="3"/>
  <path d="M50 35 L35 50 L45 50 L45 65 L55 65 L55 50 L65 50 Z" fill="white"/>
</svg>''',

    'users.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="35" cy="30" r="10" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <path d="M20 50 Q20 40 35 40 Q50 40 50 50 L50 60 L20 60 Z" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <circle cx="65" cy="30" r="10" fill="#DC143C" stroke="#8B0000" stroke-width="2"/>
  <path d="M50 50 Q50 40 65 40 Q80 40 80 50 L80 60 L50 60 Z" fill="#DC143C" stroke="#8B0000" stroke-width="2"/>
</svg>''',

    'smile.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="35" fill="#FFD700" stroke="#FFA500" stroke-width="3"/>
  <circle cx="35" cy="40" r="5" fill="#000"/>
  <circle cx="65" cy="40" r="5" fill="#000"/>
  <path d="M30 60 Q50 70 70 60" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
</svg>''',

    'wave.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 60 L40 40 L35 35 L35 30 L40 30 L40 35 L45 35 L45 30 L50 30 L50 35 L55 35 L55 30 L60 30 L60 35 L65 35 L65 40 L60 45 L60 60 Q60 70 50 70 Q40 70 40 60 Z" fill="#FDBCB4" stroke="#CD853F" stroke-width="2"/>
  <path d="M25 40 Q30 35 30 40 M20 45 Q25 40 25 45 M15 50 Q20 45 20 50" stroke="#4169E1" stroke-width="2" fill="none"/>
</svg>''',

    'thumbs-up.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 70 L40 40 L35 40 L35 30 L40 30 L45 20 L50 20 L50 40 L70 40 L70 70 L40 70 Z" fill="#32CD32" stroke="#228B22" stroke-width="3"/>
  <rect x="25" y="40" width="10" height="30" fill="#228B22"/>
</svg>''',

    'turret.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="60" width="40" height="20" rx="5" fill="#696969" stroke="#2F4F4F" stroke-width="3"/>
  <rect x="45" y="40" width="10" height="25" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
  <circle cx="50" cy="40" r="15" fill="#4682B4" stroke="#191970" stroke-width="3"/>
  <rect x="45" y="20" width="10" height="25" fill="#2F4F4F"/>
  <circle cx="50" cy="40" r="5" fill="#FF0000"/>
</svg>''',

    'car.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="40" width="60" height="25" rx="5" fill="#4169E1" stroke="#191970" stroke-width="3"/>
  <path d="M30 40 L35 25 L65 25 L70 40" fill="#87CEEB" stroke="#191970" stroke-width="2"/>
  <circle cx="30" cy="65" r="8" fill="#2F4F4F" stroke="#000" stroke-width="2"/>
  <circle cx="70" cy="65" r="8" fill="#2F4F4F" stroke="#000" stroke-width="2"/>
</svg>''',

    'wrench.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 70 L50 50 L45 45 Q40 40 40 30 Q40 20 50 20 Q60 20 60 30 Q60 35 58 38 L52 32 L48 36 L54 42 Q50 45 45 45 L50 50 L70 30" fill="#708090" stroke="#2F4F4F" stroke-width="3"/>
</svg>''',

    'display.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="60" height="45" rx="5" fill="#000080" stroke="#00008B" stroke-width="3"/>
  <rect x="25" y="25" width="50" height="35" fill="#1E90FF"/>
  <rect x="40" y="65" width="20" height="10" fill="#696969"/>
  <rect x="30" y="75" width="40" height="5" fill="#696969"/>
</svg>''',

    'camera.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="35" width="60" height="40" rx="5" fill="#2F4F4F" stroke="#000" stroke-width="3"/>
  <rect x="35" y="30" width="30" height="10" fill="#2F4F4F" stroke="#000" stroke-width="2"/>
  <circle cx="50" cy="55" r="12" fill="#4169E1" stroke="#191970" stroke-width="3"/>
  <circle cx="50" cy="55" r="6" fill="#87CEEB"/>
  <rect x="70" y="40" width="5" height="5" fill="#FF0000"/>
</svg>''',

    'horn.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 40 L50 30 L50 70 L30 60 L20 60 L20 40 Z" fill="#FFD700" stroke="#B8860B" stroke-width="3"/>
  <path d="M60 40 Q70 35 70 40 M60 50 Q75 45 75 50 M60 60 Q70 65 70 60" stroke="#B8860B" stroke-width="3" fill="none"/>
</svg>''',

    'headset.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 50 Q30 30 50 30 Q70 30 70 50 L70 60 L65 60 L65 70 L60 70 L60 50 L55 50 L55 70 L45 70 L45 50 L40 50 L40 70 L35 70 L35 60 L30 60 Z" fill="none" stroke="#4169E1" stroke-width="3"/>
  <circle cx="35" cy="60" r="8" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <circle cx="65" cy="60" r="8" fill="#4169E1" stroke="#191970" stroke-width="2"/>
  <rect x="45" y="70" width="10" height="15" rx="5" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
</svg>''',

    'microphone.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="45" y="20" width="10" height="40" rx="5" fill="#4169E1" stroke="#191970" stroke-width="3"/>
  <path d="M35 50 Q35 65 50 65 Q65 65 65 50" fill="none" stroke="#191970" stroke-width="3"/>
  <rect x="48" y="65" width="4" height="10" fill="#191970"/>
  <rect x="40" y="75" width="20" height="5" fill="#191970"/>
</svg>''',

    'eject.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 L30 50 L70 50 Z" fill="#FF4500" stroke="#DC143C" stroke-width="3"/>
  <rect x="30" y="55" width="40" height="25" rx="5" fill="#DC143C" stroke="#8B0000" stroke-width="3"/>
  <path d="M50 65 L50 70" stroke="white" stroke-width="4" stroke-linecap="round"/>
</svg>''',

    'crosshair.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#FF0000" stroke-width="2"/>
  <path d="M50 15 L50 35 M50 65 L50 85 M15 50 L35 50 M65 50 L85 50" stroke="#FF0000" stroke-width="3"/>
  <circle cx="50" cy="50" r="5" fill="#FF0000"/>
</svg>''',

    'pin.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20 Q30 20 30 40 Q30 50 50 70 Q70 50 70 40 Q70 20 50 20 Z" fill="#FF0000" stroke="#8B0000" stroke-width="3"/>
  <circle cx="50" cy="40" r="10" fill="#FFF"/>
</svg>''',

    'hostile.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,20 65,45 90,45 70,60 80,85 50,65 20,85 30,60 10,45 35,45" fill="#FF0000" stroke="#8B0000" stroke-width="3"/>
</svg>''',

    'gimbal.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" fill="none" stroke="#4169E1" stroke-width="3"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="#4169E1" stroke-width="2"/>
  <circle cx="50" cy="50" r="10" fill="#4169E1"/>
  <path d="M20 50 L80 50 M50 20 L50 80" stroke="#4169E1" stroke-width="2"/>
</svg>''',

    'esp.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <text x="50" y="40" text-anchor="middle" font-size="24" font-weight="bold" fill="#00CED1">ESP</text>
  <path d="M20 50 Q30 60 40 50 Q50 40 60 50 Q70 60 80 50" fill="none" stroke="#00CED1" stroke-width="3"/>
</svg>''',

    'decoy.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="35" cy="50" r="15" fill="#FFD700" stroke="#FFA500" stroke-width="2" opacity="0.7"/>
  <circle cx="50" cy="50" r="15" fill="#FFD700" stroke="#FFA500" stroke-width="2" opacity="0.7"/>
  <circle cx="65" cy="50" r="15" fill="#FFD700" stroke="#FFA500" stroke-width="2" opacity="0.7"/>
</svg>''',

    'fire-mode.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="45" width="15" height="10" rx="2" fill="#FF4500"/>
  <rect x="42" y="45" width="15" height="10" rx="2" fill="#FF4500"/>
  <rect x="65" y="45" width="15" height="10" rx="2" fill="#FF4500"/>
  <path d="M25 40 L25 35 M50 40 L50 30 M72 40 L72 25" stroke="#FF4500" stroke-width="3"/>
</svg>''',

    'scan.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="35" fill="none" stroke="#00FF00" stroke-width="2" stroke-dasharray="5,5"/>
  <circle cx="50" cy="50" r="25" fill="none" stroke="#00FF00" stroke-width="2" stroke-dasharray="5,5"/>
  <circle cx="50" cy="50" r="15" fill="none" stroke="#00FF00" stroke-width="2" stroke-dasharray="5,5"/>
  <path d="M50 20 L50 80" stroke="#00FF00" stroke-width="3" opacity="0.5"/>
  <circle cx="65" cy="35" r="5" fill="#FF0000"/>
</svg>''',

    'mining.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 70 L40 50 L35 45 L45 35 L55 40 L65 30 L70 35 L60 45 L65 55 L55 65 L50 60 L30 70 Z" fill="#FFD700" stroke="#B8860B" stroke-width="3"/>
  <circle cx="45" cy="45" r="3" fill="#FF0000"/>
  <circle cx="55" cy="55" r="3" fill="#FF0000"/>
</svg>''',

    'salvage.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="30" width="40" height="40" fill="#8B4513" stroke="#654321" stroke-width="3"/>
  <path d="M40 40 L40 60 M50 40 L50 60 M60 40 L60 60" stroke="#654321" stroke-width="2"/>
  <path d="M25 25 L35 35 M65 35 L75 25 M25 75 L35 65 M65 65 L75 75" stroke="#FFD700" stroke-width="4"/>
</svg>''',

    'light.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="40" r="20" fill="#FFD700" stroke="#FFA500" stroke-width="3"/>
  <rect x="45" y="60" width="10" height="15" fill="#696969" stroke="#2F4F4F" stroke-width="2"/>
  <rect x="40" y="75" width="20" height="5" fill="#696969"/>
  <path d="M50 10 L50 20 M30 20 L35 25 M70 20 L65 25 M20 40 L30 40 M70 40 L80 40" stroke="#FFD700" stroke-width="3"/>
</svg>''',

    'radio.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="40" width="50" height="30" rx="5" fill="#4169E1" stroke="#191970" stroke-width="3"/>
  <circle cx="35" cy="55" r="5" fill="#87CEEB" stroke="#4682B4" stroke-width="2"/>
  <rect x="45" y="50" width="20" height="3" fill="#87CEEB"/>
  <rect x="45" y="57" width="20" height="3" fill="#87CEEB"/>
  <path d="M50 40 L45 20 M55 20 Q50 25 45 20" stroke="#191970" stroke-width="2"/>
</svg>''',

    'lock-on.svg': '''<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="30" width="40" height="40" fill="none" stroke="#FF0000" stroke-width="3"/>
  <rect x="20" y="20" width="10" height="10" fill="#FF0000"/>
  <rect x="70" y="20" width="10" height="10" fill="#FF0000"/>
  <rect x="20" y="70" width="10" height="10" fill="#FF0000"/>
  <rect x="70" y="70" width="10" height="10" fill="#FF0000"/>
  <circle cx="50" cy="50" r="5" fill="#FF0000"/>
</svg>'''
}

# Create icons directory if it doesn't exist
icons_dir = 'icons'
if not os.path.exists(icons_dir):
    os.makedirs(icons_dir)

# Generate each icon
generated = 0
for filename, svg_content in icons_to_generate.items():
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