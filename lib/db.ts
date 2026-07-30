import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const dbPath = path.join(process.cwd(), "database.sqlite");
const db = new DatabaseSync(dbPath);

export function getProjects() {
  const stmt = db.prepare("SELECT * FROM Ideas");
  const rows = stmt.all() as any[];
  return rows.map((row) => ({
    id: row.Id,
    title: row.Title,
    description: row.Descripcion,
    materials: row.Materials,
    course: row.Curso,
    members: JSON.parse(row.Members || "[]"),
    blogContent: row.BlogContent || null,
  }));
}

export function getProjectsByCourse(course: string) {
  const stmt = db.prepare("SELECT * FROM Ideas WHERE Curso = ?");
  const rows = stmt.all(course) as any[];
  return rows.map((row) => ({
    id: row.Id,
    title: row.Title,
    description: row.Descripcion,
    materials: row.Materials,
    course: row.Curso,
    members: JSON.parse(row.Members || "[]"),
    blogContent: row.BlogContent || null,
  }));
}

export function getProjectById(id: number) {
  const stmt = db.prepare("SELECT * FROM Ideas WHERE Id = ?");
  const row = stmt.get(id) as any;
  if (!row) return null;
  return {
    id: row.Id,
    title: row.Title,
    description: row.Descripcion,
    materials: row.Materials,
    course: row.Curso,
    members: JSON.parse(row.Members || "[]"),
    blogContent: row.BlogContent || null,
  };
}
