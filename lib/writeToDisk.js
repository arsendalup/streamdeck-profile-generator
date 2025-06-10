// @ts-nocheck
const { createWriteStream, readFileSync, existsSync } = require('fs');
const { join } = require('path');

const JsZip = require('jszip');

const { profileFolderId, imageId } = require('./ids');
const { topLevelManifest } = require('./profile');

/** @typedef {import('./profile').Profile} Profile */
/** @typedef {import('./profile').Profiles} Profiles */

/**
 * Charge le contenu SVG depuis le dossier icons/
 * @param {string} iconPath - Nom de l'icône sans extension
 * @returns {string} Contenu SVG ou SVG par défaut
 */
function loadSVGIcon(iconPath) {
  // Vérifier si le fichier existe
  if (existsSync(iconPath)) {
    try {
      console.log('fichier trouvé ! ')
      return readFileSync(iconPath, 'utf8');
    } catch (error) {
      console.warn(`⚠️  Erreur lors de la lecture de ${iconPath}`, error.message);
    }
  } else {
    console.warn(`⚠️  Fichier ${iconPath} non trouvé dans /icons/`);
    return getDefaultSVG(iconPath);
  }
}

/**
 * Génère un SVG par défaut si le fichier n'existe pas
 * @param {string} iconName - Nom de l'icône
 * @returns {string} SVG par défaut
 */
function getDefaultSVG(iconName) {
  return `<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#444444"/>
      <stop offset="100%" style="stop-color:#222222"/>
    </linearGradient>
  </defs>
  <rect width="72" height="72" rx="8" fill="url(#defaultGrad)"/>
  <text x="36" y="46" font-family="Arial, sans-serif" font-size="28" font-weight="bold" 
        text-anchor="middle" fill="white">?</text>
  <text x="36" y="65" font-family="Arial, sans-serif" font-size="8" 
        text-anchor="middle" fill="#ccc">${iconName}</text>
</svg>`;
}

/**
 * @param {Profiles} profiles
 */
async function writeToDisk({
  mainProfile, additionalProfiles,
}) {
  const zip = new JsZip();
  const rootDir = zip.folder(`${mainProfile[0].uuid}.sdProfile`);
  assertNotNull(rootDir);

  rootDir.file('manifest.json', JSON.stringify(topLevelManifest(mainProfile)));

  const profilesDir = rootDir.folder('Profiles');
  assertNotNull(profilesDir);


  for (const profile of [...mainProfile, ...additionalProfiles]) {


    let profileDir = profilesDir.folder(profileFolderId(profile.uuid));
    assertNotNull(profileDir);
    let imageDir = profileDir.folder('Images');
    assertNotNull(imageDir);
    //Load all profiles icon
    profile.manifest.Controllers = profile.manifest.Controllers.map((valueProfileController) => {
      for (const [_key, value] of Object.entries(valueProfileController.Actions)) {
        value.States.forEach(stateElement => {
          if (stateElement.Image && !stateElement.Image?.includes('Images')) {
            const generatedIdImage = imageId();
            const iconPath = stateElement.Image;
            const iconFullName = `${generatedIdImage}.svg`
            const iconSourcePath = `./icons/${iconPath}.svg`
            const svgContentKey = loadSVGIcon(iconSourcePath);
            imageDir.file(iconFullName, svgContentKey);
            //update icon in manifest after write to get full
            stateElement.Image = 'Images/' + iconFullName;
          }
        });
      }
      return valueProfileController;
    });
    //Write manifest when data writed
    profileDir.file('manifest.json', JSON.stringify(profile.manifest));
  }

  const filename = `${mainProfile[0].name}.streamDeckProfile`;



  zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    // @ts-ignore This is what jszip's documentation says to do, and it works
    .pipe(createWriteStream(filename))
    .on('finish', () => {
      console.log(`🎉 ${filename} créé avec succès !`);
    })
    .on('error', (error) => {
      console.error(`❌ Erreur lors de la création: ${error.message}`);
    });
}

/**
 * @param {JsZip | null} x
 * @returns {asserts x is JsZip}
 */
function assertNotNull(x) {
  if (x == null) {
    throw new Error('Objet attendu mais null reçu');
  }
}

module.exports = {
  writeToDisk,
  loadSVGIcon, // Exporté pour les tests
};