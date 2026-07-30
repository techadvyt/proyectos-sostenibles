import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getProjects } from '@/lib/db'
import { ArrowRight } from "lucide-react"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Marquee } from "@/components/ui/marquee"

const getProjectsFn = createServerFn({ method: 'GET' }).handler(async () => {
  return getProjects()
})

export const Route = createFileRoute('/')({
  loader: async () => {
    const allProjects = await getProjectsFn()
    return { allProjects }
  },
  component: Home,
})

function Home() {
  const { allProjects } = Route.useLoaderData()
  const shuffledProjects = [...allProjects].sort(() => Math.random() - 0.5);
  
  // Split into two rows
  const firstRow = shuffledProjects.slice(0, Math.ceil(shuffledProjects.length / 2));
  const secondRow = shuffledProjects.slice(Math.ceil(shuffledProjects.length / 2));

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 md:py-16 flex flex-col items-center text-center overflow-hidden">
        <div className="relative group p-1 mb-8">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl group-hover:bg-emerald-500/40 transition-all duration-500" />
          <span className="relative px-3 py-1 text-xs font-bold tracking-widest uppercase text-emerald-400 border border-emerald-400/50 rounded-full">
            IES Puertas del Campo
          </span>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          Nuestros proyectos
          sostenibles
        </h1>
        
        <p className="max-w-2xl text-xl md:text-2xl text-muted-foreground mb-12 font-medium leading-relaxed">
          En esta página web se recogen los distintos proyectos ecológicos que se han realizado en el IES Puertas del Campo.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-24 z-20">
          <Link to="/proyectos">
            <ShimmerButton className="px-10 py-4 font-black text-lg text-white">
              <span className="relative z-10 flex items-center gap-3">
                Ver proyectos <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </ShimmerButton>
          </Link>
          <Link to="/info">
            <RainbowButton className="px-10 py-4 text-lg size-full rounded-full" variant="outline" size="lg">
              Información
            </RainbowButton>
          </Link>
        </div>

        {/* Marquee Section */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-16 gap-4">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((p) => (
              <div 
                key={p.id} 
                className="relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] p-6 transition-all"
              >
                <span className="font-bold text-emerald-400 text-sm truncate w-full block">{p.title}</span>
                <blockquote className="mt-2 text-[11px] text-zinc-400 line-clamp-2 leading-snug">
                  {p.description}
                </blockquote>
                <div className="mt-3 pt-3 border-t border-white/5 w-full flex">
                  <span className="text-[9px] text-zinc-600 font-medium uppercase tracking-tight truncate">
                    {p.members.join(" • ")}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((p) => (
              <div 
                key={p.id} 
                className="relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] p-6 transition-all"
              >
                <span className="font-bold text-emerald-400 text-sm truncate w-full block">{p.title}</span>
                <blockquote className="mt-2 text-[11px] text-zinc-400 line-clamp-2 leading-snug">
                  {p.description}
                </blockquote>
                <div className="mt-3 pt-3 border-t border-white/5 w-full flex">
                  <span className="text-[9px] text-zinc-600 font-medium uppercase tracking-tight truncate">
                    {p.members.join(" • ")}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
          {/* Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </section>
    </div>
  )
}
