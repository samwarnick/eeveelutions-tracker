import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export const EEVEELUTIONS = [
	'Eevee',
	'Vaporeon',
	'Jolteon',
	'Flareon',
	'Espeon',
	'Umbreon',
	'Leafeon',
	'Glaceon',
	'Sylveon',
] as const;

export type Eeveelution = typeof EEVEELUTIONS[number];

export const EEVEELUTION_POKEDEX_NUMBERS: {[name in Eeveelution]: number} = {
	'Eevee': 133,
	'Vaporeon': 134,
	'Jolteon': 135,
	'Flareon': 136,
	'Espeon': 196,
	'Umbreon': 197,
	'Leafeon': 470,
	'Glaceon': 471,
	'Sylveon': 700,
} as const;

async function fetchCardsFor(name: string) {
	return PokemonTCG.findCardsByQueries({ q: `name:${name}` });
}

export async function fetchCardsForEeveelutions() {
	return (await Promise.all(EEVEELUTIONS.map(fetchCardsFor))).flatMap(
		(cards) => cards,
	);
}