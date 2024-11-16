PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cards` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`cardName` text NOT NULL,
	`pokedexNumber` integer NOT NULL,
	`imageSmall` text NOT NULL,
	`imageLarge` text NOT NULL,
	`setId` text NOT NULL,
	`setName` text NOT NULL,
	`setReleaseDate` text NOT NULL,
	`cardUrl` text NOT NULL,
	`marketPrice` integer NOT NULL,
	`owned` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_cards`("id", "created_at", "cardName", "pokedexNumber", "imageSmall", "imageLarge", "setId", "setName", "setReleaseDate", "cardUrl", "marketPrice", "owned") SELECT "id", "created_at", "cardName", "pokedexNumber", "imageSmall", "imageLarge", "setId", "setName", "setReleaseDate", "cardUrl", "marketPrice", "owned" FROM `cards`;--> statement-breakpoint
DROP TABLE `cards`;--> statement-breakpoint
ALTER TABLE `__new_cards` RENAME TO `cards`;--> statement-breakpoint
PRAGMA foreign_keys=ON;