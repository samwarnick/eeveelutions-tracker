import { FC } from 'hono/jsx';
import {
	Eeveelution,
	EEVEELUTION_POKEDEX_NUMBERS,
	EEVEELUTIONS,
} from '../utils/eeveelutions';
import { Layout } from '../layout';
import { db } from '../db/db';
import { cards } from '../db/schema';
import { OwnedButton } from './ownedButton';
import { and, asc, desc, eq } from 'drizzle-orm';

export const CardList: FC<{
	evolution: Eeveelution | 'All' | undefined;
	sort: 'asc' | 'desc';
	owned: 'both' | 'owned' | 'unowned';
}> = async ({ evolution, sort, owned }) => {
	const pokedexNumber =
		evolution && evolution !== 'All'
			? EEVEELUTION_POKEDEX_NUMBERS[evolution]
			: undefined;
	const allCards = await db
		.select()
		.from(cards)
		.where(
			and(
				pokedexNumber ? eq(cards.pokedexNumber, pokedexNumber) : undefined,
				owned !== 'both' ? eq(cards.owned, owned === 'owned') : undefined,
			),
		)
		.orderBy(
			sort === 'asc' ? asc(cards.setReleaseDate) : desc(cards.setReleaseDate),
		);

	return (
		<Layout>
			<form
				class="grid"
				hx-get="/"
				hx-trigger="change"
				hx-push-url="true"
				hx-target=".container"
				hx-select=".container"
				hx-swap="outerHTML"
			>
				<select name="evolution">
					<option selected={evolution === 'All'}>All</option>
					{EEVEELUTIONS.map((name) => (
						<option value={name} selected={name === evolution}>
							{name}
						</option>
					))}
				</select>
				<select name="sort">
					<option value="desc" selected={sort === 'desc'}>
						Newest → Oldest
					</option>
					<option value="asc" selected={sort === 'asc'}>
						Oldest → Newest
					</option>
				</select>
				<select name="owned">
					<option value="both" selected={owned === 'both'}>
						Owned & Unowned
					</option>
					<option value="owned" selected={owned === 'owned'}>
						Owned
					</option>
					<option value="unowned" selected={owned === 'unowned'}>
						Unowned
					</option>
				</select>
			</form>

			<tcg-card-wrapper>
				{allCards.map((card) => (
					<article id={card.id} class={card.owned ? 'owned' : ''}>
						<tcg-card src={card.imageLarge} alt={card.cardName}></tcg-card>
						<div class="content">
							<h2>{card.cardName}</h2>
							<p>
								{card.setName} ({card.setReleaseDate})
							</p>
							<p>
								<strong>
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD',
									}).format(card.marketPrice)}
								</strong>
							</p>
							<a href={card.cardUrl}>See Details</a>
							<OwnedButton {...card} />
						</div>
					</article>
				))}
			</tcg-card-wrapper>
		</Layout>
	);
};
