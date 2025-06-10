/**
 * @fileoverview Types and helper functions for Stream Deck profiles
 */

const { action } = require('./actions');
const { profileId } = require('./ids');

/** @typedef {import('./actions').Action} Action */

/**
 * @typedef {{
 *   "Controllers": {
 *     "Actions": Record<string, Action>,
 *     "Type": "Keypad",
 *   }[],
 * }} ProfileManifest
 */

/**
 * @typedef {{
 *   name: string,
 *   icon: string,
 *   manifest: ProfileManifest,
 *   uuid: string,
 * }} Profile - can be created with the profile() function
 */

/**
 * @typedef {Object} Profiles
 * @property {Profile[]} mainProfile - the base layout - main page
 * @property {Profile[]} additionalProfiles - all of the layouts that are referenced via folders
 */

/**
 * @typedef {{
 *   "Device"?: {
 *     "Model": string,
 *     "UUID": ''
 *   },
 *   "Name": string,
 *   "Icon" : string,
 *   "Pages": {
 *     "Current": string,
 *     "Pages": string[],
 *   },
 *   "Version": '2.0'
 * }} TopLevelManifest
 */

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

/**
 * @param {{
 *   name: string,
 *   icon: string,
 *   actions: (Action | null | undefined)[][]
 * }} config
 * @returns {Profile}
 */
function profile({
  name,
  icon,
  actions,
}) {
  /** @type {Record<string, Action>} */
  const byCoordinate = {};
  actions.forEach((row, rowNum) => {
    row.forEach((action, colNum) => {
      if (!action) {
        return;
      }
      byCoordinate[`${colNum},${rowNum}`] = action;
    });
  });
  return {
    name,
    uuid: profileId(),
    icon: icon,
    manifest: {
      'Controllers': [
        {
          'Actions': byCoordinate,
          'Type': 'Keypad',
        },
      ],
    },
  };
}

/**
 * @param {Profile[]} mainProfile
 * @returns {TopLevelManifest}
 */
function topLevelManifest(mainProfile) {
  return {
    "Name": mainProfile[0].name,
    "Icon" : mainProfile[0].icon,
    "Pages": {
      "Current": mainProfile[0].uuid,
      "Pages": [
        ...mainProfile.map((profile)=> profile.uuid) 
      ],
    },
    "Version": "2.0",
  }
}

module.exports = {
  folder,
  profile,
  topLevelManifest,
}
