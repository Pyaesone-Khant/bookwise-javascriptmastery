ALTER TABLE "books" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "borrowed_books" ALTER COLUMN "created_at" SET DEFAULT now();