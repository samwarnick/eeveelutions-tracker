import { Card } from 'pokemon-tcg-sdk-typescript/dist/interfaces/card';
import {
	EEVEELUTION_POKEDEX_NUMBERS,
	fetchCardsForEeveelutions,
} from '../utils/eeveelutions';
import { db } from './db';
import { cards, InsertCard } from './schema';
import { sql } from 'drizzle-orm';
import {
	Price,
} from 'pokemon-tcg-sdk-typescript/dist/interfaces/tcgplayer';
console.log('Updating Eeveelution cards...')

const POSSIBLE_POKEDEX_NUMBERS = Object.values(EEVEELUTION_POKEDEX_NUMBERS);

const eeveelutionCards = await fetchCardsForEeveelutions();

const cardModels: InsertCard[] = eeveelutionCards.map((card) => ({
	id: card.id,
	cardName: card.name,
	pokedexNumber: card.nationalPokedexNumbers?.find((n) =>
		POSSIBLE_POKEDEX_NUMBERS.includes(n),
	)!,
	imageSmall: card.images.small,
	imageLarge: card.images.large,
	setId: card.set.id,
	setName: card.set.name,
	setReleaseDate: card.set.releaseDate,
	cardUrl: card.tcgplayer?.url ?? (card as any).cardmarket?.url ?? "",
	marketPrice: getMarketPrice(card),
}));


function getMarketPrice(card: Card): number {
	const tcgPlayerPrices = (card.tcgplayer?.prices as { [key: string]: Price }) ?? {};
	const marketPricesForEditions = Object.values(tcgPlayerPrices).map(
		(p) => p.market ?? p.directLow ?? p.mid ?? 0,
	);
	if (marketPricesForEditions.length === 0 && (card as any).cardmarket?.prices) {
		marketPricesForEditions.push((card as any).cardmarket?.prices.averageSellPrice)
	}
	return Math.max(...marketPricesForEditions);
}

await db
	.insert(cards)
	.values(cardModels.filter(c => !!c.cardUrl))
	.onConflictDoUpdate({
		target: cards.id,
		set: {
			cardUrl: sql.raw(`excluded.${cards.cardUrl.name}`),
			marketPrice: sql.raw(`excluded.${cards.marketPrice.name}`),
		},
	});

console.log("Done!");
