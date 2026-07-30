import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getProjects } from '@/lib/db'
import { BorderBeam } from "@/components/ui/border-beam"
import { MagicCard } from "@/components/ui/magic-card"
import { ArrowLeft, Users, Package } from "lucide-react"
import { SparklesText } from "@/components/ui/sparkles-text"

const getProjectsFn = createServerFn({ method: 'GET' }).handler(async () => {
  return getProjects()
})

export const Route = createFileRoute('/proyectos')({
  loader: async () => {
    const projects = await getProjectsFn()
    return { projects }
  },
  component: ProyectosPage,
})

function ProyectosPage() {
  const { projects } = Route.useLoaderData()

  return (
    <div className="min-h-screen px-24 py-12">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>
        
        <header className="mb-10">
          <SparklesText className="text-4xl md:text-6xl font-black mb-4" colors={{first: "#05ff05",second:"#1a8208"}}>Proyectos</SparklesText>
          <p className="text-muted-foreground text-lg">
           Estos son los proyectos que se han hecho por el alumnado de 4º en TEAMS :)
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p: any) => (
            <Link to="/blog/$id" params={{ id: String(p.id) }} key={p.id}>
              <MagicCard className="group relative flex flex-col p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all overflow-hidden h-full cursor-pointer">
                <BorderBeam size={150} duration={10} delay={Math.random() * 5} />
              
              <div className="flex justify-between items-start mb-6">
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded border border-emerald-500/20">
                  {p.course}
                </span>
                <Package className="w-5 h-5 text-muted-foreground/50" />
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">{p.title}</h3>
              <p className="text-muted-foreground text-sm flex-1 mb-6 line-clamp-3">
                {p.description}
              </p>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-100/70">
                    <span className="font-bold">Miembros:</span> {
                      // el ultimo miembro no llevará coma adelante, sino una "y "
                      (p.members.map((m: string, i: number) => (
                        (i === p.members.length - 1 ? "y "+m : m + ", ")
                      ))).join("").replace(", y", " y ")
                    }
                  </div>
                </div>
                {/*<div className="flex items-start gap-3">
                  <Package className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-100/70 line-clamp-2">
                    <span className="font-bold">Materiales:</span> {p.materials}
                  </div>
                </div>*/}
              </div>
            </MagicCard>
          </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
