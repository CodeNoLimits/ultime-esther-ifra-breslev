CREATE TABLE `audio_lessons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titleFr` text NOT NULL,
	`titleHe` text,
	`descriptionFr` text,
	`rubrique` text NOT NULL,
	`audioUrl` text NOT NULL,
	`duration` integer,
	`thumbnailUrl` text,
	`publishDate` integer,
	`dayOfYear` integer,
	`active` integer DEFAULT true,
	`featured` integer DEFAULT false,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
