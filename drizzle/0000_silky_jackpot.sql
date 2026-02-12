CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titleEn` text NOT NULL,
	`titleFr` text NOT NULL,
	`titleHe` text,
	`slug` text NOT NULL,
	`descriptionEn` text,
	`descriptionFr` text,
	`descriptionHe` text,
	`author` text NOT NULL,
	`categoryId` integer,
	`type` text NOT NULL,
	`pages` integer,
	`language` text DEFAULT 'fr',
	`pricePhysical` real,
	`priceDigital` real,
	`inStock` integer DEFAULT true,
	`weight` integer,
	`dimensions` text,
	`coverImageUrl` text,
	`pdfUrl` text,
	`previewPdfUrl` text,
	`featured` integer DEFAULT false,
	`includedInSubscription` integer DEFAULT true,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_slug_unique` ON `books` (`slug`);--> statement-breakpoint
CREATE TABLE `cart_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`type` text DEFAULT 'physical' NOT NULL,
	`addedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nameEn` text NOT NULL,
	`nameFr` text NOT NULL,
	`nameHe` text,
	`slug` text NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orderId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`quantity` integer NOT NULL,
	`priceAtPurchase` real NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`totalAmount` real NOT NULL,
	`currency` text DEFAULT 'ILS' NOT NULL,
	`status` text DEFAULT 'pending',
	`paymentStatus` text DEFAULT 'pending',
	`shippingAddress` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reading_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`currentPage` integer DEFAULT 0 NOT NULL,
	`totalPages` integer NOT NULL,
	`progressPercent` integer DEFAULT 0,
	`completed` integer DEFAULT false,
	`lastReadAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`rating` integer,
	`comment` text,
	`approved` integer DEFAULT false,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subscription_plans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nameEn` text NOT NULL,
	`nameFr` text NOT NULL,
	`nameHe` text,
	`slug` text NOT NULL,
	`descriptionEn` text,
	`descriptionFr` text,
	`descriptionHe` text,
	`price` real NOT NULL,
	`currency` text DEFAULT 'ILS' NOT NULL,
	`duration` text NOT NULL,
	`maxDevices` integer DEFAULT 1,
	`active` integer DEFAULT true,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscription_plans_slug_unique` ON `subscription_plans` (`slug`);--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`planId` integer NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`startDate` integer NOT NULL,
	`endDate` integer NOT NULL,
	`paymentMethodId` text,
	`subscriptionId` text,
	`autoRenew` integer DEFAULT true,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`planId`) REFERENCES `subscription_plans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`openId` text NOT NULL,
	`name` text,
	`email` text,
	`loginMethod` text,
	`role` text DEFAULT 'user' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`lastSignedIn` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_openId_unique` ON `users` (`openId`);