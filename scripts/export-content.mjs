/**
 * Export SQLite data to Astro content collection Markdown files
 * Run: node scripts/export-content.mjs
 */
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const dbPath = path.join(rootDir, "database.sqlite");
const outputDir = path.join(rootDir, "src", "content", "projects");

if (!fs.existsSync(dbPath)) {
  console.error("Database not found at:", dbPath);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

const db = new DatabaseSync(dbPath);
const stmt = db.prepare("SELECT * FROM Ideas");
const rows = stmt.all();

let exported = 0;

for (const row of rows) {
  const id = row.Id;
  const title = (row.Title || "Untitled").trim();
  const description = (row.Descripcion || "").trim();
  const materials = (row.Materials || "").trim();
  const course = (row.Curso || "").trim();
  const members = JSON.parse(row.Members || "[]");
  const blogContent = row.BlogContent || null;

  // Create a safe slug from the title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim() || `proyecto-${id}`;

  // Build frontmatter
  const membersStr = members.map((m) => `  - "${m.replace(/"/g, '\\"')}"`).join("\n");
  
  let frontmatter = `---
id: ${id}
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
materials: "${materials.replace(/"/g, '\\"')}"
course: "${course}"
members:
${membersStr}
`;

  if (blogContent) {
    frontmatter += `hasBlogContent: true
`;
  } else {
    frontmatter += `hasBlogContent: false
`;
  }

  frontmatter += `---

`;

  // Body: use blogContent if available, otherwise use a template
  let body = "";
  if (blogContent) {
    body = blogContent;
  } else {
    body = `## Concepto y Propuesta

Este proyecto surge de un análisis profundo sobre los desafíos de sostenibilidad en el IES Puertas del Campo. Nuestra meta fue crear una solución que no solo fuera funcional, sino que también utilizara recursos locales y reciclados.

> "Buscamos transformar la manera en que gestionamos los recursos en el aula, aplicando los principios de la economía circular."

## Proceso de Desarrollo

### 1. Diseño Inicial
Planificación, bocetos y selección de materiales sostenibles para el prototipo.

### 2. Construcción
Uso de cortadora láser y herramientas del taller TEAMS para la fabricación.

## Materiales Utilizados

${materials}

## Reflexión

*[Placeholder: Aquí se incluirá la reflexión final del grupo sobre el aprendizaje obtenido y el impacto del proyecto en la comunidad escolar.]*
`;
  }

  const filePath = path.join(outputDir, `${slug}.md`);
  fs.writeFileSync(filePath, frontmatter + body, "utf-8");
  exported++;
  console.log(`✅ Exported: ${slug}.md (ID: ${id})`);
}

console.log(`\n🎉 Done! Exported ${exported} projects to ${outputDir}`);
db.close();
