import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  materials: text("materials").notNull(),
  course: text("course").notNull(),
  blogContent: text("blog_content"), // HTML blog content
  members: text("members").notNull().default("[]"), // JSON string
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
