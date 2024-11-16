import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export const EEVEELUTIONS = [
	'Eevee',
	'Vaporeon',
	'Jolteon',
	'Flareon',
	'Sylveon',
	'Espeon',
	'Umbreon',
	'Leafeon',
	'Glaceon',
] as const;

async function fetchCardsFor(name: string) {
	return PokemonTCG.findCardsByQueries({ q: `name:${name}` });
}

export async function fetchCardsForEeveelutions() {
	return (await Promise.all(EEVEELUTIONS.map(fetchCardsFor))).flatMap(
		(cards) => cards,
	);
}