CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`cardName` text NOT NULL,
	`pokemonName` text NOT NULL,
	`pokedexNumber` integer NOT NULL,
	`imageSmall` text NOT NULL,
	`imageLarge` text NOT NULL,
	`setId` text NOT NULL,
	`setName` text NOT NULL,
	`setReleaseDate` text NOT NULL,
	`marketPrice` integer NOT NULL,
	`owned` integer DEFAULT false NOT NULL
);
