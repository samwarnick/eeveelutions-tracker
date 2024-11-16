import { sql, type InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const cards = sqliteTable('cards', {
	id: text('id').primaryKey(),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	cardName: text('cardName').notNull(),
	pokedexNumber: integer('pokedexNumber').notNull(),
	imageSmall: text('imageSmall').notNull(),
	imageLarge: text('imageLarge').notNull(),
	setId: text('setId').notNull(),
	setName: text('setName').notNull(),
	setReleaseDate: text('setReleaseDate').notNull(),
	tcgPlayerUrl: text('tcgPlayerUrl'),
	marketPrice: integer('marketPrice').notNull(),
	owned: integer('owned', {mode: "boolean"}).notNull().default(false)
});

export type Card = InferSelectModel<typeof cards>;
export type InsertCard = InferInsertModel<typeof cards>;
