import { date, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED'])
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN'])
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED'])

export const users = pgTable('users', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: text('email').notNull().unique(),
    universityId: integer('university_id').notNull().unique(),
    password: text('password').notNull(),
    universityCard: text('university_card').notNull(),
    status: STATUS_ENUM('status').default('PENDING'),
    role: ROLE_ENUM('role').default('USER'),
    lastActivityDate: date('last_activity_date').defaultNow(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
    }).defaultNow(),
})

export const books = pgTable('books', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    genre: varchar('genre', { length: 255 }).notNull(),
    rating: integer('rating').notNull(),
    totalCopies: integer('total_copies').notNull().default(1),
    availableCopies: integer('available_copies').notNull().default(0),
    coverColor: varchar('cover_color', { length: 7 }).notNull(),
    coverUrl: text('cover_url').notNull(),
    videoUrl: text('video_url').notNull(),
    summary: text('summary').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
})

export const borrowedBooks = pgTable('borrowed_books', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    bookId: uuid('book_id').notNull().references(() => books.id),
    userId: uuid('user_id').notNull().references(() => users.id),
    borrowDate: date('borrow_date').notNull().defaultNow(),
    dueDate: date('due_date').notNull(),
    returnDate: date('return_date'),
    status: BORROW_STATUS_ENUM('status').default('BORROWED'),
    createdAt: timestamp('created_at', { withTimezone: true })
})