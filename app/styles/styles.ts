import { description } from '../layout'
import cyclOsm from './cyclOsmStyle'
import elections from './elections'
import franceStyle from './france'
import natureStyle from './nature'
import railStyle from './railStyle'
import testStreetComplete from './test-street-complete'
import transit from './transit'
import voyageStyle from './voyage'

const key = process.env.NEXT_PUBLIC_MAPTILER

const maptilerUrl = (styleId) =>
	`https://api.maptiler.com/maps/${styleId}/style.json?key=${key}`
export const styles = {
	/* This style will replace the base MapTiler style, for cost reduction
	 * purposes (50 to 100 €/month in june !)
	 */
	france: {
		url: franceStyle(key),
		name: 'France',
		description: `Notre style maison, avec des bonus inédits : rail visible à haut niveau, arbres, et plein de futures nouveautés. Hébergé sur nos serveurs, contrairement aux autres il ne nous coûte rien. C'est le futur.`,
		attribution:
			'<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
	},
	/* The historical maptiler streets that we tuned for cartes.app */
	base: {
		url: voyageStyle(key),
		name: 'Monde',
		description: `C'est l'ancienne version du style principal, qui reste meilleur pour un certain nombre d'aspects : noms des lieux étrangers en français, moins de bugs sur les côtes.`,
		emoji: '🗺️',
	},
	satellite: {
		url: maptilerUrl('satellite'),
		name: 'Satellite',
		emoji: '🛰️',
	},
	satelliteHybrid: {
		url: maptilerUrl('hybrid'),
		title: 'satellite avec superposition des noms de lieux et rues',
		name: 'Hybride',
		emoji: '🛰️',
	},
	rando: {
		url: maptilerUrl('outdoor-v2'),
		name: 'Randonnée',
		subtitle: '(marche & vélo)',
		emoji: '🚶',
		hasTerrain: true,
	},
	ign: {
		url: 'https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/standard.json',
		name: 'IGN',
		imageAlt: "Logo de l'IGN",
		attribution: '© IGN',
	},
	osm: {
		url: maptilerUrl('openstreetmap'),
		name: 'OSM',
	},
	nature: {
		url: natureStyle(key),
		name: 'Nature',
		emoji: '🏕️',
		hasTerrain: false,
	},
	cycling: { url: cyclOsm(key), name: 'Cyclable', emoji: '🚲️' },
	rail: {
		url: railStyle(key),
		name: 'Rails',
		emoji: '🛤️',
	},
	light: {
		// Taken from MapTiler's dataviz style
		url: transit(key),
		name: 'Fond léger',
		emoji: '⬜️',
	},
	winter: {
		url: maptilerUrl('winter-v2'),
		name: 'Hiver',
		emoji: '⛄️',
		hasTerrain: true,
	},
	'street-complete': {
		// Taken from MapTiler's dataviz style
		url: testStreetComplete,
		name: 'StreetComplete',
		emoji: '🧪',
		secondary: true,
	},
	elections: {
		url: elections(key),
		name: 'Élections',
		emoji: '🗳️',
		secondary: true,
	},
}

export const getStyle = (styleKey) => ({ ...styles[styleKey], key: styleKey })
