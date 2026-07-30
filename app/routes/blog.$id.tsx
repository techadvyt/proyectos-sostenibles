import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getProjectById } from '@/lib/db'
import { Users, Package, Calendar, Globe, BookOpen, PenTool, Lightbulb, ChevronRight } from "lucide-react"

const getProjectFn = createServerFn({ method: 'GET' })
  .inputValidator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    return getProjectById(data.id)
  })

export const Route = createFileRoute('/blog/$id')({
  loader: async ({ params }) => {
    const project = await getProjectFn({ data: { id: parseInt(params.id) } })
    if (!project) {
      throw new Error('Project not found')
    }
    return { project }
  },
  component: ProjectDetail,
})

function ProjectDetail() {
  const { project } = Route.useLoaderData()

  return (
    <article className="animate-in fade-in duration-700">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8 font-medium">
        <Link to="/proyectos" className="hover:text-emerald-400">Proyectos</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-emerald-400 truncate">{project.title}</span>
      </div>

      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
          {project.title}
        </h1>
        <p className="text-xl text-zinc-400 border-l-2 border-emerald-500/50 pl-6 py-1 leading-relaxed">
          {project.description}
        </p>
      </header>

      <div className="flex flex-wrap gap-6 mb-16 px-4 py-3 bg-zinc-900/40 border border-white/5 rounded-2xl">
        <div className="flex items-center gap-2 text-xs">
          <Users className="w-4 h-4 text-emerald-500" />
          <span className="text-zinc-300">{project.members.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Calendar className="w-4 h-4 text-emerald-500" />
          <span className="text-zinc-300">{project.course}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start w-full">
        <aside className="lg:w-1/4 w-full sticky top-8 p-6 bg-zinc-900/40 border border-white/5 rounded-2xl">
          <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            Índice
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            {project.blogContent ? (
              <li><a href="#desarrollo" className="text-zinc-400 hover:text-emerald-400 transition-colors">Desarrollo del Proyecto</a></li>
            ) : (
              <>
                <li><a href="#concepto" className="text-zinc-400 hover:text-emerald-400 transition-colors">Concepto y Propuesta</a></li>
                <li><a href="#proceso" className="text-zinc-400 hover:text-emerald-400 transition-colors">Proceso de Desarrollo</a></li>
                <li><a href="#materiales" className="text-zinc-400 hover:text-emerald-400 transition-colors">Materiales Utilizados</a></li>
                <li><a href="#reflexion" className="text-zinc-400 hover:text-emerald-400 transition-colors">Reflexión</a></li>
              </>
            )}
          </ul>
        </aside>

        <div className="lg:w-3/4 w-full">
          {project.blogContent ? (
            <div dangerouslySetInnerHTML={{ __html: project.blogContent }} />
          ) : (
            <div className="space-y-16">
              <section id="concepto">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-emerald-400" />
                  Concepto y Propuesta
                </h2>
                <div className="prose prose-invert prose-emerald max-w-none text-zinc-400">
                  <p>
                    Este proyecto surge de un análisis profundo sobre los desafíos de sostenibilidad en el IES Puertas del Campo. 
                    Nuestra meta fue crear una solución que no solo fuera funcional, sino que también utilizara recursos locales y reciclados.
                  </p>
                  <blockquote className="border-emerald-500/20 bg-emerald-500/5 p-4 rounded-xl italic text-zinc-500">
                    "Buscamos transformar la manera en que gestionamos los recursos en el aula, aplicando los principios de la economía circular."
                  </blockquote>
                </div>
              </section>

              <section id="proceso">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                  <PenTool className="w-6 h-6 text-emerald-400" />
                  Proceso de Desarrollo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">1</span>
                      Diseño Inicial
                    </h4>
                    <p className="text-sm text-zinc-500">Planificación, bocetos y selección de materiales sostenibles para el prototipo.</p>
                  </div>
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">2</span>
                      Construcción
                    </h4>
                    <p className="text-sm text-zinc-500">Uso de cortadora láser y herramientas del taller TEAMS para la fabricación.</p>
                  </div>
                </div>
              </section>

              <section id="materiales">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-emerald-400" />
                  Materiales Utilizados
                </h2>
                <div className="p-8 bg-zinc-950 border border-white/5 rounded-3xl border-dashed hover:border-emerald-500/20 transition-colors">
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    {project.materials}
                  </p>
                </div>
              </section>

              <section id="reflexion">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                  Reflexión
                </h2>
                <div className="p-6 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-3xl">
                  <p className="text-zinc-500 leading-relaxed italic">
                    [Placeholder: Aquí se incluirá la reflexión final del grupo sobre el aprendizaje obtenido y el impacto del proyecto en la comunidad escolar. El equipo está trabajando en perfeccionar este relato.]
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
