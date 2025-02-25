CREATE TABLE "borrowed_books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"borrow_date" date DEFAULT now() NOT NULL,
	"due_date" date NOT NULL,
	"return_date" date,
	"status" "borrow_status" DEFAULT 'BORROWED',
	"created_at" timestamp with time zone,
	CONSTRAINT "borrowed_books_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;