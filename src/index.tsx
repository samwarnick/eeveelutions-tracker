import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { db } from './db/db';
import { Layout } from './layout';
import { cards } from './db/schema';
import { EEVEELUTIONS } from './utils/eeveelutions';

const app = new Hono();

app.use(logger());

app.use(
	'/assets/*',
	serveStatic({
		root: './',
		rewriteRequestPath: (path) => path.replace(/^\/assets/, '/src/assets'),
	}),
);

app.get('/', async (c) => {
	const allCards = await db.select().from(cards);
	return c.html(
		<Layout>
			<select name="select" aria-label="Select" required>
				<option selected>All</option>
				{EEVEELUTIONS.map((name) => (<option value={name}>{name}</option>))}
			</select>
			<tcg-card-wrapper>
				{allCards.map((card) => (<article>
					<tcg-card src={card.imageLarge} alt={card.cardName}></tcg-card>
					<div class="content">
						<h2>{card.cardName}</h2>
						<p>{card.setName} ({card.setReleaseDate})</p>
					</div>
				</article>))}
			</tcg-card-wrapper>
		</Layout>,
	);
});

export default app;
