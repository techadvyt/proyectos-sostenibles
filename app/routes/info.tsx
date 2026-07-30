import { createFileRoute } from '@tanstack/react-router'
import { Info, BookOpen, GraduationCap, Globe } from "lucide-react";

export const Route = createFileRoute('/info')({
  component: InfoPage,
})

function InfoPage() {
  return (
    <div className="min-h-screen px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 mb-8">
            <Info className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Sobre el Proyecto</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">Información</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Información sobre la asignatura TEAMS y otras cuestiones
          </p>
        </header>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-semibold">
          <p>
            Esta página web presenta los proyectos desarrollados por el alumnado de 4º de ESO en la materia de TEAMS a lo largo del curso académico. Mediante una metodología basada en el aprendizaje por proyectos y el trabajo cooperativo, hemos abordado necesidades reales de nuestro instituto, vinculando nuestras propuestas con los Objetivos de Desarrollo Sostenible.
          </p>
          <p>
            En el primer bloque diseñamos y construimos soluciones utilizando materiales reciclados, herramientas como la cortadora láser y la impresora 3D desde una perspectiva sostenible. En el segundo bloque trabajamos la fotografía a través de la creación de foto-relatos, utilizando la imagen como medio de reflexión crítica.
          </p>
          <p>
            Esta web es también uno de los proyectos de la asignatura. Ha sido diseñada por un equipo de tres alumnos con el propósito de documentar y compartir el proceso creativo seguido en cada propuesta: planificar, ejecutar y reflexionar.
          </p>
          <p className="font-extrabold">
            Aquí se recoge no solo lo que hemos creado, sino cómo lo hemos pensado y desarrollado.
          </p>
        </div>


      </div>
    </div>
  );
}
