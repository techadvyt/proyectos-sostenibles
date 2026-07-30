import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// This schema is kept for reference. Data is now managed via 
// Astro Content Collections (Markdown files in src/content/projects/).
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  materials: text("materials").notNull(),
  course: text("course").notNull(),
  blogContent: text("blog_content"),
  members: text("members").notNull().default("[]"),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
