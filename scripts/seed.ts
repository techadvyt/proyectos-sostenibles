import { db } from "../lib/db";
import { projects } from "../lib/schema";

const initialData = [
  {
    title: "Jardín Vertical",
    description: "Diseño y construcción de un jardín vertical sostenible utilizando materiales reciclados para mejorar la calidad del aire.",
    materials: "Botellas de plástico, cuerdas, sustrato y plantas.",
    course: "4ºB",
    members: JSON.stringify(["Sami", "Nadir", "Ilyas", "Yunes", "Zacarias"])
  },
  {
    title: "Eco-Lámparas",
    description: "Creación de lámparas decorativas a partir de envases de vidrio y plástico reciclados.",
    materials: "Botellas de vidrio, plásticos variados, bombillas LED de bajo consumo.",
    course: "4ºA",
    members: JSON.stringify(["Marta", "Sara", "Javier", "Luis"])
  },
  {
    title: "Huerto Solar",
    description: "Miniatura de un huerto con riego automatizado alimentado por paneles solares.",
    materials: "Caja de cartón, cartulina, silicona, cinta adhesiva y madera.",
    course: "4ºA",
    members: JSON.stringify(["Akram", "Omar", "Zacarias", "Adam", "Ali"])
  },
  {
    title: "Recreo Residuos 0",
    description: "Campaña de concienciación y creación de juegos residuales para reducir la basura en los recreos.",
    materials: "Canva, PowerPoint, materiales reciclados para prototipos.",
    course: "4ºC",
    members: JSON.stringify(["Nizar", "Yunes", "Sulaiman", "Yasin", "Ayman", "Mesaud"])
  }
];

async function seed() {
  console.log("Seeding started...");
  for (const data of initialData) {
    await db.insert(projects).values(data);
  }
  console.log("Seeding finished.");
  process.exit(0);
}

seed();
