PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_favorites` (
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`createdAt` integer NOT NULL,
	PRIMARY KEY(`userId`, `bookId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_favorites`("userId", "bookId", "createdAt") SELECT "userId", "bookId", "createdAt" FROM `favorites`;--> statement-breakpoint
DROP TABLE `favorites`;--> statement-breakpoint
ALTER TABLE `__new_favorites` RENAME TO `favorites`;--> statement-breakpoint
PRAGMA foreign_keys=ON;