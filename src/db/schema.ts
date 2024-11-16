import { sql, type InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { EEVEELUTIONS } from '../utils/eeveelutions';

export const cards = sqliteTable('cards', {
	id: text('id').primaryKey(),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	cardName: text('cardName').notNull(),
	pokemonName: text("pokemonName", {enum: EEVEELUTIONS}).notNull(),
	pokedexNumber: integer('pokedexNumber').notNull(),
	imageSmall: text('imageSmall').notNull(),
	imageLarge: text('imageLarge').notNull(),
	setId: text('setId').notNull(),
	setName: text('setName').notNull(),
	setReleaseDate: text('setReleaseDate').notNull(),
	marketPrice: integer('marketPrice').notNull(),
	owned: integer('owned', {mode: "boolean"}).notNull().default(false)
});

export type Card = InferSelectModel<typeof cards>;
export const insertCardSchema = createInsertSchema(cards);
