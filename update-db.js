const db = require('node:sqlite');
const database = new db.DatabaseSync('database.sqlite');

function updateId(id, title, desc, html) {
  const stmt = database.prepare("UPDATE Ideas SET Title = ?, Descripcion = ?, BlogContent = ? WHERE Id = ?");
  stmt.run(title, desc, html, id);
}

function insertNew(title, desc, materials, course, members, html) {
  const stmt = database.prepare("INSERT INTO Ideas (Title, Descripcion, Materials, Curso, Members, BlogContent) VALUES (?, ?, ?, ?, ?, ?)");
  stmt.run(title, desc, materials, course, JSON.stringify(members), html);
}

// Helper to generate Tailwind HTML
function genHtml(contentHtml, photos = []) {
  let html = `<div class="space-y-16">
    <section id="desarrollo">
      <h2 class="text-2xl font-bold flex items-center gap-3 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-emerald-400"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
        Desarrollo del Proyecto
      </h2>
      <div class="prose prose-invert prose-emerald max-w-none text-zinc-400 mb-8">
        ${contentHtml}
      </div>`;
  
  if (photos.length > 0) {
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">`;
    for (const photo of photos) {
      html += `<a href="/images/${photo}" target="_blank" class="block transition-transform hover:scale-105 cursor-zoom-in">
        <img src="/images/${photo}" class="w-full h-auto object-cover rounded-2xl border border-white/10 shadow-lg" alt="Proyecto" />
      </a>`;
    }
    html += `</div>`;
  }
  
  html += `</section></div>`;
  return html;
}

// 1. Update Id 1 (Salma, Ahmad, Dulce)
updateId(1, 
  "Protección de pilas", 
  "Recortar espuma para proteger micro bits, pilas, cables en su caja correspondiente.", 
  genHtml("<p>En la asignatura de robótica, los alumnos usan maletines con materiales en su interior, materiales que se mezclan desordenadamente así que este grupo ha creado un molde de esponja para los maletines, de ese modo, cada pieza tendría un hueco correspondiente en la esponja.</p>", ["image10.jpg", "image11.jpg"])
);

// 2. Update Id 2 (Dikra, Houda)
updateId(2, 
  "Mural para la paz", 
  "Se han encargado de realizar un tipo de mural decorativo y significativo en uno de los pasillos del instituto para la paz.", 
  genHtml("<p>Huda y Dikra se han encargado de realizar un tipo de mural decorativo y significativo en uno de los pasillos del instituto para la paz. Han creado imágenes digitales en Canva y se han encargado de lo físico, pegando cada imagen en el mural principal.</p>", ["image12.png", "image9.jpg"])
);

// Update Id 4 (Reivindica tus derechos)
updateId(4,
  "Reivindica tus derechos",
  "Nuestro proyecto “Reivindica tus derechos”. Su objetivo es reconocer y dar valor a las mujeres y a su importancia en la sociedad.",
  genHtml(`<p>El equipo de chicas del Grupo 1, liderado por Dina, ha demostrado una gestión ejemplar al dividir sus proyectos basándose en las habilidades específicas de cada integrante. Bajo una premisa de equidad absoluta, todas han aportado la misma carga de trabajo, garantizando que cada función se ejecute a la perfección.</p>
  <ul class="list-disc pl-5 mt-4 space-y-2">
    <li><strong>Fati y Aya:</strong> Desarrollo del Cuadro nº 1 (Precisión y ejecución visual).</li>
    <li><strong>Noor y Sara:</strong> Diseño de Logotipo y Llaveros (Creatividad y branding del equipo).</li>
    <li><strong>Dina y Shad:</strong> Desarrollo del Cuadro nº 2 (Liderazgo operativo y detalle).</li>
    <li><strong>Lina y Shams:</strong> Creación de Escultura (Destreza artística y técnica).</li>
  </ul>`)
);

// Update Id 7 (Mural del amor)
updateId(7,
  "Mural del amor",
  "En uno de los pasillos del instituto decorar un mural. El mural llevaba una pregunta principal '¿qué es el amor?', en corazones pequeños cada miembro puso una frase significativa sobre el amor.",
  genHtml("<p>En uno de los pasillos del instituto se decoró un mural con la pregunta principal '¿qué es el amor?'. En corazones pequeños cada miembro puso una frase significativa. Nadia e Israe se encargaron del diseño y la información, mientras Nawar de lo físico y decorativo.</p>", ["image14.jpg", "image3.png", "image6.png", "image4.jpg"])
);

// Insert new groups
database.exec("DELETE FROM Ideas WHERE Id > 9");

insertNew(
  "Marco San Valentín",
  "Diseñaron un tipo de marco decorativo hecho con cartón, forrado con papel de color rojo y en la parte superior un letrero.",
  "Cartón, papel de color rojo",
  "4ºB",
  ["Mariam", "Inas", "Hanna"],
  genHtml("<p>El Grupo 1 se encargó de realizar manualidades y decoración relacionada con el día del amor, San Valentín. Diseñaron un tipo de marco decorativo hecho con cartón, forrado con papel de color rojo y en la parte superior un letrero. Inas y Mariam recopilaron información y diseño, mientras Hanna y Inas se encargaron de lo físico.</p>", ["image7.png", "image8.png"])
);

insertNew(
  "Caja para trabajos",
  "Después de terminar los trabajos, los alumnos necesitaban poner los trabajos en algún lugar, por lo que este grupo realizó una caja para meter todo aquellos trabajos.",
  "Cartón y pegamento",
  "4ºB",
  ["Mohamed F.", "Yasser", "Marwan"],
  genHtml("<p>Después de terminar los trabajos, los alumnos necesitaban poner los trabajos en algún lugar, por lo que este grupo realizó una caja para meter todo aquellos trabajos. Mohamed F. acumuló materiales, Yasser decidió el estilo y Marwan se encargó de lo físico.</p>", ["image15.jpg", "image5.png"])
);

insertNew(
  "Caja objetos perdidos",
  "Muchos alumnos pierden materiales y objetos personales a diario, para ello, este grupo se ha encargado de crear una caja de objetos perdidos.",
  "Caja de cartón y decoraciones",
  "4ºB",
  ["Roffaida", "Sara"],
  genHtml("<p>Muchos alumnos pierden materiales y objetos personales a diario, para ello, este grupo se ha encargado de crear una caja de objetos perdidos. Roffaida se encargó del estilo de la caja, y Sara de lo físico.</p>", ["image13.jpg", "image2.png"])
);

insertNew(
  "Caja de sugerencias",
  "Los alumnos en muchas ocasiones tenemos sugerencias de todo tipo para el instituto, por eso han creado una caja con un boquete para que los alumnos introduzcan un papel con sus sugerencias.",
  "Caja de cartón, colores",
  "4ºB",
  ["Wail", "Nadir"],
  genHtml("<p>Los alumnos en muchas ocasiones tenemos sugerencias de todo tipo para el instituto, por eso han creado una caja con un boquete para que los alumnos introduzcan un papel con sus sugerencias. Nadir acumuló los materiales y Wail se encargó de lo físico.</p>", ["image1.png"])
);

insertNew(
  "Plataforma Web",
  "Web para ver todos los proyectos realizados en teams.",
  "Desarrollo web, TEAMS",
  "4ºC",
  ["Ismael", "Rihab"],
  genHtml("<p>Desarrollo de una plataforma web completa para la visualización de todos los proyectos realizados en TEAMS, aplicando liderazgo horizontal y resolución de problemas reales.</p>")
);

console.log("Database updated successfully.");
