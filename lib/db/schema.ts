import { integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum('user_system_enum', ['system','user']);

export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    pdfName: varchar('pdf_name').notNull(),
    pdfUrl: varchar('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: varchar('user_id', {length: 256}).notNull(),
    fileKey: varchar('file_key').notNull(),
});

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(() => chats.id).notNull(),
    content: varchar('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    role: userSystemEnum('role').notNull().default('user'),
});