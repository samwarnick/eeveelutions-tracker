import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { db } from './db/db';
import { cards } from './db/schema';
import { EEVEELUTIONS } from './utils/eeveelutions';
import { eq } from 'drizzle-orm';
import { CardList } from './components/cardList';
import { OwnedButton } from './components/ownedButton';
import { z } from 'zod';
import { basicAuth } from 'hono/basic-auth';

const app = new Hono();

app.use(logger());

app.use(
	'/assets/*',
	serveStatic({
		root: './',
		rewriteRequestPath: (path) => path.replace(/^\/assets/, '/src/assets'),
	}),
);

app.get(
	'/',
	zValidator(
		'query',
		z.object({
			evolution: z.enum(['All', ...EEVEELUTIONS]).optional(),
			sort: z.enum(['asc', 'desc']).optional(),
			owned: z.enum(['both', 'owned', 'unowned']).optional(),
		}),
	),
	async (c) => {
		const query = c.req.valid('query');
		return c.html(
			<CardList
				evolution={query.evolution}
				sort={query.sort ?? "desc"}
				owned={query.owned ?? "both"}
			/>,
		);
	},
);

app.patch(
	'/:id',
	basicAuth({ username: "", password: Bun.env.PASSWORD }),
	async (c) => {
		const id = c.req.param('id');
		const card = (await db.select().from(cards).where(eq(cards.id, id)))[0];

		const isOwned = card.owned;
		await db.update(cards).set({ owned: !isOwned }).where(eq(cards.id, id));

		return c.html(<OwnedButton owned={!isOwned} id={id} />);
	},
);

export default {
	port: Bun.env.PORT || 3000,
	fetch: app.fetch
};
